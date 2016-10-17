// JS file
//Note: Font Awesome and jQuery loaded

$(document).ready(function() {
    var rando = 0;
    $("#quoteButton").on("click", function() {
        $.getJSON("https://codepen.io/patenakev/pen/rrAGXP.js", function(json) {
            rando = Math.floor(json.quotes.length * Math.random())
            $(".newQuote").html('"' + json.quotes[rando].text + '"');
            $(".newSource").html(" - " + json.quotes[rando].source);
            $(".randomNum").html(rando);
        });
    });
    $("#TweetButton").on("click", function() {
        $.getJSON("https://codepen.io/patenakev/pen/rrAGXP.js", function(json) {
        window.open('https://twitter.com/intent/tweet?text=' + 
                    '"' + json.quotes[rando].text + '" - ' + json.quotes[rando].source, 
                    '_blank');
        });
    });
  $("#quoteButton").trigger("click"); 
});
