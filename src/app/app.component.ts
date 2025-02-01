import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  estudiantes = [
    { id: 1, nombre: 'Juan Gregorio', edad: 20 },
    { id: 2, nombre: 'María Belem', edad: 22 },
    { id: 3, nombre: 'Carlos Roberto', edad: 19 }
  ];

  estudiante = { id: 0, nombre: '', edad: 0 };

  ngAfterViewInit() {
    this.renderizarTabla();

    document.getElementById('agregar')?.addEventListener('click', () => this.agregarEstudiante());
    document.getElementById('modificar')?.addEventListener('click', () => this.modificarEstudiante());
  }

  obtenerValoresFormulario() {
    const id = parseInt((document.getElementById('id') as HTMLInputElement).value);
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const edad = parseInt((document.getElementById('edad') as HTMLInputElement).value);
    return { id, nombre, edad };
  }

  renderizarTabla() {
    const tablaContainer = document.getElementById('tabla-estudiantes');
    if (!tablaContainer) return;

    tablaContainer.innerHTML = ''; // Limpiar tabla antes de volver a renderizar

    if (this.estudiantes.length === 0) {
      tablaContainer.innerHTML = '<h3>No hay estudiantes registrados.</h3>';
      return;
    }

    const tabla = document.createElement('table');
    tabla.className = 'table table-striped';
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Seleccionar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        ${this.estudiantes.map(est => `
          <tr>
            <td>${est.id}</td>
            <td>${est.nombre}</td>
            <td>${est.edad}</td>
            <td><button class="btn btn-outline-warning" data-id="${est.id}" data-action="seleccionar">Seleccionar</button></td>
            <td><button class="btn btn-outline-danger" data-id="${est.id}" data-action="eliminar">Eliminar</button></td>
          </tr>
        `).join('')}
      </tbody>
    `;

    tablaContainer.appendChild(tabla);

    tabla.querySelectorAll('button').forEach(button => {
      const id = parseInt(button.getAttribute('data-id') || '0');
      const action = button.getAttribute('data-action');

      button.addEventListener('click', () => {
        if (action === 'seleccionar') this.seleccionarEstudiante(id);
        if (action === 'eliminar') this.eliminarEstudiante(id);
      });
    });
  }

  agregarEstudiante() {
    const nuevoEstudiante = this.obtenerValoresFormulario();

    if (nuevoEstudiante.id === 0) {
      alert('El ID debe ser diferente de CERO');
      return;
    }

    if (this.estudiantes.some(est => est.id === nuevoEstudiante.id)) {
      alert('Ya existe un estudiante con este ID');
      return;
    }

    this.estudiantes.push(nuevoEstudiante);
    this.limpiarFormulario();
    this.renderizarTabla();
  }

  seleccionarEstudiante(id: number) {
    const estudianteSeleccionado = this.estudiantes.find(est => est.id === id);
    if (estudianteSeleccionado) {
      (document.getElementById('id') as HTMLInputElement).value = estudianteSeleccionado.id.toString();
      (document.getElementById('nombre') as HTMLInputElement).value = estudianteSeleccionado.nombre;
      (document.getElementById('edad') as HTMLInputElement).value = estudianteSeleccionado.edad.toString();
    }
  }

  modificarEstudiante() {
    const datosActualizados = this.obtenerValoresFormulario();
    const index = this.estudiantes.findIndex(est => est.id === datosActualizados.id);

    if (index !== -1) {
      this.estudiantes[index] = datosActualizados;
      this.limpiarFormulario();
      this.renderizarTabla();
    } else {
      alert('No existe este ID');
    }
  }

  eliminarEstudiante(id: number) {
    this.estudiantes = this.estudiantes.filter(est => est.id !== id);
    this.renderizarTabla();
  }

  limpiarFormulario() {
    (document.getElementById('id') as HTMLInputElement).value = '';
    (document.getElementById('nombre') as HTMLInputElement).value = '';
    (document.getElementById('edad') as HTMLInputElement).value = '';
  }
}
