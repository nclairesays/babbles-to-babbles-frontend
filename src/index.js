const url ='https://protected-cliffs-89398.herokuapp.com'
// const url = 'http://localhost:3000'
const characterDataURL = `${url}/characters`


const ce = (arg) => {return document.createElement(arg)}
const qs = (arg) => {return document.querySelector(arg)}

const main = qs('#all-characters-list')
let heading = qs('#heading')
// let span = qs('span')
let characters
let currentPlayers = []
let view = qs('#view')
let mainButton = qs('#main-button')
let gameStarted = false
let randomCartoon
let jumboSpan = qs('#span-one')
let charArray = []
let jumbotron = qs('.jumbotron')
let i = 0 //used as round and index
let playerForm
let judge
let playerComment;
let playerCaptionClicks
let judgeView = qs('#judge')
let playerView = qs('#player-view')
let charView = qs('#all-characters-view')
let playerSpan = qs('#player-span')
let quotesArr
let winningPlayer

const fetchCharacters = () => {
    fetch(characterDataURL)
        .then(res => res.json())
        .then(res => characters = res)
        .then(renderCharacterCards)
}
const renderCharacterCards = () => {
    main.innerHTML = ''
    characters.forEach((character) => {
        // const characterDiv = ce('div')
        const characterDiv = ce('figure')
        const characterImage = ce('img')
        const figCaption = ce('figcaption')

        characterDiv.style.width = '20%'
        characterDiv.style.float = 'left'
        characterDiv.dataset.id = character.id

        if(character.id % 2 == 0) {characterDiv.style.backgroundColor = "#eee"}
        
        characterDiv.addEventListener('click', function(){
            choosePlayer(character)
        })
        
        characterImage.dataset.character_image = character.character_image
        characterImage.setAttribute('src', character.character_image)
        characterImage.setAttribute('class', 'img-responsive')
        characterImage.setAttribute('style', "width:100%")
        
        figCaption.innerText = `${character.name}`
        characterDiv.append(characterImage, figCaption)


        main.append(characterDiv)
    })
}


function choosePlayer(player){
    if (currentPlayers.includes(player) === true){
        alert("choose a more original guy, plz")
    }
    else if(currentPlayers.length < 4){
        currentPlayers.push(player)
        heading.innerText = 'Chosen Players'
        renderJumbotron()
    }
    else{
        alert("Woah, 4 players only!")
    }
}

let renderJumbotron = function(){
    jumboSpan.innerHTML = ''
    

    currentPlayers.forEach(function(player){
        
        let playerDiv = ce('figure')
        let playerImage = ce('img')
        let deleteButton = ce('button')
        let figCaption = ce('figcaption')
        
        playerDiv.style.width = '24%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id

        // playerDiv.innerHTML = `<p>${player.name}</p>`
        
        deleteButton.innerText = 'X'
        playerDiv.appendChild(deleteButton)

        playerImage.dataset.character_image = player.character_image
        playerImage.setAttribute('src', player.character_image)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")

        // figCaption.innerText = `${player.name}`
        // figCaption.style.fontWeight = 'bold'
        
        
        playerDiv.append(playerImage, figCaption)
        jumboSpan.append(playerDiv)
        
        if (currentPlayers.length === 4 && gameStarted === false){
            mainButton.style.display = 'block'
            heading.innerText = 'Click Start Game'
            deleteButton.addEventListener('click', function(e){
                e.preventDefault()
                remove_player(playerDiv, player)
            })
        }
        else if (currentPlayers.length === 4 && gameStarted === true && i === 0){
            deleteButton.style.display = 'none'
            mainButton.style.display = 'none'
            jumboSpan.innerHTML = ''
        }
        else if (i > 0 && i < 4){
            jumboSpan.innerHTML = ''
            deleteButton.style.display = 'none'
            mainButton.style.display = 'block'
            mainButton.innerText = 'Next Round'
            mainButton.addEventListener('click', function(){
                playerView.innerHTML = ''
                judgeView.innerHTML = ''
                playerSpan.innerHTML = ''
                mainButton.style.display = 'none'
                renderGameView()
            })
        }
      

        else {
            deleteButton.addEventListener('click', function(e){
                e.preventDefault()
                remove_player(playerDiv, player)
            })
        }
    })
}
mainButton.addEventListener('click', function(e){
    e.preventDefault()
    gameStarted = true
    heading.innerText = `Write your best caption!`
    startGame()
    renderJumbotron()
})


// const CharacterCard = (character) => {
//     const characterDiv = ce('div')
//     const characterImage = ce('img')

//     characterDiv.style.width = '20%'
//     characterDiv.style.float = 'left'
//     characterDiv.dataset.id = character.id
//     characterDiv.innerHTML = `<p>${character.name}</p>`
    
//     characterDiv.addEventListener('click', function(){
//         choosePlayer(character)
//     })
    
//     characterImage.dataset.character_image = character.character_image
//     characterImage.setAttribute('src', character.character_image)
//     characterImage.setAttribute('class', 'img-responsive')
//     characterImage.setAttribute('style', "width:100%")
    
//     characterDiv.append(characterImage)

//     return characterDiv

// }

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
}

function startGame() {
    jumboSpan.innerHTML = ''
    renderGameView()
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters()
    
})