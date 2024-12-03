// range slider for quick search & advance search
$(function () {
    var custom_values = ['4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10', '4-11', '5-0', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9', '5-10', '5-11', '6-0', '6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', '7-0', '7-1', '7-2'];
    var from_height = $('#from_height').val();
    var to_height = $('#to_height').val();
    // be careful! FROM and TO should be index of values array	
    var my_from = custom_values.indexOf(cal(from_height));
    var my_to = custom_values.indexOf(cal(to_height));
    var range = $('.js-range-slider'), inputFrom = $('.js-input-from'), inputTo = $('.js-input-to'), instance, min = 4.0, max = 7.1, from = my_from, to = my_to;
    range.ionRangeSlider({
      prefix: '',
      onStart: updateInputs,
      onChange: updateInputs,
      prettify_enabled: true,
      prettify_separator: ',',
      values_separator: ' to ',
      force_edges: true,
      hide_min_max: true,
      keyboard: true,
      from: my_from,
      to: my_to,
      type: 'double',
      step: 0.1,
      postfix: ' ft',
      decorate_both: true,
      values: custom_values,
      onFinish: function (data) {
        var frm_val = calculate_cm(data.from_value);
        var to_val = calculate_cm(data.to_value);
        $('#from_height').val(frm_val);
        $('#to_height').val(to_val);
        
        $('.advanceSearch_from_height').val(frm_val);
        $('.advanceSearch_to_height').val(to_val);


        refineSearch();
      }
    });
    instance = range.data('ionRangeSlider');
    function updateInputs(data) {
      from = data.from;
      to = data.to;
      inputFrom.prop('value', from);
      inputTo.prop('value', to);
    }
    inputFrom.on('input', function () {
      var val = $(this).prop('value');
      // validate
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }
      instance.update({
        from: val
      });
    });
    inputTo.on('input', function () {
      var val = $(this).prop('value');
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }
      instance.update({
        to: val
      });
    });
  });
  function cal(inch) {
    var obj = { 50: '4-2', 51: '4-3', 52: '4-4', 53: '4-5', 54: '4-6', 55: '4-7', 56: '4-8', 57: '4-9', 58: '4-10', 59: '4-11', 60: '5-0', 61: '5-1', 62: '5-2', 63: '5-3', 64: '5-4', 65: '5-5', 66: '5-6', 67: '5-7', 68: '5-8', 69: '5-9', 70: '5-10', 71: '5-11', 72: '6-0', 73: '6-1', 74: '6-2', 75: '6-3', 76: '6-4', 77: '6-5', 78: '6-6', 79: '6-7', 80: '6-8', 81: '6-9', 82: '6-10', 83: '6-11', 84: '7-0', 85: '7-1', 86: '7-2' };
    var getProperty = function (propertyName) {
      return obj[propertyName];
    };
    return getProperty(inch);
  }
  function calculate_cm(inch) {
    var value = 0, num = inch, str = num.toString(), numarray = str.split('-'), a = new Array();
    if (numarray.length > 1) {
      a = numarray;
      value = parseInt(a[0] * 12) + parseInt(a[1]);
    }
    else {
      value = parseInt(inch * 12);
    }
    return value;
  }
  $(function () {
    var range = $('.js-range-slider-2'), inputFrom = $('.js-input-from-2'), inputTo = $('.js-input-to-2'), instance, min = 18, max = 65, from = 0, to = 0;
    var from_age = $('#from_age').val();
    var to_age = $('#to_age').val();
    range.ionRangeSlider({
      type: 'double',
      min: min,
      max: max,
      from: from_age,
      to: to_age,
      postfix: '<span></span>',
      onStart: updateInputs,
      onChange: updateInputs,
      step: 1,
      prettify_enabled: true,
      prettify_separator: '',
      values_separator: ' - ',
      force_edges: true,
      onFinish: function (data) {
        $('#from_age').val(data.from);
        $('#to_age').val(data.to);
        
        $('.advanceSearch_from_age').val(data.from);
        $('.advanceSearch_to_age').val(data.to);
        
        refineSearch();
      }
    });
  
    instance = range.data('ionRangeSlider');
    function updateInputs(data) {
      from = data.from;
      to = data.to;
      inputFrom.prop('value', from);
      inputTo.prop('value', to);
    }
    inputFrom.on('input', function () {
      var val = $(this).prop('value');
      // validate
      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }
      instance.update({
        from: val
      });
    });
    inputTo.on('input', function () {
      var val = $(this).prop('value');
      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }
      instance.update({
        to: val
      });
    });
});

$(document).ready(function () {
  // Quick Search Select2:
  $("#marital_status4").select2({placeholder: "Marital status"});
  $("#caste4").select2({placeholder: "Caste"});
  $("#country_id4").select2({placeholder: "Country"});
  // Advanced Search Select2:
  $("#marital_statusAS").select2({placeholder: "Marital status"});
  $("#casteAS").select2({placeholder: "Caste"});
  $("#country_idAS").select2({placeholder: "Country"});
  $("#state_idAS").select2({placeholder: "State"});
  $("#education_levelAs").select2({placeholder: "Education"});
  $("#occupationAS").select2({placeholder: "Occupation"});
  $("#employee_inAS").select2({placeholder: "Employee In"});
  $("#incomeAS").select2({placeholder: "Annual Income"});
  $("#mother_tongueAS").select2({placeholder: "Mother Tongue"});
  $("#manglikAS").select2({placeholder: "Manglik"});
  // Search Result Select2:
  $("#caste").select2({placeholder: "Select caste"});
  $("#country_id").select2({placeholder: "Select Country"});
  $("#state_id").select2({placeholder: "Select State"});
  $("#mother_tongue").select2({placeholder: "Select Mother Tongue"});
  $("#education_level").select2({placeholder: "Select Education"});
  $("#occupation").select2({placeholder: "Select Occupation"});
  $("#employee_in").select2({placeholder: "Select Employee In"});
  $("#income").select2({placeholder: "Select Annual Income"});

  $("body").on("change",".searchFormChange", function(e){
    refineSearch(); 
  });

  dropdownChange('religion','caste','caste_list')
  setTimeout(function () {
    getDependecyList('religion','caste');
	}, 500);
  setTimeout(function () {
    getDependecyList('country_id','state_id')
	}, 1000);

  // Click On Pagination :
  $("#resultSearchData").on("click",".ajaxPagination", function(e){
      e.preventDefault();
      $('#page').val($(this).find('a').attr('data-page'));
      getSearchAjaxPaginationData();
  });
  $('#orderByList').change(function(){
    if($(this).val() !=''){
      getSearchAjaxPaginationData();
    }
  });
  togglePanel();

  $('.ContactViews').click(function(){
		var formData = new FormData();
		formData.append('userId',$(this).attr('data-id'));
		formData.append('matriId',$(this).attr('data-matri_id'));
		var baseUrl = $('#base_url').val();
		var url = baseUrl+'/view-contact-search';
		ajaxRequest($(this),formData,url,'responseViewContact');
	});
});

// Response View Contact :
function responseViewContact(_this,response){
	var baseUrl = $('#baseUrlImage').val();
  var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
  var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
  if (response.status == 'success') {
    var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
    $("#errorMsgUser").addClass('errorMsgUser d-none');
    $("#successMsgUser").removeClass('successMsgUser d-none');
    $("#successMsgUser").show();
    $("#responseSucMsgUser").html(message);
    $('#ContactViews').modal('show');
  } else {
    var message = '<img src="'+errorImgPath+'" /> Error : '+ response.message;
    $("#successMsgUser").addClass('successMsgUser d-none');
    $("#errorMsgUser").removeClass('d-none');
    $("#errorMsgUser").show();
    $("#responseErrMsgUser").html(message);
    $('#contactPlan').modal('show');
  }
}

function togglePanel (){
    var mobileViewSize= $(window).width();
    if (mobileViewSize <= 991) {
       $('#collapseExampleFilter').removeClass('show');
       $('.collaFilterExample').addClass('arrow-collapse collapsed');
      } else {
        $('#collapseExampleFilter').addClass('show');
    }
}

function refineSearch() {
    $('#page').val(1);
    getSearchAjaxPaginationData();
}

// Scroll Top To element : Date : 01-08-2023
function scrollTop(_this) {
  $('html, body').animate({
      scrollTop: $(_this).offset().top
  }, 1000);
}

// Ajax Search Pagination Data :
function getSearchAjaxPaginationData() {
    let formData = new FormData($('#searchFilterForm')[0]);
    let page = 1;
    if($('#page').length > 0 && $('#page').val() !='' && $('#page').val() !=0){
        page = $('#page').val();
    }
    if($('#orderByList').length > 0 && $('#orderByList').val() !='' && $('#orderByList').val() !=0){
      formData.append('order',$('#orderByList').val());
    }else{
        formData.append('order','id');
    }

    formData.append('from_height',$('#from_height').val());
    formData.append('to_height',$('#to_height').val());
    formData.append('from_age',$('#from_age').val());
    formData.append('to_age',$('#to_age').val());
    formData.append('page',page);
    let url = $('#ajaxRequestUrl').val();
    ajaxRequest('#resultSearchData',formData,url,'ajaxPaginationResponse');
}

// Ajax Pagination Response :
function ajaxPaginationResponse(_this, response) {
  if (response.status == "success") {
    $('#matri_id').val('');
    $(_this).html(response.html);
    $('html, body').animate({
      scrollTop: $("div#resultSearchData").offset().top
    }, 50);
  } else {
    $(_this).html(response.msg);
  }
}

