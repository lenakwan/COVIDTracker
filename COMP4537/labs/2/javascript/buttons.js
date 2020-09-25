
function onClick(){
    let content = this.innerHTML;
    console.log(content + " was clicked");
    alert(content);
}
function createButton(){
    let userInput = prompt("How many buttons would you like to create?");
    while (userInput < 0 || userInput >26){
        userInput = prompt("Enter a valid input. The English Alphabet has 26 characters.");
    }
    let buttonDiv = document.getElementById("buttonDiv");
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for(i = 0; i< userInput;i++){
        if(i == alphabet.length/2){
            let spacing = document.createElement("BR"); 
            buttonDiv.appendChild(spacing);
        }
        let button = document.createElement("BUTTON");
        button.innerHTML = alphabet[i];
        button.addEventListener("click",onClick);
        buttonDiv.appendChild(button);
    }
    
}
class Recipe {
    constructor(title, serving, ingredients) {
        this.title = title;
        this.serving = serving;
        this.ingredients = ingredients;
    }
    print(){
        let recipeDiv = document.getElementById("recipes");
        let title = document.createElement("p");
        let titleText = document.createTextNode("Title : " + this.title);
        title.appendChild(titleText);
        recipeDiv.appendChild(title);
        let serving = document.createElement("p");
        let servingText = document.createTextNode("Servings: " + newRecipe.serving);
        serving.appendChild(servingText);
        recipeDiv.appendChild(serving);
        let ingredients = document.createElement("p");
        let ingredientText = document.createTextNode("Ingredients:");
        ingredients.appendChild(ingredientText);
        for(i=0;i<this.ingredients.length;i++){
            let line = document.createElement("BR");
            ingredients.appendChild(line);
            let extraText = document.createTextNode(this.ingredients[i]);
            ingredients.appendChild(extraText);
        }
        recipeDiv.appendChild(ingredients);
    }
}

// function createRecipe(){
//     console.log("Unable to add recipe, invalid parameters.");
//     newRecipe = new Recipe(title, serving, ingredients);
    
// }


createButton();

let newRecipe = new Recipe("Ramen", 1, ["noodles", "katsuoboshi", "menma", "sliced pork", "egg", "scallions"]);
newRecipe.print();
