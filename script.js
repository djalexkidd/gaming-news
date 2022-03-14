const APICALL = "https://newsapi.org/v2/everything?q=gaming&from=2022-03-14&language=fr&sortBy=publishedAt&apiKey=9bb12d05dbd64b3fb03c2bb2ae8db510";
const affichage = document.querySelector('.affichage')

// Création d'une fonction asynchrone
async function callAPI() {
    const reponse = await fetch(`${APICALL}`)
    const data = await reponse.json()
    console.log(data)

    creationCarte(data)
}

// Affichage de la carte de l'article
function creationCarte(article) {
    for(let i = 0; i < article.articles.length; i++) {
        const date = new Date(`${article.articles[i].publishedAt}`)
        const formated_date = date.getDate() + '/' + (date.getMonth() + 1)  + '/' + date.getFullYear() + ' à ' + date.getUTCHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

        const carteHTML = `
        <div class="carte">
            <img src="${article.articles[i].urlToImage}" alt="Image de l'article" class="image">
            <h2>${article.articles[i].title}</h2>
            <ul class="cont-infos">
                <li class="description">${article.articles[i].description}</li>
                <li class="source">Source : ${article.articles[i].source.name}</li>
                <li class="published">Date : ${formated_date}</li>
                <a class="link" href=${article.articles[i].url} target="_blank">Lien de l'article</a>
            </ul>
        </div>
        `

        affichage.innerHTML += carteHTML
    }
}

callAPI()