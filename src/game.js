const renderGameView = () => {
    
    charView.innerHTML = ''
   
    playerForm = ce('form')
    playerForm.setAttribute('style', 'display: flex; flex-direction: column')
    judge = currentPlayers[i]
    playerCaptionClicks = 0
    quotesArr = []
    
    currentPlayers.forEach((player) => {
        if (player !== judge) {
            let charFormDiv = ce('div')
            charFormDiv.dataset.id = player.id
            charFormDiv.setAttribute('style', 'display: inline-block')
            // charFormDiv.style.display = 'inline'
            
            let playerImg = ce('img')
            playerImg.setAttribute('src', player.character_image)
            playerImg.setAttribute('style', 'display: inline-block; max-width: 5em')
            
            let playerInput = ce('input')
            playerInput.setAttribute('type', 'password')
            playerInput.setAttribute('placeholder', player.name)
            playerInput.setAttribute('id', player.id)
    
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
    judgeTitle.innerText = `Your Judge for this round is....`
    judgeView.append(judgeTitle, judgeImage )

    playerSpan.append(playerForm)
    playerView.append(playerSpan)
     
    
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
    let captionOptions = ce('div')
    playerView.append(img, captionOptions)
    
    currentPlayers.forEach((player) => {
        if (player !== judge) {
            let p = ce('p')
            let options = ce('h3')
            options.innerText = player.quote
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
    // heading.innerText = 'Game Over, Babblers!'
    // view.innerHTML = ''
    // let ref = 0
    // winningPlayer = null
    // currentPlayers.forEach(function(player){
    //     if(player.round_wins > ref){
    //         ref = player.round_wins
    //         winningPlayer = player
    //     }
    // })
    // let winnerImg = ce('img')
    // winnerImg.setAttribute('src', winningPlayer.character_image)
    // let winnerBanner = ce('h2')
    // winnerBanner.innerText = `🏆🏆🏆🏆🏆🏆 Scoring ${winningPlayer.round_wins} out of 4 rounds, ${winningPlayer.name} wins the game! 🏆🏆🏆🏆🏆🏆`
    // view.append(winnerBanner, winnerImg)

    heading.innerText = 'Game Over, Babblers!'
    view.innerHTML = ''
    let ref = 0
    winningPlayer = []
    currentPlayers.forEach(function(player){
        if(player.round_wins > ref){
            ref = player.round_wins
            winningPlayer.splice(0, winningPlayer.length-1, player)
            console.log('REF', ref, 'WINNING PLAYER', winningPlayer)
        }
        else if (player.round_wins == ref){
            console.log('the player', player)
            winningPlayer.push(player)
            console.log("WINNING PLAYER ARRAY", winningPlayer)

        }
    })

    if (winningPlayer.length == 1){
        let winnerImg = ce('img')
        winnerImg.setAttribute('src', winningPlayer[0].character_image)
        let winnerBanner = ce('h2')
        winnerBanner.innerText = `🏆🏆🏆🏆🏆🏆 Scoring ${winningPlayer[0].round_wins} out of 4 rounds, ${winningPlayer[0].name} wins the game! 🏆🏆🏆🏆🏆🏆`
        view.append(winnerBanner, winnerImg)
    } else {
        let winnerBanner = ce('h2')
        let names = []
        winningPlayer.forEach(player => names.push(player.name))
       
        if (names.length == 2) { sNames = names.join(' and ');}
        else { sNames = names.slice(0, -1).join(', ') + ', and ' + names.slice(-1); }

        winnerBanner.innerText = `🏆🏆🏆🏆🏆🏆 It was a TIE! ${sNames} win ${ref} out of 4 rounds! 🏆🏆🏆🏆🏆🏆`
        view.append(winnerBanner)
        winningPlayer.forEach(winningPlayers => {
            let winnerImg = ce('img')
            winnerImg.setAttribute('src', winningPlayers.character_image)
            view.appendChild(winnerImg)
        })
    }

        
}