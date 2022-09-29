
// gives the list of exercises
var displayExercise = function () {
    var exerciseAPI = "https://wger.de/api/v2/exercise/?language=2"
    fetch(exerciseAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            for (i = 0; i < data.results.length; i++)
                $(".exercise").append('<h2 class="workout">' + data.results[i].name + '</h2>');
                $(".workout").append('<form>Date: <input type="text" id="datepicker"></form>');
                $(function() {$("#datepicker").datepicker();});    
                if ($('.workout').click(function (e) {
                e.preventDefault();
                $(".workout").append(data.results[i].description);
                console.log(data.results[i].description);
            }));
        });
    });
};
displayExercise();
