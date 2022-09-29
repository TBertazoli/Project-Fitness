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

//function to populate plan
function populatePlan() {
    $('#showplan').empty();
    for (var i = 0; i < storageData.length; i++) {
        var mealPlan = storageData[i];
        var createElement = $(`<tr><td class="meal-col">${mealPlan.mealName}</td><td class="date-col">${mealPlan.date}</td><td><button type="button" onclick='showHideIngredients(true, ${i})'>Add ingredient</button></td></tr>`);
        $('#showplan').append(createElement);
    }

}

function showHideIngredients(show, index) {
    mealPlanIndex = index;
    if (show) {
        $('#ingredientsdropdown').removeClass("hidden");
    } else {
        // nutritionDiary.val('');
        $("#ingredientsdropdown").addClass("hidden");
    }
}

//function to get food by dropdown list
var searchIngredient = function () {
    var ingredientApi = 'https://api.edamam.com/auto-complete?app_id=294206ac&app_key=606e20749d19a1f0dde25fdc1f566b52&q=' + inputText.val();
    fetch(ingredientApi).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            $("#searchforingredients").empty();
            inputText.val('');
            data.forEach(item => {
                var createElement = $(`<li><button onclick='addIngredientToMealPlan("${item}")'>${item}</button></li>`);
                $('#searchforingredients').append(createElement);
            });
        });
    });
}

//function to add ingredient to meal plan
function addIngredientToMealPlan(item) {
    storageData[mealPlanIndex].ingredients = storageData[mealPlanIndex].ingredients || [];
    storageData[mealPlanIndex].ingredients.push(item);
    localStorage.setItem("nutrition", JSON.stringify(storageData));
    $("#searchforingredients").empty();
}