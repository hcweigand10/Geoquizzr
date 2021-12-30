var questionsMap = new Map([
    ["How many countries does China border?", ["14", "12", "13", "11"]], 
    ["What is the deepest lake in the world?", ["Lake Baikal", "Crater Lake", "Lake Superior", "Caspian See"]],
    ["Which one of the following South American countries is landlocked", ["Paraguay", "Uruguay", "Equador", "Peru"]],
    ["Which one of the following European countries is double-landlocked (all of its neighbors are also landlocked)?", ["Liechtenstein", "Andorra", "Luxembourg", "Slovakia"]],
    ["What is the capital of Switzerland?", ["Bern", "Zurich", "Geneva", "Basel"]],
    ["What portion of the world's population lives in the Southern Hemisphere?", ["12%", "16%", "20%", "8%"]],
    ["Which of the following countries does NOT have penguins?", ["Madagascar", "Ecuador", "Australia", "Urugauy"]],
    ["What portion of Africa's landmass is in the northern hemisphere?", ["60-70%", "50-60%", "40-50%", "30-40%"]]
    
]);

var timer = document.getElementById("timer");
var qNumber = 1;
console.log(qNumber);
var question = "";
var answers = [];
var secondsLeft;
var timerInterval;

document.getElementById("button1").addEventListener("click", function() {
  compare(this.textContent);
  }
);

document.getElementById("button2").addEventListener("click", function() {
  compare(this.textContent);
  }
);

document.getElementById("button3").addEventListener("click", function() {
  compare(this.textContent);
  }
);

document.getElementById("button4").addEventListener("click", function() {
  compare(this.textContent);
  }
);

console.log(qNumber);

function alert() {
  setTimeout(() => {
    
  }, 3000);
  document.getElementById("alert").setAttribute ("style", "color: green");
  document.getElementById("alert").textContent = "Correct!"
}


function compare(selection) {
  if (selection === answers[0]) {
    // on correct answer sets font color to green and says 'Correct!'
    document.getElementById("alert").setAttribute ("style", "color: green; opacity: 0.4");
    document.getElementById("alert").textContent = "Correct!"
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 1500);
  } else {
    // on wrong answer sets font color to red, says 'Nope!, and deducts 10 seconds from the timer'
    document.getElementById("alert").setAttribute ("style", "color: red; opacity: 0.6"); 
    document.getElementById("alert").textContent = "Nope!";
    secondsLeft -= 10;
    setTimeout(() => { 
      document.getElementById("alert").textContent = "";
    }, 1500);
  }
  // calls next question regardless
  loadQuestion();
}

function loadQuestion() {
  if (qNumber == 9) {
    endGame();
  } else {
    question = Array.from(questionsMap.keys())[qNumber-1];
    answers = questionsMap.get(question);
    document.getElementById("qNumber").textContent = "Question #" + qNumber;
    document.getElementById("question").textContent = question;
    qNumber++;
    for (let i = 0; i < 4; i++) {
      document.getElementById("button"+(i+1)).textContent = answers[i]; 
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
  // clears questions and buttons
  document.getElementById("qNumber").textContent = "";
  document.getElementById("question").textContent = "Congrats, you scored " + secondsLeft + " points!";
  document.getElementById("sub-prompt").textContent = "Please enter your initials";
  document.getElementById("choices").remove();
  document.getElementById("timer").remove();
  clearInterval(timerInterval);
  getInitials();
}

function getInitials() {
  var section = document.querySelector("main")
  var label = document.createElement("label");
  section.appendChild(label);
  label.textContent = "Initials";
  label.setAttribute("for", intialsInput);
  var intialsInput = document.createElement("input");
  section.appendChild(intialsInput);
  intialsInput.setAttribute("type", "text");
  intialsInput.setAttribute("value", "ABC");
}


console.log(qNumber);
loadQuestion();
setTime(120);
