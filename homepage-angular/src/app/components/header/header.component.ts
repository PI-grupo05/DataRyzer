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
/*
 abrirMenu(){
    const menu = document.getElementsByClassName('nav__menu')
    const header = document.getElementsByClassName('header')
    if(this.menuFechado == true){
        menu[0].style.display = 'flex'
        header[0].style.transition = '0.5s'
        header[0].style.height = '30%'
        this.menuFechado = false
    }else{
        menu[0].style.display = 'none'
        header[0].style.height = '10%'
        this.menuFechado = true
    }
}
 abrirLogin(){
    window.location.href = "login.html"
} */
}
