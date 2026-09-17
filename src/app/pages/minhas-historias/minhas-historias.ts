import { Component, OnInit, signal, ElementRef, ViewChild, SecurityContext, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Story, StoryRequest, StoryService } from '../../services/story';
import { FirebaseAuthService } from '../../services/firebase-auth';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-minhas-historias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './minhas-historias.html',
  styleUrl: './minhas-historias.scss'
})
export class MinhasHistorias implements OnInit {
  @ViewChild('editorTexto') editorTexto!: ElementRef<HTMLDivElement>;

  private storyService = inject(StoryService);
  public authService = inject(FirebaseAuthService);
  private storageService = inject(StorageService);
  private sanitizer = inject(DomSanitizer);

  historias = signal<Story[]>([]);
  historiaSelecionada = signal<Story | null>(null);
  carregando = signal<boolean>(true);
  exibirModal = signal<boolean>(false);
  exibirModalLogin = signal<boolean>(false);
  erroConexao = signal<boolean>(false);
  carregandoLogin = signal<boolean>(false);
  enviandoImagem = signal<boolean>(false);
  erroLoginMsg = signal<string>('');
  private readonly tiposImagemPermitidos = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif'
  ]);

  credenciais = {
    email: '',
    senha: ''
  };

  novaHistoria: StoryRequest = {
    title: '',
    subtitle: '',
    content: '',
    imageUrl: '',
    category: 'Infantil'
  };

  ngOnInit(): void {
    this.carregarHistorias();
  }

  carregarHistorias(): void {
    this.carregando.set(true);
    this.erroConexao.set(false);

    this.storyService.getStories().subscribe({
      next: (dados) => {
        this.historias.set(dados || []);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error('Erro ao carregar histórias:', erro);
        this.carregando.set(false);
        this.erroConexao.set(true);
      }
    });
  }

  abrirHistoria(historia: Story): void {
    this.historiaSelecionada.set(historia);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  voltarParaFeed(): void {
    this.historiaSelecionada.set(null);
  }

  extrairResumo(conteudoHtml: string, limite: number = 160): string {
    if (!conteudoHtml) return '';
    const textoPuro = conteudoHtml.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (textoPuro.length <= limite) return textoPuro;
    return textoPuro.substring(0, limite) + '...';
  }

  abrirModal(): void {
    if (!this.authService.estaAutenticado()) {
      this.exibirModalLogin.set(true);
      return;
    }
    this.exibirModal.set(true);
  }

  fecharModal(): void {
    this.exibirModal.set(false);
    this.novaHistoria = {
      title: '',
      subtitle: '',
      content: '',
      imageUrl: '',
      category: 'Infantil'
    };
  }

  async autenticar(): Promise<void> {
    if (!this.credenciais.email.trim() || !this.credenciais.senha.trim()) {
      this.erroLoginMsg.set('Informe e-mail e senha.');
      return;
    }

    this.carregandoLogin.set(true);
    this.erroLoginMsg.set('');

    try {
      await this.authService.login(this.credenciais.email, this.credenciais.senha);
      this.exibirModalLogin.set(false);
      this.credenciais = { email: '', senha: '' };
      this.carregandoLogin.set(false);
      this.exibirModal.set(true);
    } catch (erro: any) {
      console.error('Erro ao autenticar:', erro);
      this.carregandoLogin.set(false);
      this.erroLoginMsg.set('E-mail ou senha inválidos.');
    }
  }

  async deslogar(): Promise<void> {
    await this.authService.logout();
  }

  formatar(comando: string, valor: string | undefined = undefined): void {
    document.execCommand(comando, false, valor);
    this.editorTexto.nativeElement.focus();
  }

  async aoSelecionarCapa(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const arquivo = input.files[0];
      if (arquivo.size > 5 * 1024 * 1024) {
        alert('A imagem de capa deve ter no máximo 5MB.');
        input.value = '';
        return;
      }
      if (!this.tiposImagemPermitidos.has(arquivo.type)) {
        alert('Formato não permitido. Use JPG, PNG, WebP, GIF ou AVIF.');
        input.value = '';
        return;
      }

      this.enviandoImagem.set(true);
      try {
        const urlDownload = await this.storageService.uploadImagem(arquivo, 'capas');
        this.novaHistoria.imageUrl = urlDownload;
      } catch (erro) {
        console.error('Erro ao enviar capa para o Storage:', erro);
        alert('Erro ao enviar imagem.');
      } finally {
        this.enviandoImagem.set(false);
      }
    }
  }

  removerCapa(event: MouseEvent): void {
    event.stopPropagation();
    this.novaHistoria.imageUrl = '';
  }

  async inserirImagemNoTexto(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const arquivo = input.files[0];
      if (arquivo.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }
      if (!this.tiposImagemPermitidos.has(arquivo.type)) {
        alert('Formato não permitido. Use JPG, PNG, WebP, GIF ou AVIF.');
        input.value = '';
        return;
      }

      this.enviandoImagem.set(true);
      try {
        const urlDownload = await this.storageService.uploadImagem(arquivo, 'conteudo');
        document.execCommand('insertImage', false, urlDownload);
      } catch (erro) {
        console.error('Erro ao enviar imagem inline:', erro);
        alert('Erro ao inserir imagem no texto.');
      } finally {
        this.enviandoImagem.set(false);
        input.value = '';
      }
    }
  }

  publicarHistoria(): void {
    const conteudoHtml = this.editorTexto.nativeElement.innerHTML.trim();

    if (!this.novaHistoria.title.trim() || !conteudoHtml || conteudoHtml === '<br>') {
      alert('Preencha o título e o conteúdo da história!');
      return;
    }

    this.novaHistoria.content = conteudoHtml;

    this.storyService.createStory(this.novaHistoria).subscribe({
      next: () => {
        this.fecharModal();
        this.carregarHistorias();
      },
      error: (erro) => {
        if (erro.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
          this.authService.logout();
        } else {
          console.error('Erro ao publicar:', erro);
        }
      }
    });
  }

  excluirHistoria(id?: string, event?: MouseEvent): void {
    if (event) event.stopPropagation();
    if (!id || !confirm('Deseja realmente apagar esta publicação?')) return;

    this.storyService.deleteStory(id).subscribe({
      next: () => {
        if (this.historiaSelecionada()?.id === id) {
          this.voltarParaFeed();
        }
        this.carregarHistorias();
      },
      error: (erro) => {
        if (erro.status === 401) {
          alert('Ação não autorizada.');
          this.authService.logout();
        } else {
          console.error('Erro ao apagar história:', erro);
        }
      }
    });
  }

  sanitizarHtml(conteudo: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, conteudo) || '';
  }
}
