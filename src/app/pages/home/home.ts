import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  mostrarSplash = false;

  ngOnInit() {
    // Mudamos o nome da chave para "splashVisto" para forçar um teste limpo
    const jaAcessou = sessionStorage.getItem('splashVisto');

    if (!jaAcessou) {
      this.mostrarSplash = true;
      sessionStorage.setItem('splashVisto', 'true');
    }
  }
}
