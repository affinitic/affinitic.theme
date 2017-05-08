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
//        var st = $(this).scrollLeft();
//        if (st > lastScrollTop){
//            scroll = "0";
//        } else {
//            scroll = "1";
//        }
//        lastScrollTop = st;

//        var scrolled = $(window).scrollLeft();
//        document.getElementById('portal-header').style.left = scrolled / 2 + "px";
//    });


    $('.template-zaffolderview').each(function() {
        $window.scroll(function(){
            $('#content-core').find('article').each(function() {
                class_el = get_style_no_view($(this));
                $(this).addClass(class_el);
                add_style($(this));
            })
        });
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


//    ACCUEIL
    $('#slides_home').each(function() {
        nbr_slide = $(this).find('article').size();
        width_slides_home = nbr_slide * 100 + '%';
        width_article_home = 100 / nbr_slide + '%';
        $('#slides_home').css('width', width_slides_home);
        $(this).append( '<div id="slides_button_home"></div>' );
        i=0;
        $(this).find('article').each(function() {
            i++;
            id = 'button_' + i;
            $(this).attr('id', id)
            $(this).css('float', 'left');
            $(this).css('width', width_article_home);
            $('#slides_button_home').append( '<a href="#' + id + '" class="button_home"><div id="button_home"></div></a>' );
        });
    });
    $('.button_home').click(function(){
        var id = $(this).attr("href");
        var offset = $(id).offset().left
        $('html, body').animate({scrollLeft: offset}, 'slow');
        return false;
    });


    function position_scroll(el) {
        el_offset_left = el.offset().left;
        quart = el.outerWidth() / 4;
        el_offset_right = el_offset_left + el.outerWidth();
        position = el_offset_left + 1;

        var docScroll = $window.scrollLeft();
        if( (docScroll > (el_offset_left - quart) ) && (docScroll < (el_offset_right - quart  )) ){
            $('html, body').animate({scrollLeft: position}, 'slow');
            return false;
        }
    }

//    $( window ).scroll(function() {
//        clearTimeout( $.data( this, "scrollCheck" ) );
//        $.data( this, "scrollCheck", setTimeout(function() {
//            $('#slides_home').find('article').each(function() {
//                position_scroll($(this));
//            });
//        }, 500) );
//        return false;
//    });



});
