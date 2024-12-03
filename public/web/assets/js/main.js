const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'),
    tooltipList = [...tooltipTriggerList].map((e) => new bootstrap.Tooltip(e));
function add_gender_class(e) {
    "male" == e
        ? ($("#male_id").addClass("color-d Poppins-Medium"), $("#female_id").removeClass("color-d Poppins-Medium"), $("#gender").val("Male"))
        : ($("#male_id").removeClass("color-d Poppins-Medium"), $("#female_id").addClass("color-d Poppins-Medium"), $("#gender").val("Female"));
}
new WOW().init(),
    $(".Single_searchDv").select2({ allowClear: !0 }),
    $(".js-example-basic-multiple").select2({ placeholder: "", allowClear: !0 }),
    $(".banner_slideHome").slick({ dots: !1, infinite: !0, slidesToShow: 1, fade: !0, autoplay: !0, autoplaySpeed: 3e3 }),
    $(".LastProfileSlider").slick({
        dots: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: !0,
        autoplaySpeed: 3e3,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }),
    $(".plans_sliders-id").slick({
        dots: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: !0,
        autoplaySpeed: 3e3,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }),
    $(".matches-sliders").slick({
        dots: !1,
        arrows: !1,
        infinite: !0,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: !0,
        autoplaySpeed: 3e3,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 1200, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    }),
    // announcement slider
    $('.annunceSliders').slick({
        dots: false,
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 1000,
    });
  
    // profile modal  slider
    $('.slider-profiles').slick({
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
    });
    $(".slidersng-profile").slick({ dots: !1, infinite: !0, slidesToShow: 1, fade: !0, autoplay: !0, autoplaySpeed: 3e3 }),
    $("#checkAll").click(function () {
        $("input:checkbox").not(this).prop("checked", this.checked);
    }),
    $(document).ready(function () {
        let e = function (e, t) {
            if ("file" === e.type && e.files && e.files[0]) {
                let s = new FileReader();
                (s.onload = function (e) {
                    t.attr("src", e.target.result);
                }),
                    s.readAsDataURL(e.files[0]);
            }
        };
        $(".file-upload").on("change", function () {
            e(this, $(this).closest(".main-upload_phtrefuoe").find(".profile_pic"));
        }),
            $(".upload-button").on("click", function () {
                $(this).closest(".main-upload_phtrefuoe").find(".file-upload").click();
            });
    }),
    $(".custom-select").each(function () {
        let e = $(this).attr("class"),
            t = $(this).attr("id"),
            s = $(this).attr("placeholder");
        $(this).find(":selected").attr("title") && (s = $(this).find(":selected").attr("title")), "Bride" == s && (s = "Looking for " + s);
        let o = `<div class="${e}">
                    <span class="custom-select-trigger" id="${t}_change">${s}</span>
                    <div class="custom-options">`;
        $(this)
            .find("option")
            .each(function () {
                o += `<span class="custom-option ${$(this).attr("class")}" data-value="${$(this).attr("value")}">${$(this).html()}</span>`;
            }),
            (o += "</div></div>"),
            $(this).wrap('<div class="custom-select-wrapper"></div>'),
            $(this).hide(),
            $(this).after(o);
    }),
    $(".custom-option:first-of-type").hover(
        function () {
            $(this).parents(".custom-options").addClass("option-hover");
        },
        function () {
            $(this).parents(".custom-options").removeClass("option-hover");
        }
    ),
    $(".custom-select-trigger").on("click", function (e) {
        $("html").one("click", function () {
            $(".custom-select").removeClass("opened"), $(".custom-select-trigger").removeClass("open");
        }),
            $(".open").attr("class") ? ($(".custom-select").removeClass("opened"), $(".custom-select-trigger").removeClass("open")) : ($(this).parents(".custom-select").toggleClass("opened"), $(".custom-select-trigger").addClass("open")),
            e.stopPropagation();
    }),
    $(".custom-option").on("click", function () {
        $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value")),
            $(this).parents(".custom-options").find(".custom-option").removeClass("selection"),
            $(this).addClass("selection"),
            $(this).parents(".custom-select").removeClass("opened"),
            $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text()),
            "m" == $(this).data("value")
                ? ($("#agefrom").val("24"), $("#ageto").val("35"), $("#agefrom_change").text("24 Year"), $("#ageto_change").text("35 Year"), $("#Looking_change").text("Male"))
                : "f" == $(this).data("value") && ($("#agefrom").val("20"), $("#ageto").val("30"), $("#agefrom_change").text("20 Year"), $("#ageto_change").text("30 Year"), $("#Looking_change").text("Female"));
    }),
    jQuery(document).ready(function (e) {
        e(".scroll").click(function () {
            e("html,body").animate({ scrollTop: e(this.hash).offset().top }, 1e3);
        });
    }),
    (function (e) {
        "use strict";
        e(document).ready(function () {
            let t = document.querySelector(".progress-wrap path"),
                s = t.getTotalLength();
            (t.style.transition = t.style.WebkitTransition = "none"),
                (t.style.strokeDasharray = s + " " + s),
                (t.style.strokeDashoffset = s),
                t.getBoundingClientRect(),
                (t.style.transition = t.style.WebkitTransition = "stroke-dashoffset 10ms linear");
            let o = function () {
                let o = e(window).scrollTop(),
                    i = e(document).height() - e(window).height();
                t.style.strokeDashoffset = s - (o * s) / i;
            };
            o(),
                e(window).scroll(o),
                jQuery(window).on("scroll", function () {
                    jQuery(this).scrollTop() > 50 ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress");
                }),
                jQuery(".progress-wrap").on("click", function (e) {
                    return e.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 }, 550), !1;
                });
        });
    })(jQuery),
    $(document).ready(function () {
        let e = ["appclasschange1", "appclasschange2", "appclasschange3"],
            t = 0;
        setInterval(function () {
            $("#change_classapps").removeClass(e[t]), (t = (t + 1) % e.length), $("#change_classapps").addClass(e[t]);
        }, 4e3);
    }),
    $(".toggle-password").click(function () {
        $(this).toggleClass("eye-open");
        let e = $(this).parent().find("input");
        "password" == e.attr("type") ? e.attr("type", "text") : e.attr("type", "password");
    }),
    $(document).ready(function () {
        let e = $(".otp-field input"),
            t = $(".btn");
        function s() {
            t.prop(
                "disabled",
                !e.toArray().every(function (e) {
                    return !$(e).attr("disabled") && "" !== $(e).val();
                })
            );
        }
        e.first().focus(),
            t.attr("disabled", !0),
            e.on("paste", function (t) {
                t.preventDefault();
                let o = (t.clipboardData || window.clipboardData).getData("text");
                e.each(function (e) {
                    let t = e < o.length ? o[e] : "";
                    $(this).val(t).removeAttr("disabled").focus();
                }),
                    s();
            }),
            e.on("input", function (t) {
                let o = $(this),
                    i = o.next(),
                    l = o.prev();
                if (o.val().length > 1) {
                    o.val(o.val().slice(0, 1));
                    return;
                }
                i && i.attr("disabled") && "" !== o.val() && i.removeAttr("disabled").focus(),
                    "deleteContentBackward" === t.inputType &&
                        e.each(function () {
                            $(this)[0] === o[0] && l && ($(this).attr("disabled", !0).val(""), l.focus());
                        }),
                    s();
            });
    }),
    $("input.disabled").attr("disabled", "disabled"),
    $("input.disabled").prop("disabled", !0),
    $(document).ready(function () {
        $("#browse-frt").on("change", function () {
            let e = this.files[0];
            if (e) {
                let t = new FileReader();
                (t.onload = function (e) {
                    $("#uploaded-img").attr("src", e.target.result), $(".uploaded-img-container-front").addClass("image-uploaded");
                }),
                    t.readAsDataURL(e);
            }
        }),
            $("#browse-backid").on("change", function () {
                let e = this.files[0];
                if (e) {
                    let t = new FileReader();
                    (t.onload = function (e) {
                        $("#uploaded-back").attr("src", e.target.result), $(".uploaded-img-container-back").addClass("image-uploaded");
                    }),
                        t.readAsDataURL(e);
                }
            });
    });
