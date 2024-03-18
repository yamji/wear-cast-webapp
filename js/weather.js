// API 호출
fetch('http://ip-api.com/json/')
  .then(response => response.json())
  .then(data => {
    // API 응답에서 나라명과 도시명 추출
    const country = data.country;// 현재 위치의 위도와 경도를 가져오는 API 호출
    fetch('http://ip-api.com/json/')
      .then(response => response.json())
      .then(data => {
        const lat = data.lat;
        const lon = data.lon;
        const country = data.country;
        const regionName = data.regionName;

        // OpenWeatherMap API에 접근하여 날씨 정보 가져오기
        const apiKey = 'a2bef9ef4e8c7cb401ffa5e9cf298192'; // 김융의 key
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

        fetch(weatherApiUrl)
          .then(response => response.json())
          .then(weatherData => {
            // 날씨 정보 처리
            console.log(weatherData); // 날씨 정보 콘솔에 출력 또는 원하는 대로 처리

            // 예시: HTML에 결과 출력
            const weatherElement = document.getElementById('weather');
            const weatherDescription = weatherData.list[2].weather[0].description;
            const temperature = weatherData.list[2].main.temp;
            const humidity = weatherData.list[2].main.humidity;
            const windSpeed = weatherData.list[2].wind.speed;
            const maxTemperature = weatherData.list[2].main.temp_max;
            const minTemperature = weatherData.list[2].main.temp_min;
            const sunriseTime = new Date(weatherData.city.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(weatherData.city.sunset * 1000).toLocaleTimeString();
            const currentTime = new Date().toLocaleTimeString();
            const timeElement = document.getElementById('current-time');
            timeElement.innerHTML = `현재 시간: ${currentTime}`;

            weatherElement.innerHTML = `나라: ${country}, 도시: ${regionName}<br>
              날씨: ${weatherDescription}, 온도: ${temperature}도<br>
              습도: ${humidity}%, 풍속: ${windSpeed}m/s<br>
              최고 기온: ${maxTemperature}도, 최저 기온: ${minTemperature}도<br>
              일출 시간: ${sunriseTime}, 일몰 시간: ${sunsetTime}<br>`;

            for (let i = 0; i <= 7; i++) {
              const weatherDescription = weatherData.list[i].weather[0].description;
              const temperature = weatherData.list[i].main.temp;
              const time = weatherData.list[i].dt_txt;

              weatherElement.innerHTML += `날씨: ${weatherDescription}, 온도: ${temperature} 시간${time}<br>`;

            }


            // 24시간 내에 비가 오는지 여부 판단
            let isRaining = false;
            for (let i = 0; i < 8; i++) {
              if (weatherData.list[i].weather[0].main === 'Rain') {
                isRaining = true;
                break;
              }
            }

            // 비 내용 출력
            const rainElement = document.getElementById('rain');
            rainElement.innerHTML = `24시간 내에 비가 오는지: ${isRaining ? '비가 옴' : '비가 오지 않음'}`

          })
          .catch(error => {
            console.error('Error fetching weather info:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching IP info:', error);
      });

    const regionName = data.regionName;
    const city = data.city;
    const lat = data.lat;
    const lon = data.lon;


    // HTML에 결과 출력
    const locationElement = document.getElementById('location');
    locationElement.innerHTML = `나라: ${country}<br>지역명: ${regionName}<br>도시: ${city}<br>
    위도: ${lat}<br>경도: ${lon}`;
  })
  .catch(error => {
    console.error('Error fetching IP info:', error);
  });
