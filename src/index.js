const playerDataURL = 'http://localhost:3000/players'

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}

let main = qs('#all-characters-list')
let heading = qs('#heading')
let span = qs('span')
let players
let currentPlayers = []
let currentRound =[]
let view = qs('#view')
let mainButton = qs('#main-button')
let gameStarted = false
let rounds = []


const fetchPlayers = () => {
    fetch(playerDataURL)
    .then(res => res.json())
    .then(res => players = res)
    .then(renderPlayerCards)
}

const renderPlayerCards = () => {
    main.innerHTML = ''
    
    players.forEach((player) => {
        const playerDiv = ce('div')
        const playerImage = ce('img')
      
        playerDiv.style.width = '20%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id  //why?
        playerDiv.innerHTML = `<p>${player.name} </p>`
        
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
   
    if (currentPlayers.length < 4){
        currentPlayers.push(player)

        const playerDiv = ce('div')
        const playerImage = ce('img')
        const deleteButton = ce('button')
        
        playerDiv.style.width = '24%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id //why?
        playerDiv.innerHTML = `<p>${player.name} </p>`
        
        deleteButton.innerText = 'X'
        playerDiv.appendChild(deleteButton)
        
        playerImage.dataset.image_url = player.image_url
        playerImage.setAttribute('src', player.image_url)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
       
        playerDiv.append(playerImage)
        span.append(playerDiv)

        if (gameStarted == false) { //if true, remove delete button
            deleteButton.addEventListener('click', function(e){
                e.preventDefault()
                remove_player(playerDiv, player)
            })
        }
        
        if (currentPlayers.length === 4){
            mainButton.style.display = 'block'
            heading.innerText = 'Click Start Game to Play'
        }
    }
   
}


mainButton.addEventListener('click', function(e){
    e.preventDefault()
    heading.innerText = `Welcome, Players!`
    // gameStarted = true
    // deleteButton.style.display = 'none'
    startGame()
})

function remove_player(playerDiv, player){
    playerDiv.innerHTML=''
    let index = currentPlayers.indexOf(player)
    currentPlayers.splice(index, 1)
    
    if (currentPlayers.length === 4){
        mainButton.style.display = 'block'
     }
    else {
        mainButton.style.display = 'none'
        heading.innerText = 'Choose 4 Players'
    }
    render()          
}

function startGame() {
    view.innerHTML = ''
    fetchRounds()
}

function fetchRounds() {
    fetch('http://localhost:3000/rounds')
    .then(res => res.json())
    .then(json => allRounds= json)
    .then(fetchRound)
}

function fetchRound(){
   let randomRound = allRounds[Math.random() * allRounds.length | 0]

   fetch(`http://localhost:3000/rounds/${randomRound.id}`)
   .then(res => res.json())
   .then(json => currentRound = json)
   .then(renderRound)  
}

function renderRound(){
    let img = ce('img')
    img.src = currentRound.image_url
    view.append(img)
}


function fetchQuotes (){
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(json => all_quotes = json)
    .then(renderQuotes)
}


document.addEventListener('DOMContentLoaded', () => {
    fetchPlayers()
})