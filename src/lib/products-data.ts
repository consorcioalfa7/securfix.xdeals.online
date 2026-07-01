/**
 * Securfix — Catálogo de produtos enriquecido (84 referências).
 *
 * Fontes dos dados:
 *  - Preços, IDs, nomes e categorias: src/components/ProductCatalog.tsx (preservados).
 *  - Descrições, dimensões e especificações: dados extraídos de securfix.pt
 *    (download/securfix-pt/products-extracted.json e detailed-products.json).
 *  - Produtos sem correspondência direta no scrape foram preenchidos com
 *    conhecimento de domínio sobre vedações metálicas (em pt-PT).
 *
 * Task ID: ENRICH-1
 */

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type CategoryKey =
  | 'hercules'
  | 'malha-solta'
  | 'eletrossoldada'
  | 'grades'
  | 'arames'
  | 'postes'
  | 'corta-fogo'
  | 'seguranca'
  | 'portoes-rede'
  | 'multiuso'
  | 'correr'
  | 'tramex'
  | 'acessorios';

export interface EnrichedProduct {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  category: CategoryKey;
  /** Resumo curto (1–2 frases) em português europeu. */
  description: string;
  /** Descrição alargada e limpa (pt-PT). */
  longDescription?: string;
  /** Dimensões principais extraídas (ex.: "2,50 x 2,03 m"). */
  dimensions?: string;
  /** Especificações técnicas (chave → valor). */
  specs: Record<string, string>;
  /** 3–5 pontos de destaque em português. */
  highlights: string[];
  /** Caso de utilização: Residencial, Industrial, Agrícola, etc. */
  application?: string;
}

export interface CategoryTab {
  key: CategoryKey | 'todos';
  label: string;
}

// ─── Separadores de categorias (mesmo formato do ProductCatalog) ─────────────

export const CATEGORY_TABS: CategoryTab[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'hercules', label: 'Painel Hercules' },
  { key: 'malha-solta', label: 'Rede Malha Solta' },
  { key: 'eletrossoldada', label: 'Rede Eletrossoldada' },
  { key: 'grades', label: 'Grades' },
  { key: 'arames', label: 'Arames' },
  { key: 'postes', label: 'Postes' },
  { key: 'corta-fogo', label: 'Portas Corta-Fogo' },
  { key: 'seguranca', label: 'Portas de Segurança' },
  { key: 'portoes-rede', label: 'Portões de Rede' },
  { key: 'multiuso', label: 'Portas Multiuso' },
  { key: 'correr', label: 'Portas de Correr' },
  { key: 'tramex', label: 'Tramex' },
  { key: 'acessorios', label: 'Acessórios' },
];

// ─── Catálogo completo (84 produtos) ─────────────────────────────────────────

export const ALL_PRODUCTS: EnrichedProduct[] = [
  // ── Painel Hercules (1–7) ────────────────────────────────────────────────
  {
    id: 1,
    name: 'Painel Malla Hercules Verde',
    originalPrice: 26.0,
    salePrice: 15.45,
    category: 'hercules',
    description:
      'Painel de malha rígida tipo Hercules em arame galvanizado revestido a PVC verde, ideal para vedações residenciais, comerciais e industriais.',
    longDescription:
      'Painel de malha tipo Hercules plastificado em PVC verde sobre arame galvanizado. Pedido mínimo: 5 unidades. Disponível em painéis de 2,50 x 2,03 m e 2,50 x 1,73 m. A vedação Hercules verde é uma das opções preferidas pela adaptação a todos os tipos de terreno e pela excelente relação qualidade/preço. Constituída por arame duro galvanizado por imersão a quente (zinco Sendzimir), com plastificação de poliéster microcristalino de no mínimo 100 mícrons. As quatro dobras em V agregam resistência extra e garantem a firmeza necessária em todos os tipos de vedações. Vida útil de pelo menos 10 anos.',
    dimensions: '2,50 x 2,03 m',
    specs: {
      Material: 'Aço galvanizado Sendzimir',
      Cor: 'Verde RAL 6005',
      Acabamento: 'PVC plastificado (100 µm)',
      'Espessura do arame': '5 mm',
      'Âmbito de aplicação': 'Exterior',
      Garantia: '10 anos',
    },
    highlights: [
      'Galvanizado a quente + PVC verde',
      'Quatro dobras em V para reforço',
      'Resistente à corrosão e às intempéries',
      'Fácil instalação sem ferramentas especiais',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },
  {
    id: 2,
    name: 'Painel Malla Hercules Branca',
    originalPrice: 23.5,
    salePrice: 14.05,
    category: 'hercules',
    description:
      'Painel de malha Hercules em arame galvanizado revestido a PVC branco, com quatro dobras em V que conferem rigidez e elegância.',
    longDescription:
      'Painel de malha Hercules branco, plastificado em PVC sobre arame galvanizado. Pedido mínimo: 5 unidades. Disponível em painéis de 2,50 x 2,03 m e 2,50 x 1,73 m. Projetado para cercas que requerem grande resistência e estética cuidado. A montagem é simples, podendo ser realizada por pessoal não especializado. Solidez, durabilidade e elegância são as qualidades deste painel. As quatro dobras em V agregam resistência extra e garantem a segurança necessária. A galvanização oferece resistência máxima contra a chuva, neve, granizo e sol extremo. Adequado a áreas residenciais, comerciais, centros desportivos e zonas industriais.',
    dimensions: '2,50 x 2,03 m',
    specs: {
      Material: 'Aço galvanizado Sendzimir',
      Cor: 'Branco RAL 9016',
      Acabamento: 'PVC plastificado (100 µm)',
      'Espessura do arame': '5 mm',
      'Âmbito de aplicação': 'Exterior',
      Garantia: '10 anos',
    },
    highlights: [
      'Galvanizado a quente + PVC branco',
      'Quatro dobras em V para reforço',
      'Estética limpa e durável',
      'Montagem simples sem ferramentas especiais',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },
  {
    id: 3,
    name: 'Painel Malla Hercules Gris Antracita',
    originalPrice: 25.5,
    salePrice: 15.25,
    category: 'hercules',
    description:
      'Painel de malha Hercules em arame galvanizado revestido a PVC cinza antracite (RAL 7016), de acabamento sóbrio e elevada durabilidade.',
    longDescription:
      'Painel de malha tipo Hercules galvanizado e plastificado em PVC cinza antracite (RAL 7016). Pedido mínimo: 5 unidades. Disponível em 2,50 x 2,03 m e 2,50 x 1,73 m. Destaca-se pelo acabamento sóbrio e excelente relação qualidade/preço. Fabrico em arame de zinco Sendzimir galvanizado a quente com plastificação de poliéster microcristalino de mínimo 100 mícrons. As quatro dobras em V garantem a rigidez e segurança em vedações residenciais, comerciais, desportivas e industriais. Garantia de no mínimo 10 anos de vida útil.',
    dimensions: '2,50 x 2,03 m',
    specs: {
      Material: 'Metal (aço galvanizado)',
      Cor: 'Cinzento antracite RAL 7016',
      'Específico para': 'Vedações',
      'outras propriedades': 'PE revestido',
      'espessura do arame': '5 mm',
      'Âmbito de aplicação': 'Exterior',
      'garantia do fabricante': '10 anos',
    },
    highlights: [
      'Galvanizado a quente + PVC antracite',
      'Acabamento sóbrio e moderno',
      'Quatro dobras em V para reforço',
      'Resistente à corrosão',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },
  {
    id: 4,
    name: 'Painel Malla Hercules Galvanizada',
    originalPrice: 24.0,
    salePrice: 14.35,
    category: 'hercules',
    description:
      'Painel de vedação em rede eletrossoldada galvanizada, conhecido como malha Hercules pela sua firmeza, resistência e durabilidade.',
    longDescription:
      'Painel de vedação com rede eletrossoldada galvanizada. Disponível em 2,50 x 2,03 m e 2,50 x 1,73 m (pedido mínimo: 10 unidades). Projetado para cercas que exigem solidez estrutural e estética. A montagem é de fácil execução, por pessoal não especializado e com poucas ferramentas. Os painéis rígidos são feitos de arame duro galvanizado eletrossoldado, com dobras em V que agregam resistência extra e garantem uma estrutura robusta e segura. A galvanização dos fios proporciona elevada resistência à corrosão e aos fatores climáticos.',
    dimensions: '2,50 x 2,03 m',
    specs: {
      Material: 'Aço galvanizado eletrossoldado',
      Cor: 'Galvanizado',
      Acabamento: 'Galvanizado',
      'Espessura do arame': '5 mm',
      'Âmbito de aplicação': 'Exterior',
      Garantia: '10 anos',
    },
    highlights: [
      'Arame galvanizado eletrossoldado',
      'Quatro dobras em V para reforço',
      'Elevada resistência à corrosão',
      'Montagem simples e rápida',
      'Pedido mínimo: 10 unidades',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 5,
    name: 'Cerca Hercules Verde Básico (2m)',
    originalPrice: 25.0,
    salePrice: 14.85,
    category: 'hercules',
    description:
      'Painel Hercules modelo Basic de 2 metros, em arame galvanizado plastificado em PVC verde. Leve, resistente e fácil de instalar.',
    longDescription:
      'Painel Hercules de 2 metros da série Basic, em arame galvanizado eletrossoldado plastificado em verde. Caracteriza-se pelo fio de 4 mm de diâmetro e pelas dobras diferenciadas que lhe conferem maior rigidez, resultando num painel leve e altamente resistente. Largura padrão de 2 metros, disponível em duas alturas: 1 m e 1,5 m. Muito utilizado em vedações residenciais, cercas de jardim e piscina. Pela sua firmeza, é também uma solução que combina segurança e design em vedações industriais, áreas comerciais, parques e centros desportivos.',
    dimensions: '2,00 m largura x 1,00–1,50 m altura',
    specs: {
      Material: 'Aço galvanizado eletrossoldado',
      Cor: 'Verde RAL 6005',
      Acabamento: 'PVC plastificado',
      'Espessura do arame': '4 mm',
      Série: 'Basic',
      'Âmbito de aplicação': 'Exterior',
    },
    highlights: [
      'Série Basic — fio de 4 mm',
      'Largura padrão de 2 m',
      'Leve e altamente resistente',
      'Ideal para piscinas e jardins',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },
  {
    id: 6,
    name: 'Cerca Hercules Branco Básico (2m)',
    originalPrice: 28.5,
    salePrice: 17.1,
    category: 'hercules',
    description:
      'Painel Hercules Basic de 2 metros em arame galvanizado plastificado em PVC branco. Estética limpa e segura para vedações residenciais e industriais.',
    longDescription:
      'Painel de vedação Hercules branco de 2 metros, série Basic. Em arame galvanizado eletrossoldado plastificado em PVC branco. Fio de 4 mm de diâmetro com dobras diferenciadas que conferem maior rigidez, resultando num painel leve, resistente e fácil de instalar. Largura padrão de 2 metros, disponível em alturas de 1 m e 1,5 m. A cor branca projeta uma estética de tranquilidade e asseio, sendo muito usada em vedações residenciais, especialmente em piscinas. Pela firmeza, é uma solução que combina segurança e design em vedações industriais, áreas comerciais, parques e centros desportivos.',
    dimensions: '2,00 m largura x 1,00–1,50 m altura',
    specs: {
      Material: 'Aço galvanizado eletrossoldado',
      Cor: 'Branco RAL 9016',
      Acabamento: 'PVC plastificado',
      'Espessura do arame': '4 mm',
      Série: 'Basic',
      'Âmbito de aplicação': 'Exterior',
    },
    highlights: [
      'Série Basic — fio de 4 mm',
      'Estética branca e luminosa',
      'Largura padrão de 2 m',
      'Ideal para piscinas e vedações residenciais',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },
  {
    id: 7,
    name: 'Cerca Hercules Cinza Básico (2m)',
    originalPrice: 30.0,
    salePrice: 17.85,
    category: 'hercules',
    description:
      'Painel Hercules Basic de 2 metros em arame galvanizado plastificado em PVC cinza escuro (RAL 7016), com fio de 4 mm e elevada rigidez.',
    longDescription:
      'Painel Hercules de 2 metros, série Basic, em arame galvanizado eletrossoldado plastificado em cinza escuro (RAL 7016). Fio de 4 mm de diâmetro com dobras verticais que adicionam um elemento decorativo e conferem maior rigidez. Largura padrão de 2 metros e alturas disponíveis de 1 m e 1,5 m. Apanhado pela sua leveza, resistência e estética agradável, é muito apreciado em vedações residenciais, comerciais e industriais. O tom cinza escuro assemelha-se ao preto, integrando-se em arquiteturas modernas e minimalistas.',
    dimensions: '2,00 m largura x 1,00–1,50 m altura',
    specs: {
      Material: 'Aço galvanizado eletrossoldado',
      Cor: 'Cinza escuro RAL 7016',
      Acabamento: 'PVC plastificado',
      'Espessura do arame': '4 mm',
      Série: 'Basic',
      'Âmbito de aplicação': 'Exterior',
    },
    highlights: [
      'Série Basic — fio de 4 mm',
      'Cinza escuro RAL 7016',
      'Largura padrão de 2 m',
      'Dobras verticais decorativas e rígidas',
      'Pedido mínimo: 5 unidades',
    ],
    application: 'Residencial, Comercial, Industrial',
  },

  // ── Rede Malha Solta (8–11) ───────────────────────────────────────────────
  {
    id: 8,
    name: 'Rolo Rede Malha Solta Galvanizada',
    originalPrice: 34.0,
    salePrice: 20.3,
    category: 'malha-solta',
    description:
      'Rolo de rede de malha solta de tripla torção em arame galvanizado, ideal para vedações agrícolas, pecuárias e industriais.',
    longDescription:
      'Rolo de rede de malha solta de tripla torção fabricado em arame galvanizado de alta resistência. A malha de torção simples é a solução mais económica e versátil para vedações extensas, adaptando-se a todo o tipo de terrenos. O galvanizado garante boa resistência à oxidação em exterior. Indicada para vedações agrícolas, pecuárias, parque de animais, terrenos industriais e demarcação de perímetros.',
    dimensions: '1,00 m x 25 m (rolo)',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado (prata)',
      Malha: 'Tripla torção 50 mm',
      'Espessura do arame': '2,00 mm',
      Comprimento: '25 m (rolo)',
      Altura: '1,00 m',
    },
    highlights: [
      'Arame galvanizado de alta resistência',
      'Malha de tripla torção 50 mm',
      'Económica para vedações extensas',
      'Adapta-se a todo o tipo de terreno',
      'Fácil instalação com postes Quickfix',
    ],
    application: 'Agrícola, Pecuária, Industrial',
  },
  {
    id: 9,
    name: 'Rolo Rede Malha Solta Verde',
    originalPrice: 49.0,
    salePrice: 29.4,
    category: 'malha-solta',
    description:
      'Rolo de rede de malha solta de tripla torção em arame galvanizado revestido a PVC verde, com excelente integração paisagística.',
    longDescription:
      'Rolo de rede de malha solta de tripla torção em arame galvanizado revestido a PVC verde (RAL 6005). A camada de PVC confere dupla proteção contra a corrosão e uma estética que se integra em jardins e zonas verdes. Indicada para vedações agrícolas, residenciais e de jardim, bem como demarcação de perímetros com exigência estética.',
    dimensions: '1,00 m x 25 m (rolo)',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005',
      Malha: 'Tripla torção 50 mm',
      'Espessura do arame': '2,00 mm + PVC',
      Comprimento: '25 m (rolo)',
      Altura: '1,00 m',
    },
    highlights: [
      'Galvanizado + PVC verde (dupla proteção)',
      'Integra-se em jardins e zonas verdes',
      'Malha de tripla torção 50 mm',
      'Resistente às intempéries',
      'Fácil instalação',
    ],
    application: 'Residencial, Agrícola, Paisagismo',
  },
  {
    id: 10,
    name: 'Rolo Rede Malha Tripla Torção Galinheiro',
    originalPrice: 18.0,
    salePrice: 10.55,
    category: 'malha-solta',
    description:
      'Rolo de rede malha hexagonal (galinheiro) de tripla torção em arame galvanizado, ideal para cercados de aves e pequenos animais.',
    longDescription:
      'Rolo de rede malha hexagonal tipo galinheiro, fabricada em arame galvanizado de tripla torção. A malha hexagonal pequena impede a passagem de aves e pequenos animais, sendo a solução tradicional para galinheiros, coelheiras, aviários e parque de animais pequenos. Leve, flexível e de fácil instalação com postes metálicos ou de madeira.',
    dimensions: '1,00 m x 25 m (rolo)',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado (prata)',
      Malha: 'Hexagonal 25 mm',
      'Espessura do arame': '1,20 mm',
      Comprimento: '25 m (rolo)',
      Altura: '1,00 m',
    },
    highlights: [
      'Malha hexagonal 25 mm (galinheiro)',
      'Arame galvanizado leve e flexível',
      'Ideal para galinheiros e aviários',
      'Económica e de fácil instalação',
      'Impede passagem de aves e pequenos animais',
    ],
    application: 'Agrícola, Pecuária',
  },
  {
    id: 11,
    name: 'Rolo de Rede Ovelheira com Nó',
    originalPrice: 63.0,
    salePrice: 37.9,
    category: 'malha-solta',
    description:
      'Rolo de rede ovelheira com nós em arame galvanizado, especialmente concebida para cercados de ovelhas e gado ovino/caprino.',
    longDescription:
      'Rolo de rede ovelheira com nós (nó fixo vertical), fabricada em arame galvanizado de alta resistência. Os nós fixos verticais impedem o deslizamento da malha e garantem a segurança do gado. Os fios horizontais de maior espessura, mais juntos na parte inferior, suportam a pressão dos animais. Solução robusta e duradoura para cercados de ovelhas, cabras e outros gado de médio porte.',
    dimensions: '1,00 m x 50 m (rolo)',
    specs: {
      Material: 'Aço galvanizado de alta resistência',
      Cor: 'Galvanizado (prata)',
      Malha: 'Nó fixo vertical 15 cm',
      'Fios horizontais': '11 + 1 (reforço inferior)',
      Comprimento: '50 m (rolo)',
      Altura: '1,00 m',
    },
    highlights: [
      'Nó fixo vertical (não desliza)',
      'Concebida para gado ovino e caprino',
      'Fios inferiores mais juntos (reforço)',
      'Arame galvanizado de alta resistência',
      'Rolo de 50 m para grandes extensões',
    ],
    application: 'Agrícola, Pecuária',
  },

  // ── Rede Eletrossoldada (12–13) ───────────────────────────────────────────
  {
    id: 12,
    name: 'Painel Rede Eletrossoldada Galvanizada',
    originalPrice: 25.0,
    salePrice: 14.85,
    category: 'eletrossoldada',
    description:
      'Painel de rede metálica eletrossoldada em aço galvanizado, altamente resistente, ideal para gaiolas, vedações e proteção de máquinas.',
    longDescription:
      'Painel de rede metálica eletrossoldada em aço galvanizado. Altamente resistente, é ideal para espaços que requerem um alto grau de proteção, construção de gaiolas e recintos. Os painéis de rede eletrossoldada para vedações e gaiolas são de fácil manuseio e instalação, sendo cada vez mais utilizados para cercados, devido à sua rigidez, durabilidade e acabamento de qualidade. Disponível em vários tamanhos de malha, comprimento, altura e diâmetro do fio.',
    dimensions: '2,60 x 1,00 m',
    specs: {
      Material: 'Aço',
      Acabamento: 'Galvanizado',
      'Escopo de uso': 'Vedações, gaiolas, proteção de máquinas',
      Malha: '100 x 50 mm',
      'Espessura do arame': '4 mm',
    },
    highlights: [
      'Aço galvanizado eletrossoldado',
      'Alta resistência e durabilidade',
      'Fácil manuseio e instalação',
      'Multifuncional: gaiolas, vedações, proteção',
      'Vários tamanhos disponíveis',
    ],
    application: 'Industrial, Residencial, Agrícola',
  },
  {
    id: 13,
    name: 'Rolo Rede Eletrossoldada Galvanizada',
    originalPrice: 24.0,
    salePrice: 14.3,
    category: 'eletrossoldada',
    description:
      'Rolo de rede eletrossoldada galvanizada com revestimento de zinco, versátil e ideal para vedações, gaiolas e trabalhos industriais.',
    longDescription:
      'Rolo de rede eletrossoldada galvanizada, disponível em rolos de 5 e 25 metros e alturas de 0,5 m a 2 m. Disponível em malha 13x13 com fio de 0,90 mm, 19x19 com fio de 1,40 mm e 51x51 com fio de 2,00 mm. As malhas metálicas são feitas de aço e soldadas por pontos, revestidas com uma camada de zinco para maior resistência aos efeitos corrosivos e de oxidação. Solução ideal para vedações de alta resistência, gaiolas e trabalhos manuais de uso industrial.',
    dimensions: '1,00 x 25 m (rolo)',
    specs: {
      Material: 'Aço',
      Acabamento: 'Galvanizado (revestimento de zinco)',
      Malha: '51 x 51 mm (ou 13x13 / 19x19)',
      'Espessura do arame': '0,90 / 1,40 / 2,00 mm',
      Comprimento: '5 m / 25 m (rolo)',
      Altura: '0,50 – 2,00 m',
    },
    highlights: [
      'Revestimento de zinco (galvanizado)',
      'Vários tamanhos de malha e fio',
      'Rolo de 5 ou 25 metros',
      'Resistente à corrosão e oxidação',
      'Ideal para gaiolas e vedações',
    ],
    application: 'Industrial, Residencial, Agrícola',
  },

  // ── Grades (14–19) ────────────────────────────────────────────────────────
  {
    id: 14,
    name: 'Grade Varilla Redonda 0.90 x 2.50 m',
    originalPrice: 152.0,
    salePrice: 91.5,
    category: 'grades',
    description:
      'Grade metálica para varão redondo galvanizado e plastificado, com 0,90 m de altura e 2,50 m de comprimento. Ideal para varandas, terraços e escadas.',
    longDescription:
      'Grade de segurança para varandas, terraços e escadas, fabricada em aço galvanizado com varões redondos transversais plastificados. A combinação de galvanização e plastificação garante elevada resistência à corrosão e durabilidade em exterior. Montagem por módulos de 2,50 m de comprimento, com altura de 0,90 m (norma para proteção de varandas). Integra-se em arquiteturas residenciais e comerciais.',
    dimensions: '0,90 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Tipo: 'Varões redondos transversais',
      Altura: '0,90 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Varandas, terraços, escadas',
    },
    highlights: [
      'Aço galvanizado + plastificado',
      'Varões redondos transversais',
      'Altura 0,90 m (norma varandas)',
      'Módulos de 2,50 m de comprimento',
      'Resistente à corrosão em exterior',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 15,
    name: 'Grade Maciço Quadrado 0.90 x 2.50 m',
    originalPrice: 203.0,
    salePrice: 122.0,
    category: 'grades',
    description:
      'Grade de segurança com varões maciços de secção quadrada, galvanizados e plastificados, com 0,90 m de altura e 2,50 m de comprimento.',
    longDescription:
      'Grade de segurança com varões maciços de secção quadrada em aço galvanizado e plastificado. A secção quadrada confere maior robustez e estética moderna face ao varão redondo. Adequada para varandas, terraços, escadas e vedações de segurança em residências, hotéis e edifícios comerciais. Montagem modular de 2,50 m de comprimento.',
    dimensions: '0,90 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Tipo: 'Varões maciços secção quadrada',
      Altura: '0,90 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Varandas, terraços, vedações',
    },
    highlights: [
      'Varões maciços secção quadrada',
      'Maior robustez e estética moderna',
      'Aço galvanizado + plastificado',
      'Altura 0,90 m (norma varandas)',
      'Módulos de 2,50 m de comprimento',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 16,
    name: 'Grade Maciço Quadrado Rombo 0.90 x 2.50 m',
    originalPrice: 203.0,
    salePrice: 122.0,
    category: 'grades',
    description:
      'Grade com varões maciços de secção quadrada com decoração em rombo, galvanizados e plastificados, com 0,90 x 2,50 m.',
    longDescription:
      'Grade de segurança com varões maciços de secção quadrada com decoração em rombo (losango), em aço galvanizado e plastificado. Combina a robustez da secção quadrada com um padrão decorativo elegante, ideal para projetos de arquitetura que valorizam o detalhe estético. Adequada para varandas, terraços e vedações residenciais ou comerciais com exigência decorativa.',
    dimensions: '0,90 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Tipo: 'Varões maciços quadrados com rombo',
      Altura: '0,90 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Varandas, terraços, decoração',
    },
    highlights: [
      'Decoração em rombo (losango)',
      'Varões maciços secção quadrada',
      'Aço galvanizado + plastificado',
      'Estética elegante e diferenciada',
      'Módulos de 0,90 x 2,50 m',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 17,
    name: 'Grade Modelo Aspe 0.60 x 2.50 m',
    originalPrice: 176.5,
    salePrice: 106.2,
    category: 'grades',
    description:
      'Grade metálica modelo Aspe com 0,60 m de altura e 2,50 m de comprimento, em aço galvanizado e plastificado para vedações baixas e jardins.',
    longDescription:
      'Grade modelo Aspe, em aço galvanizado e plastificado, com 0,60 m de altura e 2,50 m de comprimento. Concebidada para vedações baixas — frontarias de jardins, canteiros, separação de zonas e demarcação de caminhos. O design Aspe, com hastes verticais e hastes curtas horizontais, confere um carácter moderno e limpo. Montagem modular sobre muro ou com postes.',
    dimensions: '0,60 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Modelo: 'Aspe',
      Altura: '0,60 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Jardins, canteiros, vedações baixas',
    },
    highlights: [
      'Modelo Aspe — hastes verticais modernas',
      'Altura 0,60 m (vedação baixa)',
      'Aço galvanizado + plastificado',
      'Ideal para jardins e demarcação',
      'Módulos de 2,50 m de comprimento',
    ],
    application: 'Residencial, Paisagismo',
  },
  {
    id: 18,
    name: 'Grade Modelo Cadi 0.60 x 2.50 m',
    originalPrice: 289.5,
    salePrice: 174.35,
    category: 'grades',
    description:
      'Grade metálica modelo Cadí com 0,60 x 2,50 m, em aço galvanizado e plastificado, com estrutura de lâminas horizontais de carácter moderno.',
    longDescription:
      'Grade modelo Cadí, em aço galvanizado e plastificado, com 0,60 m de altura e 2,50 m de comprimento. Com estrutura de lâminas horizontais que conferem um carácter moderno e simplista, é adequada para vedações baixas de carácter contemporâneo — jardins, terraços, separação de zonas em edifícios residenciais e comerciais. Montagem modular sobre muro ou com postes.',
    dimensions: '0,60 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Modelo: 'Cadí',
      Altura: '0,60 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Jardins, terraços, vedações modernas',
    },
    highlights: [
      'Modelo Cadí — lâminas horizontais',
      'Design moderno e minimalista',
      'Aço galvanizado + plastificado',
      'Altura 0,60 m (vedação baixa)',
      'Módulos de 2,50 m de comprimento',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 19,
    name: 'Grade Modelo Montblanc 0.60 x 2.50 m',
    originalPrice: 266.0,
    salePrice: 160.15,
    category: 'grades',
    description:
      'Grade metálica modelo Montblanc com 0,60 x 2,50 m, em aço galvanizado e plastificado, de folha robusta e lisa para máxima privacidade.',
    longDescription:
      'Grade modelo Montblanc, em aço galvanizado e plastificado, com 0,60 m de altura e 2,50 m de comprimento. De folha robusta e tipo placa, oferece maior privacidade e robustez face aos modelos de varões. Adequada para vedações baixas de frontaria, muros divisórios e demarcação de propriedades com exigência de privacidade. Montagem modular sobre muro ou com postes.',
    dimensions: '0,60 x 2,50 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde RAL 6005 (outras sob consulta)',
      Modelo: 'Montblanc',
      Altura: '0,60 m',
      Comprimento: '2,50 m (módulo)',
      'Âmbito de aplicação': 'Frontarias, muros divisórios',
    },
    highlights: [
      'Modelo Montblanc — placa robusta',
      'Maior privacidade e robustez',
      'Aço galvanizado + plastificado',
      'Altura 0,60 m (vedação baixa)',
      'Módulos de 2,50 m de comprimento',
    ],
    application: 'Residencial, Comercial',
  },

  // ── Arames (20–24) ────────────────────────────────────────────────────────
  {
    id: 20,
    name: 'Rolo Arame Farpado Verde',
    originalPrice: 101.0,
    salePrice: 60.75,
    category: 'arames',
    description:
      'Rolo de arame farpado plastificado verde em aço duro galvanizado, com 250 m. Ideal para vedações agrícolas e reforço de segurança.',
    longDescription:
      'Rolo de arame farpado plastificado verde, em aço duro galvanizado reforçado, com resistência à tração de 400 kg. Tipo 15 x 15 em acabamento plastificado, com cordão e diâmetro dos dentes de 1,6/2 mm e distância entre dentes de 15 mm. Rolo de 250 m. Ideal para cercas agrícolas, sendo também um complemento perfeito para fortalecer a segurança em zonas industriais ou militares. O acabamento plastificado verde combina com cercas de painéis plastificados e postes com braço defensivo.',
    dimensions: 'Ø 1,6 mm (cordão) — rolo 250 m',
    specs: {
      Material: 'Aço duro galvanizado + PVC',
      Cor: 'Verde',
      'Diâmetro do cordão': '1,6 mm',
      'Diâmetro da ponta': '2 mm',
      'Distância entre pontas': '15 mm',
      Comprimento: '250 m (rolo)',
      'Resistência à tração': '400 kg',
    },
    highlights: [
      'Aço duro galvanizado + PVC verde',
      'Resistência à tração 400 kg',
      'Rolo de 250 m',
      'Ideal para vedações agrícolas',
      'Refirma a segurança em zonas industriais',
    ],
    application: 'Agrícola, Industrial, Segurança',
  },
  {
    id: 21,
    name: 'Rolo Arame Farpado Galvanizado',
    originalPrice: 76.5,
    salePrice: 46.0,
    category: 'arames',
    description:
      'Rolo de arame farpado galvanizado em aço duro reforçado, com 100 m e resistência à tração de 400 kg. Ideal para vedações agrícolas.',
    longDescription:
      'Rolo de arame farpado em aço duro galvanizado reforçado, com resistência à tração de 400 kg. Diâmetro do cordão de 1,7 mm e diâmetro de ponta de 1,40 mm, com distância entre pontas de 8 cm. Rolo de 100 m. Ideal para cercas agrícolas, sendo também um complemento perfeito para fortalecer a segurança em zonas industriais ou militares.',
    dimensions: 'Ø 1,7 mm (cordão) — rolo 100 m',
    specs: {
      Material: 'Aço duro galvanizado',
      Cor: 'Prata (galvanizado)',
      'Diâmetro do cordão': '1,7 mm',
      'Diâmetro da ponta': '1,40 mm',
      'Distância entre pontas': '8 cm',
      Comprimento: '100 m (rolo)',
      'Resistência à tração': '400 kg',
    },
    highlights: [
      'Aço duro galvanizado reforçado',
      'Resistência à tração 400 kg',
      'Rolo de 100 m',
      'Ideal para cercas agrícolas',
      'Complemento de segurança industrial/militar',
    ],
    application: 'Agrícola, Industrial, Segurança',
  },
  {
    id: 22,
    name: 'Rolo Arame Plastificado 3 Kg',
    originalPrice: 31.0,
    salePrice: 18.65,
    category: 'arames',
    description:
      'Rolo de arame plastificado verde fio 14/17, com 3 kg. Acessório ideal para malha de torção simples verde.',
    longDescription:
      'Rolo de arame plastificado verde, fio 14/17, com 3 kg e diâmetro total de 3,00 mm. Acessório ideal para tensionamento e fixação de malha de torção simples verde. O acabamento plastificado verde combina com os postes e painéis plastificados da mesma cor.',
    dimensions: 'Ø 3,00 mm — rolo 3 kg',
    specs: {
      Material: 'Aço + PVC',
      Cor: 'Verde',
      'Medida de fio': '14/17',
      'Diâmetro total': '3,00 mm',
      Peso: '3 kg',
      'Escopo de uso': 'Vedação de malha de rede solta',
    },
    highlights: [
      'Plastificado verde (combina com painéis)',
      'Fio 14/17 — Ø 3,00 mm',
      'Rolo de 3 kg',
      'Ideal para malha de torção simples',
      'Fácil de manipular e instalar',
    ],
    application: 'Residencial, Agrícola',
  },
  {
    id: 23,
    name: 'Rolo Arame Galvanizado',
    originalPrice: 22.0,
    salePrice: 13.15,
    category: 'arames',
    description:
      'Rolo de arame galvanizado Nº 15, com 5 kg e 140 m de comprimento. Acessório ideal para construção de malha de torção simples.',
    longDescription:
      'Rolo de arame galvanizado Nº 15, com 5 kg e comprimento aproximado de 140 m. Diâmetro total de 2,40 mm. Acessório ideal para a construção de malha de torção simples galvanizada e aramado. Não é inoxidável. Disponível também em outras medidas: #04, #06, #08, #10, #12, #14 e #16, assim como fio plastificado verde #14/17 e arame recozido #08.',
    dimensions: 'Ø 2,40 mm — rolo 5 kg / 140 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado (prata)',
      'Medida de fio': '15',
      Espessura: '2,40 mm',
      Comprimento: '140 m (rolo 5 kg)',
      Acabamento: 'Galvanizado',
    },
    highlights: [
      'Aço galvanizado fio Nº 15',
      'Diâmetro 2,40 mm',
      'Rolo de 5 kg (≈140 m)',
      'Ideal para malha de torção simples',
      'Várias medidas disponíveis',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 24,
    name: 'Rolo Arame Recozido',
    originalPrice: 25.0,
    salePrice: 14.85,
    category: 'arames',
    description:
      'Rolo de arame recozido Nº 08, com 5 kg e 1,30 mm. Fio muito manejável para fabrico de grampos, alças e aplicações ornamentais.',
    longDescription:
      'Rolo de arame recozido Nº 08, com 5 kg e diâmetro de 1,30 mm. Galvanizado normal e reforçado, com resistência padrão duro e recozido. Fio muito manejável, utilizado no fabrico de cerramentos metálicos, fabrico de cabides, alças e grampos, aplicações ornamentais e proteção de cabos elétricos. Disponível também em fio galvanizado #04 a #16 e fio plastificado verde #14/17.',
    dimensions: 'Ø 1,30 mm — rolo 5 kg',
    specs: {
      Material: 'Aço recozido',
      Cor: 'Galvanizado',
      Medida: 'Fio Nº 08',
      Diâmetro: '1,30 mm',
      Peso: '5 kg',
      Acabamento: 'Recozido galvanizado',
    },
    highlights: [
      'Aço recozido fio Nº 08',
      'Diâmetro 1,30 mm — rolo 5 kg',
      'Fio muito manejável',
      'Multifuncional: grampos, alças, ornamentação',
      'Também em galvanizado #04 a #16',
    ],
    application: 'Industrial, Artesanato, Construção',
  },

  // ── Postes (25–40) ────────────────────────────────────────────────────────
  {
    id: 25,
    name: 'Poste Malha Hercules Verde',
    originalPrice: 11.0,
    salePrice: 6.45,
    category: 'postes',
    description:
      'Poste retangular verde para painéis Hercules (60 x 40 mm), em aço Sendzimir galvanizado e plastificado, com 10 anos de garantia.',
    longDescription:
      'Poste retangular Hercules verde, em aço Sendzimir galvanizado e plastificado por fosfatização microcristalina. Estrutura robusta com espessura de 1,50 mm, sem furação para evitar efeitos de corrosão prematura. Inclui tampão preto. Compatível com grampos, base de alumínio ou base de aço para montagem em parede. A montagem do poste e de todos os acessórios tem nível de dificuldade praticamente nulo.',
    dimensions: '60 x 40 mm (perfil retangular)',
    specs: {
      Material: 'Aço Sendzimir galvanizado',
      Cor: 'Verde',
      'Específico para': 'Vedações (painel Hercules)',
      'Espessura do material': '1,5 mm',
      Garantia: '10 anos',
      Acessórios: 'Tampão preto incluído',
    },
    highlights: [
      'Aço Sendzimir galvanizado + plastificado',
      'Perfil retangular 60 x 40 mm',
      'Espessura 1,5 mm (robusto)',
      'Sem furação (evita corrosão prematura)',
      'Garantia de 10 anos',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 26,
    name: 'Poste Malha Hercules Branco',
    originalPrice: 13.0,
    salePrice: 7.8,
    category: 'postes',
    description:
      'Poste retangular branco para painéis Hercules (60 x 40 mm), em aço Sendzimir galvanizado e plastificado, com 10 anos de garantia.',
    longDescription:
      'Poste retangular Hercules branco, em aço Sendzimir galvanizado e plastificado por fosfatização microcristalina. Estrutura robusta com espessura de 1,50 mm, sem furação para evitar efeitos de corrosão prematura. Inclui tampão preto. Compatível com grampos, base de alumínio ou base de aço para montagem em parede. A montagem do poste e de todos os acessórios tem nível de dificuldade praticamente nulo.',
    dimensions: '60 x 40 mm (perfil retangular)',
    specs: {
      Material: 'Aço Sendzimir galvanizado',
      Cor: 'Branco',
      'Específico para': 'Vedações (painel Hercules)',
      'Espessura do material': '1,5 mm',
      Garantia: '10 anos',
      Acessórios: 'Tampão preto incluído',
    },
    highlights: [
      'Aço Sendzimir galvanizado + plastificado',
      'Perfil retangular 60 x 40 mm',
      'Espessura 1,5 mm (robusto)',
      'Sem furação (evita corrosão prematura)',
      'Garantia de 10 anos',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 27,
    name: 'Poste Malha Hercules Gris Antracita',
    originalPrice: 14.5,
    salePrice: 8.6,
    category: 'postes',
    description:
      'Poste retangular cinza antracite (RAL 7016) para painéis Hercules (60 x 40 mm), em aço Sendzimir galvanizado e plastificado.',
    longDescription:
      'Poste retangular Hercules cinza antracite (RAL 7016), em aço Sendzimir galvanizado e plastificado por fosfatização microcristalina. Estrutura robusta com espessura de 1,50 mm, sem furação para evitar efeitos de corrosão prematura. Inclui tampão preto. Compatível com grampos, base de alumínio ou base de aço para montagem em parede. Montagem simples, sem necessidade de ferramentas especiais.',
    dimensions: '60 x 40 mm (perfil retangular)',
    specs: {
      Material: 'Aço Sendzimir galvanizado',
      Cor: 'Cinza antracite RAL 7016',
      'Específico para': 'Vedações (Hércules)',
      'Espessura do material': '1,5 mm',
      Garantia: '10 anos',
      Acessórios: 'Tampão preto incluído',
    },
    highlights: [
      'Aço Sendzimir galvanizado + plastificado',
      'Perfil retangular 60 x 40 mm',
      'Cinza antracite RAL 7016',
      'Sem furação (evita corrosão prematura)',
      'Garantia de 10 anos',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 28,
    name: 'Poste Malha Hercules Galvanizado',
    originalPrice: 8.0,
    salePrice: 4.6,
    category: 'postes',
    description:
      'Poste retangular galvanizado para painéis Hercules (60 x 40 mm), em aço Sendzimir galvanizado, com 10 anos de garantia.',
    longDescription:
      'Poste retangular Hercules galvanizado, em aço Sendzimir galvanizado. Estrutura robusta com espessura de 1,50 mm, sem furação para evitar efeitos de corrosão prematura. Inclui tampão preta. Compatível com grampos, base de alumínio ou base de aço para montagem em parede. Montagem simples e rápida, sem necessidade de ferramentas especiais.',
    dimensions: '60 x 40 mm (perfil retangular)',
    specs: {
      Material: 'Aço Sendzimir galvanizado',
      Cor: 'Galvanizado',
      'Específico para': 'Vedações (Hércules)',
      'Espessura do material': '1,5 mm',
      Garantia: '10 anos',
      Acessórios: 'Tampão preto incluído',
    },
    highlights: [
      'Aço Sendzimir galvanizado',
      'Perfil retangular 60 x 40 mm',
      'Espessura 1,5 mm (robusto)',
      'Sem furação (evita corrosão prematura)',
      'Garantia de 10 anos',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 29,
    name: 'Poste Cremallera Quickfix Verde',
    originalPrice: 11.5,
    salePrice: 6.9,
    category: 'postes',
    description:
      'Poste Quickfix verde com cremalheira (Ø 48 mm) para painéis Hercules, malha soldada e malha com nós. Inclui tampão e 10 anos de garantia.',
    longDescription:
      'Poste de vedação Quickfix verde, com perfil redondo de 48 mm e cremalheira para facilitar a montagem das malhas. Usado para cercas e portões, compatível com painéis Hercules, painéis de torção dupla, malha soldada e malha com nós. Inclui tampão verde. Pode ser embutido no solo ou utilizado com base de correção rápida. Fixação da malha através de grampos de poliamida ou metal.',
    dimensions: 'Ø 48 mm (perfil redondo)',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde',
      'Âmbito de aplicação': 'Painéis Hercules e vedações',
      'Diâmetro do suporte': '48 mm',
      Garantia: '10 anos',
      Acessórios: 'Tampão verde incluído',
    },
    highlights: [
      'Cremalheira para montagem rápida',
      'Perfil redondo Ø 48 mm',
      'Compatível com Hercules e malha soldada',
      '10 anos de garantia',
      'Inclui tampão verde',
    ],
    application: 'Residencial, Industrial, Agrícola',
  },
  {
    id: 30,
    name: 'Poste Intermediário Verde',
    originalPrice: 12.0,
    salePrice: 7.05,
    category: 'postes',
    description:
      'Poste intermédio verde para vedações de malha solta (Ø 48 mm), em aço galvanizado e plastificado. Suporta a malha ao longo da linha.',
    longDescription:
      'Poste intermédio verde para vedações de rede malha solta, em aço galvanizado e plastificado. Perfil redondo de 48 mm, com furações para passagem de fios de tensão. Coloca-se ao longo da linha da vedação, espaçado de 2 a 3 m, para suportar a malha e manter a tensão. Inclui tampão. Compatível com esticadores e abraçadeiras para fixação da rede.',
    dimensions: 'Ø 48 mm — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Poste intermédio (linha)',
      'Diâmetro do suporte': '48 mm',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste intermédio para malha solta',
      'Perfil redondo Ø 48 mm',
      'Aço galvanizado + plastificado verde',
      'Furações para fios de tensão',
      'Espaçamento recomendado 2–3 m',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 31,
    name: 'Poste Intermediário Galvanizado',
    originalPrice: 8.0,
    salePrice: 4.65,
    category: 'postes',
    description:
      'Poste intermédio galvanizado para vedações de malha solta (Ø 48 mm), em aço galvanizado. Económico e resistente à corrosão.',
    longDescription:
      'Poste intermédio galvanizado para vedações de rede malha solta, em aço galvanizado. Perfil redondo de 48 mm, com furações para passagem de fios de tensão. Coloca-se ao longo da linha da vedação, espaçado de 2 a 3 m, para suportar a malha e manter a tensão. Inclui tampão. Mais económico que o plastificado, mantendo boa resistência à corrosão.',
    dimensions: 'Ø 48 mm — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Poste intermédio (linha)',
      'Diâmetro do suporte': '48 mm',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste intermédio para malha solta',
      'Perfil redondo Ø 48 mm',
      'Aço galvanizado (económico)',
      'Furações para fios de tensão',
      'Resistente à corrosão',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 32,
    name: 'Poste Terminal Verde',
    originalPrice: 42.5,
    salePrice: 25.6,
    category: 'postes',
    description:
      'Poste terminal verde reforçado para vedações de malha solta, em aço galvanizado e plastificado. Suporta a tensão nas extremidades.',
    longDescription:
      'Poste terminal verde para vedações de rede malha solta, em aço galvanizado e plastificado. Mais robusto que o poste intermédio, concebido para suportar a tensão da malha nas extremidades da vedação. Perfil redondo de 60 mm com furações para tensão dos fios. Inclui tampão. Combina com os postes intermédios verdes para uma vedação uniforme.',
    dimensions: 'Ø 60 mm — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Poste terminal (extremidade)',
      'Diâmetro do suporte': '60 mm',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste terminal reforçado',
      'Suporta a tensão nas extremidades',
      'Perfil redondo Ø 60 mm',
      'Aço galvanizado + plastificado verde',
      'Furações para tensão dos fios',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 33,
    name: 'Poste Terminal Galvanizado',
    originalPrice: 29.0,
    salePrice: 17.25,
    category: 'postes',
    description:
      'Poste terminal galvanizado reforçado para vedações de malha solta, em aço galvanizado. Económico e resistente para extremidades.',
    longDescription:
      'Poste terminal galvanizado para vedações de rede malha solta, em aço galvanizado. Mais robusto que o poste intermédio, concebido para suportar a tensão da malha nas extremidades da vedação. Perfil redondo de 60 mm com furações para tensão dos fios. Inclui tampão. Mais económico que o plastificado, com boa resistência à corrosão.',
    dimensions: 'Ø 60 mm — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Poste terminal (extremidade)',
      'Diâmetro do suporte': '60 mm',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste terminal reforçado',
      'Suporta a tensão nas extremidades',
      'Perfil redondo Ø 60 mm',
      'Aço galvanizado (económico)',
      'Furações para tensão dos fios',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 34,
    name: 'Poste de Reforço Verde',
    originalPrice: 34.5,
    salePrice: 20.5,
    category: 'postes',
    description:
      'Poste de reforço verde para vedaações de malha solta em zonas de vento ou grandes vãos, em aço galvanizado e plastificado.',
    longDescription:
      'Poste de reforço verde para vedações de rede malha solta, em aço galvanizado e plastificado. Mais espesso que o poste intermédio, é colocado em zonas de grande exposição ao vento, vãos longos ou pontos de maior solicitação mecânica. Perfil redondo reforçado de 60 mm. Inclui tampão. Garante a estabilidade da vedação em condições exigentes.',
    dimensions: 'Ø 60 mm (reforçado) — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Poste de reforço',
      'Diâmetro do suporte': '60 mm (reforçado)',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste de reforço para zonas expostas',
      'Perfil redondo reforçado Ø 60 mm',
      'Aço galvanizado + plastificado verde',
      'Para vãos longos e grande vento',
      'Garante a estabilidade da vedação',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 35,
    name: 'Poste de Reforço Galvanizado',
    originalPrice: 35.0,
    salePrice: 21.0,
    category: 'postes',
    description:
      'Poste de reforço galvanizado para vedações de malha solta em zonas de vento ou grandes vãos, em aço galvanizado.',
    longDescription:
      'Poste de reforço galvanizado para vedações de rede malha solta, em aço galvanizado. Mais espesso que o poste intermédio, é colocado em zonas de grande exposição ao vento, vãos longos ou pontos de maior solicitação mecânica. Perfil redondo reforçado de 60 mm. Inclui tampão. Garante a estabilidade da vedação em condições exigentes, com acabamento galvanizado económico.',
    dimensions: 'Ø 60 mm (reforçado) — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Poste de reforço',
      'Diâmetro do suporte': '60 mm (reforçado)',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste de reforço para zonas expostas',
      'Perfil redondo reforçado Ø 60 mm',
      'Aço galvanizado (económico)',
      'Para vãos longos e grande vento',
      'Garante a estabilidade da vedação',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 36,
    name: 'Poste Canto/Extensão Verde',
    originalPrice: 68.0,
    salePrice: 40.75,
    category: 'postes',
    description:
      'Poste de canto/extensão verde para vedações de malha solta, em aço galvanizado e plastificado. Suporta tensões em duas direções.',
    longDescription:
      'Poste de canto/extensão verde para vedações de rede malha solta, em aço galvanizado e plastificado. Concebido para os pontos de mudança de direção da vedação (cantos) e extremidades com carga dupla de tensão. Mais robusto que o poste intermédio, suporta tensões em duas direções perpendiculares. Perfil redondo reforçado de 60 mm com furações em duas faces. Inclui tampão.',
    dimensions: 'Ø 60 mm (reforçado) — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Poste de canto / extremidade',
      'Diâmetro do suporte': '60 mm (reforçado)',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste de canto para mudanças de direção',
      'Suporta tensões em duas direções',
      'Perfil redondo reforçado Ø 60 mm',
      'Aço galvanizado + plastificado verde',
      'Furações em duas faces',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 37,
    name: 'Poste Canto/Extensão Galvanizado',
    originalPrice: 55.0,
    salePrice: 32.85,
    category: 'postes',
    description:
      'Poste de canto/extensão galvanizado para vedações de malha solta, em aço galvanizado. Suporta tensões em duas direções.',
    longDescription:
      'Poste de canto/extensão galvanizado para vedações de rede malha solta, em aço galvanizado. Concebido para os pontos de mudança de direção da vedação (cantos) e extremidades com carga dupla de tensão. Mais robusto que o poste intermédio, suporta tensões em duas direções perpendiculares. Perfil redondo reforçado de 60 mm com furações em duas faces. Inclui tampão.',
    dimensions: 'Ø 60 mm (reforçado) — altura 1,50–2,50 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Poste de canto / extremidade',
      'Diâmetro do suporte': '60 mm (reforçado)',
      Altura: '1,50 – 2,50 m',
      Acessórios: 'Tampão incluído',
    },
    highlights: [
      'Poste de canto para mudanças de direção',
      'Suporta tensões em duas direções',
      'Perfil redondo reforçado Ø 60 mm',
      'Aço galvanizado (económico)',
      'Furações em duas faces',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 38,
    name: 'Poste Tornapunta Galvanizado',
    originalPrice: 6.0,
    salePrice: 3.5,
    category: 'postes',
    description:
      'Poste tornapunta (escora diagonal) galvanizado para vedações de malha solta, em aço galvanizado. Estabiliza cantos e extremidades.',
    longDescription:
      'Poste tornapunta galvanizado para vedações de rede malha solta, em aço galvanizado. Funciona como escora diagonal, cravada no solo em ângulo, para estabilizar os postes de canto e extremidades contra a tensão da malha. Impede o inclinação do poste terminal sob carga. Perfil redondo de 48 mm. Vendido sem acessórios de fixação (cavilha e grampo vendidos separadamente).',
    dimensions: 'Ø 48 mm — comprimento 1,00–1,50 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Tornapunta (escora diagonal)',
      'Diâmetro do suporte': '48 mm',
      Comprimento: '1,00 – 1,50 m',
      Acessórios: 'Sem fixações (vendidas à parte)',
    },
    highlights: [
      'Escora diagonal para cantos/extremidades',
      'Estabiliza contra a tensão da malha',
      'Perfil redondo Ø 48 mm',
      'Aço galvanizado (económico)',
      'Impede a inclinação do poste terminal',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 39,
    name: 'Poste Tornapunta Verde',
    originalPrice: 8.5,
    salePrice: 5.0,
    category: 'postes',
    description:
      'Poste tornapunta (escora diagonal) verde para vedações de malha solta, em aço galvanizado e plastificado.',
    longDescription:
      'Poste tornapunta verde para vedações de rede malha solta, em aço galvanizado e plastificado. Funciona como escora diagonal, cravada no solo em ângulo, para estabilizar os postes de canto e extremidades contra a tensão da malha. Impede o inclinação do poste terminal sob carga. Perfil redondo de 48 mm. Combina com os postes plastificados verdes.',
    dimensions: 'Ø 48 mm — comprimento 1,00–1,50 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Tornapunta (escora diagonal)',
      'Diâmetro do suporte': '48 mm',
      Comprimento: '1,00 – 1,50 m',
      Acessórios: 'Sem fixações (vendidas à parte)',
    },
    highlights: [
      'Escora diagonal para cantos/extremidades',
      'Estabiliza contra a tensão da malha',
      'Combina com postes verdes',
      'Perfil redondo Ø 48 mm',
      'Aço galvanizado + plastificado',
    ],
    application: 'Industrial, Agrícola, Residencial',
  },
  {
    id: 40,
    name: 'Barra Tensão Plastificada Verde',
    originalPrice: 7.5,
    salePrice: 4.5,
    category: 'postes',
    description:
      'Barra de tensão plastificada verde para vedações de malha solta, em aço galvanizado. Permite tensionar a malha nas extremidades.',
    longDescription:
      'Barra de tensão plastificada verde para vedações de rede malha solta, em aço galvanizado e plastificado. Insere-se nas malhas da rede nas extremidades e liga-se ao poste terminal através de arame ou abraçadeiras, permitindo tensionar a rede de forma uniforme. Essencial para obter uma vedação bem esticada e estável. Combina com os postes plastificados verdes.',
    dimensions: 'Comprimento 1,00–2,00 m',
    specs: {
      Material: 'Aço galvanizado + plastificado',
      Cor: 'Verde RAL 6005',
      Tipo: 'Barra de tensão',
      Comprimento: '1,00 – 2,00 m',
      Função: 'Tensionamento da malha',
      Acessórios: 'Ligação ao poste terminal',
    },
    highlights: [
      'Barra de tensão para malha solta',
      'Aço galvanizado + plastificado verde',
      'Permite tensionar a rede uniformemente',
      'Combina com postes verdes',
      'Vedação bem esticada e estável',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },

  // ── Portas Corta-Fogo (41–45) ────────────────────────────────────────────
  {
    id: 41,
    name: 'Porta Corta-Fogo P60 (EI 60) C5 1 Folha',
    originalPrice: 317.0,
    salePrice: 190.95,
    category: 'corta-fogo',
    description:
      'Porta corta-fogo de 1 folha com resistência ao fogo EI2 60 (RF 60) e categoria de uso C5 (200.000 ciclos). Certificada pela norma UNE-EN 1634-1.',
    longDescription:
      'Porta corta-fogo de uma folha fabricada por processo de quinagem sem soldadura, certificada com resistência ao fogo EI2 60 minutos (RF 60) e categoria C5 (200.000 ciclos). Resistência ao fogo testada de acordo com a norma UNE-EN 1634-1. Cor branco RAL 9010. Inclui fechadura, puxador e cilindro metálico. Para uso interno. As medidas incluem moldura. A entrega ao domicílio requer encomenda mínima de duas unidades.',
    dimensions: '800 / 900 / 1000 / 1100 mm x 2070 mm',
    specs: {
      'Tipo de porta': 'Porta corta-fogo articulada',
      Folhas: '1 Folha',
      'Resistência ao fogo': 'EI2 60 (RF 60)',
      'Categoria de uso': 'C5 (200.000 ciclos)',
      'Espessura da folha': '58 mm',
      'Norma': 'UNE-EN 1634-1',
      Material: 'Metal',
      Cor: 'Branco RAL 9010',
      'Mão ou Abertura': 'Direita / esquerda',
      'Escopo de uso': 'Interior / exterior',
    },
    highlights: [
      'Resistência ao fogo EI2 60 minutos',
      'Categoria C5 — 200.000 ciclos',
      'Certificada UNE-EN 1634-1',
      'Cor branco RAL 9010',
      'Inclui fechadura, puxador e cilindro',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 42,
    name: 'Porta Corta-Fogo P60 (EI 60) C5 2 Folhas',
    originalPrice: 704.0,
    salePrice: 563.2,
    category: 'corta-fogo',
    description:
      'Porta corta-fogo de 2 folhas com resistência EI2 60 e categoria C5. Inclui fechadura, alça, cilindro e trava embutida.',
    longDescription:
      'Porta corta-fogo de 2 folhas, projetada para dividir espaços e evitar a propagação do fogo em edifícios residenciais e públicos. Fabricada em duas chapas por dobragem sem soldadura, certificada com resistência ao fogo EI2 60 minutos e categoria C5 (200.000 ciclos). Resistência testada segundo a norma UNE-EN 1634-1. Cor branco RAL 9010. Folha dominante direita. Inclui fechadura, alça, cilindro metálico e trava embutida superior/inferior. Para uso interno/externo. As medidas incluem moldura.',
    dimensions: '800 / 900 / 1000 / 1100 mm x 2070 mm',
    specs: {
      'Tipo de porta': 'Porta corta-fogo articulada',
      Folhas: '2 Folhas',
      'Resistência ao fogo': 'EI2 60 (RF 60)',
      'Categoria de uso': 'C5 (200.000 ciclos)',
      'Espessura da folha': '58 mm',
      'Norma': 'UNE-EN 1634-1',
      Material: 'Metal',
      Cor: 'Branco RAL 9010',
      'Folha dominante': 'Direita',
      'Escopo de uso': 'Interior / exterior',
    },
    highlights: [
      'Resistência ao fogo EI2 60 minutos',
      '2 folhas com folha dominante direita',
      'Categoria C5 — 200.000 ciclos',
      'Inclui trava embutida superior/inferior',
      'Certificada UNE-EN 1634-1',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 43,
    name: 'Porta Corta-Fogo P90 (EI 90) C5 1 Folha',
    originalPrice: 542.5,
    salePrice: 326.55,
    category: 'corta-fogo',
    description:
      'Porta corta-fogo de 1 folha com resistência EI2 90 e categoria C5. Certificada pela norma UNE-EN 1634-1.',
    longDescription:
      'Porta corta-fogo certificada com resistência EI2 90 C5, que passou satisfatoriamente nos testes de resistência ao fogo segundo a norma UNE-EN 1634-1. Categoria C5 (200.000 ciclos). Cor branco RAL 9010. Inclui fechadura, puxador e cilindro metálico. Para uso interno/externo. Medidas com moldura incluída. A entrega ao domicílio requer encomenda mínima de duas unidades.',
    dimensions: '800 / 900 / 1000 / 1100 mm x 2070 mm',
    specs: {
      'Tipo de porta': 'Porta corta-fogo articulada',
      Folhas: '1 Folha',
      'Resistência ao fogo': 'EI2 90 (RF 90)',
      'Categoria de uso': 'C5 (200.000 ciclos)',
      'Espessura da folha': '58 mm',
      'Norma': 'UNE-EN 1634-1',
      Material: 'Metal',
      Cor: 'Branco RAL 9010',
      'Mão ou Abertura': 'Direita / esquerda',
      'Escopo de uso': 'Interior / exterior',
    },
    highlights: [
      'Resistência ao fogo EI2 90 minutos',
      'Categoria C5 — 200.000 ciclos',
      'Certificada UNE-EN 1634-1',
      'Cor branco RAL 9010',
      'Inclui fechadura, puxador e cilindro',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 44,
    name: 'Porta Corta-Fogo RF 90 (EI2 90) C5 2 Folhas',
    originalPrice: 951.0,
    salePrice: 760.8,
    category: 'corta-fogo',
    description:
      'Porta corta-fogo de 2 folhas com resistência EI2 90 e categoria C5. Modelo com duas folhas para grandes vãos.',
    longDescription:
      'Porta corta-fogo EI2 90 C5 de duas folhas, modelo concebido para grandes vãos em edifícios residenciais e públicos. Fabricada por dobragem sem soldadura, certificada com resistência EI2 90 minutos e categoria C5 (200.000 ciclos). Testada segundo a norma UNE-EN 1634-1. Cor branco RAL 9010. Folha dominante direita. Inclui fechadura, alça, cilindro metálico e trava embutida superior/inferior. Para uso interno/externo. Medidas com moldura incluída.',
    dimensions: '800 / 900 / 1000 / 1100 mm x 2070 mm',
    specs: {
      'Tipo de porta': 'Porta corta-fogo articulada',
      Folhas: '2 Folhas',
      'Resistência ao fogo': 'EI2 90 (RF 90)',
      'Categoria de uso': 'C5 (200.000 ciclos)',
      'Espessura da folha': '58 mm',
      'Norma': 'UNE-EN 1634-1',
      Material: 'Metal',
      Cor: 'Branco RAL 9010',
      'Folha dominante': 'Direita',
      'Escopo de uso': 'Interior / exterior',
    },
    highlights: [
      'Resistência ao fogo EI2 90 minutos',
      '2 folhas para grandes vãos',
      'Categoria C5 — 200.000 ciclos',
      'Inclui trava embutida superior/inferior',
      'Certificada UNE-EN 1634-1',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 45,
    name: 'Porta Corta-Fogo P120 (EI 120) C5 1 Folha',
    originalPrice: 755.5,
    salePrice: 454.95,
    category: 'corta-fogo',
    description:
      'Porta corta-fogo de 1 folha com resistência EI2 120 e categoria C5. Acabamento galvanizado. Certificada UNE-EN 1634-1.',
    longDescription:
      'Porta corta-fogo certificada com resistência EI2 120 C5, com 1 folha. Passou satisfatoriamente nos testes de resistência ao fogo segundo a norma UNE-EN 1634-1, com classificação EI2 120. Categoria C5 (200.000 ciclos). Acabamento galvanizado. Inclui fechadura, puxador e cilindro metálico. Para uso interno/externo. Medidas com moldura incluída. A entrega ao domicílio requer encomenda mínima de duas unidades.',
    dimensions: '800 / 900 / 1000 / 1100 mm x 2070 mm',
    specs: {
      'Tipo de porta': 'Porta corta-fogo articulada',
      Folhas: '1 Folha',
      'Resistência ao fogo': 'EI2 120 (RF 120)',
      'Categoria de uso': 'C5 (200.000 ciclos)',
      'Espessura da folha': '58 mm',
      'Norma': 'UNE-EN 1634-1',
      Material: 'Metal',
      Cor: 'Galvanizado',
      'Mão ou Abertura': 'Direita / esquerda',
      'Escopo de uso': 'Interior / exterior',
    },
    highlights: [
      'Resistência ao fogo EI2 120 minutos',
      'Categoria C5 — 200.000 ciclos',
      'Acabamento galvanizado',
      'Certificada UNE-EN 1634-1',
      'Inclui fechadura, puxador e cilindro',
    ],
    application: 'Industrial, Comercial, Residencial',
  },

  // ── Portas de Segurança (46–53) ──────────────────────────────────────────
  {
    id: 46,
    name: 'Porta Segurança Cearco Grau 3 Standard 3 pontos',
    originalPrice: 594.99,
    salePrice: 475.99,
    category: 'seguranca',
    description:
      'Porta de segurança Cearco grau 3, série B4, com fechadura de 3 pontos. Fabricante CEARCO, com 4 dobradiças anti-alavancagem independentes.',
    longDescription:
      'Porta de segurança Cearco grau 3, série B4, com fechadura de 3 pontos. Inclui chapa metálica com 2 acabamentos, 4 dobradiças anti-alavancagem independentes de 4 nós, fechadura de 3 pontos, maçaneta exterior e interior, e olho mágico. Acabamentos em laca ou vinil. Cores disponíveis: sem pintura, branco, verde, marrom, castanha rústica, carvalho, palissandro. Tamanhos: 910 x 2070 mm, 950 x 2070 mm, 1000 x 2070 mm. Produto a pedido, prazo de entrega 45/50 dias.',
    dimensions: '910 / 950 / 1000 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Cores: 'Sem pintura, branco, verde, marrom, castanha rústica, carvalho, palissandro',
      'Tamanhos disponíveis': '910 / 950 / 1000 mm x 2070 mm',
      Ferragens: 'Maçaneta exterior e interior, olho mágico',
      Dobradiças: '4 anti-alavancagem independentes',
    },
    highlights: [
      'Grau de segurança 3 (CEARCO)',
      'Fechadura de 3 pontos',
      '4 dobradiças anti-alavancagem',
      'Várias cores e acabamentos',
      'Produto a pedido (45/50 dias)',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 47,
    name: 'Porta blindada Verona V8 B4 Grau 3',
    originalPrice: 778.99,
    salePrice: 622.99,
    category: 'seguranca',
    description:
      'Porta blindada Verona V8 B4 grau 3, com fechadura de 3 pontos e design moderno com 8 divisões horizontais. Fabricante CEARCO.',
    longDescription:
      'Porta blindada Verona V8 B4 grau 3 da série Standard Moderna. Chapa de metal com 2 acabamentos, 4 dobradiças anti-alavanca independentes de 4 nós, fechadura de 3 pontos. Manípulo, puxador interior e olho mágico telescópico. Acabamentos em laca e vinil. Mantém todo o design vanguardista do Verona original, decorado com 8 divisões horizontais. Cores: branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho. Tamanhos: 910 x 2070 mm e 1000 x 2070 mm. Produto a pedido (45/50 dias).',
    dimensions: '910 / 1000 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Modelo: 'Verona V8',
      Cores: 'Branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho',
      'Tamanhos disponíveis': '910 / 1000 mm x 2070 mm',
      Ferragens: 'Manípulo, puxador interior, olho mágico telescópico',
      Dobradiças: '4 anti-alavanca independentes',
    },
    highlights: [
      'Modelo Verona V8 — 8 divisões horizontais',
      'Grau de segurança 3 (CEARCO B4)',
      'Fechadura de 3 pontos',
      '4 dobradiças anti-alavanca',
      'Acabamentos em laca e vinil',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 48,
    name: 'Porta Segurança Cearco Grau 3 Verona Dupla',
    originalPrice: 1390.0,
    salePrice: 1111.32,
    category: 'seguranca',
    description:
      'Porta de segurança Cearco Verona de folha dupla, grau 3, série B4, com fechadura de 3 pontos. Para vãos largos em entradas principais.',
    longDescription:
      'Porta de segurança Cearco Verona de folha dupla, série B4, grau 3, com fechadura de 3 pontos. Estampagem externa com desenho de quatro linhas horizontais, mantendo o design Verona. Inclui folha metálica com 2 acabamentos, 4 dobradiças anti-alavanca independentes de 4 nós, fechadura de 3 pontos, puxador, pega interior e olho mágico telescópico. Acabamentos em laca e vinil. Medidas: 1280 x 2070 mm. Produto a pedido (45/50 dias).',
    dimensions: '1280 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Modelo: 'Verona Folha Dupla',
      Cores: 'Branco, cinza, marrom, preto',
      'Medidas disponíveis': '1280 x 2070 mm',
      Ferragens: 'Botão, alça, olho mágico',
      Dobradiças: '4 anti-alavancagem independentes',
    },
    highlights: [
      'Folha dupla para vãos largos',
      'Modelo Verona — 4 linhas horizontais',
      'Grau de segurança 3 (CEARCO B4)',
      'Fechadura de 3 pontos',
      '4 dobradiças anti-alavancagem',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 49,
    name: 'Porta Segurança Triana B4 Grau 3 3 Pontos',
    originalPrice: 876.99,
    salePrice: 701.99,
    category: 'seguranca',
    description:
      'Porta de segurança Triana B4 grau 3, com fechadura de 3 pontos, aldrava vitoriana e design rústico. Fabricante CEARCO.',
    longDescription:
      'Porta de segurança Triana B4 grau 3 da série Premium Omega rústica. Folha metálica com 2 acabamentos, 4 dobradiças anti-alavanca independentes de 4 nós, fechadura de 3 pontos. Inclui aldrava vitoriana, alça, olho mágico e pregos. Acabamentos em laca e vinil. Cores: branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho. Produto a pedido (45/50 dias).',
    dimensions: '910 / 1000 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Modelo: 'Triana',
      Cores: 'Branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho',
      'Tamanhos disponíveis': '910 / 1000 mm x 2070 mm',
      Ferragens: 'Aldrava vitoriana, alça, olho mágico, pregos',
      Dobradiças: '4 anti-alavanca independentes',
    },
    highlights: [
      'Modelo Triana — design rústico',
      'Grau de segurança 3 (CEARCO B4)',
      'Fechadura de 3 pontos',
      'Aldrava vitoriana incluída',
      '4 dobradiças anti-alavancagem',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 50,
    name: 'Porta Segurança Triana Dupla B4 Grau 3',
    originalPrice: 1390.0,
    salePrice: 1111.32,
    category: 'seguranca',
    description:
      'Porta de segurança Triana B4 grau 3 de folha dupla, com fechadura de 3 pontos e aldrava vitoriana. Para vãos largos com design rústico.',
    longDescription:
      'Porta de segurança Triana B4 grau 3 de folha dupla, série Premium Omega rústica. Folha metálica com 2 acabamentos, 4 dobradiças anti-alavanca independentes de 4 nós, fechadura de 3 pontos. Inclui aldrava vitoriana, alça, olho mágico e pregos. Acabamentos em laca e vinil. Para vãos largos em entradas principais de moradias e edifícios. Produto a pedido (45/50 dias).',
    dimensions: '1280 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Modelo: 'Triana Folha Dupla',
      Cores: 'Branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho',
      'Medidas disponíveis': '1280 x 2070 mm',
      Ferragens: 'Aldrava vitoriana, alça, olho mágico, pregos',
      Dobradiças: '4 anti-alavancagem independentes',
    },
    highlights: [
      'Triana folha dupla — design rústico',
      'Para vãos largos em entradas',
      'Grau de segurança 3 (CEARCO B4)',
      'Fechadura de 3 pontos',
      'Aldrava vitoriana incluída',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 51,
    name: 'Porta Segurança Cearco Grau 4 Omega Verona V8',
    originalPrice: 1113.0,
    salePrice: 889.99,
    category: 'seguranca',
    description:
      'Porta de segurança Cearco grau 4 Omega Verona V8, com fechadura de 5 pontos, cilindro antibumping e design moderno.',
    longDescription:
      'Porta de segurança Cearco grau 4 Omega Verona V8 da série Premium Omega Modern. Folha metálica com 2 acabamentos, estrutura metálica, fechadura de 5 pontos, dobradiça de segurança com parafusos anti-alavanca. Cilindro antibumping. Interior em madeira lisa. Acessórios padrão cromados: manípulo, alça e olho mágico. Mantém todo o design vanguardista do Verona V8, decorado com 8 divisões horizontais. Inclui quebra-vento e limitador de abertura. Produto a pedido (45/50 dias).',
    dimensions: '910 / 1000 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'Omega (Premium)',
      'Grau de segurança': '4',
      Fechadura: '5 pontos',
      Modelo: 'Verona V8',
      'Cilindro': 'Antibumping',
      Interior: 'Madeira lisa',
      Ferragens: 'Manípulo, alça, olho mágico (cromado)',
      Dobradiças: '3 curtas com anti-alavanca',
    },
    highlights: [
      'Grau de segurança 4 (máximo)',
      'Fechadura de 5 pontos',
      'Cilindro antibumping',
      'Modelo Verona V8 — 8 divisões',
      'Inclui quebra-vento e limitador',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 52,
    name: 'Porta Segurança Cearco Grau 3 Milan 4 Vidros',
    originalPrice: 1140.99,
    salePrice: 912.99,
    category: 'seguranca',
    description:
      'Porta de segurança Cearco Milán grau 3 com 4 vidros, série B4. Design com 4 vitrais para entrada de luz natural.',
    longDescription:
      'Porta de segurança Cearco Milán grau 3, série B4, com 4 vidros. Folha metálica com 2 acabamentos, 4 dobradiças anti-alavanca independentes de 4 nós, fechadura de 3 pontos. Puxador, pega interior e olho mágico telescópico. Acabamentos em laca e vinil. Os 4 vidros permitem entrada de luz natural, mantendo a segurança grau 3. Cores: branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho. Tamanhos: 910 x 2070 mm e 1000 x 2070 mm. Produto a pedido (45/50 dias).',
    dimensions: '910 / 1000 mm x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      'Série de Fabricação': 'B4',
      'Grau de segurança': '3',
      Fechadura: '3 pontos',
      Modelo: 'Milán 4 Vidros',
      Vidros: '4 vidros (luz natural)',
      Cores: 'Branco, cinza, marrom, preto, jacarandá, castanha rústica, carvalho',
      'Tamanhos disponíveis': '910 / 1000 mm x 2070 mm',
      Ferragens: 'Puxador, pega interior, olho mágico telescópico',
    },
    highlights: [
      'Modelo Milán com 4 vidros',
      'Entrada de luz natural',
      'Grau de segurança 3 (CEARCO B4)',
      'Fechadura de 3 pontos',
      'Várias cores e acabamentos',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 53,
    name: 'Porta Acorazada Cearco Provenzal',
    originalPrice: 651.0,
    salePrice: 520.45,
    category: 'seguranca',
    description:
      'Porta acorazada Cearco Provenzal, com folha, caixilho aparafusado, fechadura, 4 dobradiças curtas, maçaneta, puxador e olho mágico.',
    longDescription:
      'Porta acorazada Cearco Provenzal (910 x 2070 mm). Composta por folha, caixilho aparafusado, fechadura, 4 dobradiças curtas, maçaneta, puxador e olho mágico. A folha metálica é construída em duas peças: a frente com decoração estampada, em chapa de aço laminada e galvanizada (espessura 1 mm, qualidade DX-54); o verso sem estampagem em qualidade DX-51. Interior preenchido com poliuretano microexpandido (tipologia M-3) injetado a alta pressão. Caixilho metálico em chapa de aço laminado. Produto a pedido, prazo 45/50 dias.',
    dimensions: '910 x 2070 mm',
    specs: {
      Fabricante: 'CEARCO',
      Modelo: 'Provenzal',
      Folha: 'Chapa de aço galvanizado DX-54 (frente) / DX-51 (verso)',
      'Espessura da chapa': '1 mm',
      Preenchimento: 'Poliuretano microexpandido M-3',
      Caixilho: 'Chapa de aço laminado aparafusado',
      Dobradiças: '4 curtas',
      Acessórios: 'Maçaneta, puxador, olho mágico',
    },
    highlights: [
      'Folha dupla em chapa DX-54/DX-51',
      'Preenchimento em poliuretano M-3',
      'Caixilho aparafusado (maior segurança)',
      '4 dobradiças + olho mágico incluídos',
      'Produto a pedido (45/50 dias)',
    ],
    application: 'Residencial, Comercial',
  },

  // ── Portões de Rede (54–63) ──────────────────────────────────────────────
  {
    id: 54,
    name: 'Portão Rede Verde Premium 1m',
    originalPrice: 287.0,
    salePrice: 172.8,
    category: 'portoes-rede',
    description:
      'Portão de vedação em malha metálica eletrossoldada plastificada verde, 1 folha, com altura de 1 m. Inclui hasp para cadeado.',
    longDescription:
      'Portão de metal para exteriores em malha eletrossoldada plana revestida a verde. Incorpora moldura de perfil quadrado de 40 x 40 x 1,5 mm e poste de 60 x 40 x 2 mm. Abertura reversível (esquerda ou direita). Hasp para cadeado embutido (cadeado não incluído) e bloqueio de alça opcional. Fabricação própria de alta qualidade. Medidas totais (com postes) informadas. Disponível em várias larguras (1,00 / 1,20 / 1,50 / 1,80 / 2,00 m de altura de folha).',
    dimensions: '1050 mm largura x 1000 mm altura',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde (RAL 6005)',
      Folhas: '1 folha',
      'Perfil do quadro': '40 x 40 x 1,5 mm',
      'Perfil do poste': '60 x 40 x 2,00 mm',
      Malhazo: '100 x 50 x 4 mm',
      Abertura: 'Reversível, esquerda ou direita',
      'Escopo de uso': 'Vedações, jardim, piscina',
    },
    highlights: [
      'Malha eletrossoldada plastificada verde',
      'Quadro 40 x 40 mm + poste 60 x 40 mm',
      'Abertura reversível (esq./dir.)',
      'Hasp para cadeado embutido',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 55,
    name: 'Portão Rede Branca Premium 1m',
    originalPrice: 287.0,
    salePrice: 172.8,
    category: 'portoes-rede',
    description:
      'Portão de vedação em malha metálica eletrossoldada plastificada branca, 1 folha, com altura de 1 m. Inclui hasp para cadeado.',
    longDescription:
      'Portão exterior de malha eletrossoldada branca, ideal como porta de entrada para vedação de jardim, pátio ou terraço. Incorpora moldura de perfil quadrado de 40 x 40 x 1,5 mm e poste de 60 x 40 x 2 mm. Abertura reversível (esquerda ou direita). Hasp para cadeado embutido (cadeado não incluído) e bloqueio de alça opcional. Fabricação própria de alta qualidade.',
    dimensions: '1050 mm largura x 1000 mm altura',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Branco (RAL 9016)',
      Folhas: '1 folha',
      'Perfil do quadro': '40 x 40 x 1,5 mm',
      'Perfil do poste': '60 x 40 x 2,00 mm',
      Malhazo: '100 x 50 x 4 mm',
      Abertura: 'Reversível, esquerda ou direita',
      'Escopo de uso': 'Vedações, jardim, piscina',
    },
    highlights: [
      'Malha eletrossoldada plastificada branca',
      'Quadro 40 x 40 mm + poste 60 x 40 mm',
      'Abertura reversível (esq./dir.)',
      'Hasp para cadeado embutido',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 56,
    name: 'Portão Rede Gris Antracita Premium 1m',
    originalPrice: 287.0,
    salePrice: 172.8,
    category: 'portoes-rede',
    description:
      'Portão de vedação em malha metálica eletrossoldada plastificada cinza antracite, 1 folha, com altura de 1 m.',
    longDescription:
      'Portão de malha metálica ou porta de malha eletrossoldada cinza antracite (RAL 7016), ideal para entrada de vedação em jardim, pátio ou logradouro. Incorpora moldura de perfil quadrado de 40 x 40 x 1,5 mm e poste de 60 x 40 x 2 mm. Abertura reversível (esquerda ou direita). Hasp para cadeado embutido (cadeado não incluído) e bloqueio de alça opcional. Fabricação própria de alta qualidade.',
    dimensions: '1050 mm largura x 1000 mm altura',
    specs: {
      Material: 'Aço',
      Cor: 'Cinza antracite (RAL 7016)',
      Folhas: '1 folha',
      'Perfil do quadro': '40 x 40 x 1,5 mm',
      'Perfil do poste': '60 x 40 x 2,00 mm',
      Malhazo: '100 x 50 x 4 mm',
      Abertura: 'Reversível, esquerda ou direita',
      'Escopo de uso': 'Portão para vedações, jardim e piscina',
    },
    highlights: [
      'Malha eletrossoldada cinza antracite',
      'Quadro 40 x 40 mm + poste 60 x 40 mm',
      'Abertura reversível (esq./dir.)',
      'Hasp para cadeado embutido',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 57,
    name: 'Portão Rede Galvanizada 1m',
    originalPrice: 287.0,
    salePrice: 172.8,
    category: 'portoes-rede',
    description:
      'Portão de vedação em malha metálica galvanizada, 1 folha, com altura de 1 m. Acabamento galvanizado para máxima durabilidade.',
    longDescription:
      'Portão de rede para exteriores em acabamento galvanizado, com abertura reversível. Porta manual em malha metálica resistente para uso exterior. Incorpora moldura de perfil quadrado de 40 x 40 mm e poste de 60 x 40 mm. Hasp para cadeado embutido (cadeado não incluído) e bloqueio de alça opcional. Fabricação própria de alta qualidade.',
    dimensions: '1050 mm largura x 1000 mm altura',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Folhas: '1 folha',
      'Perfil do quadro': '40 x 40 x 1,5 mm',
      'Perfil do poste': '60 x 40 x 2,00 mm',
      Malhazo: '100 x 50 x 4 mm',
      Abertura: 'Reversível, esquerda ou direita',
      'Escopo de uso': 'Vedações, jardim, piscina',
    },
    highlights: [
      'Acabamento galvanizado (máxima durabilidade)',
      'Quadro 40 x 40 mm + poste 60 x 40 mm',
      'Abertura reversível (esq./dir.)',
      'Hasp para cadeado embutido',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 58,
    name: 'Portão Rede Ondulado Galvanizada 0.90x1.00m',
    originalPrice: 424.0,
    salePrice: 255.2,
    category: 'portoes-rede',
    description:
      'Portão de malha ondulada galvanizada de 1 folha, 0,90 x 1,00 m, para vedações de torção simples e rede eletrossoldada.',
    longDescription:
      'Portão de malha ondulada com acabamento galvanizado, composto por uma folha giratória formada numa moldura de perfil metálico eletrossoldado. Adequado para vedações de rede de torção simples e rede eletrossoldada. Modelo Pro de uma folha com abertura à direita. Fabricação própria de alta qualidade. As medições relatadas podem variar significativamente.',
    dimensions: '0,90 x 1,00 m',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Folhas: '1 folha',
      Modelo: 'Pro (ondulada)',
      Abertura: 'À direita',
      'Escopo de uso': 'Vedações de torção simples e eletrossoldada',
    },
    highlights: [
      'Malha ondulada galvanizada',
      '1 folha giratória',
      '0,90 x 1,00 m',
      'Para torção simples e eletrossoldada',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 59,
    name: 'Portão Rede Ondulado Verde',
    originalPrice: 441.0,
    salePrice: 265.6,
    category: 'portoes-rede',
    description:
      'Portão de malha ondulada plastificada verde de 1 folha, para vedações de torção simples e rede eletrossoldada.',
    longDescription:
      'Portão de malha laminada verde para cercas de metal com rede eletrossoldada de torção simples ou eletrossoldada. Porta de batente de folha única com moldura de perfil metálico eletrossoldado. Adequado para vedações de torção simples e rede eletrossoldada. Modelo Pro de uma folha. Fabricação própria de alta qualidade.',
    dimensions: '0,90 x 1,00 m',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde (RAL 6005)',
      Folhas: '1 folha',
      Modelo: 'Pro (ondulada)',
      Abertura: 'Reversível',
      'Escopo de uso': 'Vedações de torção simples e eletrossoldada',
    },
    highlights: [
      'Malha ondulada plastificada verde',
      '1 folha giratória',
      'Combina com painéis verdes',
      'Para torção simples e eletrossoldada',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 60,
    name: 'Portão Rede Ligeira Verde 2 Folhas',
    originalPrice: 756.0,
    salePrice: 604.8,
    category: 'portoes-rede',
    description:
      'Portão de rede metálica plastificada verde, 2 folhas, modelo Basic. Para vedações com painéis.',
    longDescription:
      'Portão de rede metálica plastificada na cor verde, com 2 folhas de batente formadas em aro de perfil metálico. Modelo Basic de 2 folhas. Para vedações com painéis. Inclui fecho para cadeado (cadeado não incluído) e fechadura com alça opcional. Fabricação própria de alta qualidade. As medidas relatadas podem variar significativamente.',
    dimensions: '2 folhas — várias larguras',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Verde (RAL 6005)',
      Folhas: '2 folhas',
      Modelo: 'Basic (ligeira)',
      Fecho: 'Para cadeado (não incluído)',
      'Escopo de uso': 'Vedações com painéis',
    },
    highlights: [
      'Portão de 2 folhas plastificado verde',
      'Modelo Basic ligeiro',
      'Para vedações com painéis',
      'Fecho para cadeado incluído',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 61,
    name: 'Portão Rede Ligeira Branca 2 Folhas',
    originalPrice: 757.0,
    salePrice: 605.3,
    category: 'portoes-rede',
    description:
      'Portão de malha metálica ligeira plastificada branca, 2 folhas, para vedações com painel de vedação.',
    longDescription:
      'Portão de malha metálica ou portão de rede ligeira plastificado na cor branca, com 2 folhas de batente formadas em aro de perfil metálico. Para vedações com painel de vedação. Inclui fecho para cadeado (cadeado não incluído) e fechadura com alça opcional. Fabricação própria de alta qualidade. As medições relatadas podem variar significativamente.',
    dimensions: '2 folhas — várias larguras',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Branco (RAL 9016)',
      Folhas: '2 folhas',
      Modelo: 'Basic (ligeira)',
      Fecho: 'Para cadeado (não incluído)',
      'Escopo de uso': 'Vedações com painéis',
    },
    highlights: [
      'Portão de 2 folhas plastificado branco',
      'Modelo Basic ligeiro',
      'Para vedações com painéis',
      'Fecho para cadeado incluído',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 62,
    name: 'Portão Rede Ligeira Cinza Escuro 2 Folhas',
    originalPrice: 818.0,
    salePrice: 653.75,
    category: 'portoes-rede',
    description:
      'Portão de rede metálica plastificada cinza escuro (RAL 7016), 2 folhas, para vedações com painéis Hercules.',
    longDescription:
      'Portão de rede metálica plastificada em RAL 7016 (cinza escuro/antracite), com 2 folhas de batente formadas em aro de perfil metálico. Para vedações com painel Hercules. Modelo Basic de 2 folhas. Inclui fecho para cadeado (cadeado não incluído) e fechadura com alça opcional. Fabricação própria de alta qualidade.',
    dimensions: '2 folhas — várias larguras',
    specs: {
      Material: 'Aço galvanizado + PVC',
      Cor: 'Cinza escuro (RAL 7016)',
      Folhas: '2 folhas',
      Modelo: 'Basic (ligeira)',
      Fecho: 'Para cadeado (não incluído)',
      'Escopo de uso': 'Vedações com painel Hercules',
    },
    highlights: [
      'Portão de 2 folhas cinza antracite',
      'Modelo Basic ligeiro',
      'Combina com painéis Hercules antracite',
      'Fecho para cadeado incluído',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 63,
    name: 'Portão Malha Galvanizada Luz 2 Folhas',
    originalPrice: 636.0,
    salePrice: 508.05,
    category: 'portoes-rede',
    description:
      'Portão de rede galvanizado de 2 folhas, modelo Basic, para vedações com painéis. Acabamento galvanizado.',
    longDescription:
      'Portão de rede galvanizado com 2 folhas em acabamento galvanizado, modelo Basic. Solução para vedações com painéis. Medidas informadas correspondem às medidas da folha. Abertura à direita. Inclui fecho para cadeado (cadeado não incluído) e fechadura com alça opcional. Fabricação própria de alta qualidade.',
    dimensions: '2 folhas — várias larguras',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Folhas: '2 folhas',
      Modelo: 'Basic (ligeira)',
      Abertura: 'À direita',
      Fecho: 'Para cadeado (não incluído)',
      'Escopo de uso': 'Vedações com painéis',
    },
    highlights: [
      'Portão de 2 folhas galvanizado',
      'Modelo Basic ligeiro',
      'Acabamento galvanizado durável',
      'Fecho para cadeado incluído',
      'Fabricação própria de alta qualidade',
    ],
    application: 'Residencial, Industrial, Comercial',
  },

  // ── Portas Multiuso (64–68) ──────────────────────────────────────────────
  {
    id: 64,
    name: 'Porta Multiuso Branca',
    originalPrice: 182.5,
    salePrice: 109.8,
    category: 'multiuso',
    description:
      'Porta multiuso em chapa de aço lacada branca, ideal para arrecadações, garagens, caves e divisórias interiores.',
    longDescription:
      'Porta multiuso em chapa de aço lacada na cor branca, concebida para arrecadações, garagens, caves, armazéns e divisórias interiores de utilização moderada. Estrutura robusta em chapa de aço galvanizado com pintura lacada branca, que confere bom acabamento estético e resistência à corrosão. Inclui fechadura com cilindro e maçaneta. Montagem em batente.',
    dimensions: '800 / 900 mm x 2000 mm',
    specs: {
      Material: 'Aço lacado',
      Cor: 'Branco',
      Folhas: '1 folha',
      Acabamento: 'Laca branca',
      Fechadura: 'Com cilindro e maçaneta',
      'Âmbito de aplicação': 'Arrecadações, garagens, caves',
    },
    highlights: [
      'Chapa de aço lacada branca',
      'Robusta e resistente',
      'Ideal para arrecadações e divisórias',
      'Inclui fechadura com cilindro',
      'Fácil montagem em batente',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 65,
    name: 'Porta Multiuso Grade',
    originalPrice: 196.0,
    salePrice: 117.95,
    category: 'multiuso',
    description:
      'Porta multiuso com grade de ventilação em chapa de aço, ideal para arrecadações e zonas que requeiram ventilação.',
    longDescription:
      'Porta multiuso com grade de ventilação integrada, em chapa de aço. A grade permite a circulação de ar, sendo ideal para arrecadações, casas das máquinas, quartos técnicos e zonas que requeiram ventilação contínua sem perda de segurança. Estrutura robusta em chapa de aço com pintura lacada. Inclui fechadura com cilindro e maçaneta.',
    dimensions: '800 / 900 mm x 2000 mm',
    specs: {
      Material: 'Aço lacado',
      Cor: 'Branco',
      Folhas: '1 folha',
      Característica: 'Grade de ventilação integrada',
      Fechadura: 'Com cilindro e maçaneta',
      'Âmbito de aplicação': 'Arrecadações, casas das máquinas',
    },
    highlights: [
      'Grade de ventilação integrada',
      'Permite circulação de ar',
      'Chapa de aço robusta',
      'Ideal para arrecadações técnicas',
      'Inclui fechadura com cilindro',
    ],
    application: 'Residencial, Industrial, Comercial',
  },
  {
    id: 66,
    name: 'Porta Multiuso Duas Folhas com Grade',
    originalPrice: 746.0,
    salePrice: 449.3,
    category: 'multiuso',
    description:
      'Porta multiuso de 2 folhas com grade de ventilação, em chapa de aço, para vãos largos em arrecadações e armazéns.',
    longDescription:
      'Porta multiuso de 2 folhas com grade de ventilação, em chapa de aço, concebida para vãos largos em arrecadações, armazéns, garagens e zonas técnicas. As 2 folhas permitem abrir toda a largura do vão para passagem de mercadorias ou equipamentos. A grade de ventilação garante circulação de ar. Inclui fechadura com cilindro e maçaneta, e trincos embutidos para a folha passiva.',
    dimensions: '1200 / 1500 mm x 2000 mm',
    specs: {
      Material: 'Aço lacado',
      Cor: 'Branco',
      Folhas: '2 folhas',
      Característica: 'Grade de ventilação integrada',
      Fechadura: 'Com cilindro, maçaneta e trincos embutidos',
      'Âmbito de aplicação': 'Armazéns, garagens, vãos largos',
    },
    highlights: [
      '2 folhas para vãos largos',
      'Grade de ventilação integrada',
      'Passagem de mercadorias/equipamentos',
      'Trincos embutidos para folha passiva',
      'Chapa de aço robusta',
    ],
    application: 'Industrial, Comercial, Residencial',
  },
  {
    id: 67,
    name: 'Porta Trastero Galvanizada',
    originalPrice: 154.0,
    salePrice: 92.5,
    category: 'multiuso',
    description:
      'Porta de arrecadação (trastero) galvanizada, em chapa de aço galvanizado. Resistente à humidade e corrosão.',
    longDescription:
      'Porta de arrecadação (trastero) em chapa de aço galvanizado, concebida para zonas com humidade como caves, garagens, armazéns e arrecadações exteriores. O acabamento galvanizado garante elevada resistência à corrosão e à oxidação. Estrutura robusta com fechadura de embutir com cilindro e maçaneta. Montagem em batente.',
    dimensions: '800 / 900 mm x 2000 mm',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Folhas: '1 folha',
      Acabamento: 'Galvanizado',
      Fechadura: 'De embutir com cilindro e maçaneta',
      'Âmbito de aplicação': 'Caves, garagens, arrecadações',
    },
    highlights: [
      'Aço galvanizado (resistente à humidade)',
      'Ideal para caves e arrecadações exteriores',
      'Elevada resistência à corrosão',
      'Inclui fechadura de embutir',
      'Estrutura robusta',
    ],
    application: 'Residencial, Industrial',
  },
  {
    id: 68,
    name: 'Porta Trastero Galvanizada com Grade',
    originalPrice: 170.5,
    salePrice: 102.7,
    category: 'multiuso',
    description:
      'Porta de arrecadação (trastero) galvanizada com grade de ventilação, em chapa de aço galvanizado.',
    longDescription:
      'Porta de arrecadação (trastero) galvanizada com grade de ventilação integrada, em chapa de aço galvanizado. Combina a resistência à humidade do galvanizado com a ventilação proporcionada pela grade, sendo ideal para arrecadações, casas das máquinas, quartos técnicos e zonas com necessidade de ventilação contínua. Inclui fechadura de embutir com cilindro e maçaneta.',
    dimensions: '800 / 900 mm x 2000 mm',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Folhas: '1 folha',
      Característica: 'Grade de ventilação integrada',
      Fechadura: 'De embutir com cilindro e maçaneta',
      'Âmbito de aplicação': 'Arrecadações, casas das máquinas',
    },
    highlights: [
      'Aço galvanizado + grade de ventilação',
      'Resistente à humidade',
      'Ventilação contínua',
      'Ideal para quartos técnicos',
      'Inclui fechadura de embutir',
    ],
    application: 'Residencial, Industrial',
  },

  // ── Portas de Correr (69–72) ─────────────────────────────────────────────
  {
    id: 69,
    name: 'Estrutura Porta de Correr Orchidea Basic',
    originalPrice: 412.0,
    salePrice: 248.05,
    category: 'correr',
    description:
      'Estrutura (casoneto) para porta de correr embutida modelo Orquídea Basic, para paredes rebocadas. Em armação de metal com moldura de madeira interior.',
    longDescription:
      'Casoneto (carcaça) para porta de correr embutida, modelo Orquídea Basic Simples. Concebida para paredes rebocadas, é formada por uma armação de metal com fretwork negativo e moldura de madeira interior. Disponibilidade de envio imediato para a maioria das medidas; 3 semanas para espessura de 10,5 cm e medidas especiais (70x250, 70x260, 70x270, 80x250, 80x260, 80x270, 90x250, 90x260, 90x270, 100x250, 100x260 e 100x270 cm).',
    dimensions: 'Vários (até 100 x 270 cm)',
    specs: {
      Cara: 'Carcaça para portas de correr',
      Modelo: 'Orquídea Basic Simples',
      'Específico para': 'Paredes rebocadas',
      Material: 'Armação de metal + moldura de madeira interior',
      Espessura: '10,5 cm (médida especial)',
      'Disponibilidade': 'Imediato (3 semanas para especiais)',
    },
    highlights: [
      'Para porta de correr embutida',
      'Modelo Orquídea Basic Simples',
      'Armação de metal + madeira interior',
      'Para paredes rebocadas',
      'Disponibilidade imediata',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 70,
    name: 'Casoneto Orchidea PYL Simples',
    originalPrice: 412.0,
    salePrice: 248.05,
    category: 'correr',
    description:
      'Casoneto Orchidea PYL Simples para porta de correr embutida, em armação de metal com moldura de madeira interior.',
    longDescription:
      'Casoneto Orchidea PYL (porta de correr de uma folha) Simples, para instalação embutida em parede rebocada. Formado por armação de metal com fretwork negativo e moldura de madeira interior. Permite instalar uma porta de correr de uma folha que fica oculta na parede, libertando espaço útil no quarto. Disponível em várias medidas padrão.',
    dimensions: 'Vários (até 100 x 270 cm)',
    specs: {
      Cara: 'Carcaça para porta de correr',
      Modelo: 'Orchidea PYL Simples (1 folha)',
      'Específico para': 'Paredes rebocadas',
      Material: 'Armação de metal + moldura de madeira interior',
      Folhas: '1 folha de correr',
      Instalação: 'Embutida na parede',
    },
    highlights: [
      'Casoneto para 1 folha de correr',
      'Modelo Orchidea PYL Simples',
      'Porta oculta na parede (liberta espaço)',
      'Armação de metal + madeira',
      'Para paredes rebocadas',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 71,
    name: 'Casoneto Orchidea PYL Duplo',
    originalPrice: 638.0,
    salePrice: 510.3,
    category: 'correr',
    description:
      'Casoneto Orchidea PYL Duplo para 2 portas de correr embutidas, em armação de metal com moldura de madeira interior.',
    longDescription:
      'Casoneto Orchidea PYL Duplo, para instalação de duas portas de correr embutidas que se cruzam na parede. Formado por armação de metal com fretwork negativo e moldura de madeira interior. Ideal para vãos largos onde duas folhas de correr permitem uma abertura ampla mantendo-as ocultas na parede. Disponível em várias medidas.',
    dimensions: 'Vários (até 200 x 270 cm)',
    specs: {
      Cara: 'Carcaça para porta de correr',
      Modelo: 'Orchidea PYL Duplo (2 folhas)',
      'Específico para': 'Paredes rebocadas',
      Material: 'Armação de metal + moldura de madeira interior',
      Folhas: '2 folhas de correr',
      Instalação: 'Embutida na parede',
    },
    highlights: [
      'Casoneto para 2 folhas de correr',
      'Folhas cruzam na parede (vãos largos)',
      'Modelo Orchidea PYL Duplo',
      'Armação de metal + madeira',
      'Para paredes rebocadas',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 72,
    name: 'Cassete Porta de Correr Reboco',
    originalPrice: 383.5,
    salePrice: 230.75,
    category: 'correr',
    description:
      'Cassete para porta de correr embutida em parede rebocada, em armação de metal com moldura de madeira interior.',
    longDescription:
      'Cassete para porta de correr embutida, concebido para paredes rebocadas. A estrutura metálica integra-se na parede durante o reboco, permitindo que a porta de correr fique totalmente oculta. Inclui fretwork negativo e moldura de madeira interior para acabamento. Solução ideal para poupar espaço em divisórias interiores.',
    dimensions: 'Vários (até 100 x 270 cm)',
    specs: {
      Cara: 'Cassete para porta de correr',
      'Específico para': 'Paredes rebocadas',
      Material: 'Armação de metal + moldura de madeira interior',
      Instalação: 'Embutida na parede (durante reboco)',
      Acabamento: 'Pronto a rebocar/pintar',
    },
    highlights: [
      'Cassete embutido em parede rebocada',
      'Porta totalmente oculta',
      'Estrutura metálica + madeira interior',
      'Poupa espaço nas divisórias',
      'Fácil acabamento (rebocar/pintar)',
    ],
    application: 'Residencial, Comercial',
  },

  // ── Tramex (73) ───────────────────────────────────────────────────────────
  {
    id: 73,
    name: 'Gradil Tramex',
    originalPrice: 26.5,
    salePrice: 15.9,
    category: 'tramex',
    description:
      'Gradil metálico Tramex em aço galvanizado a quente, com barra portante de 30 x 2 mm. Ideal para plataformas, pisos e passarelas de uso pedonal.',
    longDescription:
      'Gradil metálico Tramex fabricado em aço galvanizado a quente, com barra portante de apoio de 30 x 2 mm e barras de ligação que garantem resistência e durabilidade. Ideal para suportar cargas pesadas em aplicações de construção e industriais — plataformas, pisos, passarelas, escadas, corrimãos e cercas. Permite a passagem da luz e do ar e evita a acumulação de líquidos e gases. Fácil de instalar, económico e resistente à corrosão e a fatores climáticos adversos.',
    dimensions: '200 / 250 / 300 / 500 / 1000 / 2000 x 1000 mm',
    specs: {
      'Tipo de produto': 'Gradil metálico Tramex',
      Material: 'Aço galvanizado a quente',
      'Específico para': 'Uso pedonal',
      Medidas: '200 / 250 / 300 / 500 / 1000 / 2000 x 1000 mm',
      'Grade de malha': '30 x 30 mm',
      'Barra portante': '30 x 2 mm',
      Separador: '5 mm',
    },
    highlights: [
      'Aço galvanizado a quente',
      'Barra portante 30 x 2 mm',
      'Malha 30 x 30 mm',
      'Permite passagem de luz e ar',
      'Para plataformas, escadas e passarelas',
    ],
    application: 'Industrial, Construção',
  },

  // ── Acessórios (74–84) ────────────────────────────────────────────────────
  {
    id: 74,
    name: 'Barra Antipânico',
    originalPrice: 118.0,
    salePrice: 118.0,
    category: 'acessorios',
    description:
      'Barra antipânico homologada para portas corta-fogo, em aço tubular. Para saídas de emergência de 1 ou 2 folhas.',
    longDescription:
      'Barra antipânico homologada, em aço tubular, para instalação em saídas de emergência e portas corta-fogo de 1 ou 2 folhas. Para folha dominante, inclui barra antipânico e trava com fuso bipartido. Para folha passiva, inclui barra antipânico e fuso bipartido. Fabricação testada para cumprir todos os requisitos da norma EN 1125. Marcação CE.',
    dimensions: 'Para folhas até 1100 mm',
    specs: {
      Material: 'Aço tubular',
      Tipo: 'Barra antipânico',
      'Aplicação': 'Portas corta-fogo 1/2 folhas',
      Norma: 'EN 1125',
      Certificação: 'Marcagem CE',
      Conteúdo: 'Barra + trava com fuso bipartido',
    },
    highlights: [
      'Homologada para portas corta-fogo',
      'Cumpre norma EN 1125',
      'Marcagem CE',
      'Para 1 ou 2 folhas',
      'Inclui trava com fuso bipartido',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 75,
    name: 'Fechadura Antitaladro',
    originalPrice: 51.99,
    salePrice: 41.99,
    category: 'acessorios',
    description:
      'Fechadura antitaladro (antibumping) com cilindro de segurança reforçado, para portas blindadas e de segurança.',
    longDescription:
      'Fechadura antitaladro (antibumping) com cilindro de segurança reforçado, concebida para portas blindadas e de segurança. O cilindro possui proteção anti-perfuração e anti-bumping, oferecendo elevada resistência contra tentativas de arrombamento. Inclui par de chaves. Compatível com portas de segurança grau 3 e 4.',
    dimensions: 'Cilindro standard europeu',
    specs: {
      Tipo: 'Fechadura antitaladro (antibumping)',
      Material: 'Aço reforçado',
      'Proteção': 'Anti-perfuração + anti-bumping',
      Cilindro: 'Europeu standard',
      Chaves: 'Par de chaves incluído',
      'Compatibilidade': 'Portas de segurança grau 3 e 4',
    },
    highlights: [
      'Cilindro anti-perfuração',
      'Proteção anti-bumping',
      'Elevada resistência ao arrombamento',
      'Par de chaves incluído',
      'Para portas grau 3 e 4',
    ],
    application: 'Residencial, Comercial',
  },
  {
    id: 76,
    name: 'Cierrapuertas Standard',
    originalPrice: 49.5,
    salePrice: 49.5,
    category: 'acessorios',
    description:
      'Mola aérea (fecha-portas) standard para portas corta-fogo, com braço articulado. Marcação CE segundo UNE-EN 1154.',
    longDescription:
      'Fecha-portas (mola aérea) standard para portas corta-fogo de batente com 1 ou 2 folhas. Dispositivo aéreo de fecho automático composto por um braço articulado. Disponível com braço para portas com largura de folha até 1100 mm. Marcação CE e fabricação testada para cumprir os requisitos da norma EN 1154, de acordo com o Código Técnico de Edificação (CTE).',
    dimensions: 'Para folhas até 1100 mm',
    specs: {
      Tipo: 'Mola aérea / fecha-portas',
      Material: 'Metal',
      Modelo: 'Standard',
      'Aplicação': 'Portas corta-fogo 1/2 folhas',
      'Largura máxima da folha': '1100 mm',
      Norma: 'UNE-EN 1154',
      Certificação: 'Marcagem CE',
    },
    highlights: [
      'Uso obrigatório em portas corta-fogo',
      'Marcagem CE (EN 1154)',
      'Para folhas até 1100 mm',
      'Braço articulado incluído',
      'Cumpre o CTE',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 77,
    name: 'Cierrapuertas Premium',
    originalPrice: 106.5,
    salePrice: 106.5,
    category: 'acessorios',
    description:
      'Mola aérea (fecha-portas) premium para portas corta-fogo, com regulação de velocidade e força. Marcação CE.',
    longDescription:
      'Fecha-portas (mola aérea) premium para portas corta-fogo de batente com 1 ou 2 folhas. Versão premium com regulação de velocidade de fecho e de retardo, ideal para portas de utilização intensiva. Dispositivo aéreo de fecho automático com braço articulado. Marcação CE e fabricação testada para cumprir os requisitos da norma EN 1154, de acordo com o CTE.',
    dimensions: 'Para folhas até 1100 mm',
    specs: {
      Tipo: 'Mola aérea / fecha-portas',
      Material: 'Metal',
      Modelo: 'Premium',
      'Aplicação': 'Portas corta-fogo 1/2 folhas',
      Regulação: 'Velocidade e retardo de fecho',
      Norma: 'UNE-EN 1154',
      Certificação: 'Marcagem CE',
    },
    highlights: [
      'Versão premium regulável',
      'Velocidade e retardo de fecho ajustáveis',
      'Para utilização intensiva',
      'Marcagem CE (EN 1154)',
      'Cumpre o CTE',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 78,
    name: 'Vigia Corta-Fogo',
    originalPrice: 327.0,
    salePrice: 327.0,
    category: 'acessorios',
    description:
      'Vigia (olho de boi) em vidro pirex para porta corta-fogo, com classificação EI 60 e diâmetro de 250 mm. Marcagem CE.',
    longDescription:
      'Visor de vidro (olho de boi) para porta corta-fogo, aprovado segundo o CTE com classificação de resistência ao fogo EI 60 e marcagem CE segundo a norma UNE-EN 14449 sobre vidro para construção. Possui elevada dilatação graças às juntas intumescentes que vedam os vãos da janela em caso de incêndio, evitando a fuga de chamas, gases e fumos. Fabricado em vidro redondo à prova de fogo com diâmetro de 250 mm e vidro pirex de 23 mm.',
    dimensions: 'Ø 250 mm (vidro pirex 23 mm)',
    specs: {
      Tipo: 'Visor / olho de boi',
      Material: 'Vidro pirex + juntas intumescentes',
      'Resistência ao fogo': 'EI 60',
      Diâmetro: '250 mm',
      'Espessura do vidro': '23 mm (pirex)',
      Norma: 'UNE-EN 14449',
      Certificação: 'Marcagem CE',
    },
    highlights: [
      'Resistência ao fogo EI 60',
      'Vidro pirex de 23 mm',
      'Juntas intumescentes (vedam chamas/gases)',
      'Marcagem CE (UNE-EN 14449)',
      'Aprovado pelo CTE',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 79,
    name: 'Eletroímã',
    originalPrice: 129.5,
    salePrice: 129.5,
    category: 'acessorios',
    description:
      'Eletroímã (retentor magnético) para portas corta-fogo que devem permanecer abertas. Com interruptor e placa articulada.',
    longDescription:
      'Eletroíman ou retentor magnético para portas corta-fogo que devem permanecer abertas. Composto por uma caixa plástica removível para facilitar a instalação na parede, com interruptor na parte superior e placa de ancoragem articulada. Os retentores ou eletroímãs mantêm as portas corta-fogo abertas graças a uma parte móvel instalada na porta e uma parte fixa na parede. Em caso de incêndio, o sistema liberta a porta permitindo o seu fecho automático. Aprovado segundo o CTE.',
    dimensions: 'Caixa standard',
    specs: {
      Tipo: 'Eletroímã / retentor magnético',
      Material: 'Caixa plástica + núcleo magnético',
      'Aplicação': 'Portas corta-fogo (manter abertas)',
      Componentes: 'Interruptor + placa articulada',
      Funcionamento: 'Liberta a porta em caso de incêndio',
      Certificação: 'Aprovado pelo CTE',
    },
    highlights: [
      'Mantém portas corta-fogo abertas',
      'Liberta automaticamente em incêndio',
      'Com interruptor e placa articulada',
      'Caixa plástica removível',
      'Aprovado pelo CTE',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 80,
    name: 'Seletor de Fecho',
    originalPrice: 92.0,
    salePrice: 92.0,
    category: 'acessorios',
    description:
      'Seletor de fecho CISA longitudinal para portas corta-fogo de 2 folhas (até 900 mm). Em aço cromado. Marcagem CE.',
    longDescription:
      'Seletor de fecho CISA longitudinal para portas corta-fogo de duas folhas, em aço cromado, sem extensão. Acessório obrigatório para portas corta-fogo de 2 folhas segundo as normas CTE e UNE-EN 1158. Garante a ordem correta de fecho das folhas: a folha passiva fecha primeiro, permitindo que a folha dominante encaixe e vede corretamente. Comprimento standard. Marcagem CE segundo a norma UNE-EN 1158:2003.',
    dimensions: 'Para folhas até 900 mm',
    specs: {
      Tipo: 'Seletor de fecho',
      Marca: 'CISA',
      Material: 'Aço cromado',
      Modelo: 'Longitudinal (sem extensão)',
      'Aplicação': 'Portas corta-fogo de 2 folhas',
      'Largura máxima da folha': '900 mm',
      Norma: 'UNE-EN 1158:2003',
      Certificação: 'Marcagem CE',
    },
    highlights: [
      'Obrigatório em portas corta-fogo 2 folhas',
      'Garante a ordem de fecho das folhas',
      'Aço cromado CISA',
      'Marcagem CE (UNE-EN 1158)',
      'Para folhas até 900 mm',
    ],
    application: 'Comercial, Industrial, Residencial',
  },
  {
    id: 81,
    name: 'Varão Nervurado 8mm',
    originalPrice: 22.0,
    salePrice: 13.15,
    category: 'acessorios',
    description:
      'Varão nervurado galvanizado de 8 mm, em aço. Acessório ideal para tensionar e reforçar vedações de rede malha solta.',
    longDescription:
      'Varão nervurado galvanizado de 8 mm de diâmetro, em aço. As nervuras superficiais melhoram a aderência do arame de fixação, tornando-o ideal para tensionar a rede malha solta nas extremidades e reforçar vedações. Também utilizado em aplicações de construção e armaduras. Disponível em várias medidas.',
    dimensions: 'Ø 8 mm',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Varão nervurado',
      Diâmetro: '8 mm',
      Acabamento: 'Galvanizado',
      'Âmbito de aplicação': 'Vedações, construção',
    },
    highlights: [
      'Aço galvanizado nervurado',
      'Diâmetro 8 mm',
      'Boa aderência do arame de fixação',
      'Para tensionar rede malha solta',
      'Multifuncional (vedações e construção)',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 82,
    name: 'Varão Nervurado 10mm',
    originalPrice: 29.0,
    salePrice: 17.4,
    category: 'acessorios',
    description:
      'Varão nervurado galvanizado de 10 mm, em aço. Acessório para tensionar e reforçar vedações de rede malha solta.',
    longDescription:
      'Varão nervurado galvanizado de 10 mm de diâmetro, em aço. Versão mais espessa do varão nervurado, indicada para vedações de maior carga ou vãos mais largos. As nervuras superficiais melhoram a aderência do arame de fixação, tornando-o ideal para tensionar a rede malha solta nas extremidades e reforçar vedações. Também utilizado em aplicações de construção e armaduras.',
    dimensions: 'Ø 10 mm',
    specs: {
      Material: 'Aço galvanizado',
      Cor: 'Galvanizado',
      Tipo: 'Varão nervurado',
      Diâmetro: '10 mm',
      Acabamento: 'Galvanizado',
      'Âmbito de aplicação': 'Vedações, construção',
    },
    highlights: [
      'Aço galvanizado nervurado',
      'Diâmetro 10 mm (mais espesso)',
      'Para vedações de maior carga',
      'Boa aderência do arame de fixação',
      'Multifuncional (vedações e construção)',
    ],
    application: 'Residencial, Agrícola, Industrial',
  },
  {
    id: 83,
    name: 'Tinta em Spray Verde',
    originalPrice: 8.5,
    salePrice: 5.0,
    category: 'acessorios',
    description:
      'Tinta em spray verde RAL 6005 para retoques em vedações, painéis e postes plastificados. Secagem rápida.',
    longDescription:
      'Tinta em spray verde (RAL 6005) para retoques em vedações metálicas, painéis Hercules, postes e acessórios plastificados. Formulação de secagem rápida e boa aderência sobre PVC e metal, permitindo reparar pequenos riscos e danos sem desmontar a vedação. Cor exata para combinar com os painéis verdes RAL 6005.',
    dimensions: 'Spray 400 ml',
    specs: {
      Tipo: 'Tinta em spray',
      Cor: 'Verde RAL 6005',
      Volume: '400 ml',
      Acabamento: 'Secagem rápida',
      'Âmbito de aplicação': 'Retoques em vedações plastificadas',
      Adesão: 'PVC e metal',
    },
    highlights: [
      'Cor verde RAL 6005 (combina com painéis)',
      'Secagem rápida',
      'Boa aderência em PVC e metal',
      'Para retoques de riscos e danos',
      'Aplicação fácil sem desmontar',
    ],
    application: 'Residencial, Industrial',
  },
  {
    id: 84,
    name: 'Tinta em Spray Galvanizado',
    originalPrice: 8.5,
    salePrice: 5.0,
    category: 'acessorios',
    description:
      'Tinta em spray efeito galvanizado (RAL 9006) para retoques em vedações, painéis e postes galvanizados. Secagem rápida.',
    longDescription:
      'Tinta em spray efeito galvanizado (RAL 9006 cinza claro) para retoques em vedações metálicas, painéis Hercules, postes e acessórios galvanizados. Formulação de secagem rápida e boa aderência sobre metal, permitindo reparar pequenos riscos e danos sem desmontar a vedação. Reproduz o aspeto e cor do galvanizado.',
    dimensions: 'Spray 400 ml',
    specs: {
      Tipo: 'Tinta em spray',
      Cor: 'Galvanizado (RAL 9006)',
      Volume: '400 ml',
      Acabamento: 'Secagem rápida',
      'Âmbito de aplicação': 'Retoques em vedações galvanizadas',
      Adesão: 'Metal',
    },
    highlights: [
      'Efeito galvanizado (RAL 9006)',
      'Reproduz o aspeto do galvanizado',
      'Secagem rápida',
      'Boa aderência em metal',
      'Para retoques de riscos e danos',
    ],
    application: 'Residencial, Industrial',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Devolve o produto enriquecido com o ID fornecido, ou `undefined`. */
export function getProductById(id: number): EnrichedProduct | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}
