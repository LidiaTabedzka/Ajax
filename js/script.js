var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    $.getJSON(quoteUrl, createTweet);
}

function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    //If there is no author
    if (!quoteAuthor.length) {
        quoteAuthor = "Unknown author";
    }
    //If the tweet's length is greater than 140 or not
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text("Author: " + quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
}

$(document).ready(function() {
    getQuote();
    $('.trigger').click(function() {
        getQuote();
    })
});