// VARIABLES
var topics = ["Steve Carell", "Issa Rae", "Robin Williams", "Amy Poehler", "John Mulaney", "Tina Fey",
    "Jim Carrey", "Donald Glover", "Maya Rudolph", "Chris Farley", "Andy Daly",
    "Dave Chappelle", "Andy Samberg", "Charlie Day", "Zach Galifianakis", "Kumail Nanjiani"]
var buttonType = ["primary", "warning", "success", "danger", "info"];
var api_key = "QlXqyuA0KRb85SCz6AhBf2lLLkAcvWPJ";

// FUNCTION
function makeButtons() {
    topics.forEach(function (item, index) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-" + buttonType[Math.floor(Math.random() * 5)] + " btn-sm btn-name");
        newButton.html(item);
        $("#buttons").append(newButton);
    })
}

// READ CLICKS
$("#buttons").on("click", ".btn-name", function () {
    var searchTerm = $(this).html().replace(" ", "+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&limit=10&q=" + searchTerm;

    $("#gifs").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        response.data.forEach(function (item, index) {

            var current = response.data[index];

            var newCard = $("<div>");
            newCard.addClass("card bg-info text-white");

            var cardGif = $("<img>");
            cardGif.addClass("card-img-top");
            cardGif.attr("src", current.images.original_still.url);
            cardGif.attr("alt", searchTerm.replace("+", " "));
            cardGif.attr("data-state", "still");
            cardGif.attr("data-still", current.images.original_still.url);
            cardGif.attr("data-animate", current.images.original.url);

            var cardBody = $("<div>");
            cardBody.addClass("card-body text-center");
            var cardRating = $("<p>");
            cardRating.addClass("card-text");
            cardRating.text("Rating: " + current.rating.toUpperCase());
            cardBody.append(cardRating);

            newCard.append(cardGif);
            newCard.append(cardBody);

            $("#gifs").append(newCard);

        })

    });
});

$("#gifs").on("click", "img", function () {

    var state = $(this).attr("data-state");
    console.log($(this));

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})

$("#addButton").on("click", function () {
    topics.push($("#search-term").val());
    $("#buttons").empty();
    makeButtons();
})

makeButtons();