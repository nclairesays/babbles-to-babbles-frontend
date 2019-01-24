const characterDataURL = 'http://localhost:3000/characters'

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}

let main = qs('#all-characters-list')
let heading = qs('#heading')
let span = qs('span')
let characters
let currentPlayers = []
let currentRound =[]
let view = qs('#view')
let mainButton = qs('#main-button')
let gameStarted = false
let rounds = []


const fetchCharacters = () => {
    fetch(characterDataURL)
        .then(res => res.json())
        .then(res => characters = res)
        .then(renderCharacterCards)
}

const renderCharacterCards = () => {
    main.innerHTML = ''
    
    characters.forEach((character) => {
        const characterDiv = ce('div')
        const characterImage = ce('img')
        
        characterDiv.style.width = '20%'
        characterDiv.style.float = 'left'
        characterDiv.dataset.id = character.id  //why?
        characterDiv.innerHTML = `<p>${character.name} </p>`
        
        characterDiv.addEventListener('click', function(){
            choose_players(character)
        })
        
        characterImage.dataset.character_image = character.character_image
        characterImage.setAttribute('src', character.character_image)
        characterImage.setAttribute('class', 'img-responsive')
        characterImage.setAttribute('style', "width:100%")
        
        characterDiv.append(characterImage)
        main.append(characterDiv)
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
        playerDiv.innerHTML = `<p>${player.name}</p>`
        
        deleteButton.innerText = 'X'
        playerDiv.appendChild(deleteButton)
        
        playerImage.dataset.character_image = player.character_image
        playerImage.setAttribute('src', player.character_image)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
        
        playerDiv.append(playerImage)
        span.append(playerDiv)
        
        if (gameStarted === false) { //if true, remove delete button
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
    fetchCharacters()
})



























































// const playerDataURL = 'http://localhost:3000/players'
//
// const ce = (arg) => {
//     return document.createElement(arg)
// }
//
// const qs = (arg) => {
//     return document.querySelector(arg)
// }
//
// const main = qs('main')
//
// let players;
// let currentPlayers = [];
// // let selectedPlayers;
//
// const render = () => {
//     fetch(playerDataURL)
//         .then(res => res.json())
//         .then(res => {
//             players = res
//             renderPlayerCards(players)
//         })
// }
//
// const renderPlayerCards = (players) => {
//     main.innerHTML = ''
//     players.forEach((player) => {
//         const playerDiv = ce('div')
//         // const playerName = ce('p')
//         const playerImage = ce('img')
//
//         // playerDiv.setAttribute('class', 'col-sm-3')
//         playerDiv.style.width = '20%'
//         playerDiv.style.float = 'left'
//         playerDiv.dataset.id = player.id
//         playerDiv.innerHTML = `<p>${player.name}</p>`
//
//         playerDiv.addEventListener('click', () => {
//             choosePlayers(player)
//         })
//
//         main.append(playerDiv)
//
//         playerImage.dataset.image_url = player.image_url
//         playerImage.setAttribute('src', player.image_url)
//         playerImage.setAttribute('class', 'img-responsive')
//         playerImage.setAttribute('style', "width:100%")
//
//         playerDiv.append(playerImage)
//
//     })
// }
//
// const choosePlayers = (player) => {
//
//     if (currentPlayers.length < 4) {
//         currentPlayers.push(player)
//         let heading = qs('#heading')
//         let span = qs('span')
//
//         heading.innerText = 'Chosen Players'
//
//         const playerDiv = ce('div')
//         const playerImage = ce('img')
//
//         playerDiv.style.width = '24%'
//         playerDiv.style.float = 'left'
//         // playerDiv.style.alignContent = 'center'
//         playerDiv.dataset.id = player.id
//         playerDiv.innerHTML = `<p>${player.name}</p>`
//
//         playerImage.dataset.image_url = player.image_url
//         playerImage.setAttribute('src', player.image_url)
//         playerImage.setAttribute('class', 'img-responsive')
//         playerImage.setAttribute('style', "width:100%")
//
//         playerDiv.append(playerImage)
//
//         span.append(playerDiv)
//
//         if (currentPlayers.length === 4) {
//             let button = ce('button')
//             button.innerText = 'Start Game'
//             span.append(button)
//
//             button.addEventListener('click', (e) => {
//                 e.preventDefault()
//                 startGame()
//             })
//
//         }
//
//     }
//
// }
//
// const startGame = () => {
//     let view = qs('#view')
//     view.innerHTML = ''
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//     render()
// })