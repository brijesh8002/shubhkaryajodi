$(document).ready(function(){ 
    // Login Form :
    $('.registerFormSubmitBtn').click(function(){
		var _formId = '#'+$(this).data('formid');
		if($(_formId).valid()) { 
			$(this).prop('disabled', true);
			var formData = new FormData($(_formId)[0]);
			var url = $('#registerForm').attr('action');
			ajaxRequest($(this),formData,url,'responseRegister');
		}else{
            return false;
        }
	});
});

function responseRegister(_this,response){
	$(_this).prop('disabled', false);
	showResponseMessage(response);
	if (response.redirect != '' && response.redirect != undefined) {
		setTimeout(function(){ 
			window.location.href = response.redirect;
		}, 1000);
	}
}