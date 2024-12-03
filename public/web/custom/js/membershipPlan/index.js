$(document).ready(function(){ 
    $('.planSubmit').click(function(){
        const planId = $(this).data('id');
        if (planId !='') {
            let formData = new FormData($('#planSelectForm')[0]);
            $('#plan_id').val(planId);
            let url = $('#planSelectForm').attr('action');
            ajaxRequest('#resultData',formData,url,'ajaxPaginationResponse');
        } else {
            return false;
        }
    });

    $('#paymentSuccess').on('hidden.bs.modal', function(e) {
        window.location.href = 'check-status'
    });
    $('#paymentfail').on('hidden.bs.modal', function(e) {
        window.location.href = 'check-status'
    });
    var paymentStatus =  $('#paymentStatus').val();
    if(paymentStatus == 'success'){
        $('#paymentSuccess').modal('show');
    }
    if(paymentStatus == 'failed'){
        $('#paymentfail').modal('show');
    }

    $('.applyCoupanCodeSubmitBtn').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) { 
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			formData.append('coupon_id',$(this).attr('data-id'));
			var url = $('#applyCoupanCode').attr('action');
			ajaxRequest($(this),formData,url,'responseApplyCoupanCode');
		}else{
            return false;
        }
	});
    $('.applyCoupanCodeSubmitBtnNew').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) { 
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			formData.append('coupon_id',$(this).attr('data-id'));
			var url = $('#applyCoupanCodeNew').attr('action');
			ajaxRequest($(this),formData,url,'responseApplyCoupanCodeNew');
		}else{
            return false;
        }
	});
});

function razorPaySubmit(){
    $('#razorpaySubmitBtn').submit();
}

// Ajax Pagination Response : Date : 13-09-2023
function ajaxPaginationResponse(_this,response){
    if(response.status == 'success'){
        $(_this).html(response.html);
    }else{
        $(_this).html(response.msg);
    }
}

function responseApplyCoupanCode(_this, response) {
    $(this).prop('disabled', false);
    showResponseMessage(response);
    if(response.status == 'success'){
        setTimeout(function(){ 
			location.reload();
		}, 500);
    }
}

function responseApplyCoupanCodeNew(_this,response){
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
        setTimeout(function(){ 
			location.reload();
		}, 500);
    }else{
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsgNew").addClass('successMsgNew d-none');
		$("#errorMsgNew").removeClass('d-none');
		$("#errorMsgNew").show();
        $("#responseErrMsgNew").html(message);
		$("#errorMsgNew").fadeOut(5000);
	}
}