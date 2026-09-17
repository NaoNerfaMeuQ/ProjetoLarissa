import { getApp, getApps, initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

// Compartilha uma única instância entre Auth e Storage e evita inicialização duplicada.
export const firebaseApp = getApps().length > 0
  ? getApp()
  : initializeApp(environment.firebase);
