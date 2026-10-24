(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Dados ---------- */
  const D = {
    sec: { n: "Cibersegurança", s: "SEC" },
    forense: { n: "Perícia & Direito", s: "PERÍCIA" },
    dev: { n: "Código", s: "CÓDIGO" },
    infra: { n: "Infra & Cloud", s: "INFRA" },
    ia: { n: "Inteligência Artificial", s: "IA" },
    estrategia: { n: "Negócios", s: "NEGÓCIOS" },
    instrucao: { n: "Comunicação", s: "COMUNICAÇÃO" }
  };
  const EDU = {
    grad: [
      { k: "Bacharelado", t: "Sistemas de Informação", s: "done", tags: ["dev", "infra"] },
      { k: "Formação pedagógica R2 · equivale à licenciatura plena", t: "Física", s: "done", tags: ["instrucao"] },
      { k: "Curso superior sequencial", t: "Gestão de Segurança Pública", s: "done", tags: ["forense", "estrategia"] },
      { k: "Bacharelado", t: "Engenharia de Software", s: "wip", tags: ["dev"] }
    ],
    tec: [
      { k: "Curso técnico", t: "Telecomunicações", s: "base", tags: ["infra"] },
      { k: "Curso técnico", t: "Segurança do Trabalho", s: "base", tags: ["instrucao"] }
    ],
    pos: [
      { k: "Especialização · lato sensu", t: "Segurança da Informação", s: "done", tags: ["sec"] },
      { k: "Especialização · lato sensu", t: "Perícia Forense Computacional", s: "done", tags: ["forense"] },
      { k: "Especialização · lato sensu", t: "Engenharia de Software", s: "done", tags: ["dev"] },
      { k: "Especialização · lato sensu", t: "Gestão Estratégica de Negócios", s: "done", tags: ["estrategia"] },
      { k: "Especialização · lato sensu", t: "Direito Constitucional Aplicado", s: "done", tags: ["forense"] },
      { k: "MBA · lato sensu", t: "Transformação de Negócios com IA Generativa", s: "wip", tags: ["ia", "estrategia"] }
    ],
    mestrado: { k: "Fase chefe · Mestrado stricto sensu", t: "Digital Business & IA", s: "wip", tags: ["ia", "estrategia"] }
  };
  const CERTS = [
    { id: "cpt", a: "CPT", n: "Certified Penetration Tester", i: "QAQM", tags: ["sec"] },
    { id: "dapc", a: "DAPC", n: "Certificação Profissional de DevOps Avançado", i: "CertiProf", tags: ["infra", "dev"] },
    { id: "caisr", a: "CAISR", n: "Certified Artificial Intelligence Security Researcher", i: "RedTeam Leaders", tags: ["sec", "ia"] },
    { id: "googleai", a: "GOOGLE AI", n: "Google AI", i: "Google", tags: ["ia"] },
    { id: "gcst", a: "GCST", n: "Google Cloud SecOps Technical", i: "Google", tags: ["sec", "infra"] },
    { id: "npp", a: "NPP", n: "Novo Pentest Profissional", i: "Desec Security", tags: ["sec"] },
    { id: "bhcpp", a: "C++", n: "Black Hat C++ for Pentest", i: "EC-Council", tags: ["sec", "dev"] },
    { id: "c3sa", a: "C3SA", n: "Certified Cyber Security Analyst", i: "CWL", tags: ["sec"] },
    { id: "mcrta", a: "MCRTA", n: "Multi-Cloud Red Team Analyst", i: "CWL", tags: ["sec", "infra"] },
    { id: "crtcoi", a: "CRT‑COI", n: "Certified Red Team · CredOps Infiltrator", i: "", tags: ["sec"] },
    { id: "peh", a: "PEH", n: "Practical Ethical Hacker", i: "TCM Security", tags: ["sec"] }
  ];
  const MISSIONS = [
    {
      id: "netsafe", org: "Netsafe Corp", code: "LINHA DE DEFESA", active: true, wide: true,
      brief: "Segurança ofensiva e defensiva, automação e aplicações com IA.",
      tasks: [["Resposta a incidentes", ["sec", "forense"]], ["Análise de vulnerabilidades", ["sec"]], ["Análise de superfície de ataque", ["sec"]], ["Gestão de vulnerabilidades", ["sec"]], ["Pentest web e de redes", ["sec"]], ["Desenvolvimento de sistemas web", ["dev"]], ["Scripts em Python, Bash e PowerShell", ["dev"]], ["Desenvolvimento de aplicações com IA", ["ia", "dev"]], ["Desenvolvimento de prompts para IA", ["ia"]], ["Integração entre sistemas via API", ["dev"]], ["Treinamento interno da equipe", ["instrucao"]]]
    },
    {
      id: "ccf", org: "CCF", code: "A ACADEMIA", wide: true,
      brief: "Ensino de perícia forense, infraestrutura em nuvem e automação de negócios com IA.",
      tasks: [["Professor de perícias forenses", ["instrucao", "forense"]], ["Desenvolvimento de sistemas web", ["dev"]], ["Manutenção de infraestrutura em nuvem", ["infra"]], ["Estrategista digital", ["estrategia", "instrucao"]], ["Tráfego pago", ["estrategia"]], ["Integração de sistemas", ["dev"]], ["Automação com IA aplicada ao fluxo de negócio", ["ia", "estrategia"]]]
    },
    {
      id: "pcpa", org: "Polícia Civil do Pará", code: "A EVIDÊNCIA",
      brief: "Perícia em celulares, extração de dados e investigação digital.",
      tasks: [["Perícia forense em celulares", ["forense"]], ["Extração de dados", ["forense"]], ["Investigação digital", ["forense", "sec"]], ["Projetos de redes e infraestrutura de TI", ["infra"]]]
    },
    {
      id: "techxingu", org: "Tech Xingu", code: "CORRENTEZA",
      brief: "Consultoria, sistemas web e aquisição de clientes com tráfego pago.",
      tasks: [["Consultoria em TI", ["estrategia", "infra", "instrucao"]], ["Desenvolvimento de sistemas web", ["dev"]], ["Tráfego pago", ["estrategia"]]]
    },
    {
      id: "dservice", org: "DService", code: "OLHO VIGILANTE",
      brief: "Sistemas sob medida e circuitos de câmeras de segurança.",
      tasks: [["Desenvolvimento de sistemas", ["dev"]], ["Instalação e manutenção de câmeras de segurança", ["infra"]]]
    },
    {
      id: "senai", org: "SENAI", code: "O INSTRUTOR",
      brief: "Formação de pessoas em TICs e Informática.",
      tasks: [["Treinamento em TICs", ["instrucao"]], ["Formação em informática", ["instrucao"]], ["Programação de sistemas", ["instrucao"]], ["Manutenção de computadores", ["instrucao"]]]
    }
  ];
  const TRUNFO = {
    netsafe: "Conhece por dentro os problemas que as soluções de segurança prometem resolver: ataca, defende e automatiza.",
    ccf: "Ensina, mantém nuvem e automatiza processos de negócio com IA.",
    pcpa: "Rigor de evidência e cadeia de custódia, úteis nas conversas com áreas jurídicas e de compliance.",
    techxingu: "Contato direto com o cliente, da consultoria à geração de demanda.",
    dservice: "Entrega em campo, unindo software e segurança física.",
    senai: "Experiência em conduzir turmas e transmitir conhecimentos."
  };
  const POWERS = [
    {
      t: "Descoberta técnica", ph: "DESCOBERTA", ask: "Levantar escopo e requisitos, entender o ambiente do cliente e priorizar riscos.",
      proof: [["Análise de superfície de ataque", "Netsafe"], ["Análise e gestão de vulnerabilidades", "Netsafe"], ["Consultoria em TI", "Tech Xingu"], ["Investigação digital", "Polícia Civil do Pará"]]
    },
    {
      t: "Demos e PoC", ph: "DEMONSTRAÇÃO", ask: "Conduzir demonstrações e provas de conceito que mostram o valor da solução no ambiente do cliente.",
      proof: [["Pentest web e de redes", "Netsafe"], ["SOC agêntico XURU.IA", "Projeto próprio"], ["CPT, NPP, PEH e CRT‑COI", "Certificações"], ["Black Hat C++ for Pentest", "EC-Council"]]
    },
    {
      t: "Arquitetura de soluções", ph: "ARQUITETURA", ask: "Desenhar soluções de SOC, SecOps, nuvem, gestão de vulnerabilidades e resposta a incidentes.",
      proof: [["SIEM e SOAR com Google SecOps", "Implantação"], ["XDR com Trellix Helix e endpoint com HX", "Implantação"], ["Resposta a incidentes", "Netsafe"], ["Google Cloud SecOps Technical", "Google"], ["Infraestrutura em nuvem", "CCF"]]
    },
    {
      t: "Integração e automação", ph: "ARQUITETURA", ask: "Encaixar a solução no ecossistema do cliente por API, scripts, SOAR e automação com IA.",
      proof: [["15 ferramentas integradas: Splunk, QRadar, FortiGate, Tenable e outras", "Arsenal"], ["SOAR com Trellix Hyperautomation", "Implantação"], ["Integração entre sistemas via API", "Netsafe"], ["Scripts em Python, Bash e PowerShell", "Netsafe"], ["Automação com IA no fluxo de negócio", "CCF"]]
    },
    {
      t: "Comunicação e habilitação", ph: "APRESENTAÇÃO", ask: "Apresentar para times técnicos e executivos e capacitar equipes, parceiros e canais.",
      proof: [["Professor de perícias forenses", "CCF"], ["Treinamento interno da equipe", "Netsafe"], ["Treinamentos Técnicos", "SENAI"], ["Licenciatura em Física (R2)", "Formação"], ["Manual Operador Fantasma", "Projeto próprio"]]
    },
    {
      t: "Negócio e conformidade", ph: "PROPOSTA", ask: "Traduzir risco em valor de negócio e sustentar a proposta com visão estratégica e jurídica.",
      proof: [["Gestão Estratégica de Negócios", "Especialização"], ["Digital Business & IA", "Mestrado em andamento"], ["Estrategista digital", "CCF"], ["Direito Constitucional Aplicado", "Especialização"]]
    }
  ];
  const PROJECTS = [
    {
      id: "xuruia", n: "XURU.IA", url: "https://xuruia.xurupita.com.br", feat: true, tags: ["sec", "ia"],
      d: "SOC agêntico: agentes de IA para apoiar o trabalho de equipes de SOC.",
      tr: "Demonstração pronta para conversas sobre SOC, SIEM, SOAR e automação com IA."
    },
    {
      id: "manifesto", n: "Manifesto", url: "https://manifesto.xurupita.com.br", tags: ["sec", "dev", "ia", "instrucao"],
      d: "Manifesto sobre segurança de software na era do vibe coding, quando boa parte do código nasce com IA. Horizonte de 2026 a 2030.",
      tr: "Ponto de vista próprio sobre AppSec e DevSecOps para levar ao cliente."
    },
    {
      id: "labs", n: "Xurupita Labs", url: "https://xurupita.com.br", tags: ["dev", "infra"],
      d: "Laboratório de inovação digital com experimentos web e uma API REST pública e documentada.",
      tr: "Ambiente para montar e testar provas de conceito com rapidez."
    },
    {
      id: "osint", n: "Operador Fantasma", url: "https://operador-osint.vercel.app", tags: ["sec", "forense", "instrucao", "estrategia"],
      d: "Manual digital sobre busca avançada, OSINT e defesa da própria exposição online.",
      tr: "Tema técnico transformado em produto, com página de venda própria."
    },
    {
      id: "gabarito", n: "GabaritoAI", url: "https://editalai-gold.vercel.app", tags: ["ia", "dev", "estrategia"],
      d: "Analisa editais de concursos e gera guia de estudos, cronograma e simulados no estilo da banca.",
      tr: "Produto de IA generativa construído de ponta a ponta."
    }
  ];
  const DEPLOYS = [
    {
      id: "secops", v: "Google SecOps", k: "SIEM + SOAR", tags: ["sec", "infra"],
      d: "Implantação de SIEM e SOAR na plataforma Google Security Operations."
    },
    {
      id: "helix", v: "Trellix Helix", k: "XDR", tags: ["sec", "infra"],
      d: "Implantação do Helix aplicando o conceito de XDR, correlacionando detecção e resposta entre várias fontes."
    },
    {
      id: "hx", v: "Trellix Endpoint Security", k: "ENDPOINT · HX", tags: ["sec", "infra"],
      d: "Implantação de proteção, detecção e resposta em endpoints com o HX."
    },
    {
      id: "hyper", v: "Trellix Hyperautomation", k: "SOAR", tags: ["sec", "dev"],
      d: "Implantação de SOAR para automatizar a resposta a incidentes."
    }
  ];
  const DEPLOY_STEPS = ["provisionar ambiente", "integrar fontes de dados", "validar e entrar em produção"];
  const TOOLS = [
    { g: "SIEM e coleta de logs", t: ["Splunk", "QRadar", "LogRhythm", "BindPlane"] },
    { g: "XDR e endpoint", t: ["Trellix", "Cortex"] },
    { g: "Rede e acesso", t: ["FortiGate", "Skyhigh"] },
    { g: "Nuvem e SaaS", t: ["AWS", "Azure", "Google", "O365", "Orca"] },
    { g: "Exposição e validação", t: ["Tenable", "Cymulate"] }
  ];
  const TOOL_LIST = TOOLS.flatMap(g => g.t);
  const ACH = [
    { id: "inicio", t: "Primeira página", d: "Começou a leitura da edição.", clue: "Clique em Iniciar leitura, na capa.", go: "#capa", xp: 50 },
    { id: "digital", t: "Impressão digital", d: "Coletou a digital do emblema.", clue: "Toque 3 vezes no emblema de digital, na ficha do personagem.", go: "#capa", xp: 150 },
    { id: "leitor", t: "Leitor voraz", d: "Passou por todos os capítulos.", clue: "Role a página passando por todos os capítulos.", go: "#poderes", xp: 60 },
    { id: "implantacao", t: "Em produção", d: "Colocou as quatro implantações no ar.", clue: "Clique em Implantar em cada plataforma do Campo de batalha.", go: "#implantacoes", xp: 100 },
    { id: "integrador", t: "Integrador", d: "Conectou todas as ferramentas do arsenal.", clue: "Conecte as ferramentas do arsenal, uma a uma ou todas de uma vez.", go: "#implantacoes", xp: 100 },
    { id: "reliquias", t: "Colecionador", d: "Coletou todas as relíquias.", clue: "Toque em cada carta do capítulo Relíquias.", go: "#reliquias", xp: 120 },
    { id: "arquivos", t: "Arquivista", d: "Acessou todos os arquivos de missão.", clue: "Clique em Acessar arquivo em cada missão.", go: "#missoes", xp: 120 },
    { id: "laboratorio", t: "Visitante do laboratório", d: "Inspecionou todos os projetos do laboratório.", clue: "Clique em Inspecionar em cada projeto.", go: "#laboratorio", xp: 100 },
    { id: "konami", t: "Modo terminal", d: "Ativou o modo terminal.", clue: "Use o botão Modo terminal, no final da página. Quem tiver teclado pode digitar ↑↑↓↓←→←→BA.", go: "#fim", xp: 200 },
    { id: "fim", t: "Até a última página", d: "Chegou ao fim da edição nº 01.", clue: "Role até o fim da página.", go: "#fim", xp: 80 }
  ];
  const LEVELS = [{ min: 0, r: "Recruta" }, { min: 250, r: "Analista" }, { min: 700, r: "Investigador" }, { min: 1250, r: "Perito" }, { min: 1850, r: "Especialista" }, { min: 2400, r: "Lenda Digital" }];
  const CHAPTERS = { poderes: "Superpoderes", implantacoes: "Campo de batalha", origem: "Origem", treino: "Treinamento avançado", reliquias: "Relíquias", missoes: "Arquivos de missão", laboratorio: "O laboratório" };

  /* ---------- Estado ---------- */
  const KEY = "dc-hq-v1";
  const fresh = () => ({ xp: 0, ach: [], certs: [], missions: [], chapters: [], projects: [], deploys: [], tools: [], sound: false, complete: false });
  let state = fresh();
  try { const s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && typeof s === "object") state = Object.assign(fresh(), s); } catch (e) { }
  state.certs = state.certs.filter(id => CERTS.some(c => c.id === id));
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { } };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const G = window.gsap;

  /* ---------- Atributos ---------- */
  function scores() {
    const s = {}; Object.keys(D).forEach(k => s[k] = 0);
    [...EDU.grad, ...EDU.tec, ...EDU.pos, EDU.mestrado].forEach(f => f.tags.forEach(t => s[t] += 2));
    CERTS.forEach(c => c.tags.forEach(t => s[t] += 3));
    MISSIONS.forEach(m => m.tasks.forEach(([, tags]) => tags.forEach(t => s[t] += 1)));
    PROJECTS.forEach(p => p.tags.forEach(t => s[t] += 2));
    DEPLOYS.forEach(p => p.tags.forEach(t => s[t] += 2));
    s.dev += 2; s.infra += 2; // projeto de integração do arsenal
    return s;
  }
  const tag = g => `<span class="tag d-${g}" style="--d:var(--d-${g})">${D[g].n}</span>`;

  function renderCover() {
    const s = scores(), keys = Object.keys(D), max = Math.max(...keys.map(k => s[k]));
    $("#powerTotal").textContent = keys.reduce((a, k) => a + s[k], 0);
    const lv = {}; keys.forEach(k => lv[k] = Math.max(1, Math.round(10 * Math.sqrt(s[k] / max))));
    $("#stats").innerHTML = keys.map(k => `<li style="--d:var(--d-${k})" title="${s[k]} pontos"><span class="st-name"><i class="sw"></i>${D[k].n}</span><span class="st-bar" role="img" aria-label="Nível ${lv[k]} de 10">${Array.from({ length: 10 }, (_, i) => `<i class="${i < lv[k] ? "on" : ""}"></i>`).join("")}</span><b>NV ${lv[k]}</b></li>`).join("");
    // radar
    const n = keys.length, cx = 160, cy = 126, R = 86;
    const pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] };
    let svg = "";
    [.25, .5, .75, 1].forEach(f => { svg += `<polygon class="ring" points="${keys.map((_, i) => pt(i, R * f).map(v => v.toFixed(1)).join(",")).join(" ")}"/>` });
    keys.forEach((_, i) => { const [x, y] = pt(i, R); svg += `<line class="axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>` });
    const dp = keys.map((k, i) => pt(i, R * lv[k] / 10));
    svg += `<g id="radarPoly"><polygon class="area" points="${dp.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}"/>${dp.map(([x, y]) => `<circle class="vtx" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4"/>`).join("")}</g>`;
    keys.forEach((k, i) => { const [x, y] = pt(i, R + 16); const anchor = Math.abs(x - cx) < 6 ? "middle" : (x > cx ? "start" : "end"); svg += `<text x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="${anchor}">${D[k].s}</text>` });
    $("#radar").innerHTML = svg;
    $("#radar").setAttribute("aria-label", "Atributos: " + keys.map(k => `${D[k].n} nível ${lv[k]}`).join(", "));
    const T = [[EDU.grad.length, "Graduações"], [EDU.pos.length + 1, "Pós-graduações"], [CERTS.length, "Certificações e certificados"], [MISSIONS.length, "Arquivos de missão"], [DEPLOYS.length, "Implantações"], [TOOL_LIST.length, "Ferramentas integradas"], [PROJECTS.length, "Projetos no ar"]];
    $("#tally").innerHTML = T.map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><span>${l.toUpperCase()}</span></div>`).join("");
    const wip = [...EDU.grad, ...EDU.pos, EDU.mestrado].filter(f => f.s === "wip").map(f => f.t);
    $("#finSub").textContent = `A próxima edição já está em produção: ${wip.slice(0, -1).join(", ")} e ${wip.at(-1)} seguem em andamento.`;
  }

  const chip = s => s === "done" ? `<span class="chip done">CONCLUÍDO ✓</span>` : s === "wip" ? `<span class="chip wip">EM ANDAMENTO</span>` : `<span class="chip base">HABILIDADE BASE</span>`;
  function fCard(f) {
    return `<article class="panel f-card reveal">
    <span class="f-kind">${f.k}</span>
    <h3 class="f-title">${f.t}</h3>
    <div class="tags">${f.tags.map(tag).join("")}</div>
    ${f.s === "wip" ? '<div class="wip-bar" aria-hidden="true"></div>' : ""}
    <div class="f-meta">${chip(f.s)}<span class="pts">+${f.tags.length * 2} PODER</span></div>
  </article>`;
  }
  function bossCard(f) {
    return `<article class="panel f-card boss reveal">
    <div style="display:grid;gap:12px;min-width:0">
      <span class="f-kind">${f.k}</span>
      <h3 class="f-title">${f.t}</h3>
      <div class="tags">${f.tags.map(tag).join("")}</div>
      <div class="wip-bar" aria-hidden="true"></div>
    </div>
    <div class="boss-side">${chip(f.s)}<span class="boss-hp">BATALHA EM CURSO<br>+${f.tags.length * 2} PODER</span></div>
  </article>`;
  }
  function renderEdu() {
    $("#gradGrid").innerHTML = EDU.grad.map(fCard).join("");
    $("#tecGrid").innerHTML = EDU.tec.map(fCard).join("");
    $("#posGrid").innerHTML = EDU.pos.map(fCard).join("") + bossCard(EDU.mestrado);
  }
  function renderRelics() {
    $("#relicGrid").innerHTML = CERTS.map(c => {
      const got = state.certs.includes(c.id), L = c.a.length, sz = L <= 4 ? 70 : L <= 5 ? 58 : L <= 7 ? 46 : 38;
      return `<button class="relic reveal ${got ? "flipped" : ""}" style="--acr-size:${sz}px" data-id="${c.id}" aria-pressed="${got}" aria-label="${c.a}, ${c.n}${c.i ? ", " + c.i : ""}${got ? ", coletada" : ""}">
      <div class="relic-inner">
        <div class="face front">
          <span class="issuer">${c.i ? "EMISSOR · " + c.i.toUpperCase() : "CERTIFICAÇÃO"}</span>
          <div class="acr">${c.a}</div>
          <div class="full">${c.n}</div>
          <div class="tags">${c.tags.map(g => `<span class="tag" style="--d:var(--d-${g})">${D[g].n}</span>`).join("")}</div>
          <span class="tap">${got ? "COLETADA · TOQUE PARA VIRAR" : "▶ TOQUE PARA COLETAR · +50 XP"}</span>
        </div>
        <div class="face back">
          <span class="issuer">RELÍQUIA DESBLOQUEADA</span>
          <div class="acr">${c.a}</div>
          <div class="got">COLETADA!</div>
          <div class="full">${c.n}</div>
          <span class="issuer">${c.i ? c.i.toUpperCase() + " · " : ""}+3 PODER POR ATRIBUTO</span>
          <span class="seal">+50</span>
        </div>
      </div>
    </button>`}).join("");
  }
  function renderMissions() {
    $("#legend").innerHTML = Object.keys(D).map(k => `<span><i class="dot" style="--d:var(--d-${k})"></i>${D[k].n}</span>`).join("");
    $("#missionGrid").innerHTML = MISSIONS.map(m => {
      const done = state.missions.includes(m.id), cnt = {};
      m.tasks.forEach(([, tg]) => tg.forEach(g => cnt[g] = (cnt[g] || 0) + 1));
      return `<article class="panel mission reveal ${m.wide ? "wide" : ""} ${done ? "declass" : ""}" data-id="${m.id}">
      <div class="stamp" aria-hidden="true"><span class="s-conf">CONFIDENCIAL</span><span class="s-ok">ACESSO LIBERADO</span></div>
      <span class="m-code">ARQUIVO DE MISSÃO · ${m.code}</span>
      <h3 class="m-org">${m.org}${m.active ? '<span class="live">MISSÃO ATIVA</span>' : ""}</h3>
      <p class="m-brief">${m.brief}</p>
      <p class="trunfo"><b>TRUNFO</b>${TRUNFO[m.id]}</p>
      <ul class="m-tasks">${m.tasks.map(([t, tg]) => `<li><span>${t}</span><span class="dots">${tg.map(g => `<i class="dot" style="--d:var(--d-${g})" title="${D[g].n}"></i><span class="sr">${D[g].n}</span>`).join("")}</span></li>`).join("")}</ul>
      <div class="m-foot">
        <div class="m-sum">${Object.entries(cnt).map(([g, c]) => `<span class="tag" style="--d:var(--d-${g})">${D[g].s} ×${c}</span>`).join("")}</div>
        <button class="m-btn" ${done ? "disabled" : ""}>${done ? "ARQUIVO ACESSADO ✓" : "ACESSAR ARQUIVO · +60 XP"}</button>
      </div>
    </article>`}).join("");
  }
  function renderPowers() {
    $("#powerGrid").innerHTML = POWERS.map(p => `<article class="panel power reveal">
    <div class="power-top"><span class="phase">FASE · ${p.ph}</span><span class="lvl" title="${p.proof.length} evidências">${[0, 1, 2, 3, 4].map(i => `<i class="${i < p.proof.length ? "on" : ""}"></i>`).join("")}</span></div>
    <h3>${p.t}</h3>
    <p class="ask"><span class="lbl">NA PRÁTICA</span>${p.ask}</p>
    <ul class="proof" aria-label="Evidências no histórico">${p.proof.map(([t, s]) => `<li><span>${t} <span class="src">· ${s}</span></span></li>`).join("")}</ul>
  </article>`).join("");
  }
  function renderDeploys() {
    $("#deployGrid").innerHTML = DEPLOYS.map(p => {
      const done = state.deploys.includes(p.id);
      return `<article class="panel deploy reveal ${done ? "done" : ""}" data-id="${p.id}">
      <span class="deploy-kind">${p.k}</span>
      <h3>${p.v}</h3>
      <p>${p.d}</p>
      <ol class="deploy-log" aria-hidden="true">${DEPLOY_STEPS.map(s => `<li class="${done ? "ok" : ""}">${s}</li>`).join("")}</ol>
      <div class="deploy-bar" aria-hidden="true"><div class="deploy-fill"></div></div>
      <div class="deploy-foot"><span class="status">${done ? "EM PRODUÇÃO ✓" : "AGUARDANDO DEPLOY"}</span><button class="proj-inspect deploy-btn" ${done ? "disabled" : ""}>${done ? "IMPLANTADO ✓" : "IMPLANTAR · +50 XP"}</button></div>
    </article>`}).join("");
  }
  function renderHub() {
    $("#hubGrid").innerHTML = TOOLS.map(g => `<div class="hub-group"><span class="lbl">${g.g.toUpperCase()}</span>${g.t.map(t => {
      const on = state.tools.includes(t);
      return `<button class="tool ${on ? "on" : ""}" data-t="${t}" aria-pressed="${on}"><i aria-hidden="true"></i>${t}<small>${on ? "ON" : "OFF"}</small></button>`
    }).join("")}</div>`).join("");
    updateHub();
  }
  function updateHub() {
    const n = state.tools.length, N = TOOL_LIST.length;
    $("#hubCount").textContent = `${String(n).padStart(2, "0")}/${N}`;
    $("#hubFill").style.width = (n / N * 100) + "%";
    const all = $("#hubAll"); all.disabled = n === N; all.textContent = n === N ? "ARSENAL CONECTADO ✓" : `CONECTAR TODAS · +${(N - n) * 10} XP`;
  }
  function renderProjects() {
    $("#projGrid").innerHTML = PROJECTS.map(p => {
      const v = state.projects.includes(p.id), host = p.url.replace(/^https?:\/\//, "");
      return `<article class="panel proj reveal ${p.feat ? "feat" : ""} ${v ? "visited" : ""}" data-id="${p.id}">
      <div class="proj-bar" aria-hidden="true"><i></i><i></i><i></i><span>${host}</span></div>
      <div class="proj-body">
        <h3>${p.n}</h3>
        <p>${p.d}</p>
        <div class="tags">${p.tags.map(tag).join("")}</div>
        <p class="trunfo"><b>TRUNFO</b>${p.tr}</p>
        <div class="proj-actions">
          <button class="proj-inspect" ${v ? "disabled" : ""}>${v ? "INSPECIONADO ✓" : "INSPECIONAR · +30 XP"}</button>
          <a class="proj-link" href="${p.url}" target="_blank" rel="noopener">ABRIR SITE ↗</a>
        </div>
      </div>
    </article>`}).join("");
  }
  function achHTML() {
    return ACH.map(a => {
      const ok = state.ach.includes(a.id);
      return `<li class="ach ${ok ? "ok" : ""}"><span class="ach-ico" aria-hidden="true">${ok ? "★" : "?"}</span><div><b>${a.t}</b><span>${ok ? a.d : a.clue}</span>${ok ? "" : `<button class="ach-go" data-go="${a.go}">IR ATÉ LÁ →</button>`}</div><em>${ok ? "✓ " : ""}+${a.xp} XP</em></li>`
    }).join("");
  }
  function renderAch() {
    const h = achHTML(); $("#achList").innerHTML = h; $("#achFinal").innerHTML = h;
    $("#achCount").textContent = `${state.ach.length}/${ACH.length}`;
  }

  /* ---------- HUD ---------- */
  const levelOf = xp => { let l = 0; LEVELS.forEach((L, i) => { if (xp >= L.min) l = i }); return l };
  function renderHUD() {
    const L = levelOf(state.xp), cur = LEVELS[L].min, nxt = LEVELS[L + 1]?.min;
    const pct = nxt ? (state.xp - cur) / (nxt - cur) * 100 : 100;
    $("#hudRank").textContent = `NV ${L + 1} · ${LEVELS[L].r.toUpperCase()}`;
    $("#xpText").textContent = nxt ? `${state.xp} / ${nxt}` : `${state.xp} · MAX`;
    $("#xpFill").style.width = pct.toFixed(1) + "%";
    $("#xpBar").setAttribute("aria-valuenow", Math.round(pct));
    $("#fRank").textContent = LEVELS[L].r;
    $("#fXP").textContent = state.xp;
    const total = CERTS.length + MISSIONS.length + PROJECTS.length + DEPLOYS.length + TOOL_LIST.length + Object.keys(CHAPTERS).length + ACH.length;
    const got = state.certs.length + state.missions.length + state.projects.length + state.deploys.length + state.tools.length + state.chapters.length + state.ach.length;
    $("#fExp").textContent = Math.round(got / total * 100) + "%";
    $("#soundBtn").setAttribute("aria-pressed", state.sound);
    $("#soundTxt").textContent = state.sound ? "SOM ON" : "SOM OFF";
  }

  /* ---------- Efeitos ---------- */
  let actx = null;
  function blip(f = 660, d = .09, type = "square") {
    if (!state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.6, t + d);
      g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) { }
  }
  function fanfare() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, .12), i * 90)) }
  function boom(x = .5, y = .45, n = 90) {
    if (reduce || typeof window.confetti !== "function") return;
    window.confetti({ particleCount: n, spread: 78, startVelocity: 40, origin: { x, y }, colors: ["#ffc928", "#ef3a2d", "#1fb6e8", "#16121f", "#fffaf0"], zIndex: 200, disableForReducedMotion: true });
  }
  const WORDS = ["POW!", "ZAP!", "BAM!", "KRAK!", "WHAM!", "ZOOM!", "BOOM!", "CLICK!", "SHAZ!"];
  function pop(x, y) {
    if (x == null || reduce) return;
    const s = document.createElement("span"); s.className = "pop"; s.setAttribute("aria-hidden", "true");
    s.textContent = WORDS[Math.random() * WORDS.length | 0];
    s.style.left = Math.min(Math.max(x, 60), innerWidth - 60) + "px"; s.style.top = Math.max(y, 70) + "px";
    s.style.setProperty("--r", (Math.random() * 30 - 15).toFixed(0) + "deg");
    document.body.appendChild(s); setTimeout(() => s.remove(), 950);
  }
  const ptFrom = (e, el) => { if (e && e.clientX) return [e.clientX, e.clientY]; const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2] };
  function toast(title, body, kind = "") {
    const box = $("#toasts"); while (box.children.length > 3) box.firstChild.remove();
    const t = document.createElement("div"); t.className = "toast " + kind;
    t.innerHTML = `<b>${title}</b><span>${body}</span>`; box.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320) }, 2800);
  }
  let luTimer;
  function burst(big, small, ms = 1500) {
    const el = $("#levelup"); $(".lu-1", el).textContent = big; $("#luRank").textContent = small;
    el.hidden = false; el.classList.remove("hide", "show"); void el.offsetWidth; el.classList.add("show");
    boom(.5, .5, 140); fanfare();
    clearTimeout(luTimer);
    luTimer = setTimeout(() => { el.classList.add("hide"); setTimeout(() => { el.hidden = true; el.classList.remove("show", "hide") }, 360) }, ms);
  }
  function levelUp(L) { burst("LEVEL UP!", `NÍVEL ${L + 1} · ${LEVELS[L].r.toUpperCase()}`) }
  function addXP(n, label, x, y) {
    const before = levelOf(state.xp); state.xp += n; save(); renderHUD();
    toast(`+${n} XP`, label); pop(x, y); blip();
    const after = levelOf(state.xp); if (after > before) levelUp(after);
  }
  function unlock(id) {
    if (state.ach.includes(id)) return;
    const a = ACH.find(a => a.id === id); state.ach.push(id); save(); renderAch();
    toast("CONQUISTA DESBLOQUEADA", a.t, "ach"); boom(.85, .85, 70);
    addXP(a.xp, a.t);
    if (state.ach.length === ACH.length && !state.complete) {
      state.complete = true; save();
      setTimeout(() => { burst("EDIÇÃO COMPLETA!", `100% · ${state.xp} XP · ${LEVELS[levelOf(state.xp)].r.toUpperCase()}`); toast("PARABÉNS", "Você concluiu todas as conquistas da edição nº 01.", "ach"); setTimeout(() => boom(.2, .6, 120), 300); setTimeout(() => boom(.8, .6, 120), 600) }, 1900);
    }
  }

  /* ---------- Interações ---------- */
  $("#startBtn").addEventListener("click", e => {
    const [x, y] = ptFrom(e, e.currentTarget); pop(x, y);
    unlock("inicio");
    $("#poderes").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });
  $("#soundBtn").addEventListener("click", () => { state.sound = !state.sound; save(); renderHUD(); blip(880, .12) });
  const drawer = $("#drawer"), tb = $("#trophyBtn");
  const setDrawer = open => { drawer.hidden = !open; tb.setAttribute("aria-expanded", open); if (open) $("#drawerClose").focus() };
  tb.addEventListener("click", () => setDrawer(drawer.hidden));
  $("#drawerClose").addEventListener("click", () => { setDrawer(false); tb.focus() });

  $("#relicGrid").addEventListener("click", e => {
    const b = e.target.closest(".relic"); if (!b) return;
    const id = b.dataset.id, c = CERTS.find(c => c.id === id);
    if (!state.certs.includes(id)) {
      state.certs.push(id); save(); b.classList.add("flipped"); b.setAttribute("aria-pressed", "true");
      $(".tap", b).textContent = "COLETADA · TOQUE PARA VIRAR";
      const [x, y] = ptFrom(e, b); addXP(50, `Relíquia ${c.a} coletada`, x, y); boom(x / innerWidth, y / innerHeight, 60);
      if (CERTS.every(c => state.certs.includes(c.id))) setTimeout(() => unlock("reliquias"), 500);
    } else {
      b.classList.toggle("flipped"); b.setAttribute("aria-pressed", b.classList.contains("flipped")); blip(440, .06);
    }
  });
  $("#missionGrid").addEventListener("click", e => {
    const btn = e.target.closest(".m-btn"); if (!btn || btn.disabled) return;
    const card = btn.closest(".mission"), id = card.dataset.id, m = MISSIONS.find(m => m.id === id);
    if (state.missions.includes(id)) return;
    state.missions.push(id); save();
    card.classList.add("declass"); btn.disabled = true; btn.textContent = "ARQUIVO ACESSADO ✓";
    const [x, y] = ptFrom(e, btn); addXP(60, `Arquivo ${m.org}`, x, y);
    if (MISSIONS.every(m => state.missions.includes(m.id))) setTimeout(() => unlock("arquivos"), 500);
  });
  $("#projGrid").addEventListener("click", e => {
    const a = e.target.closest(".proj-inspect, .proj-link"); if (!a) return;
    const card = a.closest(".proj"), id = card.dataset.id, p = PROJECTS.find(p => p.id === id);
    if (state.projects.includes(id)) return;
    state.projects.push(id); save(); card.classList.add("visited");
    const ib = $(".proj-inspect", card); ib.disabled = true; ib.textContent = "INSPECIONADO ✓";
    const [x, y] = ptFrom(e, a); addXP(30, `Projeto ${p.n}`, x, y);
    if (PROJECTS.every(p => state.projects.includes(p.id))) setTimeout(() => unlock("laboratorio"), 500);
  });
  $("#deployGrid").addEventListener("click", e => {
    const btn = e.target.closest(".deploy-btn"); if (!btn || btn.disabled) return;
    const card = btn.closest(".deploy"), id = card.dataset.id, p = DEPLOYS.find(p => p.id === id);
    if (state.deploys.includes(id)) return;
    state.deploys.push(id); save();
    const [x, y] = ptFrom(e, btn);
    btn.disabled = true; btn.textContent = "IMPLANTANDO…"; $(".status", card).textContent = "DEPLOY EM CURSO";
    card.classList.add("done"); blip(330, .1, "sawtooth");
    const steps = $$(".deploy-log li", card), wait = reduce ? 0 : 450;
    steps.forEach((li, i) => setTimeout(() => { li.classList.add("ok"); blip(500 + i * 120, .06) }, wait * (i + 1)));
    setTimeout(() => {
      btn.textContent = "IMPLANTADO ✓"; $(".status", card).textContent = "EM PRODUÇÃO ✓";
      addXP(50, `${p.v} em produção`, x, y);
      if (DEPLOYS.every(d => state.deploys.includes(d.id))) setTimeout(() => unlock("implantacao"), 500);
    }, wait * (steps.length + 1));
  });
  function connectTool(btn) {
    const t = btn.dataset.t; if (state.tools.includes(t)) return false;
    state.tools.push(t); btn.classList.add("on"); btn.setAttribute("aria-pressed", "true"); $("small", btn).textContent = "ON";
    return true;
  }
  function checkHub() { if (state.tools.length === TOOL_LIST.length) setTimeout(() => unlock("integrador"), 500) }
  $("#hubGrid").addEventListener("click", e => {
    const btn = e.target.closest(".tool"); if (!btn) return;
    if (!connectTool(btn)) return;
    save(); updateHub(); const [x, y] = ptFrom(e, btn); addXP(10, `${btn.dataset.t} conectado`, x, y); checkHub();
  });
  $("#hubAll").addEventListener("click", e => {
    const left = $$("#hubGrid .tool:not(.on)"); if (!left.length) return;
    const [x, y] = ptFrom(e, e.currentTarget), step = reduce ? 0 : 70;
    left.forEach((b, i) => setTimeout(() => { connectTool(b); updateHub(); blip(400 + i * 40, .04) }, step * i));
    setTimeout(() => { save(); updateHub(); addXP(10 * left.length, "Arsenal conectado", x, y); checkHub() }, step * left.length + 50);
  });
  document.addEventListener("click", e => {
    const g = e.target.closest(".ach-go"); if (!g) return;
    setDrawer(false);
    const t = $(g.dataset.go); if (t) t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });
  let emblemHits = 0;
  $("#emblem").addEventListener("click", e => {
    const el = e.currentTarget; el.classList.remove("hit"); void el.offsetWidth; el.classList.add("hit");
    emblemHits++; blip(220 + emblemHits * 70, .08, "triangle");
    if (emblemHits === 3) { const [x, y] = ptFrom(e, el); pop(x, y); unlock("digital"); boom(x / innerWidth, y / innerHeight, 110) }
  });
  function toggleTerminal() {
    const on = document.body.classList.toggle("terminal");
    $("#termBtn").setAttribute("aria-pressed", on);
    $("#termBtn").textContent = on ? "Voltar ao modo HQ" : "Modo terminal";
    toast(on ? "MODO TERMINAL" : "MODO HQ", on ? "Acesso root concedido." : "De volta ao papel-jornal.");
    fanfare(); unlock("konami");
  }
  $("#termBtn").addEventListener("click", toggleTerminal);
  const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let kpos = 0;
  addEventListener("keydown", e => {
    if (e.key === "Escape" && !drawer.hidden) { setDrawer(false); tb.focus(); return }
    const k = (e.key || "").toLowerCase();
    kpos = (k === KONAMI[kpos]) ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) { kpos = 0; toggleTerminal() }
  });
  let armed = false;
  $("#resetBtn").addEventListener("click", e => {
    const b = e.currentTarget;
    if (!armed) { armed = true; b.textContent = "Clique de novo para zerar"; setTimeout(() => { armed = false; b.textContent = "Recomeçar progresso" }, 3500); return }
    armed = false; const snd = state.sound; state = fresh(); state.sound = snd; save();
    renderDeploys(); renderHub(); renderRelics(); renderMissions(); renderProjects(); renderAch(); renderHUD(); observeChapters();
    b.textContent = "Recomeçar progresso"; toast("PROGRESSO ZERADO", "A edição volta para a primeira página.");
    scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- Leitura por capítulo ---------- */
  let chapIO;
  function observeChapters() {
    chapIO && chapIO.disconnect();
    chapIO = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; const id = en.target.id;
      chapIO.unobserve(en.target);
      if (state.chapters.includes(id)) return;
      state.chapters.push(id); addXP(40, `Capítulo: ${CHAPTERS[id]}`);
      if (Object.keys(CHAPTERS).every(k => state.chapters.includes(k))) setTimeout(() => unlock("leitor"), 600);
    }), { rootMargin: "-25% 0px -25% 0px" });
    Object.keys(CHAPTERS).forEach(id => chapIO.observe(document.getElementById(id)));
    const endIO = new IntersectionObserver(es => { if (es[0].isIntersecting) { unlock("fim"); endIO.disconnect() } });
    endIO.observe($("#endSentinel"));
  }

  /* ---------- Integridade ---------- */
  function starClip(points = 14, inner = .7) {
    const p = []; for (let i = 0; i < points * 2; i++) { const r = i % 2 ? inner : 1, a = Math.PI * i / points - Math.PI / 2; p.push(`${(50 + Math.cos(a) * 50 * r).toFixed(1)}% ${(50 + Math.sin(a) * 50 * r).toFixed(1)}%`) }
    return `polygon(${p.join(",")})`;
  }
  function barcode(hex) {
    let x = 0, rects = ""; for (const ch of hex.slice(0, 40)) { const v = parseInt(ch, 16); const w = 1 + (v & 3); rects += `<rect x="${x}" y="0" width="${w}" height="${v > 12 ? 46 : 40}"/>`; x += w + 1 + ((v >> 2) & 1) }
    $("#barcode").innerHTML = `<svg viewBox="0 0 ${x} 46" preserveAspectRatio="none" style="width:${x * 1.4}px">${rects}</svg>`;
  }
  async function integrity() {
    try {
      const buf = new TextEncoder().encode(JSON.stringify({ EDU, CERTS, MISSIONS, PROJECTS, DEPLOYS, TOOLS }));
      const h = await crypto.subtle.digest("SHA-256", buf);
      const hex = [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, "0")).join("");
      $("#hash").textContent = hex; barcode(hex);
    } catch (e) { $("#hashRow").hidden = true }
  }

  /* ---------- Animação ---------- */
  function animate() {
    if (!G || reduce) return;
    if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
    $$(".title .ln").forEach(ln => { ln.innerHTML = [...ln.textContent].map(c => `<span class="ch">${c}</span>`).join("") });
    const tl = G.timeline({ defaults: { ease: "back.out(2.2)" } });
    tl.from(".issue", { y: -30, rotation: -6, duration: .45 })
      .from(".title .ch", { scale: 0, rotation: () => G.utils.random(-25, 25), stagger: .045, duration: .5 }, "-=.15")
      .from(".codename, .cover .caption", { x: -40, rotation: -3, stagger: .1, duration: .45 }, "-=.25")
      .from(".char-card", { x: 90, rotation: 10, duration: .6 }, "-=.55")
      .from(".cover .burst", { scale: 0, rotation: -120, duration: .55 }, "-=.3")
      .from("#radarPoly", { scale: 0, transformOrigin: "50% 50%", duration: .8, ease: "elastic.out(1,.5)" }, "-=.35")
      .from(".st-bar i.on", { scaleY: 0, transformOrigin: "50% 100%", stagger: .012, duration: .3, ease: "back.out(3)" }, "-=.7")
      .from(".tally div", { y: 30, stagger: .05, duration: .4 }, "-=.4");
    if (window.ScrollTrigger) {
      ScrollTrigger.batch(".reveal", { start: "top 90%", once: true, onEnter: b => G.from(b, { y: 46, scale: .94, rotation: () => G.utils.random(-3, 3), stagger: .07, duration: .55, ease: "back.out(1.7)", clearProps: "transform" }) });
      $$(".chap-title, .fin-title").forEach(t => G.from(t, { scale: 1.35, rotation: -4, duration: .5, ease: "back.out(2)", scrollTrigger: { trigger: t, start: "top 88%", once: true } }));
    }
  }

  /* ---------- Boot ---------- */
  $$(".star").forEach(el => el.style.clipPath = starClip(el.classList.contains("burst-in") ? 14 : 14, .7));
  renderCover(); renderPowers(); renderDeploys(); renderHub(); renderEdu(); renderRelics(); renderMissions(); renderProjects(); renderAch(); renderHUD();
  observeChapters(); integrity(); animate();
})();
