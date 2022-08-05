const APICALL = "https://gnews.io/api/v4/search?q=gaming&token=003657fad27339671a7e8c97f31e00f3&lang=fr"

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

        const carteHTML = `
        <div class="carte">
            <img src="${article.articles[i].image}" alt="Image de l'article" class="image">
            <h2>${article.articles[i].title}</h2>
            <ul class="cont-infos">
                <li class="description">${article.articles[i].description}</li>
                <li class="source">Source : ${article.articles[i].source.name}</li>
                <li class="published">Date : ${date.toLocaleDateString("fr-FR") + " " + date.toLocaleTimeString("fr-FR")}</li>
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

callAPI()