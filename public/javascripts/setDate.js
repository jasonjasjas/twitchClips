$(document).ready(function(){ 
    var d = new Date();
    var today = d.toISOString();
    if($('#enddate').val() == ''){
        $('#enddate').val(today.substring(0,10)); 
    }
    if($('#startdate').val() == ''){
        $('#startdate').val(today.substring(0,8) + '01'); 
    }
    $('#monthback').click(function(){
        
        var d = new Date($('#startdate').val());
        d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 );
        //Day in a month for the MONTH BEFORE it
        var monthlength = getMonthLength(d.getMonth()+1,d.getFullYear(),[1,2,4,6,9,11,8],[5,7,10,12] );

        d.setDate(d.getDate() - monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        d.setDate(1);
        $('#startdate').val(d.toISOString().substring(0,10));
        d.setDate(d.getDate() + monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));


    });
    $('#monthforward').click(function(){
        var d = new Date($('#startdate').val());
        var month = d.getMonth()+1;
        //Day in a month 
        var monthlength = getMonthLength(month,d.getFullYear(),[1,3,5,7,8,10,12],[4,6,9,11] );
        d.setDate(d.getDate() + monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        d.setDate(1);
        $('#startdate').val(d.toISOString().substring(0,10));

        month = d.getMonth()+1;
        var monthlength = getMonthLength(month,d.getFullYear(),[1,3,5,7,8,10,12],[4,6,9,11] );
        console.log(monthlength);
        d.setDate(d.getDate() + monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });
    $('#weekback').click(function(){
        var d = new Date($('#startdate').val());
        d.setDate(d.getDate() - 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#startdate').val(d.toISOString().substring(0,10));
        d.setDate(d.getDate() + 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });
    $('#weekforward').click(function(){
        var d = new Date($('#startdate').val());
        d.setDate(d.getDate() + 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#startdate').val(d.toISOString().substring(0,10));
        d.setDate(d.getDate() + 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });    
    $('#dayback').click(function(){
        var d = new Date($('#startdate').val());
        d.setDate(d.getDate() - 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#startdate').val(d.toISOString().substring(0,10));
        d.setDate(d.getDate() + 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });
    $('#dayforward').click(function(){
        var d = new Date($('#startdate').val());
        d.setDate(d.getDate() + 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#startdate').val(d.toISOString().substring(0,10));
        d.setDate(d.getDate() + 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });    
    $('#dayadd').click(function(){
        var d = new Date($('#enddate').val());
        d.setDate(d.getDate() + 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });    
    $('#weekadd').click(function(){
        var d = new Date($('#enddate').val());
        d.setDate(d.getDate() + 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });   
    $('#monthadd').click(function(){
        var d = new Date($('#enddate').val());
        var month = d.getMonth()+1;
        //Day in a month 
        var monthlength = getMonthLength(month,d.getFullYear(),[1,3,5,7,8,10,12],[4,6,9,11] );
        d.setDate(d.getDate() + monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        d.setDate(1);
        $('#enddate').val(d.toISOString().substring(0,10));
    });   
    $('#dayminus').click(function(){
        var d = new Date($('#enddate').val());
        d.setDate(d.getDate() - 1);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });    
    $('#weekminus').click(function(){
        var d = new Date($('#enddate').val());
        d.setDate(d.getDate() - 7);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        $('#enddate').val(d.toISOString().substring(0,10));
    });   
    $('#monthminus').click(function(){
        var d = new Date($('#enddate').val());
        var month = d.getMonth()+1;
        //Day in a month for the MONTH BEFORE it
        var monthlength = getMonthLength(d.getMonth()+1,d.getFullYear(),[1,2,4,6,9,11,8],[5,7,10,12] );
        d.setDate(d.getDate() - monthlength);
        d.setTime( d.getTime() - d.getTimezoneOffset()*60*1000 );
        d.setDate(1);
        $('#enddate').val(d.toISOString().substring(0,10));
    });   
});

function getMonthLength(month,year, thirtyone, thirty){
    if(thirtyone.includes(month)){
        monthlength = 31;
    }else if(thirty.includes(month)){
        monthlength = 30
    }else{
        //leap year check
        if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
            monthlength = 29;
        }else{
            monthlength = 28;
        }
    }
    return monthlength;
}