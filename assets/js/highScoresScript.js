// var highScores = [][];
var rankings = document.getElementById("rankings");
var newScore = document.createElement("li");

function init() {
    // Get stored todos from localStorage
    var storedScores = JSON.parse(localStorage.getItem("scores"));
  
    // If todos were retrieved from localStorage, update the todos array to it
    if (storedTodos !== null) {
      highScores = storedScores;
    }
  
    // This is a helper function that will render todos to the DOM
    renderScores();
  }

// function renderScores() {

// }