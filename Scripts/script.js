//global variables
var firstColSecondRowCol = document.getElementById('firstColSecondRowCol')
var userInput = document.getElementById("userInput")
var searchBtn = document.getElementById("searchBtn")
var myUl = document.getElementById('ulList');
var dateNow = moment().format('LL');
var userCity;
var userCities = JSON.parse(localStorage.getItem("City")) || [];




function myApiCall (e, isSearch = false){
    console.log(e.target.innerText)
    console.log(isSearch)
    
    var apiKey = "18212af488de4eb5a28215154211403";
    var apiKey2 = "be2cec0d0cab5aac4d45f963faab36c2"
    var myURL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${isSearch ? userInput.value : e.target.innerText}&days=6`;
    var myURL2 = `http://api.openweathermap.org/data/2.5/forecast?q=${isSearch ? userInput.value : e.target.innerText}&appid=${apiKey2}`

    $.ajax({
        url: myURL2
    }).then(function(response){
        console.log("API Response", response)
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
            var uVNumber = document.createElement('div')
            uVNumber.setAttribute('id', 'uVNumber')
            uV.setAttribute('id', 'uvIndex')
            // uvResponse = response.current.uv
            // --------------------------------------------------------------------------------------------------------------------------------------------Left off here-
            // console.log(typeof response.current.uv)
            uVNumber.innerHTML = response.current.uv
            uV.innerHTML = 'UV Index: ' + uvResponse
            $('#secondColFirstRow').append(uV)

            if (uvResponse <= 2){
                uV.setAttribute('style', 'background-color: green;');
            }
            
    
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
}

function renderCities (){
    myUl.innerHTML = ""
    //for loop that allows a new li element to be created for each object inside the userCities array
    for (i = 0; i < (userCities.length > 16?16:userCities.length); i++){
        var myLi = document.createElement('li')
        myLi.setAttribute('class', 'list-group-item')
        myLi.innerHTML = userCities[i]
        myUl.append(myLi)
        $('#firstColSecondRowCol').append(myUl)
    }
}

renderCities()

myUl.addEventListener('click', function (e){
    $('#secondColFirstRow').empty()
    $('#thirdColSecondRow').empty()
    // console.log(e.target.innerText)
    
    myApiCall(e)

})

//Event listener for search button, whatever is entered in the input field, is saved to zipcode variable, which in turn is added to API URL to allow the URL to be dynamic
searchBtn.addEventListener('click', function (e){

    $('#secondColFirstRow').empty()
    $('#thirdColSecondRow').empty()

    userCity = userInput.value;
    userCities.unshift(userCity)
    localStorage.setItem("City", JSON.stringify(userCities));


   renderCities(e)


   myApiCall(e, true)
    
})    
