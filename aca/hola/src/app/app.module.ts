import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Asegúrate de importar ReactiveFormsModule aquí
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"jghbkjhg","appId":"1:953022890026:web:d3a000ede9dc37af0a8353","storageBucket":"jghbkjhg.appspot.com","apiKey":"AIzaSyANRZFmvW2oXM2_NwpG1_CzOyS_-cPC384","authDomain":"jghbkjhg.firebaseapp.com","messagingSenderId":"953022890026"})),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
