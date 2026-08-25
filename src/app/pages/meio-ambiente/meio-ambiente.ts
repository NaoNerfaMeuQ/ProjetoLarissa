import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PassoAtividade {
  ordem: number;
  titulo: string;
  descricao: string;
}

export interface PolaroidFoto {
  titulo: string;
  legenda: string;
  icone: string;
  rotacao: number; // Ângulo para efeito visual de foto colada
  fundoGradiente?: string;
}

export interface ProjetoEcologico {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: 'Solo & Horta' | 'Arte & Natureza' | 'Biodiversidade' | 'Reciclagem' | 'Água & Clima';
  categoriaCor: string;
  objeto: {
    icone: string;
    nomeCurto: string;
    dicaHover: string;
    corFundo: string;
  };
  faixaEtaria: string;
  duracao: string;
  espaco: string;
  bncc: string;
  resumoImpacto: string;
  relato: string;
  materiais: string[];
  passos: PassoAtividade[];
  aprendizados: string[];
  polaroids: PolaroidFoto[];
}

@Component({
  selector: 'app-meio-ambiente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meio-ambiente.html',
  styleUrl: './meio-ambiente.scss'
})
export class MeioAmbiente {
  // Lista de Categorias para filtro rápido
  categorias = [
    'Todos',
    'Solo & Horta',
    'Arte & Natureza',
    'Biodiversidade',
    'Reciclagem',
    'Água & Clima'
  ] as const;

  categoriaSelecionada = signal<string>('Todos');

  // Estado do projeto atualmente aberto na Prancheta
  projetoAtivo = signal<ProjetoEcologico | null>(null);

  // Aba ativa dentro da prancheta
  abaAtiva = signal<'diario' | 'passos' | 'aprendizados' | 'galeria'>('diario');

  // Hover ativo na mesa para dar feedback visual
  objetoHover = signal<string | null>(null);

  // Lista de Projetos Ecológicos
  projetos: ProjetoEcologico[] = [
    {
      id: 'horta-sensorial',
      titulo: 'Horta Sensorial dos Pequenos Guardiões',
      subtitulo: 'Cultivo afetivo de hortaliças, ervas aromáticas e compostagem viva na escola.',
      categoria: 'Solo & Horta',
      categoriaCor: '#3E7B44',
      objeto: {
        icone: '🌱',
        nomeCurto: 'Vaso & Pazinha',
        dicaHover: 'Toque no brotinho para explorar o projeto da Horta',
        corFundo: '#E3F2E6'
      },
      faixaEtaria: '3 a 6 anos (Educação Infantil)',
      duracao: 'Contínuo (Ciclos de 6 semanas)',
      espaco: 'Canteiro ao ar livre ou jardineiras móveis',
      bncc: 'EI03ET02, EI03ET03 e EF01CI01',
      resumoImpacto: 'Mais de 120 mudas cultivadas e colhidas diretamente pelas mãos das crianças.',
      relato: `A horta nasceu do desejo de reconectar as crianças com a origem do alimento e o tempo paciente da natureza. 
      Ao preparar a terra preta, tocar nas raízes e sentir o aroma do manjericão e da hortelã, os pequenos desenvolveram uma relação de afeto e cuidado. 
      O momento da colheita transformou-se em uma celebração coletiva, onde crianças que antes recusavam folhas verdes passaram a provar com alegria a salada que elas mesmas regaram todos os dias.`,
      materiais: [
        'Terra vegetal adubada e composto orgânico',
        'Sementes e mudas de ciclo rápido (rabanete, alface, manjericão, alecrim)',
        'Regadores infantis e pás de madeira',
        'Plaquinhas de identificação feitas com gravetos e papelão'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Despertar dos Sentidos e Toque na Terra',
          descricao: 'As crianças exploram a terra com as mãos, sentindo umidade, cheiro e textura antes de começar o plantio.'
        },
        {
          ordem: 2,
          titulo: 'Semeadura com Intenção e Afeto',
          descricao: 'Cada criança deposita as sementes na profundidade correta, cobrindo delicadamente e cantando cantigas de broto.'
        },
        {
          ordem: 3,
          titulo: 'Rodízio dos Cuidados Diários',
          descricao: 'Criação de uma escala onde a cada dia uma dupla é responsável por checar a umidade e regar no início da manhã.'
        },
        {
          ordem: 4,
          titulo: 'Colheita e Degustação Compartilhada',
          descricao: 'Colheita cuidadosa sem arrancar a raiz inteira e preparação de um lanche sensorial com as folhas lavadas.'
        }
      ],
      aprendizados: [
        'Compreensão do ciclo de vida dos vegetais e paciência perante o ritmo natural.',
        'Desenvolvimento da motricidade fina ao manusear sementes minúsculas e ferramentas.',
        'Superação de seletividade alimentar através da participação ativa no cultivo.',
        'Senso de corresponsabilidade coletiva e empatia com outros seres vivos.'
      ],
      polaroids: [
        {
          titulo: 'Mãos na Terra',
          legenda: 'Descobrindo que a terra preta tem cheiro de floresta úmida.',
          icone: '🧤',
          rotacao: -3,
          fundoGradiente: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)'
        },
        {
          titulo: 'Primeiros Brotos',
          legenda: 'O entusiasmo ao ver o primeiro pontinho verde romper o solo!',
          icone: '🌿',
          rotacao: 2,
          fundoGradiente: 'linear-gradient(135deg, #fffde7, #fff9c4)'
        },
        {
          titulo: 'Hora da Rega',
          legenda: 'Cuidado compartilhado e paciência para não inundar as plantinhas.',
          icone: '🚿',
          rotacao: -1,
          fundoGradiente: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)'
        }
      ]
    },
    {
      id: 'tintas-naturais',
      titulo: 'Ateliê de Tintas da Terra & Cores Vivas',
      subtitulo: 'Extração de pigmentos ecológicos com beterraba, cúrcuma, casca de cebola e barro.',
      categoria: 'Arte & Natureza',
      categoriaCor: '#C46D4E',
      objeto: {
        icone: '🎨',
        nomeCurto: 'Potes de Pigmentos',
        dicaHover: 'Toque nos pigmentos para abrir o Ateliê de Cores Naturais',
        corFundo: '#FBE9E4'
      },
      faixaEtaria: '2 a 10 anos (Todas as etapas)',
      duracao: '3 oficinas temáticas',
      espaco: 'Ateliê de artes ou mesas ao ar livre',
      bncc: 'EI03TS02, EF15AR04 e EF15AR01',
      resumoImpacto: '100% de materiais biodegradáveis, livres de microplásticos e tintas sintéticas.',
      relato: `Neste projeto, transformamos a sala de aula em um laboratório alquímico onde a natureza é a própria paleta de pintura. 
      As crianças amassaram beterraba cozida para extrair o roxo profundo, misturaram pó de cúrcuma com água morna para alcançar um dourado solar e peneiraram diferentes tipos de terra para tons terrosos.
      Pintar com tintas que têm cheiro de tempero e textura viva desperta um encantamento estético que nenhuma tinta plástica industrial consegue proporcionar.`,
      materiais: [
        'Beterraba, espinafre, casca de cebola roxa e café solúvel',
        'Pó de cúrcuma (açafrão-da-terra), urucum (colorau) e carvão vegetal moído',
        'Terras de diferentes colorações (argila vermelha, terra preta, saibro amarelo)',
        'Goma vegetal ou amido de milho como aglutinante ecológico',
        'Folhas grossas de papel de algodão e pincéis de cerdas macias ou folhas de pinheiro'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Caça às Cores da Natureza',
          descricao: 'Coleta de folhas caídas, terra e especiarias trazidas de casa pelos alunos.'
        },
        {
          ordem: 2,
          titulo: 'Maceração e Extração de Pigmento',
          descricao: 'Esmagamento e filtragem com pilões manuais, coadores de pano e água morna.'
        },
        {
          ordem: 3,
          titulo: 'Adição da Liga Natural',
          descricao: 'Mistura com goma de polvilho para conferir consistência perfeita de guache.'
        },
        {
          ordem: 4,
          titulo: 'Pintura Livre e Aromática',
          descricao: 'Criação de murais sobre folhas e papel aquarela, explorando o aroma das tintas.'
        }
      ],
      aprendizados: [
        'Compreensão de processos físico-químicos simples de dissolução e pigmentação.',
        'Sensibilização ecológica contra o consumo de plásticos e resíduos sintéticos.',
        'Ampliação do repertório sensorial (tato, olfato e visão integrados na arte).',
        'Estímulo à criatividade autônoma sem padrões prontos.'
      ],
      polaroids: [
        {
          titulo: 'O Pote Amarelo de Cúrcuma',
          legenda: 'A surpresa com o aroma quente e a intensidade da cor dourada.',
          icone: '🫙',
          rotacao: 3,
          fundoGradiente: 'linear-gradient(135deg, #fff8e1, #ffecb3)'
        },
        {
          titulo: 'Pinceladas Botânicas',
          legenda: 'Usando galhinhos e folhas de cipreste no lugar dos pincéis convencionais.',
          icone: '🖌️',
          rotacao: -2,
          fundoGradiente: 'linear-gradient(135deg, #fbe9e7, #ffccbc)'
        },
        {
          titulo: 'Mural Aromático',
          legenda: 'Telas secando ao vento com perfume suave de beterraba e canela.',
          icone: '🖼️',
          rotacao: 1,
          fundoGradiente: 'linear-gradient(135deg, #ede7f6, #d1c4e9)'
        }
      ]
    },
    {
      id: 'guardioes-polinizadores',
      titulo: 'Hotel de Insetos & Guardiões dos Polinizadores',
      subtitulo: 'Construção de refúgios para abelhas solitárias e catalogação da microfauna.',
      categoria: 'Biodiversidade',
      categoriaCor: '#D3A15C',
      objeto: {
        icone: '🦋',
        nomeCurto: 'Lupa & Herbário',
        dicaHover: 'Toque na lupa para investigar o Hotel de Insetos e Polinizadores',
        corFundo: '#FEF7EC'
      },
      faixaEtaria: '5 a 10 anos (Infantil e Fundamental I)',
      duracao: '4 semanas de observação',
      espaco: 'Jardim da escola e cantos arborizados',
      bncc: 'EI03ET03, EF02CI04 e EF03CI07',
      resumoImpacto: '15 espécies de insetos e polinizadores catalogados de forma respeitosa no herbário.',
      relato: `Muitas crianças chegam à escola com medo instintivo de qualquer inseto. Esse projeto foi desenhado para trocar o medo pelo fascínio.
      Construímos juntos um "Hotel de Abelhas Solitárias e Joaninhas" usando bambus furados, pinhas secas, cascas de árvores e tijolos furados.
      Com lupas em mãos e cadernos de campo, as crianças passaram a observar as abelhas nativas sem ferrão (Jataí e Mirim) trabalhando nas flores da escola, compreendendo o papel insubstituível que esses minúsculos seres desempenham na produção de frutos e na vida na Terra.`,
      materiais: [
        'Pedaços de bambu oco cortados em diferentes diâmetros',
        'Pinhas secas, gravetos, cascas de eucalipto e blocos de madeira perfurada',
        'Uma caixa de madeira de feira (caixote reciclado) para estrutura',
        'Lupas de mão, cadernos de desenho para registro de campo e binóculos infantis'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Expedição de Investigação no Pátio',
          descricao: 'Mapeamento com lupas para identificar onde os insetos costumam se abrigar.'
        },
        {
          ordem: 2,
          titulo: 'Montagem Arquitetônica do Hotel',
          descricao: 'Encaixe dos canos de bambu, pinhas e gravetos dentro do caixote de madeira.'
        },
        {
          ordem: 3,
          titulo: 'Instalação em Ponto Estratégico',
          descricao: 'Fixação da estrutura em local protegido da chuva e próximo a plantas com flores.'
        },
        {
          ordem: 4,
          titulo: 'Diário de Bordo dos Pequenos Cientistas',
          descricao: 'Registros semanais desenhados pelas crianças dos novos hóspedes do hotel.'
        }
      ],
      aprendizados: [
        'Superação de fobias infantis através do conhecimento e respeito aos insetos.',
        'Noção ecológica de cadeia alimentar, polinização e equilíbrio ambiental.',
        'Desenvolvimento da postura de observação científica atenta e paciente.',
        'Reconhecimento das abelhas nativas sem ferrão brasileiras.'
      ],
      polaroids: [
        {
          titulo: 'Olhar de Perto',
          legenda: 'A lupa revelou detalhes nas asas transparentes que ninguém imaginava.',
          icone: '🔍',
          rotacao: -2,
          fundoGradiente: 'linear-gradient(135deg, #fff3e0, #ffe0b2)'
        },
        {
          titulo: 'O Hotel Pronto',
          legenda: 'Bambus e pinhas organizados com todo capricho para acolher as joaninhas.',
          icone: '🪵',
          rotacao: 3,
          fundoGradiente: 'linear-gradient(135deg, #efebe9, #d7ccc8)'
        },
        {
          titulo: 'A Abelha Jataí',
          legenda: 'Visita ilustre trabalhando incansavelmente no jardim de alecrim.',
          icone: '🐝',
          rotacao: -1,
          fundoGradiente: 'linear-gradient(135deg, #fffde7, #fff59d)'
        }
      ]
    },
    {
      id: 'papel-semente',
      titulo: 'Oficina de Papel Semente & Reciclagem Afetiva',
      subtitulo: 'Transformando aparas de papel usado em cartões plantáveis com camomila e flores.',
      categoria: 'Reciclagem',
      categoriaCor: '#347B98',
      objeto: {
        icone: '📜',
        nomeCurto: 'Folha Artesanal',
        dicaHover: 'Toque no papel artesanal para ver a Oficina de Papel Semente',
        corFundo: '#E6F4F8'
      },
      faixaEtaria: '4 a 8 anos',
      duracao: '2 encontros de 1h30',
      espaco: 'Sala de artes com bancada lavável',
      bncc: 'EI03ET02, EF02CI01 e EF15AR04',
      resumoImpacto: 'Mais de 35 kg de papel rascunho reaproveitado em cartões que viram flores.',
      relato: `O que fazemos com o papel que já foi desenhado dos dois lados? Em vez de descartar, ensinamos que o papel pode renascer em flor.
      As crianças picaram papéis usados, deixaram de molho, bateram a polpa na água e misturaram sementinhas de camomila e cravo-de-defunto.
      Usando molduras com tela mosquiteiro, prensaram suas próprias folhas de papel artesanal. Cada criança levou seu cartão para casa com a instrução: "Depois de ler a mensagem, rasgue este papel, molhe e plante na terra para ver brotar!"`,
      materiais: [
        'Aparas de folhas de papel sulfite usado (sem fitas adesivas nem plásticos)',
        'Bacias plásticas e liquidificador para processar a polpa',
        'Molduras de madeira com tela fina (bastidores ou tela mosquiteiro)',
        'Sementes de germinação fácil (camomila, margarida, manjericão ou rúcula)',
        'Pedaços de feltro ou panos de prato para prensagem e absorção'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Rasgar e Amaciar o Papel',
          descricao: 'Exercício motor de rasgar o papel em pedacinhos minúsculos e deixar de molho em água.'
        },
        {
          ordem: 2,
          titulo: 'Bater a Polpa e Misturar Sementes',
          descricao: 'Formação da massa líquida de celulose e adição suave das sementes vivas.'
        },
        {
          ordem: 3,
          titulo: 'Peneirar e Prensagem nas Telas',
          descricao: 'Retirada da lâmina de papel com a moldura e prensagem entre panos de algodão.'
        },
        {
          ordem: 4,
          titulo: 'Secagem ao Sol e Escrita Poética',
          descricao: 'Secagem natural e desenho com giz de cera ou carimbos artesanais.'
        }
      ],
      aprendizados: [
        'Entendimento palpável do conceito de economia circular e ciclo da matéria.',
        'Desenvolvimento da força e precisão motora ao rasgar e prensar.',
        'Sensibilização sobre o valor das árvores e a redução do desperdício de papel.',
        'Gesto de presentear as famílias com uma mensagem que floresce.'
      ],
      polaroids: [
        {
          titulo: 'Polpa em Transformação',
          legenda: 'Misturando a massa mágica com as mãos na bacia.',
          icone: '🥣',
          rotacao: -3,
          fundoGradiente: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)'
        },
        {
          titulo: 'Sementinhas Guardadas',
          legenda: 'Pequenos pontinhos pretos de camomila aninhados no papel.',
          icone: '🌼',
          rotacao: 2,
          fundoGradiente: 'linear-gradient(135deg, #e8eaf6, #c5cae9)'
        },
        {
          titulo: 'O Cartão que Floresce',
          legenda: 'Cartão presenteado para o Dia da Família pronto para ser plantado.',
          icone: '💌',
          rotacao: -1,
          fundoGradiente: 'linear-gradient(135deg, #fce4ec, #f8bbd0)'
        }
      ]
    },
    {
      id: 'pluviometro-chuva',
      titulo: 'Guardiões da Água & Chuvômetro Escolar',
      subtitulo: 'Captação de chuva com garrafa PET e estação meteorológica dos pequenos.',
      categoria: 'Água & Clima',
      categoriaCor: '#2D6E87',
      objeto: {
        icone: '💧',
        nomeCurto: 'Pluviômetro & Gotas',
        dicaHover: 'Toque no pluviômetro para ver o projeto de Cuidado com a Água',
        corFundo: '#E1F2F8'
      },
      faixaEtaria: '5 a 9 anos',
      duracao: '3 meses (Acompanhando a estação chuvosa)',
      espaco: 'Pátio aberto e jardim',
      bncc: 'EF03CI08, EF05CI02 e EF01CI02',
      resumoImpacto: 'Mais de 400 litros de água da chuva coletados e usados na rega da horta.',
      relato: `A água da chuva costumava significar apenas "não podemos brincar no parquinho hoje". 
      Com este projeto, transformamos os dias de chuva no momento mais aguardado da semana!
      Construímos pluviômetros caseiros utilizando garrafas plásticas invertidas e réguas graduadas. As crianças passaram a medir os milímetros de chuva caídos em cada temporal, anotando em um grande gráfico na parede da sala. A água recolhida nos baldes era transportada com zelo para alimentar a horta nos dias secos de sol.`,
      materiais: [
        'Garrafas PET transparentes cortadas e invertidas em formato de funil',
        'Fita métrica impermeável ou régua adesiva milimetrada',
        'Pedrinhas de rio e brita no fundo da garrafa para dar estabilidade contra o vento',
        'Baldes de captação conectados às calhas do telhado da escola',
        'Tabela ilustrada do tempo (sol, nublado, tempestade, garoa)'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Construção e Calibragem dos Medidores',
          descricao: 'Corte seguro da garrafa, colocação das pedrinhas de lastro e fixação da escala em milímetros.'
        },
        {
          ordem: 2,
          titulo: 'Instalação dos Postos Meteorológicos',
          descricao: 'Fixação dos pluviômetros em estacas de madeira no pátio aberto, sem cobertura de árvores.'
        },
        {
          ordem: 3,
          titulo: 'Leitura Matinal e Registro em Gráfico',
          descricao: 'Após cada chuva, uma criança faz a leitura do nível da água e anota no quadro coletivo.'
        },
        {
          ordem: 4,
          titulo: 'Uso Consciente na Rega da Horta',
          descricao: 'Distribuição da água coletada para alimentar as plantas e discussão sobre a crise hídrica.'
        }
      ],
      aprendizados: [
        'Compreensão elementar de medidas, grandezas matemáticas (milímetros e litros) e gráficos.',
        'Entendimento prático do ciclo hidrológico e das estações do ano.',
        'Valorização da água como recurso finito e vital que não deve ser desperdiçado.',
        'Sensação de autonomia ao operar uma estação científica real.'
      ],
      polaroids: [
        {
          titulo: 'Medição da Garoa',
          legenda: 'Conferindo na régua quantos milímetros caíram durante a noite.',
          icone: '📏',
          rotacao: 3,
          fundoGradiente: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)'
        },
        {
          titulo: 'Dia de Tempestade',
          legenda: 'Os baldes cheios e a comemoração coletiva pela horta que terá água!',
          icone: '⛈️',
          rotacao: -2,
          fundoGradiente: 'linear-gradient(135deg, #cfd8dc, #b0bec5)'
        },
        {
          titulo: 'Rega com Amor',
          legenda: 'Devolvendo para a terra a água limpa que caiu do céu.',
          icone: '🌱',
          rotacao: 1,
          fundoGradiente: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)'
        }
      ]
    },
    {
      id: 'land-art-galhos',
      titulo: 'Land Art & Brinquedos da Floresta',
      subtitulo: 'Criação de mandalas efêmeras, teares de gravetos e tintas de terra no gramado.',
      categoria: 'Arte & Natureza',
      categoriaCor: '#8C6239',
      objeto: {
        icone: '🪵',
        nomeCurto: 'Gravetos & Sementes',
        dicaHover: 'Toque nos gravetos para explorar o projeto de Land Art',
        corFundo: '#F5ECE3'
      },
      faixaEtaria: '2 a 7 anos',
      duracao: 'Encontros semanais livres',
      espaco: 'Gramado, bosque ou pátio com árvores',
      bncc: 'EI02TS02, EI03TS02 e EF15AR01',
      resumoImpacto: 'Zero geração de lixo: 100% dos elementos retornam ao ciclo orgânico do solo.',
      relato: `Land Art é a arte que dialoga com o vento, com as folhas que caem e com o efêmero. 
      Em vez de brinquedos plásticos industrializados, propusemos cestos de tesouros naturais: gravetos de todos os tamanhos, sementes de flamboyant, cascas de cigarra, folhas secas coloridas e pedrinhas polidas.
      As crianças criaram grandes mandalas no chão de terra, teares amarrados em árvores e labirintos sensoriais. Aprenderam que a beleza não precisa ser guardada em gavetas: ela pode ser admirada, fotografada e deixada para que o vento e a terra a transformem novamente.`,
      materiais: [
        'Cestos de palha para coleta autônoma pelos alunos',
        'Gravetos caídos, sementes secas grandes, pinhas, folhas de variados formatos',
        'Fios de barbante de algodão ou juta crua para amarração de teares',
        'Argila natural pura para modelagem de animaizinhos que secam ao sol'
      ],
      passos: [
        {
          ordem: 1,
          titulo: 'Caminhada Silenciosa dos Tesouros',
          descricao: 'Coleta atenta no chão sob as árvores, apenas de elementos que a árvore já soltou.'
        },
        {
          ordem: 2,
          titulo: 'Classificação Livre por Cores e Texturas',
          descricao: 'Separação dos materiais em círculos de palha: rugosos, lisos, compridos e redondos.'
        },
        {
          ordem: 3,
          titulo: 'Composição de Mandalas Coletivas',
          descricao: 'Criação no chão de mandalas geométricas e figuras de animais imaginários.'
        },
        {
          ordem: 4,
          titulo: 'Apreciação e Despedida Afetiva',
          descricao: 'Roda de conversa sobre o que sentiram e aceitação de que a arte pertence ao vento.'
        }
      ],
      aprendizados: [
        'Desenvolvimento do pensamento estético, simetria e senso de composição espacial.',
        'Respeito profundo aos seres vivos: não arrancar folhas da planta viva, só colher o que caiu.',
        'Desenvolvimento da capacidade de desapego e valorização do momento presente (arte efêmera).',
        'Acalento sensorial através do contato direto com texturas naturais.'
      ],
      polaroids: [
        {
          titulo: 'Mandala de Folhas Secas',
          legenda: 'Cores de outono organizadas em espiral perfeita pelas crianças.',
          icone: '🍂',
          rotacao: -2,
          fundoGradiente: 'linear-gradient(135deg, #fff3e0, #ffe0b2)'
        },
        {
          titulo: 'Tear de Galhos',
          legenda: 'Entrelaçando fios de algodão e folhas de samambaia em uma moldura rústica.',
          icone: '🧶',
          rotacao: 2,
          fundoGradiente: 'linear-gradient(135deg, #efebe9, #d7ccc8)'
        },
        {
          titulo: 'Esculturas na Argila',
          legenda: 'Pequenos passarinhos moldados em barro secando na grama ao sol.',
          icone: '🐦',
          rotacao: -3,
          fundoGradiente: 'linear-gradient(135deg, #fbe9e7, #ffccbc)'
        }
      ]
    }
  ];

  // Projetos filtrados pela categoria selecionada
  projetosFiltrados = computed(() => {
    const cat = this.categoriaSelecionada();
    if (cat === 'Todos') return this.projetos;
    return this.projetos.filter((p) => p.categoria === cat);
  });

  selecionarCategoria(cat: string): void {
    this.categoriaSelecionada.set(cat);
  }

  abrirPrancheta(projeto: ProjetoEcologico): void {
    this.projetoAtivo.set(projeto);
    this.abaAtiva.set('diario');

    // Rola a tela suavemente direto para a prancheta de campo
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const pranchetaEl = document.getElementById('prancheta-projeto');
        if (pranchetaEl) {
          pranchetaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  fecharPrancheta(): void {
    this.projetoAtivo.set(null);

    // Retorna suavemente o foco para a bancada
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const mesaEl = document.getElementById('mesa-bancada');
        if (mesaEl) {
          mesaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  mudarAba(aba: 'diario' | 'passos' | 'aprendizados' | 'galeria'): void {
    this.abaAtiva.set(aba);
  }

  proximoProjeto(): void {
    const atual = this.projetoAtivo();
    if (!atual) return;
    const index = this.projetos.findIndex((p) => p.id === atual.id);
    const proximoIndex = (index + 1) % this.projetos.length;
    this.abrirPrancheta(this.projetos[proximoIndex]);
  }

  projetoAnterior(): void {
    const atual = this.projetoAtivo();
    if (!atual) return;
    const index = this.projetos.findIndex((p) => p.id === atual.id);
    const anteriorIndex = (index - 1 + this.projetos.length) % this.projetos.length;
    this.abrirPrancheta(this.projetos[anteriorIndex]);
  }
}
