import { CommonModule } from '@angular/common';
import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 /* constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ajustarAlturaVisivel();
      window.addEventListener('resize', this.ajustarAlturaVisivel);
    }
  }

  ajustarAlturaVisivel = () => {
    const altura = window.innerHeight;
    document.documentElement.style.setProperty('--altura-visivel', `${altura}px`);
  }; */

  constructor(private ngZone: NgZone) {}

  public sendEmail(e: Event) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.querySelector('[name="user_name"]') as HTMLInputElement).value.trim();
    const email = (form.querySelector('[name="user_email"]') as HTMLInputElement).value.trim();
    const message = (form.querySelector('[name="message"]') as HTMLInputElement).value.trim();
    const haveNumbers = /\d/.test(name);

    if (!name || !email || !message) {
      this.showError('Preencha todos os campos');
      return;
    }

    if (haveNumbers) {
      this.showError('O nome não pode conter números');
      return;
    }

    if (name.length < 3) {
      this.showError('O nome deve ter pelo menos 3 caracteres');
      return;
    }

    if (email.indexOf('@') === -1 || email.length < 3) {
      this.showError('Email inválido');
      return;
    }

    if (message.length > 200) {
      this.showError('A mensagem deve ter no máximo 100 caracteres');
      return;
    }


    emailjs
      .sendForm('service_3prs1pl', 'template_2kq0lgw', e.target as HTMLFormElement, {
        publicKey: 'NIMvV6gaPTo4BCT14',
      })
      .then(
        () => {
          console.log('SUCCESS!');

          Swal.fire({
            title: 'Sucesso!',
            text: 'Mensagem enviada!',
            icon: 'success',
            showConfirmButton: false,
            color: '#070226',
            heightAuto: false,
            scrollbarPadding: false,

          });

          setTimeout(() => {
            Swal.close();
          }, 2000);
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
          this.showError('Erro ao enviar mensagem');
        }
      );
  }

  private showError(message: string) { // pop up de erro
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        color: '#070226',
        customClass: {
          confirmButton: "custom-button",
        },
        heightAuto: false,
        scrollbarPadding: false,
    });
  }
}
