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

