import { Sparkles, Smile, Activity, Sun, Droplets, Flame } from 'lucide-react';
import { Service } from '../types';

export const TREATMENTS: readonly Service[] = [
  {
    id: 'bioestimuladores',
    title: 'Bioestimuladores de Colágeno',
    tag: 'Mais Procurado',
    category: 'facial',
    image: '/procedures/bioestimuladores.jpg',
    duration: '45 minutos',
    recovery: 'Imediata',
    description:
      'Estimulação biológica progressiva com hidroxiapatita de cálcio (Radiesse) e ácido poli-L-lático (Sculptra) para redensificação dérmica profunda e sustentação duradoura.',
    longDescription:
      'Os bioestimuladores induzem os fibroblastos a produzirem novo colágeno tipo I e III de forma natural. Indicado para tratar flacidez da face, pescoço e colo, proporcionando contornos mais nítidos e textura rejuvenescida sem volumização artificial.',
    benefits: [
      'Estímulo contínuo de colágeno por até 24 meses',
      'Recuperação do tônus e firmeza tecidual',
      'Melhora expressiva da espessura e luminosidade da pele',
      'Resultados graduais, elegantes e imperceptíveis a terceiros',
    ],
    icon: Sparkles,
  },
  {
    id: 'botox-harmonizacao',
    title: 'Toxina Botulínica Preventiva',
    tag: 'Procedimento Rápido',
    category: 'facial',
    image: '/procedures/botox.jpg',
    duration: '30 minutos',
    recovery: 'Sem downtime',
    description:
      'Modulação precisa da musculatura facial para suavizar rugas dinâmicas na testa, glabela e perioculares, preservando integralmente sua expressividade natural.',
    longDescription:
      'Nossa abordagem preconiza o "Baby Botox" e a técnica de microdosagem: relaxamos estrategicamente as fibras hipercinéticas sem engessar os movimentos. O olhar permanece descansado, sereno e luminoso.',
    benefits: [
      'Prevenção de vincos estáticos profundos',
      'Suavização imediata de linhas de tensão e cansaço',
      'Elevação sutil e harmônica da cauda das sobrancelhas',
      'Manutenção completa da mímica e identidade do paciente',
    ],
    icon: Smile,
  },
  {
    id: 'ultrassom-liftera',
    title: 'Ultrassom Microfocado Liftera',
    tag: 'Padrão Ouro',
    category: 'facial',
    image: '/procedures/ultrassom-liftera.jpg',
    duration: '60 minutos',
    recovery: 'Retorno imediato às atividades',
    description:
      'Tratamento não-invasivo de lifting que atua na fáscia muscular profunda (SMAS) e derme, promovendo retração tecidual imediata e efeito tensor progressivo.',
    longDescription:
      'Com tecnologia digital avançada de disparo contínuo e ponteiras anatômicas, o Liftera atinge pontos de coagulação térmica milimétricos. Ideal para definição da linha mandibular, redução de papada e lifting de terço médio.',
    benefits: [
      'Lifting biológico sem incisões, cânulas ou cicatrizes',
      'Atinge o mesmo plano cirúrgico da ritidoplastia (SMAS)',
      'Definição precisa do contorno do queixo e mandíbula',
      'Efeito imediato com ápice de renovação em 90 dias',
    ],
    icon: Activity,
  },
  {
    id: 'laser-lavieen',
    title: 'Laser Fracionado Lavieen',
    tag: 'Efeito Glow Skin',
    category: 'laser',
    image: '/procedures/laser-lavieen.jpg',
    duration: '40 minutos',
    recovery: 'Leve rubor de 24h',
    description:
      'Laser de Tulio fracionado não-ablativo para clareamento de manchas, melasma, refinamento de poros e restauração do viço aveludado da pele.',
    longDescription:
      'Conhecido mundialmente pelo efeito "BB Cream natural", o Laser Lavieen gera microzonas térmicas controladas na junção dermoepidérmica. Estimula a regeneração celular sem descamação agressiva.',
    benefits: [
      'Clareamento homogêneo de melasmas e pigmentações solares',
      'Fechamento imediato de poros dilatados e textura uniforme',
      'Aumento do brilho natural e uniformização do tom',
      'Seguro para todos os fototipos ao longo de todo o ano',
    ],
    icon: Sun,
  },
  {
    id: 'acido-hialuronico',
    title: 'Preenchimento com Ácido Hialurônico',
    tag: 'Resultado Imediato',
    category: 'facial',
    image: '/procedures/preenchimento-labial.jpg',
    duration: '50 minutos',
    recovery: '1 a 2 dias',
    description:
      'Restauração anatômica de volumes, escultura labial refinada e projeção de mento com géis de alta viscoelasticidade e biocompatibilidade total.',
    longDescription:
      'Trabalhamos com o conceito de pilares estruturais (MD Codes) para reequilibrar as proporções áureas da face. Tratamos olheiras profundas, contorno dos lábios e suporte malar com absoluta discrição.',
    benefits: [
      'Correção imediata de sombras e depressões faciais',
      'Hidratação profunda injetável integrada',
      'Lábios desenhados, hidratados e proporcionais',
      'Reversível com hialuronidase e 100% biocompatível',
    ],
    icon: Droplets,
  },
  {
    id: 'remodelacao-corporal',
    title: 'Remodelação Corporal 360°',
    tag: 'Corpo & Contorno',
    category: 'corporal',
    image: '/procedures/remodelacao-corporal.jpg',
    duration: '60 minutos',
    recovery: 'Sem restrições',
    description:
      'Sinergia de radiofrequência multipolar, criofrequência e bioestimulação tecidual para redução de adiposidades localizadas, celulite e flacidez corporal.',
    longDescription:
      'Protocolo exclusivo focado na tonificação e remodelagem de abdômen, flancos, glúteos e braços. O calor profundo estimula a síntese de fibras elásticas enquanto reorganiza os septos fibrosos.',
    benefits: [
      'Redução visível de medidas e compactação do tecido adiposo',
      'Melhora substancial do aspecto de celulite e ondulações',
      'Combate à flacidez pós-parto ou pós-emagrecimento',
      'Sensação agradável e relaxante durante a aplicação',
    ],
    icon: Flame,
  },
];
