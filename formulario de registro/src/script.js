document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const aficionInput = document.getElementById('aficion');
  const listaAficiones = document.getElementById('listaAficiones');
  const agregarBtn = document.getElementById('agregarAficion');
  const registro = document.getElementById('Registro');

  let aficiones = [];
  const usuarios = [];

  agregarBtn.addEventListener('click', () => {
    const aficion = aficionInput.value.trim();
    if (aficion !== '') {
      aficiones.push(aficion);

      const div = document.createElement('div');
      div.className = 'd-flex justify-content-between align-items-center list-group-item aficion-item';

      const texto = document.createElement('span');
      texto.textContent = aficion;

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.className = 'btn btn-danger btn-sm ms-2';
      botonEliminar.addEventListener('click', () => {
        const index = aficiones.indexOf(aficion);
        if (index !== -1) {
          aficiones.splice(index, 1);
        }
        listaAficiones.removeChild(div);
      });

      div.appendChild(texto);
      div.appendChild(botonEliminar);
      listaAficiones.appendChild(div);

      aficionInput.value = '';
      mostrarError('errorAficiones', '');
    } else {
      mostrarError('errorAficiones', 'Afición vacía no permitida');
    }
  });

  function mostrarError(id, mensaje) {
    if (mensaje) {
      document.getElementById(id).textContent = mensaje;
    }
  }

  function limpiarErrores() {
    document.querySelectorAll('.text-danger').forEach(el => el.textContent = '');
  }

  function validarFormulario(datos) {
    let valido = true;

    const regexUsuario = /^[a-zA-Z][a-zA-Z0-9]{4,9}$/;
    if (!regexUsuario.test(datos.usuario)) {
      mostrarError('errorUsuario', 'Debe comenzar con letra, 5-10 caracteres, solo números al final.');
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

    if (datos.url !== '' && !/^https?:\/\/.+/.test(datos.url)) {
      mostrarError('errorUrl', 'Debe ingresar una URL válida que comience con http:// o https://');
      valido = false;
    }

    if (aficiones.length < 2) {
      mostrarError('errorAficiones', 'Debe ingresar al menos dos aficiones.');
      valido = false;
    }

    return valido;
  }

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

      const item = document.createElement('li');
      item.classList.add('list-group-item');
      item.innerHTML = `
        <strong>${datos.usuario}</strong> - ${datos.comuna}<br>
        Dirección: ${datos.direccion}<br>
        Teléfono: ${datos.telefono}<br>
        Página web: ${datos.url}<br>
        Aficiones: ${datos.aficiones.join(', ')}
      `;
      registro.appendChild(item);

      form.reset();
      listaAficiones.innerHTML = '';
      aficiones = [];
    }
  });
});
