var index=(function(){

    var eventHandlers=function(){
        $(".addToProduct").click(function(){
            let url="/add-to-cart/"+$(this).attr("data-productID");
            $.get( url, function( data ) {
                alert(data.successMessage);
                if(data.isSuccess){
                    $("#countBadge").text(data.totalCount)
                }
            });
        });
    };

    eventHandlers();

})()


