/*
 * animation.js
 * Copyright (C) 2017 AuroreMariscal <aurore@affinitic.be>
 *
 * Distributed under terms of the LICENCE.txt license.
 */
$(document).ready(function(){
    var $window = $(window);
    var window_height = $window.height();
    var window_width = $window.width();

//    Parallax
//    var lastScrollTop = 0;
//    $( window ).scroll(function() {
//        var st = $(this).scrollTop();
//        if (st > lastScrollTop){
//            scroll = "0";
//        } else {
//            scroll = "1";
//        }
//        lastScrollTop = st;

//        var scrolled = $(window).scrollTop();
//        document.getElementById('portal-header').style.top = scrolled / 2 + "px";
//    });


    $window.scroll(function(){
        $('#content-core').find('article').each(function() {
            class_el = get_style_no_view($(this));
            $(this).addClass(class_el);
            add_style($(this));
        })
    });

    function add_style(el) {
        el_offset_top = el.offset().top;
        el_offset_bottom = (el_offset_top + el.outerHeight());
        var docScroll = $window.scrollTop();
        position = docScroll + (window_height/1.2);
        class_el = get_style_no_view(el);
        if( (position >= el_offset_top) && (docScroll <= el_offset_bottom) ){
            el.addClass('in-view');
        }
        else {
            el.addClass(class_el).removeClass('in-view');
        }
    }
    function get_style_no_view(el) {
        el_offset_left = el.offset().left;
        middle = window_width / 2;
        if (el_offset_left < middle){
            return 'no-view-left'
        }
        else {
            return 'no-view-right'
        }
    }
});
