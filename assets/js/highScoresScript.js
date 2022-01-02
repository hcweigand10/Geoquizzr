var highScores = [];
var storedScores = [];
var rankings = document.getElementById("rankings");
var newScore = document.createElement("li");
var clear = document.getElementById("clear");

function init() {
    // Check for stored scores from localStorage, retrieve if not null
    console.log("retrieved: " + localStorage.getItem("highScores"));
    if (localStorage.getItem("highScores") !== null) {
        highScores = JSON.parse(localStorage.getItem("highScores"));
    } 
    console.log("Before check for new score: " + highScores)
    // check for newest score, should be null if coming straight from home page
    var newScore = JSON.parse(localStorage.getItem("newScore"));
    if (newScore !== null) {
        // add new score
        highScores.push(newScore);
        localStorage.removeItem("newScore");
        console.log("newScore detected")
    }
    console.log("After check: " + highScores);
    // update highscores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // This is a helper function that will render scores to the DOM
    renderScores();
}

function renderScores() {
    // sort array from stackoverflow
    highScores.sort(function(a,b) {
        return b[1] - a[1];
    })
    console.log(highScores);
    for (var i = 0; i < highScores.length; i++) {
        var score = highScores[i];
        var li = document.createElement("li");
        li.textContent = score;
        rankings.appendChild(li);
      }
}

clear.addEventListener("click", function() {
    rankings.innerHTML = "";
    localStorage.removeItem("highScores");
})

init();