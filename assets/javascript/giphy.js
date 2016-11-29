$(document).ready(function() {
    //Initial array of nature topics to display on HTML
    var natureArray = ["clouds", "rain", "thunder", "forest", "mountain", "snow", "leaves"];

    //			Generate GIFS function via AJAX call
    // ========================================================
    function natureInput() {
        //Every time this function is called, it empties grid so whatever is searched looks like it's replacing the grid
        $("#natureGifs").empty();
        //Setting a variable to hold the "data-name" attribute of whatever is clicked. The data-name attribute is
        //set to the input, which is declared in $("#addNature").on("click" function(){})
        var userNature = $(this).attr("data-name");
        //Setting variable to hold the user input to dynamically generate URL to query in the AJAX call
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userNature + "&api_key=dc6zaTOxFJmzC";
        //AJAX call to return the JSON of the searched query
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response);
            //For loop to return only 5 gifs
            for (var i = 0; i < 5; i++) {
                //Generating generic div to dynamically generate divs with the class "nature"
                var natureDiv = $("<div class='natureGif'>");
                //Setting variable to shorthand drilling down into the API response's object
                var gif = response.data[i];
                //Setting variable that holds rating of the gif by drilling into the API response's object.
                var rated = gif.rating;
                //Setting variable to dynamically generate p elements that will disclose the rating of
                //each gif
                var p = $("<p>").text("Rating: " + rated);
                //Setting variable to easily reference the still image of the gif being searched for
                var gifStill = gif.images.original_still.url;
                //Setting variable to easily reference the animated image of the gif being searched for
                var gifAnimated = gif.images.original.url;
                //Creating variable to hold the dynamically create img tag
                var gifURL = $("<img>");
                //Assigning attributes data-name, state of still and data animated and data still states and src and alt to the gif-URL
                gifURL.attr({
                    "src": gifStill,
                    "data-still": gifStill,
                    "data-animate": gifAnimated,
                    "data-state": "still",
                    "alt": "giphy " + i
                }).addClass("gif");
                console.log(gifURL);
                //Appending p to showDiv
                natureDiv.append(p);
                //Sets the HTML of the variable natureDiv to the gif-URL which contains the running gif
                natureDiv.append(gifURL);
                //ID natureGifs in HTML appends complete showDiv variable, which contains the running gif
                //as well as the rating
                $("#natureGifs").append(natureDiv);
            };

            //		Click event handler to pause and unpause gifs
            // ========================================================
            //On click of element with the class "gif"
            var gifClick = $(".gif").on("click", function() {
                console.log("this is working");
                var state = $(this).attr("data-state");
                if (state == "still") {
                    $(this).attr({
                        "src": $(this).data("animate"),
                        "data-state": "animate"
                    });
                } else {
                    $(this).attr({
                        "src": $(this).data("still"),
                        "data-state": "still"
                    });
                };
            });
        });
    };

    //					Rendering Buttons Dynamically
    // ========================================================
    //Renders buttons dynamically with the info above.
    function renderButtons() {
        //Empties the natureButtons div so when appending, it doesn't chain onto pre-existing buttons
        $("#natureButtons").empty();

        for (var i = 0; i < natureArray.length; i++) {
            //Using jQuery call to create buttons
            var x = $("<button>");
            //Adding class "nature", attribute data-name "name of nature in the array", and then text "name of nature in the array" to each new button
            x.attr("data-name", natureArray[i]).addClass("nature").text(natureArray[i]);
            //Appends each new button.
            $("#natureButtons").append(x);
        };
    };

    //					Clicking Add Show
    // ========================================================
    //Handles click action of when Add Show button is clicked
    $("#addNature").on("click", function() {
        console.log("this is working");
        //Variable that holds the trimmed value of the form field input ("#natureInput")
        var newNature = $("#natureInput").val().trim();
        //Push newShow into the array
        natureArray.push(newNature);
        //Render button function renders new buttons, including the recently pushed index item
        renderButtons();
        //Allows the user to press enter as well as prevents "submit" button's default action of
        //refreshing the page.
        return false;
    });



    //			Generic Click Element with Class "nature"
    // ========================================================
    //In the document, whenever a click occurs on an element with class "nature", it will run function natureInput
    $(document).on("click", ".nature", natureInput);

    //Renders buttons for the first page load.
    renderButtons();

}); //Ends overall document ready function
