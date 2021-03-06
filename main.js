
var nline = 1;

window.addEventListener("load", function() {
	$("#btnScramble").click(function() {
		scrambleTeams()
	})
	$("#newline").click(function() {
		$("#nicksemi").css("display", "none");
		$("#nicklist").css("display", "block");
		nline = 1;
		// grabFromOtherInputMethod("#nicksemi", "#nicklist");
	})
	$("#semi").click(function() {
		nline = 0;
		$("#nicksemi").css("display", "block");
		$("#nicklist").css("display", "none");
		// grabFromOtherInputMethod("#nicklist", "#nicksemi");
	});


	addChangeListener("#nicklist", "\n");
	addChangeListener("#nicksemi", ";");	

})

function grabFromOtherInputMethod(old, newBox) {
	oldValue = $(old).val()
	separator = "";
	if (oldValue.includes(";")) {
		nicks = $(old).val().split(";").filter(Boolean);
		separator = "\n";
	} else {
		nicks = $(old).val().split("\n").filter(Boolean);
		separator = ";";
	}
	newValue = "";
	nicks.forEach(function(item, index) {
		newValue += item + separator;
	})
	$(newBox).val(newValue);
}

function addChangeListener(inputField, splitChar) {
	$(inputField).keyup(function(){
		updateNumberNicks(inputField, splitChar)
	});

	$(inputField).keyup(function(){
		updateNumberNicks(inputField, splitChar)
	});

	$(inputField).change(function(){
		updateNumberNicks(inputField, splitChar)
	});
}

function updateNumberNicks(inputField, splitChar) {
	let lines = $(inputField).val().split(splitChar).filter(Boolean).length
	even = (lines % 2);
	color = (even ? "red" : "green");
	$("#numberofnicks").text("Number of players: " + lines);
	$("#numberofnicks").css("color", color);
}

function scrambleTeams() {
	let nicks;
	if (nline) {
		nicks = $("#nicklist").val().split("\n").filter(Boolean);
	} else {
		nicks = $("#nicksemi").val().split(";").filter(Boolean);
	}
	nicks = shuffleArray(nicks)
	if (nicks.length % 2) {
		alert("Uneven number of players");
	} else {
		half = nicks.length / 2;
		var team1 = [];
		var team2 = [];
		for(var i = 0; i < nicks.length; i++) {
			if (i < half) {
				team1.push(nicks[i]);
			} else {
				team2.push(nicks[i]);
			}
		}
	}
	printTeam(team1, "#listTeam1");
	printTeam(team2, "#listTeam2");
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* https://stackoverflow.com/a/12646864 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function printTeam(array, dom) {
	$(dom).empty();
	array.forEach(function(item, index) {
		$(dom).append('<li>' + item + '</li>');
	});
}


