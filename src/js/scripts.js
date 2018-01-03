$(function() {
"use strict";

	/*-----------------------------------------------------------------------------------*/
	/*	SNOW EFFECT
	/*-----------------------------------------------------------------------------------*/
	snowFall.snow(document.body, {round : true, shadow : true, minSize: 5, maxSize:8, maxSpeed: 10, flakeCount: 100});

	/*-----------------------------------------------------------------------------------*/
	/*	VIDEO
	/*-----------------------------------------------------------------------------------*/
	$('.player').fitVids();

	/*-----------------------------------------------------------------------------------*/
	/*	REVOLUTION
	/*-----------------------------------------------------------------------------------*/
	$('.fullscreenbanner').revolution(
	{
		delay: 9000,
		startwidth: 1170,
		startheight: 550,
		hideThumbs: 200,
		fullWidth: "off",
		fullScreen: "on"
	});

	/*-----------------------------------------------------------------------------------*/
	/*	PRETTIFY
	/*-----------------------------------------------------------------------------------*/
	window.prettyPrint && prettyPrint()

	/*-----------------------------------------------------------------------------------*/
	/*	SLIDER PRO
	/*-----------------------------------------------------------------------------------*/
	$( '.portfolio-slider' ).sliderPro({
		width: 1070,
		height: 600,
		fade: true,
		arrows: true,
		buttons: false,
		autoHeight: true,
		autoScaleLayers: true,
		thumbnailArrows: false,
		autoplay: false,
		slideDistance: 0,
		thumbnailWidth: 125,
		thumbnailHeight: 80
	});

	/*-----------------------------------------------------------------------------------*/
	/*	IMAGE ICON HOVER
	/*-----------------------------------------------------------------------------------*/
	$('.icon-overlay a').prepend('<span class="icn-more"></span>');

	/*-----------------------------------------------------------------------------------*/
	/*	FANCYBOX
	/*-----------------------------------------------------------------------------------*/
	$('[data-fancybox]').fancybox();

	/*-----------------------------------------------------------------------------------*/
	/*	DATA REL
	/*-----------------------------------------------------------------------------------*/
	$('a[data-rel]').each(function () {
		$(this).attr('rel', $(this).data('rel'));
	});

	/*-----------------------------------------------------------------------------------*/
	/*	TOOLTIP
	/*-----------------------------------------------------------------------------------*/
	if ($("[rel=tooltip]").length) {
		$("[rel=tooltip]").tooltip();
	}

	/*-----------------------------------------------------------------------------------*/
	/*	TABS & TOGGLE
	/*-----------------------------------------------------------------------------------*/
	$('.tabs.tabs-top').easytabs({
		animationSpeed: 300,
		updateHash: false
	});
	$('.panel-group').find('.panel-default:has(".in")').addClass('panel-active');
	$('.panel-group').on('shown.bs.collapse', function (e) {
	   $(e.target).closest('.panel-default').addClass(' panel-active');
	}).on('hidden.bs.collapse', function (e) {
	   $(e.target).closest('.panel-default').removeClass(' panel-active');
	});

	/*-----------------------------------------------------------------------------------*/
	/*	MENU
	/*-----------------------------------------------------------------------------------*/
	$('.js-activated').dropdownHover({
		instantlyCloseOthers: false,
		delay: 0
	}).dropdown();
	$('.dropdown-menu a, .social .dropdown-menu, .social .dropdown-menu input').click(function (e) {
		e.stopPropagation();
	});
	$('.responsive-menu').on('click', function() {
		$(this).toggleClass('opn');
	});
	$('.navbar .nav li a').on('click', function() {
		$('.navbar .navbar-collapse.show').collapse('hide');
		$('.responsive-menu.opn').removeClass('opn');
	});

	/*-----------------------------------------------------------------------------------*/
	/*	LOCALSCROLL
	/*-----------------------------------------------------------------------------------*/
	$('.navbar, .smooth').localScroll({
		hash: true
	});

	/*-----------------------------------------------------------------------------------*/
	/*	CONTACT FORM
	/*-----------------------------------------------------------------------------------*/
	$('#contact-form').on('submit', function (e) {

		// if the validator does not prevent form submit
		if (!e.isDefaultPrevented()) {
			var url = "php/contact.php";

			// POST values in the background the the script URL
			$.ajax({
				type: "POST",
				url: url,
				data: $(this).serialize(),
				success: function (data)
				{
					var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

					var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    
                    if ('alert-success' && messageText) {
						$("#contact-form").fadeOut(2000).delay(5000).fadeIn(2000);
						$('#clear-button').click();
						$(".messages").html(alertBox).fadeIn(2000).delay(5000).fadeOut(2000);
					}
					else if ('alert-danger' && messageText) {
						$(".messages").html(alertBox).fadeIn(2000).delay(5000).fadeOut(2000);
                    }
				}
			});
			return false;
		}
	});
});

/*-----------------------------------------------------------------------------------*/
/*	PRELOADER
/*-----------------------------------------------------------------------------------*/
$(window).on('load', function(){ // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({'overflow':'visible'});
});

/*-----------------------------------------------------------------------------------*/
/*	STICKY HEADER
/*-----------------------------------------------------------------------------------*/
function init() {
"use strict";
	window.addEventListener('scroll', function(e){
		var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 50,
			header = document.querySelector(".navbar");
		if (distanceY > shrinkOn) {
			classie.add(header,"fixed");
		} else {
			if (classie.has(header,"fixed")) {
				classie.remove(header,"fixed");
			}
		}
	});
}
window.onload = init();

/*-----------------------------------------------------------------------------------*/
/*	SCROLL NAVIGATION HIGHLIGHT
/*-----------------------------------------------------------------------------------*/
$(function() {
	headerWrapper = parseInt($('.navbar').height(), 10);
	var shrinked_header_height = 64,
	header_height = $('.navbar').height(),
	navItems = $('.navbar ul a[href^="#"]').not('.navbar ul a[href="#"], .navbar ul a.fancybox-inline');
	$('.offset').css('padding-top', header_height + 'px');
	$('.anchor').css('padding-top', shrinked_header_height + 'px');
	$('.anchor').css('margin-top', -(shrinked_header_height) + 'px');
	offsetTolerance = -(header_height);
	//Detecting user's scroll
	$(window).scroll(function() {
		//Check scroll position
		scrollPosition = parseInt($(this).scrollTop(), 10);
		//Move trough each menu and check its position with scroll position then add current class
		navItems.each(function() {
		var thisHref = $(this).attr('href');
		if( $(thisHref).length ){
			thisTruePosition = parseInt($(thisHref).offset().top, 10);
			thisPosition = thisTruePosition - headerWrapper - offsetTolerance;
			if(scrollPosition >= thisPosition) {
				$('.current').removeClass('current');
				$('.navbar ul a[href="'+ thisHref +'"]').parent('li').addClass('current');
			}
		}
		});
		//If we're at the bottom of the page, move pointer to the last section
		bottomPage = parseInt($(document).height(), 10) - parseInt($(window).height(), 10);
		if(scrollPosition == bottomPage || scrollPosition >= bottomPage) {
			$('.current').removeClass('current');
			navItems.last().parent('li').addClass('current');
		}
	});
});

/*-----------------------------------------------------------------------------------*/
/*	CUBE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
(function($, window, document, undefined) {
	'use strict';
	var gridContainer = $('#grid-container'),
		filtersContainer = $('#filters-container'),
		wrap, filtersCallback;
	/*********************************
		init cubeportfolio
	 *********************************/
	gridContainer.cubeportfolio({
		layoutMode: 'grid',
		rewindNav: true,
		scrollByPage: false,
		defaultFilter: '*',
		animationType: 'quicksand',
		gapHorizontal: 35,
		gapVertical: 25,
		gridAdjustment: 'responsive',
		mediaQueries: [{
			width: 1500,
			cols: 5,
		}, {
			width: 1100,
			cols: 4,
		}, {
			width: 800,
			cols: 3
		}, {
			width: 480,
			cols: 2,
			options: {
				caption: '',
				gapHorizontal: 25,
				gapVertical: 10,
			}
		}],
		caption: 'zoom',
		displayType: 'fadeIn',
		displayTypeSpeed: 100,

		// singlePage popup
		singlePageDelegate: '.cbp-singlePage',
		singlePageDeeplinking: true,
		singlePageStickyNavigation: true,
		singlePageCounter: '',
		singlePageCallback: function(url, element) {
			// to update singlePage content use the following method: this.updateSinglePage(yourContent)
			$('a[data-rel]').each(function () {
				$(this).attr('rel', $(this).data('rel'));
			});

			var t = this;

			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'html',
				timeout: 5000
			})
			.done(function(result) {
				t.updateSinglePage(result);
			})
			.fail(function() {
				t.updateSinglePage("Error! Please refresh the page!");
			});
		}
	});


	/*********************************
		add listener for filters
	 *********************************/
	if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
		wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

		wrap.on({
			'mouseover.cbp': function() {
				wrap.addClass('cbp-l-filters-dropdownWrap-open');
			},
			'mouseleave.cbp': function() {
				wrap.removeClass('cbp-l-filters-dropdownWrap-open');
			}
		});

		filtersCallback = function(me) {
			wrap.find('.cbp-filter-item-custom').removeClass('cbp-filter-item-custom-active');
			wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
			me.addClass('cbp-filter-item-custom-active');
			wrap.trigger('mouseleave.cbp');
		};
	} else {
		filtersCallback = function(me) {
			me.addClass('cbp-filter-item-custom-active').siblings().removeClass('cbp-filter-item-custom-active');
		};
	}

	filtersContainer.on('click.cbp', '.cbp-filter-item-custom', function() {
		var me = $(this);

		if (me.hasClass('cbp-filter-item-custom-active')) {
			return;
		}

		// get cubeportfolio data and check if is still animating (reposition) the items.
		if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
			filtersCallback.call(null, me);
		}

		// filter the items
		gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
	});


	/*********************************
		activate counter for filters
	 *********************************/
	gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item-custom'), function() {
		// read from url and change filter active
		var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
			item;
		if (match !== null) {
			item = filtersContainer.find('.cbp-filter-item-custom').filter('[data-filter="' + match[1] + '"]');
			if (item.length) {
				filtersCallback.call(null, item);
			}
		}
	});


	/*********************************
		add listener for load more
	 *********************************/
	$('.cbp-l-loadMore-button-link').on('click.cbp', function(e) {
		e.preventDefault();
		var clicks, me = $(this),
			oMsg;

		if (me.hasClass('cbp-l-loadMore-button-stop')) {
			return;
		}

		// get the number of times the loadMore link has been clicked
		clicks = $.data(this, 'numberOfClicks');
		clicks = (clicks) ? ++clicks : 1;
		$.data(this, 'numberOfClicks', clicks);

		// set loading status
		oMsg = me.text();
		me.text('LOADING...');

		// perform ajax request
		$.ajax({
			url: me.attr('href'),
			type: 'GET',
			dataType: 'HTML'
		}).done(function(result) {
			var items, itemsNext;

			// find current container
			items = $(result).filter(function() {
				return $(this).is('div' + '.cbp-loadMore-block' + clicks);
			});

			gridContainer.cubeportfolio('appendItems', items.html(),
				function() {
					// put the original message back
					me.text(oMsg);

					// check if we have more works
					itemsNext = $(result).filter(function() {
						return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
					});

					if (itemsNext.length === 0) {
						me.text('NO MORE WORKS');
						me.addClass('cbp-l-loadMore-button-stop');
					}

				});

		}).fail(function() {
			// error
		});

	});

})(jQuery, window, document);

/*-----------------------------------------------------------------------------------*/
/*	ISOTOPE
/*-----------------------------------------------------------------------------------*/
$(function() {
	// init Isotope
	var $container = $('.isotope');

	$container.isotope({
		itemSelector: '.post-grid',
		transitionDuration: '0.6s',
		masonry: { columnWidth: '.col-md-6.col-sm-12' },
		layoutMode: 'masonry'
	});

	$(window).resize(function(){
		$container.isotope({
			masonry: { columnWidth: '.col-md-6.col-sm-12' }
		});
	});
	// layout Isotope again after all images have loaded
	$container.imagesLoaded( function() {
		$container.isotope('layout');
	});
});

/*-----------------------------------------------------------------------------------*/
/*	Progress bar
/*-----------------------------------------------------------------------------------*/
$(function() {
	jQuery('.progress-bar').each(function(){
		jQuery(this).find('.progress').animate({
			width:jQuery(this).attr('data-percent')
		},6000);
	});
});