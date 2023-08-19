const apiKey = '16eb65b8cab37c72f67c88447b3b380b';
const optionsContainer = document.querySelector('.options-container');
const newsContainer = document.querySelector('.news-container');
const country = 'in';
const options = ['general','nation','world','bussiness','entertainment','health','science','sports','technology'];
var requestURL;


function generateUI(articles){
    for(let item of articles){
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = `<div class = "news-image-container"> 
        <img src = "${item?.image || "./images/newsPaper.jpeg"}" alt="" loading="lazy" />
        <div class = "news-content">
            <div class = "news-title">
                ${item.title}
            </div>
            <div class = "news-desc">
                ${item.description || item.content || ""}
            </div>
            <a href="${item.url}" target="_blank" class = "view-button">Read More</a>
        </div>`;
        newsContainer.appendChild(card);
    }
}

async function getNews(){
    newsContainer.innerHTML = "";
    let response = await fetch(requestURL);
    // console.log(response);
    if(!response.ok){
        alert('Data unavailbale at the moment. Please try again later.');
        return ;
    } 
    let data = await response.json();
    console.log(data);
    generateUI(data.articles);
}

function selectCategory(e,category){
    let options = document.querySelectorAll('.options');
    options.forEach((element)=>{
        element.classList.remove('active');
    });
    requestURL = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&category=${category}&apikey=${apiKey}`;
    e.target.classList.add('active');
    getNews();
}

function createOptions(){
    // console.log('Function');
    for(let i of options){
        // console.log(`${i}`);
        optionsContainer.innerHTML += `<button class='options ${i == "general" ? "active":""}'
        onclick = "selectCategory(event,'${i}')">${i}</button>`;
    }
}

const init = () =>{
    optionsContainer.innerHTML ="";
    createOptions();
    getNews();
}

window.onload = ()=>{
    requestURL = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&category=general&apikey=16eb65b8cab37c72f67c88447b3b380b`;
    init();
    return;
};