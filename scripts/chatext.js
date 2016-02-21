(function () {
	// mark all as read
	// add a button
	$(".sideContentMenu").append("<div id=\"_markButton\" role=\"button\" class=\"sideTitleBtn _button btnLarge _cwBN button\" style=\"right: 80px;\"><span class=\"_sideContentTitleText\">M</span> </div>");

	$("#_markButton").click(function(){
		if(!confirm('本当に全部を既読してよろしいですか？')){
			return false;
		}else{
			/*　OKの時の処理 */
			// find all unread rooms
			var unread_rooms = [];
			$.each(RL.rooms, function(index, room){
				if (room.getUnreadNum() > 0){
					unread_rooms.push(room);
				}
			});
			$.each(unread_rooms, function(index, room){
				CW.get("gateway.php", {
					cmd: "read",
					room_id: room.id,
					mid: room.mid,
					last_chat_id: room.getViewStat().last_read_id,
				});
			});
		}
	});
}());
