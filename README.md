# BABBLES TO BABBLES

## FOR BACKEND

<https://github.com/nclairesays/babbles-to-babbles-backend/>

## ABOUT

Apples-to-Apples inspired game.
Four players will choose their characters. Each round will start with one rotating judge and three blind caption writers. After all players have submitted their captions, a random Newyorker cartoon will render and the judge will choose their favorite caption for that image. After each player has served as judge, the game ends and the winner will be declared.
![alt text](https://imgc.artprintimages.com/img/print/two-cave-people-ask-whether-a-cave-drawing-needs-a-caption-title-it-beg-new-yorker-cartoon_u-l-pysh070.jpg?h=900&w=900)

## REQUIREMENTS

Requirements: Rails & JSON-Server

[Install Ruby on Rails](https://guides.rubyonrails.org/v5.0/getting_started.html#installing-rails)

Seed the data and migrate.
```
rails db:seed
rails db:migrate
```

Start Rails Server. By default, it should be running on port 3000. If not, you can add a -p 3000 flag to change the ports. 
```rails server```



## HOW TO PLAY

1. Open the ```index.html``` file (from the frontend directory) into your browser. 
2. Choose 4 different characters for 4 players 
3. First round, player 1 will be the Judge. Players 2-4 will take turns writing their random caption for an unknown image.
4. When all players have submitted, a random image will appear. The Judge will choose the best image-caption combo.
5. After each round, another player will be the judge, and the instructions are repeated.
6. When each all players have been the judge, the game is over and the overall game winner will be displayed.
