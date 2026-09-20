// =============================================================
// FUNCAO-DESINSCREVER.TS
//
// Este arquivo NÃO roda aqui no GitHub. Ele é só o texto que você
// cola dentro do editor de Edge Functions do site do Supabase.
//
// Diferente da outra função, esta é PÚBLICA (não pede login),
// porque quem clica é a marca no e-mail dela, ou o próprio Gmail
// dela clicando sozinho no botão "cancelar inscrição". Ela só
// grava o e-mail na tabela email_optout, nada além disso.
// =============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  const url = new URL(req.url);
  const email = (url.searchParams.get("email") || "").trim().toLowerCase();

  if (!email) {
    return new Response("Endereço de e-mail não informado.", { status: 400, headers: CORS_HEADERS });
  }

  const cliente = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  await cliente.from("email_optout").upsert({ email }, { onConflict: "email" });

  // Clique automático do "cancelar inscrição" do Gmail/Outlook: eles
  // chamam por POST e não mostram nada pra pessoa, só precisam de um
  // sinal de "ok" de volta.
  if (req.method === "POST") {
    return new Response("ok", { status: 200, headers: CORS_HEADERS });
  }

  // Clique manual num link dentro do e-mail: mostra uma páginazinha
  // simples confirmando que deu certo.
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Descadastro</title>
<style>
  body{ font-family:Arial,Helvetica,sans-serif; background:#f6f7f5; color:#1c211f; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; padding:1.5rem; }
  .caixa{ background:#fff; border-radius:20px; padding:2rem; max-width:26rem; text-align:center; box-shadow:0 10px 30px rgba(20,30,26,.08); }
  h1{ font-size:1.2rem; margin:0 0 .6rem; }
  p{ color:#5b655f; font-size:.9rem; margin:0; }
</style>
</head>
<body>
  <div class="caixa">
    <h1>Você não vai mais receber e-mails</h1>
    <p>O endereço ${email} foi removido da lista.</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { ...CORS_HEADERS, "Content-Type": "text/html; charset=utf-8" }
  });
});
