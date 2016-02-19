/*jquery:true */
(function () {
    'use strict';

    const DEFAULT_HIDE_ELEMENTS = [
        '#_sendEnterActionArea',
        '#_directCall'
    ]
    var hideElements = '';

    chrome.storage.sync.get(["hideElements"], function(model) {
        if (model.hideElements == undefined) {
            model.hideElements = DEFAULT_HIDE_ELEMENTS;
        }
        var hideElements = model.hideElements.join(',');
        var blockTimer = setInterval(function(){
            $(hideElements).css("display","none");
        } , 1000);
    });

	chrome.storage.sync.get("pinContact", function(model) {
        if (model.pinContact == true){
            console.log("pinContact start");

            var blockTimer = setInterval(function(){
                var contacts = [];
                var others   = [];
                $("#_roomListItems>li").each(function(){
                    if ( $(this).hasClass("roomUnread") ){

                        // contact
                        if ( $("div>img", this).hasClass("_avatar") ){
                            contacts.push( $(this) );
                            return true;
                        }
                    }
                    others.push( $(this) );
                });

                if (contacts.length < 1) { return; }

                $("#_roomListItems").empty();
                $.each( contacts, function( index, value ){
                    $("#_roomListItems").append( value );
                });

                $.each( others, function( index, value ){
                    $("#_roomListItems").append( value );
                });
            } , 1000);
        }
	});
}());
