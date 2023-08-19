const apiKey = 'e1b060327fa8467997a5dbc212e9112f';
const optionsContainer = document.querySelector('.options-container');
const newsContainer = document.querySelector('.news-container');
const country = 'in';
const options = ['general','entertainment','health','science','sports','technology'];
// var requestURL;

function generateUI(articles){
    for(let item in articles){
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = `<div class = "news-image-container"> 
        <img src = "${item?.urlToImage || "./images/newsPaper.jpeg"}" alt="" />
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

async function getNews(requestURL){
    newsContainer.innerHTML = "";
    let response = await fetch(requestURL);
    console.log(response);
    if(!response.ok){
        alert('Data unavailbale at the moment. Please try again later.');
        return ;
    } 
    let data = await response.json();
    generateUI(data.articles);
}

function selectCategory(e,category){
    let options = document.querySelectorAll('.options');
    options.forEach((element)=>{
        element.classList.remove('active');
    });
    let requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add('active');
    getNews(requestURL);
}

function createOptions(){
    // console.log('Function');
    for(let i of options){
        // console.log(`${i}`);
        optionsContainer.innerHTML += `<button class='options ${i == "general" ? "active":""}'
        onclick = "selectCategory(event,'${i}')">${i}</button>`;
    }
}

const init = (requestURL) =>{
    optionsContainer.innerHTML ="";
    getNews(requestURL);
    createOptions();
}

window.onload = ()=>{
    let requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init(requestURL);
    return;
};