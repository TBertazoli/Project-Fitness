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

