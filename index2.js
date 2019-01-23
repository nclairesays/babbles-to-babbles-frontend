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

function fetchQuotes (){
    fetch('http://localhost:3000/quotes')
    .then(res => res.json())
    .then(json => all_quotes = json)
    .then(render_quotes)
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
        player_header = c('h1')
        player_header.innerText = player.name
        let a = all_quotes[Math.random() * all_quotes.length | 0]
        let b = all_quotes[Math.random() * all_quotes.length | 0]
        let c = all_quotes[Math.random() * all_quotes.length | 0]
        let d = all_quotes[Math.random() * all_quotes.length | 0]
        quote_bucket = [a,b,c,d]
        
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
