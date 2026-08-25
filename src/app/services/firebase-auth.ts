import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebase);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  usuario = signal<User | null>(null);
  estaAutenticado = signal<boolean>(false);

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.usuario.set(user);
      this.estaAutenticado.set(!!user);
    });
  }

  async login(email: string, senha: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, senha);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  async obterTokenJwt(): Promise<string | null> {
    const user = auth.currentUser;
    return user ? await user.getIdToken() : null;
  }
}
