window.onload = $("#country-name").focus();

var url = 'https://restcountries.eu/rest/v1/name/';
var urlExtended = 'https://restcountries.eu/rest/v2/alpha/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

$("#country-name").keyup(function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        $("#search").click();
    }
});

function searchCountries(){
    var countryName = $('#country-name').val();
    if (!countryName){
        countryName = "Poland";
    }

    $.ajax({
        url: url + countryName,
        method: 'GET',
        success: showCountriesList
    });

    $("#country-name").focus();
}

function showCountriesList(resp){
    countriesList.empty();
    var countryName = $('#country-name').val();

    var filteredCountries = resp.filter(function(singleCountry){
       var indexInputValueSmall = singleCountry.name.toLowerCase().indexOf(countryName);
       var indexInputValueCapilized = singleCountry.name.indexOf(countryName);
       return indexInputValueSmall != -1 || indexInputValueCapilized != -1;
    });

    filteredCountries.forEach(function(item){
        var $country = $('<h3>').text(item.name).addClass('text-uppercase');
        var $moreInfo = $('<h4>').text('More information :');
        var $row = $('<div>').addClass('row');

        var $column3 = $('<div>').addClass('col-xs-3');
        var $parCapital = $('<p>').text('Capital :');
        var $parRegion = $('<p>').text('Region :');
        var $parSubregion = $('<p>').text('Subregion :');
        var $parPopulation = $('<p>').text('Population :');
        var $parCurrency = $('<p>').text('Currency :');
        var $column3WithPar = $column3.append($parCapital).append($parRegion).append($parSubregion).append($parPopulation).append($parCurrency);

        var $column5 = $('<div>').addClass('col-xs-5');
        var $parCapitalName = $('<p>').text(item.capital || "No information found");
        var $parRegionName = $('<p>').text(item.region || "No information found");
        var $parSubregionName = $('<p>').text(item.subregion || "No information found");
        var $parPopulationNumber = $('<p>').text(item.population || "No information found");
        var $parCurrencyName = $('<p>');
        var $column5WithPar = $column5.append($parCapitalName).append($parRegionName).append($parSubregionName).append($parPopulationNumber).append($parCurrencyName);

        var $column4 = $('<div>').addClass('col-xs-4');
        var $img = $('<img>').attr('alt', "no flag found");
        var $column4WithImg = $column4.append($img);

        var $rowWithColumns =  $row.append($column3WithPar).append($column5WithPar).append($column4WithImg);
        var $cardFooter = $('<div>').addClass('card-footer');
    
        $('<li>').addClass('single-country-card').append($country).append($moreInfo).append($rowWithColumns).append($cardFooter).appendTo(countriesList);

        $.ajax({
            url: urlExtended + item.alpha3Code,
            method: 'GET',
            success: showAdditionalInfoList
        });

        function showAdditionalInfoList(response){
            $parCurrencyName.text(response.currencies[0].name || "No information found");
            $img.attr('src', response.flag);
        }
    });

    var clicked = "false";

    $('h3').click(function(){
        if ( clicked == "false") {
            $(this).siblings().css("display", "block");
            clicked = "true";
        } else {
            $(this).siblings().css("display", "none");
            clicked = "false";
        }
    });
}
