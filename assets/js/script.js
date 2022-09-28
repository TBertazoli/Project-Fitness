

var exercise = fetch("https://wger.de/api/v2/exercise/?muscles=1&equipment=3");
console.log(exercise);
$(".exercise").append('<ul>' + exercise + '</ul>');