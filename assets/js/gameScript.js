var questionsMap = new Map([
    ["How many countries does China border?", ["14", "12", "13", "11"]], 
    ["What is the deepest lake in the world?", ["Lake Baikal", "Crater Lake", "Lake Superior", "Caspian See"]],
    ["Which one of the following South American countries is landlocked?", ["Paraguay", "Uruguay", "Equador", "Peru"]],
    ["Which one of the following European countries is double-landlocked (all of its neighbors are also landlocked)?", ["Liechtenstein", "Andorra", "Luxembourg", "Slovakia"]],
    ["What is the capital of Switzerland?", ["Bern", "Zurich", "Geneva", "Basel"]],
    ["What portion of the world's population lives in the Southern Hemisphere?", ["12%", "16%", "20%", "8%"]],
    ["Which of the following countries does NOT have penguins?", ["Madagascar", "Ecuador", "Australia", "Urugauy"]],
    ["What portion of Africa's landmass is in the northern hemisphere?", ["60-70%", "50-60%", "40-50%", "30-40%"]]
    
]);

// global variables
var timer = document.getElementById("timer");
var qNumber = 1;
console.log(qNumber);
var question = "";
var answers = [];
var secondsLeft;
var timerInterval;

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
    // has alert fade after .6 seconds
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 750);
  } else {
    // on wrong answer sets font color to red, says 'Nope!, and deducts 10 seconds from the timer'
    document.getElementById("alert").setAttribute ("style", "color: red; opacity: 0.6"); 
    document.getElementById("alert").textContent = "Nope!";
    secondsLeft -= 10;
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 750);
  }
  // calls next question regardless
  loadQuestion();
}

// durstendfeld shuffle from stack
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function loadQuestion() {
  // end game after last q
  if (qNumber > questionsMap.size) {
    endGame();
  } else {
    // set question and number
    question = Array.from(questionsMap.keys())[qNumber-1];
    document.getElementById("qNumber").textContent = "Question #" + qNumber;
    document.getElementById("question").textContent = question;
    qNumber++;
    // get answers
    answers = questionsMap.get(question);
    console.log(answers);
    // shuffle choices
    var shuffledAnswers = answers.slice(0);
    shuffleArray(shuffledAnswers);
    // put choices in the buttons
    for (let i = 0; i < 4; i++) {
      document.getElementById("button"+(i+1)).textContent = shuffledAnswers[i]; 
    }
  }
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
  // clears questions, buttons, and timer
  document.getElementById("choices").remove();
  document.getElementById("timer").remove();
  clearInterval(timerInterval);
  document.getElementById("qNumber").textContent = "";
  // posts centered endgame message and ask for initials
  document.getElementById("question").textContent = "Congrats, you scored " + secondsLeft + " points!";
  document.getElementById("sub-prompt").textContent = "Please enter your initials";
  document.getElementById("prompts").setAttribute("style", "text-align: center")
  // call getInitials funct
  getInitials();
}

function getInitials() {
  // get main section to attach to
  var section = document.querySelector("main");
  // create label
  var label = document.createElement("label");
  section.appendChild(label);
  label.textContent = "Initials: ";
  label.setAttribute("for", intialsInput);
  // create input
  var intialsInput = document.createElement("input");
  section.appendChild(intialsInput);
  intialsInput.setAttribute("type", "text");
  // create submit button
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit");
  submit.setAttribute("style", "margin: 10px");
  section.appendChild(submit);
}


console.log(qNumber);
loadQuestion();
setTime(120);
