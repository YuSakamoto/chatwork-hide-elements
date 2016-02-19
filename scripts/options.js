const DEFAULT_HIDE_ELEMENTS = [
	'#_sendEnterActionArea',
	'#_directCall'
]

function save_options() {
	var hideElements = [];
	$("input").each(function(i, input) {
		if ($(input).val()){
			hideElements.push($(input).val());
		}
	});
	chrome.storage.sync.set({
		"hideElements": hideElements,
	}, function() {
		console.log(hideElements);
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
	});

	var pinContact = $("#pin-contact").is(':checked');
	chrome.storage.sync.set({"pinContact": pinContact}, function() {
		console.log("pinContact: " + pinContact);
		if (chrome.runtime.error) {
			console.log("Runtime error.");
		}
	});
}

function restore_options() {
	chrome.storage.sync.get(["hideElements"], function(model) {
    if (model.hideElements == undefined) {
    	model.hideElements = DEFAULT_HIDE_ELEMENTS;
    }
		$.each(model.hideElements, function(i, value) {
			$(".add").before('<input type="text" class="form-control" style="margin-bottom:5px;" value="' + value + '" /><br>');
		});
	});

    chrome.storage.sync.get("pinContact", function(model) {
        $("#pin-contact").prop('checked', model.pinContact);
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
$(".save").click(function(){
	save_options();
});



$(".add").click(function(){
	$(this).before('<input type="text" class="form-control" style="margin-bottom:5px;" /><br>');
});
