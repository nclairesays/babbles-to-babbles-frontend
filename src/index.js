const characterDataURL = 'http://localhost:3000/characters'

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}


const main = qs('#all-characters-list')

let heading = qs('#heading')
let jumbotron = qs('.jumbotron')
let span = qs('span')
let characters
let currentPlayers = []

let currentRound =[]
let view = qs('#view')
let mainButton = qs('#main-button')
let gameStarted = false
let rounds = []
let randomCartoon


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
            choosePlayers(character)
        })
        
        characterImage.dataset.character_image = character.character_image
        characterImage.setAttribute('src', character.character_image)
        characterImage.setAttribute('class', 'img-responsive')
        characterImage.setAttribute('style', "width:100%")
        
        characterDiv.append(characterImage)
        main.append(characterDiv) 

    })
}

let choosePlayers = function(player){
    heading.innerText = 'Chosen Players'
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

        
        playerImage.dataset.character_image = player.character_image
        playerImage.setAttribute('src', player.character_image)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
       
        playerDiv.append(playerImage)
        span.append(playerDiv)
        
        console.log(playerDiv)
        view.innerHTML = playerDiv

        
        if (currentPlayers.length === 4){
            mainButton.style.display = 'block'
            heading.innerText = 'Click Start Game to Play'
        }
        else if (currentPlayers.length === 4 && gameStarted === true){
            deleteButton.style.display = 'none'
        }
        else {
            deleteButton.addEventListener('click', function(e){
                e.preventDefault()
                remove_player(playerDiv, player)
            })
        }
    }
}


mainButton.addEventListener('click', function(e){
    e.preventDefault()
    heading.innerText = `Welcome, Players!`
    gameStarted = true
    choosePlayers()
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
           
}

function startGame() {
    view.innerHTML = ''
    
}


function fetchCartoon(){
    fetch('https://www.newyorker.com/cartoons/random/randomAPI')
    .then(res => res.json())
    .then(res => randomCartoon = res[0].src)
    .then(renderCartoon)
}


function renderCartoon(){
    let img = ce('img')
    img.src = randomCartoon
    view.append(img)
}


document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters()

})