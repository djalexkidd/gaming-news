var todaysDate = new Date()

const APICALL = `https://newsapi.org/v2/everything?q=gaming&from=${convertDate(todaysDate)}&language=fr&sortBy=publishedAt&apiKey=9bb12d05dbd64b3fb03c2bb2ae8db510`

const affichage = document.querySelector('.affichage')
const switchTheme = document.querySelector('.theme')
const bodyNode = document.querySelector('body')
const headerNode = document.querySelector('header')
const loader = document.querySelector(".loader")

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

    loader.style.display = "none"
}

switchTheme.addEventListener('submit', (e) => {
    e.preventDefault()
    bodyNode.classList.toggle("body-dark")
    headerNode.classList.toggle("body-dark")
})

function convertDate(date) {
    var yyyy = date.getFullYear().toString()
    var mm = (date.getMonth()+1).toString()
    var dd  = (date.getDate()-2).toString()
  
    var mmChars = mm.split('')
    var ddChars = dd.split('')
  
    return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0])
}

callAPI()