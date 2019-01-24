const playerDataURL = 'http://localhost:3000/players'

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}

const main = qs('#all-characters-list')
let heading = qs('#heading')
let span = qs('span')
let players
let currentPlayers = []
let view = qs('#view')


const render = () => {
    fetch(playerDataURL)
        .then(res => res.json())
        .then(res => {
            players = res
            renderPlayerCards(players)
        })
}

const renderPlayerCards = (players) => {
    main.innerHTML = ''
    players.forEach((player) => {
        const playerDiv = ce('div')
        const playerImage = ce('img')
        
        // playerDiv.setAttribute('class', 'col-sm-3')
        playerDiv.style.width = '20%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id
        playerDiv.innerHTML = `<p>${player.name}</p>`
        playerDiv.addEventListener('click', function(){

            choose_players(player)
        })
        
    
        playerImage.dataset.image_url = player.image_url
        playerImage.setAttribute('src', player.image_url)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
        
        playerDiv.append(playerImage)
        main.append(playerDiv)
        
        
    })
}

let choose_players = function(player){
    heading.innerText = 'Chosen Players'
    if (currentPlayers.length < 4){
        currentPlayers.push(player)

        const playerDiv = ce('div')
        const playerImage = ce('img')
        
        
        // playerDiv.setAttribute('class', 'col-sm-3')
        playerDiv.style.width = '24%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id
        playerDiv.innerHTML = `<p>${player.name}</p>`
        
        
        playerImage.dataset.image_url = player.image_url
        playerImage.setAttribute('src', player.image_url)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
       
        playerDiv.append(playerImage)
        span.append(playerDiv)


        if (currentPlayers.length === 4){
            let button = ce('button')
            button.innerText = 'Start Game'
            button.addEventListener('click', function(e){
                e.preventDefault()
                startGame()
            })
            span.append(button)
        }
    }
   
}


function startGame() {
  
    view.innerHTML = ''
}


function fetchQuotes (){
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(json => all_quotes = json)
    .then(render_quotes)
}



document.addEventListener('DOMContentLoaded', () => {
    render()
})