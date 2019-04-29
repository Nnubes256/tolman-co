/*eslint-env jquery */
(function(){
    function onClickComparativaPlan(evento) {
        evento.preventDefault();
        
        if ($(this).hasClass("active")) {
            evento.stopPropagation();
            return;
        }
        
        $("#comparativa-selector a").removeClass("active");
        $(this).addClass("active");
    }
    
    $(document).ready(function() {
        $.fn.collapse.Constructor.TRANSITION_DURATION = 0;
        $("#comparativa-selector a").click(onClickComparativaPlan);
    });
})();