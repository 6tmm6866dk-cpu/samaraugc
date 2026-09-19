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
    mais: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    estrela: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.6 17 14.6 18.2 21.5 12 18.1 5.8 21.5 7 14.6 2 9.6 8.9 8.6 12 2"/></svg>',
    estrelaCheia: '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><polygon points="12 2 15.1 8.6 22 9.6 17 14.6 18.2 21.5 12 18.1 5.8 21.5 7 14.6 2 9.6 8.9 8.6 12 2"/></svg>',
    ordenarCima: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 4 20 16 4 16"/></svg>',
    ordenarBaixo: '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 20 4 8 20 8"/></svg>',
    whatsapp: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.6 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>',
    instagram: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    seta: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>',
    chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  /* =========================================================
     ESTADO GERAL
     ========================================================= */
  var estado = {
    abaAtual: "portfolio",
    usuarioEmail: "",
    marcas: { busca: "", situacao: "todas" },
    campanhas: { busca: "", filtro: "todas", ordemColuna: "prazo", ordemAsc: true },
    calendario: { ano: null, mes: null, filtros: { gravar: true, editar: true, postar: true } }
  };

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
      { id: "calendario", nome: "Calendário", icone: ICONES.calendario },
      { id: "campanhas", nome: "Campanhas", icone: ICONES.campanhas },
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

  var TITULOS_ABA = { portfolio: "Portfólio", marcas: "Marcas", calendario: "Calendário", campanhas: "Campanhas", checklist: "Checklist do portfólio" };

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
    else if (aba === "calendario") renderizarCalendario(container);
    else if (aba === "campanhas") renderizarCampanhas(container);
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
        (m.instagram || "").toLowerCase().indexOf(termo) !== -1 ||
        (m.email || "").toLowerCase().indexOf(termo) !== -1;
      return passaSituacao && passaBusca;
    });

    if (cacheMarcas.length === 0) {
      cartao.appendChild(estadoVazio("Você ainda não tem nenhuma marca cadastrada. Elas também chegam aqui sozinhas quando alguém preenche o formulário do seu portfólio."));
      return;
    }
    if (filtradas.length === 0) {
      cartao.appendChild(estadoVazio("Nenhuma marca encontrada com esse filtro."));
      return;
    }

    var wrap = el("div", { class: "tabela-scroll" });
    var tabela = el("table");
    tabela.appendChild(el("thead", {}, [el("tr", {}, [
      el("th", { texto: "Marca" }), el("th", { texto: "Instagram" }), el("th", { texto: "E-mail" }),
      el("th", { texto: "Telefone" }), el("th", { texto: "Situação" }), el("th", { texto: "Último contato" }), el("th", { texto: "" })
    ])]));
    var corpo = el("tbody");
    filtradas.forEach(function (m) {
      var tr = el("tr", { class: "linha-clicavel" });
      tr.addEventListener("click", function (evento) {
        if (evento.target.closest("a")) return;
        abrirFormularioMarca(m);
      });
      tr.appendChild(el("td", { texto: m.nome || "" }));

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
    var instagram = campoTexto({ id: "m-instagram", rotulo: "Instagram", valor: marca ? marca.instagram : "" });
    var email = campoTexto({ id: "m-email", rotulo: "E-mail", tipo: "email", valor: marca ? marca.email : "" });
    var telefone = campoTexto({ id: "m-telefone", rotulo: "Telefone (com DDD)", valor: marca ? marca.telefone : "" });
    var situacao = campoSelect({
      id: "m-situacao", rotulo: "Situação", valor: marca ? marca.situacao : "Lead",
      opcoes: [{ valor: "Lead", texto: "Lead" }, { valor: "Conversando", texto: "Conversando" }, { valor: "Cliente", texto: "Cliente" }, { valor: "Parada", texto: "Parada" }]
    });
    var ultimoContato = campoTexto({ id: "m-ultimo-contato", rotulo: "Último contato", tipo: "date", valor: marca && marca.ultimo_contato ? String(marca.ultimo_contato).slice(0, 10) : "" });
    var obs = campoTextarea({ id: "m-obs", rotulo: "Observações", valor: marca ? marca.obs : "" });

    var form = el("form", {}, [nome.wrap, instagram.wrap, email.wrap, telefone.wrap, situacao.wrap, ultimoContato.wrap, obs.wrap]);
    var faixaErro = avisoSecao(""); faixaErro.hidden = true;
    form.appendChild(faixaErro);
    form.appendChild(el("button", { type: "submit", class: "botao botao-primario", texto: ehEdicao ? "Salvar alterações" : "Adicionar marca" }));

    form.addEventListener("submit", async function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var registro = {
        nome: nome.input.value.trim(), instagram: instagram.input.value.trim(), email: email.input.value.trim(),
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
    var linhas = [["Nome", "Instagram", "E-mail", "Telefone", "Situação", "Observações", "Último contato"]];
    cacheMarcas.forEach(function (m) {
      linhas.push([m.nome, m.instagram, m.email, m.telefone, m.situacao, m.obs, formatarDataBR(m.ultimo_contato)]);
    });
    var csv = "﻿" + paraCSV(linhas);
    baixarArquivo("marcas.csv", csv, "text/csv;charset=utf-8;");
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
