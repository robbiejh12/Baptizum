var csvlist = "";
var songarray = [];

$(document).ready(function(){
	
	$("#checkbox-play").click(function(){
		hideTab("checkbox");
		buildPlaylist();
	});
	
	$("#player-return").click(function(){
		hideTab("player");
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
		clearPlaylist();
	}
}

function buildPlaylist() {
	var checkboxes = document.getElementsByTagName("checkbox");
	for (i=0;i<checkboxes.length;i++) {
		if (checkboxes[i].checked) {
			loadDoc(checkboxes[i].id);
		}
	}
	csvListToObjects();
}

function loadDoc(doc) {
	var doc = doc + ".csv"
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			csvlist += this.responseText;
		}
	};
	xhttp.open("GET", doc, true);
	xhttp.send();
}

function csvListToObjects() {
		var input = csvlist;
		var songarray = $.csv.toObjects(input);
		console.log(songarray);
    }