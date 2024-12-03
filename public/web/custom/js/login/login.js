$(document).ready(function(){ 

	$("#addMaleData").click(function () {
		var username = $('#maleUsername').attr('data-id')
		var password = $('#malePassword').attr('data-id')
		$('#username').val(username);
		$('#password').val(password);
	});

	$("#addFemaleData").click(function () {
		var username = $('#femaleUsername').attr('data-id')
		var password = $('#femalePassword').attr('data-id')
		$('#username').val(username);
		$('#password').val(password);
	});

    // Login Form :
    $('.loginFormSubmitBtn').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) { 
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			var url = $('#loginForm').attr('action');
			ajaxRequest($(this),formData,url,'responseLogin');
		}else{
            return false;
        }
	});
});

function responseLogin(_this,response){
	$(_this).prop('disabled', false);
	showResponseMessage(response);
    if(response.status == 'success'){
		if (response.redirect != '' && response.redirect != undefined) {
			setTimeout(function(){ 
				window.location.href = response.redirect;
			}, 1000);
		}
    }
}


// Login With Otp :
$(document).ready(function(){
	// Generate Otp
    $('.generateOTPSubmitBtn').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) { 
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			var url = $('#generateOTP').attr('action');
			ajaxRequest($(this),formData,url,'responseSendOtp');
		}else{
            return false;
        }
	});
	// Generate Otp
    $('.verifyOTPSubmitBtn').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) {
			var otp1 = $('#otp1').val();
			var otp2 = $('#otp2').val();
			var otp3 = $('#otp3').val();
			var otp4 = $('#otp4').val();
			var otp5 = $('#otp5').val();
			var otp6 = $('#otp6').val();
			var checkOtp = otp1+otp2+otp3+otp4+otp5+otp6;

			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			formData.append('otp', checkOtp);
			var url = $('#verifyMobileOTP').attr('action');
			ajaxRequest($(this),formData,url,'responseVerifyOtp');
		}else{
            return false;
        }
	});

	// Resend Otp :

	$("#is_timer").show();
	$("#resendOtp").hide();
	timer_on_otp();

	// $("#is_timer").hide();
	$('#resendOtp').click(function(){  
		var _formId = '#verifyMobileOTP';
		if ($(_formId).valid()) {
			$("#is_timer").show();
			$("#resendOtp").hide();
			timer_on_otp();
			$('resendOtp').append('Resend Otp');
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			var baseUrl = $('#base_url').val();
			var url = baseUrl+'/resend-otp';
			ajaxRequest($(this), formData, url, 'responseResendOtp');
		} else {
			return false;
		}
	});
});

function responseSendOtp(_this,response){
	$(_this).prop('disabled', false);
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
		var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsg").addClass('errorMsg d-none');
		$("#successMsg").removeClass('successMsg d-none');
		$("#successMsg").show();
        $("#responseSucMsg").html(message);
		setTimeout(function(){ 
			$("#sendOTP").hide();
			$("#verifyOTP").removeClass('verifyOTP d-none');
		}, 1000);
    }else{
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsg").addClass('successMsg d-none');
		$("#errorMsg").removeClass('d-none');
		$("#errorMsg").show();
        $("#responseErrMsg").html(message);
		$("#errorMsg").fadeOut(5000);
	}
}

function responseVerifyOtp(_this,response){
	$(_this).prop('disabled', false);
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
		var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgOtp").addClass('errorMsgOtp d-none');
		$("#successMsgOtp").removeClass('successMsgOtp d-none');
		$("#successMsgOtp").show();
        $("#responseSucMsgOtp").html(message);
		if (response.redirect != '' && response.redirect != undefined) {
			setTimeout(function(){ 
				window.location.href = response.redirect;
			}, 1000);
		}
    }else{
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsgOtp").addClass('successMsg d-none');
		$("#errorMsgOtp").removeClass('d-none');
		$("#errorMsgOtp").show();
        $("#responseErrMsgOtp").html(message);
		// $("#errorMsgOtp").fadeOut(5000);
		// $("#successMsgOtp").slideDown();
	}
}

function responseResendOtp(_this, response) {
	$(_this).prop('disabled', false);
	var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
		var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsgOtp").addClass('errorMsgOtp d-none');
		$("#successMsgOtp").removeClass('successMsgOtp d-none');
		$("#successMsgOtp").show();
        $("#responseSucMsgOtp").html(message);
    }else{
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsgOtp").addClass('successMsg d-none');
		$("#errorMsgOtp").removeClass('d-none');
		$("#errorMsgOtp").show();
        $("#responseErrMsgOtp").html(message);
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