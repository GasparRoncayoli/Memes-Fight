import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Auth, } from '@angular/fire/auth';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit, OnDestroy {
  memeForm: FormGroup; // Declarar el formulario sin inicializarlo
  user: any; // Define user como any
  private userSubscription: Subscription | undefined;

  private url =
    'https://cors-anywhere.herokuapp.com/https://api.imgflip.com/caption_image';
  private templateId = 61579;
  private username = 'gasparroncayoli';
  private password = 'balneario24';

  text0: string = '';
  text1: string = '';
  memeUrl = '';
  memeImageVisible = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private auth: Auth, // Inyecta el servicio Auth



  ) {
    this.memeForm = this.formBuilder.group({
      text0: [''],
      text1: [''],
    });
  }

  actualizarMeme() {
    const text0 = this.memeForm.get('text0')?.value ?? '';
    const text1 = this.memeForm.get('text1')?.value ?? '';

    // Crear una instancia de URLSearchParams para codificar los parámetros
    const requestData = new URLSearchParams();

    requestData.append('template_id', this.templateId.toString());
    requestData.append('username', this.username);
    requestData.append('password', this.password);
    requestData.append('text0', text0);
    requestData.append('text1', text1);

    fetch(this.url, {
      method: 'POST',
      body: requestData.toString(), // Convertir a cadena URL codificada
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Establecer el encabezado correcto
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.memeUrl = data.data.url;
          console.log('URL del meme creado:', this.memeUrl);
          this.memeImageVisible = true;

          // Incrementa la experiencia del usuario si está autenticado
          if (this.user) {
            this.userService.incrementUserExperience(this.user.uid);
          } else {
            console.log("El usuario no está autenticado");
          }
        } else {
          console.error('Error al crear el meme:', data.error_message);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  }


  cambiarTemplate() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const memes = data.data.memes;
          const randomIndex = Math.floor(Math.random() * memes.length);

          this.templateId = memes[randomIndex].id;

          this.actualizarMeme();
        } else {
          console.error('Error al obtener las plantillas de memes:', data.error_message);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
  }

}
