const playerDataURL = 'http://localhost:3000/players'

const ce = (arg) => {
    return document.createElement(arg)
}

const qs = (arg) => {
    return document.querySelector(arg)
}

const main = qs('main')

let players;

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
        // const playerName = ce('p')
        const playerImage = ce('img')
        
        // playerDiv.setAttribute('class', 'col-sm-3')
        playerDiv.style.width = '20%'
        playerDiv.style.float = 'left'
        playerDiv.dataset.id = player.id
        playerDiv.innerHTML = `<p>${player.name}</p>`
        
        main.append(playerDiv)
        
        playerImage.dataset.image_url = player.image_url
        playerImage.setAttribute('src', player.image_url)
        playerImage.setAttribute('class', 'img-responsive')
        playerImage.setAttribute('style', "width:100%")
        playerDiv.append(playerImage)
        
        
    })
}

document.addEventListener('DOMContentLoaded', () => {
    render()
})