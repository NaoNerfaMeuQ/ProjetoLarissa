import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Sobre } from './pages/sobre/sobre';
import { ProjetosEditoriais } from './pages/projetos-editoriais/projetos-editoriais';
import { MeioAmbiente } from './pages/meio-ambiente/meio-ambiente';
import { Materiais } from './pages/materiais/materiais';
import { MinhasHistorias } from './pages/minhas-historias/minhas-historias';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'sobre', component: Sobre },
  { path: 'projetos-editoriais', component: ProjetosEditoriais },
  { path: 'meio-ambiente', component: MeioAmbiente },
  { path: 'materiais', component: Materiais },
  { path: 'minhas-historias', component: MinhasHistorias },

  { path: '**', redirectTo: '' }
];
