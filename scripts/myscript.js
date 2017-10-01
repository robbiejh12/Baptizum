console.log("version 1");
var csvlist = "";
var songarray = [];
var played = [];

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
		var number = 0;
		var len = songarray.length;
		do {
			number = Math.floor((Math.random() * len));
		}
		while (played.includes(number));
		console.log(number);
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
	played = [];
}

function buildPlaylist() {
	var rpms = document.getElementsByClassName("rpm");
	for (i=0;i<rpms.length;i++) {
		if (rpms[i].checked) {
			loadDoc(rpms[i].id);
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
}