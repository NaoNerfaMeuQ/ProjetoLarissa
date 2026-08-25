import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { environment } from '../../environments/environment';

const app = initializeApp(environment.firebase);
const storage = getStorage(app);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async uploadImagem(arquivo: File, pasta: string = 'historias'): Promise<string> {
    const extensao = arquivo.name.split('.').pop();
    const nomeArquivo = `${pasta}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${extensao}`;
    const storageRef = ref(storage, nomeArquivo);

    const snapshot = await uploadBytes(storageRef, arquivo);
    return await getDownloadURL(snapshot.ref);
  }
}
