window.onload = $("#country-name").focus();

var url = 'https://restcountries.eu/rest/v1/name/';
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

    resp.forEach(function(item){
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

        var $column9 = $('<div>').addClass('col-xs-9');
        var $parCapitalName = $('<p>').text(item.capital);
        var $parRegionName = $('<p>').text(item.region);
        var $parSubregionName = $('<p>').text(item.subregion);
        var $parPopulationNumber = $('<p>').text(item.population);
        var $parCurrencyName = $('<p>').text(item.currencies);
        var $column9WithPar = $column9.append($parCapitalName).append($parRegionName).append($parSubregionName).append($parPopulationNumber).append($parCurrencyName);

        var $rowWithColumns =  $row.append($column3WithPar).append($column9WithPar);
        var $cardFooter = $('<div>').addClass('card-footer');
    
        $('<li>').addClass('single-country-card').append($country).append($moreInfo).append($rowWithColumns).append($cardFooter).appendTo(countriesList);
    });
}