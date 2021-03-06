var audio;
var source;

var playList = [];
var playIndex = 0;
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
			randomiseList();
		}
		else {
			source.play();
		}
		changeButton("pause");
	});

	$("#player-pause").click(function(){
		source.pause();
		changeButton("play");
	});

	$("#player-back").click(function(){
		if (playIndex == 0) {
			playIndex = (playList.length);
		}
		playIndex--;
		playTrack();
	});

	$("#player-next").click(function(){
		playIndex++;
		if (playIndex == playList.length) {
			playIndex = 0;
		}
		playTrack();
	});

	$("#player-stop").click(function(){
		source.pause();
		changeButton("play");
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
	playList = [];
	playIndex = 0;
	started = false;
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
			playList = playList.concat($.csv.toObjects(data));
		});
	}
}

function randomiseList() {
	var tempList = [];
	while (playList.length>0) {
		var rand = Math.floor(Math.random() * playList.length);
		tempList = tempList.concat(playList.splice(rand,1));
	}
	playList = tempList;
	playTrack();
}

function playTrack() {
	var track = playList[playIndex];
	console.log(track);
	audio.attr("src", track.Url);
	audio.on();
	source.play();
	$("#now-playing").html(track.Artist + " - " + track.Title);
	audio.on("ended", function(){
    		playIndex++;
		console.log('ended');
	});
}
