var requestUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"


function apiCall() {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        document.getElementById('cocktail').textContent = data.drinks[0].strDrink;
        var ing = Object.keys(data.drinks[0]) 
        console.log(ing);
        for (let i = 1; i < 16; i++) {
            var ingredient = data.drinks[0][`strIngredient${i}`] 
            var amount = data.drinks[0][`strMeasure${i}`] 
            console.log(ingredient)
            if (ingredient == null) {
                return false;
            }
            var newLi = document.createElement("li")
            newLi.textContent = amount + " " + ingredient;
            var list = document.getElementById("ingredients")
            list.appendChild(newLi)
        }
      });
}

apiCall();
var staffPicks = [
    861345, // Free guy
    105864, // The good dinosaur
    10637, // Remember the Titans
    102899, // Ant Man
    926, // Galaxy Quest
    264660, // Ex Machina
    318846, // The Big Short
    157336,  // interstellar
    18240, // The proposal
    134375, // Home Alone
    324857, // Spiderman, spiderverse
    9806, // Incredibles
    129, // Spirited Away
    98566, // TMNT
    546554, // Knives Out
    2493,  // Princess Bride
    314365, // Spotlight
    60308, // Moneyball
    530385 // MidSommar
]

var randomMovie = function() {
    console.log("test")
    let movieId = staffPicks[Math.floor(Math.random()*20)]
    console.log(movieId);
    console.log(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=734711869501c48d5ea1cb162098c006&language=en-US`)
    .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("movieObject");
            window.location.assign("./Assets/html/info.html")
        })
}

// event listener for randomizer
let randomizer = $("#randomizer")
console.log(randomizer)
$('#randomizer').click(randomMovie);

function loadInfo(){
    console.log('hi');

    
}

listCont.click(function (event) {  
    console.log("test")
    console.log(event.target)
})