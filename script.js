// ============================================================
// FUNCIONES DE NAVEGACION
// ============================================================

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

// ============================================================
// FUNCIONES PARA PESTAÑAS
// ============================================================

function cambiarPestana(elemento) {
    var pestañas = document.querySelectorAll('.tab-btn');

    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].classList.remove('active');
    }

    elemento.classList.add('active');
    var texto = elemento.textContent.trim();
    mostrarMensaje('Has seleccionado: ' + texto);
}

// ============================================================
// FUNCION PARA MENSAJES FLOTANTES
// ============================================================

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
    divMensaje.style.color = '#e8eaed';
    divMensaje.style.padding = '12px 24px';
    divMensaje.style.borderRadius = '30px';
    divMensaje.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
    divMensaje.style.zIndex = '999';
    divMensaje.style.fontWeight = '500';
    divMensaje.style.fontSize = '1rem';
    divMensaje.style.transition = 'opacity 0.3s';
    divMensaje.style.border = '1px solid #2a3d60';

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

// ============================================================
// FUNCION PARA CALCULAR PRECIO
// ============================================================

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

// ============================================================
// FUNCION PARA BUSCAR VUELO
// ============================================================

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
    filtrarDestinos(destino);

    return false;
}

// ============================================================
// FUNCION PARA FILTRAR DESTINOS
// ============================================================

function filtrarDestinos(textoBusqueda) {
    if (!textoBusqueda || textoBusqueda === '') {
        mostrarTodosDestinos();
        return;
    }

    var tarjetas = document.querySelectorAll('.card');
    var textoLower = textoBusqueda.toLowerCase();
    var encontrados = 0;

    for (var i = 0; i < tarjetas.length; i++) {
        var tarjeta = tarjetas[i];
        var destino = tarjeta.getAttribute('data-destino');

        if (destino && destino.toLowerCase().includes(textoLower)) {
            tarjeta.classList.remove('oculto');
            encontrados++;
        } else {
            tarjeta.classList.add('oculto');
        }
    }

    var mensajeNoResultados = document.querySelector('.sin-resultados');

    if (encontrados === 0) {
        if (!mensajeNoResultados) {
            mensajeNoResultados = document.createElement('div');
            mensajeNoResultados.className = 'sin-resultados';
            mensajeNoResultados.textContent = 'No se encontraron destinos con "' + textoBusqueda + '"';
            var grid = document.querySelector('.card-grid');
            grid.appendChild(mensajeNoResultados);
        } else {
            mensajeNoResultados.textContent = 'No se encontraron destinos con "' + textoBusqueda + '"';
            mensajeNoResultados.style.display = 'block';
        }
    } else {
        if (mensajeNoResultados) {
            mensajeNoResultados.style.display = 'none';
        }
    }
}

// ============================================================
// FUNCION PARA MOSTRAR TODOS LOS DESTINOS
// ============================================================

function mostrarTodosDestinos() {
    var tarjetas = document.querySelectorAll('.card');

    for (var i = 0; i < tarjetas.length; i++) {
        tarjetas[i].classList.remove('oculto');
    }

    var mensajeNoResultados = document.querySelector('.sin-resultados');

    if (mensajeNoResultados) {
        mensajeNoResultados.style.display = 'none';
    }
}

// ============================================================
// FUNCIONES PARA EL HISTORIAL
// ============================================================

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

        if (footer) {
            footer.parentNode.insertBefore(contenedor, footer.nextSibling);
        }
    }

    if (historial.length === 0) {
        contenedor.innerHTML = '<h3 style="color: #e8eaed; margin-bottom: 15px;">Historial de busquedas</h3>' +
            '<p style="color: #a0a5b0;">Aun no has realizado ninguna busqueda.</p>';
        return;
    }

    var html = '<h3 style="color: #e8eaed; margin-bottom: 15px;">Ultimas busquedas</h3>';
    html += '<ul style="list-style: none; padding: 0;">';

    for (var i = 0; i < historial.length; i++) {
        var item = historial[i];
        var precioFormateado = item.precio.toLocaleString('es-CO');

        html += '<li style="padding: 10px 15px; margin-bottom: 8px; background: #2a2a35; border-radius: 8px; border-left: 4px solid #b86b3a;">';
        html += '<strong style="color: #e8eaed;">' + item.origen + '</strong> <span style="color: #a0a5b0;">→</span> <strong style="color: #e8eaed;">' + item.destino + '</strong> ';
        html += '| <span style="color: #a0a5b0;">' + item.aerolinea + '</span> | <span style="color: #b86b3a;">$' + precioFormateado + ' COP</span>';
        html += '<br><small style="color: #6b6b7a;">' + item.fechaBusqueda + '</small>';
        html += '</li>';
    }

    html += '</ul>';
    html += '<button onclick="limpiarHistorial()" style="margin-top: 15px; padding: 8px 20px; background: #2d2d3a; color: #e8eaed; border: 1px solid #3a3a48; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">Limpiar historial</button>';

    contenedor.innerHTML = html;
}

function limpiarHistorial() {
    if (confirm('Seguro que quieres limpiar todo el historial?')) {
        localStorage.removeItem('historialViajes');
        mostrarHistorial();
        mostrarMensaje('Historial limpiado correctamente');
    }
}

// ============================================================
// FUNCION PARA VER OFERTA
// ============================================================

function verOferta(destino, precio) {
    if (!destino || !precio) {
        mostrarMensaje('Oferta no disponible');
        return;
    }

    var precioFormateado = precio.toLocaleString('es-CO');
    mostrarMensaje('Oferta especial para ' + destino + ' desde $' + precioFormateado + ' COP por persona');
}

// ============================================================
// FUNCION PARA LOGIN
// ============================================================

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
    mensajeElemento.style.color = '#b86b3a';
    mostrarMensaje('Sesion iniciada correctamente');

    var btnLogin = document.querySelector('.login-btn');
    btnLogin.textContent = 'Sesion iniciada';
    btnLogin.style.background = '#2d3d2d';
    btnLogin.disabled = true;

    localStorage.setItem('usuarioActual', email);

    return false;
}

// ============================================================
// FUNCION PARA INICIAR CARRUSELES
// ============================================================

function iniciarCarruseles() {
    var carruseles = document.querySelectorAll('.carousel');

    for (var i = 0; i < carruseles.length; i++) {
        var carrusel = carruseles[i];
        var track = carrusel.querySelector('.carousel-track');

        if (!track) continue;

        var imagenes = track.querySelectorAll('img');

        if (imagenes.length === 0) continue;

        (function(carruselActual, trackActual) {

            var indice = 0;
            var intervalo = null;

            function cambiarImagen() {
                indice = (indice + 1) % 3;
                trackActual.style.transform = 'translateX(-' + (indice * 33.333) + '%)';
            }

            function resetearCarrusel() {
                if (intervalo) {
                    clearInterval(intervalo);
                    intervalo = null;
                }

                indice = 0;
                trackActual.style.transform = 'translateX(0)';
            }

            carruselActual.addEventListener('mouseenter', function() {
                resetearCarrusel();
                intervalo = setInterval(cambiarImagen, 1200);
            });

            carruselActual.addEventListener('mouseleave', function() {
                resetearCarrusel();
            });

        })(carrusel, track);
    }
}

// ============================================================
// FUNCION PARA INICIALIZAR LA PAGINA
// ============================================================

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
            var tarjeta = this.closest('.card');
            var destino = tarjeta.getAttribute('data-destino');
            var precio = parseInt(tarjeta.getAttribute('data-precio'));
            verOferta(destino, precio);
        };
    }

    var buscadorDestinos = document.getElementById('buscador-destinos');

    if (!buscadorDestinos) {
        var headerDestinos = document.querySelector('.destinations-header');

        if (headerDestinos) {
            var inputBusqueda = document.createElement('input');
            inputBusqueda.id = 'buscador-destinos';
            inputBusqueda.type = 'text';
            inputBusqueda.placeholder = 'Buscar destino...';
            inputBusqueda.style.padding = '10px 15px';
            inputBusqueda.style.borderRadius = '30px';
            inputBusqueda.style.border = '1px solid #3a3a48';
            inputBusqueda.style.background = '#1e1e28';
            inputBusqueda.style.color = '#e8eaed';
            inputBusqueda.style.fontSize = '1rem';
            inputBusqueda.style.minWidth = '200px';
            inputBusqueda.style.outline = 'none';
            inputBusqueda.style.transition = 'all 0.3s ease';

            inputBusqueda.addEventListener('input', function() {
                filtrarDestinos(this.value);
            });

            inputBusqueda.addEventListener('change', function() {
                filtrarDestinos(this.value);
            });

            headerDestinos.appendChild(inputBusqueda);
        }
    }

    var enlacesFooter = document.querySelectorAll('.footer-col ul li a');

    for (var l = 0; l < enlacesFooter.length; l++) {
        enlacesFooter[l].onclick = function(e) {
            e.preventDefault();
            mostrarMensaje('Enlace: ' + this.textContent);
        };
    }

    var verTodos = document.getElementById('ver-todos');

    if (verTodos) {
        verTodos.onclick = function(e) {
            e.preventDefault();
            mostrarTodosDestinos();
            mostrarMensaje('Mostrando todos los destinos disponibles');

            var buscador = document.getElementById('buscador-destinos');

            if (buscador) {
                buscador.value = '';
            }
        };
    }

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

// ============================================================
// EJECUTAR CUANDO LA PAGINA CARGA
// ============================================================

window.onload = function() {
    inicializarPagina();
};