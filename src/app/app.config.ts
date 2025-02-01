import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule

export const appConfig = {
  imports: [ReactiveFormsModule],  // Importa ReactiveFormsModule aquí
  providers: [],  // Puedes agregar más proveedores si es necesario
  bootstrap: [AppComponent]  // Usa AppComponent como el punto de inicio
};

bootstrapApplication(AppComponent, appConfig); // Inicia la aplicación
