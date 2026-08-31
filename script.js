
// ------------------------------------------------------------
// 1. FUNCION para cambiar entre secciones
// ------------------------------------------------------------
function cambiarSeccion(seccionId) {
    var buscador = document.getElementById('seccion-buscador');
    var login = document.getElementById('seccion-login');
    var destinos = document.getElementById('seccion-destinos');

    if (seccionId === 'login') {
        buscador.style.display = 'none';
        login.style.display = 'block';
        destinos.style.display = 'none';
    } else {
        buscador.style.display = 'block';
        login.style.display = 'none';
        destinos.style.display = 'block';
    }
}

// ------------------------------------------------------------
// 2. FUNCION para cambiar pestaña
// ------------------------------------------------------------
function cambiarPestana(elemento) {
    var pestañas = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].classList.remove('active');
    }
    elemento.classList.add('active');

    var texto = elemento.textContent.trim();
    mostrarMensaje('Has seleccionado: ' + texto);
}

// ------------------------------------------------------------
// 3. FUNCION para mostrar mensajes flotantes
// ------------------------------------------------------------
function mostrarMensaje(mensaje) {
    var mensajeExistente = document.querySelector('.mensaje-flotante');
    if (mensajeExistente) {
        mensajeExistente.remove();
    }

    var divMensaje = document.createElement('div');
    divMensaje.className = 'mensaje-flotante';
    divMensaje.textContent = mensaje;

    divMensaje.style.position = 'fixed';
    divMensaje.style.bottom = '20px';
    divMensaje.style.left = '50%';
    divMensaje.style.transform = 'translateX(-50%)';
    divMensaje.style.backgroundColor = '#1b2a47';
    divMensaje.style.color = 'white';
    divMensaje.style.padding = '12px 24px';
    divMensaje.style.borderRadius = '30px';
    divMensaje.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
    divMensaje.style.zIndex = '999';
    divMensaje.style.fontWeight = '500';
    divMensaje.style.fontSize = '1rem';
    divMensaje.style.transition = 'opacity 0.3s';

    document.body.appendChild(divMensaje);

    setTimeout(function() {
        divMensaje.style.opacity = '0';
        setTimeout(function() {
            if (divMensaje) {
                divMensaje.remove();
            }
        }, 300);
    }, 3000);
}

// ------------------------------------------------------------
// 4. FUNCION para obtener el precio
// ------------------------------------------------------------
function obtenerPrecio(origen, destino) {
    if (origen === destino) {
        return null;
    }

    var baseCost = {
        "Bogotá": 0,
        "Medellín": 100,
        "Cali": 150,
        "Cartagena": 200,
        "Santa Marta": 220,
        "Miami": 800,
        "Madrid": 1200,
        "Ciudad de México": 700,
        "Buenos Aires": 900,
        "Lima": 600,
        "Santiago": 850
    };

    var precio = (baseCost[origen] + baseCost[destino]) * 2000 + 200000;
    return precio;
}

// ------------------------------------------------------------
// 5. FUNCION para buscar el vuelo
// ------------------------------------------------------------
function buscarViaje() {
    var origenSelect = document.getElementById('origin');
    var destinoSelect = document.getElementById('dest');
    var fechaInput = document.getElementById('date');

    var origen = origenSelect.value;
    var destino = destinoSelect.value;
    var fecha = fechaInput.value;

    if (origen === '' || destino === '' || fecha === '') {
        mostrarMensaje('Completa todos los campos (origen, destino y fecha)');
        return false;
    }

    var precio = obtenerPrecio(origen, destino);

    if (precio === null) {
        mostrarMensaje('El origen y el destino no pueden ser iguales');
        return false;
    }

    var precioFormateado = precio.toLocaleString('es-CO');

    var aerolineas = ['Iberia', 'Air Europa', 'Vueling', 'LATAM', 'Avianca', 'Delta', 'Copa Airlines'];
    var aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];

    var horas = Math.floor(Math.random() * 8) + 1;
    var minutos = Math.floor(Math.random() * 60);
    var duracion = horas + 'h ' + minutos + 'min';

    var mensaje = 'Vuelo encontrado: ' + aerolinea + ' | ' + origen + ' -> ' + destino +
                  ' | Precio: $' + precioFormateado + ' COP | Duracion: ' + duracion;
    mostrarMensaje(mensaje);

    guardarHistorial(origen, destino, precio, aerolinea);

    return false;
}

// ------------------------------------------------------------
// 6. FUNCION para guardar historial
// ------------------------------------------------------------
function guardarHistorial(origen, destino, precio, aerolinea) {
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];

    var registro = {
        origen: origen,
        destino: destino,
        precio: precio,
        aerolinea: aerolinea,
        fechaBusqueda: new Date().toLocaleString()
    };

    historial.unshift(registro);
    if (historial.length > 5) {
        historial.pop();
    }

    localStorage.setItem('historialViajes', JSON.stringify(historial));
    mostrarHistorial();
}

// ------------------------------------------------------------
// 7. FUNCION para mostrar historial
// ------------------------------------------------------------
function mostrarHistorial() {
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    var contenedor = document.getElementById('historial-container');

    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'historial-container';
        contenedor.style.maxWidth = '1200px';
        contenedor.style.margin = '20px auto';
        contenedor.style.padding = '0 5%';
        var footer = document.querySelector('.footer');
        footer.parentNode.insertBefore(contenedor, footer.nextSibling);
    }

    if (historial.length === 0) {
        contenedor.innerHTML = '<h3 style="color: #1b2a47; margin-bottom: 15px;">Historial de busquedas</h3>' +
                               '<p style="color: #888;">Aun no has realizado ninguna busqueda.</p>';
        return;
    }

    var html = '<h3 style="color: #1b2a47; margin-bottom: 15px;">Ultimas busquedas</h3>';
    html += '<ul style="list-style: none; padding: 0;">';

    for (var i = 0; i < historial.length; i++) {
        var item = historial[i];
        var precioFormateado = item.precio.toLocaleString('es-CO');
        html += '<li style="padding: 10px 15px; margin-bottom: 8px; background: #f2f6f9; border-radius: 8px; border-left: 4px solid #b86b3a;">';
        html += '<strong>' + item.origen + '</strong> -> <strong>' + item.destino + '</strong> ';
        html += '| ' + item.aerolinea + ' | $' + precioFormateado + ' COP';
        html += '<br><small style="color: #888;">' + item.fechaBusqueda + '</small>';
        html += '</li>';
    }

    html += '</ul>';
    html += '<button onclick="limpiarHistorial()" style="margin-top: 15px; padding: 8px 20px; background: #0a0a0f; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">Limpiar historial</button>';

    contenedor.innerHTML = html;
}

// ------------------------------------------------------------
// 8. FUNCION para limpiar historial
// ------------------------------------------------------------
function limpiarHistorial() {
    if (confirm('Seguro que quieres limpiar todo el historial?')) {
        localStorage.removeItem('historialViajes');
        mostrarHistorial();
        mostrarMensaje('Historial limpiado correctamente');
    }
}

// ------------------------------------------------------------
// 9. FUNCION para ver oferta
// ------------------------------------------------------------
function verOferta(destino, precio) {
    if (!destino || !precio) {
        mostrarMensaje('Oferta no disponible');
        return;
    }
    var precioFormateado = precio.toLocaleString('es-CO');
    mostrarMensaje('Oferta especial para ' + destino + ' desde $' + precioFormateado + ' COP por persona');
}

// ------------------------------------------------------------
// 10. FUNCION para el login
// ------------------------------------------------------------
function loginUsuario() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var mensajeElemento = document.getElementById('login-mensaje');

    if (email === '' || password === '') {
        mensajeElemento.textContent = 'Completa todos los campos.';
        mensajeElemento.style.color = '#b86b3a';
        return false;
    }

    if (password.length < 4) {
        mensajeElemento.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        mensajeElemento.style.color = '#b86b3a';
        return false;
    }

    mensajeElemento.textContent = 'Bienvenido, ' + email + '. Sesion iniciada.';
    mensajeElemento.style.color = '#1b2a47';
    mostrarMensaje('Sesion iniciada correctamente');

    var btnLogin = document.querySelector('.login-btn');
    btnLogin.textContent = 'Sesion iniciada';
    btnLogin.style.background = '#2a5a3a';
    btnLogin.disabled = true;

    localStorage.setItem('usuarioActual', email);

    return false;
}

// ------------------------------------------------------------
// 11. FUNCION para iniciar los carruseles
//     Esto hace que al poner el mouse encima
// ------------------------------------------------------------
function iniciarCarruseles() {
    // 11.1 Seleccionamos todos los contenedores con clase 'carousel'
    var carruseles = document.querySelectorAll('.carousel');

    // 11.2 Recorremos cada carrusel con un bucle for
    for (var i = 0; i < carruseles.length; i++) {
        var carrusel = carruseles[i];
        var track = carrusel.querySelector('.carousel-track');
        var imagenes = track.querySelectorAll('img');

        // Variable que guarda en qué imagen estamos (0, 1 o 2)
        var indice = 0;
        // Variable para guardar el intervalo (para poder detenerlo)
        var intervalo = null;

        // 11.3 Funcion que cambia a la siguiente imagen
        function cambiarImagen() {
            // Aumentamos el indice, si llega a 3 vuelve a 0
            indice = (indice + 1) % 3;
            // Movemos el track horizontalmente: -0%, -33.33% o -66.66%
            track.style.transform = 'translateX(-' + (indice * 33.333) + '%)';
        }

        // 11.4 Funcion que resetea el carrusel a la primera imagen
        function resetearCarrusel() {
            // Si existe un intervalo, lo detenemos
            if (intervalo) {
                clearInterval(intervalo);
                intervalo = null;
            }
            // Volvemos a la imagen 1
            indice = 0;
            track.style.transform = 'translateX(0)';
        }

        // 11.5 Evento: cuando el mouse ENTRA al carrusel
        carrusel.addEventListener('mouseenter', function() {
            // Primero reseteamos para evitar conflictos
            resetearCarrusel();
            // Iniciamos un intervalo que cambie la imagen cada 1.2 segundos
            intervalo = setInterval(cambiarImagen, 1200);
        });

        // 11.6 Evento: cuando el mouse SALE del carrusel
        carrusel.addEventListener('mouseleave', function() {
            // Detenemos el carrusel y volvemos a la primera imagen
            resetearCarrusel();
        });
    }
}

// ------------------------------------------------------------
// 12. FUNCION para inicializar la pagina
// ------------------------------------------------------------
function inicializarPagina() {
    var enlaceVuelos = document.getElementById('tab-vuelos');
    var enlaceLogin = document.getElementById('tab-login');

    enlaceVuelos.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('vuelos');
        var enlaces = document.querySelectorAll('.nav-links li a');
        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }
        this.classList.add('active');
    };

    enlaceLogin.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('login');
        var enlaces = document.querySelectorAll('.nav-links li a');
        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }
        this.classList.add('active');
    };

    var pestañas = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < pestañas.length; j++) {
        pestañas[j].onclick = function() {
            cambiarPestana(this);
        };
    }

    var formulario = document.getElementById('form-busqueda');
    if (formulario) {
        formulario.onsubmit = function(e) {
            e.preventDefault();
            return buscarViaje();
        };
    }

    var botonesOferta = document.querySelectorAll('.btn-card');
    for (var k = 0; k < botonesOferta.length; k++) {
        botonesOferta[k].onclick = function() {
            var destino = this.getAttribute('data-destino');
            var precio = parseInt(this.getAttribute('data-precio'));
            verOferta(destino, precio);
        };
    }

    var verTodos = document.getElementById('ver-todos');
    if (verTodos) {
        verTodos.onclick = function(e) {
            e.preventDefault();
            mostrarMensaje('Mostrando todos los destinos disponibles.');
        };
    }

    var enlacesFooter = document.querySelectorAll('.footer-col ul li a');
    for (var l = 0; l < enlacesFooter.length; l++) {
        enlacesFooter[l].onclick = function(e) {
            e.preventDefault();
            mostrarMensaje('Enlace: ' + this.textContent);
        };
    }

    // ============================================
    // LLAMAMOS A LA FUNCION DEL CARRUSEL AQUI
    // ============================================
    iniciarCarruseles();

    mostrarHistorial();

    var usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
        setTimeout(function() {
            mostrarMensaje('Bienvenido de nuevo, ' + usuarioGuardado);
        }, 600);
    } else {
        setTimeout(function() {
            mostrarMensaje('Bienvenido a SkyWing. Busca tu proximo destino.');
        }, 500);
    }
}

// ------------------------------------------------------------
// 13. EJECUTAR cuando la pagina cargue
// ------------------------------------------------------------
window.onload = function() {
    inicializarPagina();
};