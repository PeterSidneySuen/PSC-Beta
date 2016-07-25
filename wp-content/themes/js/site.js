var setImg = '.carousel-inner';
var fadeSpeed = 1500;
var switchDelay = 8000;
var locked = false;
var slideNum = 0;
var nextSlide;
var slidesTotal = $(setImg + ' .carousel-item').size() - 1;
var carousel;

$(document).ready(function() {
    $(setImg + ' .carousel-item:first').stop().animate({opacity:'1'},fadeSpeed).addClass('active');
    $('.carousel-indicators li:first').addClass('active');
    windowScroll();
    resizeVideo();
    resizeCards();
    carousel = setInterval(function() {
        rotateCarousel();
    },switchDelay);
});

$(window).on('scroll', function() {
    windowScroll();
});

$(window).resize(function() {
    resizeVideo();
    resizeCards();
});

$('.mobile-link').on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-open');
});

$('.body-wrapper').on('click', function() {
    $('body').removeClass('nav-open');
});

$('.sl').on('click', function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    var pos = $(target).offset().top;
    var navHeight = $('.navbar').height();
    pos = pos - navHeight;
    $('body, html').animate({
        scrollTop: pos
    }, 1000);
});

$('.carousel-indicators li').on('click', function() {
    if(!locked) {
        locked = true;
        clearInterval(carousel);
        setTimeout(function() {
            locked = false;
            carousel = setInterval(function() {
                rotateCarousel();
            },switchDelay);
        }, 800);

        slideNum = $(this).attr('data-slide-to');

        nextSlide = $(setImg + ' .carousel-item[data-slide="' + slideNum + '"]');
        $(setImg + ' .carousel-item.active').animate({opacity:'0'},fadeSpeed).removeClass('active');

        nextSlide.addClass('active').animate({opacity:'1'},fadeSpeed);

        $('.carousel-indicators li.active').removeClass('active');
        $('.carousel-indicators li[data-slide-to="' + slideNum + '"]').addClass('active');
    }
});

$('#shareTopic .form-control').on('focusin', function() {
    $(this).attr('placeholder', '');
    var id = $(this).attr('name');
    $('label[for="' + id + '"]').addClass('active');
});

function rotateCarousel() {
    if(slideNum == 2) {
        slideNum = 0;
    } else {
        slideNum++;
    }
    nextSlide = $(setImg + ' .carousel-item[data-slide="' + slideNum + '"]');
    $(setImg + ' .carousel-item.active').animate({opacity:'0'},fadeSpeed).removeClass('active');

    nextSlide.addClass('active').animate({opacity:'1'},fadeSpeed);

    $('.carousel-indicators li.active').removeClass('active');
    $('.carousel-indicators li[data-slide-to="' + slideNum + '"]').addClass('active');
    locked = false;
}

function windowScroll() {
    var scrollTop = $(window).scrollTop();
    var featuredPos = $('.main').offset().top;
    var diff = featuredPos - scrollTop;
    var width = $(window).width();

    if(scrollTop > 100 && scrollTop < 150) {
        $('.navbar').addClass('active-oov');
    }

    if(scrollTop < 35) {
        $('.navbar').removeClass('active-oov active');
    }

    if(diff <= 102) {
        $('.navbar').addClass('active').removeClass('active-oov');
    }
}

function resizeVideo() {
    var height = $('iframe').height();
    var width = $('iframe').width();
    $('iframe').attr('data-aspectRatio', height/width).removeAttr('height').removeAttr('width');
    var newWidth = $('iframe').parent('p').width();
    $('iframe').attr('width', newWidth).attr('height', newWidth * (height/width));
}

function resizeCards() {
    var list = $('.stories');
    var items = list.find('.story');
    var maxHeight = 0;
    $('.stories .story .bio').css('height', 'auto');
    items.each(function () {
        var itemHeight = parseInt($(this).find('.bio').outerHeight());
        if(itemHeight > maxHeight) maxHeight = itemHeight;
    });
    $('.stories .story .bio').css('height', maxHeight);
}