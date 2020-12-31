var apiKey = "3c75bca6ddbb4f7ba74230517202912";
var zipCode = "60108";
var myURL = `http://api.weatherapi.com/v1/forecast.json?key=3c75bca6ddbb4f7ba74230517202912&q=${zipCode}&days=6`;


console.log(myURL)

$.ajax({
    url: myURL
}).then(function(response){
    console.log(response)
    var foreCastDays = response.forecast.forecastday;
   
    //for loop to append 5 day forecast into div with class thirdColSecondRow
    for ( i = 0; i < foreCastDays.length; i++ ){
        var colFiveDay = document.createElement('div');
       colFiveDay .setAttribute("class", "col fiveDay");
       
        var oneDate = document.createElement('p');
        oneDate.innerHTML = response.forecast.forecastday[i].date;
        $(colFiveDay).append(oneDate);

        var onePic = document.createElement('img'); // <img>
       // http://cdn.weatherapi.com/weather/64x64/day/116.png
        onePic.setAttribute("src", `http:${response.forecast.forecastday[i].day.condition.icon}`)
        $(colFiveDay).append(onePic);

        var oneTemp = document.createElement('p');
        oneTemp.innerHTML = "Temp";
        $(colFiveDay).append(oneTemp);

        var oneHumidity =  document.createElement('p');
        oneHumidity.innerHTML = "Humidity";
        $(colFiveDay).append(oneHumidity);

        $("#thirdColSecondRow").append(colFiveDay);
        
    }


    
    $("#cityAndDate").text(response.location.name + " " + response.location.localtime + " " + response.current.condition.icon) 
    $("#oneTemp").text("Temp: " + foreCastDays[0].day.avgtemp_f)
    console.log(foreCastDays[0].day.avgtemp_f)
})