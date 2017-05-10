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
        $(this).find('article').each(function() {
            $(this).css('height', window_height);
        });
    });
    $('.button_home').click(function(){
        var id = $(this).attr("href");
        var offset = $(id).offset().top;
        $('html, body').animate({scrollTop: offset}, 750);
        return false;
    });

//    Parallax
    var lastScrollTop = 0;
    $( window ).scroll(function() {
        var scrolled = $(this).scrollTop();
        var scrolled_pourcent = (scrolled / window_height) * 100;
        if (scrolled > lastScrollTop){
            scroll = "0";
        } else {
            scroll = "1";
        }
        lastScrollTop = scrolled;

        var articles = document.getElementsByClassName("tileItem");
        var i;
        for (i = 0; i < articles.length; i++) {
            article = articles[i];
            article_top = article.offsetTop;
            article_height = article.offsetHeight;
            article_bottom = article_top + article_height;

            visible = scrolled - article_top;
            pourcent = (visible * 100) / article_height;
            front = document.getElementById('front_' + article.id);
            front.style.top = - pourcent + '%';
            back = document.getElementById('back_' + article.id);
            back.style.top = - (pourcent / 1.2) + '%';
        }

//        $('#slides_home').find('article').each(function() {
//            article = $(this);
//            article_top = $(this).offset().top;
//            article_height = article.outerHeight();
//            article_bottom = article_top + article_height;
//            visible = scrolled - article_top;
//            pourcent = (visible * 100) / article_height;
//            article.find('.Front').each(function() {
//                $(this).css('top', - (pourcent * 2) + '%');
//            })
//            article.find('.Back').each(function() {
//                $(this).css('top', - (pourcent * 4) + '%');
//            })
//        });
    });
});
