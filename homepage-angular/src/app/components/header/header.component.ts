import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   menuFechado: boolean = true;
   
    abrirMenu(){
      this.menuFechado = !this.menuFechado;
    }

    abrirLogin(){
      window.location.href = "http://34.202.174.0:8080/login.html";
    }
}
