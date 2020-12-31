var apiKey = "3c75bca6ddbb4f7ba74230517202912";
var zipCode = "60108";
var myURL = `http://api.weatherapi.com/v1/forecast.json?key=3c75bca6ddbb4f7ba74230517202912&q=${zipCode}&days=6`;


console.log(myURL)

$.ajax({
    url: myURL
}).then(function(response){
    console.log(response)
    var foreCastDays = response.forecast.forecastday;
   
    function currentDay (){
        var cityDateIcon = document.createElement('h3');
        cityDateIcon.setAttribute("id", "cityAndDate")
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute("src", `http:${response.current.condition.icon}`)
        cityDateIcon.innerHTML = response.location.name + "  (" + response.location.localtime + ") " + currentIcon
        $(cityDateIcon).push(currentIcon)
        $(secondColFirstRow).append(cityDateIcon)

        console.log(currentIcon)

        var currentTemp = document.createElement('p');
        currentTemp.setAttribute("id", "temperature")
        currentTemp.innerHTML = 'Temperature: ' + response.current.temp_f
        $(secondColFirstRow).append(currentTemp)

        var currentHumidity = document.createElement('p')
        currentHumidity.setAttribute('id', "humidity")
        currentHumidity.innerHTML = 'Humidity: ' + response.current.humidity
        $(secondColFirstRow).append(currentHumidity)

        var currentWind = document.createElement('p')
        currentWind.setAttribute('id', 'windSpeed')
        currentWind.innerHTML = 'Wind Speed: ' + response.current.wind_mph
        $(secondColFirstRow).append(currentWind)

        var uV = document.createElement('p')
        uV.setAttribute('id', 'uvIndex')
        uV.innerHTML = 'UV Index: ' + response.current.uv
        $(secondColFirstRow).append(uV)

    }

    currentDay()

    //for loop to append 5 day forecast into div with class thirdColSecondRow
    for ( i = 0; i < foreCastDays.length; i++ ){
        var colFiveDay = document.createElement('div');
        colFiveDay.setAttribute("class", "col fiveDay");
       
        var oneDate = document.createElement('p');
        oneDate.innerHTML = "Date: " + response.forecast.forecastday[i].date;
        $(colFiveDay).append(oneDate);

        var onePic = document.createElement('img'); 
        onePic.setAttribute("src", `http:${response.forecast.forecastday[i].day.condition.icon}`)
        $(colFiveDay).append(onePic);

        var oneTemp = document.createElement('p');
        oneTemp.innerHTML = "Average Temp: " + response.forecast.forecastday[i].day.avgtemp_f;
        $(colFiveDay).append(oneTemp);

        var oneHumidity =  document.createElement('p');
        oneHumidity.innerHTML = "Average Humidity: " + response.forecast.forecastday[i].day.avghumidity;
        $(colFiveDay).append(oneHumidity);

        $("#thirdColSecondRow").append(colFiveDay);
    }
})