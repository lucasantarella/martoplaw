"use strict";

jQuery(document).ready(function($) {


/**

 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3
 */

(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(!e)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
    /************************************************************************************ TO TOP STARTS */

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


	$(window).on('load', function() {
		$('.carousel-inner .item').first().addClass('active');
	});

	// contact form validation
	function contactFormValidation () {
		if($('.thm-contact-form').length){
			$('.thm-contact-form').validate({ // initialize the plugin
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					phone: {
						required: true
					},
					date: {
						required: true
					},
					message: {
						required: true
					},
					subject: {
						required: true
					}
				},
				submitHandler: function (form) {
					// sending value with ajax request
					$.post($(form).attr('action'), $(form).serialize(), function (response) {
						$(form).parent('div').append(response);
						$(form).find('input[type="text"]').val('');
						$(form).find('input[type="email"]').val('');
						$(form).find('textarea').val('');
					});
					return false;
				}
			});
		}
	}

	// Google Map
	gMap();
	function gMap() {
		if ($('.google-map').length) {
			$('.google-map').each(function () {
				// getting options from html
				var mapName = $(this).attr('id');
				var mapLat = $(this).data('map-lat');
				var mapLng = $(this).data('map-lng');
				var iconPath = $(this).data('icon-path');
				var mapZoom = $(this).data('map-zoom');
				var mapTitle = $(this).data('map-title');

				// if zoom not defined the zoom value will be 15;
				if (!mapZoom) {
					var mapZoom = 15;
				};
				// init map
				var map;
				map = new GMaps({
					div: '#'+mapName,
					scrollwheel: false,
					lat: mapLat,
					lng: mapLng,
					zoom: mapZoom
				});
				// if icon path setted then show marker
				if(iconPath) {
					map.addMarker({
						icon: iconPath,
						lat: mapLat,
						lng: mapLng,
						title: mapTitle
					});
				}
			});
		};
	}

	function headerSearchToggler () {
		if($('header .search-box').length) {
			$('.header-search-toggler').on('click', function () {
				$('header .search-box').slideToggle();
			});
		}
	}

	function stickyHeader () {
		if ($('.header-sticky').length && $('.sticky').length) {
			var winScr = $(window).scrollTop();
			if (winScr > 0){
				$(".sticky").addClass("sticky-fixed");
			} else {
				$(".sticky").removeClass("sticky-fixed");
			}
		}
	}

	function CounterNumberChanger () {
		var timer = $('.timer');
		if(timer.length) {
			timer.appear(function () {
				timer.countTo();
			})
		}

	}

	// Mobile Navigation
	function mobileNavToggler () {
		if ($('.mainmenu .nav-holder').length) {
			$('.mainmenu .nav-expander .nav-collapser').on('click', function () {
				$('.mainmenu .nav-holder').children('ul').slideToggle();
				return false;
			});
			$('.mainmenu .nav-holder ul li.menu-item-has-children').children('a').append(function () {
				return '<i class="fa fa-bars"></i>';
			});
			/*$('.mainmenu .nav-holder ul li.menu-item-has-children').children('a').find('.fa').on('click', function () {
				$(this).parent().parent().children('ul').slideToggle();
				return false;
			});*/
			$('.mainmenu .nav-holder ul li.menu-item-has-children ').on( 'click', ' .fa', function() {
				$(this).parent().parent().children('ul').slideToggle();
				return false;
			});			

		}
	}

	jQuery(window).on('load', function(){
		(function ($) {
			headerSearchToggler();
			gMap();
			contactFormValidation();
			mobileNavToggler();
			$('#nav').slicknav();
			$(".owl-carousel").owlCarousel({
                autoplay:true,
                autoplayTimeout: 3000,
				loop: true,
				dots: false,
				margin: 80,
				nav: true,
				autoWidth: true,
				navText: [
					'<i class="fa fa-angle-left"></i>',
					'<i class="fa fa-angle-right"></i>'
				],
				autoplayHoverPause: true,
			   items : 5,
				responsive: {
					0:{
						items:1
					},
					480:{
						items:2
					},
					600:{
						items:3
					},
					1000:{
						items:5
					}
				}

			  });

		})(jQuery);

	});


	jQuery(window).on('scroll', function(){
		(function ($) {
			stickyHeader();

		})(jQuery);
	});
	jQuery(window).on('load', function(){
		(function ($) {

			CounterNumberChanger();

		})(jQuery);
	});
});