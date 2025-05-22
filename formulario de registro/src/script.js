document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const aficionInput = document.getElementById('aficion');
  const listaAficiones = document.getElementById('listaAficiones');
  const agregarBtn = document.getElementById('agregarAficion');
  const registro = document.getElementById('Registro');

  let aficiones = [];
  const usuarios = [];

  // Agrega una nueva afición a la lista
  agregarBtn.addEventListener('click', () => {
    const aficion = aficionInput.value.trim();
    if (aficion !== '') {
      agregarAficion(aficion);
      aficionInput.value = '';
      mostrarError('errorAficiones', '');
    }
  });

  function agregarAficion(aficion) {
    aficiones.push(aficion);

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = aficion;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.className = 'btn btn-danger btn-sm ms-2';
    btnEliminar.addEventListener('click', () => {
      listaAficiones.removeChild(li);
      aficiones = aficiones.filter(a => a !== aficion);
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);
    listaAficiones.appendChild(li);
  }

  function mostrarError(id, mensaje) {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.textContent = mensaje;
    }
  }

  function limpiarErrores() {
    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
  }

  function validarFormulario(datos) {
    let valido = true;

    const regexUsuario = /^[a-zA-Z][a-zA-Z0-9]{4,9}$/;
    if (!regexUsuario.test(datos.usuario)) {
      mostrarError('errorUsuario', 'Debe comenzar con letra, tener 5-10 caracteres y solo números al final.');
      valido = false;
    }

    const regexContrasena = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,6}$/;
    if (!regexContrasena.test(datos.contrasena)) {
      mostrarError('errorContrasena', 'Debe tener 3-6 caracteres, al menos una letra y un número.');
      valido = false;
    }

    if (datos.contrasena.includes(datos.usuario)) {
      mostrarError('errorContrasena', 'La contraseña no puede contener el nombre de usuario.');
      valido = false;
    }

    if (datos.contrasena !== datos.confirmar) {
      mostrarError('errorConfirmar', 'Las contraseñas no coinciden.');
      valido = false;
    }

    if (datos.direccion === '') {
      mostrarError('errorDireccion', 'La dirección es obligatoria.');
      valido = false;
    }

    if (datos.comuna === '') {
      mostrarError('errorComuna', 'Debe seleccionar una comuna.');
      valido = false;
    }

    if (!/^\d{9}$/.test(datos.telefono)) {
      mostrarError('errorTelefono', 'El número debe tener exactamente 9 dígitos.');
      valido = false;
    }

    if (datos.url && !/^https?:\/\/.+/.test(datos.url)) {
      mostrarError('errorUrl', 'Debe ingresar una URL válida que comience con http:// o https://');
      valido = false;
    }

    if (aficiones.length < 2) {
      mostrarError('errorAficiones', 'Debe ingresar al menos dos aficiones.');
      valido = false;
    }

    return valido;
  }

  // Manejo del envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErrores();

    const datos = {
      usuario: document.getElementById('usuario').value.trim(),
      contrasena: document.getElementById('contrasena').value,
      confirmar: document.getElementById('confirmar').value,
      direccion: document.getElementById('direccion').value.trim(),
      comuna: document.getElementById('comuna').value,
      telefono: document.getElementById('telefono').value.trim(),
      url: document.getElementById('url').value.trim(),
      aficiones: [...aficiones]
    };

    if (validarFormulario(datos)) {
      usuarios.push(datos);

      // Mostrar datos del nuevo usuario registrado
      const item = document.createElement('li');
      item.className = 'list-group-item';
      item.innerHTML = `
        <strong>${datos.usuario}</strong> - ${datos.comuna}<br>
        Dirección: ${datos.direccion}<br>
        Teléfono: ${datos.telefono}<br>
        Página web: ${datos.url}<br>
        Aficiones: ${datos.aficiones.join(', ')}
      `;
      registro.appendChild(item);

      // Resetear formulario y limpiar lista de aficiones
      form.reset();
      listaAficiones.innerHTML = '';
      aficiones = [];
    }
  });
});
