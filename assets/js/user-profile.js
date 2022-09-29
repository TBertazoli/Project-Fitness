var userName = $("#username")

var displayUserName = function () {
    var profileAPI = "https://wger.de/api/v2/userprofile/"
    fetch(profileAPI, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token c45e4b59343fbe91045af5de68b5208ef9091deb'
        }
    }).then(function (response) {
        response.json().then(function (data) {
            for (var i = 0; i < data.results.lenght; i++)
                userName.text("User Name:" + data.results[i].user);
            console.log(data.results[i].user);
            console.log(data);
            
        });
    });
}

displayUserName();

