$(document).ready(function() {
  var sliderControls = $('.index__slider__controls li'),
      indexSlider = $('.index__slider__inner'),
      indexSlide = $('.index__slider__slide'),
      indexSidebar = $('.index__sidebar'),
      content = $('.content'),
      map = $('#map');

  content.onepage_scroll({
    loop: true,
    pagination: false,
    mousewheel: false,
    updateURL: true,
    loop: true,
    beforeMove: function(index) {
      if (index == 1)
        hideHeaderFooter();
      else
        showHeaderFooter();

      if (index == 6)
        $('footer').css({'bottom':-200}, 1500);
    }
  });

  indexSlider.slick({
    adaptiveHeight: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  });

  indexSlider.on('afterChange', function(event, slick, currentSlide, nextSlide){
    sliderControls.removeClass('index__slider__controls__item-active');
    sliderControls.eq(currentSlide).addClass('index__slider__controls__item-active');
  });

  sliderControls.on('click', function(){
    indexSlider.slick('slickGoTo',parseInt($(this).index()));
    sliderControls.removeClass('index__slider__controls__item-active');
    $(this).addClass('index__slider__controls__item-active');
  });

  indexSlider.on('click', function(){
      indexSlide.css({'background-size':'contain', 'background-position':'50%', 'cursor':'normal'});
      indexSidebar.css({'right': -(indexSidebar.width() + 100)}, 1500);
      $('.index__slider__controls').css({'left':'50%'}, 1500);
      $('.index__slider__close').css({'opacity':1, 'display':'block'}, 2500);
  });

  $('.index__sidebar__slide-button').on('click', function(){
    content.moveTo(2);
    showHeaderFooter();
  });

  $('.main-footer__slide-button').on('click', function(){
    content.moveDown();
  });

  $('.index__slider__close').on('click', function(){
      indexSlide.css({'background-size':'cover', 'background-position':'0'});
      indexSidebar.css({'right': 0}, 1500);
      $('.index__slider__controls').css({'left':'25%'}, 1500);
      $(this).css({'opacity':0, 'display':'none'}, 2500);
  });

  $('.main-header__main-menu__item--logo a').on('click', function(){
    content.moveTo(1);
  });

  function showHeaderFooter() {
    $('header').css({'top':0}, 1500);
    $('footer').css({'bottom':0}, 1500);
  }

  function hideHeaderFooter() {
    $('header').css({'top':-200}, 1500);
    $('footer').css({'bottom':-200}, 1500);
  }

  ymaps.ready(init);

  function init() {
    map = new ymaps.Map('map', {
      center: [53.927321, 27.566664],
      zoom: 16,
      controls: []
    }),

    marker = new ymaps.Placemark(map.getCenter(), {
      hintContent: 'Терра Котта'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '../dev/img/marker.png',
      iconImageSize: [67, 94],
      iconImageOffset: [-30, -94]
    });

    map.geoObjects.add(marker);
  }
});
