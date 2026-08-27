// ========================================
// 1. FUNCIÓN PARA CAMBIAR DE PESTAÑAS
// ========================================
function cambiarPestana(elemento) {
    // 1.1 Eliminar la clase 'active' de todas las pestañas
    var pestañas = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].classList.remove('active');
    }
    
    // 1.2 Agregar la clase 'active' a la pestaña clickeada
    elemento.classList.add('active');
    
    // 1.3 Mostrar un mensaje según la pestaña seleccionada
    var textoPestaña = elemento.textContent.trim();
    mostrarMensaje('Has seleccionado: ' + textoPestaña);
}

// ========================================
// 2. FUNCIÓN PARA MOSTRAR MENSAJES TEMPORALES
// ========================================
function mostrarMensaje(mensaje) {
    // 2.1 Verificar si ya existe un mensaje y eliminarlo
    var mensajeExistente = document.querySelector('.mensaje-flotante');
    if (mensajeExistente) {
        mensajeExistente.remove();
    }
    
    // 2.2 Crear el elemento del mensaje
    var divMensaje = document.createElement('div');
    divMensaje.className = 'mensaje-flotante';
    divMensaje.textContent = mensaje;
    
    // 2.3 Estilos básicos para el mensaje (en línea para no depender del CSS)
    divMensaje.style.position = 'fixed';
    divMensaje.style.bottom = '20px';
    divMensaje.style.left = '50%';
    divMensaje.style.transform = 'translateX(-50%)';
    divMensaje.style.backgroundColor = '#1a4d8f';
    divMensaje.style.color = 'white';
    divMensaje.style.padding = '12px 24px';
    divMensaje.style.borderRadius = '30px';
    divMensaje.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
    divMensaje.style.zIndex = '999';
    divMensaje.style.fontWeight = '500';
    divMensaje.style.fontSize = '1rem';
    divMensaje.style.transition = 'all 0.3s ease';
    
    // 2.4 Agregar al body
    document.body.appendChild(divMensaje);
    
    // 2.5 Desaparecer automáticamente después de 3 segundos
    setTimeout(function() {
        if (divMensaje) {
            divMensaje.style.opacity = '0';
            setTimeout(function() {
                if (divMensaje) {
                    divMensaje.remove();
                }
            }, 300);
        }
    }, 3000);
}

// ========================================
// 3. FUNCIÓN PARA BUSCAR (SIMULADA)
// ========================================
function buscarViaje() {
    // 3.1 Obtener los valores del formulario
    var origen = document.getElementById('origin').value;
    var destino = document.getElementById('dest').value;
    var fecha = document.getElementById('date').value;
    
    // 3.2 Validar que los campos no estén vacíos
    if (origen === '' || destino === '' || fecha === '') {
        mostrarMensaje('⚠️ Por favor, completa todos los campos');
        return false;
    }
    
    // 3.3 Crear mensaje con los datos de búsqueda
    var mensajeBusqueda = '🔍 Buscando vuelos de ' + origen + ' a ' + destino + ' para el ' + formatearFecha(fecha);
    mostrarMensaje(mensajeBusqueda);
    
    // 3.4 Simular que se están mostrando resultados
    simularResultados(origen, destino, fecha);
    
    // 3.5 Evitar que el formulario se envíe
    return false;
}

// ========================================
// 4. FUNCIÓN PARA FORMATEAR FECHA
// ========================================
function formatearFecha(fecha) {
    if (!fecha) return 'fecha no especificada';
    
    var partes = fecha.split('-');
    var año = partes[0];
    var mes = partes[1];
    var dia = partes[2];
    
    var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    return dia + ' de ' + meses[parseInt(mes) - 1] + ' de ' + año;
}

// ========================================
// 5. FUNCIÓN PARA SIMULAR RESULTADOS
// ========================================
function simularResultados(origen, destino, fecha) {
    // 5.1 Mostrar un indicador de carga
    mostrarMensaje('⏳ Buscando las mejores ofertas...');
    
    // 5.2 Simular una búsqueda asíncrona (esperar 2 segundos)
    setTimeout(function() {
        // 5.3 Generar un precio aleatorio
        var precio = Math.floor(Math.random() * (800 - 150 + 1)) + 150;
        
        // 5.4 Generar una aerolínea aleatoria
        var aerolineas = ['Iberia', 'Air Europa', 'Vueling', 'Ryanair', 'LATAM', 'Avianca', 'Delta'];
        var aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];
        
        // 5.5 Generar una duración de vuelo aleatoria
        var horas = Math.floor(Math.random() * 8) + 1;
        var minutos = Math.floor(Math.random() * 60);
        var duracion = horas + 'h ' + minutos + 'min';
        
        // 5.6 Mostrar resultado
        var mensajeResultado = '✈️ ' + aerolinea + ': ' + origen + ' → ' + destino + 
                              ' | $' + precio + ' | Duración: ' + duracion;
        mostrarMensaje(mensajeResultado);
        
        // 5.7 Guardar en el historial
        guardarHistorial(origen, destino, precio, aerolinea);
        
    }, 2000);
}

// ========================================
// 6. FUNCIÓN PARA GUARDAR HISTORIAL
// ========================================
function guardarHistorial(origen, destino, precio, aerolinea) {
    // 6.1 Obtener el historial actual (o crearlo vacío)
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    
    // 6.2 Crear un nuevo registro
    var registro = {
        origen: origen,
        destino: destino,
        precio: precio,
        aerolinea: aerolinea,
        fechaBusqueda: new Date().toLocaleString()
    };
    
    // 6.3 Agregar al historial (máximo 5 registros)
    historial.unshift(registro);
    if (historial.length > 5) {
        historial.pop();
    }
    
    // 6.4 Guardar en localStorage
    localStorage.setItem('historialViajes', JSON.stringify(historial));
    
    // 6.5 Actualizar la interfaz
    mostrarHistorial();
}

// ========================================
// 7. FUNCIÓN PARA MOSTRAR HISTORIAL
// ========================================
function mostrarHistorial() {
    // 7.1 Obtener el historial
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];
    
    // 7.2 Buscar o crear el contenedor de historial
    var contenedor = document.getElementById('historial-container');
    
    if (!contenedor) {
        // Crear el contenedor si no existe
        contenedor = document.createElement('div');
        contenedor.id = 'historial-container';
        contenedor.style.marginTop = '30px';
        contenedor.style.padding = '20px';
        contenedor.style.backgroundColor = 'white';
        contenedor.style.borderRadius = '12px';
        contenedor.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        
        // Agregar después de la sección de destinos
        var seccionDestinos = document.querySelector('.destinations');
        if (seccionDestinos) {
            seccionDestinos.parentNode.insertBefore(contenedor, seccionDestinos.nextSibling);
        }
    }
    
    // 7.3 Si no hay historial, mostrar mensaje
    if (historial.length === 0) {
        contenedor.innerHTML = '<h3 style="color: #1a4d8f; margin-bottom: 15px;">📋 Historial de búsquedas</h3>' +
                              '<p style="color: #888;">Aún no has realizado ninguna búsqueda.</p>';
        return;
    }
    
    // 7.4 Construir la lista del historial
    var html = '<h3 style="color: #1a4d8f; margin-bottom: 15px;">📋 Últimas búsquedas</h3>';
    html += '<ul style="list-style: none; padding: 0;">';
    
    for (var i = 0; i < historial.length; i++) {
        var item = historial[i];
        html += '<li style="padding: 10px 15px; margin-bottom: 8px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #f5a623;">';
        html += '<strong>' + item.origen + '</strong> → <strong>' + item.destino + '</strong> ';
        html += '| ✈️ ' + item.aerolinea + ' | 💰 $' + item.precio;
        html += '<br><small style="color: #888;">' + item.fechaBusqueda + '</small>';
        html += '</li>';
    }
    
    html += '</ul>';
    
    // 7.5 Agregar botón para limpiar historial
    html += '<button onclick="limpiarHistorial()" style="margin-top: 15px; padding: 8px 20px; background: #dc3545; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">🗑️ Limpiar historial</button>';
    
    contenedor.innerHTML = html;
}

// ========================================
// 8. FUNCIÓN PARA LIMPIAR HISTORIAL
// ========================================
function limpiarHistorial() {
    if (confirm('¿Seguro que quieres limpiar todo el historial?')) {
        localStorage.removeItem('historialViajes');
        mostrarHistorial();
        mostrarMensaje('🧹 Historial limpiado correctamente');
    }
}

// ========================================
// 9. FUNCIÓN PARA VER OFERTAS (SIMULADA)
// ========================================
function verOferta(destino, precio) {
    if (!destino || !precio) {
        mostrarMensaje('⚠️ Oferta no disponible');
        return;
    }
    
    var mensaje = '🎉 Oferta especial para ' + destino + ' desde $' + precio + ' por persona';
    mostrarMensaje(mensaje);
    
    // Simular redirección
    console.log('Redirigiendo a oferta de ' + destino);
}

// ========================================
// 10. FUNCIÓN PARA INICIALIZAR LA PÁGINA
// ========================================
function inicializarPagina() {
    // 10.1 Agregar eventos a las pestañas
    var pestañas = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < pestañas.length; i++) {
        pestañas[i].onclick = function() {
            cambiarPestana(this);
        };
    }
    
    // 10.2 Agregar evento al formulario
    var formulario = document.querySelector('.search-box');
    if (formulario) {
        formulario.onsubmit = function(e) {
            e.preventDefault();
            return buscarViaje();
        };
    }
    
    // 10.3 Agregar eventos a los botones de "Ver oferta"
    var botonesOferta = document.querySelectorAll('.btn-card');
    for (var j = 0; j < botonesOferta.length; j++) {
        botonesOferta[j].onclick = function() {
            // Obtener el destino y precio de la tarjeta
            var tarjeta = this.closest('.card');
            var destino = tarjeta.querySelector('h3').textContent;
            var precioTexto = tarjeta.querySelector('.price').textContent;
            var precio = precioTexto.replace('$', '').replace(' por persona', '').trim();
            verOferta(destino, precio);
        };
    }
    
    // 10.4 Agregar eventos a los enlaces del footer (para demostración)
    var enlacesFooter = document.querySelectorAll('.footer-col ul li a');
    for (var k = 0; k < enlacesFooter.length; k++) {
        enlacesFooter[k].onclick = function(e) {
            e.preventDefault();
            mostrarMensaje('🔗 Enlace: ' + this.textContent + ' (simulación)');
        };
    }
    
    // 10.5 Mostrar el historial al cargar la página
    mostrarHistorial();
    
    // 10.6 Mensaje de bienvenida
    setTimeout(function() {
        mostrarMensaje('👋 ¡Bienvenido a SkyWing! Busca tu próximo destino');
    }, 500);
}

// ========================================
// 11. EJECUTAR CUANDO LA PÁGINA ESTÉ LISTA
// ========================================
// Usamos window.onload para asegurar que el DOM esté cargado
window.onload = function() {
    inicializarPagina();
};