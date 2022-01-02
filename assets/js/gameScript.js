var questionsMap = new Map([
    ["How many countries does China border?", ["14", "12", "13", "11"]], 
    ["What is the deepest lake in the world?", ["Lake Baikal", "Crater Lake", "Lake Superior", "Caspian Sea"]],
    ["Which one of the following South American countries is landlocked?", ["Paraguay", "Uruguay", "Equador", "Peru"]],
    ["Which one of the following European countries is double-landlocked (all of its neighbors are also landlocked)?", ["Liechtenstein", "Andorra", "Luxembourg", "Slovakia"]],
    ["What is the capital of Switzerland?", ["Bern", "Zurich", "Geneva", "Basel"]],
    ["What portion of the world's population lives in the Southern Hemisphere?", ["12%", "16%", "20%", "8%"]],
    ["Which of the following countries does NOT have penguins?", ["Madagascar", "Ecuador", "Australia", "Urugauy"]],
    ["What portion of Africa's landmass is in the northern hemisphere?", ["60-70%", "50-60%", "40-50%", "30-40%"]],
    ["Kinshasa is the capital of what African nation?", ["Democratic Republic of the Congo", "Uganda", "Tanzania", "Zimbabwe"]],
    ["Which of the following countries does NOT share a border with Russia?", ["Sweden", "Finland", "Norway", "Estonia"]],
    ["Which country is home to the northernmost point in Africa?", ["Tunisia", "Egypt", "Morocco", "Algeria"]],
    ["Which of the following countries does not contain the equator?", ["Venezuela", "Brazil", "Colombia", "Ecuador"]],
    ["What is the only country with a non-quadrilateral flag?", ["Nepal", "Lebanon", "Senegal", "Madagascar"]],
    ["Which of the following countries does NOT have coastline on both the Pacific AND Atlantic Oceans?", ["El Salvador", "Honduras", "Nicaragua", "Guatemala"]],
    ["Which capital city is closest to New Orleans?", ["Havana, Cuba", "Nassau, Bahamas", "Washington, D.C.", "Mexico City, Mexico"]],
    ["What country has the largest population in Europe (excluding Turkey)?", ["Germany", "France", "United Kingdom", "Italy"]],
    ["Russia borders all of the following seas EXCEPT _______?", ["North Sea", "Baltic Sea", "Caspian Sea", "Black Sea"]],
    ["Which city is farthest East?", ["Lima, Peru", "Quito, Ecuador", "Havana, Cuba", "Miami, USA"]],
    ["Which of the following countries does NOT control part of the SE-Asian-island Borneo?", ["Papua New Guinea", "Brunei", "Malaysia", "Indonesia"]],
    ["Dhaka is the capital of which country?", ["Bangladesh", "Nepal", "Laos", "Myanmar"]],
    ["What is the capital of Ghana?", ["Accra", "Dakar", "Lagos", "Abuja"]],
    ["What is the approximate ratio of Kangaroos:Humans in Australia?", ["2:1", "1:1", "1:2", "10:1 (but only in NT)"]]
]);

// global variables
var timer = document.getElementById("timer");
var qNumber = 1;
var question = "";
var answers = [];
var secondsLeft;
var timerInterval;
var highScores = [];

// run compare function on click of the answer buttons
for (let i = 0; i < 4; i++) {
  document.getElementById("button"+(i+1)).addEventListener("click", function() {
    compare(this.textContent);
  });
}

// checks if answer is correct
function compare(selection) {
  if (selection === answers[0]) {
    // on correct answer sets font color to green and says 'Correct!'
    document.getElementById("alert").setAttribute ("style", "color: green; opacity: 0.4");
    document.getElementById("alert").textContent = "Correct!"
    // has alert disappear after 1 second
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 1000);
  } else {
    // on wrong answer sets font color to red, says 'Nope!, and deducts 10 seconds from the timer'
    document.getElementById("alert").setAttribute ("style", "color: red; opacity: 0.6"); 
    document.getElementById("alert").textContent = "Nope!";
    secondsLeft -= 15;
    // has alert disappear after 1 second
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 1000);
  }
  // calls next question regardless
  loadQuestion();
}

function loadQuestion() {
  // end game after last q
  if (qNumber > questionsMap.size) {
    endGame();
  } else {
    // set question# and get question from map
    question = Array.from(questionsMap.keys())[qNumber-1];
    document.getElementById("qNumber").textContent = "Question #" + qNumber;
    document.getElementById("question").textContent = question;
    // get answers
    answers = questionsMap.get(question);
    // first copy answers, then shuffle choices
    var shuffledAnswers = answers.slice(0);
    shuffleArray(shuffledAnswers);
    // put choices in the buttons
    for (let i = 0; i < 4; i++) {
      document.getElementById("button"+(i+1)).textContent = shuffledAnswers[i]; 
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
    secondsLeft = time;
    timer.textContent ="Time remaining: " + secondsLeft + " seconds";
    timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent ="Time remaining: " + secondsLeft + " seconds";
      if(secondsLeft < 1) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
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
  document.getElementById("question").textContent = "Congrats, you scored " + secondsLeft + " points!";
  document.getElementById("sub-prompt").textContent = "Please enter your initials";
  document.getElementById("prompts").setAttribute("style", "text-align: center")
  // call getInitials func
  getInitials();
}

function getInitials() {
  // get main section to attach to
  var section = document.querySelector("main");
  // create label
  var label = document.createElement("label");
  section.appendChild(label);
  label.textContent = "Initials: ";
  label.setAttribute("for", initialsInput);
  // create input
  var initialsInput = document.createElement("input");
  section.appendChild(initialsInput);
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("maxlength", "3");
  // create submit button
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  submit.setAttribute("style", "margin: 10px");
  section.appendChild(submit);
  // call function for submit button actions
  submitEvent(initialsInput, submit);
}

function submitEvent(initialsInput, submit) {
  // add submit event
  submit.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = (initialsInput.value.toUpperCase());
    // Return from function early if submitted initials are blank
    if (initials === "") {
      alert("Initials can't be blank");
      return;
    }
    var newScore = [initials, secondsLeft];
    localStorage.setItem("newScore", JSON.stringify(newScore));
    window.location.href = "../html/highscores.html"
  });
}

// gets game started
loadQuestion();
setTime(600);
