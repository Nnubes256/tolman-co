(function() {
    'use strict';

    var documento = $(document);

    function crearFuncionScrollNavbar() {
        var comienzoScroll = 0;
        var startchange = $('#startchange');
        var desviacion = startchange.offset();
        var altura = startchange.height();
        var alturaNavbar = $('#navbar').height();

        return function onScroll() {
            comienzoScroll = documento.scrollTop();
            if ((comienzoScroll + altura + alturaNavbar) > desviacion.top) {
                $(".navbar").removeClass('page-top');
            } else {
                $('.navbar').addClass('page-top');
            }
        };
    }

    documento.ready(function() {
        documento.scroll(crearFuncionScrollNavbar());
    });
}());
