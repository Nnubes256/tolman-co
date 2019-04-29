/*eslint-disable no-extra-parens */
/*eslint-env jquery */
/*globals ScrollMagic TimelineMax TweenMax Linear*/
(function() {
    'use strict';

    var jWindow = $(window);
    var jDocument = $(document);

    var controller;
    var tween;
    var scene;
    var centered = false;
    var enabled = true;

    function createParallaxController() {
        var width = jWindow.width();

        // Creamos el controlador
        controller = new ScrollMagic.Controller();

        tween = new TimelineMax().add([
            TweenMax.fromTo("#clock", 1, {
                y: (width <= 1175) ? 0 : 500
            }, {
                y: -300,
                ease: Linear.easeNone
            })
        ]);

        // Creamos una escena
        scene = new ScrollMagic.Scene({
        		triggerElement: "#parallax-trigger",
                duration: $(window).height()
        	})
            .setTween(tween)
        	.addTo(controller); // Asignamos al controlador

        if (width <= 1175) {
            controller.enabled(false);
        }
    }

    function updateTweenAtIndex(newData) {
        var subTween = tween.getChildren()[0];

        subTween.progress(0);
        subTween.updateTo(newData, true);

        scene.setTween(subTween);
    }

    function NavbarScrollHandler() {
        var scroll_start = 0;
        var startchange = $('#startchange');
        var offset = startchange.offset();
        var size = startchange.height();
        var navbarSize = $('#navbar').height();

        return function onScroll() {
            scroll_start = jDocument.scrollTop();
            if((scroll_start + size + navbarSize) > offset.top) {
                $(".navbar").removeClass('page-top');
            } else {
                $('.navbar').addClass('page-top');
            }
        };
    }

    function handleParallaxCentering(newCentered) {
        if (newCentered !== centered) {
            centered = newCentered;
            console.log("handleParallaxCentering !!! : " + newCentered);
            var newTweenData = {};
            if (newCentered) {
                newTweenData.startAt = { y: 0 };
            } else {
                newTweenData.startAt = { y: 500 };
            }
            updateTweenAtIndex(newTweenData);
        }
    }

    function handleParallaxActiveState(newEnabled) {
        if (newEnabled !== enabled) {
            enabled = newEnabled;
            controller.enabled(newEnabled);
            controller.update(true);
        }
    }

    function ResizeHandler() {
        return function onResize() {
            var width = jWindow.width();
            if (width < 900) {
                handleParallaxActiveState(false);
            } else if (width <= 1175 && width >= 900) {
                handleParallaxCentering(true);
                handleParallaxActiveState(false);
            } else if (width > 1175) {
                handleParallaxCentering(false);
                handleParallaxActiveState(true);
            }
        };
    }

    $(document).ready(function(){
        $(document).scroll(NavbarScrollHandler());
        $(window).resize(ResizeHandler());
        createParallaxController();
    });
}());
