(function() {
    'use strict';

    var miembroToqueTimeout = null;

    function obtenerRegexCorreo() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    function comprobarFormularioEmail(formulario) {
        var email_el = $('#email');
        var email_error_el = $('#error_email');
        var email_verificado = email_el.val().match(obtenerRegexCorreo());
        var usuario_valido = true;

        if (!email_verificado) {
            email_el[0].setCustomValidity('¡El correo no es válido!');
            email_error_el.text('¡El correo no es válido!');
            return false;
        } else {
            email_el[0].setCustomValidity("");
            $('#error_email').empty();
        }

        var email_buzon = email_verificado[1];

        if (!email_buzon) {
            email_el[0].setCustomValidity('¡El correo no es válido!');
            email_error_el.text('¡El correo no es válido!');
            return false;
        } else {
            email_el[0].setCustomValidity("");
            email_error_el.empty();
        }

        return true;
    }

    function comprobarFormulario(evento) {
        var formulario = $('#form-contacto');
        var email_valido = comprobarFormularioEmail(formulario);

        if (!email_valido || !formulario.checkValidity()) {
            evento.preventDefault();
            evento.stopPropagation();
            setTimeout(function() {
                $(document.querySelectorAll(
            "input.form-control:invalid"))[0].focus();
            }, 100);
        }

        $(formulario).addClass('was-validated');
    }

    // --------------------------------

    function crearMiembroToqueTimeout(elemento) {
        return function() {
            elemento.removeClass('hover');
        }
    }

    // --------------------------------

    var PARAMETROS_MAPA = {
        origen: [40.430085, -3.705827],
        zoom: 17,
        pines: [
            {
                origen: [40.430085, -3.705827],
                texto: "<strong>Tolman Incorporated</strong><br>Calle de San Bernardo, 93<br>28015 Madrid, España<br><a href=\"mailto:sales@example.com\">sales@example.com</a>"
            }
        ]
    };

    function configurarMapa(idElemento) {
        var mapa = L.map(idElemento).setView(PARAMETROS_MAPA.origen, PARAMETROS_MAPA.zoom);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoibm51YmVzMjU2IiwiYSI6ImNqdGtlbDFwNzJ4MHE0NHRmYXVqaDJ3cHgifQ.ahDU9k4wsI8L24DgsGHyAQ'
        }).addTo(mapa);

        for (var i = 0; i < PARAMETROS_MAPA.pines.length; i++) {
            var parametros_pin = PARAMETROS_MAPA.pines[i];
            var pin = L.marker(parametros_pin.origen).addTo(mapa);
            pin.bindPopup(parametros_pin.texto).openPopup();
        }
    }

    // --------------------------------

    $(document).ready(function() {
        $('#form-contacto').submit(comprobarFormulario);
        $('#form-contacto :input').change(function (evento) {
            if ($('#form-contacto').hasClass('was-validated')) {
                comprobarFormulario(evento);
            }
        });
        $('.equipo-miembro').on('touchstart', function (evento) {
            var elementoActual = $(this);
            if (!(elementoActual.hasClass('show'))) {
                $('.equipo-miembro').removeClass('hover');
            }
            $(this).addClass('hover');

            if (miembroToqueTimeout) {
                clearTimeout(miembroToqueTimeout);
            }

            miembroToqueTimeout = setTimeout(crearMiembroToqueTimeout(elementoActual), 4000);
        });
        configurarMapa('mapa-contacto');
    });
}());
