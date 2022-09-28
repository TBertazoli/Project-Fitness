$(document).ready(() => {
    readFromStorage();
    populateWeightHistory();
});

var todaysDate = moment().format("YYYY-MM-DD");
var mainSection = $("#mainsection");
var apiKey = "c45e4b59343fbe91045af5de68b5208ef9091deb";
var storageData = null;
var weightInput = $("#weight");
var heightInput = $("#height");
var BMI = 0;


//Progress function called onclick button
var showProgress = function () {
    $("#mainsection").addClass("hidden");
    $("#progresssection").removeClass("hidden");
    // populateCalendar();
}

function populateWeightHistory() {
    $('#showweightbody').empty();
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
        weightInput.val('');
        $("#weightmodal").addClass("hidden");
    }
}

//function to save weight
function submitWeight() {
    storageData.weight = storageData.weight || [];
    storageData.weight.unshift({
        date: todaysDate,
        weight: weightInput.val()
    });
    localStorage.setItem("BBB", JSON.stringify(storageData));
    showHideWeightModal(false);
    populateWeightHistory();
}

//function to show or hide height modal
function showHideHeightModal(show) {
    if (show) {
        $("#heightmodal").removeClass("hidden");
    } else {
        weightInput.val('');
        $("#heightmodal").addClass("hidden");
    }
}

//function to save Height
function submitHeight() {
    storageData.height = storageData.height || [];
    storageData.height.unshift({
        date: todaysDate,
        height: heightInput.val()
    });
    localStorage.setItem("BBB", JSON.stringify(storageData));
    showHideHeightModal(false);
}

function readFromStorage() {
    storageData = JSON.parse(localStorage.getItem("BBB")) || {};
    if (storageData.events) {
        storageData.events.forEach(e => {
            e.date = moment(e.date);
        });
        console.log(storageData.events);
    }
}

function addWorkoutHistory() {

}



function calculateBMI() {
    if (storageData.height && storageData.height.length > 0 &&
        storageData.weight && storageData.weight.length > 0) {
        var weight = storageData.weight[0].weight; // in pounds
        var height = storageData.height[0].height; // in inches
        BMI = (weight / 2.205) / ((height / 39.37) * 2);
        var text = ''
        if (BMI < 18.5) {
            text = "Your BMI falls within the underweight range";
        } else if ((BMI > 18.5) && (BMI < 24.9)) {
            text = "Your BMI falls within the normal or healthy weight range";
        } else if ((BMI > 25) && (BMI < 29.9)) {
            text = "Your BMI falls within the overweight range";
        } else {
            text = "Your BMI falls within the obese range";
        }

        $("#BMI-text").text(`BMI = ${BMI}, ${text}`);
        $("#alert-border-3").removeClass("hidden opacity-0");
    }
};
