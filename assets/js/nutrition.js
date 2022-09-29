$(document).ready(() => {
    readFromStorage();
    populatePlan();
});


var planInput = $("#mealname");
var dateInput = $("#time");
var apiKey = "606e20749d19a1f0dde25fdc1f566b52";
var inputText = $("#ingredientlist");
var storageData = null;
var mealPlanIndex = 0;
var searchForIngredients = $("#searchforingredients")


inputText.keyup(function () {
    searchIngredient();
})

//function to showhide nutrition plan modal
function showHidePlan(show) {
    if (show) {
        $("#addnutritionplanmodal").removeClass("hidden");
    } else {
        planInput.val('');
        $("#addnutritionplanmodal").addClass("hidden");
    }
}

//function to save new plan
function submitNewPlan() {
    storageData = storageData || [];
    storageData.unshift({
        mealName: planInput.val(),
        date: dateInput.val()
    });
    localStorage.setItem("nutrition", JSON.stringify(storageData));
    populatePlan();
    showHidePlan(false);
}

// function to read from storage
function readFromStorage() {
    storageData = JSON.parse(localStorage.getItem("nutrition")) || [];
}

//function to populate plan and ingredients
function populatePlan() {
    $('#showplan').empty();
    console.log(storageData)
    for (var i = 0; i < storageData.length; i++) {
        var mealPlan = storageData[i];
        var createElement = $(`<tr class="populate-plan">
        <td>
        <div class="meal-name">${mealPlan.mealName}</div>
        <div>${mealPlan.date}</div>
        <div><button type="button" class="w-full rounded-md border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-4 sm:w-auto sm:text-sm"" onclick='showHideIngredients(true, ${i})'>Add ingredient</button></div>
        </td>
        <td>${(mealPlan.ingredients || []).join(', ')}</td>
        </tr>`);
        $('#showplan').append(createElement);
    }
}

function showHideIngredients(show, index) {
    mealPlanIndex = index;
    if (show) {
        $('#ingredientsdropdown').removeClass("hidden");
    } else {
        searchForIngredients.val('');
        $("#ingredientsdropdown").addClass("hidden");
    }
}

//function to get food by dropdown list
var searchIngredient = function () {
    var ingredientApi = 'https://api.edamam.com/auto-complete?app_id=294206ac&app_key=606e20749d19a1f0dde25fdc1f566b52&q=' + inputText.val();
    fetch(ingredientApi).then(function (response) {
        response.json().then(function (data) {           
            searchForIngredients.empty();            
            data.forEach(item => {
                var createElement = $(`<li><button onclick='addIngredientToMealPlan("${item}")'>${item}</button></li>`);
                searchForIngredients.append(createElement);
            });
        });
    });
}

//function to add ingredient to meal plan
function addIngredientToMealPlan(item) {
    inputText.val('');
    storageData[mealPlanIndex].ingredients = storageData[mealPlanIndex].ingredients || [];
    storageData[mealPlanIndex].ingredients.push(item);
    localStorage.setItem("nutrition", JSON.stringify(storageData));
    searchForIngredients.empty();
    populatePlan();
}

