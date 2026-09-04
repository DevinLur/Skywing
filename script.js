/* ============================================================
   SCRIPT.JS - Funciones para el buscador de viajes SkyWing
   ============================================================
   CONCEPTOS APLICADOS (Semana 5):
   - DOM (Document Object Model)
   - getElementById()
   - querySelector()
   - querySelectorAll()
   - Eventos: click, input, change, mouseenter, mouseleave
   - Actualización dinámica sin recargar
   - Funciones organizadas
   ============================================================ */

// ============================================================
// 1. FUNCIONES DE NAVEGACION (Cambiar entre secciones)
// ============================================================

/**
 * Cambia entre la sección de búsqueda y la sección de login
 * Usa: getElementById() para acceder a las secciones
 */
function cambiarSeccion(seccionId) {
    // Usamos getElementById para obtener cada sección
    var buscador = document.getElementById('seccion-buscador');
    var login = document.getElementById('seccion-login');
    var destinos = document.getElementById('seccion-destinos');

    if (seccionId === 'login') {
        // Ocultamos el buscador y los destinos, mostramos login
        buscador.style.display = 'none';
        login.style.display = 'block';
        destinos.style.display = 'none';
    } else {
        // Mostramos buscador y destinos, ocultamos login
        buscador.style.display = 'block';
        login.style.display = 'none';
        destinos.style.display = 'block';
    }
}

// ============================================================
// 2. FUNCIONES PARA PESTAÑAS (Vuelos/Hoteles/Coches)
// ============================================================

/**
 * Cambia la pestaña activa y muestra un mensaje
 * Usa: querySelectorAll() para obtener todos los botones
 */
function cambiarPestana(elemento) {
    // querySelectorAll obtiene TODOS los elementos con clase 'tab-btn'
    var pestañas = document.querySelectorAll('.tab-btn');
    
    // Recorremos todas las pestañas y les quitamos la clase 'active'
    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].classList.remove('active');
    }
    
    // A la pestaña clickeada le agregamos la clase 'active'
    elemento.classList.add('active');

    // Obtenemos el texto del botón (ej: "Vuelos")
    var texto = elemento.textContent.trim();
    mostrarMensaje('Has seleccionado: ' + texto);
}

// ============================================================
// 3. FUNCION PARA MOSTRAR MENSAJES FLOTANTES
// ============================================================

/**
 * Crea un mensaje flotante que desaparece a los 3 segundos
 * Usa: querySelector() para verificar si ya existe un mensaje
 * Usa: createElement() y appendChild() para crear elementos dinámicamente
 */
function mostrarMensaje(mensaje) {
    // Buscamos si ya hay un mensaje en pantalla (querySelector)
    var mensajeExistente = document.querySelector('.mensaje-flotante');
    if (mensajeExistente) {
        mensajeExistente.remove(); // Lo eliminamos
    }

    // Creamos un nuevo div para el mensaje
    var divMensaje = document.createElement('div');
    divMensaje.className = 'mensaje-flotante';
    divMensaje.textContent = mensaje;

    // Estilos en línea (para que el mensaje flote sobre todo)
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

    // Agregamos el mensaje al body
    document.body.appendChild(divMensaje);

    // Programamos que desaparezca después de 3 segundos
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
// 4. FUNCION PARA OBTENER PRECIO (según origen y destino)
// ============================================================

/**
 * Calcula el precio de un vuelo según origen y destino
 * Usa una tabla de costos base para generar precios lógicos
 */
function obtenerPrecio(origen, destino) {
    // Si origen y destino son iguales, no hay viaje
    if (origen === destino) {
        return null;
    }

    // Tabla de costos base por ciudad
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

    // Fórmula: (costoOrigen + costoDestino) * 2000 + 200000
    var precio = (baseCost[origen] + baseCost[destino]) * 2000 + 200000;
    return precio;
}

// ============================================================
// 5. FUNCION PARA BUSCAR VUELO (al enviar el formulario)
// ============================================================

/**
 * Busca un vuelo con los datos del formulario
 * Usa: getElementById() para obtener los valores de los campos
 */
function buscarViaje() {
    // Obtenemos los valores de los campos con getElementById
    var origenSelect = document.getElementById('origin');
    var destinoSelect = document.getElementById('dest');
    var fechaInput = document.getElementById('date');

    var origen = origenSelect.value;
    var destino = destinoSelect.value;
    var fecha = fechaInput.value;

    // Validamos que todos los campos estén completos
    if (origen === '' || destino === '' || fecha === '') {
        mostrarMensaje('Completa todos los campos (origen, destino y fecha)');
        return false;
    }

    // Calculamos el precio
    var precio = obtenerPrecio(origen, destino);

    if (precio === null) {
        mostrarMensaje('El origen y el destino no pueden ser iguales');
        return false;
    }

    // Formateamos el precio con puntos
    var precioFormateado = precio.toLocaleString('es-CO');

    // Elegimos una aerolínea aleatoria
    var aerolineas = ['Iberia', 'Air Europa', 'Vueling', 'LATAM', 'Avianca', 'Delta', 'Copa Airlines'];
    var aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];

    // Generamos duración aleatoria
    var horas = Math.floor(Math.random() * 8) + 1;
    var minutos = Math.floor(Math.random() * 60);
    var duracion = horas + 'h ' + minutos + 'min';

    // Mostramos el resultado
    var mensaje = 'Vuelo encontrado: ' + aerolinea + ' | ' + origen + ' -> ' + destino +
                  ' | Precio: $' + precioFormateado + ' COP | Duracion: ' + duracion;
    mostrarMensaje(mensaje);

    // Guardamos en el historial
    guardarHistorial(origen, destino, precio, aerolinea);

    // Aplicamos el filtro de búsqueda para mostrar solo la tarjeta del destino
    filtrarDestinos(destino);

    return false;
}

// ============================================================
// 6. FUNCION PARA FILTRAR DESTINOS (NUEVA FUNCIONALIDAD DOM)
// ============================================================

/**
 * Filtra las tarjetas de destinos según el texto de búsqueda
 * Usa: querySelectorAll() para obtener todas las tarjetas
 * Evento: input (cuando el usuario escribe en el buscador)
 */
function filtrarDestinos(textoBusqueda) {
    // Si no hay texto de búsqueda, mostramos todas las tarjetas
    if (!textoBusqueda || textoBusqueda === '') {
        mostrarTodosDestinos();
        return;
    }

    // Obtenemos TODAS las tarjetas con querySelectorAll
    var tarjetas = document.querySelectorAll('.card');
    var textoLower = textoBusqueda.toLowerCase();
    var encontrados = 0;

    // Recorremos cada tarjeta
    for (var i = 0; i < tarjetas.length; i++) {
        var tarjeta = tarjetas[i];
        // Obtenemos el nombre del destino desde el atributo data-destino
        var destino = tarjeta.getAttribute('data-destino');
        
        // Si el destino contiene el texto buscado, mostramos la tarjeta
        if (destino && destino.toLowerCase().includes(textoLower)) {
            tarjeta.classList.remove('oculto');
            encontrados++;
        } else {
            tarjeta.classList.add('oculto');
        }
    }

    // Si no hay resultados, mostramos un mensaje
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

/**
 * Muestra todos los destinos (quita el filtro)
 */
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
// 7. FUNCION PARA GUARDAR HISTORIAL
// ============================================================

/**
 * Guarda la búsqueda en el historial (localStorage)
 * Usa: localStorage para persistencia de datos
 */
function guardarHistorial(origen, destino, precio, aerolinea) {
    // Obtenemos el historial guardado o creamos uno nuevo
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];

    // Creamos un registro con los datos de la búsqueda
    var registro = {
        origen: origen,
        destino: destino,
        precio: precio,
        aerolinea: aerolinea,
        fechaBusqueda: new Date().toLocaleString()
    };

    // Agregamos al principio del arreglo
    historial.unshift(registro);
    
    // Limitamos a 5 registros
    if (historial.length > 5) {
        historial.pop();
    }

    // Guardamos en localStorage
    localStorage.setItem('historialViajes', JSON.stringify(historial));
    
    // Actualizamos la vista del historial
    mostrarHistorial();
}

// ============================================================
// 8. FUNCION PARA MOSTRAR HISTORIAL
// ============================================================

/**
 * Muestra el historial de búsquedas en la página
 * Usa: getElementById() para obtener el contenedor
 * Usa: createElement() para crear elementos dinámicamente
 */
function mostrarHistorial() {
    // Obtenemos el historial guardado
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    
    // Obtenemos el contenedor con getElementById
    var contenedor = document.getElementById('historial-container');

    // Si el contenedor no existe, lo creamos
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

    // Si no hay historial, mostramos mensaje
    if (historial.length === 0) {
        contenedor.innerHTML = '<h3 style="color: #e8eaed; margin-bottom: 15px;">Historial de busquedas</h3>' +
                               '<p style="color: #a0a5b0;">Aun no has realizado ninguna busqueda.</p>';
        return;
    }

    // Construimos el HTML del historial
    var html = '<h3 style="color: #e8eaed; margin-bottom: 15px;">Ultimas busquedas</h3>';
    html += '<ul style="list-style: none; padding: 0;">';

    // Recorremos cada registro del historial
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

// ============================================================
// 9. FUNCION PARA LIMPIAR HISTORIAL
// ============================================================

/**
 * Elimina todo el historial de búsquedas
 */
function limpiarHistorial() {
    if (confirm('Seguro que quieres limpiar todo el historial?')) {
        localStorage.removeItem('historialViajes');
        mostrarHistorial();
        mostrarMensaje('Historial limpiado correctamente');
    }
}

// ============================================================
// 10. FUNCION PARA VER OFERTA
// ============================================================

/**
 * Muestra una oferta especial para un destino
 */
function verOferta(destino, precio) {
    if (!destino || !precio) {
        mostrarMensaje('Oferta no disponible');
        return;
    }
    var precioFormateado = precio.toLocaleString('es-CO');
    mostrarMensaje('Oferta especial para ' + destino + ' desde $' + precioFormateado + ' COP por persona');
}

// ============================================================
// 11. FUNCION PARA LOGIN
// ============================================================

/**
 * Valida el login del usuario
 * Usa: getElementById() para obtener los campos
 */
function loginUsuario() {
    // Obtenemos los campos con getElementById
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var mensajeElemento = document.getElementById('login-mensaje');

    // Validamos que los campos no estén vacíos
    if (email === '' || password === '') {
        mensajeElemento.textContent = 'Completa todos los campos.';
        mensajeElemento.style.color = '#b86b3a';
        return false;
    }

    // Validamos que la contraseña tenga al menos 4 caracteres
    if (password.length < 4) {
        mensajeElemento.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        mensajeElemento.style.color = '#b86b3a';
        return false;
    }

    // Login exitoso
    mensajeElemento.textContent = 'Bienvenido, ' + email + '. Sesion iniciada.';
    mensajeElemento.style.color = '#b86b3a';
    mostrarMensaje('Sesion iniciada correctamente');

    // Cambiamos el botón para indicar que ya inició sesión
    var btnLogin = document.querySelector('.login-btn');
    btnLogin.textContent = 'Sesion iniciada';
    btnLogin.style.background = '#2d3d2d';
    btnLogin.disabled = true;

    // Guardamos el usuario en localStorage
    localStorage.setItem('usuarioActual', email);

    return false;
}

// ============================================================
// 12. FUNCION PARA INICIAR CARRUSELES (CORREGIDA - AHORA FUNCIONA EN TODAS)
// ============================================================

/**
 * Inicia todos los carruseles de las tarjetas
 * Usa: querySelectorAll() para obtener todos los carruseles
 * Eventos: mouseenter y mouseleave
 * 
 * IMPORTANTE: Cada carrusel tiene sus propias variables
 * usando una función autoinvocada (IIFE) para crear un ámbito único
 */
function iniciarCarruseles() {
    // Obtenemos TODOS los elementos con clase 'carousel'
    var carruseles = document.querySelectorAll('.carousel');

    // Recorremos cada carrusel
    for (var i = 0; i < carruseles.length; i++) {
        var carrusel = carruseles[i];
        var track = carrusel.querySelector('.carousel-track');
        
        // Si no hay track, saltamos este carrusel
        if (!track) continue;
        
        var imagenes = track.querySelectorAll('img');
        
        // Si no hay imágenes, saltamos
        if (imagenes.length === 0) continue;

        // ============================================
        // CREAMOS UN ÁMBITO NUEVO PARA CADA CARRUSEL
        // usando una función autoinvocada (IIFE)
        // Esto evita que las variables se compartan
        // ============================================
        (function(carruselActual, trackActual) {
            
            // Variables propias de este carrusel
            var indice = 0;
            var intervalo = null;

            // Función que cambia a la siguiente imagen
            function cambiarImagen() {
                indice = (indice + 1) % 3;
                trackActual.style.transform = 'translateX(-' + (indice * 33.333) + '%)';
            }

            // Función que resetea el carrusel a la primera imagen
            function resetearCarrusel() {
                if (intervalo) {
                    clearInterval(intervalo);
                    intervalo = null;
                }
                indice = 0;
                trackActual.style.transform = 'translateX(0)';
            }

            // Cuando el mouse ENTRA al carrusel, inicia el cambio de imágenes
            carruselActual.addEventListener('mouseenter', function() {
                // Reiniciamos para evitar conflictos
                resetearCarrusel();
                // Iniciamos el intervalo (cambia cada 1.2 segundos)
                intervalo = setInterval(cambiarImagen, 1200);
            });

            // Cuando el mouse SALE del carrusel, detiene el cambio y vuelve a la primera
            carruselActual.addEventListener('mouseleave', function() {
                resetearCarrusel();
            });

        })(carrusel, track); // Pasamos el carrusel y track actuales
    }
}

// ============================================================
// 13. FUNCION PARA INICIALIZAR LA PAGINA
// ============================================================

/**
 * Configura todos los eventos y funcionalidades de la página
 * Usa: getElementById() para obtener elementos clave
 * Usa: querySelectorAll() para obtener múltiples elementos
 */
function inicializarPagina() {
    // ============================================
    // CONFIGURAR NAVEGACION (getElementById)
    // ============================================
    var enlaceVuelos = document.getElementById('tab-vuelos');
    var enlaceLogin = document.getElementById('tab-login');

    // Evento click para el enlace "Vuelos"
    enlaceVuelos.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('vuelos');
        var enlaces = document.querySelectorAll('.nav-links li a');
        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }
        this.classList.add('active');
    };

    // Evento click para el enlace "Login"
    enlaceLogin.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('login');
        var enlaces = document.querySelectorAll('.nav-links li a');
        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }
        this.classList.add('active');
    };

    // ============================================
    // CONFIGURAR PESTAÑAS (querySelectorAll)
    // ============================================
    var pestañas = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < pestañas.length; j++) {
        pestañas[j].onclick = function() {
            cambiarPestana(this);
        };
    }

    // ============================================
    // CONFIGURAR FORMULARIO DE BUSQUEDA (getElementById)
    // ============================================
    var formulario = document.getElementById('form-busqueda');
    if (formulario) {
        formulario.onsubmit = function(e) {
            e.preventDefault();
            return buscarViaje();
        };
    }

    // ============================================
    // CONFIGURAR BOTONES "VER OFERTA" (querySelectorAll)
    // ============================================
    var botonesOferta = document.querySelectorAll('.btn-card');
    for (var k = 0; k < botonesOferta.length; k++) {
        botonesOferta[k].onclick = function() {
            // Obtenemos la tarjeta contenedora
            var tarjeta = this.closest('.card');
            var destino = tarjeta.getAttribute('data-destino');
            var precio = parseInt(tarjeta.getAttribute('data-precio'));
            verOferta(destino, precio);
        };
    }

    // ============================================
    // CONFIGURAR BUSCADOR DE DESTINOS (NUEVA FUNCIONALIDAD DOM)
    // ============================================
    // Buscamos si existe un input de búsqueda en el encabezado
    var buscadorDestinos = document.getElementById('buscador-destinos');
    if (!buscadorDestinos) {
        // Creamos un campo de búsqueda para filtrar destinos
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
            
            // Evento input: filtra los destinos mientras el usuario escribe
            inputBusqueda.addEventListener('input', function() {
                filtrarDestinos(this.value);
            });
            
            // Evento change: también filtra cuando cambia el valor
            inputBusqueda.addEventListener('change', function() {
                filtrarDestinos(this.value);
            });
            
            headerDestinos.appendChild(inputBusqueda);
        }
    }

    // ============================================
    // CONFIGURAR ENLACES DEL FOOTER (querySelectorAll)
    // ============================================
    var enlacesFooter = document.querySelectorAll('.footer-col ul li a');
    for (var l = 0; l < enlacesFooter.length; l++) {
        enlacesFooter[l].onclick = function(e) {
            e.preventDefault();
            mostrarMensaje('Enlace: ' + this.textContent);
        };
    }

    // ============================================
    // CONFIGURAR ENLACE "VER TODOS"
    // ============================================
    var verTodos = document.getElementById('ver-todos');
    if (verTodos) {
        verTodos.onclick = function(e) {
            e.preventDefault();
            mostrarTodosDestinos();
            mostrarMensaje('Mostrando todos los destinos disponibles');
            // Limpiamos el buscador si existe
            var buscador = document.getElementById('buscador-destinos');
            if (buscador) {
                buscador.value = '';
            }
        };
    }

    // ============================================
    // INICIAR CARRUSELES
    // ============================================
    iniciarCarruseles();

    // ============================================
    // MOSTRAR HISTORIAL
    // ============================================
    mostrarHistorial();

    // ============================================
    // MENSAJE DE BIENVENIDA
    // ============================================
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
// 14. EJECUTAR CUANDO LA PAGINA CARGA
// ============================================================

/**
 * Evento que se ejecuta cuando todo el DOM está cargado
 * Usa: window.onload para asegurar que todos los elementos existan
 */
window.onload = function() {
    inicializarPagina();
};