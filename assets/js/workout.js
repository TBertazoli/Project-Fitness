$(document).ready(() => {
    displayExercise();
});

//global variable
var exerciseAPI = "https://wger.de/api/v2/exercise/?language=2";
var exerciseDescription = $("#description");
var results = [];
// function to list the exercises
var displayExercise = function () {
    fetch(exerciseAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            results = data.results;
            for (i = 0; i < data.results.length; i++) {                
                var createElement = $(`<div class="workout-style">
                <h2 class="workout" style="cursor: pointer;" onclick='showDescription(${i})'>${data.results[i].name}</h2></div>`);                
                $("#exercise").append(createElement);                
            }
        });
    });
}


function showHideDescription(show) {
    if (show) {
        $("#exercisedescription").removeClass("hidden");
    } else {
        $("#exercisedescription").addClass("hidden");
    };
}


// function to display exercise description
function showDescription(index) {
    exerciseDescription.empty();
    var createElement = $(`<p>${results[index].description}</p>`)
    exerciseDescription.append(createElement);    
    showHideDescription(true);
}



//function to add exercise
// function addExercise() {
//     var createElement = $()
// }