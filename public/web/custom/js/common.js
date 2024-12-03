let selectedType, selectedPlacement, selectedPlacementAllign, toastPlacement;
let toastPlacementExample = document.querySelector('.toast-placement-ex');
$(document).ready(function(){ 

    // $(".Single_searchDv").select2({
    //     placeholder:"Please Select",
    //     allowClear: true
    // });

    $(".mustHaveEdit").show();
    $(".goodToHaveEdit").hide();
    $("#mustHave-tab").click(function () {
        $(".mustHaveEdit").show();
        $(".goodToHaveEdit").hide();
    });
    $("#GooHave-tab").click(function () {
        $(".mustHaveEdit").hide();
        $(".goodToHaveEdit").show();
    });

    setTimeout(function () {
		$('.disbaledValue').trigger('change');
	}, 100);
    
    $('.disbaledValue').on('change', function() {   
        var dropdownId = this.id; 
        var value = $('#'+dropdownId).val();
        if(value == 'Does Not Matter' && value != ''){ 
            $('option').each(function() {
                if(!this.selected) { 
                    $('select[name*="'+dropdownId+'"] option').attr('disabled', true);
                    $('select[name*="'+dropdownId+'"] option[value*="Does Not Matter"]').removeAttr('disabled'); 
                }
            });
        } 
        if(value == ''){
            $('select[name*="'+dropdownId+'"] option').prop('disabled',false);
        }else if(value != 'Does Not Matter'){
            $('select[name*="'+dropdownId+'"] option[value*="Does Not Matter"]').prop('disabled',true);
        } 
    });
    
    $('.disbaledValueSearch').on('change', function() {   
        var dropdownId = this.id;
        
        var value = $('#'+dropdownId).val();
        if(value == 'Does Not Matter' && value != ''){ 
            $('option').each(function() {
                if(!this.selected) { 
                    $('select[id*="'+dropdownId+'"] option').attr('disabled', true);
                    $('select[id*="'+dropdownId+'"] option[value*="Does Not Matter"]').removeAttr('disabled'); 
                }
            });
        } 
        if(value == ''){
            $('select[id*="'+dropdownId+'"] option').prop('disabled',false);
        }else if(value != 'Does Not Matter'){
            $('select[id*="'+dropdownId+'"] option[value*="Does Not Matter"]').prop('disabled',true);
        } 
    });

    var deleteRecordMsg = 'Are you sure to proceed ?';
    // Check All Check box: Date : 01-08-2023
    $('body').on('click','.all_check',function(){
        if ($(this).prop('checked') == true) {
            $('.checkboxId').prop('checked', true);
        } else {
            $('.checkboxId').prop('checked', false);
        }
    });

    $("#resultData").on("click", ".checkboxId", function() {
        if ($(this).prop('checked') == true) {
            // Checked Checkbox count is same all check box then all checkbox check
            if ($('.checkboxId:checked').length == $('.checkboxId').length) {
                $('.all_check').prop('checked', true);
            }
        } else {
            $('.all_check').prop('checked', false);
        }
    });

    // Action Status Update : Date : 01-08-2023
	$('.actionBtn').click(function(){
		var formData = new FormData();
		if($('.checkboxId:checked').length <=0){
			showNotification('top-0', 'end-0','bg-danger','withicon','fa fa-times','Please select at least one record to process!','Failed');
			return false;
		}
		var checkboxId = [];
		$('.checkboxId:checked').each(function() {
			checkboxId.push($(this).val());
		});
		formData.append($(this).attr('data-column'),$(this).attr('data-value'));
        formData.append('id',checkboxId);
        var url = $('#changeStatusUrl').val();
        // Delete Confirmation : Date : 01-08-2023
        if($(this).attr("isconfirm") && $(this).attr("isconfirm") == 1){
            if(confirm(deleteRecordMsg)){
                ajaxRequest('#resultData',formData,url,'ajaxChangeStatusResponse');
            }
        }else{
            // Other Action : 
            ajaxRequest('#resultData',formData,url,'ajaxChangeStatusResponse');
        }
    });

    // Click On Pagination : Date : 01-08-2023
    $("#resultData").on("click",".ajaxPagination", function(e){
        e.preventDefault();
        $('#page').val($(this).find('a').attr('data-page'));
		getAjaxPaginationData();
	});

    // Search Ajax Data Click : Date : 01-08-2023
    $('#commonSearch').click(function(){
        $('#page').val(1);
        getAjaxPaginationData();
    });

    // Search On Press Enter and If blank : Date : 01-08-2023
    $("#searchText").keyup(function(event) {
		if (event.keyCode === 13 || $(this).val() == '') {
			$("#commonSearch").click();
		}
	});

    // Record Per Page Change : Date : 01-08-2023
    $('#recordLimit').change(function(){
        if($(this).val() !=''){
            $('#page').val(1);
            getAjaxPaginationData();
        }
    });

    // Tab Change Ajax data : Date : 01-08-2023
    $('.tabClick').click(function(){
        if(!$(this).hasClass('active')){
            $('.tabClick').removeClass('active');
            $(this).addClass('active');
            $('#page').val(1);
            getAjaxPaginationData();
        }
    }); 

    $('#formSubmitBtn').click(function(e){
		e.preventDefault();
		if ($("#addEditForm").valid()) {
			$('#addEditForm').trigger('submit');
		}else{
            return false;
        }
	});

    $("body").on("click",".common-send-interest", function(e){
        let formData = new FormData();
        formData.append('receiver_member_id',$(this).attr('data-id'));
        let action = $("#base_url").val()+'/send-connection';
        ajaxRequest($(this),formData,action,'ajaxSendInterestResponse');
    });
    
    $("body").on("click",".common-add-remove-shortlist", function(e){
        let formData = new FormData();
        formData.append('receiver_member_id',$(this).attr('data-id'));
        formData.append('value',$(this).attr('data-value'));
        let action = $("#base_url").val()+'/add-remove-shortlist';
        ajaxRequest($(this),formData,action,'ajaxAddRemoveShortListResponse');
    });
    
    $("body").on("click",".sendPhotoRequest", function(e){
        let formData = new FormData();
        formData.append('receiver_member_id',$('#memberActionId').val());
        // formData.append('value',$(this).attr('data-value'));
        let action = $("#base_url").val()+'/photo-request/send';
        ajaxRequest($(this),formData,action,'ajaxSendPhotoRequestResponse');
    });

    $('body').on('click', ".blockMemberProfile", function (e) {
		var formData = new FormData();
		let memberId = $(this).attr('data-id');
		let value = $(this).attr('data-value');
		formData.append('id',memberId);  
		formData.append('value',value);  
		var action = $("#base_url").val()+'/blocked-member';
		ajaxRequest($(this),formData,action,'responseBlockMemberProfile');
	});

    $(".submitSubscribeForm").click(function(e) {
        if ($("#subscribeForm").valid()) {
            e.preventDefault();
            var formData = new FormData($('#subscribeForm')[0]);  
            var url = $('#subscribeForm').attr('action');
            ajaxRequest($(this),formData,url,'responseEmailSubscribe');
        }else{
            return false;
        }
    });

    // Report Spam Profile Request:
    $("body").on("click",".reportProfileSubmitBtn", function(e){
        var _formId = '#'+$(this).data('formid');
        if($(_formId).valid()) { 
            $(this).prop('disabled', true);
            var formData = new FormData($(_formId)[0]);
            formData.append('report_id',$('#report_id').val());
            var url = $('#reportProfile').attr('action');
            ajaxRequest($(this),formData,url,'responseReportSpamRequest');
        }else{
            return false;
        }
    });

    $('.generateOTPSubmitBtn').click(function(){
        var _formId = '#'+$(this).data('formid');
        if($(_formId).valid()) { 
            $(this).prop('disabled', true);
            var formData = new FormData($(_formId)[0]);
            var url = $('#generateOTP').attr('action');
            formData.append('otpType','SendOtp');
            ajaxRequest($(this),formData,url,'responseSendOtp');
        }else{
            return false;
        }
    });

    // Generate Otp
    $('.verifyOtpSubmitBtn').click(function(){
    var _formId = '#'+$(this).data('formid');
            var otp1 = $('#otp1').val();
            var otp2 = $('#otp2').val();
            var otp3 = $('#otp3').val();
            var otp4 = $('#otp4').val();
            var otp5 = $('#otp5').val();
            var otp6 = $('#otp6').val();
            var checkOtp = otp1+otp2+otp3+otp4+otp5+otp6;
            var formData = new FormData($(_formId)[0]);
            formData.append('otp', checkOtp);
            var url = $('#verifyMobileOtp').attr('action');
            ajaxRequest($(this),formData,url,'responseVerifyOtp');
    });

    $("#is_timer").show();
    $("#resendOtp").hide();
    timer_on_otp();

    // $("#is_timer").hide();
    $('#resendOtp').click(function(){
        var _formId = '#verifyMobileOtp';
        if ($(_formId).valid()) {
            $("#is_timer").show();
            $("#resendOtp").hide();
            timer_on_otp();
            $('resendOtp').append('Resend Otp');
            $(this).prop('disabled', true);
            var formData = new FormData($(_formId)[0]);
            formData.append('otpType','ResendOtp');
            var baseUrl = $('#base_url').val();
            var url = baseUrl+'/generate-mobile-otp';
            ajaxRequest($(this), formData, url, 'responseResendOtp');
        } else {
            return false;
        }
    });

    $(".notificationUnread").click(function () {
        let formData = new FormData;
        var baseUrl = $('#base_url').val();
        var url = baseUrl+'/notification-read';
        ajaxRequest($(this), formData, url, 'responceNotificationRead');
    });
});

function responseBlockMemberProfile(_this,response){
	showResponseMessage(response);
    if(response.status == 'success'){
		$(_this).find('img').attr('src', response.data.blockedIcon);
        if ($(_this).attr('data-value') == 0) {
            $(_this).removeClass('filled');
            $(_this).attr('data-value', 1);
        } else {
            // $(_this).addClass('filled');
            $(_this).attr('data-value', 0);
        }
    }
}

function responceNotificationRead(_this, response){
    if(response.status == 'success'){
        $('#notificationRead').hide();
    }
}

function responseResendOtp(_this, response) {
	$(_this).prop('disabled', false);
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgNew").addClass('errorMsgNew d-none');
        $("#successMsgNew").removeClass('successMsgNew d-none');
        $("#successMsgNew").show();
        $("#responseSucMsgNew").html(message);
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsgNew").addClass('successMsg d-none');
        $("#errorMsgNew").removeClass('d-none');
        $("#errorMsgNew").show();
        $("#responseErrMsgNew").html(message);
	}
}

function responseVerifyOtp(_this,response){
	$(_this).prop('disabled', false);
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsg").addClass('errorMsg d-none');
        $("#successMsg").removeClass('successMsg d-none');
        $("#responseSucMsg").html(message);
        $("#successMsg").show();
        $("#successMsg").fadeOut(5000);
        setTimeout(function(){ 
        location.reload();
        }, 2000);
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsg").addClass('successMsg d-none');
        $("#errorMsg").removeClass('d-none');
        $("#errorMsg").show();
        $("#responseErrMsg").html(message);
        $("#errorMsg").fadeOut(5000);
    }
}


function responseReportSpamRequest(_this,response){
    $(_this).prop('disabled', false);
    var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgRS").addClass('errorMsgRS d-none');
        $("#successMsgRS").removeClass('successMsgRS d-none');
        $("#responseSucMsgRS").html(message);
        $("#successMsgRS").show();
        $("#successMsgRS").fadeOut(5000);
        $("#reportProfile")[0].reset();
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsgRS").addClass('successMsgRS d-none');
        $("#errorMsgRS").removeClass('d-none');
        $("#errorMsgRS").show();
        $("#responseErrMsgRS").html(message);
        $("#errorMsgRS").fadeOut(5000);
    }
}

function responseSendOtp(_this,response){
    $(_this).prop('disabled', false);
    var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsg").addClass('errorMsgOTP d-none');
        $("#successMsgOTP").removeClass('successMsgOTP d-none');
        $("#responseSucMsgOTP").html(message);
        $("#successMsgOTP").show();
        $("#successMsgOTP").fadeOut(5000);
        setTimeout(function(){
        $("#generateOtp").hide();
        $("#verifyOtp").removeClass('d-none');
            }, 1000);
        
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsgOTP").addClass('successMsgOTP d-none');
        $("#errorMsgOTP").removeClass('d-none');
        $("#errorMsgOTP").show();
        $("#responseErrMsgOTP").html(message);
        $("#errorMsgOTP").fadeOut(5000);
    }
}

function timer_on_otp() {
	let timerOn = true;
	function timer(remaining) {
		var m = Math.floor(remaining / 60);
		var s = remaining % 60;
		m = m < 10 ? '0' + m : m;
		s = s < 10 ? '0' + s : s;
		document.getElementById('timer').innerHTML = m + ':' + s;
		remaining -= 1;
		if(remaining >= 0 && timerOn) {
			setTimeout(function() {
				timer(remaining);
			}, 1000);
			return;
		} 
		if(!timerOn) {
			return;
		}
		$("#resendOtp").show();
		$("#is_timer").hide();
	}
	timer(30);
}

function responseEmailSubscribe(_this,response){ 
    var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgSus").addClass('errorMsgSus d-none');
		$("#successMsgSus").removeClass('successMsgSus d-none');
		$("#successMsgSus").show();
        $("#responseSucMsgSus").html(message);
        $("#successMsgSus").fadeOut(5000);
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsgSus").addClass('successMsgSus d-none');
		$("#errorMsgSus").removeClass('d-none');
		$("#errorMsgSus").show();
        $("#responseErrMsgSus").html(message);
		$("#errorMsgSus").fadeOut(6000);
	}
}

// Custom Common Function : Date : 31-07-2023

// Common Ajax Request : Date : 31-07-2023
function ajaxRequest(element, formData, requestUrl, responseFunction='') {
	formData.append('isPost',1);
    formData.append('_token',$("input[name=_token]").val());
    $.ajax({
        url: requestUrl,
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,

        success: function(data) {
            // var responseData = JSON.parse(data);
            var responseData = data;
			if (responseData.redirectUrl != '' && responseData.redirectUrl != undefined) {
				window.location.href = responseData.redirectUrl;
			}

			// Call Back Function : 
			if (responseFunction !='') {
            	window[responseFunction](element, responseData);
			}
			
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $(element).prop('disabled', false);
            if (jqXHR.status == 422){
            }else{
            }
        }
    });
}

// Scroll Top To element : Date : 01-08-2023
function scrollTop(_this) {
    $('html, body').animate({
        scrollTop: $(_this).offset().top
    }, 1000);
}

// // Show Notification : Date : 01-08-2023
// function showNotification(placementFrom = 'top-0',placementAlign = 'end-0', state = 'bg-info', style = 'plain', icon = 'fa fa-bell', message = '', title = '', url = '') {
//     var placementFrom = placementFrom;
//     var placementAlign = placementAlign;
//     var state = state;
//     var style = style;

//     if(toastPlacement) {
//         toastDispose(toastPlacement);
//     }
//     $('.toast-title').text(title);
//     $('.toast-body').text(message);
//     selectedType = state;
//     selectedPlacement = placementFrom;
//     selectedPlacementAllign = placementAlign;
//     toastPlacementExample.classList.add(selectedType);
//     toastPlacementExample.classList.add(selectedPlacement);
//     toastPlacementExample.classList.add(placementAlign);
//     toastPlacement = new bootstrap.Toast(toastPlacementExample);
//     toastPlacement.show();
// }

// // Dispose toast when open another
// function toastDispose(toast) {
//     if (toast && toast._element !== null) {
//       if (toastPlacementExample) {
//         toastPlacementExample.classList.remove(selectedType);
//         toastPlacementExample.classList.remove(selectedPlacement);
//         toastPlacementExample.classList.remove(selectedPlacementAllign);
//       }
//       toast.dispose();
//     }
// }

function dropdownChange(currnet_id,disp_on,get_list) {
	var base_url = $("#base_url").val();
	url = base_url+ '/common-request/get-list';
	currnet_val = $("#"+currnet_id).val();
    if(currnet_val != 'Does Not Matter'){
        if(currnet_val !='' && currnet_val != null ) {
            var formData = new FormData();
            formData.append('get_list',get_list);
            formData.append('currnet_val',currnet_val);
            formData.append('disp_on',disp_on);
            if($('#'+disp_on).attr('data-value') != '' && typeof $('#'+disp_on).attr('data-value') !== 'undefined'){
                formData.append('selectedVal', $('#'+disp_on).attr('data-value'));
            }
            ajaxRequest('#resultData',formData,url,'getListCommonResponse');
        } else {
            $("#"+disp_on).html('<option value="">Please Select</option>');
            if(get_list =='caste_list') {
                if($("#caste").length > 0) {
                    $("#caste").html('<option value="">Select Caste</option>');
                }
            }
            if(get_list =='state_list') {
                if($("#city").length > 0) {
                    $("#city").html('<option value="">Select City</option>');
                }
            }
        }
    }else{
        if(get_list =='state_list' && currnet_val == 'Does Not Matter') {
            if($("#state_id").length > 0) {
                $("#state_id").html("<option value='Does Not Matter'>Does Not Matter</option>");
            }
        }
        if(get_list =='caste_list' && currnet_val == 'Does Not Matter') {
            if($("#caste").length > 0) {
                $("#caste").html("<option value='Does Not Matter'>Does Not Matter</option>");
            }
            if($("#part_religion").length > 0) {
                $("#part_caste").html("<option value='Does Not Matter'>Does Not Matter</option>");
            }
        }
    }
}
function getDependecyList(from_id,to_id) {
	var base_url = $("#base_url").val();
	url = base_url+ '/common-request/get-search-list';
    if(from_id !='' && from_id != null && to_id !='' && to_id != null) {

        var selectedVal = [];
        var i = 0;
		$('input[name="' + from_id + '[]"]:checked').each(function() {
            selectedVal[i] = this.value;
            i++;
		});

        var selectedValTo = [];
        var j = 0;
		$('input[name="' + to_id + '[]"]:checked').each(function() {
            selectedValTo[j] = this.value;
            j++;
		});

        var formData = new FormData();
        formData.append('listfrom',from_id);
        formData.append('listto',to_id);
        formData.append('value',selectedVal);
        formData.append('value_to',selectedValTo);
        ajaxRequest('#resultData',formData,url,'getDependencyCommonResponse');
    }
}


// Get List Common Response : 
function getDependencyCommonResponse(_this,response){
    if(response.status == 'success'){
        $("#listDisplay_"+response.listTo).html(response.html);
    }
}


// Get List Common Response : 
function getListCommonResponse(_this,response){
    if(response.status == 'success'){
        $("#"+response.data.disp_on).html(response.html);
        if(response.data.disp_on =='part_religion'){
            if($("#part_religion").length > 0){
                $("#part_caste").append('<option value="Does Not Matter">Does Not Matter</option>');
            }
        }
        if(response.data.get_list =='state_list'){
            if($("#city").length > 0){
                $("#city").html('<option value="">Select City</option>');
            }
        }
    }
}

// Check Two Value Same : Date : 29-01-2021
function isSameValue(value1 = '', value2 = '') {
    var returnValue = false;
    if (value1 == value2) {
        returnValue = true;
    }
    return returnValue;
}

function razorPaySubmit(){
    $('#razorpaySubmitBtn').submit();
}

// Append Message :
function appendNewMessageReceiver(notificationData){
    let html = '<div class="recive-sms-rm">'+notificationData.message+
                    '<div class="d-flex gap-1 align-items-center justify-content-end">'+
                        '<div class="msgtimes fts-10 heading-color-L FFM-Medium">'+ notificationData.display_time +'</div>'+
                    '</div>'+
                '</div>';
    $('body').find('#chatConversation').find('#messageList').append(html);
    $('body').find('#chatConversation').find('#chatDiv').scrollTop($('#chatDiv')[0].scrollHeight);;
}

$(document).ready(function() {
    $("#leftSideScroll").click(function() { 
        var scrollDistance = 600; 
        $(".mobile_overflowchats").animate({scrollLeft: '+=' + scrollDistance}, 'fast');
    });
    $('body').on('click','#rightClickchat',function(){
        var scrollDistance = 0; 
        $(".mobile_overflowchats").animate({scrollLeft: '-=' - scrollDistance}, 'fast');
    });
});


function responseAddEditMember(_this,response){
	$(_this).prop('disabled', false);
    if(response.status == 'success'){
		showNotification('top-0','end-0','bg-success','withicon','fa fa-check',response.msg,'Success');
        setTimeout(function(){ 
			$(_this).prop('disabled', false);
            var activeNav = $('.nav-link.active');
			var liActive = $(activeNav).removeClass('active');
			if($(activeNav).closest('li').next("li").find("button").length > 0){
                $(activeNav).closest('li').next("li").find("button").addClass('active');
				var oldActiveTabContent = $(activeNav).attr("data-bs-target");
				var newActiveTabContent = $(activeNav).closest('li').next("li").find("button").attr("data-bs-target");
				console.log(newActiveTabContent)
				
				// After Success Response Old Active Tab Mode Change :
				var _oldActiveFormId = '#'+$(_this).data('formid');
				if(response.data.mode == 'add'){
					// $(_oldActiveFormId).find('#id'+response.data.step).val(response.data.member_id);
					// $(_oldActiveFormId).find('#mode'+response.data.step).val('edit');
					// $(newActiveTabContent).find('form').find($('[name ="id"]')).val(response.data.member_id);
					// $(newActiveTabContent).find('form').find($('[name ="mode"]')).val('edit');
					$('#mode').val('edit');
					$('#id').val(response.data.member_id);
				}
				$(oldActiveTabContent).removeClass('active show');
				$(newActiveTabContent).addClass('active show');
			}else{
				window.location.href = $('#successUrl').val();
			}
		}, 1000);
    }else{
		$(_this).prop('disabled', false);
        showNotification('top-0','end-0','bg-danger','withicon','fa fa-times',response.msg,'Failed');
	}
}

function getMemberId(member_id){
    $('#memberActionId').val(member_id);
}

function ajaxSendInterestResponse(_this, response) {
    $("html, body").animate({ scrollTop: 0 }, "fast");
	showResponseMessage(response);
    if (response.status == 'success') {
        // $(_this).addClass('filled');
        $(_this).find('img').attr('src', response.data.iconUrl);
    }
}

function ajaxAddRemoveShortListResponse(_this, response) {
    $("html, body").animate({ scrollTop: 0 }, "fast");
	showResponseMessage(response);
    if (response.status == 'success') {
        $(_this).find('img').attr('src', response.data.iconUrl);
        if ($(_this).attr('data-value') == 0) {
            $(_this).removeClass('filled');
            $(_this).attr('data-value', 1);
        } else {
            // $(_this).addClass('filled');
            $(_this).attr('data-value', 0);
        }
    }
}
function ajaxSendPhotoRequestResponse(_this, response) {
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if (response.status == 'success') {
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgPR").addClass('errorMsgPR d-none');
		$("#successMsgPR").removeClass('successMsgPR d-none');
		$("#successMsgPR").show();
        $("#responseSucMsgPR").html(message);
        $("#successMsgPR").fadeOut(6000);
    } else {
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsgPR").addClass('successMsgPR d-none');
		$("#errorMsgPR").removeClass('d-none');
		$("#errorMsgPR").show();
        $("#responseErrMsgPR").html(message);
        $("#errorMsgPR").fadeOut(6000);
    }
}

function showResponseMessage(response) {
    var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if (response.status == 'success') {
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsg").addClass('errorMsg d-none');
		$("#successMsg").removeClass('successMsg d-none');
		$("#successMsg").show();
        $("#responseSucMsg").html(message);
        $("#successMsg").fadeOut(6000);
    } else {
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
        $("#successMsg").addClass('successMsg d-none');
		$("#errorMsg").removeClass('d-none');
		$("#errorMsg").show();
        $("#responseErrMsg").html(message);
        $("#errorMsg").fadeOut(6000);
    }
}