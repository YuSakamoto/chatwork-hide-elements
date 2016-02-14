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
}());
