(function() {
    'use strict';

    function obtenerRegexCorreo() {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    function comprobarFormularioEmail(formulario) {
        var email_el = $('#email');
        var email_verificado = email_el.val().match(obtenerRegexCorreo());
        var usuario_valido = true;

        if (!email_verificado) {
            email_el[0].setCustomValidity('¡El correo no es válido!');
            $('#error_email').text('¡El correo no es válido!');
            return false;
        } else {
            email_el[0].setCustomValidity("");
            $('#error_email').empty();
        }

        var email_buzon = email_verificado[1];

        if (!email_buzon) {
            email_el[0].setCustomValidity('¡El correo no es válido!');
            $('#error_email').text('¡El correo no es válido!');
            return false;
        } else {
            email_el[0].setCustomValidity("");
            $('#error_email').empty();
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

    $(document).ready(function() {
        $('#form-contacto').submit(comprobarFormulario);
        $('#form-contacto :input').change((evento) => {
            if ($('#form-contacto').hasClass('was-validated')) {
                comprobarFormulario(evento);
            }
        });
    });
}());
