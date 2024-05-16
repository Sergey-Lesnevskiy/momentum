import playList from "./playList.js";


const time = document.querySelector(".time");
const pageDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const nameInput = document.querySelector(".name");
const body = document.querySelector("body");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const weatherCity = document.querySelector(".weather-city");
const city = document.querySelector(".city");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const play = document.querySelector(".play");
const playAudioNext = document.querySelector(".play-next");
const playAudioPrev = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const ru = document.querySelector(".ru");
const english = document.querySelector(".en");
const setting = document.querySelector(".setting");
const openSetting = document.querySelector(".open_setting");
const musicSetting = setting.querySelector(".music_setting");
const player = document.querySelector(".player");
const weatherSetting = setting.querySelector(".weather_setting");
const weather = document.querySelector(".weather");


let randomNum;

let playNum = 0;

let isPlay = false;

let message;

let isLanguage='en'
let isLangMeet ='Good'

let days = [
  {ru:"Воскресенье",en:'Monday'},
  {ru:"Понедельник",en:'Tuesday'},
  {ru: "Вторник",en:'Wednesday'},
  {ru:"Среда",en:'Thursday'},
  {ru:"Четверг",en:'Friday'},
  {ru: "Пятница",en:'Saturday'},
  {ru: "Суббота",en:'Sunday'},
];


let testArray = []

//setting
openSetting.addEventListener('click',()=>{
  setting.classList.toggle('active_setting')
  openSetting.classList.toggle('active')
})

musicSetting.addEventListener('click',()=>{
  musicSetting.classList.toggle('active')
  player.classList.toggle('dis_active')
  pauseAudio()
  play.classList.remove("pause");
})

weatherSetting.addEventListener('click',()=>{
  weather.classList.toggle('dis_active')
  weatherSetting.classList.toggle('active')
})
//setting
//language

const greetingTranslation ={
  rus :"Добрый",
  eng :'Good'
}

ru.addEventListener('click',()=>{
  ru.classList.add('active')
  english.classList.remove('active')
  showGreeting(greetingTranslation['rus'] ,'ru')
  isLanguage ='ru'
  isLangMeet = greetingTranslation['rus']
  ru.innerHTML= "рус"
  english.innerHTML = "анг"
  showTime(isLanguage)
  getWeather(city.value,isLanguage)
  getQuotes('../rus.JSON')
})


english.addEventListener('click',()=>{
  english.classList.add('active')
  ru.classList.remove('active')
  showGreeting(greetingTranslation['eng'],'en')
  isLanguage ='en'
  isLangMeet = greetingTranslation['eng']
  ru.innerHTML= "ru"
  english.innerHTML = "en"
  showTime(isLanguage)
  getWeather(city.value,isLanguage)
  getQuotes('https://type.fit/api/quotes')

})
//language


//playMusic
const audio = new Audio();

function addActive(){
  document.getElementById(`${playNum}`).classList.add('item-active')
}

function removeActive(){
  document.getElementById(`${playNum}`).classList.remove('item-active')
}

function playAudio(playNum) {
  
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  isPlay = true;
  addActive(playNum)
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
}

function toggleClasslist() {
  play.classList.toggle("pause");
}

play.addEventListener("click", () => {
  if (!isPlay) {
    playAudio(playNum);
    toggleClasslist();
  } else {
    pauseAudio();
    toggleClasslist();
  }
});

function playNext() {
  removeActive(playNum)
  playNum >= playList.length - 1 ? (playNum = 0) : playNum++;
  play.classList.add("pause");
  playAudio(playNum);
}

function playPrev() {
  removeActive(playNum)
  playNum < 1 ? playNum=playList.length-1 : playNum--;
  play.classList.add("pause");
  playAudio(playNum);
}

playAudioNext.addEventListener("click", playNext);
playAudioPrev.addEventListener("click", playPrev);


for(let i = 0; i < playList.length; i++) {
const li = document.createElement('li');
li.classList.add('play-item')
li.id = i
li.textContent = playList[i].title
playListContainer.append(li)
}

//playMusic
//text_author

let i = 0;
function dataAuthor(data) {
  i >= data.length ? (i = 0) : quote.innerHTML = data[i].text; author.innerHTML = data[i].author ;
  
}

function getQuotes(path) {

  fetch(path)
    .then(res => res.json())
    .then(data => dataAuthor(data));
}

getQuotes('https://type.fit/api/quotes');

changeQuote.addEventListener("click", () => {
  i++;
  isLanguage==='en'? getQuotes('https://type.fit/api/quotes'): getQuotes('../../rus.JSON')
});
//text_author

//weather
city.addEventListener("change", () => {
  getWeather(city.value,isLanguage);
});

async function getWeather(city,isLanguage) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${isLanguage}&appid=0b8bd7d81f8227f83a1e2f04c3cd7378&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherCity.textContent = data.name;
}

getWeather("Minsk");

//weather
//slider
function getRandomNum() {
  randomNum = Math.floor(Math.random() * testArray.length) + 1;
}
getRandomNum();

function getSlideNext() {
  randomNum >= 99 ? (randomNum = 1) : randomNum++;
  getLinkToImage2() 
}

function getSlidePrev() {
  randomNum <= 1 ? (randomNum = testArray.length) : randomNum--;
  getLinkToImage2() 
}

function setBg(data) {
  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url(${data.photos.photo[randomNum].url_l})`;
  };
  
  for (let i = 0; i < data.photos.photo.length; i++) {
    if(data.photos.photo[i].url_l===undefined){
      i++
    }else{testArray.push(data.photos.photo[i].url_l)}
    
  }
}

function setBgArr(data) {
  const img = new Image();
  img.src =testArray[randomNum];
  img.onload = () => {
    body.style.backgroundImage = `url(${data[randomNum]})`;
  };
}


function getLinkToImage2() {
  if(testArray.length === 0){
      const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=86038a4978dbb4bcde9f9e8d800f4f85&tags=nature&extras=url_l&format=json&nojsoncallback=1';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setBg(data)
    });
  }else{
    setBgArr(testArray)
  }
  }
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
function getTimeOfDay(lang='en') {
  const hour = new Date().getHours();
  if (hour < 6) {
    message = 
    {en:"night",
    ru:'ночи'};
  } else if (hour < 12) {
    message =
    {en:"morning",
    ru:'утро'};
  } else if (hour < 18) {
    message = 
    {en:"afternoon",
    ru:'день'};
  } else if (hour <= 23) {
    message = 
    {en:"evening",
    ru:'вечер'};
  }

  return message[lang];
}

function showGreeting(greet,lang) {
  greeting.textContent = `${greet} ${getTimeOfDay(lang)}`;
}
showGreeting('Good');

function setLocalStorage() {
  localStorage.setItem("name", nameInput.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameInput.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

function showTime() {
  const date = new Date();
  let hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();

  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  hour = hour < 10 ? "0" + hour : hour;

  let currentDate = `${hour}:${minute}:${second}`;

  isLanguage !=='en'? currentDate = `${hour}:${minute}:${second}`:currentDate = date.toLocaleTimeString()

  time.textContent = currentDate;
  setTimeout(showTime, 1000);
  showDate(isLanguage);
}
showTime();

function showDate(lang) {
  const date = new Date();
  const options = { month: "long", day: "numeric", timeZone: "UTC" };
  const currentDate = date.toLocaleDateString(`${isLanguage}-RU`, options);

  pageDate.textContent = `${
    days[date.getDay()][lang]
  }, ${currentDate}, ${date.getFullYear()}`;
}

