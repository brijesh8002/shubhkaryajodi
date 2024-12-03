// Enable tooltips 
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// wow animation setting 
new WOW().init();

// success stories slider 
$('.slider_storiesview').slick({
  dots: false,
  infinite: true,
  arrows: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// last added profile slider 
$('.LastProfileSlider').slick({
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false
      }
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }
  ]
});

//progress bar bottom to top
(function ($) {
  "use strict";
  $(document).ready(function () {
    "use strict";
    let progressPath = document.querySelector('.progress-wrap path');
    let pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    let updateProgress = function () {
      let scroll = $(window).scrollTop();
      let height = $(document).height() - $(window).height();
      let progress = pathLength - (scroll * pathLength / height);
      progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    let offset = 50;
    let duration = 550;
    jQuery(window).on('scroll', function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
      } else {
        jQuery('.progress-wrap').removeClass('active-progress');
      }
    });
    jQuery('.progress-wrap').on('click', function (event) {
      event.preventDefault();
      jQuery('html, body').animate({
        scrollTop: 0
      }, duration);
      return false;
    })
  });
})(jQuery);


/* Search box   */
$(".custom-select").each(function () {
  let classes = $(this).attr("class"),
      id = $(this).attr("id");
  let placeholder = $(this).attr("placeholder");
  if ($(this).find(':selected').attr("title")) {
      placeholder = $(this).find(':selected').attr("title");
  }
  if (placeholder == 'Bride') {
      placeholder = 'Looking for ' + placeholder;
  }

  let template = `<div class="${classes}">
                    <span class="custom-select-trigger" id="${id}_change">${placeholder}</span>
                    <div class="custom-options">`;

  $(this).find("option").each(function () {
      template += `<span class="custom-option ${$(this).attr("class")}" data-value="${$(this).attr("value")}">${$(this).html()}</span>`;
  });

  template += `</div></div>`;

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".custom-option:first-of-type").hover(function () {
  $(this).parents(".custom-options").addClass("option-hover");
}, function () {
  $(this).parents(".custom-options").removeClass("option-hover");
});

$(".custom-select-trigger").on("click", function (event) {
  $('html').one('click', function () {
      $(".custom-select").removeClass("opened");
      $(".custom-select-trigger").removeClass("open");
  });

  if ($(".open").attr('class')) {
      $(".custom-select").removeClass("opened");
      $(".custom-select-trigger").removeClass("open");
  } else {
      $(this).parents(".custom-select").toggleClass("opened");
      $(".custom-select-trigger").addClass("open");
  }

  event.stopPropagation();
});

$('.custom-option').on('click', function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());

  if ($(this).data("value") == 'm') {
      $('#agefrom').val('24');
      $('#ageto').val('35');
      $('#agefrom_change').text('24 Year');
      $('#ageto_change').text('35 Year');
      $('#Looking_change').text('Male');
  } else if ($(this).data("value") == 'f') {
      $('#agefrom').val('20');
      $('#ageto').val('30');
      $('#agefrom_change').text('20 Year');
      $('#ageto_change').text('30 Year');
      $('#Looking_change').text('Female');
  }
});

jQuery(document).ready(function ($) {
  $(".scroll").click(function () {
      $('html,body').animate({
          scrollTop: $(this.hash).offset().top
      }, 1000);
  });
});

function add_gender_class(id) {
  if (id == "male") {
      $("#male_id").addClass("color-d Poppins-Medium");
      $("#female_id").removeClass("color-d Poppins-Medium");
      $("#gender").val('Male');
  } else {
      $("#male_id").removeClass("color-d Poppins-Medium");
      $("#female_id").addClass("color-d Poppins-Medium");
      $("#gender").val('Female');
  }
}