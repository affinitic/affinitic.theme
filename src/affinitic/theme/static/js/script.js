$(document).ready(function(){
	$('.button_link_intern').on('click', function() { // Au clic sur un élément
		var div = $(this).attr('href'); // Slide cible
		var speed = 750; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: ($(div).offset().top - 200) }, speed ); // Go
		return false;
	});

	//////////////////////////// Partie responsive et apparition du menu  /////////////////////////
	window_resize();
	var largeur_fenetre;
	var hauteur_fenetre;

	function window_resize(){
		largeur_fenetre = $(window).width();
		hauteur_fenetre = $(window).height();
		if(largeur_fenetre < 1200){
			$('[name=navbar_element]').addClass('navbar_element_mini').removeClass('navbar_element');
			$('[name=navbar_element]').hide();
			$('.navbar_mini').show();
			$('.footer_text_left').hide();
			$('.footer_text_right').hide();
			$('.footer_icone_center').css('width', '100%');
			$('.background_white').hide();
			$('div').each( function(){
				if( $(this).attr('responsive') == 'false'){
					$(this).hide();
				}
			})
		}
		else{
			$('[name=navbar_element]').addClass('navbar_element').removeClass('navbar_element_mini');
			$('[name=navbar_element]').show();
			$('.navbar_mini').hide();
			$('.footer_text_left').show();
			$('.footer_text_right').show();
			$('.footer_icone_center').css('width', '');
			$('.background_white').hide();
			$('div').each( function(){
				if( $(this).attr('responsive') == 'false'){
					$(this).show();
				}
			})
		}
	}

	$(window).resize(function(){
		window_resize()
	});

	$('.navbar_mini').click(function(){
		if($('[name=navbar_element]').is(':visible')){
			$('[name=navbar_element]').hide();
			$('.background_white').hide();
		}
		else{
			$('.background_white').show();
			$('[name=navbar_element]').show();
		}
	});

	// Fonction qui retourne une valeur de 0 à l'unité choisie, puis de cette unité à 0 en fonction du scroll
	function fade_in_out(id, start, stop, scrolled){
	    pas = (stop - start) / 3;
	    pause = pas + start;
	    restart = pas + pause;
	    result = (scrolled - start) / pas;

	    if(scrolled < start){
		value = 0;
	    }
	    else if(scrolled >= start && scrolled < pause){
		value = result;
	    }
	    else if(scrolled >= pause  && scrolled < restart){
		value = 1;
	    }
	    else if(scrolled >= pause  && scrolled < stop){
		value = 3 - result;
	    }
	    else{
		value = 0;
	    }
	    blur = (1 - value) * 10;
	    var blur = 'blur(' + blur + 'px)';
	    $('#' + id).css('opacity', value).css('filter', blur);
	}

	function fade_out(id, start, stop, scrolled){
	    diff = stop - start
	    result = (scrolled - start) / diff;
	    opacity = 1;
	    blur = 0;
	    scale = 1;

	    if(scrolled > start){
		opacity = 1 - result;
		blur = result * 10;
		scale = 1 + result;
	    }

	    var blur = 'blur(' + blur + 'px)';
	    var scale = 'scale(' + scale + ')';
	    $('#' + id).css('opacity', opacity).css('filter', blur).css('transform', scale);
	}

	function slide_move(id, start, scrolled, action, vitesse){
	    scrolled = scrolled / 2;
	    stop = start + 300;
	    moyenne = ((stop - start) / 2) + start;
	    pause = moyenne - ((stop - start) / 5);
	    restart = moyenne + ((stop - start) / 5);

	    deplacement = "test";
	    if(scrolled < start){
		deplacement = 100;
	    }
	    else if(scrolled >= start && scrolled < pause){
		deplacement = (1 - (( scrolled - start) / (pause - start))) * 100;
	    }
	    else if(scrolled >= pause  && scrolled < restart){
		deplacement = 0;
	    }
	    else if(scrolled >= pause  && scrolled < stop){
		deplacement = - (( scrolled - restart) / (stop - restart)) * 100;
	    }
	    else{
		deplacement = -100;
	    }

	    deplacement = (deplacement * vitesse) + "%";
	    $('#unite').text( deplacement );
	    $('#' + id).css(action, deplacement );
	}

	//////////////////////////// Partie animation slide au scroll  /////////////////////////

	// 
	$('.button_slide').on('click', function() { // Au clic sur un élément
		var scroll = $(this).attr('href'); // Slide cible
		var speed = 1500; // Durée de l'animation (en ms)
		$('html, body').animate( { scrollTop: scroll }, speed ); // Go
		return false;
	});

	var scrolled;
	$( window ).scroll(function(){
	    scrolled = $(window).scrollTop();

	    $('#scroll').text(scrolled);

		$( "#slide_generated" ).each(function( index ) {
			$(this).children('div').each( function(){
			    id = $(this).attr('id');
			    action = $(this).attr('class');
			    start = parseInt($(this).attr('minvalue'));


			    if ( $(this).attr('name') == 'fade_out'){
			    	stop = parseInt($(this).attr('maxvalue'));
				fade_out(id, start, stop, scrolled);
			    };
			    if ( $(this).attr('name') == 'fade_in_out'){
			    	stop = parseInt($(this).attr('maxvalue'));
				fade_in_out(id, start, stop, scrolled);
			    };
			    if ( $(this).attr('name') == 'slide_move'){
			        vitesse = $(this).attr('vitesse');
			    	slide_move(id, start, scrolled, action, vitesse);
			    };
			} );
		});

		// Changement d'opacité sur les boutons de raccourci de slide
		$('.button_slide').each( function(){
			if ( $(this).attr('href') > (scrolled - 100) && $(this).attr('href') < (scrolled + 100) ){
				$(this).addClass('button_slide_now');
			}
			else{
				$(this).removeClass('button_slide_now');
			}
		});
	});
});
