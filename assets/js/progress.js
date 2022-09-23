//Progress section

var mainSection = $("#mainsection")

var showProgress = function () {
    $("#mainsection").addClass("invisible");
    $("#calendar").datepicker({
        inline:true,
        firstDay:1,
        showOtherMonths:true,
        dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    })
}
   
