var myArray = [];
var myOne = {artist:"artA", track:"trackA", url:"http://bap-tizum.com/sites/default/files/audio/Another_Soldier_Gone.mp3"};
var myTwo = {artist:"artB", track:"trackB", url:"http://bap-tizum.com/sites/default/files/audio/Anyway_You_Bless_Me_Lord.mp3"};
var myThree = {artist:"artC", track:"trackC", url:"http://bap-tizum.com/sites/default/files/audio/Babylons_Fallen.mp3"};

myArray.push(myOne, myTwo, myThree);

$(document).ready(function(){
	
	var audio = $("#audio");
	
	$("#press").click(function(){
		var n = Math.floor(Math.random() * 3);
		var x = myArray[n];
		testFunc(x);
	});
	
	function testFunc(x){
		audio.attr('src', x.url);
		audio.load();
		//audio.play();
	};

})