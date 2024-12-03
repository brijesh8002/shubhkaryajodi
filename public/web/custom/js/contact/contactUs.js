
var address = $('#map_address').val();
var tooltip = $('#map_tooltip').val();

$(document).ready(function(){
    $('#googleMap').gMap({
        maptype: 'ROADMAP',
        scrollwheel: false,
        zoom: 12,
        markers: [
            {
                address: address,
                html: tooltip,
                popup: true,
            }
        ],
    });

    $(".submitInquiry").click(function(e) {
        if ($("#contactInquiryForm").valid()) {
            e.preventDefault();
            var formData = new FormData($('#contactInquiryForm')[0]);  
            var url = $('#contactInquiryForm').attr('action');
            ajaxRequest($(this),formData,url,'responseFeedback');
        }else{
            return false;
        }
    });
});

function responseFeedback(_this,response){ 
    var baseUrl = $('#baseUrlImage').val();
    var sucessImgPath = baseUrl+'/web/assets/img/icons/Success-alert-icons.png';
    var errorImgPath = baseUrl+'/web/assets/img/icons/error-input-icon.svg';
    if(response.status == 'success'){
        var message = '<img src="'+sucessImgPath+'" /> Success : '+ response.message;
        $("#errorMsg").addClass('errorMsg d-none');
		$("#successMsg").removeClass('successMsg d-none');
		$("#successMsg").show();
        $("#responseSucMsg").html(message);
        $("#successMsg").fadeOut(5000);
    }else{
        var message = '<img src="'+errorImgPath+'" /> Error :'+ response.message;
		$("#successMsg").addClass('successMsg d-none');
		$("#errorMsg").removeClass('d-none');
		$("#errorMsg").show();
        $("#responseErrMsg").html(message);
		$("#errorMsg").fadeOut(6000);
	}
} 