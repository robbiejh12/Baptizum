console.log("version 1");
var csvlist = "";
var trackList = [];
var played = [];
var audio;

$(document).ready(function(){
	
	//define audio element
	audio = $("#player");
	
	//show/hide tabs
	$("#checkbox-play").click(function(){
		buildPlaylist();
		changeTab("player");
	});
	
	$("#player-return").click(function(){
		changeTab("checkbox");
		clearPlaylist();
	});
	
	//player controls
	$("#player-play").click(function(){
		if (audio.isPlaying) {audio.pause()};
		loadTrack();
	});
	
	$("#player-back").click(function(){
		
	});
	
	$("#player-next").click(function(){
		
	});
	
	$("#player-stop").click(function(){
		
	});
	
});

function changeTab(x) {
	if (x == "player") {
		$("#player-tab").removeClass("hidden").addClass("visible");
		$("#checkbox-tab").removeClass("visible").addClass("hidden");
	}
	else if (x == "checkbox") {
		$("#checkbox-tab").removeClass("hidden").addClass("visible");
		$("#player-tab").removeClass("visible").addClass("hidden");
	}
}

function clearPlaylist() {
	trackList = [];
	played = [];
}

function buildPlaylist() {
	clearPlaylist();
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
		$.get(myurl, function(data) {
			trackList.push($.csv.toObjects(data));
		});
	}
}

function loadTrack() {
	var number = 0;
	var len = trackList.length;
	do {
		number = Math.floor((Math.random() * len));
	}
	while (played.includes(number));
	
	played.push(number);
	var track = trackList[number];
	playTrack(track);
}

function playTrack(track) {
	console.log(track);
	$("#player").attr("src", track.url);
	audio.load();
	audio.play();
	$("#now-playing").html(track.artist + " - " + track.title);
}

function isPlaying(audioelem) {
	return !audioelem.paused;
}