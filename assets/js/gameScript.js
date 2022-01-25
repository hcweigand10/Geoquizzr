var questionsMap = new Map([
  ["How many countries does China border?", ["14", "11", "8", "6"]],
  [
    "What is the deepest lake in the world?",
    ["Lake Baikal", "Crater Lake", "Lake Superior", "Caspian Sea"],
  ],
  [
    "Which one of the following South American countries is landlocked?",
    ["Paraguay", "Uruguay", "Ecuador", "Peru"],
  ],
  [
    "Which one of the following European countries is double-landlocked (all of its neighbors are also landlocked)?",
    ["Liechtenstein", "Andorra", "Luxembourg", "Slovakia"],
  ],
  [
    "What is the capital of Switzerland?",
    ["Bern", "Zurich", "Geneva", "Basel"],
  ],
  [
    "What portion of the world's population lives in the Southern Hemisphere?",
    ["12%", "16%", "20%", "8%"],
  ],
  [
    "Which of the following countries does NOT have penguins?",
    ["Madagascar", "Ecuador", "Australia", "Urugauy"],
  ],
  [
    "What portion of Africa's landmass is in the northern hemisphere?",
    ["60-70%", "50-60%", "40-50%", "30-40%"],
  ],
  [
    "Kinshasa is the capital of what African nation?",
    ["Democratic Republic of the Congo", "Uganda", "Tanzania", "Zimbabwe"],
  ],
  [
    "Which of the following countries does NOT share a border with Russia?",
    ["Sweden", "Finland", "Norway", "Estonia"],
  ],
  [
    "Which country is home to the northernmost point in Africa?",
    ["Tunisia", "Egypt", "Morocco", "Algeria"],
  ],
  [
    "Which of the following countries does not contain the equator?",
    ["Venezuela", "Brazil", "Colombia", "Ecuador"],
  ],
  [
    "What is the only country with a non-quadrilateral flag?",
    ["Nepal", "Lebanon", "Senegal", "Madagascar"],
  ],
  [
    "Which of the following countries does NOT have coastline on both the Pacific AND Atlantic Oceans?",
    ["El Salvador", "Honduras", "Nicaragua", "Guatemala"],
  ],
  [
    "Which capital city is closest to New Orleans?",
    [
      "Havana, Cuba",
      "Nassau, Bahamas",
      "Washington, D.C.",
      "Mexico City, Mexico",
    ],
  ],
  [
    "What country has the largest population in Europe (excluding Turkey)?",
    ["Germany", "France", "United Kingdom", "Italy"],
  ],
  [
    "Russia borders all of the following seas EXCEPT _______?",
    ["North Sea", "Baltic Sea", "Caspian Sea", "Black Sea"],
  ],
  [
    "Which city is farthest East?",
    ["Lima, Peru", "Quito, Ecuador", "Havana, Cuba", "Miami, USA"],
  ],
  [
    "Which of the following countries does NOT control part of the SE-Asian-island Borneo?",
    ["Papua New Guinea", "Brunei", "Malaysia", "Indonesia"],
  ],
  [
    "Dhaka is the capital of which country?",
    ["Bangladesh", "Nepal", "Laos", "Myanmar"],
  ],
  ["What is the capital of Ghana?", ["Accra", "Dakar", "Lagos", "Abuja"]],
  [
    "What is the approximate ratio of Kangaroos:Humans in Australia?",
    ["2:1", "1:1", "1:2", "10:1 (but only in NT)"],
  ],
]);

// global variables
var timer = document.getElementById("timer");
var qNumber = 1;
var question = "";
var answers = [];
var secondsLeft;
var timerInterval;
var highScores = [];
var totalQuestions = questionsMap.size;
let score;

// run compare function on click of the answer buttons
for (let i = 0; i < 4; i++) {
  document
    .getElementById("button" + (i + 1))
    .addEventListener("click", function () {
      compare(this);
    });
}

// checks if answer is correct
function compare(selection) {
  if (selection.textContent === answers[0]) {
    // on correct answer change button color to light green and increment score
    console.log(selection);
    selection.setAttribute("style", "background-color: lightgreen");
    score++;
    // revert after 1 second
    setTimeout(() => {
      selection.setAttribute("style", "background-color: --var(dark)");
    }, 1000);
  } else {
    // on wrong answer set button color to red and display correct answer below
    selection.setAttribute("style", "background-color: red");
    document.getElementById("alert").textContent = `(Answer: ${answers[0]})`
    // revert after 1 second
    setTimeout(() => {
      selection.setAttribute("style", "background-color: --var(dark)");
      document.getElementById("alert").textContent = "";
    }, 1000);
  }
  // calls next question regardless
  setTimeout(() => {
    loadQuestion();
  }, 1000);
}

function loadQuestion() {
  // end game after last q
  if (qNumber > questionsMap.size) {
    endGame();
  } else {
    // set question# and get question from map
    question = Array.from(questionsMap.keys())[qNumber - 1];
    document.getElementById("qNumber").textContent =
      "Question #" + qNumber + " out of " + totalQuestions;
    document.getElementById("question").textContent = question;
    // get answers
    answers = questionsMap.get(question);
    // first copy answers, then shuffle choices
    var shuffledAnswers = answers.slice(0);
    shuffleArray(shuffledAnswers);
    // put choices in the buttons
    for (let i = 0; i < 4; i++) {
      document.getElementById("button" + (i + 1)).textContent =
        shuffledAnswers[i];
    }
    // tick qNumber
    qNumber++;
  }
}

// durstendfeld shuffle from stackoverflow
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function setTime(time) {
  // Sets interval in variable
  score = 0;
  secondsLeft = time;
  timer.textContent = "Time remaining: " + secondsLeft + " seconds";
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = "Time remaining: " + secondsLeft + " seconds";
    if (secondsLeft < 1) {
      // Calls for endgame function to run when timer runs out
      endGame();
    }
  }, 1000);
}

function endGame() {
  // set any negative score to zero
  if (secondsLeft < 0) {
    secondsLeft = 0;
  }
  // clears questions, buttons, and timer
  document.getElementById("choices").remove();
  document.getElementById("timer").remove();
  clearInterval(timerInterval);
  document.getElementById("qNumber").textContent = "";
  // posts centered endgame message and ask for initials
  document.getElementById("question").textContent =
    "Congrats, you scored " + score + " points!";
  document.getElementById("sub-prompt").textContent =
    "Please enter your initials";
  document
    .getElementById("prompts")
    .setAttribute("style", "text-align: center");
  // call getInitials func
  getInitials();
}

function getInitials() {
  // get main section to attach to
  var section = document.querySelector("main");
  // create form and append to main
  var form = document.createElement("form");
  form.id = "form";
  section.appendChild(form);
  // create label
  var label = document.createElement("label");
  form.appendChild(label);
  label.textContent = "Initials: ";
  label.setAttribute("for", initialsInput);
  // create input
  var initialsInput = document.createElement("input");
  form.appendChild(initialsInput);
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("maxlength", "3");
  // create submit button
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  submit.setAttribute("style", "margin: 10px");
  form.appendChild(submit);
  // call function for submit actions
  submitEvent(initialsInput, form);
}

function submitEvent(initialsInput, form) {
  // add submit event
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var initials = initialsInput.value.toUpperCase();
    // Return from function early if submitted initials are blank
    if (initials === "") {
      alert("Initials can't be blank");
      return;
    }
    var newScore = [initials, score];
    localStorage.setItem("newScore", JSON.stringify(newScore));
    window.location.href = "../html/highscores.html";
  });
}

// gets game started
loadQuestion();
setTime(600);
