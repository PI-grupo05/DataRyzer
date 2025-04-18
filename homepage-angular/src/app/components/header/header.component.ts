import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   menuFechado: boolean = true

    abrirMenu(){
        if(this.menuFechado == true){
            this.menuFechado = false
        }else{
            this.menuFechado = true
        }
    }

    abrirLogin(){
        window.location.href = "login.html"
    }
}
