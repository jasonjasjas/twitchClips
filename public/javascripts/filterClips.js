$(document).ready(function(){
    $('input#filter').on('input',function(){
        if($('#filter').val() == ''){
            $('.grid-element').show();
        }else{
            $('.grid-element').each(function(index){
                if($(this).attr('id').toUpperCase().includes($('#filter').val().toUpperCase())){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });
        }
        

    })



});