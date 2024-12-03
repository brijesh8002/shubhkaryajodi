$(document).ready(function(){ 
    
});

// Ajax Search Pagination Data :
function getAjaxPaginationData() {
    let formData = new FormData();
    let page = 1;
    if($('#page').length > 0 && $('#page').val() !='' && $('#page').val() !=0){
        page = $('#page').val();
    }
    formData.append('page',page);
    let url = $('#ajaxRequestUrl').val();
    ajaxRequest('#resultData',formData,url,'ajaxPaginationResponse');
}

// Ajax Pagination Response :
function ajaxPaginationResponse(_this, response) {
    if (response.status == "success") {
        $(_this).html(response.html);
    } else {
        $(_this).html(response.msg);
    }
}
