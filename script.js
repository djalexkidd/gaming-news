'use strict';

const affichZero = (nombre) => {
    return nombre < 10 ? '0' + nombre : nombre;
}

const date = () => {
    const infos = new Date();
    document.querySelector('.mdl-logo').innerHTML = `Gaming News par <a href="https://github.com/djalexkidd/" target="_blank">djalexkidd</a> et <a href="https://github.com/daymortel/" target="_blank">Daymortel</a> &copy; 2022-${affichZero(infos.getFullYear())}`;
}

setInterval('date()');

let todaysDate = new Date();

const convertDate = (date) => {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString();
    let dd = (date.getDate()-2).toString();

    let mmChars = mm.split('');
    let ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1]?mm:'0'+mmChars[0]) + '-' + (ddChars[1]?dd:'0'+ddChars[0]);
}

const APICALL = `https://newsapi.org/v2/everything?q=gaming&from=${convertDate(todaysDate)}&language=fr&sortBy=publishedAt&apiKey=9bb12d05dbd64b3fb03c2bb2ae8db510`;

const affichage = document.querySelector('.mdl-grid');
const switchTheme = document.querySelector('.theme');
const bodyNode = document.querySelector('main');
// const headerNode = document.querySelector('header');
const loader = document.querySelector(".loader");

const callAPI = async () => {
    const reponse = await fetch(`${APICALL}`);
    const data = await reponse.json();
    creationCarte(data);
}

const creationCarte = (article) => {
    for(let i = 0; i < article.articles.length; i++) {
        const date = new Date(`${article.articles[i].publishedAt}`);
        const formated_date = date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear() + ' à ' + date.getUTCHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        const carteHTML = `
        <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                    <div class="mdl-card__media">
                        <img class="article-image" src=" ${article.articles[i].urlToImage}" border="0" alt="">
                    </div>
                    <div class="mdl-card__title">
                        <h2 class="mdl-card__title-text">${article.articles[i].title}</h2>
                    </div>
                    <div class="mdl-card__supporting-text">
                    ${article.articles[i].description}
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href=${article.articles[i].url} target="_blank">Lien de l'article</a>
                    </div>
                </div>
        `;

        affichage.innerHTML += carteHTML;
    }

    loader.style.display = 'none';
}

switchTheme.addEventListener('submit', (e) => {
    e.preventDefault();
    bodyNode.classList.toggle("body-dark");
    // headerNode.classList.toggle("body-dark");
});

callAPI();