import React from 'react';
import { Smile, Heart, ShieldCheck, Droplets, Sparkles, Activity, Sun, Flame } from 'lucide-react';

export interface ProcedureData {
  id: string;
  slug: string;
  name: string;
  categoryTag: string;
  badge: string;
  image: string;
  headline: string;
  subtext: string;
  stat1: { number: string; label: string };
  stat2: { number: string; label: string };
  howItWorks: {
    mechanismTitle: string;
    mechanismText: string;
    targetLayers: string;
    anesthesiaInfo: string;
    durationMinutes: string;
  };
  whoIsItFor: string[];
  timeline: {
    period: string;
    effect: string;
  }[];
  steps: {
    title: string;
    tags: string[];
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  icon: React.ComponentType<{ className?: string }>;
}

export const PROCEDURES_CATALOG: readonly ProcedureData[] = [
  {
    id: 'limpeza-de-pele',
    slug: 'limpeza-de-pele',
    name: 'Limpeza de Pele',
    categoryTag: 'Higienização & Vitalidade',
    badge: 'Protocolo de Entrada Mais Solicitado',
    image: '/procedures/limpeza-de-pele.webp',
    headline: 'Purificação profunda e luminosidade imediata para sua pele',
    subtext:
      'Higienização dérmica avançada com desobstrução atraumática de poros, emoliência controlada e nutrição celular para revitalizar o viço natural da face.',
    stat1: { number: '60 Min', label: 'Duração da Sessão Completa' },
    stat2: { number: '100%', label: 'Retorno Imediato às Atividades' },
    howItWorks: {
      mechanismTitle: 'Como funciona a Limpeza de Pele Médica Profunda',
      mechanismText:
        'Diferente de limpezas caseiras ou esfoliações abrasivas, a limpeza de pele médica atua na descompactação biológica do estrato córneo. Através de dermocosméticos emolientes biocompatíveis e vapor de ozônio medicinal, amolecemos os tampões córneos (cravos abertos e fechados) e comedões sem pressionar ou lesionar as fibras de colágeno adjacentes. A extração é minuciosa e atraumática, seguida por cauterização com alta frequência que elimina bactérias anaeróbicas (Cutibacterium acnes) e fototerapia com LED azul e âmbar para selar e oxigenar a derme.',
      targetLayers: 'Epiderme superficial, óstios foliculares e derme papilar',
      anesthesiaInfo: 'Procedimento indolor e relaxante, com vapor de ozônio e compressas térmicas',
      durationMinutes: '60 a 75 minutos',
    },
    whoIsItFor: [
      'Pessoas com excesso de oleosidade, poros dilatados ou acúmulo de cravos na zona T',
      'Peles opacas e sem viço decorrentes de poluição, maquiagem frequente ou estresse',
      'Preparo essencial antes de procedimentos injetáveis (Botox, Bioestimuladores) ou Lasers',
      'Manutenção preventiva periódica para homens e mulheres de todas as idades',
    ],
    timeline: [
      { period: 'Imediatamente após', effect: 'Poros limpos e desobstruídos com leve rubor transitório de 1 a 2 horas.' },
      { period: '1 a 3 dias', effect: 'Pele visivelmente mais macia, homogênea e com toque acetinado sem descamação.' },
      { period: '15 a 30 dias', effect: 'Absorção até 3x superior dos seus dermocosméticos de home care.' },
    ],
    steps: [
      {
        title: '1. Dermo-Higienização e Esfoliação Suave',
        tags: ['Assepsia', 'pH Balanceado', 'Microesferas'],
        description:
          'Iniciamos com emulsão micelar para remover resíduos lipídicos e poluição, seguida de peeling mecânico suave com microesferas de arroz para afinar a camada queratinizada.',
      },
      {
        title: '2. Emoliência e Vaporização de Ozônio Medicinal',
        tags: ['Vapor de Ozônio', 'Emoliência', 'Dilatação Segura'],
        description:
          'Aplicação de compressas com trietanolamina tamponada e vapor de ozônio. O calor abre os óstios com total conforto, enquanto o ozônio exerce ação bactericida prévia.',
      },
      {
        title: '3. Extração Manual Atraumática',
        tags: ['Técnica Manual', 'Sem Cicatrizes', 'Precisão'],
        description:
          'Remoção de comedões milimétricos com gaze estéril e ponteira ultra-delicada, preservando a integridade dos vasos sanguíneos e evitando manchas inflamatórias.',
      },
      {
        title: '4. Alta Frequência, Fototerapia LED e Máscara Regeneradora',
        tags: ['Alta Frequência', 'LED Âmbar', 'Calmante Biológico'],
        description:
          'Passagem do eletrodo de vidro com ozônio gerado para cicatrização instantânea, máscara rica em peptídeos calmantes e banho de luz LED para acalmar a pele por completo.',
      },
    ],
    faqs: [
      {
        question: 'A limpeza de pele deixa o rosto machucado ou marcado?',
        answer:
          'Não na Alpha Clinic Vital. Como utilizamos emoliência médica e extração estritamente atraumática, o paciente apresenta apenas um leve rubor que desaparece em poucas horas, podendo retornar às atividades normalmente.',
      },
      {
        question: 'Com qual frequência devo realizar a limpeza de pele?',
        answer:
          'Para peles mistas a oleosas, recomendamos intervalos de 30 a 45 dias. Para peles secas ou normais, sessões bimestrais ou trimestrais são ideais para manter a saúde e viço dérmicos.',
      },
      {
        question: 'Posso me maquiar após o procedimento?',
        answer:
          'Recomendamos aguardar pelo menos 12 a 24 horas antes de aplicar bases pesadas, permitindo que os poros recém-higienizados respirem e absorvam o filtro solar calmante aplicado.',
      },
    ],
    icon: Droplets,
  },
  {
    id: 'botox',
    slug: 'botox',
    name: 'Botox (Toxina Botulínica)',
    categoryTag: 'Suavização & Harmonia Facial',
    badge: 'Tratamento Médico Padrão Ouro',
    image: '/procedures/botox.webp',
    headline: 'Expressão leve, descansada e naturalmente rejuvenescida',
    subtext:
      'Atenuação precisa de linhas na testa, glabela e pés de galinha. Preservamos sua mímica facial para que o resultado seja elegante, espontâneo e invisível aos outros.',
    stat1: { number: '72 Horas', label: 'Início da Atuação Celular' },
    stat2: { number: '4 a 6 M', label: 'Durabilidade Média com Alta Satisfação' },
    howItWorks: {
      mechanismTitle: 'Como funciona a Toxina Botulínica Preventiva e Reparadora',
      mechanismText:
        'A toxina botulínica do tipo A atua bloqueando seletivamente a liberação de acetilcolina na junção neuromuscular. Quando você sorri, franze a testa ou semicerra os olhos, os músculos faciais se contraem e dobram a pele acima deles, formando vincos dinâmicos. Ao relaxar temporariamente esses pontos específicos de hipercontração, a pele para de ser tracionada e ganha espaço para descansar e se regenerar. Na Alpha Clinic Vital, priorizamos a técnica de microdosagem (Baby Botox), calibrando a quantidade exata para que você continue sorrindo e se expressando com serenidade, sem aspecto estático ou artificial.',
      targetLayers: 'Plano muscular facial superficial (músculo frontal, corrugador, prócero e orbicular dos olhos)',
      anesthesiaInfo: 'Anestésico tópico dermatológico de alta potência e resfriador de pele para máximo conforto',
      durationMinutes: '30 minutos (incluindo consulta e marcação anatômica)',
    },
    whoIsItFor: [
      'Pessoas com linhas de expressão marcadas na testa, entre as sobrancelhas ou nos cantos dos olhos',
      'Indivíduos que desejam prevenir que rugas de expressão se tornem vincos estáticos permanentes',
      'Pacientes com hábito involuntário de franzir a testa ao trabalhar no computador ou dirigir',
      'Homens e mulheres que buscam abrir o olhar e erguer discretamente a cauda da sobrancelha',
    ],
    timeline: [
      { period: 'Dias 1 a 3', effect: 'Início sutil do relaxamento muscular; sem inchaço ou hematomas perceptíveis.' },
      { period: 'Dias 7 a 14', effect: 'Pico máximo do tratamento: pele lisa, olhar sereno e expressão completamente descansada.' },
      { period: 'Dia 15', effect: 'Consulta médica de retorno para validação da simetria e ajuste fino se necessário.' },
      { period: '4 a 6 meses', effect: 'Recuperação progressiva e suave da mobilidade muscular de forma gradual.' },
    ],
    steps: [
      {
        title: '1. Mapeamento da Dinâmica Muscular e Expressão',
        tags: ['Análise Anatômica', 'Mímica Facial', 'Personalização'],
        description:
          'O médico solicita que o paciente faça expressões normais para mapear as linhas de força de cada músculo e definir os pontos exatos de microinjeção.',
      },
      {
        title: '2. Assepsia e Anestesia Tópica Confortável',
        tags: ['Conforto', 'Pomada Anestésica', 'Segurança'],
        description:
          'Higienização completa da face com clorexidina dérmica e aplicação de creme anestésico nos pontos delimitados para eliminar qualquer desconforto.',
      },
      {
        title: '3. Aplicação com Microagulhas Ultrafinas',
        tags: ['Frasco Original', 'Micro-Gotas', 'Zero Downtime'],
        description:
          'Injeção milimétrica de microgotas com frascos originais e rastreáveis abertos presencialmente. A aplicação leva menos de 10 minutos.',
      },
      {
        title: '4. Orientações Pós e Agendamento da Revisão',
        tags: ['Home Care', 'Revisão 15 Dias', 'Suporte WhatsApp'],
        description:
          'Instruções sobre não massagear a área nem deitar nas primeiras 4 horas. O paciente sai pronto para continuar seu dia.',
      },
    ],
    faqs: [
      {
        question: 'Vou ficar com o rosto congelado ou sem expressão?',
        answer:
          'Absolutamente não. Na Alpha Clinic Vital atuamos com dosimetria individualizada: o objetivo é suavizar as dobras de tensão sem paralisar a musculatura. Amigos e familiares notarão que você parece mais jovem e descansada, sem desconfiar de intervenção estética.',
      },
      {
        question: 'O procedimento é doloroso?',
        answer:
          'A aplicação é praticamente indolor. Utilizamos agulhas de calibre microscópico (muito mais finas que as de insulina) associadas a pomada anestésica de grau hospitalar.',
      },
      {
        question: 'A partir de qual idade posso começar o Botox preventivo?',
        answer:
          'Geralmente entre os 25 e 30 anos, quando as marcas dinâmicas começam a demorar para sumir após a mímica. O uso preventivo evita a quebra definitiva do colágeno na derme.',
      },
    ],
    icon: Smile,
  },
  {
    id: 'preenchimento-labial',
    slug: 'preenchimento-labial',
    name: 'Preenchimento Labial',
    categoryTag: 'Definição & Hidratação Dérmica',
    badge: 'Ácido Hialurônico de Pureza Suíça',
    image: '/procedures/preenchimento-labial.webp',
    headline: 'Contorno esculpido com volume delicado e proporção áurea',
    subtext:
      'Harmonização labial com foco em contorno, projeção do arco do cupido e hidratação profunda. Resultados proporcionais que respeitam o desenho natural da sua boca.',
    stat1: { number: 'Imediato', label: 'Efeito Volumétrico Visível' },
    stat2: { number: '8 a 12 M', label: 'Degradação Natural e Segura' },
    howItWorks: {
      mechanismTitle: 'Como funciona a Escultura e Preenchimento Labial',
      mechanismText:
        'O preenchimento labial é realizado com ácido hialurônico de alta biocompatibilidade e viscoelasticidade específica para mucosa labial (tecnologia de reticulação suave). O ácido hialurônico é uma molécula naturalmente presente no corpo humano capaz de reter até mil vezes seu peso em água. Quando injetado com microcânulas flexíveis de ponta romba no vermelhão e contorno labial, ele restaura a perda de volume decorrente da idade, define o arco do cupido, corrige assimetrias e proporciona uma hidratação interna incomparável (efeito gloss). Caso desejado, o procedimento é 100% reversível a qualquer momento com o uso de hialuronidase.',
      targetLayers: 'Submucosa labial, plano intramuscular superficial e borda do vermelhão',
      anesthesiaInfo: 'Bloqueio anestésico odontológico ou tópico avançado com lidocaína integrada no próprio produto',
      durationMinutes: '45 minutos',
    },
    whoIsItFor: [
      'Pessoas com lábios finos, desidratados ou com perda de volume ao longo dos anos',
      'Quem deseja maior definição no contorno labial e realce do arco do cupido',
      'Pacientes que apresentam rugas periorais ("código de barras") ou cantos da boca caídos',
      'Pessoas com assimetrias labiais perceptíveis ao falar ou sorrir',
    ],
    timeline: [
      { period: 'Dias 1 e 2', effect: 'Edema transitório natural; os lábios ficam um pouco mais cheios que o resultado final.' },
      { period: 'Dias 7 a 14', effect: 'Acomodação biológica do gel hialurônico com toque macio e naturalidade absoluta.' },
      { period: '8 a 12 meses', effect: 'Degradação metabólica gradual e segura, sem sobras ou fibroses residuais.' },
    ],
    steps: [
      {
        title: '1. Estudo da Proporção Áurea Facial',
        tags: ['Proporção Áurea', 'Simetria', 'Harmonia'],
        description:
          'Avaliamos a relação entre lábio superior (1 parte) e inferior (1.618 partes), respeitando a projeção nasal e o perfil do queixo.',
      },
      {
        title: '2. Anestesia Local para Conforto Total',
        tags: ['Sem Dor', 'Bloqueio Suave', 'Segurança'],
        description:
          'Utilizamos anestesia tópica de alta penetração ou bloqueio odontológico suave, tornando o procedimento totalmente confortável.',
      },
      {
        title: '3. Escultura Labial com Microcânulas Atraumáticas',
        tags: ['Cânula de Ponta Romba', 'Sem Cortes', 'Mínimo Hematoma'],
        description:
          'A cânula desliza sem perfurar artérias ou veias, depositando o gel de forma homogênea para desenhar contorno e projetar o centro dos lábios.',
      },
      {
        title: '4. Moldagem Suave e Selamento Protetor',
        tags: ['Massagem Delicada', 'Hidratação Imediata', 'Espelho'],
        description:
          'O médico realiza a distribuição simétrica com massagem digital suave e entrega o espelho para o paciente conferir o resultado imediato.',
      },
    ],
    faqs: [
      {
        question: 'Os lábios ficam duros ou artificiais ao beijar?',
        answer:
          'De forma alguma. Os ácidos hialurônicos modernos que utilizamos possuem integração tecidual suave. Após o período de acomodação de cerca de 7 dias, a textura do lábio fica idêntica à de um lábio natural jovem.',
      },
      {
        question: 'E se eu não gostar do resultado?',
        answer:
          'O ácido hialurônico é o único preenchedor 100% reversível. A qualquer momento podemos aplicar a enzima hialuronidase para dissolver o produto de forma rápida e segura.',
      },
      {
        question: 'O procedimento incha muito nos primeiros dias?',
        answer:
          'Um inchaço leve a moderado nas primeiras 48 horas é perfeitamente normal. Recomendamos compressas frias e repouso de atividades físicas intensas nas primeiras 24 horas.',
      },
    ],
    icon: Heart,
  },
  {
    id: 'bioestimuladores',
    slug: 'bioestimuladores',
    name: 'Bioestimuladores de Colágeno',
    categoryTag: 'Firmeza & Neocolagênese',
    badge: 'Regeneração Estrutural Profunda',
    image: '/procedures/bioestimuladores.webp',
    headline: 'Estímulo biológico contínuo que restaura a firmeza do seu rosto',
    subtext:
      'Tratamento biotecnológico que desperta a produção própria de colágeno pelo organismo, recuperando a espessura dérmica e combatendo a flacidez de dentro para fora.',
    stat1: { number: 'Até 24 M', label: 'Estímulo de Firmeza Prolongada' },
    stat2: { number: '+66%', label: 'Aumento da Densidade de Colágeno Tipo I' },
    howItWorks: {
      mechanismTitle: 'Como funcionam os Bioestimuladores (Sculptra e Radiesse)',
      mechanismText:
        'A partir dos 25 anos, perdemos cerca de 1% de colágeno ao ano, resultando em perda de firmeza e afinamento da pele. Os bioestimuladores de colágeno (à base de Ácido Poli-L-Lático ou Hidroxiapatita de Cálcio) são substâncias microparticuladas biocompatíveis e reabsorvíveis. Ao serem injetadas nos planos profundos da derme e hipoderme através de vetores de sustentação, elas desencadeiam uma resposta biológica controlada de neocolagênese: os fibroblastos são ativados para produzir uma rede densa de novas fibras colágenas e elásticas. Não se trata de inflar ou criar volume artificial, mas sim de restaurar a espessura, elasticidade e ancoragem que sustentam os contornos faciais.',
      targetLayers: 'Derme profunda, camada subdérmica e supraperiosteal (ancoragem óssea)',
      anesthesiaInfo: 'Anestésico injetável associado à fórmula com lidocaína para aplicação indolor',
      durationMinutes: '45 minutos',
    },
    whoIsItFor: [
      'Pessoas a partir dos 30 anos com sinais de flacidez no terço inferior, mandíbula ou bochechas',
      'Pacientes que emagreceram ou praticam esportes de alta intensidade e notaram o rosto "derretendo"',
      'Pessoas com pele fina, craquelada ou com perda de densidade no rosto, pescoço e colo',
      'Quem deseja rejuvenescimento natural de longo prazo sem volumização ou alteração de traços',
    ],
    timeline: [
      { period: 'Dias 1 a 7', effect: 'Leve efeito preenchedor transitório da água de diluição, que é absorvida rapidamente.' },
      { period: '30 a 90 dias', effect: 'Início da neocolagênese celular: a pele ganha espessura, firmeza e textura mais densa.' },
      { period: 'Até 24 meses', effect: 'Manutenção da estrutura de colágeno formada pelo próprio corpo com sustentação prolongada.' },
    ],
    steps: [
      {
        title: '1. Mapeamento dos Vetores de Tração Facial',
        tags: ['Pontos de Ancoragem', 'Linhas de Langer', 'Diagnóstico'],
        description:
          'Desenhamos vetores anatômicos que reposicionam os tecidos para cima e para trás, garantindo efeito tensor natural.',
      },
      {
        title: '2. Reconstituição com Diluição Farmacêutica Segura',
        tags: ['Sculptra / Radiesse', 'Selo Anvisa', 'Lidocaína'],
        description:
          'O bioestimulador original é preparado com água para injeção estéril e anestésico, garantindo suspensão homogênea.',
      },
      {
        title: '3. Aplicação em Leque com Microcânula',
        tags: ['Sem Hematomas', 'Plano Subdérmico', 'Distribuição Homogênea'],
        description:
          'Através de apenas 1 a 2 orifícios discretos por hemiface, a cânula distribui o produto de maneira uniforme sem cortes.',
      },
      {
        title: '4. Massagem de Distribuição e Protocolo 5x5x5',
        tags: ['Home Care', 'Massagem', 'Orientações'],
        description:
          'Orientamos a regra clássica de massagem domiciliar (5 minutos, 5 vezes ao dia, por 5 dias) para assegurar espalhamento perfeito.',
      },
    ],
    faqs: [
      {
        question: 'O bioestimulador vai deixar meu rosto gordo ou redondo?',
        answer:
          'Não. O bioestimulador não é um preenchedor de volume; ele estimula a espessura da pele e a firmeza tecidual. Seu rosto não ganha volume indesejado, ganha sustentação e retração.',
      },
      {
        question: 'Quantas sessões são necessárias?',
        answer:
          'Geralmente recomendamos de 1 a 3 sessões com intervalo de 30 a 45 dias, dependendo do grau de flacidez e idade biológica do paciente.',
      },
      {
        question: 'Quanto tempo duram os resultados?',
        answer:
          'Como o colágeno produzido é o seu próprio, os benefícios se estendem por até 2 anos. Recomendamos uma sessão de manutenção anual para preservar o estoque celular.',
      },
    ],
    icon: Sparkles,
  },
  {
    id: 'peeling-quimico',
    slug: 'peeling-quimico',
    name: 'Peeling Químico',
    categoryTag: 'Renovação & Luminosidade',
    badge: 'Uniformização Médica de Manchas',
    image: '/procedures/peeling-quimico.webp',
    headline: 'Renovação celular programada para textura e tom homogêneos',
    subtext:
      'Aplicação de ácidos médicos com concentrações personalizadas para suavizar melasma, linhas finas e cicatrizes de acne, revelando uma pele acetinada e luminosa.',
    stat1: { number: '5 a 7 Dias', label: 'Ciclo Completo de Renovação' },
    stat2: { number: 'Grau Médico', label: 'Fórmulas Manipuladas Sob Medida' },
    howItWorks: {
      mechanismTitle: 'Como funciona a Renovação Cutânea por Peeling Químico',
      mechanismText:
        'O peeling químico médico promove uma quimioesfoliação acelerada e controlada. Soluções ácidas estéreis (como Ácido Glicólico, Ácido Retinóico, Ácido Mandélico ou Ácido Salicílico em concentrações terapêuticas) são aplicadas sobre a pele para quebrar as ligações intercelulares dos corneócitos hiperqueratinizados. Esse processo remove as camadas manchadas, oxidadas e com danos solares, estimulando a camada basal da epiderme a produzir células novas e sadias. Concomitantemente, a permeabilidade transitória permite a entrega de ativos clareadores e antioxidantes que inibem a tirosinase (enzima que produz o melasma).',
      targetLayers: 'Epiderme superficial a média e junção dermoepidérmica',
      anesthesiaInfo: 'Leve sensação de calor ou pinicação controlada por ventilação fria; sem anestesia injetável',
      durationMinutes: '35 a 45 minutos',
    },
    whoIsItFor: [
      'Pessoas com manchas de sol, melasma, sardas ou hiperpigmentação pós-inflamatória',
      'Peles com textura áspera, poros abertos e cicatrizes superficiais de acne',
      'Pacientes que buscam efeito "pele nova" com uniformização de tom e brilho espelhado',
      'Pessoas que desejam atenuar rugas finas e linhas ao redor dos olhos e lábios',
    ],
    timeline: [
      { period: 'Dias 1 e 2', effect: 'Pele com leve viço esticado e sensação de bronzeado sutil.' },
      { period: 'Dias 3 a 5', effect: 'Descamação controlada e suave das células mortas pigmentadas.' },
      { period: 'Dia 7 em diante', effect: 'Pele recém-nascida, extremamente luminosa, lisa e com tom uniforme.' },
    ],
    steps: [
      {
        title: '1. Preparo e Desengorduramento Facial',
        tags: ['Assepsia', 'Controle Lipídico', 'Segurança'],
        description:
          'Limpeza desengordurante que remove o filme hidrolipídico para que a solução ácida penetre de maneira perfeitamente homogênea.',
      },
      {
        title: '2. Aplicação em Camadas com Pincel Médico',
        tags: ['Ácidos Fracionados', 'Monitoramento Visual', 'Uniformidade'],
        description:
          'Pincelamento cuidadoso com controle de tempo e eritema, adaptando o número de camadas à sensibilidade da pele do paciente.',
      },
      {
        title: '3. Neutralização e Banho Térmico Calmante',
        tags: ['Neutralizador Alcalino', 'Fatores de Crescimento', 'Alívio'],
        description:
          'Interrupção imediata da ação ácida com solução tampão e aplicação de sérum calmante com ácido hialurônico e camomila.',
      },
      {
        title: '4. Barreira de Fotoproteção Físico-Mineral',
        tags: ['Filtro Solar 100% Mineral', 'Home Care', 'Recuperação'],
        description:
          'Aplicação de protetor solar de amplo espectro com óxido de zinco e dióxido de titânio para proteger a nova pele dos raios UV.',
      },
    ],
    faqs: [
      {
        question: 'A pele vai descamar muito? Preciso me afastar do trabalho?',
        answer:
          'Não é necessário repouso em casa. A descamação dos peelings modernos é fina (semelhante a uma pele ressecada pelo frio) e controlada, podendo ser disfarçada facilmente com hidratantes faciais prescritos.',
      },
      {
        question: 'Posso fazer peeling no verão?',
        answer:
          'Sim, temos formulações seguras para todas as estações (como o Ácido Mandélico e Ferúlico), desde que o paciente siga rigorosamente o protocolo de fotoproteção diária.',
      },
      {
        question: 'Quantas sessões são indicadas?',
        answer:
          'Depende do objetivo: para um viço imediato para eventos, 1 sessão já transforma a pele. Para tratamento de melasma e manchas resistentes, costumamos indicar ciclos de 3 a 5 sessões.',
      },
    ],
    icon: ShieldCheck,
  },
  {
    id: 'ultrassom-liftera',
    slug: 'ultrassom-liftera',
    name: 'Ultrassom Liftera',
    categoryTag: 'Lifting & Contorno Facial',
    badge: 'Ultrassom Microfocado Digital',
    image: '/procedures/ultrassom-liftera.webp',
    headline: 'Lifting não-invasivo com retração profunda da fáscia muscular',
    subtext:
      'Tecnologia de microfoco térmico que atinge a fáscia muscular (SMAS) promovendo efeito tensor duradouro, definição da mandíbula e elevação do terço médio.',
    stat1: { number: '60 Min', label: 'Sessão Sem Tempo de Recuperação' },
    stat2: { number: '90 Dias', label: 'Pico Máximo de Neocolagênese' },
    howItWorks: {
      mechanismTitle: 'Como atua o Ultrassom Microfocado Liftera',
      mechanismText:
        'O Liftera é uma revolução em ultrassom microfocado digital. Ele emite ondas ultrassônicas concentradas que atravessam a pele sem lesionar a epiderme, convergindo em pontos de coagulação térmica milimétricos a 65-70°C exatamente na fáscia muscular profunda (SMAS) — a mesma camada anatômica que cirurgiões plásticos tracionam em um lifting cirúrgico (ritidoplastia). Essa energia desencadeia uma desnaturação imediata do colágeno antigo e uma retração tecidual expressiva, seguida por uma produção acelerada de novo colágeno nos 90 dias posteriores. Graças à sua exclusiva caneta aplicadora anatômica ergonômica, o Liftera trata áreas delicadas como papada, pálpebras e contorno mandibular com muito mais precisão e muito menos dor que aparelhos tradicionais.',
      targetLayers: 'SMAS (4.5mm), Derme profunda (3.0mm) e Derme superficial (1.5mm)',
      anesthesiaInfo: 'Pomada anestésica tópica; disparos rápidos e confortáveis',
      durationMinutes: '45 a 60 minutos',
    },
    whoIsItFor: [
      'Pessoas com flacidez na mandíbula ("efeito buldogue") e perda de definição do queixo',
      'Pacientes com papada submentoniana e flacidez no pescoço',
      'Quem apresenta queda da cauda das sobrancelhas e pálpebras pesadas',
      'Indivíduos que desejam efeito lifting sem cirurgia, sem cortes e sem agulhas',
    ],
    timeline: [
      { period: 'Imediatamente após', effect: 'Efeito tensor de 20% visível logo ao sair do consultório devido à retração térmica do SMAS.' },
      { period: '30 a 60 dias', effect: 'Redução progressiva da papada e redefinição acentuada do ângulo mandibular.' },
      { period: '90 a 180 dias', effect: 'Pico máximo do resultado: rosto mais compacto, contornos nítidos e sustentação consolidada.' },
    ],
    steps: [
      {
        title: '1. Desenho dos Vetores de Coagulação Térmica',
        tags: ['Mapeamento Digital', 'Anatomia Facial', 'Zonas Seguras'],
        description:
          'Delimitamos as linhas de disparo no terço inferior, mandíbula e área periocular, respeitando os trajetos nervosos faciais.',
      },
      {
        title: '2. Gel Condutor Ultrassônico de Alta Viscosidade',
        tags: ['Transmissão Térmica', 'Conforto', 'Aderência'],
        description:
          'Aplicação de gel aquoso estéril para garantir o acoplamento perfeito da ponteira e transmissão homogênea da energia.',
      },
      {
        title: '3. Disparos Contínuos em Camadas Sobrepostas',
        tags: ['Caneta Anatômica', '4.5mm SMAS', '3.0mm Derme'],
        description:
          'Varredura dinâmica com disparos digitais sequenciais, estimulando simultaneamente a musculatura profunda e a derme tensora.',
      },
      {
        title: '4. Finalização Calmante e Retorno às Atividades',
        tags: ['Sem Descamação', 'Pode Trabalhar', 'Zero Downtime'],
        description:
          'Remoção do gel e aplicação de sérum antioxidante com protetor solar. Não há inchaço evidente nem marcas na pele.',
      },
    ],
    faqs: [
      {
        question: 'O Liftera dói como os ultrassons antigos?',
        answer:
          'Não. O grande diferencial do Liftera em relação aos aparelhos antigos é a tecnologia Thermal Diffusion Treatment (TDT) e a ponteira em formato de caneta, que distribui a energia com disparos contínuos e ultrarrápidos, reduzindo drasticamente a dor.',
      },
      {
        question: 'Quantas sessões preciso fazer?',
        answer:
          'Para a maioria dos pacientes, uma única sessão anual é suficiente para proporcionar retração e estímulo de firmeza. Em casos de flacidez mais severa, pode ser indicado um ciclo de 2 a 3 sessões semestrais.',
      },
      {
        question: 'Posso tomar sol após a sessão?',
        answer:
          'Sim, com uso normal de protetor solar. Como o ultrassom não queima nem machuca a superfície da pele, não há risco de manchas induzidas pelo sol.',
      },
    ],
    icon: Activity,
  },
  {
    id: 'laser-lavieen',
    slug: 'laser-lavieen',
    name: 'Laser Lavieen',
    categoryTag: 'Luminosidade & Poros',
    badge: 'Tecnologia Glow Skin Fracionada',
    image: '/procedures/laser-lavieen.webp',
    headline: 'O laser que uniformiza o tom da pele e recria o viço natural',
    subtext:
      'Laser fracionado não-ablativo de Tulio que restaura a textura, diminui poros abertos e atua no clareamento de melasmas com leve rubor de apenas 24h.',
    stat1: { number: '40 Min', label: 'Tempo Médio de Aplicação' },
    stat2: { number: '24 Horas', label: 'Retorno Normal com Maquiagem' },
    howItWorks: {
      mechanismTitle: 'Como atua o Laser de Tulio Lavieen na Derme',
      mechanismText:
        'O Lavieen é um laser fracionado subablativo de Tulio com comprimento de onda de 1927 nm, com altíssima afinidade pela água presente nas células da pele. Essa precisão óptica permite criar microcolunas de coagulação térmica na junção dermoepidérmica sem romper ou arrancar o estrato córneo superior. Isso significa que a pele recebe um poderoso estímulo regenerativo que fecha os poros, clareia manchas melânicas e sintetiza novas fibras elásticas, preservando a barreira externa de proteção. Por esse motivo, o Lavieen é famoso pelo efeito "BB Cream na pele": após 24 a 48 horas, o rosto adquire um acabamento aveludado, brilhante e uniforme sem o longo tempo de recuperação dos lasers ablativos agressivos.',
      targetLayers: 'Junção dermoepidérmica e derme papilar superficial',
      anesthesiaInfo: 'Anestésico tópico aplicado 30 minutos antes; procedimento rápido e tranquilo',
      durationMinutes: '35 a 45 minutos',
    },
    whoIsItFor: [
      'Pessoas com melasma, manchas solares e descolorações difíceis de tratar',
      'Peles com poros excessivamente dilatados e textura áspera ou irregular',
      'Quem deseja brilho natural e viço ("efeito glow") para ocasiões especiais ou dia a dia',
      'Pacientes que não podem tirar dias de folga (sem tempo de recuperação prolongado)',
    ],
    timeline: [
      { period: 'Primeiras 24h', effect: 'Pele com rubor suave (semelhante a pós-treino ou praia) e discreta sensação de calor.' },
      { period: 'Dias 2 a 4', effect: 'Microcrostículas invisíveis a olho nu que conferem toque áspero sutil e se desprendem na lavagem.' },
      { period: 'A partir do 5º dia', effect: 'Pele com viço espelhado, poros fechados e uniformidade radiante no tom.' },
    ],
    steps: [
      {
        title: '1. Higienização e Proteção Ocular',
        tags: ['Assepsia', 'Óculos de Titânio', 'Segurança Médica'],
        description:
          'Remoção de qualquer cosmético e colocação de óculos de proteção médica certificados para o comprimento de onda do laser.',
      },
      {
        title: '2. Ajuste dos Parâmetros de Energia por Fototipo',
        tags: ['Calibração', 'Personalizado', 'Melasma Control'],
        description:
          'O médico regula a densidade e potência exata para o tom e queixa da sua pele, garantindo segurança contra hiperpigmentação rebote.',
      },
      {
        title: '3. Varredura Fracionada com Feixe de Tulio',
        tags: ['Microcolunas', 'Subablativo', 'Disparo Uniforme'],
        description:
          'A ponteira desliza sobre a face emitindo micro-feixes de luz homogêneos. A sessão inteira leva menos de 20 minutos.',
      },
      {
        title: '4. Drug Delivery e Máscara Bio-Celulósica',
        tags: ['Drug Delivery', 'Vitamina C Pura', 'Ácido Hialurônico'],
        description:
          'Aproveitamos os microcanais abertos para aplicar antioxidantes esterilizados de alta absorção e máscara calmante refrescante.',
      },
    ],
    faqs: [
      {
        question: 'O laser Lavieen descama a pele toda?',
        answer:
          'Não há descamação em placas. As microzonas formam crostículas microscópicas que dão apenas uma leve textura arenosa por 2 a 3 dias e saem suavemente na higienização habitual.',
      },
      {
        question: 'É seguro para pele morena ou negra?',
        answer:
          'Sim! O Lavieen é um dos lasers mais seguros do mundo para fototipos altos (peles morenas e negras), pois seu comprimento de onda atrai a água e não a melanina diretamente, evitando o risco de manchas escuras rebote.',
      },
      {
        question: 'Em quanto tempo vejo o efeito glow?',
        answer:
          'Entre o 4º e o 7º dia a pele revela sua nova luminosidade e o fechamento evidente dos poros.',
      },
    ],
    icon: Sun,
  },
  {
    id: 'remodelacao-corporal',
    slug: 'remodelacao-corporal',
    name: 'Remodelação Corporal 360°',
    categoryTag: 'Corpo & Firmeza Tecidual',
    badge: 'Protocolo Integrado de Contorno',
    image: '/procedures/remodelacao-corporal.webp',
    headline: 'Definição e firmeza corporal com tecnologia não-invasiva',
    subtext:
      'Combinação clínica de radiofrequência multipolar, ultrassom cavitacional e ativos tensores para tratar celulite, flacidez e gordura localizada.',
    stat1: { number: '60 Min', label: 'Duração por Área Tratada' },
    stat2: { number: '0 Downtime', label: 'Pode Treinar no Mesmo Dia' },
    howItWorks: {
      mechanismTitle: 'Como funciona o Protocolo de Remodelação Corporal 360°',
      mechanismText:
        'O protocolo 360° atua sinergicamente nas três principais queixas corporais: adiposidade localizada, flacidez dérmica e celulite. Através de radiofrequência multipolar volumétrica com aquecimento profundo monitorado (41 a 43°C), as pontes de hidrogênio das fibras de colágeno se contraem instantaneamente e os septos fibrosos da celulite são relaxados. Simultaneamente, o ultrassom focado desestabiliza a membrana dos adipócitos (células de gordura), facilitando sua metabolização pelo sistema linfático. O resultado é um contorno corporal mais nítido, redução de centímetros e compactação tecidual com conforto e sem tempo de recuperação.',
      targetLayers: 'Tecido adiposo subcutâneo, septos fibrosos e derme profunda',
      anesthesiaInfo: 'Procedimento não-invasivo; massagem térmica agradável e relaxante',
      durationMinutes: '60 minutos por região tratada',
    },
    whoIsItFor: [
      'Pessoas com gordura localizada resistente a dieta e exercícios em abdômen, flancos, culotes ou braços',
      'Pacientes com flacidez corporal após gravidez ou perda de peso',
      'Mulheres com aspecto de casca de laranja (celulite) nos glúteos e coxas',
      'Quem deseja afinar a cintura e melhorar a firmeza da pele corporal sem cirurgia',
    ],
    timeline: [
      { period: 'Imediatamente após', effect: 'Sensação de leveza e pele mais esticada com calor residual gostoso.' },
      { period: '3 a 5 sessões', effect: 'Redução mensurável de medidas, melhora do contorno e atenuação nítida da celulite.' },
      { period: 'Conclusão do protocolo', effect: 'Compactação tecidual evidente e melhora de até 80% no aspecto da pele.' },
    ],
    steps: [
      {
        title: '1. Bioimpedância e Mapeamento Antropométrico',
        tags: ['Métricas', 'Gordura Subcutânea', 'Fotos Clínicas'],
        description:
          'Medição precisa das dobras cutâneas e bioimpedância para registrar a evolução de medidas a cada semana.',
      },
      {
        title: '2. Aplicação de Ultrassom Cavitacional Focalizado',
        tags: ['Gordura Localizada', 'Cavitação Segura', 'Adipócitos'],
        description:
          'Ondas mecânicas focadas na camada adiposa que promovem a quebra lipídica controlada.',
      },
      {
        title: '3. Radiofrequência Multipolar Profunda',
        tags: ['Estímulo de Firmeza', '42°C Controlados', 'Retração'],
        description:
          'Aquecimento volumétrico homogêneo monitorado por termômetro infravermelho para estímulo de colágeno corporal.',
      },
      {
        title: '4. Drenagem Linfática Instrumental e Ativos Tensores',
        tags: ['Drenagem Linfática', 'Eliminação de Toxinas', 'Home Care'],
        description:
          'Manobras de direcionamento linfático para potencializar a drenagem de líquidos retidos e toxinas.',
      },
    ],
    faqs: [
      {
        question: 'Preciso ficar sem ir à academia após a sessão?',
        answer:
          'Pelo contrário! A prática de atividade física aeróbica logo após a sessão é altamente recomendada, pois ajuda o organismo a queimar e metabolizar a gordura liberada pelo procedimento.',
      },
      {
        question: 'Quantas sessões são recomendadas para ver resultado?',
        answer:
          'Geralmente indicamos pacotes de 6 a 10 sessões com periodicidade semanal ou quinzenal para resultados expressivos e consolidados.',
      },
      {
        question: 'O procedimento é doloroso?',
        answer:
          'Não dói absolutamente nada. A sensação é semelhante a uma massagem com pedras quentes relaxante.',
      },
    ],
    icon: Flame,
  },
];

export const getProcedureBySlugOrId = (slugOrId: string): ProcedureData => {
  const normalized = slugOrId.toLowerCase().trim();
  if (normalized === 'botox-harmonizacao') {
    return PROCEDURES_CATALOG.find((p) => p.slug === 'botox') || PROCEDURES_CATALOG[0];
  }
  if (normalized === 'acido-hialuronico') {
    return PROCEDURES_CATALOG.find((p) => p.slug === 'preenchimento-labial') || PROCEDURES_CATALOG[0];
  }
  return (
    PROCEDURES_CATALOG.find((p) => p.slug === normalized || p.id === normalized) ||
    PROCEDURES_CATALOG[0]
  );
};

export const getProcedureSlugForTreatmentId = (id: string): string => {
  if (id === 'botox-harmonizacao') return 'botox';
  if (id === 'acido-hialuronico') return 'preenchimento-labial';
  return id;
};
