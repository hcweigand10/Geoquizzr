var highScores = [];
var storedScores = [];
var rankings = document.getElementById("rankings");
var clear = document.getElementById("clear");

// called on page load
function init() {
    // Check for stored scores from localStorage, retrieve if not null
    if (localStorage.getItem("highScores") !== null) {
        highScores = JSON.parse(localStorage.getItem("highScores"));
    } 
    // check for newest score, should be null if coming straight from home page
    var newScore = JSON.parse(localStorage.getItem("newScore"));
    if (newScore !== null) {
        // add new score
        highScores.push(newScore);
    }
    // update highscores in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // call renderscores to actually create rankings list
    renderScores(newScore);
}

function renderScores(newScore) {
    // sort array by second element from stackoverflow
    highScores.sort(function(a,b) {
        return b[1] - a[1];
    })
    // add each score to rankings
    for (var i = 0; i < highScores.length; i++) {
        var score = highScores[i];
        var li = document.createElement("li");
        li.textContent = "  " + score[0];
        // custom IDs to style top 3
        li.id = "li" + i;
        // make newest score bold so user can immediately see how they compare
        if (score == newScore) {
            li.setAttribute("style", "font-weight: bold");
        }
        // insert score with a span tag to float right
        var span = document.createElement("span");
        span.setAttribute("class", "span");
        span.textContent = score[1];
        // unique class for every other li for styling
        if (i % 2 == 0) {
            li.setAttribute("class", "evenLI");
        }
        rankings.appendChild(li);
        li.appendChild(span);
      }
    // remove new score to make room for next game
    localStorage.removeItem("newScore");

}

clear.addEventListener("click", function() {
    // clear everything
    rankings.innerHTML = "";
    localStorage.removeItem("highScores");
})

init();