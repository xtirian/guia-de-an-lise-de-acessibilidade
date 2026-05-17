/**
 * data.js — Critérios de acessibilidade
 * GPNT1 · Desafio DESIN 01/2025
 *
 * Estrutura de cada critério:
 *   cat      : categoria (cor | leitor | teclado | formulario | navegacao | imagens | zoom | links)
 *   title    : nome do critério
 *   sev      : severidade (alta | media | baixa)
 *   wcag     : array de códigos WCAG 2.1
 *   emag     : array de códigos eMAG 3.1
 *   keywords : palavras-chave para busca (sintomas, termos técnicos)
 *   desc     : descrição técnica do critério
 *   checks   : itens do checklist de verificação
 *   tools    : ferramentas recomendadas
 *   doc      : estrutura de documentação da barreira
 *     criterio : referência normativa
 *     onde     : onde e como localizar o problema
 *     impacto  : impacto para o usuário
 *     sugestao : orientação de correção
 */

const criteria = [

  // ── COR E CONTRASTE ───────────────────────────────────────────────────────

  {
    cat: 'cor',
    title: 'Contraste insuficiente de texto',
    sev: 'alta',
    wcag: ['1.4.3'],
    emag: ['4.1'],
    keywords: ['contraste', 'texto', 'cor', 'ilegível', 'difícil ler', 'cinza', 'claro',
               'fundo', 'luminosidade', 'baixo contraste', 'visão', 'daltonismo'],
    desc: 'Textos precisam ter contraste mínimo de 4,5:1 com o fundo. Textos grandes (18pt+ ou 14pt negrito) aceitam 3:1. Pessoas com baixa visão dependem disso.',
    checks: [
      'Verificar labels e textos de botões',
      'Verificar mensagens de erro e alerta',
      'Verificar links dentro de parágrafos',
      'Verificar textos sobre imagens ou gradientes',
    ],
    tools: ['WAVE', 'Colour Contrast Analyser'],
    doc: {
      criterio: 'WCAG 1.4.3 / eMAG 4.1',
      onde: 'Identificar a tela e o elemento específico (ex: botão "Salvar" na tela de Férias)',
      impacto: 'Usuário com baixa visão não consegue ler o conteúdo',
      sugestao: 'Aumentar contraste para no mínimo 4,5:1 ajustando a cor do texto ou do fundo',
    },
  },

  {
    cat: 'cor',
    title: 'Contraste insuficiente de componentes de interface',
    sev: 'media',
    wcag: ['1.4.11'],
    emag: [],
    keywords: ['borda', 'campo', 'ícone', 'botão', 'foco', 'contraste', 'componente',
               'input', 'seleção', 'estado', 'interface'],
    desc: 'Bordas de campos, ícones informativos e indicadores de foco devem ter contraste mínimo de 3:1 contra o fundo. Critério novo no WCAG 2.1.',
    checks: [
      'Bordas dos campos de data e seleção de férias',
      'Ícones sem texto (ex: calendário, editar)',
      'Indicador visual de foco ao navegar por teclado',
      'Estados de checkbox e radio button',
    ],
    tools: ['Axe DevTools', 'WAVE'],
    doc: {
      criterio: 'WCAG 1.4.11',
      onde: 'Identificar o componente e a tela (ex: borda do campo "Data de início" na tela de Férias)',
      impacto: 'Usuário com baixa visão não identifica visualmente o elemento interativo',
      sugestao: 'Ajustar cor da borda para atingir contraste 3:1 contra o fundo da página',
    },
  },

  {
    cat: 'cor',
    title: 'Cor como única forma de informação',
    sev: 'media',
    wcag: ['1.4.1'],
    emag: ['4.2'],
    keywords: ['cor', 'vermelho', 'verde', 'erro', 'obrigatório', 'status', 'alerta',
               'único', 'daltonismo', 'indicador', 'campo obrigatório', 'asterisco'],
    desc: 'Erros, alertas, campos obrigatórios e status não podem ser indicados apenas por cor. Sempre deve haver texto, ícone ou padrão complementar.',
    checks: [
      'Campos obrigatórios indicados só pelo asterisco vermelho',
      'Status de aprovação/reprovação indicado só por cor',
      'Mensagens de erro têm texto além da cor vermelha',
    ],
    tools: ['Visualizar em escala de cinza (extensão NoCoffee)'],
    doc: {
      criterio: 'WCAG 1.4.1 / eMAG 4.2',
      onde: 'Indicar o elemento e a informação que depende só de cor',
      impacto: 'Usuário com daltonismo ou cegueira para cores não percebe a informação',
      sugestao: 'Acrescentar texto explicativo ou ícone além da variação de cor',
    },
  },

  // ── LEITOR DE TELA ────────────────────────────────────────────────────────

  {
    cat: 'leitor',
    title: 'Ordem de leitura incorreta ou não lógica',
    sev: 'alta',
    wcag: ['1.3.2'],
    emag: ['1.4'],
    keywords: ['ordem', 'leitura', 'leitor de tela', 'nvda', 'voiceover', 'sequência',
               'foco', 'confuso', 'pula', 'estrutura', 'tabulação'],
    desc: 'O leitor de tela deve navegar o conteúdo na ordem que faça sentido visual e semântico. A ordem no código HTML determina a ordem de leitura.',
    checks: [
      'Navegar com NVDA/VoiceOver e acompanhar a sequência lida',
      'Verificar se o leitor lê primeiro o menu ou o conteúdo principal',
      'Verificar se modais são lidos na ordem correta quando abrem',
    ],
    tools: ['NVDA (Windows)', 'VoiceOver (Mac/iOS)'],
    doc: {
      criterio: 'WCAG 1.3.2 / eMAG 1.4',
      onde: 'Descrever a sequência incorreta encontrada durante o teste com leitor de tela',
      impacto: 'Usuário cego não consegue entender o fluxo da tela',
      sugestao: 'Reorganizar a ordem dos elementos no HTML para refletir a ordem visual lógica',
    },
  },

  {
    cat: 'leitor',
    title: 'Elemento interativo sem nome acessível',
    sev: 'alta',
    wcag: ['4.1.2', '2.5.3'],
    emag: ['6.5'],
    keywords: ['nome', 'botão', 'link', 'aria-label', 'sem texto', 'ícone', 'silencioso',
               'não lê', 'vazio', 'acessível', 'nvda', 'voiceover', 'label'],
    desc: 'Todo botão, link e campo deve ter um nome descritivo anunciado pelo leitor de tela. Botões com ícone precisam de aria-label. O nome visível deve estar contido no nome acessível (WCAG 2.5.3).',
    checks: [
      'Botão de ação principal lido com nome claro',
      'Ícones de editar, excluir, visualizar têm aria-label',
      'Links descritos pelo destino, não por "clique aqui"',
      'Nome acessível contém o texto visível do elemento',
    ],
    tools: ['Axe DevTools', 'NVDA', 'Inspeção de aria-label no DevTools'],
    doc: {
      criterio: 'WCAG 4.1.2 / WCAG 2.5.3 / eMAG 6.5',
      onde: 'Indicar o elemento e o que o leitor de tela anuncia (ou não anuncia)',
      impacto: 'Usuário cego não sabe para que serve o controle',
      sugestao: 'Adicionar aria-label descritivo ou texto visível ao elemento',
    },
  },

  {
    cat: 'leitor',
    title: 'Mensagem dinâmica não anunciada pelo leitor de tela',
    sev: 'alta',
    wcag: ['4.1.3'],
    emag: [],
    keywords: ['mensagem', 'dinâmica', 'aria-live', 'sucesso', 'erro', 'confirmação',
               'notificação', 'toast', 'alerta', 'não anunciado', 'status', 'resultado'],
    desc: 'Mensagens que aparecem após uma ação (confirmação de férias, erro de validação) devem ser anunciadas automaticamente pelo leitor de tela via aria-live. Critério novo no WCAG 2.1.',
    checks: [
      'Confirmar solicitação de férias: mensagem anunciada?',
      'Enviar formulário com erro: erro anunciado pelo leitor?',
      'Mensagens de sucesso/falha na Validação Cadastral',
    ],
    tools: ['NVDA', 'Inspeção de aria-live no DevTools'],
    doc: {
      criterio: 'WCAG 4.1.3',
      onde: 'Descrever a ação realizada e o que o leitor de tela anunciou (ou não)',
      impacto: 'Usuário cego realiza uma ação e não sabe se ela foi concluída com sucesso',
      sugestao: 'Implementar aria-live="polite" ou role="alert" na região de mensagens',
    },
  },

  {
    cat: 'leitor',
    title: 'Hierarquia de cabeçalhos incorreta ou ausente',
    sev: 'alta',
    wcag: ['1.3.1'],
    emag: ['1.3'],
    keywords: ['cabeçalho', 'heading', 'h1', 'h2', 'h3', 'hierarquia', 'título',
               'estrutura', 'pula nível', 'navegação', 'leitor de tela', 'seção'],
    desc: 'A página deve usar h1–h6 em hierarquia correta. Usuários de leitor de tela navegam entre seções pelos cabeçalhos. Pular níveis (h1 → h3) é um erro grave.',
    checks: [
      'Existe exatamente um H1 por tela',
      'Hierarquia não pula níveis (ex: H1 vai direto para H3)',
      'Seções principais têm cabeçalho semântico',
      'Negrito não substitui heading nas seções',
    ],
    tools: ['WAVE (aba Structure)', 'HeadingsMap (extensão Chrome)'],
    doc: {
      criterio: 'WCAG 1.3.1 / eMAG 1.3',
      onde: 'Descrever a estrutura de cabeçalhos encontrada na tela',
      impacto: 'Usuário cego não consegue navegar rapidamente entre seções da página',
      sugestao: 'Revisar e corrigir a hierarquia HTML de cabeçalhos H1–H6',
    },
  },

  // ── TECLADO ───────────────────────────────────────────────────────────────

  {
    cat: 'teclado',
    title: 'Funcionalidade inacessível por teclado',
    sev: 'alta',
    wcag: ['2.1.1'],
    emag: ['2.1'],
    keywords: ['teclado', 'tab', 'mouse', 'sem mouse', 'inacessível', 'não funciona',
               'tecla', 'navegação', 'sequência', 'atalho', 'enter'],
    desc: 'Qualquer ação possível com mouse deve ser realizável com teclado. Nenhuma funcionalidade pode depender exclusivamente de gesto, hover ou clique.',
    checks: [
      'Navegar todo o fluxo de Férias só com Tab e Enter',
      'Navegar todo o fluxo de Validação Cadastral só com teclado',
      'Menus dropdown respondem às setas do teclado',
      'Calendários de data são operáveis por teclado',
    ],
    tools: ['Desconectar o mouse e testar manualmente'],
    doc: {
      criterio: 'WCAG 2.1.1 / eMAG 2.1',
      onde: 'Descrever a função específica que não funciona por teclado',
      impacto: 'Usuário com deficiência motora ou visual não consegue completar a tarefa',
      sugestao: 'Implementar eventos de teclado equivalentes às ações de mouse',
    },
  },

  {
    cat: 'teclado',
    title: 'Foco não visível ou suprimido',
    sev: 'alta',
    wcag: ['2.4.7'],
    emag: ['4.4'],
    keywords: ['foco', 'invisível', 'outline', 'contorno', 'tab', 'não vejo', 'sumiu',
               'css', 'focus', 'destaque', 'teclado'],
    desc: 'O elemento com foco deve ter indicador visual claro (borda, contorno). Remover o outline com CSS é um erro grave — impede qualquer usuário de teclado de saber onde está.',
    checks: [
      'Foco visível em botões ao navegar com Tab',
      'Foco visível em campos de formulário',
      'Foco visível em links de navegação',
      'Indicador de foco tem contraste suficiente',
    ],
    tools: ['Navegar com Tab e observar visualmente'],
    doc: {
      criterio: 'WCAG 2.4.7 / eMAG 4.4',
      onde: 'Indicar o elemento onde o foco desaparece ou é invisível',
      impacto: 'Usuário que navega por teclado não sabe onde está na página',
      sugestao: 'Remover outline:none do CSS e implementar indicador de foco visível',
    },
  },

  {
    cat: 'teclado',
    title: 'Armadilha de foco (focus trap)',
    sev: 'alta',
    wcag: ['2.1.2'],
    emag: [],
    keywords: ['preso', 'armadilha', 'foco', 'modal', 'popup', 'não sai', 'bloqueado',
               'tab', 'escape', 'calendário', 'dropdown'],
    desc: 'O usuário não pode ficar preso em um elemento sem conseguir sair usando apenas o teclado. Modais devem fechar com Esc e devolver o foco ao elemento de origem.',
    checks: [
      'Consegue sair de campos de data e calendários com Tab',
      'Modais fecham com Esc e devolvem o foco',
      'Dropdowns de seleção não prendem o foco',
    ],
    tools: ['Tab + Shift+Tab em todos os componentes interativos'],
    doc: {
      criterio: 'WCAG 2.1.2',
      onde: 'Descrever em qual componente o foco ficou preso',
      impacto: 'Usuário de teclado fica incapaz de continuar usando a página',
      sugestao: 'Implementar gerenciamento de foco correto em modais e componentes complexos',
    },
  },

  // ── FORMULÁRIOS ───────────────────────────────────────────────────────────

  {
    cat: 'formulario',
    title: 'Campo de formulário sem label associado',
    sev: 'alta',
    wcag: ['1.3.1'],
    emag: ['6.2'],
    keywords: ['label', 'campo', 'formulário', 'sem rótulo', 'placeholder', 'não lê',
               'input', 'associado', 'for', 'id', 'nome do campo'],
    desc: 'Todo campo de formulário deve ter um label HTML associado via for/id. Placeholder não substitui label — desaparece ao digitar e não é bem suportado por todos os leitores de tela.',
    checks: [
      'Campos de data de início e fim de férias têm label',
      'Campos de dados pessoais têm label visível',
      'Label não desaparece ao focar o campo',
      'Label está associado ao campo via for/id no código',
    ],
    tools: ['Axe DevTools', 'Inspeção do atributo for/id no DevTools'],
    doc: {
      criterio: 'WCAG 1.3.1 / eMAG 6.2',
      onde: 'Identificar o campo sem label (tela e nome do campo)',
      impacto: 'Usuário cego não sabe o que deve preencher no campo',
      sugestao: 'Adicionar <label> com atributo for correspondente ao id do campo',
    },
  },

  {
    cat: 'formulario',
    title: 'Mensagem de erro sem identificação do campo',
    sev: 'alta',
    wcag: ['3.3.1'],
    emag: ['6.6'],
    keywords: ['erro', 'mensagem', 'campo inválido', 'validação', 'formulário',
               'preenchimento', 'obrigatório', 'não identifica', 'genérico', 'submit'],
    desc: 'Quando há erro, a mensagem deve identificar qual campo tem problema e orientar como corrigir. "Campo inválido" não é suficiente.',
    checks: [
      'Enviar formulário vazio e verificar as mensagens exibidas',
      'Erro identifica o campo com problema pelo nome',
      'Erro explica o formato correto esperado',
      'Mensagem de erro é lida pelo leitor de tela',
    ],
    tools: ['Teste manual', 'NVDA para verificar leitura do erro'],
    doc: {
      criterio: 'WCAG 3.3.1 / eMAG 6.6',
      onde: 'Indicar o formulário, o campo e a mensagem de erro exibida',
      impacto: 'Usuário não consegue corrigir o erro pois não sabe o que está errado',
      sugestao: 'Mensagem de erro deve nomear o campo e descrever o formato correto',
    },
  },

  {
    cat: 'formulario',
    title: 'Campos obrigatórios não identificados adequadamente',
    sev: 'media',
    wcag: ['3.3.2'],
    emag: ['6.5'],
    keywords: ['obrigatório', 'asterisco', 'required', 'campo', 'formulário',
               'legenda', 'marcação', 'não identifica'],
    desc: 'Campos obrigatórios devem ser identificados de forma que o leitor de tela entenda. Não apenas visualmente com asterisco. O atributo required ou aria-required são necessários.',
    checks: [
      'Legenda do asterisco (*) está explicada na página',
      'Campo obrigatório tem atributo required no HTML',
      'Leitor de tela anuncia o campo como obrigatório',
    ],
    tools: ['WAVE', 'Inspeção de aria-required no DevTools'],
    doc: {
      criterio: 'WCAG 3.3.2 / eMAG 6.5',
      onde: 'Identificar o formulário e os campos obrigatórios sem marcação adequada',
      impacto: 'Usuário cego não sabe quais campos precisa preencher antes de enviar',
      sugestao: 'Adicionar atributo required e garantir que o label inclua indicação de obrigatoriedade',
    },
  },

  {
    cat: 'formulario',
    title: 'Campos sem agrupamento lógico em formulários longos',
    sev: 'baixa',
    wcag: ['1.3.1'],
    emag: ['6.7'],
    keywords: ['fieldset', 'legend', 'agrupamento', 'grupo', 'formulário', 'longo',
               'seção', 'organização', 'dados pessoais'],
    desc: 'Em formulários com muitas seções, campos relacionados devem ser agrupados com fieldset e legend para que o leitor de tela indique a qual grupo cada campo pertence.',
    checks: [
      'Dados pessoais agrupados separadamente dos dados de contato',
      'Grupos de radio button dentro de fieldset',
      'Legend descreve claramente o grupo',
    ],
    tools: ['Inspeção do HTML', 'NVDA'],
    doc: {
      criterio: 'WCAG 1.3.1 / eMAG 6.7',
      onde: 'Indicar o formulário e as seções sem agrupamento',
      impacto: 'Usuário cego perde o contexto de qual seção está preenchendo',
      sugestao: 'Usar <fieldset> e <legend> para agrupar campos relacionados',
    },
  },

  // ── NAVEGAÇÃO ─────────────────────────────────────────────────────────────

  {
    cat: 'navegacao',
    title: 'Ausência de link para pular a navegação',
    sev: 'media',
    wcag: ['2.4.1'],
    emag: ['1.5'],
    keywords: ['pular', 'skip', 'menu', 'conteúdo', 'âncora', 'navegação',
               'repetitivo', 'barra', 'atalho', 'primeiro tab'],
    desc: 'O primeiro item ao pressionar Tab deve ser um link "Ir para o conteúdo principal", para que usuários de teclado não percorram o menu repetidamente a cada página.',
    checks: [
      'Primeiro Tab na página revela link de pular navegação',
      'Link de pular funciona ao pressionar Enter',
      'Foco vai corretamente ao início do conteúdo',
    ],
    tools: ['Pressionar Tab ao abrir cada tela'],
    doc: {
      criterio: 'WCAG 2.4.1 / eMAG 1.5',
      onde: 'Indicar que o link de pular navegação está ausente ou não funciona',
      impacto: 'Usuário de teclado precisa percorrer todo o menu em cada página',
      sugestao: 'Adicionar link oculto visível ao foco no início do HTML apontando para o conteúdo principal',
    },
  },

  {
    cat: 'navegacao',
    title: 'Título da página não descritivo ou ausente',
    sev: 'media',
    wcag: ['2.4.2'],
    emag: ['3.3'],
    keywords: ['title', 'título', 'aba', 'página', 'descrição', 'não muda',
               'genérico', 'navegador', 'tela'],
    desc: 'Cada tela deve ter um título único e descritivo na tag <title>. O leitor de tela anuncia o título ao carregar a página, orientando o usuário sobre onde está.',
    checks: [
      'Título da aba do navegador muda em cada tela',
      'Título descreve a tela atual (ex: "Solicitar Férias – SOUGOV")',
      'Título não é genérico como apenas "SOUGOV" em todas as telas',
    ],
    tools: ['Verificar o título na aba do navegador a cada passo do fluxo'],
    doc: {
      criterio: 'WCAG 2.4.2 / eMAG 3.3',
      onde: 'Indicar a tela e o título atual exibido',
      impacto: 'Usuário cego não sabe em qual tela do fluxo está',
      sugestao: 'Definir <title> único por tela no padrão: [Nome da tela] – SOUGOV',
    },
  },

  {
    cat: 'navegacao',
    title: 'Idioma da página não declarado',
    sev: 'baixa',
    wcag: ['3.1.1'],
    emag: ['3.1'],
    keywords: ['idioma', 'lang', 'português', 'html', 'leitor de tela',
               'pronúncia', 'linguagem', 'atributo'],
    desc: 'O atributo lang="pt-BR" deve estar na tag <html> para que o leitor de tela use a pronúncia e entonação corretas em português.',
    checks: [
      'Tag <html> tem atributo lang="pt-BR"',
      'Termos em outro idioma têm lang declarado no elemento',
    ],
    tools: ['Inspecionar código-fonte da página (Ctrl+U)'],
    doc: {
      criterio: 'WCAG 3.1.1 / eMAG 3.1',
      onde: 'Indicar que o atributo lang está ausente ou incorreto',
      impacto: 'Leitor de tela usa pronúncia incorreta, tornando o conteúdo incompreensível',
      sugestao: 'Adicionar lang="pt-BR" ao elemento <html>',
    },
  },

  {
    cat: 'navegacao',
    title: 'Abertura de nova janela sem aviso ao usuário',
    sev: 'media',
    wcag: ['3.2.5'],
    emag: ['1.9'],
    keywords: ['nova janela', 'nova aba', 'target blank', 'popup', 'abre',
               'sem aviso', 'inesperado', 'leitor de tela', 'voltar'],
    desc: 'Links que abrem nova aba devem avisar o usuário no próprio texto do link. Usuários de leitor de tela perdem a referência quando uma nova janela abre sem aviso.',
    checks: [
      'Links externos avisam que abrem em nova aba',
      'Popups e modais não abrem sem ação do usuário',
      'Há forma de retornar sem usar o botão Voltar do navegador',
    ],
    tools: ['Teste manual com NVDA'],
    doc: {
      criterio: 'WCAG 3.2.5 / eMAG 1.9',
      onde: 'Identificar o link ou ação que abre nova janela sem aviso',
      impacto: 'Usuário cego fica desorientado sem perceber que uma nova janela foi aberta',
      sugestao: 'Adicionar "(abre em nova aba)" ao texto do link ou usar aria-label descritivo',
    },
  },

  // ── IMAGENS ───────────────────────────────────────────────────────────────

  {
    cat: 'imagens',
    title: 'Imagem informativa sem texto alternativo',
    sev: 'alta',
    wcag: ['1.1.1'],
    emag: ['3.6'],
    keywords: ['alt', 'texto alternativo', 'imagem', 'ícone', 'foto', 'sem descrição',
               'não lê', 'vazio', 'decorativa', 'infográfico', 'banner'],
    desc: 'Toda imagem que transmite informação deve ter atributo alt descritivo. Imagens decorativas devem ter alt="" para serem ignoradas pelo leitor de tela.',
    checks: [
      'Imagens informativas têm alt com descrição adequada',
      'Imagens decorativas têm alt vazio (alt="")',
      'Ícones de ação têm aria-label descritivo',
      'Banners com texto têm o texto reproduzido no atributo alt',
    ],
    tools: ['WAVE (aba Images)', 'Axe DevTools'],
    doc: {
      criterio: 'WCAG 1.1.1 / eMAG 3.6',
      onde: 'Identificar a imagem, sua localização na tela e o alt atual',
      impacto: 'Usuário cego não recebe a informação transmitida pela imagem',
      sugestao: 'Adicionar alt descritivo para imagens informativas; alt="" para decorativas',
    },
  },

  {
    cat: 'imagens',
    title: 'Imagem de texto no lugar de texto HTML real',
    sev: 'media',
    wcag: ['1.4.5'],
    emag: [],
    keywords: ['imagem de texto', 'texto como imagem', 'banner', 'zoom', 'pixelado',
               'não seleciona', 'não copia', 'renderizado'],
    desc: 'Texto não deve ser apresentado como imagem — não pode ser ampliado sem perder qualidade, selecionado ou lido pelo leitor de tela sem alt. Use HTML real sempre que possível.',
    checks: [
      'Banners e informativos usam texto HTML, não imagem',
      'Ao ampliar 200%, textos permanecem nítidos',
      'É possível selecionar os textos com o cursor',
    ],
    tools: ['Verificar se o texto é selecionável', 'Zoom 200% no navegador'],
    doc: {
      criterio: 'WCAG 1.4.5',
      onde: 'Identificar o elemento com texto como imagem',
      impacto: 'Usuário com baixa visão não consegue ampliar o texto sem perder qualidade',
      sugestao: 'Substituir imagem de texto por texto HTML real com CSS para estilização',
    },
  },

  // ── ZOOM E LAYOUT ─────────────────────────────────────────────────────────

  {
    cat: 'zoom',
    title: 'Layout quebra ou perde funcionalidade com zoom',
    sev: 'alta',
    wcag: ['1.4.4'],
    emag: ['4.3'],
    keywords: ['zoom', '200%', 'redimensionar', 'fonte', 'layout', 'quebra',
               'barra horizontal', 'sobreposição', 'texto cortado', 'responsivo', 'ampliar'],
    desc: 'A página deve funcionar corretamente com zoom de até 200% sem barra de rolagem horizontal ou sobreposição de conteúdo. Essencial para usuários com baixa visão.',
    checks: [
      'Aplicar zoom de 200% no navegador (Ctrl + roda do mouse)',
      'Verificar se surgiu barra de rolagem horizontal',
      'Verificar se textos não foram cortados ou sobrepostos',
      'Verificar se todos os botões e campos ainda estão acessíveis',
    ],
    tools: ['Zoom nativo do navegador (200%)', 'DevTools: Ctrl+Shift+M'],
    doc: {
      criterio: 'WCAG 1.4.4 / eMAG 4.3',
      onde: 'Descrever o que quebra e em qual porcentagem de zoom',
      impacto: 'Usuário com baixa visão que usa zoom perde acesso a funcionalidades',
      sugestao: 'Revisar o layout com unidades relativas (rem, %) e media queries',
    },
  },

  {
    cat: 'zoom',
    title: 'Conteúdo requer rolagem horizontal em zoom alto',
    sev: 'media',
    wcag: ['1.4.10'],
    emag: [],
    keywords: ['reflow', 'rolagem horizontal', 'zoom', '400%', 'coluna única',
               'mobile', 'responsivo', 'scroll', 'horizontal', '320px'],
    desc: 'Com zoom de 400% (equivalente a 320px de largura), o conteúdo deve reorganizar para uma coluna sem necessidade de rolar horizontalmente. Critério novo no WCAG 2.1.',
    checks: [
      'Aplicar zoom de 400% e verificar se há rolagem horizontal',
      'Conteúdo de texto reorganiza para coluna única',
      'Funcionalidades permanecem acessíveis sem scroll horizontal',
    ],
    tools: ['Zoom 400% no navegador', 'DevTools: viewport 320px de largura'],
    doc: {
      criterio: 'WCAG 1.4.10',
      onde: 'Descrever qual conteúdo exige rolagem horizontal',
      impacto: 'Usuário com baixa visão que usa zoom alto não consegue ler sem rolar',
      sugestao: 'Implementar design responsivo que reorganize para coluna única em telas estreitas',
    },
  },

  {
    cat: 'zoom',
    title: 'Layout quebra ao aumentar espaçamento de texto',
    sev: 'media',
    wcag: ['1.4.12'],
    emag: [],
    keywords: ['espaçamento', 'texto', 'linha', 'letra', 'word spacing', 'line height',
               'truncado', 'cortado', 'sobreposto', 'layout'],
    desc: 'Ao aumentar espaçamento entre linhas (1,5x), letras (0,12em) e palavras (0,16em), o layout não pode quebrar nem cortar o conteúdo. Critério novo no WCAG 2.1.',
    checks: [
      'Instalar extensão Text Spacing Editor e aplicar os valores',
      'Verificar se textos ficam sobrepostos ou cortados',
      'Verificar se botões ainda exibem seu texto completo',
    ],
    tools: ['Extensão Text Spacing (Chrome)', 'Bookmarklet do WCAG 1.4.12'],
    doc: {
      criterio: 'WCAG 1.4.12',
      onde: 'Indicar quais elementos apresentam problema com espaçamento aumentado',
      impacto: 'Usuário com dislexia que customiza espaçamento perde acesso ao conteúdo',
      sugestao: 'Evitar alturas fixas em elementos de texto; usar overflow visible ou auto',
    },
  },

  // ── LINKS E NOMES ─────────────────────────────────────────────────────────

  {
    cat: 'links',
    title: 'Texto de link genérico sem contexto',
    sev: 'media',
    wcag: ['2.4.4'],
    emag: ['3.5'],
    keywords: ['clique aqui', 'leia mais', 'saiba mais', 'acesse', 'link', 'texto',
               'contexto', 'genérico', 'leitor de tela', 'lista de links'],
    desc: 'O texto de um link deve fazer sentido quando lido fora do contexto. Leitores de tela permitem navegar por lista de links — "clique aqui" repetido é inútil.',
    checks: [
      'Há links com texto "clique aqui", "leia mais" ou "saiba mais"',
      'Cada link descreve seu destino pelo próprio texto',
      'Links para o mesmo destino têm o mesmo texto',
    ],
    tools: ['NVDA: listar links com Insert+F7', 'WAVE'],
    doc: {
      criterio: 'WCAG 2.4.4 / eMAG 3.5',
      onde: 'Copiar o texto do link problemático e indicar onde está na tela',
      impacto: 'Usuário cego que navega por lista de links não sabe o destino',
      sugestao: 'Substituir por texto descritivo do destino ou ação (ex: "Ver detalhes das Férias")',
    },
  },

  {
    cat: 'links',
    title: 'Nome acessível não contém o texto visível',
    sev: 'media',
    wcag: ['2.5.3'],
    emag: [],
    keywords: ['aria-label', 'nome acessível', 'texto visível', 'label in name',
               'botão', 'link', 'diverge', 'diferente', 'voz', 'controle por voz'],
    desc: 'O nome acessível deve conter o texto visível do elemento. Aria-label que substitui completamente o texto visível impede o uso por controle de voz. Critério novo no WCAG 2.1.',
    checks: [
      'Botões com texto visível têm aria-label que inclui esse texto',
      'Controle por voz consegue acionar o botão falando o texto visível',
      'Nenhum aria-label sobrescreve completamente o texto visível',
    ],
    tools: ['Axe DevTools', 'Inspeção de aria-label no DevTools'],
    doc: {
      criterio: 'WCAG 2.5.3',
      onde: 'Indicar o elemento, seu texto visível e o aria-label divergente',
      impacto: 'Usuário que usa controle por voz não consegue acionar o elemento pelo nome visível',
      sugestao: 'Garantir que o aria-label comece com ou inclua o texto visível do elemento',
    },
  },

];