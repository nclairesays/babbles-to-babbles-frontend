const renderGameView = () => {
    
    charView.innerHTML = ''
    // charView.style.backgroundColor = 'red'
    view.setAttribute('style', 'padding: 7vh 10vw 0 10vw')
    playerForm = ce('form')
    playerForm.setAttribute('style', 'display: flex; flex-direction: column; flex: 1')
    judge = currentPlayers[i]
    playerCaptionClicks = 0
    quotesArr = []
    
    currentPlayers.forEach((player) => {
        if (player !== judge) {
            let charFormDiv = ce('div')
            charFormDiv.dataset.id = player.id
            charFormDiv.setAttribute('style', 'display: inline-block')
            // charFormDiv.style.backgroundColor = 'green'
            charFormDiv.style.flex = "1"
            // charFormDiv.style.border = "1px solid black"

            
            let playerImg = ce('img')
            playerImg.setAttribute('src', player.character_image)
            playerImg.setAttribute('style', 'display: inline-block; max-width: 8em')
            
            let playerInput = ce('input')
            playerInput.setAttribute('type', 'password')
            playerInput.setAttribute('placeholder', player.name)
            playerInput.setAttribute('id', player.id)
            playerInput.setAttribute('style', 'height: 5vh, width: 5vw')
    
            playerComment = ce('button')
            playerComment.setAttribute('id', 'comment-button')
            playerComment.innerText = 'Submit Caption'
            
            charFormDiv.append(playerImg, playerInput, playerComment)
            playerForm.append(charFormDiv)
            
            playerComment.addEventListener('click', (e) => {
                e.preventDefault()
                charFormDiv.innerHTML = ''
                player.quote = playerInput.value
                quotesArr.push(player.quote)
                charFormDiv.append(playerImg)
                playerCaptionClicks++
                if(playerCaptionClicks == 3){
                    fetchCartoon()
                }
            })
        }
    })

    let judgeImage = ce("img")
    let judgeTitle = ce("h3")
    judgeImage.setAttribute("src", judge.character_image)
    judgeImage.setAttribute('class', 'img-responsive')
    judgeTitle.innerText = `Judge ${judge.name}`
        
    // judgeView.style.backgroundColor = 'blue'

    judgeView.append(judgeImage, judgeTitle )
   
    playerSpan.append(playerForm)
    playerView.append(playerSpan)

  
    // playerView.append(playerForm)

     
    
}

function fetchCartoon(){
    playerView.innerHTML = ''
    fetch('https://www.newyorker.com/cartoons/random/randomAPI')
    .then(res => res.json())
    .then(res => randomCartoon = res[0].src)
    .then(renderCartoonAndCaptions)
    .then(heading.innerText = 'Choose the Best Caption')
}

function renderCartoonAndCaptions(){
    let img = ce('img')
    img.src = randomCartoon
    // img.setAttribute('style', 'max-height: 10%, max-width: 10%')
    let captionOptions = ce('div')
    playerView.append(img, captionOptions)
    
    currentPlayers.forEach((player) => {
        if (player !== judge) {
            let p = ce('p')
            let options = ce('h3')
            options.innerText = player.quote
            options.className = "option"
            p.append(options)
            p.addEventListener('click', function(){
                playerView.innerHTML = ''
                let winMessage = ce('h2')
                heading.innerText = `${player.name} wins this round!`
                playerView.append(img, p)
                i++
                player.round_wins += 1
                fetchPostWins(player, randomCartoon)
                if (i === 4){
                    renderWinner()
                }
                else {
                    renderJumbotron()
                }
            })
            captionOptions.append(p)
        }
    })
}

function fetchPostWins(player, randomCartoon){
    fetch('http://localhost:3000/wins', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            character_id: player.id,
            quote: player.quote,
            image_url: randomCartoon
        })
    })
}

function renderWinner(){
  
    heading.innerText = 'Game Over, Babblers!'
    view.innerHTML = ''
    view.style.backgroundColor = "#FFDF00"

    let ref = 0
    winningPlayer = []
    currentPlayers.forEach(function(player){
        if(player.round_wins > ref){
            ref = player.round_wins
            winningPlayer.splice(0, winningPlayer[-1], player)
            console.log("IF!",  'currentplayer', player, 'ref', ref, 'winning player array', winningPlayer)
        }
        else if (player.round_wins == ref){
            console.log("ELSE IF 1!", 'currentplayer', player, 'ref', ref, 'winning player array', winningPlayer)
            winningPlayer.push(player)
            console.log("ELSE IF 2!", 'ref', ref, 'winning player array', winningPlayer)

        } else{
            console.log("ELSE!",'currentplayer', player, 'ref', ref, 'winning player array', winningPlayer)
        }
    })

    if (winningPlayer.length == 1){
        let winnerImg = ce('img')
        winnerImg.setAttribute('src', winningPlayer[0].character_image)
        // winnerImg.setAttribute('style', 'display: inline-block; max-width: 20vw; max-height: 50vh; padding:20px;')
        let winnerBanner = ce('h2')
        winnerBanner.innerHTML = `🏆🏆🏆🏆🏆🏆 <br> Scoring ${winningPlayer[0].round_wins} out of 4 rounds, <br>  ${winningPlayer[0].name} wins the game! <br> 🏆🏆🏆🏆🏆🏆`
        heading.append(winnerBanner)
        view.append(winnerImg)

    } else {
        let winnerBanner = ce('h2')
        let names = []
        winningPlayer.forEach(player => names.push(player.name))
       
        if (names.length == 2) { sNames = names.join(' and ');}
        else { sNames = names.slice(0, -1).join(', ') + ', and ' + names.slice(-1); }

        winnerBanner.innerHTML = `🏆🏆🏆🏆🏆🏆 <br> It is a TIE! <br> ${sNames} win ${ref} out of 4 rounds! <br> 🏆🏆🏆🏆🏆🏆`
        heading.append(winnerBanner)
        winningPlayer.forEach(winningPlayers => {
            let winnerImg = ce('img')
            winnerImg.setAttribute('src', winningPlayers.character_image)
            // winnerImg.setAttribute('style', 'flex: 1')
            winnerImg.setAttribute('style', 'display: inline-block; width: 20w; max-width: 20vw;min-width: 20vw; max-height: 50vh; padding:0 10px 10px 10px;')
            view.appendChild(winnerImg)
        })
    }

        
}