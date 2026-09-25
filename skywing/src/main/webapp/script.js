// ============================================================
// DATOS BASE
// ============================================================

var distanciasKm = {
    "Bogotá": 0,
    "Medellín": 240,
    "Cali": 320,
    "Cartagena": 1050,
    "Santa Marta": 1180,
    "Barranquilla": 1000,
    "Bucaramanga": 390,
    "Pereira": 350,
    "Manizales": 300,
    "Cúcuta": 570,
    "Ibagué": 200,
    "Villavicencio": 120,
    "Pasto": 800,
    "San Andrés": 1200,
    "Leticia": 1100,
    "Miami": 2850,
    "Nueva York": 3950,
    "Toronto": 4300,
    "Ciudad de México": 3150,
    "Cancún": 2600,
    "Buenos Aires": 4700,
    "Lima": 1900,
    "Santiago": 4650,
    "Río de Janeiro": 5300,
    "Madrid": 8100,
    "Barcelona": 8300,
    "París": 8600,
    "Londres": 8800,
    "Roma": 9200,
    "Berlín": 9100,
    "Ámsterdam": 8900,
    "Lisboa": 7800,
    "Dubái": 13500,
    "Tokio": 14600,
    "Sídney": 15200,
    "Punta Cana": 1900
};

var paises = {
    "Bogotá": "Colombia",
    "Medellín": "Colombia",
    "Cali": "Colombia",
    "Cartagena": "Colombia",
    "Santa Marta": "Colombia",
    "Barranquilla": "Colombia",
    "Bucaramanga": "Colombia",
    "Pereira": "Colombia",
    "Manizales": "Colombia",
    "Cúcuta": "Colombia",
    "Ibagué": "Colombia",
    "Villavicencio": "Colombia",
    "Pasto": "Colombia",
    "San Andrés": "Colombia",
    "Leticia": "Colombia",
    "Miami": "Estados Unidos",
    "Nueva York": "Estados Unidos",
    "Toronto": "Canadá",
    "Ciudad de México": "México",
    "Cancún": "México",
    "Buenos Aires": "Argentina",
    "Lima": "Perú",
    "Santiago": "Chile",
    "Río de Janeiro": "Brasil",
    "Madrid": "España",
    "Barcelona": "España",
    "París": "Francia",
    "Londres": "Reino Unido",
    "Roma": "Italia",
    "Berlín": "Alemania",
    "Ámsterdam": "Países Bajos",
    "Lisboa": "Portugal",
    "Dubái": "Emiratos Árabes",
    "Tokio": "Japón",
    "Sídney": "Australia",
    "Punta Cana": "República Dominicana"
};

var nombresHoteles = [
    "Hotel Central Plaza",
    "Hotel Real del Mar",
    "Hotel Puerta Dorada",
    "Hotel Vista Panorámica",
    "Hotel Palacio Andino",
    "Hotel Jardín Tropical",
    "Hotel Bahía Azul",
    "Hotel Montaña Verde",
    "Hotel Torre Imperial",
    "Hotel Camino Real"
];

var descripcionesHoteles = [
    "Ubicación céntrica con desayuno incluido",
    "Vista panorámica y piscina climatizada",
    "Ambiente familiar y servicio 24 horas",
    "Diseño moderno y spa completo",
    "Cerca a sitios turísticos principales",
    "Habitaciones amplias y gimnasio",
    "Restaurante gourmet y bar lounge",
    "Aire acondicionado y wifi gratuito",
    "Terraza con vista y estacionamiento",
    "Atención personalizada y tours guiados"
];

var transportesBase = [
    { tipo: "Transporte publico", precio: 15000, detalle: "Bus o metro con tarifa local" },
    { tipo: "Taxi / Uber", precio: 45000, detalle: "Servicio puerta a puerta" },
    { tipo: "Alquiler de coche", precio: 180000, detalle: "Vehiculo por dia con seguro" }
];

// ============================================================
// FUNCIONES DE NAVEGACION
// ============================================================

function cambiarSeccion(seccionId) {
    var buscador = document.getElementById('seccion-buscador');
    var login = document.getElementById('seccion-login');
    var destinos = document.getElementById('seccion-destinos');
    var hoteles = document.getElementById('seccion-hoteles');
    var coches = document.getElementById('seccion-coches');

    buscador.style.display = 'none';
    login.style.display = 'none';
    destinos.style.display = 'none';
    hoteles.style.display = 'none';
    coches.style.display = 'none';

    if (seccionId === 'login') {
        login.style.display = 'block';
    } else if (seccionId === 'hoteles') {
        hoteles.style.display = 'block';
    } else if (seccionId === 'coches') {
        coches.style.display = 'block';
    } else {
        buscador.style.display = 'block';
        destinos.style.display = 'block';
    }
}

function volverInicio() {
    cambiarSeccion('vuelos');

    var enlaces = document.querySelectorAll('.nav-links li a');

    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].classList.remove('active');
    }

    var enlaceVuelos = document.getElementById('tab-vuelos');

    if (enlaceVuelos) {
        enlaceVuelos.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
// FUNCION PARA NORMALIZAR TEXTO (tolerancia a errores ortograficos)
// ============================================================

function normalizarTexto(texto) {
    if (!texto) return '';

    var textoLower = texto.toLowerCase();
    var reemplazos = {
        'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
        'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u',
        'ä': 'a', 'ë': 'e', 'ï': 'i', 'ö': 'o', 'ü': 'u',
        'â': 'a', 'ê': 'e', 'î': 'i', 'ô': 'o', 'û': 'u',
        'ñ': 'n', 'ç': 'c'
    };

    var resultado = '';

    for (var i = 0; i < textoLower.length; i++) {
        var letra = textoLower[i];

        if (reemplazos[letra]) {
            resultado += reemplazos[letra];
        } else {
            resultado += letra;
        }
    }

    return resultado;
}

// ============================================================
// FUNCION PARA CALCULAR PRECIO Y DURACION
// ============================================================

function obtenerPrecio(origen, destino) {
    if (origen === destino) {
        return null;
    }

    var km = distanciasKm[origen] + distanciasKm[destino];
    var esNacional = paises[origen] === "Colombia" && paises[destino] === "Colombia";

    if (esNacional) {
        return 200000 + (km * 200);
    }

    return 400000 + (km * 280);
}

function obtenerDuracion(origen, destino) {
    if (origen === destino) {
        return null;
    }

    var km = distanciasKm[origen] + distanciasKm[destino];
    var horas = km / 850;
    var horasEnteras = Math.floor(horas);
    var minutos = Math.round((horas - horasEnteras) * 60);

    if (horasEnteras < 1) {
        horasEnteras = 1;
        minutos = 0;
    }

    return horasEnteras + 'h ' + minutos + 'min';
}

// ============================================================
// FUNCIONES PARA HOTELES
// ============================================================

function obtenerHoteles(destino) {
    var hoteles = [];
    var base = distanciasKm[destino] * 300 + 120000;

    for (var i = 0; i < 10; i++) {
        var estrellas = 3 + (i % 3);
        var precio = base + (i * 35000) + (estrellas * 25000);

        hoteles.push({
            nombre: nombresHoteles[i] + ' ' + destino,
            estrellas: estrellas,
            precio: precio,
            descripcion: descripcionesHoteles[i]
        });
    }

    return hoteles;
}

function poblarFiltroHoteles() {
    var select = document.getElementById('filtro-hotel-destino');

    if (!select) return;

    for (var destino in distanciasKm) {
        var opt = document.createElement('option');
        opt.value = destino;
        opt.textContent = destino;
        select.appendChild(opt);
    }
}

function mostrarHotelesDeDestino(destino) {
    var grid = document.getElementById('hoteles-grid');
    grid.innerHTML = '';

    if (!destino) {
        grid.innerHTML = '<p style="color:#6b6b7a; grid-column:1/-1;">Selecciona un destino para ver sus hoteles.</p>';
        return;
    }

    var hoteles = obtenerHoteles(destino);

    for (var i = 0; i < hoteles.length; i++) {
        var h = hoteles[i];
        var precio = h.precio.toLocaleString('es-CO');
        var estrellas = '';

        for (var e = 0; e < h.estrellas; e++) {
            estrellas += '*';
        }

        var card = document.createElement('div');
        card.className = 'hotel-card';
        card.innerHTML = '<h3>' + h.nombre + '</h3>' +
            '<div class="estrellas">' + estrellas + '</div>' +
            '<div class="hotel-precio">$' + precio + ' <small>COP / noche</small></div>' +
            '<p class="hotel-desc">' + h.descripcion + '</p>' +
            '<button class="btn-hotel" onclick="verOferta(\'' + destino + '\')">Ver detalle</button>';

        grid.appendChild(card);
    }
}

// ============================================================
// FUNCIONES PARA TRANSPORTES
// ============================================================

function obtenerTransportes(destino) {
    var factor = 1 + (distanciasKm[destino] / 5000);
    var transportes = [];

    for (var i = 0; i < transportesBase.length; i++) {
        var base = transportesBase[i];
        transportes.push({
            tipo: base.tipo,
            precio: Math.round(base.precio * factor),
            detalle: base.detalle
        });
    }

    return transportes;
}

// ============================================================
// FUNCIONES PARA COCHES
// ============================================================

function obtenerCoches(destino) {
    var factor = 1 + (distanciasKm[destino] / 6000);
    var modelos = [
        { tipo: "Economico", modelo: "Chevrolet Spark", precio: 120000 },
        { tipo: "Sedan", modelo: "Renault Logan", precio: 160000 },
        { tipo: "SUV", modelo: "Toyota RAV4", precio: 240000 },
        { tipo: "Camioneta", modelo: "Ford Explorer", precio: 320000 },
        { tipo: "Deportivo", modelo: "Mazda MX-5", precio: 450000 },
        { tipo: "Familiar", modelo: "Kia Carnival", precio: 280000 }
    ];

    var coches = [];

    for (var i = 0; i < modelos.length; i++) {
        coches.push({
            tipo: modelos[i].tipo,
            modelo: modelos[i].modelo,
            precio: Math.round(modelos[i].precio * factor),
            descripcion: "Alquiler por dia con seguro incluido en " + destino
        });
    }

    return coches;
}

function poblarFiltroCoches() {
    var select = document.getElementById('filtro-coche-destino');

    if (!select) return;

    for (var destino in distanciasKm) {
        var opt = document.createElement('option');
        opt.value = destino;
        opt.textContent = destino;
        select.appendChild(opt);
    }
}

function mostrarCochesDeDestino(destino) {
    var grid = document.getElementById('coches-grid');
    grid.innerHTML = '';

    if (!destino) {
        grid.innerHTML = '<p style="color:#6b6b7a; grid-column:1/-1;">Selecciona un destino para ver los coches disponibles.</p>';
        return;
    }

    var coches = obtenerCoches(destino);

    for (var i = 0; i < coches.length; i++) {
        var c = coches[i];
        var precio = c.precio.toLocaleString('es-CO');

        var card = document.createElement('div');
        card.className = 'coche-card';
        card.innerHTML = '<h3>' + c.modelo + '</h3>' +
            '<div class="coche-tipo">' + c.tipo + '</div>' +
            '<div class="coche-precio">$' + precio + ' <small>COP / dia</small></div>' +
            '<p class="coche-desc">' + c.descripcion + '</p>' +
            '<button class="btn-coche" onclick="verOferta(\'' + destino + '\')">Ver detalle</button>';

        grid.appendChild(card);
    }
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

    var duracion = obtenerDuracion(origen, destino);
    var precioFormateado = precio.toLocaleString('es-CO');
    var aerolineas = ['Iberia', 'Air Europa', 'Vueling', 'LATAM', 'Avianca', 'Delta', 'Copa Airlines'];
    var aerolinea = aerolineas[Math.floor(Math.random() * aerolineas.length)];

    var mensaje = 'Vuelo encontrado: ' + aerolinea + ' | ' + origen + ' -> ' + destino +
        ' | Precio: $' + precioFormateado + ' COP | Duracion: ' + duracion;

    mostrarMensaje(mensaje);
    guardarHistorial(origen, destino, precio, aerolinea, duracion);
    filtrarDestinos(destino);

    return false;
}

// ============================================================
// FUNCION PARA FILTRAR DESTINOS
// ============================================================

function filtrarDestinos(textoBusqueda) {
    if (!textoBusqueda || textoBusqueda === '') {
        mostrarDestinosPopulares();
        return;
    }

    var tarjetas = document.querySelectorAll('.card');
    var textoNormalizado = normalizarTexto(textoBusqueda);
    var encontrados = 0;

    for (var i = 0; i < tarjetas.length; i++) {
        var tarjeta = tarjetas[i];
        var destino = tarjeta.getAttribute('data-destino');
        var destinoNormalizado = normalizarTexto(destino);

        if (destinoNormalizado.indexOf(textoNormalizado) !== -1) {
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

    ajustarGridDestinos();
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

    ajustarGridDestinos();
}

// ============================================================
// FUNCION PARA MOSTRAR DESTINOS POPULARES (6 aleatorios)
// ============================================================

function mostrarDestinosPopulares() {
    var tarjetas = document.querySelectorAll('.card');
    var indices = [];

    for (var i = 0; i < tarjetas.length; i++) {
        tarjetas[i].classList.add('oculto');
        indices.push(i);
    }

    for (var j = indices.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var temp = indices[j];
        indices[j] = indices[k];
        indices[k] = temp;
    }

    for (var m = 0; m < 6; m++) {
        tarjetas[indices[m]].classList.remove('oculto');
    }

    var mensajeNoResultados = document.querySelector('.sin-resultados');

    if (mensajeNoResultados) {
        mensajeNoResultados.style.display = 'none';
    }

    ajustarGridDestinos();
}

// ============================================================
// FUNCION PARA AJUSTAR EL GRID CUANDO HAY POCAS CARDS
// ============================================================

function ajustarGridDestinos() {
    var grid = document.querySelector('.card-grid');
    var tarjetas = document.querySelectorAll('.card');
    var visibles = 0;

    for (var i = 0; i < tarjetas.length; i++) {
        if (!tarjetas[i].classList.contains('oculto')) {
            visibles++;
        }
    }

    if (visibles === 1) {
        grid.style.gridTemplateColumns = 'minmax(280px, 420px)';
        grid.style.justifyContent = 'center';
    } else if (visibles === 2) {
        grid.style.gridTemplateColumns = 'repeat(2, minmax(280px, 400px))';
        grid.style.justifyContent = 'center';
    } else {
        grid.style.gridTemplateColumns = '';
        grid.style.justifyContent = '';
    }
}

// ============================================================
// FUNCIONES PARA EL HISTORIAL
// ============================================================

function guardarHistorial(origen, destino, precio, aerolinea, duracion) {
    var historial = JSON.parse(localStorage.getItem('historialViajes')) || [];

    var registro = {
        origen: origen,
        destino: destino,
        precio: precio,
        aerolinea: aerolinea,
        duracion: duracion,
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
        contenedor.innerHTML = '<h3 style="color: #1b2a47; margin-bottom: 15px;">Historial de busquedas</h3>' +
            '<p style="color: #6b6b7a;">Aun no has realizado ninguna busqueda.</p>';
        return;
    }

    var html = '<h3 style="color: #1b2a47; margin-bottom: 15px;">Ultimas busquedas</h3>';
    html += '<ul style="list-style: none; padding: 0;">';

    for (var i = 0; i < historial.length; i++) {
        var item = historial[i];
        var precioFormateado = item.precio.toLocaleString('es-CO');
        var duracion = item.duracion || 'N/D';

        html += '<li style="padding: 10px 15px; margin-bottom: 8px; background: #f2f5f9; border-radius: 8px; border-left: 4px solid #b86b3a;">';
        html += '<strong style="color: #1b2a47;">' + item.origen + '</strong> <span style="color: #6b6b7a;">→</span> <strong style="color: #1b2a47;">' + item.destino + '</strong> ';
        html += '| <span style="color: #6b6b7a;">' + item.aerolinea + '</span> ';
        html += '| <span style="color: #6b6b7a;">Duracion: ' + duracion + '</span> ';
        html += '| <span style="color: #b86b3a;">$' + precioFormateado + ' COP</span>';
        html += '<br><small style="color: #6b6b7a;">' + item.fechaBusqueda + '</small>';
        html += '</li>';
    }

    html += '</ul>';
    html += '<button onclick="limpiarHistorial()" style="margin-top: 15px; padding: 8px 20px; background: #4c4cac; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease;">Limpiar historial</button>';

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
// FUNCION PARA VER OFERTA (MODAL)
// ============================================================

function verOferta(destino) {
    if (!destino) {
        mostrarMensaje('Oferta no disponible');
        return;
    }

    var precioVuelo = obtenerPrecio("Bogotá", destino);
    var duracion = obtenerDuracion("Bogotá", destino);
    var hoteles = obtenerHoteles(destino);
    var transportes = obtenerTransportes(destino);
    var coches = obtenerCoches(destino);
    var pais = paises[destino] || 'Internacional';

    var precioVueloFormato = precioVuelo.toLocaleString('es-CO');

    var html = '<h2>' + destino + '</h2>';
    html += '<p class="modal-pais">' + pais + '</p>';

    html += '<h3>Vuelo desde Bogota</h3>';
    html += '<div class="modal-vuelo-info">';
    html += '<span>Duracion: ' + duracion + '</span>';
    html += '<span>Precio: $' + precioVueloFormato + ' COP</span>';
    html += '</div>';

    html += '<h3>Hoteles disponibles (10)</h3>';
    html += '<div class="modal-lista">';

    for (var i = 0; i < hoteles.length; i++) {
        var h = hoteles[i];
        var precioH = h.precio.toLocaleString('es-CO');
        html += '<div class="modal-item">';
        html += '<strong>' + h.nombre + '</strong>';
        html += '<small>' + h.estrellas + ' estrellas - ' + h.descripcion + '</small>';
        html += '<span class="precio-item">$' + precioH + ' COP / noche</span>';
        html += '</div>';
    }

    html += '</div>';

    html += '<h3>Transporte (3 opciones)</h3>';
    html += '<div class="modal-lista">';

    for (var j = 0; j < transportes.length; j++) {
        var t = transportes[j];
        var precioT = t.precio.toLocaleString('es-CO');
        html += '<div class="modal-item">';
        html += '<strong>' + t.tipo + '</strong>';
        html += '<small>' + t.detalle + '</small>';
        html += '<span class="precio-item">$' + precioT + ' COP</span>';
        html += '</div>';
    }

    html += '</div>';

    html += '<h3>Coches en alquiler</h3>';
    html += '<div class="modal-lista">';

    for (var c = 0; c < coches.length; c++) {
        var co = coches[c];
        var precioC = co.precio.toLocaleString('es-CO');
        html += '<div class="modal-item">';
        html += '<strong>' + co.modelo + ' (' + co.tipo + ')</strong>';
        html += '<small>' + co.descripcion + '</small>';
        html += '<span class="precio-item">$' + precioC + ' COP / dia</span>';
        html += '</div>';
    }

    html += '</div>';

    var total = precioVuelo + hoteles[0].precio + transportes[0].precio + coches[0].precio;
    var totalFormato = total.toLocaleString('es-CO');

    html += '<div class="modal-total">';
    html += '<div>Total estimado (vuelo + hotel 1 noche + transporte + coche 1 dia)</div>';
    html += '<span class="total-cop">$' + totalFormato + ' COP</span>';
    html += '</div>';

    html += '<div class="modal-acciones">';
    html += '<button class="btn-comprar" onclick="comprarViaje(\'' + destino + '\', ' + total + ')">Comprar</button>';
    html += '<button class="btn-cancelar-modal" onclick="cerrarModal()">Cerrar</button>';
    html += '</div>';

    document.getElementById('modal-contenido').innerHTML = html;
    document.getElementById('modal-detalle').classList.add('activo');
}

function cerrarModal() {
    document.getElementById('modal-detalle').classList.remove('activo');
}

// ============================================================
// FUNCION PARA COMPRAR VIAJE
// ============================================================

function comprarViaje(destino, total) {
    var usuario = localStorage.getItem('usuarioActual');

    if (!usuario) {
        mostrarMensaje('Debes iniciar sesion para comprar');
        cerrarModal();
        cambiarSeccion('login');

        var enlaces = document.querySelectorAll('.nav-links li a');

        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }

        var enlaceLogin = document.getElementById('tab-login');

        if (enlaceLogin) {
            enlaceLogin.classList.add('active');
        }

        return;
    }

    var compras = JSON.parse(localStorage.getItem('comprasRealizadas')) || [];

    compras.unshift({
        usuario: usuario,
        destino: destino,
        total: total,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem('comprasRealizadas', JSON.stringify(compras));
    mostrarMensaje('Compra realizada con exito para ' + destino);
    cerrarModal();
}

// ============================================================
// FUNCION PARA LOGIN Y REGISTRO
// ============================================================

var modoRegistro = false;

function alternarModoLogin() {
    modoRegistro = !modoRegistro;

    var titulo = document.getElementById('login-titulo');
    var boton = document.getElementById('btn-login-accion');
    var switchTexto = document.getElementById('switch-registro');

    if (modoRegistro) {
        titulo.textContent = 'Crear cuenta';
        boton.textContent = 'Registrarme';
        switchTexto.textContent = 'Ya tengo cuenta, iniciar sesion';
    } else {
        titulo.textContent = 'Iniciar sesion';
        boton.textContent = 'Ingresar';
        switchTexto.textContent = 'Crear cuenta nueva';
    }

    document.getElementById('login-mensaje').textContent = '';
}

function loginUsuario() {
    var email = document.getElementById('email').value.trim();
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

    var url = modoRegistro ? 'registro' : 'login';

    var datos = new FormData();
    datos.append('email', email);
    datos.append('password', password);

    fetch(url, {
        method: 'POST',
        body: datos
    })
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(data) {
        if (data.exito) {
            mensajeElemento.textContent = data.mensaje;
            mensajeElemento.style.color = '#1b2a47';
            mostrarMensaje(data.mensaje);

            if (modoRegistro) {
                alternarModoLogin();
            } else {
                localStorage.setItem('usuarioActual', email);
                actualizarEstadoSesion();
            }
        } else {
            mensajeElemento.textContent = data.mensaje;
            mensajeElemento.style.color = '#b86b3a';
        }
    })
    .catch(function(error) {
        mensajeElemento.textContent = 'Error al conectar con el servidor.';
        mensajeElemento.style.color = '#b86b3a';
        console.error(error);
    });

    return false;
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    actualizarEstadoSesion();
    mostrarMensaje('Sesion cerrada');
    cambiarSeccion('vuelos');
}

function actualizarEstadoSesion() {
    var usuario = localStorage.getItem('usuarioActual');
    var enlace = document.getElementById('tab-login');

    if (usuario) {
        enlace.textContent = 'Cerrar Sesion';
    } else {
        enlace.textContent = 'Iniciar Sesion';
    }
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
    var logo = document.getElementById('logo-inicio');
    var enlaceVuelos = document.getElementById('tab-vuelos');
    var enlaceHoteles = document.getElementById('tab-hoteles');
    var enlaceCoches = document.getElementById('tab-coches');
    var enlaceLogin = document.getElementById('tab-login');

    function activarEnlace(el) {
        var enlaces = document.querySelectorAll('.nav-links li a');

        for (var i = 0; i < enlaces.length; i++) {
            enlaces[i].classList.remove('active');
        }

        el.classList.add('active');
    }

    if (logo) {
        logo.onclick = function() {
            volverInicio();
        };
    }

    enlaceVuelos.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('vuelos');
        activarEnlace(this);
        mostrarDestinosPopulares();
    };

    enlaceHoteles.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('hoteles');
        activarEnlace(this);
        mostrarHotelesDeDestino('');
    };

    enlaceCoches.onclick = function(e) {
        e.preventDefault();
        cambiarSeccion('coches');
        activarEnlace(this);
        mostrarCochesDeDestino('');
    };

    enlaceLogin.onclick = function(e) {
        e.preventDefault();

        if (localStorage.getItem('usuarioActual')) {
            cerrarSesion();
            return;
        }

        cambiarSeccion('login');
        activarEnlace(this);
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
            verOferta(destino);
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
            inputBusqueda.style.border = '1px solid #c0c4d0';
            inputBusqueda.style.background = '#ffffff';
            inputBusqueda.style.color = '#1e1e24';
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

            if (this.id === 'link-acerca-de') {
                abrirAcercaDe();
            } else {
                mostrarMensaje('Enlace: ' + this.textContent);
            }
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

    var switchRegistro = document.getElementById('switch-registro');

    if (switchRegistro) {
        switchRegistro.onclick = function(e) {
            e.preventDefault();
            alternarModoLogin();
        };
    }

    var filtroHotel = document.getElementById('filtro-hotel-destino');

    if (filtroHotel) {
        filtroHotel.addEventListener('change', function() {
            mostrarHotelesDeDestino(this.value);
        });
    }

    var filtroCoche = document.getElementById('filtro-coche-destino');

    if (filtroCoche) {
        filtroCoche.addEventListener('change', function() {
            mostrarCochesDeDestino(this.value);
        });
    }

    poblarFiltroHoteles();
    poblarFiltroCoches();
    iniciarCarruseles();
    mostrarHistorial();
    actualizarEstadoSesion();
    mostrarDestinosPopulares();

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
// FUNCIONES EASTER EGG (ACERCA DE)
// ============================================================

function abrirAcercaDe() {
    var modal = document.getElementById('modal-acerca-de');

    if (!modal) {
        crearModalAcercaDe();
        modal = document.getElementById('modal-acerca-de');
    }

    modal.classList.add('activo');
}

function cerrarAcercaDe() {
    var modal = document.getElementById('modal-acerca-de');

    if (modal) {
        modal.classList.remove('activo');
    }
}

function crearModalAcercaDe() {
    var div = document.createElement('div');
    div.className = 'modal-acerca-de';
    div.id = 'modal-acerca-de';

    var html = '<div class="acerca-de-card">';
    html += '<button class="acerca-de-cerrar" onclick="cerrarAcercaDe()">X</button>';
    html += '<span class="acerca-de-emoji">✈️</span>';
    html += '<h2>SkyWing</h2>';
    html += '<p class="acerca-de-sub">"El mejor comparador de viajes... o al menos el mas bonito."</p>';

    html += '<div class="acerca-de-info">';
    html += '<p>Este proyecto fue desarrollado como <strong>trabajo semestral</strong> por un estudiante que decidio que en lugar de dormir, era mejor programar un buscador de vuelos con <strong>36 destinos</strong>, <strong>360 hoteles</strong> y <strong>216 coches</strong>.</p>';
    html += '<br>';
    html += '<p>Se dice que si buscas <strong>"Tokio"</strong> en el buscador a las 3:00 AM, el desarrollador aparece y te da un descuento imaginario del 100% en el vuelo.</p>';
    html += '<br>';
    html += '<p>No hay datos reales, no hay pasarela de pago real, no hay hoteles reales. Pero hay <strong>mucho cafe</strong> detras de cada linea de codigo.</p>';
    html += '<br>';
    html += '<p>Si llegaste hasta aqui, tienes derecho a un <strong>vuelo gratis</strong> a donde quieras. Solo di "SkyWing" en voz alta y cierra los ojos.</p>';
    html += '</div>';

    html += '<p class="acerca-de-firma">Proyecto semestral de <strong>Angel Petro</strong></p>';

    html += '</div>';

    div.innerHTML = html;
    document.body.appendChild(div);
}

// ============================================================
// EJECUTAR CUANDO LA PAGINA CARGA
// ============================================================

window.onload = function() {
    inicializarPagina();
};