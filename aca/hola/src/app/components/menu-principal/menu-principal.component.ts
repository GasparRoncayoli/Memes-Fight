import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No es necesario arrojar una excepción aquí si no necesitas hacer nada en la inicialización.
  }

  roadToIndividual(){
    this.router.navigate(['/main']);
  }
  roadToMultiplayer(){
    alert("no se hizo todavía");
  }
  roadToTienda(){
    alert("no se hizo todavía");
  }
  cerrarSesion(){
    this.router.navigate(['/login']);
  }
}
