$(document).ready(() => {
    readFromStorage();
    populateWeightHistory();
});

var todaysDate = moment().format("YYYY-MM-DD");
var mainSection = $("#mainsection");
var apiKey = "c45e4b59343fbe91045af5de68b5208ef9091deb";
var storageData = null;


//Progress function called onclick button
var showProgress = function () {
    $("#mainsection").addClass("hidden");
    $("#progresssection").removeClass("hidden");
    // populateCalendar();
}

function populateWeightHistory() {
    if (!storageData.weight || storageData.weight.length === 0) {
        return;
    }

    //variable to create a table element to insert data and weight
    for (var i = 0; i < storageData.weight.length; i++) {
        var createElement = $(`<tr><td class="date-col">${storageData.weight[i].date}</td><td class="weight-col">${storageData.weight[i].weight}</td></tr>`);
        $('#showweightbody').append(createElement);
    }
}

// function to show or hide weight modal
function showHideWeightModal(show) {
    if (show) {
        $("#weightmodal").removeClass("hidden");
    } else {
        $("#weight").val('');
        $("#weightmodal").addClass("hidden");
    }
}

//function to save weight
function submitWeight() {
    storageData.weight = storageData.weight || [];
    storageData.weight.push({
        date: todaysDate,
        weight: $("#weight").val()
    });
    console.log(storageData);
    localStorage.setItem("BBB", JSON.stringify(storageData));
    showHideWeightModal(false);
}



function readFromStorage() {
    storageData = JSON.parse(localStorage.getItem("BBB")) || {};
    if (storageData.events) {
        storageData.events.forEach(e=>{
            e.date = moment(e.date);
        });
        console.log(storageData.events);
    }
}

function addWorkoutHistory () {

}