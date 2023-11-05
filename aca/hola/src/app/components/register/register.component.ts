import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Inicialización adicional si es necesaria.
  }

  onSubmit() {
    if (this.formReg.valid) {
      this.userService.register(this.formReg.value)
        .then((response) => {
          console.log(response);
          // Puedes redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de éxito aquí.
        })
        .catch((error) => {
          console.error(error);
          // Puedes mostrar un mensaje de error al usuario aquí.
        });
    }
  }

  onLoginClick() {
    // Lógica para redirigir al usuario a la página de inicio de sesión.
  }
}
