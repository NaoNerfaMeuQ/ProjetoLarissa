import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// ==========================================
// INTERFACES DOS MATERIAIS INTERATIVOS
// ==========================================

export interface CartaEmocao {
  id: string;
  nome: string;
  subtitulo: string;
  icone: string;
  corPrimaria: string;
  fundoGradiente: string;
  perguntaReflexiva: string;
  mediacaoPedagogica: string;
  sensacaoCorpo: string;
  virada: boolean;
}

export interface StoryCubeItem {
  icone: string;
  nome: string;
  detalhe: string;
}

export interface RimaOpcao {
  texto: string;
  icone: string;
  correta: boolean;
}

export interface RimaDesafio {
  palavraAlvo: string;
  iconeAlvo: string;
  categoria: string;
  dicaFonologica: string;
  explicacaoRima: string;
  opcoes: RimaOpcao[];
}

export interface LetraSensorial {
  letra: string;
  palavra: string;
  icone: string;
  texturaReal: string;
  fraseAfetiva: string;
  passosTracado: string[];
}

export type TipoMaterial = 'emocoes' | 'story-cubes' | 'rimas' | 'alfabeto';

@Component({
  selector: 'app-materiais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materiais.html',
  styleUrl: './materiais.scss'
})
export class Materiais {
  // Material ativo no Laboratório
  materialAtivo = signal<TipoMaterial>('emocoes');

  // ==========================================
  // 1. RECURSO: BARALHO DAS EMOÇÕES (FLIP CARDS)
  // ==========================================
  cartasEmocoes = signal<CartaEmocao[]>([
    {
      id: 'alegria',
      nome: 'Alegria Radiante',
      subtitulo: 'A energia do entusiasmo e do riso',
      icone: '☀️',
      corPrimaria: '#E5A93C',
      fundoGradiente: 'linear-gradient(135deg, #FFF9E6 0%, #FFE8A3 100%)',
      perguntaReflexiva: 'O que faz seu coração bater levinho como uma bexiga voando?',
      mediacaoPedagogica: 'Convide a criança a desenhar ou encenar o momento mais luminoso da sua semana, incentivando a partilha de afeto.',
      sensacaoCorpo: 'Sorriso solto, calor no peito e vontade de pular.',
      virada: false
    },
    {
      id: 'calma',
      nome: 'Calma & Serenidade',
      subtitulo: 'A quietude da brisa e da respiração',
      icone: '🍃',
      corPrimaria: '#4A8F6A',
      fundoGradiente: 'linear-gradient(135deg, #EDF7F2 0%, #C8E8D7 100%)',
      perguntaReflexiva: 'Quando você fecha os olhos, qual som da natureza te traz paz?',
      mediacaoPedagogica: 'Pratique com a turma a respiração da flor e da vela: "Cheirar a rosa bem devagar e soprar a velinha sem apagar".',
      sensacaoCorpo: 'Ombros relaxados, respiração profunda e corpo macio.',
      virada: false
    },
    {
      id: 'medo',
      nome: 'Medo & Insegurança',
      subtitulo: 'O sinal de alerta que pede proteção',
      icone: '🌧️',
      corPrimaria: '#5B7A9C',
      fundoGradiente: 'linear-gradient(135deg, #EEF4F8 0%, #C7DCEB 100%)',
      perguntaReflexiva: 'Quando um monstrinho do medo aparece, quem é seu porto seguro para um abraço?',
      mediacaoPedagogica: 'Valide o sentimento sem diminuí-lo. Mostre que até os animais mais fortes sentem medo e que o abraço acolhe a tempestade.',
      sensacaoCorpo: 'Frio na barriga, olhos arregalados e aperto na garganta.',
      virada: false
    },
    {
      id: 'frustracao',
      nome: 'Raiva & Frustração',
      subtitulo: 'O vulcão que quer ser escutado',
      icone: '🌋',
      corPrimaria: '#C4573B',
      fundoGradiente: 'linear-gradient(135deg, #FDF0EC 0%, #F9CEBF 100%)',
      perguntaReflexiva: 'Quando a torre de blocos cai e dá raiva, o que podemos fazer para a fumaça passar?',
      mediacaoPedagogica: 'Ofereça o "Pote da Calma", massinha de modelar para amassar com força ou a técnica de contar até cinco respirando.',
      sensacaoCorpo: 'Mãos fechadas, rosto quente e respiração acelerada.',
      virada: false
    }
  ]);

  virarCarta(id: string): void {
    this.cartasEmocoes.update((cartas) =>
      cartas.map((c) => (c.id === id ? { ...c, virada: !c.virada } : c))
    );
  }

  virarTodasCartas(virar: boolean): void {
    this.cartasEmocoes.update((cartas) =>
      cartas.map((c) => ({ ...c, virada: virar }))
    );
  }

  sortearCartaEmocao(): void {
    this.virarTodasCartas(false);
    setTimeout(() => {
      const indexAleatorio = Math.floor(Math.random() * this.cartasEmocoes().length);
      this.cartasEmocoes.update((cartas) =>
        cartas.map((c, i) => (i === indexAleatorio ? { ...c, virada: true } : c))
      );
    }, 250);
  }

  // ==========================================
  // 2. RECURSO: DADOS MÁGICOS DE HISTÓRIAS (STORY CUBES)
  // ==========================================
  personagens: StoryCubeItem[] = [
    { icone: '🦉', nome: 'A Coruja Poeta', detalhe: 'Que lê livros nas copas das árvores' },
    { icone: '👧', nome: 'A Menina Inventora', detalhe: 'Que constrói máquinas de recolher estrelas' },
    { icone: '🐻', nome: 'O Urso Jardineiro', detalhe: 'Que conversa com as abelhas e flores' },
    { icone: '🦊', nome: 'A Raposa Curiosa', detalhe: 'Que coleciona perguntas que ninguém sabe responder' },
    { icone: '🤖', nome: 'O Robô de Sucata', detalhe: 'Que descobriu como fazer cócegas nas plantas' },
    { icone: '🐢', nome: 'A Tartaruga Veloz', detalhe: 'Que corre rápido quando está sonhando' }
  ];

  cenarios: StoryCubeItem[] = [
    { icone: '🌲', nome: 'No Bosque dos Vagalumes', detalhe: 'Onde as árvores brilham à noite' },
    { icone: '🏰', nome: 'No Castelo de Papelão', detalhe: 'Com torres feitas de caixas de sapato' },
    { icone: '🌊', nome: 'No Rio das Pedras Azuis', detalhe: 'Onde os peixinhos cantam cantigas de roda' },
    { icone: '☁️', nome: 'Em Cima de uma Nuvem de Algodão', detalhe: 'Onde o vento faz cócegas nas bochechas' },
    { icone: '🕳️', nome: 'Dentro de uma Toca Secreta', detalhe: 'Iluminada por lanternas de cogumelo' },
    { icone: '🌺', nome: 'No Jardim das Plantas Gigantes', detalhe: 'Onde uma folha serve de guarda-chuva' }
  ];

  objetosMagicos: StoryCubeItem[] = [
    { icone: '🗝️', nome: 'Uma Chave Dourada', detalhe: 'Que abre portas para mundos imaginários' },
    { icone: '📜', nome: 'Um Mapa que Muda de Desenho', detalhe: 'Que mostra onde está escondido um tesouro de risadas' },
    { icone: '🪄', nome: 'Um Pincel de Tintas Vivas', detalhe: 'Tudo o que ele pinta cria asas e voa' },
    { icone: '🧭', nome: 'A Bússola dos Sentimentos', detalhe: 'Que aponta para onde alguém precisa de ajuda' },
    { icone: '🪞', nome: 'Um Espelho Mágico', detalhe: 'Que revela a coragem secreta de quem olha nele' },
    { icone: '🪈', nome: 'Uma Flauta de Bambu', detalhe: 'Que faz as nuvens dançarem ciranda' }
  ];

  dadoPersonagem = signal<StoryCubeItem>(this.personagens[0]);
  dadoCenario = signal<StoryCubeItem>(this.cenarios[0]);
  dadoObjeto = signal<StoryCubeItem>(this.objetosMagicos[0]);
  dadosRolando = signal<boolean>(false);
  contadorHistorias = signal<number>(1);

  rolarDados(): void {
    this.dadosRolando.set(true);

    let giros = 0;
    const intervalo = setInterval(() => {
      this.dadoPersonagem.set(this.personagens[Math.floor(Math.random() * this.personagens.length)]);
      this.dadoCenario.set(this.cenarios[Math.floor(Math.random() * this.cenarios.length)]);
      this.dadoObjeto.set(this.objetosMagicos[Math.floor(Math.random() * this.objetosMagicos.length)]);
      giros++;

      if (giros >= 10) {
        clearInterval(intervalo);
        this.dadosRolando.set(false);
        this.contadorHistorias.update((n) => n + 1);
      }
    }, 80);
  }

  // ==========================================
  // 3. RECURSO: JOGO DE PAREAMENTO DE RIMAS
  // ==========================================
  desafiosRimas: RimaDesafio[] = [
    {
      palavraAlvo: 'Sapo',
      iconeAlvo: '🐸',
      categoria: 'Fauna & Natureza',
      dicaFonologica: 'Termina com o som final "-APO"',
      explicacaoRima: 'Sapo rima com Sapato e Pato! O som final "-APO" é o segredo.',
      opcoes: [
        { texto: 'Sapato', icone: '👟', correta: true },
        { texto: 'Estrela', icone: '⭐', correta: false },
        { texto: 'Pato', icone: '🦆', correta: true },
        { texto: 'Janela', icone: '🪟', correta: false }
      ]
    },
    {
      palavraAlvo: 'Abelha',
      iconeAlvo: '🐝',
      categoria: 'Insetos & Flores',
      dicaFonologica: 'Termina com o som final "-ELHA"',
      explicacaoRima: 'Abelha rima com Ovelha e Orelha! O som "-ELHA" soa igualzinho.',
      opcoes: [
        { texto: 'Ovelha', icone: '🐑', correta: true },
        { texto: 'Maçã', icone: '🍎', correta: false },
        { texto: 'Carro', icone: '🚗', correta: false },
        { texto: 'Orelha', icone: '👂', correta: true }
      ]
    },
    {
      palavraAlvo: 'Flor',
      iconeAlvo: '🌸',
      categoria: 'Jardim Botânico',
      dicaFonologica: 'Termina com o som final "-OR"',
      explicacaoRima: 'Flor rima com Amor, Tambor e Calor! Um som forte e poético.',
      opcoes: [
        { texto: 'Amor', icone: '❤️', correta: true },
        { texto: 'Bola', icone: '⚽', correta: false },
        { texto: 'Tambor', icone: '🥁', correta: true },
        { texto: 'Nuvem', icone: '☁️', correta: false }
      ]
    },
    {
      palavraAlvo: 'Chuva',
      iconeAlvo: '🌧️',
      categoria: 'Clima & Água',
      dicaFonologica: 'Termina com o som final "-UVA"',
      explicacaoRima: 'Chuva rima com Uva e Luva! Duas rimas deliciosas e acolhedoras.',
      opcoes: [
        { texto: 'Uva', icone: '🍇', correta: true },
        { texto: 'Peixe', icone: '🐟', correta: false },
        { texto: 'Luva', icone: '🧤', correta: true },
        { texto: 'Gato', icone: '🐱', correta: false }
      ]
    }
  ];

  rodadaRimaAtual = signal<number>(0);
  respostaSelecionada = signal<string | null>(null);
  acertouResposta = signal<boolean | null>(null);
  pontosRima = signal<number>(0);

  desafioAtual = computed(() => this.desafiosRimas[this.rodadaRimaAtual()]);

  testarOpcaoRima(opcao: RimaOpcao): void {
    this.respostaSelecionada.set(opcao.texto);
    if (opcao.correta) {
      this.acertouResposta.set(true);
      this.pontosRima.update((p) => p + 10);
    } else {
      this.acertouResposta.set(false);
    }
  }

  proximaRodadaRima(): void {
    this.respostaSelecionada.set(null);
    this.acertouResposta.set(null);
    const proxima = (this.rodadaRimaAtual() + 1) % this.desafiosRimas.length;
    this.rodadaRimaAtual.set(proxima);
  }

  // ==========================================
  // 4. RECURSO: ALFABETÁRIO SENSORIAL DE TEXTURAS
  // ==========================================
  letrasSensoriais: LetraSensorial[] = [
    {
      letra: 'A',
      palavra: 'Árvore & Afeto',
      icone: '🌳',
      texturaReal: 'Casca de eucalipto e folhas secas trituradas coladas no papelão',
      fraseAfetiva: 'O "A" sobe como galho alto, desce para o chão e cruza num abraço forte.',
      passosTracado: ['1. Suba a ladeira da árvore', '2. Desça até a raiz', '3. Cruze o galho no meio']
    },
    {
      letra: 'B',
      palavra: 'Borboleta & Broto',
      icone: '🦋',
      texturaReal: 'Barbante de algodão cru e sementes de girassol',
      fraseAfetiva: 'O "B" tem um corpinho em pé e duas asinhas gordinhas prontas para voar.',
      passosTracado: ['1. Trace a linha reta do caule', '2. Faça a asinha de cima', '3. Faça a asinha de baixo']
    },
    {
      letra: 'C',
      palavra: 'Ciranda & Cuidado',
      icone: '🤝',
      texturaReal: 'Lixa d\'água fina e terra preta peneirada com cola',
      fraseAfetiva: 'O "C" é uma roda de mãos dadas que deixou uma portinha aberta para você entrar.',
      passosTracado: ['1. Comece no topo', '2. Faça uma curva redondinha', '3. Pare antes de fechar a roda']
    },
    {
      letra: 'L',
      palavra: 'Larissa & Literatura',
      icone: '📖',
      texturaReal: 'Feltro macio e pequenos retalhos de tecido de algodão',
      fraseAfetiva: 'O "L" desce reto como uma cachoeira e deita na grama para descansar.',
      passosTracado: ['1. Desça a linha longa', '2. Puxe o pezinho para a direita']
    },
    {
      letra: 'S',
      palavra: 'Semente & Sustentabilidade',
      icone: '🌱',
      texturaReal: 'Grãos de chia, linhaça e areia fina colorida',
      fraseAfetiva: 'O "S" faz uma curvinha mágica como a cobrinha d\'água nadando no riacho.',
      passosTracado: ['1. Faça a curva para a esquerda', '2. Desça serpenteando', '3. Vire para a direita e volte']
    }
  ];

  letraSensorialAtiva = signal<LetraSensorial>(this.letrasSensoriais[0]);
  animandoTracado = signal<boolean>(false);

  selecionarLetraSensorial(letra: LetraSensorial): void {
    this.letraSensorialAtiva.set(letra);
    this.animandoTracado.set(true);
    setTimeout(() => this.animandoTracado.set(false), 800);
  }

  // ==========================================
  // NAVEGAÇÃO GERAL ENTRE OS MATERIAIS
  // ==========================================
  selecionarMaterial(tipo: TipoMaterial): void {
    this.materialAtivo.set(tipo);

    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const labEl = document.getElementById('laboratorio-interativo');
        if (labEl) {
          labEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }
}
