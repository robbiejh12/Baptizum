console.log("version 1");
var csvlist = "";
var songarray = [];

$(document).ready(function(){
	
	$("#checkbox-play").click(function(){
		hideTab("checkbox");
		buildPlaylist();
	});
	
	$("#player-return").click(function(){
		hideTab("player");
		clearPlaylist();
	});
	
	$("#player-play").click(function(){
		
	});
	
	$("#player-back").click(function(){
		
	});
	
	$("#player-next").click(function(){
		
	});
	
	$("#player-stop").click(function(){
		
	});
	
});

function hideTab(x) {
	if (x == "checkbox") {
		$("#player-tab").removeClass("hidden").addClass("visible");
		$("#checkbox-tab").removeClass("visible").addClass("hidden");
	}
	else if (x == "player") {
		$("#checkbox-tab").removeClass("hidden").addClass("visible");
		$("#player-tab").removeClass("visible").addClass("hidden");
	}
}

function clearPlaylist() {
	songarray = [];
	console.log(songarray);
}

function buildPlaylist() {
	var checkboxes = document.getElementsByTagName("checkbox");
	for (i=0;i<checkboxes.length;i++) {
		console.log(checkboxes[i].id);
		if (checkboxes[i].checked) {
			loadDoc(checkboxes[i].id);
		}
	}
}

function loadDoc(doc) {
	var doc = doc + ".csv"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
			pushToArray(response);
		}
	};
	xhttp.open("GET", doc, true);
	xhttp.send();
}

function pushToArray(input) {
	var songs = $.csv.toObjects(input);
	songarray += songs;
	console.log(songarray);
}