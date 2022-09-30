$(document).ready(() => {
    displayExercise();
});

//global variable
var exerciseAPI = "https://wger.de/api/v2/exercise/?language=2";
var exerciseDescription = $("#description");

// gives the list of exercises
var displayExercise = function () {
    fetch(exerciseAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (i = 0; i < data.results.length; i++) {
                var createElement = $(`<div><h2 class="workout" style="cursor: pointer;">${data.results[i].name}</h2>
                <button class="btn" onclick="addExercise()">Add</button></div>');`);
                $(".exercise").append(createElement);
            }
            $(".workout").click(function (event) {
                showHideDescription(true);
            });
        });
    });
}


// function to display exercise description
function showHideDescription(show) {
    if (show) {
        $("#exercisedescription").removeClass("hidden");
    } else {
        // weightInput.val('');
        $("#exercisedescription").addClass("hidden");
    };
}



// this is to close the modal
// $("#alert-border-4").removeClass("hidden opacity-0")

