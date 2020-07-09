$(function () {
    var array = [];
    var result = 0;
    var prevEntry = 0;
    var operation = "";
    var currentEntry = "0";
    var total = "";

    displayRes(result);
    $(".sign").prop("disabled",true);

    $("button").on("click",function(event){
        var buttonClicked = $(this).html();

        if(buttonClicked == "AC") {
            result = 0;
            currentEntry = "";
            $("#calc-history").text("");
            while(array.length) {array.pop();}
        }
        else if(buttonClicked == "+/-") { currentEntry = "-" + currentEntry; }
        else if(buttonClicked == ".") { currentEntry = currentEntry + buttonClicked; }
        else if(isNumber(buttonClicked)){
            if(currentEntry == "0") { currentEntry = buttonClicked; }
            else { currentEntry = currentEntry + buttonClicked; }
            $(".sign").prop("disabled",false);
        }

        else if(isOperation(buttonClicked)){
            array.push(currentEntry);
            prevEntry = parseFloat(currentEntry);
            operation = buttonClicked;
            currentEntry = "";
            array.push(operation);
            $(".sign").prop("disabled",true);
            $("#calc-history").text(array.join(" ").toString());
        }

        else if(buttonClicked == "%") { currentEntry = currentEntry / 100; }
        else if(buttonClicked == "=") {
            array.push(currentEntry);
            $("#calc-history").text(array.join(" ").toString());
            while(array.length) {array.pop();}
            currentEntry = operate(prevEntry, currentEntry, operation);

        }

        displayRes(currentEntry);

    });


    $(".slider").click(function(){

        if($("#calc-container").css("background-color") == "rgb(85, 90, 96)"){
            $("#calc-container").css("background-color","white").css("color","#555A60");
            $(".sign , #equal-sign").css("background-color","#E3E9EC");
        }

        else {
            $("#calc-container").css("background-color","#555A60");
            $("#calc-container").css("color","#E3E9EC");
            $(".sign , #equal-sign").css("background-color","rgba(244, 171, 65, 0.1)");
        }

    });
});


function displayRes(displayValue){
    var displayValue = displayValue.toString();
    $("#calc-result").html(displayValue.substring(0, 5));
}

function operate(prevEntry, currentEntry, operation){
    var prev = parseFloat(prevEntry);
    var current = parseFloat(currentEntry);
    if(operation == "+") return (prev + current);
    if(operation == "-") return (prev - current);
    if(operation == "×") return (prev * current);
    if(operation == "÷") return (prev / current);
}

function isNumber(num){ return !isNaN(num); }
function isOperation(opr){
    if(opr == "+" || opr == "-" || opr == "×" || opr == "÷") return true;
}
