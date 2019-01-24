c = function(tagName){ return document.createElement(tagName) }
s = function(element){ return document.querySelector(element) }

let all_quotes = []
let quote_bucket = []
let main
let players = []
let current_players = {}
let game_bucket = {} //key: player_name, value: quote they chose

function fetchPlayers (){
    fetch('http://localhost:3000/players')
    .then(res => res.json())
    .then(json => players = json)
    .then(render)
}


function render() {
  
    main = s('main')
    choose_players()
    render_quotes()
}


function choose_players(){
    current_players = [ 
        {'name': players[0].name, 'quote': ''},
        {'name': players[1].name, 'quote': ''},
        {'name': players[2].name, 'quote': ''},
        {'name': players[3].name, 'quote': ''}
    ]   
    fetchQuotes()
}

function render_quotes (){
    // main.innerHTML = ''
    
    current_players.forEach(function(player){
        player_header = document.createElement('h1')
        player_header.innerText = player.name
        let a = all_quotes[Math.random() * all_quotes.length | 0]
        let b = all_quotes[Math.random() * all_quotes.length | 0]
        let c = all_quotes[Math.random() * all_quotes.length | 0]
        let d = all_quotes[Math.random() * all_quotes.length | 0]
        quote_bucket = [a,b,c,d]
        console.log(quote_bucket)
        
        main.append(player_header, quote_bucket)
    })
    // let quotes_div = c('div')
}

function choose_quote() {
    quote_bucket.forEach(quote => {
        c('div')

    })
}


fetchPlayers()
