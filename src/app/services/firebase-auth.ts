import { Injectable, signal } from '@angular/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { firebaseApp } from '../firebase';

const auth = getAuth(firebaseApp);

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
