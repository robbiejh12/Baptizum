console.log("version 5");
var csvlist = "";
var songarray = [];
var played = [];
var audio;

$(document).ready(function(){
	
	audio = $("#player");
	
	$("#checkbox-play").click(function(){
		hideTab("checkbox");
		buildPlaylist();
	});
	
	$("#player-return").click(function(){
		hideTab("player");
		clearPlaylist();
	});
	
	$("#player-play").click(function(){
		audio[0].pause();
		var number = 0;
		var len = songarray.length;
		do {
			number = Math.floor((Math.random() * len));
		}
		while (played.includes(number));
		played.push(number);
		loadTrack(songarray[number]);
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
	var files = [];
	for (i=0;i<rpms.length;i++) {
		if (rpms[i].checked) {
			var file = rpms[i].id + '.csv';
			files.push(file);
		}
	}
	var testF = ["test.csv"];
	loadFiles(files);
}

function loadFiles(files) {
	for (i=0;i<files.length;i++) {
		var myurl = files[i];
		console.log(myurl);
		$.get(myurl, function(data) {
			songarray += $.csv.toObjects(data)
		});
	}
}

function loadTrack(track) {
	$("#player-audio").attr("src", track.url);
	audio[0].load();
	audio[0].play();
	$("#now-playing").html(track.artist + " - " + track.title);
}