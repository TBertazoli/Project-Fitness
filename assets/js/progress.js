var todaysDate = moment().format("YYYY-MM-DD");
var mainSection = $("#mainsection");
var apiKey = "c45e4b59343fbe91045af5de68b5208ef9091deb";

// login section
function showHideLogin(show) {
    if (show) {
        $("#loginmodal").removeClass("invisible");
    } else {
        $("#loginmodal").addClass("invisible");
    }
}

//Progress function called onclick button
var showProgress = function () {
    $("#mainsection").addClass("invisible");
    $("#progresssection").removeClass("invisible");
    $("#calendar").datepicker({
        inline: true,
        firstDay: 1,
        showOtherMonths: true,
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    })
}

// this variable will fetch the weight api
var weightApi = "https://wger.de/api/v2/weightentry/";
fetch(weightApi, {
    headers: {
        'Authorization': "Token " + apiKey
    }
}).then(function (response) {
    response.json().then(function (data) {
        if (data.results.length === 0) {
            return;
        }

        //variable to create a table element to insert data and weight
        for (var i = 0; i < data.results.length; i++) {
            var createElement = $(`<tr><td>${data.results[i].date}</td><td>${data.results[i].weight}</td></tr>`);
            $('#tablebody').append(createElement);

        }

    })
})

// function to show or hide weight modal
function showHideWeightModal(show) {
    if (show) {
        $("#weightmodal").removeClass("invisible");
    } else {
        $("#weightmodal").addClass("invisible");
    }
}

//function to save weight (POST)
function submitWeight() {
    fetch(weightApi, {
        headers: {
            'Authorization': "Token " + apiKey,
            'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({
            weight: $("#weight").val(),
            date: todaysDate,
        }),
    }).then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            showHideWeightModal(false);
        })
    })

}