import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProjetoEditorial {
  titulo: string;
  subtitulo?: string;
  tipo: string;
  corCapa?: string;
  paginas: string[];
}

@Component({
  selector: 'app-projetos-editoriais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projetos-editoriais.html',
  styleUrl: './projetos-editoriais.scss'
})
export class ProjetosEditoriais {
  projetos: ProjetoEditorial[] = [
    {
      titulo: 'A Pequena Semente de Girassol',
      subtitulo: 'Livro Infantil Ilustrado & Valores do Afeto',
      tipo: 'Livro Ilustrado',
      corCapa: '#366E4B',
      paginas: [
        'Público-alvo: Crianças de 4 a 8 anos.\n\nObjetivo: Apresentar princípios de paciência, empatia e coragem através do ciclo da semente que espera a chuva para florescer.',
        'Proposta Pedagógica: Aprendizagem baseada em storytelling e conexões socioemocionais com elementos botânicos.',
        'Estrutura Editorial:\n• Capa dura com acabamento fosco e verniz localizado\n• 32 páginas em papel couché 150g\n• Ilustrações autorais em aquarela tradicional\n• Formato quadrado 20x20cm',
        'Sumário:\nCapítulo 1: O sono debaixo da terra\nCapítulo 2: A tempestade amiga\nCapítulo 3: O primeiro raio de sol\n\nEstratégia de Divulgação: Contação de histórias em escolas e oficinas com plantio de sementes reais.'
      ]
    },
    {
      titulo: 'Aventuras na Horta Escolar',
      subtitulo: 'Tina e os Segredos da Terra',
      tipo: 'Material Didático & Narrativo',
      corCapa: '#C4573B',
      paginas: [
        'Público-alvo: Educação Infantil e Séries Iniciais (3 a 6 anos).\n\nObjetivo: Introduzir conceitos de sustentabilidade, respeito aos pequenos seres e alimentação viva e saudável.',
        'Narrativa Integrada: As crianças acompanham a minhoca Tina em sua jornada debaixo da terra, descobrindo como o composto orgânico alimenta as raízes das plantas.',
        'Recursos Inclusos:\n• Guia do educador com 6 propostas práticas de intervenção\n• Cartelas de atividades para registro do crescimento da horta\n• Roteiro de oficinas sensoriais para pais e alunos.'
      ]
    },
    {
      titulo: 'O Caderno das Palavras Vivas',
      subtitulo: 'Poesias e Rimas para Ler com as Mãos',
      tipo: 'Antologia Poética Infantil',
      corCapa: '#4B7B9C',
      paginas: [
        'Público-alvo: Crianças em fase de alfabetização (5 a 8 anos).\n\nObjetivo: Despertar o amor pela sonoridade das palavras, ritmo e rimas lúdicas.',
        'Conceito Artístico: Cada poema é acompanhado por uma proposta tátil (desenhar com o dedo, imitar o som do vento, procurar palavras escondidas no quintal).',
        'Estrutura:\n• Miolo em papel pólen 90g com toque aveludado\n• Tipografia pensada especialmente para leitores iniciantes\n• QR Code com audiolivro narrado pela autora.'
      ]
    }
  ];

  livroAtual = signal<number>(0);
  paginaAtual = signal<number>(0);
  paginaAnterior = signal<number>(0);
  virandoPagina = signal<boolean>(false);
  livroAberto = signal<boolean>(false);

  // Estado da animação de troca física de livro sobre a mesa
  animacaoLivro = signal<'saindo-esquerda' | 'saindo-direita' | 'entrando-esquerda' | 'entrando-direita' | null>(null);

  livroAnterior(): void {
    if (this.livroAtual() > 0 && !this.animacaoLivro()) {
      // 1. Livro atual sai deslizando para a direita
      this.animacaoLivro.set('saindo-direita');

      setTimeout(() => {
        // 2. Troca o livro e zera a página
        this.livroAtual.update((idx) => idx - 1);
        this.paginaAtual.set(0);
        this.paginaAnterior.set(0);
        this.virandoPagina.set(false);

        // 3. Novo livro entra vindo da esquerda e pousa na mesa
        this.animacaoLivro.set('entrando-esquerda');

        setTimeout(() => {
          this.animacaoLivro.set(null);
        }, 350);
      }, 240);
    }
  }

  proximoLivro(): void {
    if (this.livroAtual() < this.projetos.length - 1 && !this.animacaoLivro()) {
      // 1. Livro atual sai deslizando para a esquerda (tirando da mesa)
      this.animacaoLivro.set('saindo-esquerda');

      setTimeout(() => {
        // 2. Troca para o próximo livro
        this.livroAtual.update((idx) => idx + 1);
        this.paginaAtual.set(0);
        this.paginaAnterior.set(0);
        this.virandoPagina.set(false);

        // 3. Novo livro pousa suavemente vindo da direita
        this.animacaoLivro.set('entrando-direita');

        setTimeout(() => {
          this.animacaoLivro.set(null);
        }, 350);
      }, 240);
    }
  }

  selecionarLivro(index: number): void {
    if (index === this.livroAtual() || this.animacaoLivro()) return;
    if (index > this.livroAtual()) {
      this.animacaoLivro.set('saindo-esquerda');
      setTimeout(() => {
        this.livroAtual.set(index);
        this.paginaAtual.set(0);
        this.paginaAnterior.set(0);
        this.virandoPagina.set(false);
        this.animacaoLivro.set('entrando-direita');
        setTimeout(() => this.animacaoLivro.set(null), 350);
      }, 240);
    } else {
      this.animacaoLivro.set('saindo-direita');
      setTimeout(() => {
        this.livroAtual.set(index);
        this.paginaAtual.set(0);
        this.paginaAnterior.set(0);
        this.virandoPagina.set(false);
        this.animacaoLivro.set('entrando-esquerda');
        setTimeout(() => this.animacaoLivro.set(null), 350);
      }, 240);
    }
  }

  avancarPagina(): void {
    if (this.virandoPagina()) return;

    const total = this.projetos[this.livroAtual()].paginas.length;
    const pagAnterior = this.paginaAtual();
    this.paginaAnterior.set(pagAnterior);

    this.virandoPagina.set(true);
    this.paginaAtual.update((p) => (p + 1) % total);

    setTimeout(() => {
      this.virandoPagina.set(false);
    }, 450);
  }
}
