var firstColSecondRowCol = document.getElementById('firstColSecondRowCol')
var userInput = document.getElementById("userInput")
var searchBtn = document.getElementById("searchBtn")
var myUl = document.getElementById('ulList');
var dateNow = moment().format('LL');
// var dateOne = moment(dateNow).add(1, 'days');

console.log(dateNow)
// console.log(dateOne)

//Event listener for search button, whatever is entered in the input field, is saved to zipcode variable, which in turn is added to API URL to allow the URL to be dynamic



var userCity;
var userCities = JSON.parse(localStorage.getItem("City")) || [];


for (i = 0; i < userCities.length; i++){
var myLi = document.createElement('li')
myLi.setAttribute('class', 'list-group-item')
myLi.innerHTML = userCities[i]
myUl.prepend(myLi)
$(firstColSecondRowCol).append(myUl)
}

searchBtn.addEventListener('click', function (){

    $('#secondColFirstRow').empty()
    $('#thirdColSecondRow').empty()

    userCity = userInput.value;
    userCities.push(userCity)
    localStorage.setItem("City", JSON.stringify(userCities));


    var myLi = document.createElement('li')
    myLi.setAttribute('class', 'list-group-item')
    myLi.innerHTML = userCity;
    myUl.prepend(myLi)
    $(firstColSecondRowCol).append(myUl)

    

    var apiKey = "3c75bca6ddbb4f7ba74230517202912";
    var myURL = `http://api.weatherapi.com/v1/forecast.json?key=3c75bca6ddbb4f7ba74230517202912&q=${userCity}&days=6`;
    // var myURL = `http://api.weatherapi.com/v1/forecast.json?key=3c75bca6ddbb4f7ba74230517202912&q=${userCity}&days=6`;
    
    
    console.log(myURL)
    $.ajax({
        url: myURL
    }).then(function(response){
        console.log(response)
        var foreCastDays = response.forecast.forecastday;
    
        //function to add current city, date, weather icon, temp, humidity, wind speed, and UV index to div with class secondColFirstRow
        function currentDay (){
            var cityDateIcon = document.createElement('h3');
            cityDateIcon.setAttribute("id", "cityAndDate")
            var currentIcon = document.createElement('img')
            currentIcon.setAttribute("src", `http:${response.current.condition.icon}`)
            cityDateIcon.innerHTML = response.location.name + "  (" + dateNow + ") "
            $(cityDateIcon).push(currentIcon)
            $('#secondColFirstRow').append(cityDateIcon)
    
            console.log(response.current.condition.icon)
    
            var currentTemp = document.createElement('p');
            currentTemp.setAttribute("id", "temperature")
            currentTemp.innerHTML = 'Temperature: ' + response.current.temp_f + "°F"
            $('#secondColFirstRow').append(currentTemp)
    
            var currentHumidity = document.createElement('p')
            currentHumidity.setAttribute('id', "humidity")
            currentHumidity.innerHTML = 'Humidity: ' + response.current.humidity + "%"
            $('#secondColFirstRow').append(currentHumidity)
    
            var currentWind = document.createElement('p')
            currentWind.setAttribute('id', 'windSpeed')
            currentWind.innerHTML = 'Wind Speed: ' + response.current.wind_mph + " MPH"
            $('#secondColFirstRow').append(currentWind)
    
            var uV = document.createElement('p')
            uV.setAttribute('id', 'uvIndex')
            uV.innerHTML = 'UV Index: ' + response.current.uv
            $('#secondColFirstRow').append(uV)
    
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
    
})





