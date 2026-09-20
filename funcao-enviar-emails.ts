// =============================================================
// FUNCAO-ENVIAR-EMAILS.TS
//
// Este arquivo NÃO roda aqui no GitHub. Ele é só o texto que você
// cola dentro do editor de Edge Functions do site do Supabase.
// Veja o passo a passo completo na mensagem que acompanha este
// arquivo (onde criar a função, onde colar, onde guardar a chave).
//
// O que esta função faz, resumido: recebe uma lista de marcas,
// troca {{nome}} e {{marca}} pelo nome de cada uma, manda o
// e-mail pelo Resend, espera 200ms entre um e outro, e grava uma
// linha por destinatário na tabela email_envios.
// =============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// -------------------------------------------------------------
// Ajustes que você pode editar aqui (não são segredo, por isso
// não precisam ficar nos "Secrets" do Supabase):
// -------------------------------------------------------------
const EMAIL_LOGIN_PERMITIDO = "ugcsamara@gmail.com"; // só este e-mail pode disparar
const EMAIL_CONTATO = "ugcsamara@gmail.com"; // pra onde a resposta da marca cai
const EMAIL_REMETENTE_PADRAO = "Samara Dias <onboarding@resend.dev>"; // troque depois que verificar seu domínio
const LIMITE_DESTINATARIOS = 250;
const ATRASO_ENTRE_ENVIOS_MS = 200;

// -------------------------------------------------------------
// Estes sim são lidos dos segredos da função (Secrets), nunca
// ficam escritos aqui no código:
// RESEND_API_KEY              -> você cria e cola no painel
// SUPABASE_URL                -> o Supabase já fornece sozinho
// SUPABASE_SERVICE_ROLE_KEY   -> o Supabase já fornece sozinho
// SUPABASE_ANON_KEY           -> o Supabase já fornece sozinho
// -------------------------------------------------------------
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function jsonResponse(corpo: unknown, status = 200) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

function primeiroNome(texto: string): string {
  const partes = (texto || "").trim().split(/\s+/);
  return partes[0] || texto || "";
}

function substituirVariaveis(texto: string, nome: string, marca: string): string {
  return (texto || "").split("{{nome}}").join(nome).split("{{marca}}").join(marca);
}

function montarUrlDesinscricao(email: string): string {
  return `${SUPABASE_URL}/functions/v1/desinscrever?email=${encodeURIComponent(email)}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (!RESEND_API_KEY) {
    return jsonResponse({ erro: "A chave do Resend (RESEND_API_KEY) ainda não foi configurada nos segredos desta função." }, 500);
  }

  // ---- passo 1: só a Samara pode disparar ----
  const cabecalhoAutorizacao = req.headers.get("Authorization") || "";
  const token = cabecalhoAutorizacao.replace("Bearer ", "").trim();
  if (!token) {
    return jsonResponse({ erro: "Não autorizado." }, 401);
  }

  const clienteAuth = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: cabecalhoAutorizacao } }
  });
  const { data: dadosUsuario, error: erroUsuario } = await clienteAuth.auth.getUser(token);
  if (erroUsuario || !dadosUsuario?.user || dadosUsuario.user.email !== EMAIL_LOGIN_PERMITIDO) {
    return jsonResponse({ erro: "Não autorizado." }, 401);
  }

  // ---- passo 2: ler o que foi enviado ----
  let corpo: any;
  try {
    corpo = await req.json();
  } catch {
    return jsonResponse({ erro: "Corpo da requisição inválido." }, 400);
  }

  const destinatariosBrutos: Array<{ email: string; nome?: string; marca?: string }> =
    Array.isArray(corpo.destinatarios) ? corpo.destinatarios : [];
  const assunto: string = (corpo.assunto || "").toString().trim();
  const htmlModelo: string = (corpo.html || "").toString();
  const remetente: string = (corpo.remetente || EMAIL_REMETENTE_PADRAO).toString();

  if (!assunto) return jsonResponse({ erro: "Assunto vazio." }, 400);
  if (!htmlModelo) return jsonResponse({ erro: "Corpo do e-mail vazio." }, 400);
  if (destinatariosBrutos.length === 0) return jsonResponse({ erro: "Nenhum destinatário." }, 400);
  if (destinatariosBrutos.length > LIMITE_DESTINATARIOS) {
    return jsonResponse({ erro: `No máximo ${LIMITE_DESTINATARIOS} destinatários por chamada. Recebi ${destinatariosBrutos.length}.` }, 400);
  }

  // remove duplicados dentro desta mesma chamada
  const vistos = new Set<string>();
  const destinatarios: Array<{ email: string; nome?: string; marca?: string }> = [];
  for (const d of destinatariosBrutos) {
    const emailNormalizado = (d.email || "").trim().toLowerCase();
    if (!emailNormalizado || vistos.has(emailNormalizado)) continue;
    vistos.add(emailNormalizado);
    destinatarios.push({ ...d, email: emailNormalizado });
  }

  const clienteServico = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // ---- passo 3: buscar quem já pediu pra sair ----
  const { data: descadastrados } = await clienteServico.from("email_optout").select("email");
  const listaDescadastrados = new Set((descadastrados || []).map((r: any) => String(r.email).toLowerCase()));

  let enviados = 0;
  let falhas = 0;
  let pulados = 0;
  let cotaEsgotada = false;

  // ---- passo 4: mandar um por um ----
  for (const destinatario of destinatarios) {
    if (listaDescadastrados.has(destinatario.email)) {
      pulados++;
      continue;
    }

    const nome = primeiroNome(destinatario.nome || destinatario.marca || "");
    const marca = destinatario.marca || destinatario.nome || "";
    const assuntoFinal = substituirVariaveis(assunto, nome, marca);
    const htmlFinal = substituirVariaveis(htmlModelo, nome, marca);
    const urlDesinscricao = montarUrlDesinscricao(destinatario.email);

    try {
      const respostaResend = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: remetente,
          to: [destinatario.email],
          reply_to: EMAIL_CONTATO,
          subject: assuntoFinal,
          html: htmlFinal,
          headers: {
            "List-Unsubscribe": `<${urlDesinscricao}>, <mailto:${EMAIL_CONTATO}?subject=SAIR>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
          }
        })
      });

      const dadosResend = await respostaResend.json().catch(() => ({} as any));

      if (!respostaResend.ok) {
        const mensagemErro = String(dadosResend?.message || respostaResend.statusText || "erro desconhecido");
        const ehCotaEsgotada = mensagemErro.toLowerCase().includes("daily") || String(dadosResend?.name || "").toLowerCase().includes("daily_quota_exceeded");

        await clienteServico.from("email_envios").insert({
          email: destinatario.email,
          assunto: assuntoFinal,
          status: "erro",
          erro: ehCotaEsgotada ? "cota diária do Resend esgotada" : mensagemErro.slice(0, 500),
          resend_id: null
        });

        if (ehCotaEsgotada) {
          cotaEsgotada = true;
          break;
        }
        falhas++;
      } else {
        enviados++;
        await clienteServico.from("email_envios").insert({
          email: destinatario.email,
          assunto: assuntoFinal,
          status: "ok",
          erro: null,
          resend_id: dadosResend?.id || null
        });
        // marca a marca como "enviado agora" na tabela marcas, quando o e-mail bate
        await clienteServico
          .from("marcas")
          .update({ prospeccao_enviado_em: new Date().toISOString() })
          .eq("email", destinatario.email);
      }
    } catch (erroEnvio) {
      falhas++;
      await clienteServico.from("email_envios").insert({
        email: destinatario.email,
        assunto: assuntoFinal,
        status: "erro",
        erro: String(erroEnvio).slice(0, 500),
        resend_id: null
      });
    }

    await new Promise((resolve) => setTimeout(resolve, ATRASO_ENTRE_ENVIOS_MS));
  }

  return jsonResponse({ enviados, falhas, pulados, cotaEsgotada, total: destinatarios.length });
});
