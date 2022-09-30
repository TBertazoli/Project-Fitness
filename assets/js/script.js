$(document).ready(() => {
    displayExercise();
});

// gives the list of exercises
var displayExercise = function () {
    var exerciseAPI = "https://wger.de/api/v2/exercise/?language=2"
    fetch(exerciseAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (i = 0; i < data.results.length; i++)
                //var array = data.results[i];
                $(".exercise").append('<h2 class="workout">' + data.results[i].name + '</h2>');
            $(".workout").append('<button class="btn">Completed</button>');
            if ($('.workout').click(function () {
                //e.preventDefault();
                //$(".workout").append(data.results[i].description);
                //console.log(data.results[i].description);
            }));
        });
    });
};
