/* =========================================================
   Painel administrativo de Samara Dias.
   JavaScript puro, sem framework. Depende de:
   - window.supabaseCliente (definido em js/banco.js)
   - window.Biblioteca (definido em js/biblioteca.js)
   ========================================================= */
(function () {
  "use strict";

  var sb = window.supabaseCliente;

  /* =========================================================
     ÍCONES (traço, sem emoji)
     ========================================================= */
  var ICONES = {
    portfolio: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    marcas: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    calendario: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>',
    campanhas: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5.5c0-1.5-2-2.5-5-2.5s-5 1.2-5 2.8 2 2.4 5 2.7 5 1.2 5 2.8-2 2.8-5 2.8-5-1-5-2.5"/></svg>',
    checklist: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    editar: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
    apagar: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
    olho: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    olhoFechado: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 4.22-5.44M9.9 4.24A9.13 9.13 0 0 1 12 4c7 0 11 8 11 8a20.32 20.32 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    alca: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>',
    busca: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    baixar: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 11 12 16 17 11"/><path d="M5 21h14"/></svg>',
    subir: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9"/><polyline points="7 14 12 9 17 14"/><path d="M5 21h14"/></svg>',
    mais: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    estrela: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.6 17 14.6 18.2 21.5 12 18.1 5.8 21.5 7 14.6 2 9.6 8.9 8.6 12 2"/></svg>',
    estrelaCheia: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.6 17 14.6 18.2 21.5 12 18.1 5.8 21.5 7 14.6 2 9.6 8.9 8.6 12 2"/></svg>',
    ordenarCima: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 4 20 16 4 16"/></svg>',
    ordenarBaixo: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 20 4 8 20 8"/></svg>',
    whatsapp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    seta: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>',
    chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    envelope: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    copiar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    expandir: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
    insight: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-4 10.5c.7.7 1 1.3 1 2.5h6c0-1.2.3-1.8 1-2.5A6 6 0 0 0 12 2z"/></svg>',
    imagem: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',
    video: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>'
  };

  /* =========================================================
     ESTADO GERAL
     ========================================================= */
  var estado = {
    abaAtual: "portfolio",
    usuarioEmail: "",
    marcas: { busca: "", situacao: "todas" },
    campanhas: { busca: "", filtro: "todas", ordemColuna: "prazo", ordemAsc: true },
    calendario: { ano: null, mes: null, filtros: { gravar: true, editar: true, postar: true } },
    prospeccao: {
      modoEnvio: "automatico",
      modoEscrita: "texto",
      filtro: "selecionadas",
      pularJaEnviados: true,
      assunto: "",
      textoSimples: "",
      html: "",
      textoBotao: "",
      linkBotao: "",
      buscaHistorico: ""
    }
  };

  var EMAIL_CONTATO_PROSPECCAO = "ugcsamara@gmail.com";
  var URL_FUNCAO_ENVIAR = (window.SUPABASE_URL || "") + "/functions/v1/enviar-emails";

  var FUNIL_STATUS = ["Briefing", "Roteiro", "Aprovação Roteiro", "Gravação", "Edição", "Aprovado", "Entregue"];
  var CORES_SITUACAO = {
    "Lead": "pilula-neutra",
    "Conversando": "pilula-amarela",
    "Cliente": "pilula-vanilla",
    "Parada": "pilula-erro"
  };

  /* =========================================================
     UTILIDADES
     ========================================================= */
  function el(tag, atributos, filhos) {
    var no = document.createElement(tag);
    if (atributos) {
      Object.keys(atributos).forEach(function (chave) {
        if (chave === "class") no.className = atributos[chave];
        else if (chave === "html") no.innerHTML = atributos[chave];
        else if (chave === "texto") no.textContent = atributos[chave];
        else no.setAttribute(chave, atributos[chave]);
      });
    }
    (filhos || []).forEach(function (filho) {
      if (filho) no.appendChild(filho);
    });
    return no;
  }

  function escaparHtml(texto) {
    if (texto === null || texto === undefined) return "";
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatarMoeda(valor) {
    var numero = Number(valor);
    if (!isFinite(numero)) numero = 0;
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function formatarDataBR(iso) {
    if (!iso) return "";
    var partes = String(iso).split("T")[0].split("-");
    if (partes.length !== 3) return iso;
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  function doisDigitos(n) { return n < 10 ? "0" + n : "" + n; }

  function hojeISO() {
    var d = new Date();
    return d.getFullYear() + "-" + doisDigitos(d.getMonth() + 1) + "-" + doisDigitos(d.getDate());
  }

  function diasEntre(isoA, isoB) {
    var a = String(isoA).split("T")[0].split("-").map(Number);
    var b = String(isoB).split("T")[0].split("-").map(Number);
    var da = Date.UTC(a[0], a[1] - 1, a[2]);
    var db = Date.UTC(b[0], b[1] - 1, b[2]);
    return Math.round((db - da) / 86400000);
  }

  function inicioDoDiaISO(offsetDias) {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offsetDias);
    return d.toISOString();
  }

  function baixarArquivo(nomeArquivo, conteudo, tipo) {
    var blob = new Blob([conteudo], { type: tipo });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function paraCSV(linhas) {
    return linhas.map(function (linha) {
      return linha.map(function (campo) {
        var texto = campo === null || campo === undefined ? "" : String(campo);
        texto = texto.replace(/"/g, '""');
        return '"' + texto + '"';
      }).join(";");
    }).join("\r\n");
  }

  function avisoSecao(mensagem) {
    return el("p", { class: "aviso-secao", html: escaparHtml(mensagem) });
  }

  function estadoVazio(mensagem) {
    return el("p", { class: "estado-vazio", texto: mensagem });
  }

  async function consultarTabela(tabela, montarQuery) {
    var resultado = { dados: [], erro: null };
    try {
      var query = sb.from(tabela).select("*");
      if (montarQuery) query = montarQuery(query);
      var resp = await query;
      if (resp.error) throw resp.error;
      resultado.dados = resp.data || [];
    } catch (erro) {
      console.error("Erro ao consultar " + tabela, erro);
      resultado.erro = "Não consegui carregar os dados de \"" + tabela + "\". Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido") + ".";
    }
    return resultado;
  }

  /* =========================================================
     MODAL
     ========================================================= */
  var modalFundo = document.getElementById("modal-fundo");
  var modalConteudo = document.getElementById("modal-conteudo");
  var modalFocoAnterior = null;

  function abrirModal(nos, titulo) {
    modalConteudo.innerHTML = "";
    if (titulo) modalConteudo.appendChild(el("h2", { texto: titulo }));
    (Array.isArray(nos) ? nos : [nos]).forEach(function (no) { modalConteudo.appendChild(no); });
    modalFocoAnterior = document.activeElement;
    modalFundo.hidden = false;
    var primeiroCampo = modalConteudo.querySelector("input, textarea, select, button");
    if (primeiroCampo) primeiroCampo.focus();
  }

  function fecharModal() {
    modalFundo.hidden = true;
    modalConteudo.innerHTML = "";
    if (modalFocoAnterior) modalFocoAnterior.focus();
  }

  document.getElementById("modal-fechar").addEventListener("click", fecharModal);
  modalFundo.addEventListener("click", function (evento) {
    if (evento.target === modalFundo) fecharModal();
  });
  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && !modalFundo.hidden) fecharModal();
  });

  /* =========================================================
     FORMULÁRIO GENÉRICO DE CAMPOS
     ========================================================= */
  function campoTexto(config) {
    var input = el("input", {
      id: config.id, type: config.tipo || "text", name: config.id,
      value: config.valor || "", placeholder: config.placeholder || ""
    });
    if (config.obrigatorio) input.required = true;
    var wrap = el("div", { class: "campo" }, [
      el("label", { for: config.id, texto: config.rotulo }),
      input
    ]);
    return { wrap: wrap, input: input };
  }

  function campoTextarea(config) {
    var input = el("textarea", { id: config.id, name: config.id, placeholder: config.placeholder || "" });
    input.value = config.valor || "";
    var wrap = el("div", { class: "campo" }, [
      el("label", { for: config.id, texto: config.rotulo }),
      input
    ]);
    return { wrap: wrap, input: input };
  }

  function campoSelect(config) {
    var input = el("select", { id: config.id, name: config.id });
    config.opcoes.forEach(function (op) {
      var opt = el("option", { value: op.valor, texto: op.texto });
      if (op.valor === config.valor) opt.selected = true;
      input.appendChild(opt);
    });
    var wrap = el("div", { class: "campo" }, [
      el("label", { for: config.id, texto: config.rotulo }),
      input
    ]);
    return { wrap: wrap, input: input };
  }

  /* =========================================================
     BARRA LATERAL E NAVEGAÇÃO
     ========================================================= */
  var ABAS = [
    { grupo: "Meu site", itens: [
      { id: "portfolio", nome: "Portfólio", icone: ICONES.portfolio },
      { id: "marcas", nome: "Marcas", icone: ICONES.marcas }
    ]},
    { grupo: "Minha rotina", itens: [
      { id: "prospeccao", nome: "Prospecção", icone: ICONES.envelope },
      { id: "calendario", nome: "Calendário", icone: ICONES.calendario },
      { id: "campanhas", nome: "Campanhas", icone: ICONES.campanhas },
      { id: "insights", nome: "Insights", icone: ICONES.insight },
      { id: "checklist", nome: "Checklist", icone: ICONES.checklist }
    ]}
  ];

  function montarMenu() {
    var nav = document.getElementById("bl-nav");
    nav.innerHTML = "";
    ABAS.forEach(function (grupo) {
      nav.appendChild(el("p", { class: "bl-grupo-titulo", texto: grupo.grupo }));
      grupo.itens.forEach(function (item) {
        var botao = el("button", { type: "button", class: "bl-link", "data-aba": item.id, html: item.icone + "<span>" + item.nome + "</span>" });
        botao.addEventListener("click", function () { irParaAba(item.id); });
        nav.appendChild(botao);
      });
    });
  }

  var TITULOS_ABA = { portfolio: "Portfólio", marcas: "Marcas", prospeccao: "Prospecção", calendario: "Calendário", campanhas: "Campanhas", insights: "Insights", checklist: "Checklist do portfólio" };

  function irParaAba(aba) {
    estado.abaAtual = aba;
    window.location.hash = aba;
    document.getElementById("titulo-aba").textContent = TITULOS_ABA[aba] || "Painel";
    document.querySelectorAll(".bl-link").forEach(function (b) {
      if (b.getAttribute("data-aba") === aba) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    });
    fecharDrawerMobile();
    renderizarAba(aba);
  }

  function renderizarAba(aba) {
    var container = document.getElementById("conteudo-aba");
    container.innerHTML = '<p class="estado-vazio">Carregando...</p>';
    if (aba === "portfolio") renderizarPortfolio(container);
    else if (aba === "marcas") renderizarMarcas(container);
    else if (aba === "prospeccao") renderizarProspeccao(container);
    else if (aba === "calendario") renderizarCalendario(container);
    else if (aba === "campanhas") renderizarCampanhas(container);
    else if (aba === "insights") renderizarInsights(container);
    else if (aba === "checklist") renderizarChecklist(container);
    else container.innerHTML = "";
  }

  /* menu mobile */
  var barraLateral = document.getElementById("barra-lateral");
  var fundoDrawer = document.getElementById("fundo-drawer");
  var botaoMenuMobile = document.getElementById("botao-menu-mobile");

  function abrirDrawerMobile() {
    barraLateral.classList.add("aberta");
    fundoDrawer.classList.add("aberto");
    fundoDrawer.hidden = false;
    botaoMenuMobile.setAttribute("aria-expanded", "true");
  }
  function fecharDrawerMobile() {
    barraLateral.classList.remove("aberta");
    fundoDrawer.classList.remove("aberto");
    fundoDrawer.hidden = true;
    botaoMenuMobile.setAttribute("aria-expanded", "false");
  }
  botaoMenuMobile.addEventListener("click", abrirDrawerMobile);
  document.getElementById("botao-fechar-menu").addEventListener("click", fecharDrawerMobile);
  fundoDrawer.addEventListener("click", fecharDrawerMobile);

  document.getElementById("botao-sair").addEventListener("click", async function () {
    await sb.auth.signOut();
    window.location.href = "../login/";
  });

  /* =========================================================
     SEÇÃO 1: PORTFÓLIO
     ========================================================= */
  async function renderizarPortfolio(container) {
    container.innerHTML = "";

    var respVideos = await consultarTabela("videos", function (q) { return q.order("ordem", { ascending: true }); });
    var respVisitas14 = await consultarTabela("visitas", function (q) { return q.gte("data", inicioDoDiaISO(-13)); });

    if (respVideos.erro) container.appendChild(avisoSecao(respVideos.erro));
    if (respVisitas14.erro) container.appendChild(avisoSecao(respVisitas14.erro));

    var videos = respVideos.dados;
    var visitas14 = respVisitas14.dados;

    // ---- KPIs ----
    var hoje = hojeISO();
    var visitasHoje = visitas14.filter(function (v) { return String(v.data).slice(0, 10) === hoje; }).length;
    var videosNoAr = videos.filter(function (v) { return v.visivel; }).length;

    var contagemNicho = {};
    videos.filter(function (v) { return v.visivel; }).forEach(function (v) {
      var n = v.nicho || "sem nicho";
      contagemNicho[n] = (contagemNicho[n] || 0) + 1;
    });
    var nichoForte = "ainda sem dados";
    var maiorNicho = 0;
    Object.keys(contagemNicho).forEach(function (n) {
      if (contagemNicho[n] > maiorNicho) { maiorNicho = contagemNicho[n]; nichoForte = n; }
    });

    var contagemOrigem = {};
    visitas14.forEach(function (v) {
      var o = v.origem || "direto";
      contagemOrigem[o] = (contagemOrigem[o] || 0) + 1;
    });
    var origensOrdenadas = Object.keys(contagemOrigem).sort(function (a, b) { return contagemOrigem[b] - contagemOrigem[a]; });
    var origemForte = origensOrdenadas.length ? origensOrdenadas[0] : "ainda sem dados";

    var kpis = el("div", { class: "kpis" }, [
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: String(visitas14.length) }), el("p", { class: "kpi-rotulo", texto: "visitas em 14 dias" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: String(visitasHoje) }), el("p", { class: "kpi-rotulo", texto: "visitas hoje" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: String(videosNoAr) }), el("p", { class: "kpi-rotulo", texto: "vídeos no ar" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: nichoForte }), el("p", { class: "kpi-rotulo", texto: "nicho mais forte" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: origemForte }), el("p", { class: "kpi-rotulo", texto: "de onde mais vêm" })])
    ]);
    container.appendChild(kpis);

    // ---- gráfico + origens ----
    var duasColunas = el("div", { class: "duas-colunas" });

    var cartaoGrafico = el("div", { class: "cartao" }, [el("p", { class: "cartao-titulo", texto: "Visitas nos últimos 14 dias" })]);
    if (visitas14.length === 0) {
      cartaoGrafico.appendChild(estadoVazio("Assim que as pessoas começarem a visitar o seu portfólio, esse gráfico vai mostrar quantas visitas aconteceram em cada um dos últimos 14 dias."));
    } else {
      var diasChave = [];
      for (var i = 13; i >= 0; i--) {
        var d = new Date(); d.setDate(d.getDate() - i);
        diasChave.push(d.getFullYear() + "-" + doisDigitos(d.getMonth() + 1) + "-" + doisDigitos(d.getDate()));
      }
      var contagemPorDia = {};
      diasChave.forEach(function (c) { contagemPorDia[c] = 0; });
      visitas14.forEach(function (v) {
        var chave = String(v.data).slice(0, 10);
        if (contagemPorDia.hasOwnProperty(chave)) contagemPorDia[chave]++;
      });
      var maximo = Math.max.apply(null, diasChave.map(function (c) { return contagemPorDia[c]; }));
      if (maximo === 0) maximo = 1;
      var grafico = el("div", { class: "grafico-barras" });
      diasChave.forEach(function (chave) {
        var valor = contagemPorDia[chave];
        var partesData = chave.split("-");
        var alturaPct = Math.max((valor / maximo) * 100, valor > 0 ? 6 : 1);
        grafico.appendChild(el("div", { class: "barra-dia" }, [
          el("span", { class: "barra-numero", texto: valor > 0 ? String(valor) : "" }),
          el("div", { class: "barra", style: "height:" + alturaPct + "%" }),
          el("span", { class: "barra-rotulo", texto: partesData[2] + "/" + partesData[1] })
        ]));
      });
      cartaoGrafico.appendChild(grafico);
    }
    duasColunas.appendChild(cartaoGrafico);

    var cartaoOrigens = el("div", { class: "cartao" }, [el("p", { class: "cartao-titulo", texto: "De onde as pessoas chegaram" })]);
    if (origensOrdenadas.length === 0) {
      cartaoOrigens.appendChild(estadoVazio("Quando alguém visitar o seu portfólio, a origem da visita (direto, Instagram, ou outro link) vai aparecer aqui."));
    } else {
      var listaOrigens = el("ul", { class: "lista-origens" });
      var totalOrigem = visitas14.length;
      origensOrdenadas.slice(0, 6).forEach(function (o) {
        var qtd = contagemOrigem[o];
        var pct = Math.round((qtd / totalOrigem) * 100);
        listaOrigens.appendChild(el("li", {}, [
          el("span", { texto: o }),
          el("span", { class: "barra-origem" }, [el("span", { style: "width:" + pct + "%" })]),
          el("span", { texto: qtd + " (" + pct + "%)" })
        ]));
      });
      cartaoOrigens.appendChild(listaOrigens);
    }
    duasColunas.appendChild(cartaoOrigens);
    container.appendChild(duasColunas);

    // ---- tabela de vídeos ----
    var cartaoVideos = el("div", { class: "cartao" });
    var cabecalhoVideos = el("div", { style: "display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.6rem;" }, [
      el("p", { class: "cartao-titulo", texto: "Seus vídeos", style: "margin-bottom:0;" }),
      (function () {
        var b = el("button", { type: "button", class: "botao botao-primario", html: ICONES.mais + "Adicionar vídeo" });
        b.addEventListener("click", function () { abrirFormularioVideo(null); });
        return b;
      })()
    ]);
    cartaoVideos.appendChild(cabecalhoVideos);

    if (videos.length === 0 && !respVideos.erro) {
      cartaoVideos.appendChild(estadoVazio("Você ainda não cadastrou nenhum vídeo. Clique em \"Adicionar vídeo\" para começar."));
    } else if (videos.length > 0) {
      var wrapTabela = el("div", { class: "tabela-scroll" });
      var tabela = el("table");
      tabela.appendChild(el("thead", {}, [el("tr", {}, [
        el("th", { texto: "" }), el("th", { texto: "Título" }), el("th", { texto: "Nicho" }),
        el("th", { texto: "Formato" }), el("th", { texto: "Marca" }), el("th", { texto: "Destaque" }),
        el("th", { texto: "Visível" }), el("th", { texto: "Ações" })
      ])]));
      var corpo = el("tbody");
      corpo.id = "corpo-tabela-videos";
      videos.forEach(function (v) { corpo.appendChild(linhaVideo(v)); });
      tabela.appendChild(corpo);
      wrapTabela.appendChild(tabela);
      cartaoVideos.appendChild(wrapTabela);
      cartaoVideos.appendChild(el("p", { style: "font-size:.75rem;color:var(--texto-suave);margin-top:.6rem;", texto: "Arraste pela alcinha para mudar a ordem em que os vídeos aparecem no site." }));
      ativarArrastarVideos(corpo, videos);
    }
    container.appendChild(cartaoVideos);
  }

  function linhaVideo(v) {
    var tr = el("tr", { class: "linha-video", draggable: "true", "data-id": v.id });
    tr.appendChild(el("td", { html: ICONES.alca, class: "alca-arrastar" }));
    tr.appendChild(el("td", { texto: v.titulo || "" }));
    tr.appendChild(el("td", { texto: v.nicho || "" }));
    tr.appendChild(el("td", { texto: v.formato || "" }));
    tr.appendChild(el("td", { texto: v.marca || "" }));
    tr.appendChild(el("td", { texto: v.destaque || "" }));

    var botaoOlho = el("button", { type: "button", class: "botao-icone", html: v.visivel ? ICONES.olho : ICONES.olhoFechado, "aria-label": v.visivel ? "Esconder do site" : "Mostrar no site" });
    botaoOlho.addEventListener("click", async function () {
      try {
        var resp = await sb.from("videos").update({ visivel: !v.visivel }).eq("id", v.id);
        if (resp.error) throw resp.error;
        renderizarAba("portfolio");
      } catch (erro) { alert("Não consegui mudar a visibilidade agora. Tente de novo."); console.error(erro); }
    });
    tr.appendChild(el("td", {}, [botaoOlho]));

    var acoes = el("td", { style: "display:flex;gap:.4rem;" });
    var botaoEditar = el("button", { type: "button", class: "botao-icone", html: ICONES.editar, "aria-label": "Editar vídeo" });
    botaoEditar.addEventListener("click", function () { abrirFormularioVideo(v); });
    var botaoApagar = el("button", { type: "button", class: "botao-icone", html: ICONES.apagar, "aria-label": "Apagar vídeo" });
    botaoApagar.addEventListener("click", function () { confirmarApagar("videos", v.id, "este vídeo"); });
    acoes.appendChild(botaoEditar);
    acoes.appendChild(botaoApagar);
    tr.appendChild(acoes);
    return tr;
  }

  function ativarArrastarVideos(corpo, videosOrdenados) {
    var arrastado = null;
    corpo.querySelectorAll("tr").forEach(function (linha) {
      linha.addEventListener("dragstart", function () {
        arrastado = linha;
        linha.classList.add("arrastando");
      });
      linha.addEventListener("dragend", function () {
        linha.classList.remove("arrastando");
      });
      linha.addEventListener("dragover", function (evento) {
        evento.preventDefault();
        if (!arrastado || arrastado === linha) return;
        var depois = (evento.clientY - linha.getBoundingClientRect().top) > linha.offsetHeight / 2;
        corpo.insertBefore(arrastado, depois ? linha.nextSibling : linha);
      });
      linha.addEventListener("drop", async function (evento) {
        evento.preventDefault();
        var idsNaOrdem = Array.from(corpo.querySelectorAll("tr")).map(function (l) { return l.getAttribute("data-id"); });
        try {
          for (var i = 0; i < idsNaOrdem.length; i++) {
            await sb.from("videos").update({ ordem: i + 1 }).eq("id", idsNaOrdem[i]);
          }
        } catch (erro) {
          alert("Não consegui salvar a nova ordem. Tente de novo.");
          console.error(erro);
          renderizarAba("portfolio");
        }
      });
    });
  }

  function abrirFormularioVideo(video) {
    var ehEdicao = !!video;
    var t = campoTexto({ id: "v-titulo", rotulo: "Título", valor: video ? video.titulo : "", obrigatorio: true });
    var link = campoTexto({ id: "v-link", rotulo: "Link do vídeo", valor: video ? video.link : "" });
    var nicho = campoTexto({ id: "v-nicho", rotulo: "Nicho", valor: video ? video.nicho : "", obrigatorio: true });
    var formato = campoTexto({ id: "v-formato", rotulo: "Formato (ex: foto do trabalho, formato 4:5)", valor: video ? video.formato : "" });
    var marca = campoTexto({ id: "v-marca", rotulo: "Marca", valor: video ? video.marca : "" });
    var destaque = campoTexto({ id: "v-destaque", rotulo: "Destaque (ex: 2,4M views). Deixe em branco se não quiser destacar este vídeo", valor: video ? video.destaque : "" });

    var form = el("form", {}, [t.wrap, link.wrap, nicho.wrap, formato.wrap, marca.wrap, destaque.wrap]);
    var faixaErro = avisoSecao("");
    faixaErro.hidden = true;
    form.appendChild(faixaErro);
    var botaoSalvar = el("button", { type: "submit", class: "botao botao-primario", texto: ehEdicao ? "Salvar alterações" : "Adicionar vídeo" });
    form.appendChild(botaoSalvar);

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var registro = {
        titulo: t.input.value.trim(), link: link.input.value.trim(), nicho: nicho.input.value.trim(),
        formato: formato.input.value.trim(), marca: marca.input.value.trim(), destaque: destaque.input.value.trim()
      };
      try {
        if (ehEdicao) {
          var resp1 = await sb.from("videos").update(registro).eq("id", video.id);
          if (resp1.error) throw resp1.error;
        } else {
          registro.ordem = 9999;
          registro.visivel = true;
          var resp2 = await sb.from("videos").insert(registro);
          if (resp2.error) throw resp2.error;
        }
        fecharModal();
        renderizarAba("portfolio");
      } catch (erro) {
        console.error(erro);
        faixaErro.textContent = "Não consegui salvar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaErro.hidden = false;
      }
    });

    abrirModal(form, ehEdicao ? "Editar vídeo" : "Adicionar vídeo");
  }

  function confirmarApagar(tabela, id, descricao) {
    var texto = el("p", { texto: "Tem certeza que quer apagar " + descricao + "? Essa ação não pode ser desfeita.", style: "margin-bottom:1.2rem;font-size:.88rem;" });
    var botoes = el("div", { style: "display:flex;gap:.6rem;justify-content:flex-end;" });
    var cancelar = el("button", { type: "button", class: "botao", texto: "Cancelar" });
    cancelar.addEventListener("click", fecharModal);
    var apagar = el("button", { type: "button", class: "botao botao-perigo", texto: "Apagar" });
    apagar.addEventListener("click", async function () {
      try {
        var resp = await sb.from(tabela).delete().eq("id", id);
        if (resp.error) throw resp.error;
        fecharModal();
        renderizarAba(estado.abaAtual);
      } catch (erro) {
        alert("Não consegui apagar agora. Tente de novo.");
        console.error(erro);
      }
    });
    botoes.appendChild(cancelar);
    botoes.appendChild(apagar);
    abrirModal([texto, botoes], "Confirmar exclusão");
  }

  /* =========================================================
     SEÇÃO 2: MARCAS
     ========================================================= */
  var cacheMarcas = [];

  async function renderizarMarcas(container) {
    container.innerHTML = "";
    var resp = await consultarTabela("marcas", function (q) { return q.order("criado_em", { ascending: false }); });
    if (resp.erro) container.appendChild(avisoSecao(resp.erro));
    cacheMarcas = resp.dados;

    var barra = el("div", { class: "filtros-barra" });
    var campoBusca = el("input", { type: "search", placeholder: "Buscar por nome, @ ou e-mail", value: estado.marcas.busca });
    campoBusca.addEventListener("input", function () { estado.marcas.busca = campoBusca.value; desenharTabelaMarcas(); });
    barra.appendChild(campoBusca);

    var selectSituacao = el("select", {});
    [["todas", "Todas as situações"], ["Lead", "Lead"], ["Conversando", "Conversando"], ["Cliente", "Cliente"], ["Parada", "Parada"]].forEach(function (o) {
      var opt = el("option", { value: o[0], texto: o[1] });
      if (o[0] === estado.marcas.situacao) opt.selected = true;
      selectSituacao.appendChild(opt);
    });
    selectSituacao.addEventListener("change", function () { estado.marcas.situacao = selectSituacao.value; desenharTabelaMarcas(); });
    barra.appendChild(selectSituacao);

    var botaoAdicionar = el("button", { type: "button", class: "botao botao-primario", html: ICONES.mais + "Adicionar marca" });
    botaoAdicionar.addEventListener("click", function () { abrirFormularioMarca(null); });
    barra.appendChild(botaoAdicionar);

    var botaoBaixar = el("button", { type: "button", class: "botao", html: ICONES.baixar + "Baixar CSV" });
    botaoBaixar.addEventListener("click", baixarMarcasCSV);
    barra.appendChild(botaoBaixar);

    var botaoImportar = el("button", { type: "button", class: "botao", html: ICONES.subir + "Importar planilha" });
    botaoImportar.addEventListener("click", abrirImportarMarcas);
    barra.appendChild(botaoImportar);

    container.appendChild(barra);

    var cartao = el("div", { class: "cartao", id: "cartao-tabela-marcas" });
    container.appendChild(cartao);
    desenharTabelaMarcas();
  }

  function desenharTabelaMarcas() {
    var cartao = document.getElementById("cartao-tabela-marcas");
    if (!cartao) return;
    cartao.innerHTML = "";

    var termo = estado.marcas.busca.trim().toLowerCase();
    var filtradas = cacheMarcas.filter(function (m) {
      var passaSituacao = estado.marcas.situacao === "todas" || m.situacao === estado.marcas.situacao;
      var passaBusca = !termo ||
        (m.nome || "").toLowerCase().indexOf(termo) !== -1 ||
        (m.nicho || "").toLowerCase().indexOf(termo) !== -1 ||
        (m.instagram || "").toLowerCase().indexOf(termo) !== -1 ||
        (m.email || "").toLowerCase().indexOf(termo) !== -1;
      return passaSituacao && passaBusca;
    });
    filtradas.sort(function (a, b) { return (b.favorita ? 1 : 0) - (a.favorita ? 1 : 0); });

    if (cacheMarcas.length === 0) {
      cartao.appendChild(estadoVazio("Você ainda não tem nenhuma marca cadastrada. Elas também chegam aqui sozinhas quando alguém preenche o formulário do seu portfólio."));
      return;
    }

    // ---- resumo da seleção (pra usar depois na aba Prospecção) ----
    var selecionadasTotal = cacheMarcas.filter(function (m) { return m.selecionada; }).length;
    var filtradasComEmail = filtradas.filter(function (m) { return m.email; });
    var resumo = el("div", { style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.6rem;margin-bottom:1rem;padding:.7rem .9rem;background:var(--gelo);border-radius:var(--raio-mini);" });
    resumo.appendChild(el("span", { style: "font-weight:700;font-size:.85rem;", texto: selecionadasTotal + (selecionadasTotal === 1 ? " marca selecionada" : " marcas selecionadas") }));
    var botoesResumo = el("div", { style: "display:flex;gap:.5rem;flex-wrap:wrap;" });
    var botaoSelecionarTodas = el("button", { type: "button", class: "botao", texto: "Selecionar todas (" + filtradasComEmail.length + ")" });
    botaoSelecionarTodas.addEventListener("click", async function () {
      if (filtradasComEmail.length === 0) return;
      botaoSelecionarTodas.disabled = true;
      try {
        var ids = filtradasComEmail.map(function (m) { return m.id; });
        var tamanhoLote = 200;
        for (var i = 0; i < ids.length; i += tamanhoLote) {
          var lote = ids.slice(i, i + tamanhoLote);
          var resp = await sb.from("marcas").update({ selecionada: true }).in("id", lote);
          if (resp.error) throw resp.error;
        }
        filtradasComEmail.forEach(function (m) { m.selecionada = true; });
        desenharTabelaMarcas();
      } catch (erro) { alert("Não consegui selecionar todas agora. Tente de novo."); console.error(erro); }
    });
    var botaoLimparSelecao = el("button", { type: "button", class: "botao", texto: "Limpar seleção" });
    botaoLimparSelecao.addEventListener("click", async function () {
      if (selecionadasTotal === 0) return;
      botaoLimparSelecao.disabled = true;
      try {
        var resp = await sb.from("marcas").update({ selecionada: false }).eq("selecionada", true);
        if (resp.error) throw resp.error;
        cacheMarcas.forEach(function (m) { m.selecionada = false; });
        desenharTabelaMarcas();
      } catch (erro) { alert("Não consegui limpar a seleção agora. Tente de novo."); console.error(erro); }
    });
    botoesResumo.appendChild(botaoSelecionarTodas);
    botoesResumo.appendChild(botaoLimparSelecao);
    resumo.appendChild(botoesResumo);
    cartao.appendChild(resumo);

    if (filtradas.length === 0) {
      cartao.appendChild(estadoVazio("Nenhuma marca encontrada com esse filtro."));
      return;
    }

    var wrap = el("div", { class: "tabela-scroll" });
    var tabela = el("table");
    tabela.appendChild(el("thead", {}, [el("tr", {}, [
      el("th", { texto: "" }), el("th", { texto: "" }), el("th", { texto: "Marca" }), el("th", { texto: "Nicho" }), el("th", { texto: "Instagram" }), el("th", { texto: "E-mail" }),
      el("th", { texto: "Telefone" }), el("th", { texto: "Situação" }), el("th", { texto: "Observações" }), el("th", { texto: "Último contato" }), el("th", { texto: "" })
    ])]));
    var corpo = el("tbody");
    filtradas.forEach(function (m) {
      var tr = el("tr", { class: "linha-clicavel" });
      if (m.favorita) tr.style.borderLeft = "3px solid var(--amarelo)";
      tr.addEventListener("click", function (evento) {
        if (evento.target.closest("a") || evento.target.closest("button") || evento.target.closest("input")) return;
        abrirFormularioMarca(m);
      });

      var tdSelecionar = el("td");
      var checkboxSelecionar = el("input", { type: "checkbox", "aria-label": "Selecionar " + (m.nome || "esta marca") });
      checkboxSelecionar.checked = !!m.selecionada;
      if (!m.email) checkboxSelecionar.disabled = true;
      checkboxSelecionar.addEventListener("click", function (evento) { evento.stopPropagation(); });
      checkboxSelecionar.addEventListener("change", async function () {
        var novoValor = checkboxSelecionar.checked;
        try {
          var resp = await sb.from("marcas").update({ selecionada: novoValor }).eq("id", m.id);
          if (resp.error) throw resp.error;
          m.selecionada = novoValor;
          desenharTabelaMarcas();
        } catch (erro) {
          alert("Não consegui salvar a seleção agora. Tente de novo.");
          console.error(erro);
          checkboxSelecionar.checked = !novoValor;
        }
      });
      tdSelecionar.appendChild(checkboxSelecionar);
      tr.appendChild(tdSelecionar);

      var tdEstrela = el("td");
      var botaoEstrela = el("button", { type: "button", class: "botao-icone", html: m.favorita ? ICONES.estrelaCheia : ICONES.estrela, "aria-label": m.favorita ? "Tirar dos favoritos" : "Marcar como favorita", style: m.favorita ? "color:var(--amarelo-texto);" : "" });
      botaoEstrela.addEventListener("click", async function (evento) {
        evento.stopPropagation();
        try {
          var resp = await sb.from("marcas").update({ favorita: !m.favorita }).eq("id", m.id);
          if (resp.error) throw resp.error;
          renderizarAba("marcas");
        } catch (erro) { alert("Não consegui favoritar agora. Tente de novo."); console.error(erro); }
      });
      tdEstrela.appendChild(botaoEstrela);
      tr.appendChild(tdEstrela);

      tr.appendChild(el("td", { texto: m.nome || "" }));
      tr.appendChild(el("td", { texto: m.nicho || "" }));

      var tdInsta = el("td");
      if (m.instagram) {
        var handle = m.instagram.replace("@", "").trim();
        var linkInsta = el("a", { href: "https://instagram.com/" + encodeURIComponent(handle), target: "_blank", rel: "noopener", html: ICONES.instagram + " " + escaparHtml(m.instagram), style: "display:inline-flex;align-items:center;gap:.3rem;" });
        tdInsta.appendChild(linkInsta);
      }
      tr.appendChild(tdInsta);

      tr.appendChild(el("td", { texto: m.email || "" }));

      var tdTel = el("td");
      if (m.telefone) {
        var digitos = m.telefone.replace(/\D/g, "");
        var linkWhats = el("a", { href: "https://wa.me/" + digitos, target: "_blank", rel: "noopener", html: ICONES.whatsapp + " " + escaparHtml(m.telefone), style: "display:inline-flex;align-items:center;gap:.3rem;" });
        tdTel.appendChild(linkWhats);
      }
      tr.appendChild(tdTel);

      tr.appendChild(el("td", {}, [el("span", { class: "pilula " + (CORES_SITUACAO[m.situacao] || "pilula-neutra"), texto: m.situacao || "" })]));
      tr.appendChild(el("td", { texto: m.obs || "", style: "max-width:16rem;white-space:normal;" }));
      tr.appendChild(el("td", { texto: formatarDataBR(m.ultimo_contato) }));

      var tdApagar = el("td");
      var botaoApagar = el("button", { type: "button", class: "botao-icone", html: ICONES.apagar, "aria-label": "Apagar marca" });
      botaoApagar.addEventListener("click", function (evento) { evento.stopPropagation(); confirmarApagar("marcas", m.id, "esta marca"); });
      tdApagar.appendChild(botaoApagar);
      tr.appendChild(tdApagar);

      corpo.appendChild(tr);
    });
    tabela.appendChild(corpo);
    wrap.appendChild(tabela);
    cartao.appendChild(wrap);
  }

  function abrirFormularioMarca(marca) {
    var ehEdicao = !!marca;
    var nome = campoTexto({ id: "m-nome", rotulo: "Nome da marca", valor: marca ? marca.nome : "", obrigatorio: true });
    var nicho = campoTexto({ id: "m-nicho", rotulo: "Nicho", valor: marca ? marca.nicho : "" });
    var instagram = campoTexto({ id: "m-instagram", rotulo: "Instagram", valor: marca ? marca.instagram : "" });
    var email = campoTexto({ id: "m-email", rotulo: "E-mail", tipo: "email", valor: marca ? marca.email : "" });
    var telefone = campoTexto({ id: "m-telefone", rotulo: "Telefone (com DDD)", valor: marca ? marca.telefone : "" });
    var situacao = campoSelect({
      id: "m-situacao", rotulo: "Situação", valor: marca ? marca.situacao : "Lead",
      opcoes: [{ valor: "Lead", texto: "Lead" }, { valor: "Conversando", texto: "Conversando" }, { valor: "Cliente", texto: "Cliente" }, { valor: "Parada", texto: "Parada" }]
    });
    var ultimoContato = campoTexto({ id: "m-ultimo-contato", rotulo: "Último contato", tipo: "date", valor: marca && marca.ultimo_contato ? String(marca.ultimo_contato).slice(0, 10) : "" });
    var obs = campoTextarea({ id: "m-obs", rotulo: "Observações", valor: marca ? marca.obs : "" });

    var form = el("form", {}, [nome.wrap, nicho.wrap, instagram.wrap, email.wrap, telefone.wrap, situacao.wrap, ultimoContato.wrap, obs.wrap]);
    var faixaErro = avisoSecao(""); faixaErro.hidden = true;
    form.appendChild(faixaErro);
    form.appendChild(el("button", { type: "submit", class: "botao botao-primario", texto: ehEdicao ? "Salvar alterações" : "Adicionar marca" }));

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var registro = {
        nome: nome.input.value.trim(), nicho: nicho.input.value.trim(), instagram: instagram.input.value.trim(), email: email.input.value.trim(),
        telefone: telefone.input.value.trim(), situacao: situacao.input.value,
        ultimo_contato: ultimoContato.input.value || null, obs: obs.input.value.trim()
      };
      try {
        if (ehEdicao) {
          var resp1 = await sb.from("marcas").update(registro).eq("id", marca.id);
          if (resp1.error) throw resp1.error;
        } else {
          var resp2 = await sb.from("marcas").insert(registro);
          if (resp2.error) throw resp2.error;
        }
        fecharModal();
        renderizarAba("marcas");
      } catch (erro) {
        console.error(erro);
        faixaErro.textContent = "Não consegui salvar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaErro.hidden = false;
      }
    });

    abrirModal(form, ehEdicao ? "Editar marca" : "Adicionar marca");
  }

  function baixarMarcasCSV() {
    var linhas = [["Nome", "Nicho", "Instagram", "E-mail", "Telefone", "Situação", "Observações", "Último contato"]];
    cacheMarcas.forEach(function (m) {
      linhas.push([m.nome, m.nicho, m.instagram, m.email, m.telefone, m.situacao, m.obs, formatarDataBR(m.ultimo_contato)]);
    });
    var csv = "﻿" + paraCSV(linhas);
    baixarArquivo("marcas.csv", csv, "text/csv;charset=utf-8;");
  }

  /* =========================================================
     IMPORTAR PLANILHA DE MARCAS (CSV)
     ========================================================= */
  var CAMPOS_MARCAS_IMPORT = [
    { chave: "nome", rotulo: "Nome da marca", obrigatorio: true },
    { chave: "nicho", rotulo: "Nicho" },
    { chave: "instagram", rotulo: "Instagram" },
    { chave: "email", rotulo: "E-mail" },
    { chave: "telefone", rotulo: "Telefone" },
    { chave: "situacao", rotulo: "Situação" },
    { chave: "obs", rotulo: "Observações" },
    { chave: "ultimo_contato", rotulo: "Último contato" }
  ];

  var SINONIMOS_COLUNAS_MARCAS = {
    nome: ["nome", "marca", "empresa", "nomedamarca", "nomeempresa", "cliente", "company", "brand", "razaosocial"],
    nicho: ["nicho", "categoria", "segmento", "area", "ramo", "tiponegocio", "setor"],
    instagram: ["instagram", "insta", "ig", "perfil", "arroba", "usuario"],
    email: ["email", "emails", "mail", "ecom"],
    telefone: ["telefone", "whatsapp", "celular", "fone", "phone", "contato", "numero", "tel", "whats"],
    situacao: ["situacao", "status", "etapa", "funil", "estagio"],
    obs: ["obs", "observacoes", "observacao", "notas", "nota", "comentario", "comentarios", "anotacoes", "detalhes"],
    ultimo_contato: ["ultimocontato", "data", "datacontato", "lastcontact", "ultimafala", "dataultimocontato", "contatoem"]
  };

  function normalizarTexto(texto) {
    return (texto || "").toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
  }

  function detectarDelimitadorCSV(texto) {
    var primeiraLinha = texto.split(/\r\n|\n/, 1)[0] || "";
    var virgulas = (primeiraLinha.match(/,/g) || []).length;
    var pontoVirgulas = (primeiraLinha.match(/;/g) || []).length;
    return pontoVirgulas > virgulas ? ";" : ",";
  }

  function analisarCSV(texto) {
    texto = texto.replace(/^﻿/, "");
    var delimitador = detectarDelimitadorCSV(texto);
    var linhas = [];
    var linhaAtual = [];
    var campoAtual = "";
    var dentroDeAspas = false;
    var i = 0;
    while (i < texto.length) {
      var c = texto[i];
      if (dentroDeAspas) {
        if (c === '"') {
          if (texto[i + 1] === '"') { campoAtual += '"'; i += 2; continue; }
          dentroDeAspas = false; i++; continue;
        }
        campoAtual += c; i++; continue;
      }
      if (c === '"') { dentroDeAspas = true; i++; continue; }
      if (c === delimitador) { linhaAtual.push(campoAtual); campoAtual = ""; i++; continue; }
      if (c === '\r') { i++; continue; }
      if (c === '\n') {
        linhaAtual.push(campoAtual); campoAtual = "";
        linhas.push(linhaAtual); linhaAtual = [];
        i++; continue;
      }
      campoAtual += c; i++;
    }
    linhaAtual.push(campoAtual);
    if (linhaAtual.length > 1 || linhaAtual[0] !== "") linhas.push(linhaAtual);
    linhas = linhas.filter(function (l) { return l.some(function (v) { return v.trim() !== ""; }); });
    if (linhas.length === 0) return { cabecalhos: [], linhas: [] };
    var cabecalhos = linhas[0].map(function (h) { return h.trim(); });
    return { cabecalhos: cabecalhos, linhas: linhas.slice(1) };
  }

  function detectarMapeamentoColunas(cabecalhos) {
    var normalizados = cabecalhos.map(normalizarTexto);
    var mapeamento = {};
    Object.keys(SINONIMOS_COLUNAS_MARCAS).forEach(function (campo) {
      var indice = -1;
      SINONIMOS_COLUNAS_MARCAS[campo].some(function (sinonimo) {
        var pos = normalizados.indexOf(sinonimo);
        if (pos !== -1) { indice = pos; return true; }
        return false;
      });
      mapeamento[campo] = indice;
    });
    return mapeamento;
  }

  function normalizarSituacaoImportada(texto) {
    var t = normalizarTexto(texto);
    if (t === "lead") return "Lead";
    if (t === "conversando" || t === "negociando" || t === "emconversa") return "Conversando";
    if (t === "cliente" || t === "ativo" || t === "fechado" || t === "fechada") return "Cliente";
    if (t === "parada" || t === "perdida" || t === "perdido" || t === "inativo" || t === "frio") return "Parada";
    return "Lead";
  }

  function parseDataPlanilha(texto) {
    if (!texto) return null;
    texto = texto.trim();
    var m = texto.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (m) return m[1] + "-" + doisDigitos(Number(m[2])) + "-" + doisDigitos(Number(m[3]));
    m = texto.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (m) return m[3] + "-" + doisDigitos(Number(m[2])) + "-" + doisDigitos(Number(m[1]));
    m = texto.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})$/);
    if (m) return "20" + m[3] + "-" + doisDigitos(Number(m[2])) + "-" + doisDigitos(Number(m[1]));
    return null;
  }

  function abrirImportarMarcas() {
    var corpo = el("div");
    corpo.appendChild(el("p", { style: "font-size:.82rem;color:var(--texto-suave);margin-bottom:1rem;", texto: "Escolha o arquivo CSV da sua planilha de leads. Se ela estiver em Excel ou Google Sheets, abra e exporte (ou baixe) como CSV antes de escolher aqui. Nada é importado ainda nesta etapa, na próxima tela você confere tudo antes." }));
    var inputArquivo = el("input", { type: "file", accept: ".csv,text/csv" });
    corpo.appendChild(inputArquivo);
    var areaErro = el("div");
    corpo.appendChild(areaErro);

    inputArquivo.addEventListener("change", function () {
      areaErro.innerHTML = "";
      var arquivo = inputArquivo.files[0];
      if (!arquivo) return;
      var leitor = new FileReader();
      leitor.onload = function () {
        var resultado = analisarCSV(String(leitor.result));
        if (resultado.cabecalhos.length === 0 || resultado.linhas.length === 0) {
          areaErro.appendChild(avisoSecao("Não consegui ler nenhuma linha nesse arquivo. Confira se ele é mesmo um CSV (com cabeçalho na primeira linha)."));
          return;
        }
        abrirMapeamentoImportacaoMarcas(resultado);
      };
      leitor.onerror = function () {
        areaErro.appendChild(avisoSecao("Não consegui abrir esse arquivo. Tente exportar a planilha de novo em CSV."));
      };
      leitor.readAsText(arquivo, "UTF-8");
    });

    abrirModal(corpo, "Importar planilha de marcas");
  }

  function abrirMapeamentoImportacaoMarcas(resultado) {
    var cabecalhos = resultado.cabecalhos;
    var linhas = resultado.linhas;
    var mapeamentoDetectado = detectarMapeamentoColunas(cabecalhos);

    var corpo = el("div");
    corpo.appendChild(el("p", { style: "font-size:.85rem;margin-bottom:1rem;", texto: linhas.length + " linhas encontradas na planilha. Confira se cada campo abaixo bateu com a coluna certa. Se não bateu, escolha a coluna certa na lista." }));

    var selects = {};
    CAMPOS_MARCAS_IMPORT.forEach(function (campo) {
      var select = el("select", {});
      select.appendChild(el("option", { value: "-1", texto: "Nenhuma coluna" }));
      cabecalhos.forEach(function (h, indice) {
        var opt = el("option", { value: String(indice), texto: h || ("Coluna " + (indice + 1)) });
        if (mapeamentoDetectado[campo.chave] === indice) opt.selected = true;
        select.appendChild(opt);
      });
      selects[campo.chave] = select;
      corpo.appendChild(el("div", { class: "campo" }, [
        el("label", { texto: campo.rotulo + (campo.obrigatorio ? " (obrigatório)" : "") }),
        select
      ]));
    });

    corpo.appendChild(el("p", { style: "font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.03em;color:var(--texto-suave);margin:1rem 0 .4rem;", texto: "Prévia das 3 primeiras linhas da planilha" }));
    var wrapPreview = el("div", { class: "tabela-scroll" });
    var tabelaPreview = el("table");
    tabelaPreview.appendChild(el("thead", {}, [el("tr", {}, cabecalhos.map(function (h) { return el("th", { texto: h }); }))]));
    var corpoPreview = el("tbody");
    linhas.slice(0, 3).forEach(function (linha) {
      corpoPreview.appendChild(el("tr", {}, cabecalhos.map(function (h, indice) { return el("td", { texto: linha[indice] || "" }); })));
    });
    tabelaPreview.appendChild(corpoPreview);
    wrapPreview.appendChild(tabelaPreview);
    corpo.appendChild(wrapPreview);

    var faixaResultado = avisoSecao("");
    faixaResultado.hidden = true;
    faixaResultado.style.marginTop = "1rem";
    corpo.appendChild(faixaResultado);

    var botaoImportar = el("button", { type: "button", class: "botao botao-primario", texto: "Importar " + linhas.length + " marcas", style: "margin-top:1rem;" });
    botaoImportar.addEventListener("click", async function () {
      var indiceNome = Number(selects.nome.value);
      if (indiceNome === -1) {
        faixaResultado.style.background = "";
        faixaResultado.style.color = "";
        faixaResultado.textContent = "Escolha qual coluna tem o nome da marca antes de importar.";
        faixaResultado.hidden = false;
        return;
      }

      botaoImportar.disabled = true;
      botaoImportar.textContent = "Importando...";

      var mapeamentoFinal = {};
      CAMPOS_MARCAS_IMPORT.forEach(function (campo) { mapeamentoFinal[campo.chave] = Number(selects[campo.chave].value); });

      var registros = [];
      var puladas = 0;
      linhas.forEach(function (linha) {
        var nome = mapeamentoFinal.nome !== -1 ? (linha[mapeamentoFinal.nome] || "").trim() : "";
        if (!nome) { puladas++; return; }
        registros.push({
          nome: nome,
          nicho: mapeamentoFinal.nicho !== -1 ? (linha[mapeamentoFinal.nicho] || "").trim() : "",
          instagram: mapeamentoFinal.instagram !== -1 ? (linha[mapeamentoFinal.instagram] || "").trim() : "",
          email: mapeamentoFinal.email !== -1 ? (linha[mapeamentoFinal.email] || "").trim() : "",
          telefone: mapeamentoFinal.telefone !== -1 ? (linha[mapeamentoFinal.telefone] || "").trim() : "",
          situacao: normalizarSituacaoImportada(mapeamentoFinal.situacao !== -1 ? linha[mapeamentoFinal.situacao] : ""),
          obs: mapeamentoFinal.obs !== -1 ? (linha[mapeamentoFinal.obs] || "").trim() : "",
          ultimo_contato: mapeamentoFinal.ultimo_contato !== -1 ? parseDataPlanilha(linha[mapeamentoFinal.ultimo_contato]) : null
        });
      });

      try {
        var tamanhoLote = 200;
        for (var i = 0; i < registros.length; i += tamanhoLote) {
          var lote = registros.slice(i, i + tamanhoLote);
          var resp = await sb.from("marcas").insert(lote);
          if (resp.error) throw resp.error;
        }
        faixaResultado.style.background = "var(--vanilla)";
        faixaResultado.style.color = "var(--vanilla-escuro)";
        faixaResultado.textContent = registros.length + " marcas importadas" + (puladas > 0 ? ", " + puladas + " linhas puladas por não terem nome" : "") + ". Pode fechar esta janela.";
        faixaResultado.hidden = false;
        botaoImportar.hidden = true;
        renderizarAba("marcas");
      } catch (erro) {
        console.error(erro);
        faixaResultado.style.background = "";
        faixaResultado.style.color = "";
        faixaResultado.textContent = "Não consegui importar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaResultado.hidden = false;
        botaoImportar.disabled = false;
        botaoImportar.textContent = "Importar " + linhas.length + " marcas";
      }
    });
    corpo.appendChild(botaoImportar);

    abrirModal(corpo, "Conferir colunas antes de importar");
  }

  /* =========================================================
     SEÇÃO PROSPECÇÃO
     ========================================================= */
  var cacheEmailEnvios = [];
  var cacheEmailOptout = [];

  async function carregarDadosProspeccao() {
    var respMarcas = await consultarTabela("marcas", function (q) { return q.order("criado_em", { ascending: false }); });
    var respEnvios = await consultarTabela("email_envios", function (q) { return q.order("criado_em", { ascending: false }).limit(2000); });
    var respOptout = await consultarTabela("email_optout");
    if (!respMarcas.erro) cacheMarcas = respMarcas.dados;
    cacheEmailEnvios = respEnvios.erro ? [] : respEnvios.dados;
    cacheEmailOptout = respOptout.erro ? [] : respOptout.dados;
    return { erroMarcas: respMarcas.erro, erroEnvios: respEnvios.erro, erroOptout: respOptout.erro };
  }

  function situacoesExistentesEmMarcas() {
    var vistos = {};
    var lista = [];
    cacheMarcas.forEach(function (m) {
      if (m.situacao && !vistos[m.situacao]) { vistos[m.situacao] = true; lista.push(m.situacao); }
    });
    return lista;
  }

  function emailsOptoutSet() {
    var s = {};
    cacheEmailOptout.forEach(function (o) { s[String(o.email).toLowerCase()] = true; });
    return s;
  }

  function emailsJaEnviadosParaAssunto(assunto) {
    var s = {};
    var alvo = (assunto || "").trim().toLowerCase();
    if (!alvo) return s;
    cacheEmailEnvios.forEach(function (e) {
      if (e.status === "ok" && (e.assunto || "").trim().toLowerCase() === alvo) s[String(e.email).toLowerCase()] = true;
    });
    return s;
  }

  function calcularDestinatariosProspeccao() {
    var pr = estado.prospeccao;
    var candidatas;
    if (pr.filtro === "selecionadas") candidatas = cacheMarcas.filter(function (m) { return m.selecionada; });
    else if (pr.filtro === "teste") candidatas = [];
    else if (pr.filtro === "todas") candidatas = cacheMarcas.slice();
    else if (pr.filtro.indexOf("situacao:") === 0) {
      var alvoSituacao = pr.filtro.slice("situacao:".length);
      candidatas = cacheMarcas.filter(function (m) { return m.situacao === alvoSituacao; });
    } else candidatas = [];

    var comEmail = candidatas.filter(function (m) { return m.email && m.email.trim(); });
    var foraDoEmail = candidatas.length - comEmail.length;

    var vistosEmail = {};
    var unicos = [];
    comEmail.forEach(function (m) {
      var chave = m.email.trim().toLowerCase();
      if (vistosEmail[chave]) return;
      vistosEmail[chave] = true;
      unicos.push(m);
    });

    var optout = emailsOptoutSet();
    var semOptout = unicos.filter(function (m) { return !optout[m.email.trim().toLowerCase()]; });

    var jaEnviados = 0;
    var listaFinal = semOptout;
    if (pr.pularJaEnviados && pr.assunto.trim()) {
      var enviadosSet = emailsJaEnviadosParaAssunto(pr.assunto);
      listaFinal = semOptout.filter(function (m) {
        var jaFoi = !!enviadosSet[m.email.trim().toLowerCase()];
        if (jaFoi) jaEnviados++;
        return !jaFoi;
      });
    }

    return { lista: listaFinal, foraDoEmail: foraDoEmail, jaEnviados: jaEnviados };
  }

  function primeiroNomeTexto(texto) {
    var partes = (texto || "").trim().split(/\s+/);
    return partes[0] || texto || "";
  }

  function escaparHtmlEmail(texto) {
    return escaparHtml(texto).replace(/\n/g, "<br>");
  }

  function linkificarTexto(textoEscapado) {
    return textoEscapado.replace(/((https?:\/\/|www\.)[^\s<]+)/g, function (url) {
      var href = url.indexOf("http") === 0 ? url : "https://" + url;
      return '<a href="' + href + '" style="color:#49622d;">' + url + "</a>";
    });
  }

  function gerarHtmlModoTexto(config) {
    var corpoHtml = linkificarTexto(escaparHtmlEmail(config.texto || ""));
    var botaoHtml = "";
    if (config.textoBotao && config.linkBotao) {
      botaoHtml =
        '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;"><tr><td style="background:#49622d;border-radius:999px;">' +
        '<a href="' + escaparHtml(config.linkBotao) + '" style="display:inline-block;padding:12px 24px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;font-family:Arial,Helvetica,sans-serif;">' +
        escaparHtml(config.textoBotao) + "</a></td></tr></table>";
    }
    return (
      '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
      '<body style="margin:0;padding:0;background:#f6f7f5;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f7f5;padding:24px 12px;"><tr><td align="center">' +
      '<table role="presentation" width="560" style="max-width:560px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">' +
      '<tr><td style="padding:32px 28px;color:#1c211f;font-size:15px;line-height:1.6;">' + corpoHtml + botaoHtml + "</td></tr>" +
      '<tr><td style="padding:18px 28px;border-top:1px solid #e4e7e3;color:#9aa39a;font-size:12px;line-height:1.5;">' +
      "Se não quiser mais receber estes e-mails, é só responder com a palavra SAIR ou clicar em cancelar inscrição." +
      "</td></tr></table></td></tr></table></body></html>"
    );
  }

  function modeloBaseHtmlProspeccao() {
    return gerarHtmlModoTexto({
      texto: "Olá, {{nome}}!\n\nMeu nome é Samara Dias e trabalho produzindo vídeos UGC (conteúdo autêntico) para marcas como a {{marca}}.\n\nGostaria de me apresentar e entender se faz sentido pra vocês. Posso te mandar o meu portfólio?\n\nUm abraço,\nSamara Dias",
      textoBotao: "Ver meu portfólio",
      linkBotao: "https://ugcsamara.github.io/samaraugc/"
    });
  }

  function htmlEfetivoProspeccao() {
    var pr = estado.prospeccao;
    if (pr.modoEscrita === "html") return pr.html;
    return gerarHtmlModoTexto({ texto: pr.textoSimples, textoBotao: pr.textoBotao, linkBotao: pr.linkBotao });
  }

  function substituirVariaveisLocais(texto, nome, marca) {
    return (texto || "").split("{{nome}}").join(nome).split("{{marca}}").join(marca);
  }

  function tirarTagsSimples(html) {
    return (html || "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|tr|table)>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function textoPlanoProspeccao(nome, marca) {
    var pr = estado.prospeccao;
    var base;
    if (pr.modoEscrita === "texto") {
      base = pr.textoSimples || "";
      if (pr.textoBotao && pr.linkBotao) base += "\n\n" + pr.textoBotao + ": " + pr.linkBotao;
    } else {
      base = tirarTagsSimples(pr.html);
    }
    base += "\n\n--\nSe não quiser mais receber estes e-mails, é só responder com a palavra SAIR.";
    return substituirVariaveisLocais(base, nome, marca);
  }

  async function renderizarProspeccao(container) {
    container.innerHTML = "";
    var erros = await carregarDadosProspeccao();
    if (erros.erroMarcas) container.appendChild(avisoSecao(erros.erroMarcas));
    if (erros.erroEnvios) container.appendChild(avisoSecao(erros.erroEnvios));
    if (erros.erroOptout) container.appendChild(avisoSecao(erros.erroOptout));

    // ---- BLOCO 1: capa ----
    var totalEnviadosHistorico = erros.erroEnvios ? null : cacheEmailEnvios.filter(function (e) { return e.status === "ok"; }).length;
    var capa = el("div", { class: "pr-capa" });
    var capaTopo = el("div", { class: "pr-capa-topo" });
    var capaEsquerda = el("div");
    capaEsquerda.appendChild(el("div", { class: "pr-capa-icone", html: ICONES.envelope }));
    capaEsquerda.appendChild(el("h2", { texto: "Prospecção" }));
    capaEsquerda.appendChild(el("p", { class: "pr-capa-explicacao", texto: "Manda o seu e-mail de apresentação pra várias marcas da sua base de uma vez, cada uma chamada pelo nome." }));
    capaTopo.appendChild(capaEsquerda);
    var capaDireita = el("div");
    capaDireita.appendChild(el("p", { class: "pr-capa-numero", texto: totalEnviadosHistorico === null ? "-" : String(totalEnviadosHistorico) }));
    capaDireita.appendChild(el("p", { class: "pr-capa-numero-rotulo", texto: "enviados até agora" }));
    capaTopo.appendChild(capaDireita);
    capa.appendChild(capaTopo);
    var capaEtiquetas = el("div", { class: "pr-capa-etiquetas" });
    ["teste antes sempre", "a chave vive no Supabase", "quem responde SAIR sai da lista"].forEach(function (t) {
      capaEtiquetas.appendChild(el("span", { class: "pr-capa-etiqueta", texto: t }));
    });
    capa.appendChild(capaEtiquetas);
    container.appendChild(capa);

    // ---- BLOCO 2: métricas ----
    var marcasComEmail = cacheMarcas.filter(function (m) { return m.email && m.email.trim(); });
    var destinatariosAgora = calcularDestinatariosProspeccao();
    var totalFalhas = erros.erroEnvios ? null : cacheEmailEnvios.filter(function (e) { return e.status === "erro"; }).length;
    var totalDescadastrados = erros.erroOptout ? null : cacheEmailOptout.length;

    var metricas = el("div", { class: "pr-metricas" });
    function cartaoMetrica(numero, rotulo, cor, contexto) {
      var c = el("div", { class: "pr-metrica", style: "--cor:" + cor + ";" });
      c.appendChild(el("p", { class: "pr-metrica-numero", texto: numero === null ? "-" : String(numero) }));
      c.appendChild(el("p", { class: "pr-metrica-rotulo", texto: rotulo }));
      if (contexto) c.appendChild(el("p", { class: "pr-metrica-contexto", texto: contexto }));
      return c;
    }
    metricas.appendChild(cartaoMetrica(erros.erroMarcas ? null : marcasComEmail.length, "com e-mail na base", "var(--vanilla-escuro)", erros.erroMarcas ? "" : cacheMarcas.length + " marcas no total"));
    metricas.appendChild(cartaoMetrica(destinatariosAgora.lista.length, "a enviar", "var(--azul)", "ainda não receberam nada"));
    metricas.appendChild(cartaoMetrica(totalEnviadosHistorico, "já receberam", "var(--verde-sucesso)", "pelo menos um e-mail"));
    metricas.appendChild(cartaoMetrica(totalFalhas, "falhas", "var(--erro)", "e-mails que voltaram"));
    metricas.appendChild(cartaoMetrica(totalDescadastrados, "descadastrados", "var(--amarelo-texto)", "responderam SAIR"));
    container.appendChild(metricas);

    if (!erros.erroMarcas && marcasComEmail.length === 0) {
      var cartaoVazio = el("div", { class: "cartao" });
      cartaoVazio.appendChild(estadoVazio("Sua base de marcas ainda está sem nenhum e-mail cadastrado. Cadastre à mão ou importe a planilha primeiro."));
      var botaoIrMarcas = el("button", { type: "button", class: "botao botao-primario", texto: "Ir para Marcas", style: "margin-top:.9rem;" });
      botaoIrMarcas.addEventListener("click", function () { irParaAba("marcas"); });
      cartaoVazio.appendChild(botaoIrMarcas);
      container.appendChild(cartaoVazio);
      return;
    }

    // ---- BLOCO 3: formulário + prévia ----
    var corpoDuasColunas = el("div", { class: "pr-corpo" });
    var colEsquerda = el("div");
    var colDireita = el("div", { class: "pr-palco" });
    corpoDuasColunas.appendChild(colEsquerda);
    corpoDuasColunas.appendChild(colDireita);
    container.appendChild(corpoDuasColunas);

    // -- referências da prévia (preenchidas abaixo) --
    var refPrevia = {};

    function nomeExemplo() { return "Ana"; }
    function marcaExemplo() { return "Loja Exemplo"; }

    function atualizarPrevia() {
      if (!refPrevia.assunto || !refPrevia.iframe) return;
      var assuntoExemplo = substituirVariaveisLocais(estado.prospeccao.assunto || "(sem assunto)", nomeExemplo(), marcaExemplo());
      var htmlExemplo = substituirVariaveisLocais(htmlEfetivoProspeccao(), nomeExemplo(), marcaExemplo());
      refPrevia.assunto.textContent = assuntoExemplo;
      refPrevia.iframe.setAttribute("srcdoc", htmlExemplo);
    }

    function atualizarContagem() {
      var d = calcularDestinatariosProspeccao();
      var texto = d.lista.length + (d.lista.length === 1 ? " marca vai receber" : " marcas vão receber");
      if (d.foraDoEmail > 0) texto += ", " + d.foraDoEmail + " ficaram de fora por não ter e-mail";
      if (d.jaEnviados > 0) texto += ", " + d.jaEnviados + " puladas por já terem recebido este assunto";
      if (refPrevia.contagem) refPrevia.contagem.textContent = texto;
      return d;
    }

    montarFormularioProspeccao(colEsquerda, { atualizarPrevia: atualizarPrevia, atualizarContagem: atualizarContagem, refPrevia: refPrevia });
    montarPreviaProspeccao(colDireita, refPrevia);
    atualizarPrevia();
    atualizarContagem();

    // ---- histórico ----
    container.appendChild(montarHistoricoProspeccao());
  }

  function montarPreviaProspeccao(container, refPrevia) {
    var botaoTelaCheia = el("div", { class: "pr-ver-tela-cheia" }, [
      (function () {
        var b = el("button", { type: "button", class: "botao", html: ICONES.expandir + "Ver em tela cheia" });
        b.addEventListener("click", function () { abrirPreviaTelaCheia(refPrevia); });
        return b;
      })()
    ]);
    container.appendChild(botaoTelaCheia);

    var janela = el("div", { class: "email-janela" });
    var cabecalho = el("div", { class: "email-janela-cabecalho" });
    cabecalho.appendChild(el("div", { class: "email-janela-avatar", texto: "S" }));
    var infoTexto = el("div");
    var assuntoEl = el("p", { class: "email-janela-assunto", texto: "" });
    var deEl = el("p", { class: "email-janela-de", html: "Samara Dias &middot; " + escaparHtml(EMAIL_CONTATO_PROSPECCAO) + "<br>para você" });
    infoTexto.appendChild(assuntoEl);
    infoTexto.appendChild(deEl);
    cabecalho.appendChild(infoTexto);
    janela.appendChild(cabecalho);

    var iframe = el("iframe", { title: "Prévia do e-mail", style: "width:100%;border:none;height:26rem;display:block;" });
    janela.appendChild(iframe);
    container.appendChild(janela);

    container.appendChild(el("p", { class: "pr-dica-teste", texto: "Antes de disparar de verdade, sempre mande o teste pra você mesma e abra no celular." }));

    refPrevia.assunto = assuntoEl;
    refPrevia.iframe = iframe;

    iframe.addEventListener("load", function () {
      try {
        var altura = iframe.contentWindow.document.body.scrollHeight;
        iframe.style.height = Math.max(Math.min(altura + 20, 720), 200) + "px";
      } catch (e) { /* ignora, mantém a altura padrão */ }
    });
  }

  function abrirPreviaTelaCheia(refPrevia) {
    var fundo = document.getElementById("pr-tela-cheia-fundo");
    var conteudo = document.getElementById("pr-tela-cheia-conteudo");
    conteudo.innerHTML = "";
    var iframeGrande = el("iframe", { title: "Prévia do e-mail em tela cheia", style: "width:100%;border:none;height:80vh;background:#fff;border-radius:16px;" });
    iframeGrande.setAttribute("srcdoc", refPrevia.iframe.getAttribute("srcdoc") || "");
    conteudo.appendChild(iframeGrande);
    fundo.hidden = false;
  }
  document.getElementById("pr-tela-cheia-fechar").addEventListener("click", function () {
    document.getElementById("pr-tela-cheia-fundo").hidden = true;
  });
  document.getElementById("pr-tela-cheia-fundo").addEventListener("click", function (evento) {
    if (evento.target.id === "pr-tela-cheia-fundo") evento.currentTarget.hidden = true;
  });

  function montarFormularioProspeccao(container, ganchos) {
    var pr = estado.prospeccao;
    var atualizarPrevia = ganchos.atualizarPrevia;
    var atualizarContagem = ganchos.atualizarContagem;

    // ---- como vou mandar (primeiro cartão) ----
    var cartaoComoMandar = el("div", { class: "cartao" });
    cartaoComoMandar.appendChild(el("p", { class: "cartao-titulo", texto: "Como vou mandar" }));
    var escolhaEnvio = el("div", { class: "pr-modo-escolha" });
    var botaoEnvioAutomatico = el("button", { type: "button", class: "pr-modo-botao", texto: "Automático, pelo Resend", "aria-pressed": pr.modoEnvio === "automatico" ? "true" : "false" });
    var botaoEnvioRascunho = el("button", { type: "button", class: "pr-modo-botao", texto: "Rascunho, eu mesma envio", "aria-pressed": pr.modoEnvio === "rascunho" ? "true" : "false" });
    escolhaEnvio.appendChild(botaoEnvioAutomatico);
    escolhaEnvio.appendChild(botaoEnvioRascunho);
    cartaoComoMandar.appendChild(escolhaEnvio);
    var explicacaoEnvio = el("div", { class: "aviso-secao", style: "background:var(--gelo);color:var(--texto-suave);margin-top:.8rem;margin-bottom:0;" });
    cartaoComoMandar.appendChild(explicacaoEnvio);
    container.appendChild(cartaoComoMandar);

    // ---- para quem vai ----
    var cartaoDestinatarios = el("div", { class: "cartao" });
    cartaoDestinatarios.appendChild(el("p", { class: "cartao-titulo", texto: "Para quem vai" }));
    cartaoDestinatarios.appendChild(el("p", { style: "font-size:.78rem;color:var(--texto-suave);margin-bottom:.8rem;", texto: "Os e-mails vêm da sua aba Marcas." }));

    var selectFiltro = el("select", { style: "width:100%;margin-bottom:.6rem;" });
    var opcoesFiltro = [
      ["selecionadas", "Só as marcas que eu selecionei"],
      ["teste", "Só pra mim (teste)"],
      ["todas", "Todas as marcas com e-mail"]
    ];
    situacoesExistentesEmMarcas().forEach(function (s) { opcoesFiltro.push(["situacao:" + s, "Só situação: " + s]); });
    opcoesFiltro.forEach(function (o) {
      var opt = el("option", { value: o[0], texto: o[1] });
      if (o[0] === pr.filtro) opt.selected = true;
      selectFiltro.appendChild(opt);
    });
    selectFiltro.addEventListener("change", function () {
      pr.filtro = selectFiltro.value;
      var d = atualizarContagem();
      if (pr.filtro === "selecionadas" && d.lista.length === 0) {
        avisoSemSelecionadas.hidden = false;
      } else {
        avisoSemSelecionadas.hidden = true;
      }
    });
    cartaoDestinatarios.appendChild(selectFiltro);

    var avisoSemSelecionadas = el("div", { class: "aviso-secao", style: "display:flex;align-items:center;justify-content:space-between;gap:.6rem;flex-wrap:wrap;" });
    avisoSemSelecionadas.hidden = true;
    var botaoIrSelecionar = el("button", { type: "button", class: "botao", texto: "Ir selecionar marcas" });
    botaoIrSelecionar.addEventListener("click", function () { irParaAba("marcas"); });
    avisoSemSelecionadas.appendChild(el("span", { texto: "Você ainda não selecionou nenhuma marca." }));
    avisoSemSelecionadas.appendChild(botaoIrSelecionar);
    cartaoDestinatarios.appendChild(avisoSemSelecionadas);
    if (pr.filtro === "selecionadas" && calcularDestinatariosProspeccao().lista.length === 0) avisoSemSelecionadas.hidden = false;

    var linhaContagem = el("p", { style: "font-size:.82rem;color:var(--texto-suave);margin-bottom:.8rem;" });
    cartaoDestinatarios.appendChild(linhaContagem);

    var labelPular = el("label", { style: "display:flex;align-items:flex-start;gap:.5rem;font-size:.82rem;cursor:pointer;" });
    var checkboxPular = el("input", { type: "checkbox" });
    checkboxPular.checked = pr.pularJaEnviados;
    checkboxPular.addEventListener("change", function () {
      pr.pularJaEnviados = checkboxPular.checked;
      atualizarContagem();
    });
    labelPular.appendChild(checkboxPular);
    labelPular.appendChild(el("span", { texto: "Pular quem já recebeu este mesmo assunto (bom pra continuar um disparo que parou no meio)" }));
    cartaoDestinatarios.appendChild(labelPular);
    container.appendChild(cartaoDestinatarios);

    // ---- escrever o e-mail ----
    var cartaoEscrever = el("div", { class: "cartao" });
    cartaoEscrever.appendChild(el("p", { class: "cartao-titulo", texto: "Escrever o e-mail" }));

    var campoAssunto = campoTexto({ id: "pr-assunto", rotulo: "Assunto", valor: pr.assunto, obrigatorio: true });
    campoAssunto.input.addEventListener("input", function () { pr.assunto = campoAssunto.input.value; atualizarPrevia(); atualizarContagem(); });
    cartaoEscrever.appendChild(campoAssunto.wrap);

    var escolhaModo = el("div", { class: "pr-modo-escolha" });
    var botaoModoTexto = el("button", { type: "button", class: "pr-modo-botao", texto: "Texto fácil", "aria-pressed": pr.modoEscrita === "texto" ? "true" : "false" });
    var botaoModoHtml = el("button", { type: "button", class: "pr-modo-botao", texto: "HTML", "aria-pressed": pr.modoEscrita === "html" ? "true" : "false" });
    escolhaModo.appendChild(botaoModoTexto);
    escolhaModo.appendChild(botaoModoHtml);
    cartaoEscrever.appendChild(escolhaModo);

    var blocoModoTexto = el("div");
    var campoTextoSimples = campoTextarea({ id: "pr-texto", rotulo: "Sua mensagem (use {{nome}} e {{marca}} onde quiser)", valor: pr.textoSimples });
    campoTextoSimples.input.style.minHeight = "10rem";
    campoTextoSimples.input.addEventListener("input", function () { pr.textoSimples = campoTextoSimples.input.value; atualizarPrevia(); });
    blocoModoTexto.appendChild(campoTextoSimples.wrap);
    blocoModoTexto.appendChild(el("p", { style: "font-size:.74rem;color:var(--texto-suave);margin:-.5rem 0 .9rem;", texto: "Escreva normal. Linha em branco separa parágrafo, e link vira clicável sozinho." }));

    var linhaBotaoEmail = el("div", { class: "linha-campos" });
    var campoTextoBotao = campoTexto({ id: "pr-botao-texto", rotulo: "Texto do botão (opcional)", valor: pr.textoBotao });
    var campoLinkBotao = campoTexto({ id: "pr-botao-link", rotulo: "Link do botão", valor: pr.linkBotao });
    campoTextoBotao.input.addEventListener("input", function () { pr.textoBotao = campoTextoBotao.input.value; atualizarPrevia(); });
    campoLinkBotao.input.addEventListener("input", function () { pr.linkBotao = campoLinkBotao.input.value; atualizarPrevia(); });
    linhaBotaoEmail.appendChild(campoTextoBotao.wrap);
    linhaBotaoEmail.appendChild(campoLinkBotao.wrap);
    blocoModoTexto.appendChild(linhaBotaoEmail);
    cartaoEscrever.appendChild(blocoModoTexto);

    var blocoModoHtml = el("div");
    blocoModoHtml.hidden = true;
    var botaoModelo = el("button", { type: "button", class: "botao", texto: "Começar do modelo pronto", style: "margin-bottom:.7rem;" });
    botaoModelo.addEventListener("click", function () {
      pr.html = modeloBaseHtmlProspeccao();
      campoHtml.input.value = pr.html;
      atualizarPrevia();
    });
    blocoModoHtml.appendChild(botaoModelo);
    var campoHtml = campoTextarea({ id: "pr-html", rotulo: "Cole aqui o HTML do e-mail", valor: pr.html });
    campoHtml.input.style.minHeight = "12rem";
    campoHtml.input.style.fontFamily = "ui-monospace, Consolas, monospace";
    campoHtml.input.style.fontSize = ".78rem";
    campoHtml.input.addEventListener("input", function () { pr.html = campoHtml.input.value; atualizarPrevia(); });
    blocoModoHtml.appendChild(campoHtml.wrap);
    var avisoSemSair = el("p", { style: "font-size:.76rem;color:var(--erro);", texto: "Atenção: esse HTML não tem a frase de descadastro (SAIR). Isso vai ser avisado de novo antes de disparar." });
    avisoSemSair.hidden = true;
    blocoModoHtml.appendChild(avisoSemSair);
    cartaoEscrever.appendChild(blocoModoHtml);

    function trocarModo(novoModo) {
      pr.modoEscrita = novoModo;
      botaoModoTexto.setAttribute("aria-pressed", novoModo === "texto" ? "true" : "false");
      botaoModoHtml.setAttribute("aria-pressed", novoModo === "html" ? "true" : "false");
      blocoModoTexto.hidden = novoModo !== "texto";
      blocoModoHtml.hidden = novoModo !== "html";
      atualizarPrevia();
    }
    botaoModoTexto.addEventListener("click", function () { trocarModo("texto"); });
    botaoModoHtml.addEventListener("click", function () { trocarModo("html"); });
    trocarModo(pr.modoEscrita);

    var blocoAutomatico = el("div", { style: "margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--linha);" });
    var blocoRascunho = el("div", { style: "margin-top:1.1rem;padding-top:1.1rem;border-top:1px solid var(--linha);" });
    montarBlocoEnvioAutomatico(blocoAutomatico, atualizarContagem);
    montarBlocoRascunho(blocoRascunho, atualizarContagem);
    cartaoEscrever.appendChild(blocoAutomatico);
    cartaoEscrever.appendChild(blocoRascunho);

    container.appendChild(cartaoEscrever);

    var TEXTOS_MODO_ENVIO = {
      automatico: "No modo automático o disparo sai sozinho. Enquanto você não tiver um domínio verificado no Resend, ele só consegue entregar para o seu próprio e-mail.",
      rascunho: "No modo rascunho nada sai sozinho: você monta a fila, e pra cada marca abre um rascunho pronto no Gmail pra você conferir e clicar em enviar."
    };
    function trocarModoEnvio(novo) {
      pr.modoEnvio = novo;
      botaoEnvioAutomatico.setAttribute("aria-pressed", novo === "automatico" ? "true" : "false");
      botaoEnvioRascunho.setAttribute("aria-pressed", novo === "rascunho" ? "true" : "false");
      blocoAutomatico.hidden = novo !== "automatico";
      blocoRascunho.hidden = novo !== "rascunho";
      explicacaoEnvio.textContent = TEXTOS_MODO_ENVIO[novo];
    }
    botaoEnvioAutomatico.addEventListener("click", function () { trocarModoEnvio("automatico"); });
    botaoEnvioRascunho.addEventListener("click", function () { trocarModoEnvio("rascunho"); });
    trocarModoEnvio(pr.modoEnvio);

    ganchos.refPrevia.contagem = linhaContagem;
  }

  async function enviarViaFuncao(destinatarios, assunto, html) {
    var sessao = await sb.auth.getSession();
    var token = sessao.data && sessao.data.session ? sessao.data.session.access_token : null;
    if (!token) throw new Error("Sessão expirada. Saia e entre de novo.");
    var resposta = await fetch(URL_FUNCAO_ENVIAR, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
      body: JSON.stringify({ destinatarios: destinatarios, assunto: assunto, html: html })
    });
    var dados = await resposta.json().catch(function () { return {}; });
    if (!resposta.ok) throw new Error(dados.erro || "Não consegui falar com a função de envio (resposta " + resposta.status + ").");
    return dados;
  }

  function montarBlocoEnvioAutomatico(container, atualizarContagem) {
    var pr = estado.prospeccao;

    var botaoTeste = el("button", { type: "button", class: "botao", texto: "Enviar teste pra mim" });
    var botaoDisparar = el("button", { type: "button", class: "botao botao-primario", texto: "Disparar", style: "margin-left:.6rem;" });
    container.appendChild(botaoTeste);
    container.appendChild(botaoDisparar);

    var areaResultado = el("div", { style: "margin-top:1rem;" });
    container.appendChild(areaResultado);

    botaoTeste.addEventListener("click", async function () {
      if (!pr.assunto.trim()) { alert("Escreva um assunto antes de testar."); return; }
      botaoTeste.disabled = true;
      botaoTeste.textContent = "Enviando teste...";
      areaResultado.innerHTML = "";
      try {
        var dados = await enviarViaFuncao(
          [{ email: EMAIL_CONTATO_PROSPECCAO, nome: "Ana Exemplo", marca: "Loja Exemplo" }],
          pr.assunto, htmlEfetivoProspeccao()
        );
        if (dados.cotaEsgotada) {
          areaResultado.appendChild(avisoSecao("A cota diária do Resend acabou. Volte amanhã e tente de novo."));
        } else if (dados.enviados > 0) {
          areaResultado.appendChild(el("p", { style: "background:var(--vanilla);color:var(--vanilla-escuro);border-radius:var(--raio-mini);padding:.7rem .9rem;font-size:.85rem;font-weight:600;", texto: "Teste enviado! Confira sua caixa de entrada (e o spam)." }));
        } else {
          areaResultado.appendChild(avisoSecao("Não consegui enviar o teste. Confira o Resend."));
        }
      } catch (erro) {
        console.error(erro);
        areaResultado.appendChild(avisoSecao("Não consegui enviar o teste. Detalhe: " + erro.message));
      }
      botaoTeste.disabled = false;
      botaoTeste.textContent = "Enviar teste pra mim";
    });

    botaoDisparar.addEventListener("click", function () {
      if (!pr.assunto.trim()) { alert("Escreva um assunto antes de disparar."); return; }
      if (pr.modoEscrita === "html" && pr.html.toUpperCase().indexOf("SAIR") === -1) {
        if (!confirm("O seu HTML não parece ter a frase de descadastro (SAIR). Quer disparar mesmo assim?")) return;
      }
      var d = calcularDestinatariosProspeccao();
      if (d.lista.length === 0) {
        alert("Não há nenhuma marca pra receber com esse filtro agora.");
        return;
      }
      abrirConfirmacaoDisparo(d, function () { executarDisparoConfirmado(d, areaResultado, atualizarContagem); });
    });
  }

  function abrirConfirmacaoDisparo(d, aoConfirmar) {
    var pr = estado.prospeccao;
    var nomesFiltro = {
      selecionadas: "as marcas selecionadas", teste: "só você (teste)", todas: "todas as marcas com e-mail"
    };
    var nomeFiltro = nomesFiltro[pr.filtro] || ("situação " + pr.filtro.replace("situacao:", ""));
    var texto = el("p", { style: "font-size:.9rem;margin-bottom:1.3rem;" });
    texto.innerHTML = "Vai para <strong>" + d.lista.length + " marcas</strong>, da lista <strong>" + escaparHtml(nomeFiltro) + "</strong>. Depois de começar, não dá pra desfazer.";
    var botoes = el("div", { style: "display:flex;gap:.6rem;justify-content:flex-end;" });
    var cancelar = el("button", { type: "button", class: "botao", texto: "Cancelar" });
    cancelar.addEventListener("click", fecharModal);
    var confirmar = el("button", { type: "button", class: "botao botao-primario", texto: "Sim, disparar" });
    confirmar.addEventListener("click", function () { fecharModal(); aoConfirmar(); });
    botoes.appendChild(cancelar);
    botoes.appendChild(confirmar);
    abrirModal([texto, botoes], "Confirmar disparo");
  }

  async function executarDisparoConfirmado(d, areaResultado, atualizarContagem) {
    var pr = estado.prospeccao;
    areaResultado.innerHTML = "";
    var barraFundo = el("div", { class: "pr-progresso-fundo" }, [el("span", { class: "pr-progresso-barra", style: "width:0%" })]);
    var textoProgresso = el("p", { style: "font-size:.8rem;color:var(--texto-suave);" }, [document.createTextNode("Enviando 0 de " + d.lista.length + "...")]);
    areaResultado.appendChild(barraFundo);
    areaResultado.appendChild(textoProgresso);

    var tamanhoLote = 100;
    var totalEnviados = 0, totalFalhas = 0, totalPulados = 0, cotaEsgotada = false, erroGeral = null;

    for (var i = 0; i < d.lista.length; i += tamanhoLote) {
      var lote = d.lista.slice(i, i + tamanhoLote).map(function (m) { return { email: m.email, nome: m.nome, marca: m.nome }; });
      try {
        var dados = await enviarViaFuncao(lote, pr.assunto, htmlEfetivoProspeccao());
        totalEnviados += dados.enviados || 0;
        totalFalhas += dados.falhas || 0;
        totalPulados += dados.pulados || 0;
        if (dados.cotaEsgotada) { cotaEsgotada = true; }
      } catch (erro) {
        console.error(erro);
        erroGeral = erro.message;
      }
      var feitos = Math.min(i + tamanhoLote, d.lista.length);
      barraFundo.querySelector("span").style.width = Math.round((feitos / d.lista.length) * 100) + "%";
      textoProgresso.textContent = "Enviando " + feitos + " de " + d.lista.length + "...";
      if (cotaEsgotada || erroGeral) break;
    }

    areaResultado.innerHTML = "";
    var resumo = el("div", { class: "cartao", style: "background:var(--gelo);" });
    resumo.appendChild(el("p", { style: "font-weight:800;margin-bottom:.5rem;", texto: "Disparo concluído" }));
    resumo.appendChild(el("p", { style: "font-size:.85rem;", texto: totalEnviados + " enviados, " + totalFalhas + " falharam, " + totalPulados + " pulados." }));
    if (erroGeral) resumo.appendChild(el("p", { class: "aviso-secao", style: "margin-top:.6rem;", texto: "Parou por um erro: " + erroGeral }));
    if (cotaEsgotada) {
      resumo.appendChild(el("p", { class: "aviso-secao", style: "margin-top:.6rem;", texto: "A cota diária do Resend acabou. Volte amanhã, cole o mesmo assunto e texto, e deixe marcada a caixinha de pular quem já recebeu: ele manda só pros que faltaram." }));
    }
    areaResultado.appendChild(resumo);

    if (estado.prospeccao.filtro === "selecionadas") {
      var perguntaLimpar = el("div", { style: "display:flex;align-items:center;gap:.6rem;margin-top:.8rem;flex-wrap:wrap;" });
      perguntaLimpar.appendChild(el("span", { style: "font-size:.82rem;", texto: "Quer limpar a seleção de marcas agora?" }));
      var simLimpar = el("button", { type: "button", class: "botao", texto: "Sim, limpar" });
      var naoLimpar = el("button", { type: "button", class: "botao", texto: "Não, manter" });
      simLimpar.addEventListener("click", async function () {
        try {
          await sb.from("marcas").update({ selecionada: false }).eq("selecionada", true);
          cacheMarcas.forEach(function (m) { m.selecionada = false; });
          perguntaLimpar.textContent = "Seleção limpa.";
        } catch (erro) { alert("Não consegui limpar agora."); }
      });
      naoLimpar.addEventListener("click", function () { perguntaLimpar.textContent = "Seleção mantida."; });
      perguntaLimpar.appendChild(simLimpar);
      perguntaLimpar.appendChild(naoLimpar);
      areaResultado.appendChild(perguntaLimpar);
    }

    carregarDadosProspeccao().then(function () { atualizarContagem(); });
  }

  function montarBlocoRascunho(container, atualizarContagem) {
    var pr = estado.prospeccao;
    var botaoMontarFila = el("button", { type: "button", class: "botao botao-primario", texto: "Montar fila de rascunhos" });
    container.appendChild(botaoMontarFila);
    var areaFila = el("div", { style: "margin-top:1rem;" });
    container.appendChild(areaFila);

    botaoMontarFila.addEventListener("click", function () {
      var d = calcularDestinatariosProspeccao();
      if (d.lista.length === 0) { alert("Não há nenhuma marca pra receber com esse filtro agora."); return; }
      desenharFilaRascunho(areaFila, d.lista.slice());
    });
  }

  function desenharFilaRascunho(container, fila) {
    container.innerHTML = "";
    if (fila.length === 0) {
      container.appendChild(el("p", { class: "estado-vazio", texto: "Fila concluída! Todas as marcas desta lista já foram marcadas como enviadas." }));
      return;
    }
    container.appendChild(el("p", { style: "font-size:.82rem;color:var(--texto-suave);margin-bottom:.8rem;", texto: fila.length + " na fila." }));

    var marca = fila[0];
    var nome = primeiroNomeTexto(marca.nome);
    var assunto = substituirVariaveisLocais(estado.prospeccao.assunto, nome, marca.nome);
    var corpoTexto = textoPlanoProspeccao(nome, marca.nome);

    var item = el("div", { class: "pr-fila-item" });
    item.appendChild(el("p", { style: "font-weight:800;font-size:.9rem;", texto: marca.nome + " · " + marca.email }));
    item.appendChild(el("p", { style: "font-size:.8rem;color:var(--texto-suave);margin-top:.2rem;", texto: "Assunto: " + assunto }));
    var caixaCorpo = el("div", { class: "pr-fila-corpo", texto: corpoTexto });
    item.appendChild(caixaCorpo);

    var botoes = el("div", { style: "display:flex;gap:.6rem;flex-wrap:wrap;" });
    var botaoCopiar = el("button", { type: "button", class: "botao", html: ICONES.copiar + "Copiar texto" });
    botaoCopiar.addEventListener("click", function () {
      navigator.clipboard.writeText(corpoTexto).then(function () {
        botaoCopiar.textContent = "Copiado!";
        setTimeout(function () { botaoCopiar.innerHTML = ICONES.copiar + "Copiar texto"; }, 1500);
      });
    });
    var linkGmail = el("a", {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(marca.email) + "&su=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(corpoTexto),
      target: "_blank", rel: "noopener", class: "botao botao-primario", texto: "Abrir no Gmail"
    });
    var botaoEnviada = el("button", { type: "button", class: "botao", texto: "Marcar como enviada" });
    botaoEnviada.addEventListener("click", async function () {
      botaoEnviada.disabled = true;
      try {
        await sb.from("marcas").update({ prospeccao_enviado_em: new Date().toISOString() }).eq("id", marca.id);
      } catch (erro) { console.error(erro); }
      fila.shift();
      desenharFilaRascunho(container, fila);
    });
    botoes.appendChild(botaoCopiar);
    botoes.appendChild(linkGmail);
    botoes.appendChild(botaoEnviada);
    item.appendChild(botoes);
    container.appendChild(item);
  }

  function montarHistoricoProspeccao() {
    var cartao = el("div", { class: "cartao" });
    var cabecalhoHistorico = el("div", { style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.6rem;margin-bottom:.9rem;" });
    cabecalhoHistorico.appendChild(el("p", { class: "cartao-titulo", texto: "Tudo que já saiu", style: "margin-bottom:0;" }));
    var campoBusca = el("input", { type: "search", placeholder: "Buscar por e-mail ou assunto", style: "width:100%;max-width:20rem;border:1.5px solid var(--linha);border-radius:999px;padding:.5rem 1rem;" });
    cabecalhoHistorico.appendChild(campoBusca);
    cartao.appendChild(cabecalhoHistorico);

    var areaTabela = el("div");
    cartao.appendChild(areaTabela);
    var linhaResumo = el("p", { style: "font-size:.76rem;color:var(--texto-suave);margin-top:.6rem;" });
    cartao.appendChild(linhaResumo);

    var LIMITE_LINHAS_MOSTRADAS = 300;

    function desenhar() {
      var termo = campoBusca.value.trim().toLowerCase();
      var linhas = cacheEmailEnvios.filter(function (e) {
        return !termo ||
          (e.email || "").toLowerCase().indexOf(termo) !== -1 ||
          (e.assunto || "").toLowerCase().indexOf(termo) !== -1;
      });
      areaTabela.innerHTML = "";
      linhaResumo.textContent = "";
      if (cacheEmailEnvios.length === 0) {
        areaTabela.appendChild(estadoVazio("Nenhum envio registrado ainda."));
        return;
      }
      if (linhas.length === 0) {
        areaTabela.appendChild(estadoVazio("Nenhum envio encontrado com essa busca."));
        return;
      }
      var linhasMostradas = linhas.slice(0, LIMITE_LINHAS_MOSTRADAS);
      var wrap = el("div", { class: "tabela-scroll" });
      var tabela = el("table");
      tabela.appendChild(el("thead", {}, [el("tr", {}, [
        el("th", { texto: "Quando" }), el("th", { texto: "Para quem" }), el("th", { texto: "Assunto" }),
        el("th", { texto: "Deu certo" }), el("th", { texto: "Erro" })
      ])]));
      var corpo = el("tbody");
      linhasMostradas.forEach(function (e) {
        var tr = el("tr");
        tr.appendChild(el("td", { texto: new Date(e.criado_em).toLocaleString("pt-BR") }));
        tr.appendChild(el("td", { texto: e.email || "" }));
        tr.appendChild(el("td", { texto: e.assunto || "" }));
        var tdCerto = el("td");
        tdCerto.appendChild(el("span", { class: "pilula " + (e.status === "ok" ? "pilula-vanilla" : "pilula-erro"), texto: e.status === "ok" ? "sim" : "não" }));
        tr.appendChild(tdCerto);
        tr.appendChild(el("td", { texto: e.erro || "-" }));
        corpo.appendChild(tr);
      });
      tabela.appendChild(corpo);
      wrap.appendChild(tabela);
      areaTabela.appendChild(wrap);
      linhaResumo.textContent = linhasMostradas.length + " de " + linhas.length + " envios.";
    }
    campoBusca.addEventListener("input", desenhar);
    desenhar();

    return cartao;
  }

  /* =========================================================
     SEÇÃO 3: CALENDÁRIO
     ========================================================= */
  var NOMES_MES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  var TIPOS_CALENDARIO = { gravar: "Gravar", editar: "Editar", postar: "Postar" };

  async function renderizarCalendario(container) {
    container.innerHTML = "";
    if (estado.calendario.ano === null) {
      var agora = new Date();
      estado.calendario.ano = agora.getFullYear();
      estado.calendario.mes = agora.getMonth();
    }

    var respCal = await consultarTabela("calendario");
    var respCamp = await consultarTabela("campanhas");
    if (respCal.erro) container.appendChild(avisoSecao(respCal.erro));
    if (respCamp.erro) container.appendChild(avisoSecao(respCamp.erro));

    var itensCalendario = respCal.dados;
    var prazosCampanha = respCamp.dados.filter(function (c) { return c.prazo && c.status !== "Entregue"; });

    var topo = el("div", { class: "cal-topo" });
    var nav = el("div", { class: "cal-nav" });
    var botaoAnterior = el("button", { type: "button", class: "botao-icone", html: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>', "aria-label": "Mês anterior" });
    var botaoProximo = el("button", { type: "button", class: "botao-icone", html: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>', "aria-label": "Próximo mês" });
    var tituloMes = el("p", { class: "cal-mes-titulo", texto: NOMES_MES[estado.calendario.mes] + " de " + estado.calendario.ano });
    var botaoHoje = el("button", { type: "button", class: "botao", texto: "Este mês" });
    botaoAnterior.addEventListener("click", function () { mudarMes(-1); });
    botaoProximo.addEventListener("click", function () { mudarMes(1); });
    botaoHoje.addEventListener("click", function () {
      var agora = new Date();
      estado.calendario.ano = agora.getFullYear();
      estado.calendario.mes = agora.getMonth();
      renderizarAba("calendario");
    });
    nav.appendChild(botaoAnterior); nav.appendChild(tituloMes); nav.appendChild(botaoProximo); nav.appendChild(botaoHoje);
    topo.appendChild(nav);

    var filtros = el("div", { class: "cal-filtros" });
    Object.keys(TIPOS_CALENDARIO).forEach(function (tipo) {
      var chip = el("button", { type: "button", class: "cal-filtro-chip", "aria-pressed": estado.calendario.filtros[tipo] ? "true" : "false", texto: TIPOS_CALENDARIO[tipo] });
      chip.addEventListener("click", function () {
        estado.calendario.filtros[tipo] = !estado.calendario.filtros[tipo];
        renderizarAba("calendario");
      });
      filtros.appendChild(chip);
    });
    topo.appendChild(filtros);

    var botaoAdicionar = el("button", { type: "button", class: "botao botao-primario", html: ICONES.mais + "Adicionar" });
    botaoAdicionar.addEventListener("click", function () { abrirFormularioCalendario(null, hojeISO()); });
    topo.appendChild(botaoAdicionar);
    container.appendChild(topo);

    // agrupar itens por dia
    var porDia = {};
    function chaveDe(iso) { return String(iso).slice(0, 10); }
    itensCalendario.forEach(function (item) {
      if (!estado.calendario.filtros[item.tipo]) return;
      var chave = chaveDe(item.data);
      (porDia[chave] = porDia[chave] || []).push({ tipo: "item", dado: item });
    });
    prazosCampanha.forEach(function (camp) {
      var chave = chaveDe(camp.prazo);
      (porDia[chave] = porDia[chave] || []).push({ tipo: "prazo", dado: camp });
    });

    container.appendChild(montarGradeCalendario(estado.calendario.ano, estado.calendario.mes, porDia));

    // ficou pra trás
    var atrasados = itensCalendario.filter(function (i) { return i.status === "a fazer" && diasEntre(chaveDe(i.data), hojeISO()) > 0; });
    var cartaoAtrasados = el("div", { class: "cartao" }, [el("p", { class: "cartao-titulo", texto: "Ficou pra trás" })]);
    if (atrasados.length === 0) {
      cartaoAtrasados.appendChild(estadoVazio("Nada ficou pra trás. Tudo o que já passou do dia foi marcado como feito."));
    } else {
      var listaAtrasados = el("ul", { class: "atrasados-lista" });
      atrasados.sort(function (a, b) { return chaveDe(a.data) < chaveDe(b.data) ? -1 : 1; });
      atrasados.forEach(function (item) {
        var dias = diasEntre(chaveDe(item.data), hojeISO());
        listaAtrasados.appendChild(el("li", {}, [
          el("span", { texto: item.titulo + (item.marca ? " · " + item.marca : "") }),
          el("span", { class: "pilula pilula-erro", texto: "há " + dias + (dias === 1 ? " dia" : " dias") })
        ]));
      });
      cartaoAtrasados.appendChild(listaAtrasados);
    }
    container.appendChild(cartaoAtrasados);
  }

  function mudarMes(delta) {
    var m = estado.calendario.mes + delta;
    var a = estado.calendario.ano;
    if (m < 0) { m = 11; a--; }
    if (m > 11) { m = 0; a++; }
    estado.calendario.mes = m;
    estado.calendario.ano = a;
    renderizarAba("calendario");
  }

  function montarGradeCalendario(ano, mes, porDia) {
    var grade = el("div", { class: "cal-grade" });
    ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].forEach(function (d) {
      grade.appendChild(el("div", { class: "cal-cabecalho-dia", texto: d }));
    });

    var primeiroDiaMes = new Date(ano, mes, 1);
    var diaSemanaPrimeiro = (primeiroDiaMes.getDay() + 6) % 7; // 0 = segunda
    var diasNoMes = new Date(ano, mes + 1, 0).getDate();
    var diasMesAnterior = new Date(ano, mes, 0).getDate();
    var hoje = hojeISO();

    var celulas = [];
    for (var i = diaSemanaPrimeiro - 1; i >= 0; i--) {
      celulas.push({ dia: diasMesAnterior - i, fora: true, mes: mes - 1 });
    }
    for (var d = 1; d <= diasNoMes; d++) {
      celulas.push({ dia: d, fora: false, mes: mes });
    }
    while (celulas.length % 7 !== 0) {
      celulas.push({ dia: celulas.length - (diaSemanaPrimeiro + diasNoMes) + 1, fora: true, mes: mes + 1 });
    }

    celulas.forEach(function (c) {
      var mesReal = c.mes, anoReal = ano;
      if (mesReal < 0) { mesReal = 11; anoReal--; }
      if (mesReal > 11) { mesReal = 0; anoReal++; }
      var chaveDia = anoReal + "-" + doisDigitos(mesReal + 1) + "-" + doisDigitos(c.dia);

      var celula = el("div", { class: "cal-dia" + (c.fora ? " fora" : "") + (chaveDia === hoje ? " hoje" : "") });
      celula.appendChild(el("span", { class: "cal-dia-numero", texto: String(c.dia) }));

      var botaoAdd = el("button", { type: "button", class: "cal-dia-add", html: "+", "aria-label": "Adicionar em " + formatarDataBR(chaveDia) });
      botaoAdd.addEventListener("click", function (evento) { evento.stopPropagation(); abrirFormularioCalendario(null, chaveDia); });
      celula.appendChild(botaoAdd);

      celula.addEventListener("click", function () { abrirDetalheDia(chaveDia, porDia[chaveDia] || []); });

      var itensDoDia = (porDia[chaveDia] || []).slice().sort(function (a, b) {
        if (a.tipo === "prazo" && b.tipo !== "prazo") return -1;
        if (b.tipo === "prazo" && a.tipo !== "prazo") return 1;
        return 0;
      });
      itensDoDia.slice(0, 3).forEach(function (entrada) {
        celula.appendChild(itemCelulaCalendario(entrada));
      });
      if (itensDoDia.length > 3) {
        var botaoMais = el("button", { type: "button", class: "cal-dia-mais", texto: "+" + (itensDoDia.length - 3) + " mais" });
        botaoMais.addEventListener("click", function (evento) { evento.stopPropagation(); abrirDetalheDia(chaveDia, itensDoDia); });
        celula.appendChild(botaoMais);
      }

      grade.appendChild(celula);
    });

    return grade;
  }

  function itemCelulaCalendario(entrada) {
    if (entrada.tipo === "prazo") {
      return el("span", { class: "cal-dia-item prazo", texto: "Prazo: " + entrada.dado.campanha });
    }
    var item = entrada.dado;
    return el("span", { class: "cal-dia-item" + (item.status === "feito" ? " feito" : ""), texto: TIPOS_CALENDARIO[item.tipo] + ": " + item.titulo });
  }

  function abrirDetalheDia(chaveDia, entradas) {
    var lista = el("div");
    if (entradas.length === 0) {
      lista.appendChild(estadoVazio("Nada marcado neste dia ainda."));
    } else {
      entradas.forEach(function (entrada) {
        if (entrada.tipo === "prazo") {
          var camp = entrada.dado;
          lista.appendChild(el("div", { class: "cartao", style: "margin-bottom:.6rem;" }, [
            el("p", { texto: "Prazo de campanha: " + camp.campanha, style: "font-weight:700;font-size:.85rem;" }),
            el("p", { texto: camp.cliente || "", style: "font-size:.78rem;color:var(--texto-suave);" })
          ]));
        } else {
          var item = entrada.dado;
          var cartaoItem = el("div", { class: "cartao", style: "margin-bottom:.6rem;" });
          cartaoItem.appendChild(el("p", { texto: item.titulo, style: "font-weight:700;font-size:.85rem;" }));
          cartaoItem.appendChild(el("p", { texto: TIPOS_CALENDARIO[item.tipo] + (item.marca ? " · " + item.marca : ""), style: "font-size:.78rem;color:var(--texto-suave);margin-bottom:.6rem;" }));
          var linhaBotoes = el("div", { style: "display:flex;gap:.5rem;" });
          var botaoStatus = el("button", { type: "button", class: "botao", texto: item.status === "feito" ? "Marcar como a fazer" : "Marcar como feito" });
          botaoStatus.addEventListener("click", async function () {
            await sb.from("calendario").update({ status: item.status === "feito" ? "a fazer" : "feito" }).eq("id", item.id);
            fecharModal();
            renderizarAba("calendario");
          });
          var botaoEditar = el("button", { type: "button", class: "botao-icone", html: ICONES.editar, "aria-label": "Editar" });
          botaoEditar.addEventListener("click", function () { abrirFormularioCalendario(item, chaveDe(item.data)); });
          var botaoApagar = el("button", { type: "button", class: "botao-icone", html: ICONES.apagar, "aria-label": "Apagar" });
          botaoApagar.addEventListener("click", function () { confirmarApagar("calendario", item.id, "este item"); });
          linhaBotoes.appendChild(botaoStatus); linhaBotoes.appendChild(botaoEditar); linhaBotoes.appendChild(botaoApagar);
          cartaoItem.appendChild(linhaBotoes);
          lista.appendChild(cartaoItem);
        }
      });
    }
    var botaoAdd = el("button", { type: "button", class: "botao botao-primario", html: ICONES.mais + "Adicionar neste dia", style: "margin-top:.4rem;" });
    botaoAdd.addEventListener("click", function () { abrirFormularioCalendario(null, chaveDia); });
    lista.appendChild(botaoAdd);
    function chaveDe(iso) { return String(iso).slice(0, 10); }
    abrirModal(lista, formatarDataBR(chaveDia));
  }

  function abrirFormularioCalendario(item, dataPadrao) {
    var ehEdicao = !!item;
    var titulo = campoTexto({ id: "c-titulo", rotulo: "Título", valor: item ? item.titulo : "", obrigatorio: true });
    var marca = campoTexto({ id: "c-marca", rotulo: "Marca (opcional)", valor: item ? item.marca : "" });
    var tipo = campoSelect({
      id: "c-tipo", rotulo: "Tipo", valor: item ? item.tipo : "gravar",
      opcoes: [{ valor: "gravar", texto: "Gravar" }, { valor: "editar", texto: "Editar" }, { valor: "postar", texto: "Postar" }]
    });
    var data = campoTexto({ id: "c-data", rotulo: "Data", tipo: "date", valor: item ? String(item.data).slice(0, 10) : dataPadrao, obrigatorio: true });

    var form = el("form", {}, [titulo.wrap, marca.wrap, tipo.wrap, data.wrap]);
    var faixaErro = avisoSecao(""); faixaErro.hidden = true;
    form.appendChild(faixaErro);
    form.appendChild(el("button", { type: "submit", class: "botao botao-primario", texto: ehEdicao ? "Salvar alterações" : "Adicionar" }));

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var registro = { titulo: titulo.input.value.trim(), marca: marca.input.value.trim(), tipo: tipo.input.value, data: data.input.value };
      try {
        if (ehEdicao) {
          var resp1 = await sb.from("calendario").update(registro).eq("id", item.id);
          if (resp1.error) throw resp1.error;
        } else {
          registro.status = "a fazer";
          var resp2 = await sb.from("calendario").insert(registro);
          if (resp2.error) throw resp2.error;
        }
        fecharModal();
        renderizarAba("calendario");
      } catch (erro) {
        console.error(erro);
        faixaErro.textContent = "Não consegui salvar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaErro.hidden = false;
      }
    });

    abrirModal(form, ehEdicao ? "Editar item" : "Adicionar no calendário");
  }

  /* =========================================================
     SEÇÃO 4: CAMPANHAS
     ========================================================= */
  var cacheCampanhas = [];

  async function renderizarCampanhas(container) {
    container.innerHTML = "";
    var resp = await consultarTabela("campanhas");
    if (resp.erro) container.appendChild(avisoSecao(resp.erro));
    cacheCampanhas = resp.dados;

    var total = cacheCampanhas.length;
    var ativas = cacheCampanhas.filter(function (c) { return c.ativa; }).length;
    var valorTotal = cacheCampanhas.reduce(function (s, c) { return s + (Number(c.valor) || 0); }, 0);
    var qtdTotal = cacheCampanhas.reduce(function (s, c) { return s + (Number(c.qtd) || 0); }, 0);
    var ticketMedio = qtdTotal > 0 ? valorTotal / qtdTotal : 0;
    var aReceber = cacheCampanhas.filter(function (c) { return c.pagamento === "pendente"; }).reduce(function (s, c) { return s + (Number(c.valor) || 0); }, 0);
    var jaRecebido = cacheCampanhas.filter(function (c) { return c.pagamento === "pago"; }).reduce(function (s, c) { return s + (Number(c.valor) || 0); }, 0);

    var kpis = el("div", { class: "kpis" }, [
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: String(total) }), el("p", { class: "kpi-rotulo", texto: "campanhas no total" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: String(ativas) }), el("p", { class: "kpi-rotulo", texto: "ativas" })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: formatarMoeda(valorTotal) }), el("p", { class: "kpi-rotulo", texto: "valor total · ticket médio " + formatarMoeda(ticketMedio) })]),
      el("div", { class: "kpi" }, [el("p", { class: "kpi-valor", texto: formatarMoeda(aReceber) }), el("p", { class: "kpi-rotulo", texto: "a receber · já recebido " + formatarMoeda(jaRecebido) })])
    ]);
    container.appendChild(kpis);

    var barra = el("div", { class: "filtros-barra" });
    var campoBusca = el("input", { type: "search", placeholder: "Buscar por campanha ou cliente", value: estado.campanhas.busca });
    campoBusca.addEventListener("input", function () { estado.campanhas.busca = campoBusca.value; desenharTabelaCampanhas(); });
    barra.appendChild(campoBusca);

    [["todas", "Todas"], ["ativas", "Ativas"], ["finalizadas", "Finalizadas"]].forEach(function (f) {
      var chip = el("button", { type: "button", class: "cal-filtro-chip", "aria-pressed": estado.campanhas.filtro === f[0] ? "true" : "false", texto: f[1] });
      chip.addEventListener("click", function () { estado.campanhas.filtro = f[0]; renderizarAba("campanhas"); });
      barra.appendChild(chip);
    });

    var botaoAdicionar = el("button", { type: "button", class: "botao botao-primario", html: ICONES.mais + "Adicionar campanha" });
    botaoAdicionar.addEventListener("click", function () { abrirFormularioCampanha(null); });
    barra.appendChild(botaoAdicionar);
    var botaoBaixar = el("button", { type: "button", class: "botao", html: ICONES.baixar + "Baixar CSV" });
    botaoBaixar.addEventListener("click", baixarCampanhasCSV);
    barra.appendChild(botaoBaixar);
    container.appendChild(barra);

    var cartao = el("div", { class: "cartao", id: "cartao-tabela-campanhas" });
    container.appendChild(cartao);
    desenharTabelaCampanhas();
  }

  var COLUNAS_CAMPANHA = [
    { chave: "favorita", rotulo: "" }, { chave: "campanha", rotulo: "Campanha" }, { chave: "cliente", rotulo: "Cliente" },
    { chave: "tipo", rotulo: "Tipo" }, { chave: "status", rotulo: "Status" }, { chave: "qtd", rotulo: "Qtd" },
    { chave: "valor", rotulo: "Valor" }, { chave: "prazo", rotulo: "Prazo" }, { chave: "pagamento", rotulo: "Pagamento" }
  ];

  function valorOrdenacao(campanha, coluna) {
    if (coluna === "status") return FUNIL_STATUS.indexOf(campanha.status);
    if (coluna === "valor" || coluna === "qtd") return Number(campanha[coluna]) || 0;
    if (coluna === "favorita") return campanha.favorita ? 1 : 0;
    if (coluna === "prazo") return campanha.prazo || "9999-99-99";
    return (campanha[coluna] || "").toString().toLowerCase();
  }

  function desenharTabelaCampanhas() {
    var cartao = document.getElementById("cartao-tabela-campanhas");
    if (!cartao) return;
    cartao.innerHTML = "";

    var termo = estado.campanhas.busca.trim().toLowerCase();
    var filtradas = cacheCampanhas.filter(function (c) {
      var passaFiltro = estado.campanhas.filtro === "todas" || (estado.campanhas.filtro === "ativas" ? c.ativa : !c.ativa);
      var passaBusca = !termo || (c.campanha || "").toLowerCase().indexOf(termo) !== -1 || (c.cliente || "").toLowerCase().indexOf(termo) !== -1;
      return passaFiltro && passaBusca;
    });

    if (cacheCampanhas.length === 0) {
      cartao.appendChild(estadoVazio("Você ainda não cadastrou nenhuma campanha. Clique em \"Adicionar campanha\" para começar."));
      return;
    }
    if (filtradas.length === 0) {
      cartao.appendChild(estadoVazio("Nenhuma campanha encontrada com esse filtro."));
      return;
    }

    var coluna = estado.campanhas.ordemColuna, asc = estado.campanhas.ordemAsc;
    filtradas.sort(function (a, b) {
      var va = valorOrdenacao(a, coluna), vb = valorOrdenacao(b, coluna);
      if (va < vb) return asc ? -1 : 1;
      if (va > vb) return asc ? 1 : -1;
      return 0;
    });

    var wrap = el("div", { class: "tabela-scroll" });
    var tabela = el("table");
    var linhaCabecalho = el("tr");
    COLUNAS_CAMPANHA.forEach(function (col) {
      if (!col.rotulo) { linhaCabecalho.appendChild(el("th", { texto: "" })); return; }
      var ativa = coluna === col.chave;
      var th = el("th", { class: "ordenavel" + (ativa ? " ativa" : "") });
      th.appendChild(document.createTextNode(col.rotulo + " "));
      th.appendChild(el("span", { class: "seta-ordem", html: ativa ? (asc ? ICONES.ordenarCima : ICONES.ordenarBaixo) : ICONES.ordenarCima }));
      th.addEventListener("click", function () {
        if (estado.campanhas.ordemColuna === col.chave) estado.campanhas.ordemAsc = !estado.campanhas.ordemAsc;
        else { estado.campanhas.ordemColuna = col.chave; estado.campanhas.ordemAsc = true; }
        desenharTabelaCampanhas();
      });
      linhaCabecalho.appendChild(th);
    });
    linhaCabecalho.appendChild(el("th", { texto: "" }));
    tabela.appendChild(el("thead", {}, [linhaCabecalho]));

    var corpo = el("tbody");
    var hoje = hojeISO();
    filtradas.forEach(function (c) {
      var tr = el("tr");
      if (c.favorita) tr.style.borderLeft = "3px solid var(--amarelo)";

      var tdEstrela = el("td");
      var botaoEstrela = el("button", { type: "button", class: "botao-icone", html: c.favorita ? ICONES.estrelaCheia : ICONES.estrela, "aria-label": "Destacar campanha", style: c.favorita ? "color:var(--amarelo-texto);" : "" });
      botaoEstrela.addEventListener("click", async function () {
        await sb.from("campanhas").update({ favorita: !c.favorita }).eq("id", c.id);
        renderizarAba("campanhas");
      });
      tdEstrela.appendChild(botaoEstrela);
      tr.appendChild(tdEstrela);

      var tdCampanha = el("td");
      var linkEditar = el("button", { type: "button", texto: c.campanha, style: "background:none;border:none;padding:0;font-weight:700;color:var(--texto);cursor:pointer;text-align:left;" });
      linkEditar.addEventListener("click", function () { abrirFormularioCampanha(c); });
      tdCampanha.appendChild(linkEditar);
      tr.appendChild(tdCampanha);

      tr.appendChild(el("td", { texto: c.cliente || "" }));
      tr.appendChild(el("td", {}, [el("span", { class: "pilula " + (c.tipo === "Publicidade" ? "pilula-vanilla" : "pilula-neutra"), texto: c.tipo || "" })]));

      var classeStatus = "pilula-neutra";
      if (c.status === "Entregue") classeStatus = "pilula-vanilla";
      else if (c.status === "Aprovado") classeStatus = "pilula-amarela";
      tr.appendChild(el("td", {}, [el("span", { class: "pilula " + classeStatus, texto: c.status || "" })]));

      tr.appendChild(el("td", { texto: String(c.qtd || 0) }));
      tr.appendChild(el("td", { texto: formatarMoeda(c.valor) }));

      var tdPrazo = el("td");
      tdPrazo.appendChild(el("span", { texto: formatarDataBR(c.prazo) + " " }));
      if (c.prazo && c.status !== "Entregue") {
        var diasParaPrazo = diasEntre(hoje, c.prazo);
        if (diasParaPrazo < 0) {
          tdPrazo.appendChild(el("span", { class: "pilula pilula-erro", texto: "atrasado há " + Math.abs(diasParaPrazo) + "d" }));
        } else if (diasParaPrazo <= 3) {
          tdPrazo.appendChild(el("span", { class: "pilula pilula-amarela", texto: diasParaPrazo === 0 ? "vence hoje" : "vence em " + diasParaPrazo + "d" }));
        }
      }
      tr.appendChild(tdPrazo);

      tr.appendChild(el("td", {}, [el("span", { class: "pilula " + (c.pagamento === "pago" ? "pilula-vanilla" : "pilula-amarela"), texto: c.pagamento === "pago" ? "Pago" : "Pendente" })]));

      var tdApagar = el("td");
      var botaoApagar = el("button", { type: "button", class: "botao-icone", html: ICONES.apagar, "aria-label": "Apagar campanha" });
      botaoApagar.addEventListener("click", function () { confirmarApagar("campanhas", c.id, "esta campanha"); });
      tdApagar.appendChild(botaoApagar);
      tr.appendChild(tdApagar);

      corpo.appendChild(tr);
    });
    tabela.appendChild(corpo);
    wrap.appendChild(tabela);
    cartao.appendChild(wrap);
  }

  function abrirFormularioCampanha(campanha) {
    var ehEdicao = !!campanha;
    var nomeCamp = campoTexto({ id: "cp-campanha", rotulo: "Campanha", valor: campanha ? campanha.campanha : "", obrigatorio: true });
    var cliente = campoTexto({ id: "cp-cliente", rotulo: "Cliente", valor: campanha ? campanha.cliente : "", obrigatorio: true });
    var tipo = campoSelect({ id: "cp-tipo", rotulo: "Tipo", valor: campanha ? campanha.tipo : "Conteúdo", opcoes: [{ valor: "Conteúdo", texto: "Conteúdo" }, { valor: "Publicidade", texto: "Publicidade" }] });
    var status = campoSelect({ id: "cp-status", rotulo: "Status", valor: campanha ? campanha.status : "Briefing", opcoes: FUNIL_STATUS.map(function (s) { return { valor: s, texto: s }; }) });
    var qtd = campoTexto({ id: "cp-qtd", rotulo: "Quantidade de vídeos", tipo: "number", valor: campanha ? campanha.qtd : "1" });
    var valor = campoTexto({ id: "cp-valor", rotulo: "Valor (R$)", tipo: "number", valor: campanha ? campanha.valor : "0" });
    var prazo = campoTexto({ id: "cp-prazo", rotulo: "Prazo", tipo: "date", valor: campanha && campanha.prazo ? String(campanha.prazo).slice(0, 10) : "" });
    var pagamento = campoSelect({ id: "cp-pagamento", rotulo: "Pagamento", valor: campanha ? campanha.pagamento : "pendente", opcoes: [{ valor: "pendente", texto: "Pendente" }, { valor: "pago", texto: "Pago" }] });
    var ativa = campoSelect({ id: "cp-ativa", rotulo: "Situação", valor: campanha ? String(campanha.ativa) : "true", opcoes: [{ valor: "true", texto: "Ativa" }, { valor: "false", texto: "Finalizada" }] });

    var linha1 = el("div", { class: "linha-campos" }, [tipo.wrap, status.wrap]);
    var linha2 = el("div", { class: "linha-campos" }, [qtd.wrap, valor.wrap]);
    var linha3 = el("div", { class: "linha-campos" }, [prazo.wrap, pagamento.wrap]);

    var form = el("form", {}, [nomeCamp.wrap, cliente.wrap, linha1, linha2, linha3, ativa.wrap]);
    var faixaErro = avisoSecao(""); faixaErro.hidden = true;
    form.appendChild(faixaErro);
    form.appendChild(el("button", { type: "submit", class: "botao botao-primario", texto: ehEdicao ? "Salvar alterações" : "Adicionar campanha" }));

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var registro = {
        campanha: nomeCamp.input.value.trim(), cliente: cliente.input.value.trim(), tipo: tipo.input.value,
        status: status.input.value, qtd: Number(qtd.input.value) || 0, valor: Number(valor.input.value) || 0,
        prazo: prazo.input.value || null, pagamento: pagamento.input.value, ativa: ativa.input.value === "true"
      };
      try {
        if (ehEdicao) {
          var resp1 = await sb.from("campanhas").update(registro).eq("id", campanha.id);
          if (resp1.error) throw resp1.error;
        } else {
          registro.favorita = false;
          var resp2 = await sb.from("campanhas").insert(registro);
          if (resp2.error) throw resp2.error;
        }
        fecharModal();
        renderizarAba("campanhas");
      } catch (erro) {
        console.error(erro);
        faixaErro.textContent = "Não consegui salvar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaErro.hidden = false;
      }
    });

    abrirModal(form, ehEdicao ? "Editar campanha" : "Adicionar campanha");
  }

  function baixarCampanhasCSV() {
    var linhas = [["Campanha", "Cliente", "Tipo", "Status", "Qtd", "Valor", "Prazo", "Pagamento", "Situação"]];
    cacheCampanhas.forEach(function (c) {
      linhas.push([c.campanha, c.cliente, c.tipo, c.status, c.qtd, formatarMoeda(c.valor), formatarDataBR(c.prazo), c.pagamento, c.ativa ? "Ativa" : "Finalizada"]);
    });
    var csv = "﻿" + paraCSV(linhas);
    baixarArquivo("campanhas.csv", csv, "text/csv;charset=utf-8;");
  }

  /* =========================================================
     SEÇÃO 5: CHECKLIST
     ========================================================= */
  var estadoChecklist = { subaba: "checklist" };
  var cacheMarcados = {};

  async function carregarMarcados() {
    var resp = await consultarTabela("marcados");
    cacheMarcados = {};
    resp.dados.forEach(function (m) { cacheMarcados[m.chave] = !!m.marcado; });
    return resp.erro;
  }

  async function alternarMarcado(chave) {
    var novoValor = !cacheMarcados[chave];
    cacheMarcados[chave] = novoValor;
    try {
      var resp = await sb.from("marcados").upsert({ chave: chave, marcado: novoValor, atualizado_em: new Date().toISOString() }, { onConflict: "chave" });
      if (resp.error) throw resp.error;
    } catch (erro) {
      console.error("Não consegui salvar o checklist", erro);
    }
  }

  async function renderizarChecklist(container) {
    container.innerHTML = "";

    if (!window.Biblioteca) {
      container.appendChild(avisoSecao("Não encontrei o arquivo js/biblioteca.js. Confira se ele está na pasta certa do projeto."));
      return;
    }

    var erroMarcados = await carregarMarcados();
    if (erroMarcados) container.appendChild(avisoSecao(erroMarcados));

    var subAbasConfig = [
      { id: "checklist", nome: "Checklist do portfólio" },
      { id: "referencias", nome: "Referências de vídeo" },
      { id: "roteiros", nome: "Roteiros" },
      { id: "nichos", nome: "Ideias por nicho" },
      { id: "revisar", nome: "Revisar meu roteiro" }
    ];
    var barraSubAbas = el("div", { class: "sub-abas" });
    subAbasConfig.forEach(function (s) {
      var botao = el("button", { type: "button", class: "sub-aba-botao", "aria-selected": estadoChecklist.subaba === s.id ? "true" : "false", texto: s.nome });
      botao.addEventListener("click", function () { estadoChecklist.subaba = s.id; renderizarAba("checklist"); });
      barraSubAbas.appendChild(botao);
    });
    container.appendChild(barraSubAbas);

    var corpo = el("div");
    container.appendChild(corpo);

    if (estadoChecklist.subaba === "checklist") desenharSubAbaChecklist(corpo);
    else if (estadoChecklist.subaba === "referencias") desenharSubAbaReferencias(corpo);
    else if (estadoChecklist.subaba === "roteiros") desenharSubAbaRoteiros(corpo);
    else if (estadoChecklist.subaba === "nichos") desenharSubAbaNichos(corpo);
    else if (estadoChecklist.subaba === "revisar") desenharSubAbaRevisar(corpo);
  }

  function desenharSubAbaChecklist(corpo) {
    var secoes = window.Biblioteca.CHECKLIST || [];
    var totalItens = 0, totalMarcados = 0;
    secoes.forEach(function (s) { totalItens += s.itens.length; });

    var cartaoGeral = el("div", { class: "cartao" });
    cartaoGeral.appendChild(el("p", { class: "cartao-titulo", texto: "Progresso geral" }));
    var barraGeral = el("div", { class: "barra-progresso" }, [el("span", { style: "width:0%" })]);
    cartaoGeral.appendChild(barraGeral);
    var rotuloGeral = el("p", { style: "font-size:.78rem;color:var(--texto-suave);" });
    cartaoGeral.appendChild(rotuloGeral);
    corpo.appendChild(cartaoGeral);

    secoes.forEach(function (secao, indiceSecao) {
      var marcadosSecao = 0;
      var secaoEl = el("div", { class: "clk-secao" });
      var cabecalho = el("button", { type: "button", class: "clk-secao-cabecalho" });
      var corpoS = el("div", { class: "clk-secao-corpo" });

      cabecalho.appendChild(el("span", { class: "clk-secao-emoji", texto: secao.emoji }));
      var info = el("div", { class: "clk-secao-info" }, [
        el("p", { class: "clk-secao-nome", texto: secao.nome }),
        el("p", { class: "clk-secao-resumo", texto: secao.resumo })
      ]);
      cabecalho.appendChild(info);
      var percentualEl = el("span", { class: "clk-secao-percentual" });
      cabecalho.appendChild(percentualEl);
      cabecalho.appendChild(el("span", { html: ICONES.chevron, style: "color:var(--texto-suave);" }));

      cabecalho.addEventListener("click", function () {
        corpoS.classList.toggle("aberta");
      });

      corpoS.appendChild(el("div", { class: "clk-porque", texto: secao.porque }));

      secao.itens.forEach(function (item, indiceItem) {
        var chave = "checklist_" + secao.id + "_" + indiceItem;
        var marcado = !!cacheMarcados[chave];
        if (marcado) { marcadosSecao++; totalMarcados++; }

        var idCheckbox = "chk-" + secao.id + "-" + indiceItem;
        var checkbox = el("input", { type: "checkbox", id: idCheckbox });
        checkbox.checked = marcado;
        checkbox.addEventListener("change", async function () {
          await alternarMarcado(chave);
          renderizarAba("checklist");
        });

        var linha = el("label", { class: "clk-item", for: idCheckbox }, [
          checkbox,
          el("div", {}, [
            el("p", { class: "clk-item-t", texto: item.t }),
            el("p", { class: "clk-item-d", texto: item.d })
          ])
        ]);
        corpoS.appendChild(linha);
      });

      var pctSecao = secao.itens.length ? Math.round((marcadosSecao / secao.itens.length) * 100) : 0;
      percentualEl.textContent = marcadosSecao + "/" + secao.itens.length;

      secaoEl.appendChild(cabecalho);
      secaoEl.appendChild(corpoS);
      corpo.appendChild(secaoEl);
    });

    var pctGeral = totalItens ? Math.round((totalMarcados / totalItens) * 100) : 0;
    barraGeral.querySelector("span").style.width = pctGeral + "%";
    rotuloGeral.textContent = totalMarcados + " de " + totalItens + " itens marcados (" + pctGeral + "%)";
  }

  function desenharSubAbaReferencias(corpo) {
    var referencias = window.Biblioteca.REFERENCIAS || [];
    var grade = el("div", { class: "grade-referencias" });
    referencias.forEach(function (ref) {
      var card = el("button", { type: "button", class: "ref-card" });
      card.appendChild(el("div", { class: "ref-capa" }, [el("span", { texto: ref.emoji })]));
      card.appendChild(el("div", { class: "ref-corpo" }, [
        el("p", { class: "ref-titulo", texto: ref.titulo }),
        el("p", { class: "ref-meta", texto: ref.estilo + " · " + ref.duracao + (ref.marca ? " · " + ref.marca : "") })
      ]));
      card.addEventListener("click", function () { abrirDetalheReferencia(ref); });
      grade.appendChild(card);
    });
    corpo.appendChild(grade);
  }

  function abrirDetalheReferencia(ref) {
    var caixa = el("div");
    caixa.appendChild(el("p", { style: "font-size:.9rem;font-style:italic;color:var(--vanilla-escuro);margin-bottom:1rem;", html: escaparHtml(ref.gancho) }));

    function bloco(rotulo, texto) {
      caixa.appendChild(el("p", { style: "font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.03em;color:var(--texto-suave);margin:.9rem 0 .3rem;", texto: rotulo }));
      caixa.appendChild(el("p", { style: "font-size:.85rem;", texto: texto }));
    }
    bloco("Por que funciona", ref.porque);
    bloco("O diferencial", ref.diferencial);
    bloco("Erro comum", ref.erro);

    caixa.appendChild(el("p", { style: "font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.03em;color:var(--texto-suave);margin:.9rem 0 .3rem;", texto: "Roteiro em blocos" }));
    (ref.roteiro || []).forEach(function (bloco) {
      caixa.appendChild(el("div", { class: "beat-linha" }, [
        el("span", { class: "beat-tempo", texto: bloco.t }),
        el("span", { html: bloco.o })
      ]));
    });

    if (ref.youtube) {
      var linkAssistir = el("a", { href: ref.youtube, target: "_blank", rel: "noopener", class: "botao botao-primario", html: ICONES.play + "Assistir vídeo", style: "margin-top:1.2rem;text-decoration:none;" });
      caixa.appendChild(linkAssistir);
    }
    abrirModal(caixa, ref.titulo);
  }

  function desenharSubAbaRoteiros(corpo) {
    var tipos = window.Biblioteca.TIPOS || [];
    tipos.forEach(function (tipo) {
      var bloco = el("div", { class: "tipo-bloco" });
      var cabecalho = el("button", { type: "button", class: "clk-secao-cabecalho" });
      cabecalho.appendChild(el("span", { class: "clk-secao-emoji", texto: tipo.emoji }));
      cabecalho.appendChild(el("div", { class: "clk-secao-info" }, [
        el("p", { class: "clk-secao-nome", texto: tipo.nome }),
        el("p", { class: "clk-secao-resumo", texto: tipo.duracao })
      ]));
      cabecalho.appendChild(el("span", { html: ICONES.chevron, style: "color:var(--texto-suave);" }));

      var corpoT = el("div", { class: "clk-secao-corpo" });
      corpoT.appendChild(el("div", { class: "clk-porque", texto: tipo.porque }));
      (tipo.beats || []).forEach(function (beat) {
        corpoT.appendChild(el("div", { class: "beat-linha" }, [el("span", { class: "beat-tempo", texto: beat.t }), el("span", { html: beat.o })]));
      });
      if (tipo.erros && tipo.erros.length) {
        corpoT.appendChild(el("p", { style: "font-weight:800;font-size:.78rem;text-transform:uppercase;letter-spacing:.03em;color:var(--texto-suave);margin:.9rem 0 .3rem;", texto: "Erros comuns" }));
        var listaErros = el("ul", { style: "padding-left:1.1rem;list-style:disc;" });
        tipo.erros.forEach(function (erro) { listaErros.appendChild(el("li", { texto: erro, style: "font-size:.82rem;margin-bottom:.3rem;" })); });
        corpoT.appendChild(listaErros);
      }
      cabecalho.addEventListener("click", function () { corpoT.classList.toggle("aberta"); });

      bloco.appendChild(cabecalho);
      bloco.appendChild(corpoT);
      corpo.appendChild(bloco);
    });
  }

  function desenharSubAbaNichos(corpo) {
    var nichos = window.Biblioteca.NICHOS || [];
    nichos.forEach(function (nicho) {
      var bloco = el("div", { class: "nicho-bloco" });
      var cabecalho = el("button", { type: "button", class: "clk-secao-cabecalho" });
      cabecalho.appendChild(el("span", { class: "clk-secao-emoji", texto: nicho.emoji }));
      cabecalho.appendChild(el("div", { class: "clk-secao-info" }, [el("p", { class: "clk-secao-nome", texto: nicho.nome })]));
      cabecalho.appendChild(el("span", { html: ICONES.chevron, style: "color:var(--texto-suave);" }));

      var corpoN = el("div", { class: "clk-secao-corpo" });
      (nicho.ideias || []).forEach(function (ideia) {
        corpoN.appendChild(el("div", { class: "ideia-item" }, [
          el("p", { class: "ideia-t", texto: ideia.t }),
          el("p", { class: "ideia-gancho", texto: "“" + ideia.gancho + "”" })
        ]));
      });
      cabecalho.addEventListener("click", function () { corpoN.classList.toggle("aberta"); });

      bloco.appendChild(cabecalho);
      bloco.appendChild(corpoN);
      corpo.appendChild(bloco);
    });
  }

  function desenharSubAbaRevisar(corpo) {
    corpo.appendChild(el("div", { class: "campo" }, [
      el("label", { for: "campo-revisar-roteiro", texto: "Cole aqui o seu roteiro" }),
      el("textarea", { id: "campo-revisar-roteiro", placeholder: "Cole o texto do seu roteiro aqui para conferir item por item ao lado." })
    ]));

    var blocos = window.Biblioteca.REVISAO || [];
    blocos.forEach(function (bloco, indiceBloco) {
      var secaoEl = el("div", { class: "clk-secao" });
      var cabecalho = el("button", { type: "button", class: "clk-secao-cabecalho" });
      cabecalho.appendChild(el("span", { class: "clk-secao-emoji", texto: bloco.emoji }));
      cabecalho.appendChild(el("div", { class: "clk-secao-info" }, [el("p", { class: "clk-secao-nome", texto: bloco.bloco })]));
      cabecalho.appendChild(el("span", { html: ICONES.chevron, style: "color:var(--texto-suave);" }));

      var corpoB = el("div", { class: "clk-secao-corpo" });
      bloco.itens.forEach(function (item, indiceItem) {
        var chave = "revisao_" + indiceBloco + "_" + indiceItem;
        var marcado = !!cacheMarcados[chave];
        var idCheckbox = "rev-" + indiceBloco + "-" + indiceItem;
        var checkbox = el("input", { type: "checkbox", id: idCheckbox });
        checkbox.checked = marcado;
        checkbox.addEventListener("change", function () { alternarMarcado(chave); });
        corpoB.appendChild(el("label", { class: "clk-item", for: idCheckbox }, [
          checkbox,
          el("div", {}, [el("p", { class: "clk-item-t", texto: item.t }), el("p", { class: "clk-item-d", texto: item.d })])
        ]));
      });
      cabecalho.addEventListener("click", function () { corpoB.classList.toggle("aberta"); });

      secaoEl.appendChild(cabecalho);
      secaoEl.appendChild(corpoB);
      corpo.appendChild(secaoEl);
    });
  }

  /* =========================================================
     SEÇÃO INSIGHTS (quadro de ideias, estilo Notion)
     ========================================================= */
  var COLUNAS_INSIGHTS = [
    { chave: "semente", nome: "Semente", emoji: "🌱" },
    { chave: "amadurecida", nome: "Brotando", emoji: "🌿" },
    { chave: "pronta", nome: "Madura", emoji: "🌳" }
  ];

  var cacheInsights = [];
  var itemArrastadoInsight = null;

  async function carregarInsights() {
    var resp = await consultarTabela("insights", function (q) { return q.order("ordem", { ascending: true }); });
    cacheInsights = resp.dados;
    return resp.erro;
  }

  function elementoInsightDepoisDoPonto(container, y) {
    var elementos = Array.prototype.slice.call(container.querySelectorAll(".ins-cartao:not(.arrastando)"));
    var maisProximo = { distancia: Number.NEGATIVE_INFINITY, elemento: null };
    elementos.forEach(function (elemento) {
      var caixa = elemento.getBoundingClientRect();
      var deslocamento = y - caixa.top - caixa.height / 2;
      if (deslocamento < 0 && deslocamento > maisProximo.distancia) {
        maisProximo = { distancia: deslocamento, elemento: elemento };
      }
    });
    return maisProximo.elemento;
  }

  async function persistirColunaInsights(categoria) {
    var colEl = document.querySelector('.ins-coluna-cards[data-categoria="' + categoria + '"]');
    if (!colEl) return;
    var cartoes = Array.prototype.slice.call(colEl.querySelectorAll(".ins-cartao"));
    for (var i = 0; i < cartoes.length; i++) {
      var id = cartoes[i].getAttribute("data-id");
      var insightLocal = cacheInsights.find(function (x) { return x.id === id; });
      if (insightLocal) { insightLocal.categoria = categoria; insightLocal.ordem = i + 1; }
      try {
        await sb.from("insights").update({ categoria: categoria, ordem: i + 1 }).eq("id", id);
      } catch (erro) { console.error("Não consegui salvar a nova posição.", erro); }
    }
  }

  function criarCartaoInsight(insight) {
    var card = el("div", { class: "ins-cartao", "data-id": insight.id });
    var midias = insight.midias || [];
    var primeiraMidia = midias[0];
    if (primeiraMidia) {
      if (primeiraMidia.tipo === "video") {
        card.appendChild(el("div", { class: "ins-cartao-capa-video", html: ICONES.video }));
      } else {
        card.appendChild(el("img", { class: "ins-cartao-capa", src: primeiraMidia.url, alt: "" }));
      }
    }
    var corpo = el("div", { class: "ins-cartao-corpo" });
    corpo.appendChild(el("p", { class: "ins-cartao-texto", texto: insight.texto || "" }));
    if (midias.length > 0) {
      var rodape = el("div", { class: "ins-cartao-rodape" });
      rodape.appendChild(el("span", { html: ICONES.imagem + " " + midias.length, style: "display:inline-flex;align-items:center;gap:.25rem;" }));
      corpo.appendChild(rodape);
    }
    card.appendChild(corpo);

    card.addEventListener("click", function () { abrirEditorInsight(insight); });
    card.draggable = true;
    card.addEventListener("dragstart", function () {
      itemArrastadoInsight = card;
      setTimeout(function () { card.classList.add("arrastando"); }, 0);
    });
    card.addEventListener("dragend", function () {
      card.classList.remove("arrastando");
      document.querySelectorAll(".ins-coluna-cards").forEach(function (c) { c.classList.remove("arrastando-sobre"); });
      if (!itemArrastadoInsight) return;
      itemArrastadoInsight = null;
      var colunaFinalEl = card.closest(".ins-coluna-cards");
      if (colunaFinalEl) persistirColunaInsights(colunaFinalEl.getAttribute("data-categoria"));
    });
    return card;
  }

  async function renderizarInsights(container) {
    container.innerHTML = "";
    var erro = await carregarInsights();
    if (erro) container.appendChild(avisoSecao(erro));

    container.appendChild(el("p", { class: "ins-aviso", texto: "Seu quadro de ideias. Arraste o cartão entre as colunas conforme a ideia evolui, e clique num cartão pra escrever ou anexar fotos e vídeos." }));

    var quadro = el("div", { class: "ins-quadro" });
    COLUNAS_INSIGHTS.forEach(function (coluna) {
      var itensColuna = cacheInsights.filter(function (i) { return i.categoria === coluna.chave; });
      var colEl = el("div", { class: "ins-coluna" });

      var cabecalho = el("div", { class: "ins-coluna-cabecalho" });
      cabecalho.appendChild(el("span", { class: "ins-coluna-titulo" }, [
        el("span", { texto: coluna.emoji, "aria-hidden": "true" }),
        el("span", { texto: coluna.nome })
      ]));
      cabecalho.appendChild(el("span", { class: "ins-coluna-contagem", texto: String(itensColuna.length) }));
      colEl.appendChild(cabecalho);

      var cardsEl = el("div", { class: "ins-coluna-cards", "data-categoria": coluna.chave });
      itensColuna.forEach(function (insight) { cardsEl.appendChild(criarCartaoInsight(insight)); });
      colEl.appendChild(cardsEl);

      cardsEl.addEventListener("dragover", function (evento) {
        evento.preventDefault();
        if (!itemArrastadoInsight) return;
        cardsEl.classList.add("arrastando-sobre");
        var apos = elementoInsightDepoisDoPonto(cardsEl, evento.clientY);
        if (apos == null) cardsEl.appendChild(itemArrastadoInsight);
        else cardsEl.insertBefore(itemArrastadoInsight, apos);
      });
      cardsEl.addEventListener("dragleave", function (evento) {
        if (evento.target === cardsEl) cardsEl.classList.remove("arrastando-sobre");
      });
      cardsEl.addEventListener("drop", function (evento) {
        evento.preventDefault();
        cardsEl.classList.remove("arrastando-sobre");
      });

      var botaoAdd = el("button", { type: "button", class: "ins-coluna-add", html: ICONES.mais + " Novo cartão" });
      botaoAdd.addEventListener("click", function () { abrirEditorInsight(null, coluna.chave); });
      colEl.appendChild(botaoAdd);

      quadro.appendChild(colEl);
    });
    container.appendChild(quadro);
  }

  async function subirMidiaInsight(arquivo) {
    var extensao = (arquivo.name.split(".").pop() || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    var caminho = Date.now() + "_" + Math.random().toString(36).slice(2, 8) + (extensao ? "." + extensao : "");
    var resp = await sb.storage.from("insights").upload(caminho, arquivo);
    if (resp.error) throw resp.error;
    var urlPublica = sb.storage.from("insights").getPublicUrl(caminho).data.publicUrl;
    var tipo = arquivo.type && arquivo.type.indexOf("video") === 0 ? "video" : "imagem";
    return { url: urlPublica, caminho: caminho, tipo: tipo, nome: arquivo.name };
  }

  function abrirEditorInsight(insight, categoriaPadrao) {
    var ehEdicao = !!insight;
    var estadoLocal = {
      texto: insight ? insight.texto : "",
      categoria: insight ? insight.categoria : (categoriaPadrao || "semente"),
      midias: insight ? (insight.midias || []).slice() : []
    };

    var corpo = el("div");
    var campoTextoInsight = campoTextarea({ id: "ins-texto", rotulo: "Texto da ideia", valor: estadoLocal.texto });
    campoTextoInsight.input.style.minHeight = "8rem";
    corpo.appendChild(campoTextoInsight.wrap);

    var campoCategoria = campoSelect({
      id: "ins-categoria", rotulo: "Categoria", valor: estadoLocal.categoria,
      opcoes: COLUNAS_INSIGHTS.map(function (c) { return { valor: c.chave, texto: c.nome }; })
    });
    corpo.appendChild(campoCategoria.wrap);

    corpo.appendChild(el("p", { style: "font-weight:700;font-size:.82rem;margin:.9rem 0 .5rem;", texto: "Fotos e vídeos" }));
    var gradeMidias = el("div", { class: "ins-media-grade" });
    corpo.appendChild(gradeMidias);

    function desenharMidias() {
      gradeMidias.innerHTML = "";
      estadoLocal.midias.forEach(function (m, indice) {
        var item = el("div", { class: "ins-media-item" });
        if (m.tipo === "video") item.appendChild(el("video", { src: m.url, muted: "true" }));
        else item.appendChild(el("img", { src: m.url, alt: "" }));
        var botaoRemover = el("button", { type: "button", class: "ins-media-remover", html: "&times;", "aria-label": "Remover arquivo" });
        botaoRemover.addEventListener("click", async function (evento) {
          evento.stopPropagation();
          botaoRemover.disabled = true;
          try {
            if (m.caminho) await sb.storage.from("insights").remove([m.caminho]);
            estadoLocal.midias.splice(indice, 1);
            if (ehEdicao) await sb.from("insights").update({ midias: estadoLocal.midias }).eq("id", insight.id);
            desenharMidias();
          } catch (erro) {
            alert("Não consegui remover esse arquivo agora. Tente de novo.");
            console.error(erro);
            botaoRemover.disabled = false;
          }
        });
        item.appendChild(botaoRemover);
        gradeMidias.appendChild(item);
      });
    }
    desenharMidias();

    var areaUpload = el("div", { class: "ins-upload-area", texto: "Clique ou arraste fotos e vídeos aqui" });
    var inputArquivo = el("input", { type: "file", accept: "image/*,video/*", multiple: "true", class: "oculto-visual" });
    corpo.appendChild(areaUpload);
    corpo.appendChild(inputArquivo);

    async function processarArquivos(arquivos) {
      var lista = Array.prototype.slice.call(arquivos);
      if (lista.length === 0) return;
      for (var i = 0; i < lista.length; i++) {
        areaUpload.textContent = "Enviando " + (i + 1) + " de " + lista.length + "...";
        try {
          var midia = await subirMidiaInsight(lista[i]);
          estadoLocal.midias.push(midia);
        } catch (erro) {
          console.error(erro);
          alert('Não consegui enviar "' + lista[i].name + '". Detalhe: ' + (erro && erro.message ? erro.message : "erro desconhecido"));
        }
      }
      areaUpload.textContent = "Clique ou arraste fotos e vídeos aqui";
      desenharMidias();
      if (ehEdicao) {
        try { await sb.from("insights").update({ midias: estadoLocal.midias }).eq("id", insight.id); } catch (erroSalvar) { console.error(erroSalvar); }
      }
    }

    areaUpload.addEventListener("click", function () { inputArquivo.click(); });
    areaUpload.addEventListener("dragover", function (evento) { evento.preventDefault(); areaUpload.classList.add("arrastando-arquivo"); });
    areaUpload.addEventListener("dragleave", function () { areaUpload.classList.remove("arrastando-arquivo"); });
    areaUpload.addEventListener("drop", function (evento) {
      evento.preventDefault();
      areaUpload.classList.remove("arrastando-arquivo");
      processarArquivos(evento.dataTransfer.files);
    });
    inputArquivo.addEventListener("change", function () {
      processarArquivos(inputArquivo.files);
      inputArquivo.value = "";
    });

    var faixaErro = avisoSecao(""); faixaErro.hidden = true;
    corpo.appendChild(faixaErro);

    var linhaBotoes = el("div", { style: "display:flex;justify-content:space-between;align-items:center;margin-top:1rem;" });
    var botaoSalvar = el("button", { type: "button", class: "botao botao-primario", texto: ehEdicao ? "Salvar" : "Criar cartão" });
    linhaBotoes.appendChild(botaoSalvar);
    if (ehEdicao) {
      var botaoApagar = el("button", { type: "button", class: "botao botao-perigo", html: ICONES.apagar + " Apagar" });
      botaoApagar.addEventListener("click", function () { confirmarApagarInsight(insight); });
      linhaBotoes.appendChild(botaoApagar);
    }
    corpo.appendChild(linhaBotoes);

    botaoSalvar.addEventListener("click", async function () {
      botaoSalvar.disabled = true;
      var registro = {
        texto: campoTextoInsight.input.value,
        categoria: campoCategoria.input.value,
        midias: estadoLocal.midias
      };
      try {
        if (ehEdicao) {
          var resp1 = await sb.from("insights").update(registro).eq("id", insight.id);
          if (resp1.error) throw resp1.error;
        } else {
          registro.ordem = 9999;
          var resp2 = await sb.from("insights").insert(registro);
          if (resp2.error) throw resp2.error;
        }
        fecharModal();
        renderizarAba("insights");
      } catch (erro) {
        console.error(erro);
        faixaErro.textContent = "Não consegui salvar agora. Detalhe: " + (erro && erro.message ? erro.message : "erro desconhecido");
        faixaErro.hidden = false;
        botaoSalvar.disabled = false;
      }
    });

    abrirModal(corpo, ehEdicao ? "Editar cartão" : "Novo cartão");
  }

  function confirmarApagarInsight(insight) {
    var texto = el("p", { texto: "Tem certeza que quer apagar este cartão? Essa ação não pode ser desfeita.", style: "margin-bottom:1.2rem;font-size:.88rem;" });
    var botoes = el("div", { style: "display:flex;gap:.6rem;justify-content:flex-end;" });
    var cancelar = el("button", { type: "button", class: "botao", texto: "Cancelar" });
    cancelar.addEventListener("click", fecharModal);
    var apagar = el("button", { type: "button", class: "botao botao-perigo", texto: "Apagar" });
    apagar.addEventListener("click", async function () {
      try {
        var caminhos = (insight.midias || []).map(function (m) { return m.caminho; }).filter(Boolean);
        if (caminhos.length > 0) await sb.storage.from("insights").remove(caminhos);
        var resp = await sb.from("insights").delete().eq("id", insight.id);
        if (resp.error) throw resp.error;
        fecharModal();
        renderizarAba("insights");
      } catch (erro) {
        alert("Não consegui apagar agora. Tente de novo.");
        console.error(erro);
      }
    });
    botoes.appendChild(cancelar);
    botoes.appendChild(apagar);
    abrirModal([texto, botoes], "Confirmar exclusão");
  }

  /* =========================================================
     INICIALIZAÇÃO E CONFERÊNCIA DE SESSÃO
     ========================================================= */
  async function iniciar() {
    var telaCarregando = document.getElementById("tela-carregando");
    var app = document.getElementById("app");

    if (!sb) {
      telaCarregando.textContent = "Não consegui conectar ao Supabase. Confira sua conexão e recarregue a página.";
      return;
    }

    try {
      var resposta = await sb.auth.getSession();
      if (!resposta.data || !resposta.data.session) {
        window.location.href = "../login/";
        return;
      }
      estado.usuarioEmail = resposta.data.session.user.email || "";
    } catch (erro) {
      console.error(erro);
      window.location.href = "../login/";
      return;
    }

    sb.auth.onAuthStateChange(function (evento) {
      if (evento === "SIGNED_OUT") window.location.href = "../login/";
    });

    telaCarregando.hidden = true;
    app.hidden = false;
    document.getElementById("bl-email").textContent = estado.usuarioEmail;
    montarMenu();

    var abaInicial = (window.location.hash || "").replace("#", "") || "portfolio";
    if (!TITULOS_ABA[abaInicial]) abaInicial = "portfolio";
    irParaAba(abaInicial);
  }

  iniciar();
})();
