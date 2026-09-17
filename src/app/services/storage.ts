import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { firebaseApp } from '../firebase';

const storage = getStorage(firebaseApp);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES: Readonly<Record<string, string>> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif'
};

const ALLOWED_FOLDERS = new Set(['historias', 'capas', 'conteudo']);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async uploadImagem(arquivo: File, pasta: string = 'historias'): Promise<string> {
    const extensao = ALLOWED_IMAGE_TYPES[arquivo.type];
    if (!extensao) {
      throw new Error('Formato de imagem não permitido. Use JPG, PNG, WebP, GIF ou AVIF.');
    }
    if (arquivo.size <= 0 || arquivo.size > MAX_IMAGE_BYTES) {
      throw new Error('A imagem deve ter entre 1 byte e 5 MB.');
    }
    if (!ALLOWED_FOLDERS.has(pasta)) {
      throw new Error('Pasta de upload não permitida.');
    }

    const nomeArquivo = `${pasta}/${crypto.randomUUID()}.${extensao}`;
    const storageRef = ref(storage, nomeArquivo);

    const snapshot = await uploadBytes(storageRef, arquivo, {
      contentType: arquivo.type,
      cacheControl: 'public,max-age=31536000,immutable'
    });
    return await getDownloadURL(snapshot.ref);
  }
}
