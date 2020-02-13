var urlParams = new URLSearchParams(window.location.search);
$(document).ready(function(){
    $('#loadmore').click(function(){
        //console.log($('#cursor').val());
        if($('#loadmore').attr('status')!= 'wait'){
            $('#loadmore').attr('status','wait');
            getClips($('#id').val(),urlParams.get('startdate'),urlParams.get('enddate'),filter,$('#cursor').val())
        }
        
        
    });

});
function filter(){
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
    $('#loadmore').attr('status','');
}
function getClips(id,startdate,enddate,callback,cursor){
    var url = 'https://api.twitch.tv/helix/clips?first=100&broadcaster_id='+ id;
    if(enddate){
        url += '&ended_at=' + enddate + 'T23:59:59Z';
    }
    if(startdate){
        url += '&started_at=' + startdate + 'T00:00:00Z';
    }
    if(!cursor==''){
        url += '&after=' + cursor;
    }else{
        $('#error').replaceWith('no more videos');
        return;
    }
    $.ajax({
        url: url,
        headers:{
            'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
        },
        success: function(result){
            console.log(url);
            $('#cursor').val(result.pagination.cursor);
            //alert(result.pagination.cursor);
            for(clip in result.data){
                var link = result.data[clip].url;
                var title = result.data[clip].title;
                var views = result.data[clip].view_count;
                var img = result.data[clip].thumbnail_url;
                $('.grid-container').append(
                    "<div class='grid-element' id='"+ title +"'><a href ='"+ link + "'><p style ='color:white'>"+ title +"<span style='color:white;float:right'>(views: " + views + ")</span></p><img src='" + img + "' width ='100%'></a></div>");
            }
            callback();
        },
        error: function(result){
            console.log(result);
        }
    });
}

