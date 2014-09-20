render = function(){
    //Scroll to top
    window.scrollTo(0, 0);

    $('.tool-tip').tooltip();

    $('.carousel-indicators li:first-child').addClass('active');
    $('.carousel-inner .item:first-child').addClass('active');

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }

    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });

    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });

    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });

    select.change(function() {
        if ($(this).val() != '') {
            $('.form-search .bootstrap-select.open').addClass('selected-option-check');
        }else {
            $('.form-search  .bootstrap-select.open').removeClass('selected-option-check');
        }
    });

    var priceSlider = $("#sale-price-range");
    if(priceSlider.length > 0) {
        priceSlider.slider({
            from: 2000,
            to: 50000,
            step: 1000,
            round: 1,
            format: { format: '$ ###,###', locale: 'en' }
        });
    }

    var priceSlider = $("#price-input");
    if(priceSlider.length > 0) {
        priceSlider.slider({
            from: 1000,
            to: 299000,
            step: 500,
            round: 1,
            format: { format: '$ ###,###', locale: 'en' }
        });
    }

    //  iCheck

    if ($('.checkbox').length > 0) {
        $('input').iCheck();
    }

    if ($('.radio').length > 0) {
        $('input').iCheck();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // On RESIZE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).on('resize', function(){
        setNavigationPosition();
        setCarouselWidth();
        equalHeight('.equal-height');


    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // On LOAD
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).load(function(){

    //  Show Search Box on Map

        $('.search-box.map').addClass('show-search-box');

    //  Show All button

        showAllButton();

    //  Draw thumbnails in the footer

        drawFooterThumbnails();

    //  Show counter after appear

        var $number = $('.number');
        if ($number.length > 0 ) {
            $number.waypoint(function() {
                initCounter();
            }, { offset: '100%' });
        }

    //  Owl Carousel

        // Disable click when dragging
        function disableClick(){
            $('.owl-carousel .property').css('pointer-events', 'none');
        }
        // Enable click after dragging
        function enableClick(){
            $('.owl-carousel .property').css('pointer-events', 'auto');
        }

        if ($('.owl-carousel').length > 0) {
            if ($('.carousel-full-width').length > 0) {
                setCarouselWidth();
            }
            $(".featured-properties-carousel").owlCarousel({
                items: 5,
                itemsDesktop: [1700,4],
                responsiveBaseWidth: ".featured-properties-carousel",
                pagination: false,
                startDragging: disableClick,
                beforeMove: enableClick
            });
            $(".testimonials-carousel").owlCarousel({
                items: 1,
                responsiveBaseWidth: ".testimonial",
                pagination: true
            });
            $(".property-carousel").owlCarousel({
                items: 1,
                responsiveBaseWidth: ".property-slide",
                pagination: false,
                autoHeight : true,
                navigation: true,
                navigationText: ["",""],
                startDragging: disableClick,
                beforeMove: enableClick
            });
            $(".homepage-slider").owlCarousel({
                autoPlay: 10000,
                navigation: true,
                mouseDrag: false,
                items: 1,
                responsiveBaseWidth: ".slide",
                pagination: false,
                transitionStyle : 'fade',
                navigationText: ["",""],
                afterInit: sliderLoaded,
                afterAction: animateDescription,
                startDragging: animateDescription
            });
        }
        function sliderLoaded(){
            $('#slider').removeClass('loading');
            document.getElementById("loading-icon").remove();
        }
        function animateDescription(){
            var $description = $(".slide .overlay .info");
            $description.addClass('animate-description-out');
            $description.removeClass('animate-description-in');
            setTimeout(function() {
                $description.addClass('animate-description-in');
            }, 400);
        }


    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Set height of the map

var setMapHeight = function(){
    var $body = $('body');
    if($body.hasClass('has-fullscreen-map')) {
        $('#map').height($(window).height() - $('.navigation').height());
    }
    if($body.hasClass('has-fullscreen-map')) {
        $(window).on('resize', function(){
            $('#map').height($(window).height() - $('.navigation').height());
            var mapHeight = $('#map').height();
            var contentHeight = $('.search-box').height();
            var top;
            top = (mapHeight / 2) - (contentHeight / 2);
            $('.search-box-wrapper').css('top', top);
        });
    }
    if ($(window).width() < 768) {
        $('#map').height($(window).height() - $('.navigation').height());
    }
}

var setNavigationPosition = function(){
    $('.nav > li').each(function () {
        if($(this).hasClass('has-child')){
            var fullNavigationWidth = $(this).children('.child-navigation').width() + $(this).children('.child-navigation').children('li').children('.child-navigation').width();
            if(($(this).children('.child-navigation').offset().left + fullNavigationWidth) > $(window).width()){
                $(this).children('.child-navigation').addClass('navigation-to-left');
            }
        }
    });
}

var initCounter = function(){
    $('.number').countTo({
        speed: 3000,
        refreshInterval: 50
    });
}

var showAllButton = function(){
    var rowsToShow = 2; // number of collapsed rows to show
    var $layoutExpandable = $('.layout-expandable');
    var layoutHeightOriginal = $layoutExpandable.height();
    $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
    $('.show-all').on("click", function() {
        if ($layoutExpandable.hasClass('layout-expanded')) {
            $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
            $layoutExpandable.removeClass('layout-expanded');
            $('.show-all').removeClass('layout-expanded');
        } else {
            $layoutExpandable.height(layoutHeightOriginal);
            $layoutExpandable.addClass('layout-expanded');
            $('.show-all').addClass('layout-expanded');
        }
    });

}

//  Center Search box Vertically

var centerSearchBox = function() {
    var $searchBox = $('.search-box-wrapper');
    var $navigation = $('.navigation');
    var positionFromBottom = 20;
    if ($('body').hasClass('navigation-fixed-top')){
        // $('#map, #slider').css('margin-top',$navigation.height());
        $searchBox.css('z-index',98);
    } else {
        $('.leaflet-map-pane').css('top',-50);
        $(".homepage-slider").css('margin-top', -$('.navigation header').height());
    }
    if ($(window).width() > 768) {
        $('#slider .slide .overlay').css('margin-bottom',$navigation.height());
        $('#map, #slider').each(function () {
            if (!$('body').hasClass('horizontal-search-float')){
                var mapHeight = $(this).height();
                var contentHeight = $('.search-box').height();
                var top;
                if($('body').hasClass('has-fullscreen-map')) {
                    top = (mapHeight / 2) - (contentHeight / 2);
                }
                else {
                    top = (mapHeight / 2) - (contentHeight / 2) + $('.navigation').height();
                }
                $('.search-box-wrapper').css('top', top);
            } else {
                $searchBox.css('top', $(this).height() + $navigation.height() - $searchBox.height() - positionFromBottom);
                $('#slider .slide .overlay').css('margin-bottom',$navigation.height() + $searchBox.height() + positionFromBottom);
                if ($('body').hasClass('has-fullscreen-map')) {
                    $('.search-box-wrapper').css('top', $(this).height() - $('.navigation').height());
                }
            }
        });
    }
}

// Set Owl Carousel width

var setCarouselWidth = function(){
    $('.carousel-full-width').css('width', $(window).width());
}

// Show rating form

var showRatingForm = function(){
    $('.rating-form').css('height', $('.rating-form form').height() + 85 + 'px');
}

//  Equal heights

var equalHeight = function(container){

    var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

//  Creating property thumbnails in the footer

var drawFooterThumbnails = function(){

    var i = 0;
    var rows = 1; // how many rows to display, default = 1
    var thumbnailsPerRow = 1; // how many thumbnails per row to display, default = 1

    $.getScript("/js/locations.js", function(){
        // Create thumbnail function
        function createThumbnail() {
            for (i = 0; i < rows * thumbnailsPerRow; i++) {
                $('.footer-thumbnails').append("<div class='property-thumbnail'><a href='" + locations[i][5] + "'><img src="  + locations[i][6] + "></a></div>");
                var $thumbnail = $('.footer-thumbnails .property-thumbnail');
                $thumbnail.css('width', 100/thumbnailsPerRow + '%');
            }
        }

        if ($(window).width() < 768) {
            rows = 1;
            thumbnailsPerRow = 5;
            //createThumbnail();
        } else if ($(window).width() >= 768 && $(window).width() < 1199 ) {
            rows = 1;
            thumbnailsPerRow = 10;
            createThumbnail();
        } else if ($(window).width() >= 1200) {
            rows = 1;
            thumbnailsPerRow = 20;
            createThumbnail();
        }
    });
}