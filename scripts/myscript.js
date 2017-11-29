console.log("version 1");
var csvlist = "";
var trackList = [];
var played = [];
var audio;
var source;
var started = false;

$(document).ready(function(){
	
	//define audio & source elements
	audio = $("#player");
	source = audio[0];
	
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
		if (!started) {
			loadTrack();
			changeButton("pause");
		}
		else {
			source.play();
		}
	});
	
	$("#player-pause").click(function(){
		source.pause();
		changeButton("play");
	});
	
	$("#player-back").click(function(){
		var prev = played.pop();
		playTrack(prev);
	});
	
	$("#player-next").click(function(){
		loadTrack();
	});
	
	$("#player-stop").click(function(){
		if (audio.isPlaying) {source.pause()};
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

function changeButton(x) {
	if (x == "play") {
		$("#player-play").removeClass("hidden").addClass("visible");
		$("#player-pause").removeClass("visible").addClass("hidden");
	}
	else if (x == "pause") {
		$("#player-pause").removeClass("hidden").addClass("visible");
		$("#player-play").removeClass("visible").addClass("hidden");
	}
}

function clearPlaylist() {
	trackList = [];
	played = [];
	started = false;
	csvlist = "";
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
	
	loadFiles(files);
}

function loadFiles(files) {
	for (i=0;i<files.length;i++) {
		var myurl = files[i];
		$.get(myurl, function(data) {
			trackList.concat($.csv.toObjects(data));
		});
	}
}

function loadTrack() {
	started = true;
	var number;
	var len = trackList.length;
	do {
		number = Math.floor((Math.random() * len));
	}
	while (played.includes(number));
	
	console.log(number);
	played.push(number);
	var track = trackList[number];
	playTrack(track);
}

function playTrack(track) {
	console.log(track);
	$("#player").attr("src", track.Url);
	audio.on();
	source.play();
	$("#now-playing").html(track.Artist + " - " + track.Title);
	$("#player").on("ended", function(){
    		loadTrack();
	});
}

function isPlaying(audioelem) {
	return !audioelem.paused;
}
