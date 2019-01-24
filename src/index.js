const characterDataURL = 'http://localhost:3000/characters'
const ce = (arg) => {return document.createElement(arg)}
const qs = (arg) => {return document.querySelector(arg)}

const main = qs('#all-characters-list')
let heading = qs('#heading')
let span = qs('span')
let characters
let currentPlayers = []


let currentRound =[]
let view = qs('#view')
let mainButton = qs('#main-button')
let gameStarted = false
let rounds = []
let randomCartoon
let jumbotron = qs('.jumbotron')


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
            choosePlayer(character)
        })
        
        characterImage.dataset.character_image = character.character_image
        characterImage.setAttribute('src', character.character_image)
        characterImage.setAttribute('class', 'img-responsive')
        characterImage.setAttribute('style', "width:100%")
        
        characterDiv.append(characterImage)

        main.append(characterDiv)
    })
}


function choosePlayer(player){
    if (currentPlayers.includes(player) == true){
        alert("choose a more original guy, plz")
    }
    else if(currentPlayers.length < 4){
        currentPlayers.push(player)
        heading.innerText = 'Chosen Players'
        renderJumbotron()
    }
    else{
        alert("woah, 4 players only, bruhsky")
    }
}

let renderJumbotron = function(){
    span.innerHTML = ''
    currentPlayers.forEach(function(player){

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
        
        if (currentPlayers.length === 4 && gameStarted === false){
            mainButton.style.display = 'block'
            heading.innerText = 'Click Start Game to Play'
        }

        else if (currentPlayers.length === 4 && gameStarted === true){
            deleteButton.style.display = 'none'
            mainButton.style.display = 'none'
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
    heading.innerText = `Welcome, Players!`
    gameStarted = true
    // deleteButton.style.display = 'none'
    startGame()
    renderJumbotron()
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
    // render()
}

function startGame() {
    view.innerHTML = ''
    fetchCartoon()
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


function renderQuoteForm(){
    currentPlayers.forEach(function(player){
        main.innerHTML = ''
        let quoteInput = ce('input')
        let characterDiv = ce('div')
        

    })
}

