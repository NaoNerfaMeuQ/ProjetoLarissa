import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CapituloJornada {
  id: string;
  capitulo: string;
  titulo: string;
  subtitulo: string;
  icone: string;
  cor: string;
  fundoBadge: string;
  relato: string;
  destaques: string[];
}

export interface ServicoEditorial {
  titulo: string;
  icone: string;
  subtitulo: string;
  descricao: string;
  publico: string;
  corTag: string;
}

export interface DetalheAfetivo {
  icone: string;
  titulo: string;
  descricao: string;
  corFundo: string;
}

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.scss'
})
export class Sobre {
  // Controle da linha do tempo / capítulos
  capituloAtivo = signal<number>(0);
  copiouEmail = signal<boolean>(false);

  emailContato = 'larissacampos.autora@gmail.com';
  whatsappLink = 'https://wa.me/5500000000000'; // Substituir pelo número oficial profissional

  // ==========================================
  // 1. A JORNADA EM 3 CAPÍTULOS
  // ==========================================
  capitulos: CapituloJornada[] = [
    {
      id: 'cap-1',
      capitulo: 'Capítulo 1',
      titulo: 'O Chão de Escola & Os Olhos da Infância',
      subtitulo: 'A escuta sensível do dia a dia na Educação Infantil',
      icone: '🎒',
      cor: '#366E4B',
      fundoBadge: '#E7F3EC',
      relato: `Minha escrita nasceu da observação viva na sala de aula. Antes de colocar qualquer palavra no papel, aprendi a escutar como as crianças conversam entre si, o que faz os olhinhos brilharem de curiosidade e como pequenos conflitos do recreio viram grandes dilemas emocionais. 
      Compreender o desenvolvimento cognitivo e socioemocional infantil me ensinou que uma boa história não precisa ser moralista: ela precisa acolher e respeitar a inteligência dos pequenos leitores.`,
      destaques: [
        'Formação sólida em Pedagogia com foco em Primeira Infância.',
        'Desenvolvimento de práticas pedagógicas baseadas em escuta e afeto.',
        'Criação de recursos didáticos aplicados na rotina escolar.'
      ]
    },
    {
      id: 'cap-2',
      capitulo: 'Capítulo 2',
      titulo: 'A Semente da Palavra & Literatura Autoral',
      subtitulo: 'A transição da prática escolar para a narrativa que encanta',
      icone: '🌱',
      cor: '#D65E4B',
      fundoBadge: '#FDF0ED',
      relato: `Percebi que a literatura é a ponte mais poderosa para conectar crianças, famílias e a natureza. Passei a escrever contos, poemas rimados e crônicas que unem a leveza da imaginação à intencionalidade educacional.
      Cada narrativa que desenvolvo é pensada para ser lida em voz alta, com sonoridade musical, pausas para perguntas na roda e abertura para que a criança seja coautora da aventura através do diálogo.`,
      destaques: [
        'Escrita de originais infantis com rima, ritmo e poesia.',
        'Narrativas ecológicas com personagens inspirados na fauna e flora brasileiras.',
        'Integração de temas como paciência, luto, amizade e autoconfiança.'
      ]
    },
    {
      id: 'cap-3',
      capitulo: 'Capítulo 3',
      titulo: 'A Visão Editorial & O Objeto Livro',
      subtitulo: 'Do manuscrito ao livro impresso com potencial de adoção escolar',
      icone: '📚',
      cor: '#4B93C4',
      fundoBadge: '#EDF6FC',
      relato: `O diferencial do meu trabalho para as editoras é a visão 360° da obra. Não entrego apenas um texto: penso no projeto editorial completo — desde a paginação e o ritmo visual com o ilustrador até o guia do professor com propostas alinhadas à BNCC.
      Isso garante que a obra tenha apelo afetivo para as famílias nas livrarias e excelente aceitação em programas de adoção escolar governamentais e privados.`,
      destaques: [
        'Estruturação de projetos gráficos e roteiros para ilustradores.',
        'Elaboração de Manuais do Educador alinhados à BNCC (EI e Fundamental I).',
        'Visão comercial e de marketing pedagógico para formação de leitores.'
      ]
    }
  ];

  // ==========================================
  // 2. O QUE POSSO CRIAR PARA A SUA EDITORA / ESCOLA
  // ==========================================
  servicos: ServicoEditorial[] = [
    {
      titulo: 'Originais & Livros Infantis',
      icone: '📖',
      subtitulo: 'Manuscritos prontos para publicação',
      descricao: 'Contos ilustrados, fábulas contemporâneas e narrativas poéticas entregues com proposta temática e plano de desenvolvimento.',
      publico: 'Editoras Infanto-Juvenis & Selos Literários',
      corTag: '#366E4B'
    },
    {
      titulo: 'Projetos Paradidáticos & Guias BNCC',
      icone: '📋',
      subtitulo: 'Materiais pedagógicos complementares',
      descricao: 'Criação de Manuais do Professor, roteiros de atividades e projetos de leitura que facilitam a adoção de obras literárias nas escolas.',
      publico: 'Sistemas de Ensino & Redes Escolares',
      corTag: '#D65E4B'
    },
    {
      titulo: 'Encontros com a Autora & Oficinas',
      icone: '🎤',
      subtitulo: 'Vivências literárias presenciais e online',
      descricao: 'Contação de histórias interativa com elementos táteis, rodas de conversa sobre escrita e palestras de formação para professores.',
      publico: 'Feiras de Livros, Escolas & Bibliotecas',
      corTag: '#4B93C4'
    },
    {
      titulo: 'Consultoria em Educação Ambiental',
      icone: '🌿',
      subtitulo: 'Vivências ecológicas e hortas pedagógicas',
      descricao: 'Planejamento de ateliês de tintas naturais, hotel de insetos e projetos de sustentabilidade prática integrados ao currículo escolar.',
      publico: 'Escolas, Centros Culturais & ONGs',
      corTag: '#EDA739'
    }
  ];

  // ==========================================
  // 3. UNIVERSO AFETIVO & INSPIRAÇÕES
  // ==========================================
  notasAfetivas: DetalheAfetivo[] = [
    {
      icone: '🍃',
      titulo: 'Inspiração Ghibli',
      descricao: 'A paixão pelo olhar contemplativo de Hayao Miyazaki, onde as florestas têm alma e a bondade das crianças move o mundo.',
      corFundo: '#E7F3EC'
    },
    {
      icone: '🖋️',
      titulo: 'Escrita Artesanal',
      descricao: 'Cadernos de papel linho, canetas tinteiro e o hábito de ler cada parágrafo em voz alta para testar a musicalidade da rima.',
      corFundo: '#FDF0ED'
    },
    {
      icone: '🌻',
      titulo: 'Amor pela Terra',
      descricao: 'O encantamento por sementes que brotam, o aroma de chuva na horta e o toque na terra preta como remédio para a alma.',
      corFundo: '#FEF6E6'
    },
    {
      icone: '🧸',
      titulo: 'Respeito à Infância',
      descricao: 'A certeza de que a criança não precisa de lições de moral prontas, mas de narrativas que alimentem sua imaginação livre.',
      corFundo: '#EDF6FC'
    }
  ];

  selecionarCapitulo(index: number): void {
    this.capituloAtivo.set(index);
  }

  copiarEmail(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.emailContato);
      this.copiouEmail.set(true);
      setTimeout(() => this.copiouEmail.set(false), 2500);
    }
  }
}
