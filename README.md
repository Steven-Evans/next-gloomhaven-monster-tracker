# Gloomhaven Tracker

### About the Game

Gloomhaven is a Dungeon Crawler RPG Legacy Board Game. You and your party of mercenaries choose a scenario, set up rooms, monsters, etc by referring to the scenario book, and get rewards and new scenarios upon their completion. During the game, all players choose cards they want to play which have initiative and on a countdown, everyone announces their number for turn order. These ability cards let players attack, damage, and kill monsters as they appear in the scenario and damage is tracked on a small envelope with six or ten areas for placing tokens.

Two pain points and time sinks my group has when we play are:
+ Having to re-state our initiative values because announcing all at the same time along with monster cards is too much to remember without repeatedly looking around the table.
+ Certain monsters, namely Oozes, can have ten alive at once and have a lot of HP. When they're all taking damage, placing tokens in the ten small areas on their envelope is frustrating both for counting how much damage each individual monster has and handling the tokens so they don't splash the tokens of other monsters.

### About the App

The goal of the app is to allow players to input their own initiatives, having turn order displayed automatically, while also allowing monster health to be easily parsed and changed. Having the app flip monster ability cards is still up in the air because those cards are fun to flip but would also mean their initiatives would need to be inputted manually as well. This means having multiple people connect to the same "room" to view and change monsters and initiative.

I started from a fresh [next.js](https://github.com/zeit/next.js) to try something new (Server-Side Rendering) while also basing on something I've used (React). To have multiple players connect to the same "room", I'm trying out Server Sent Events because I haven't used them before and the clients aren't sending a huge stream of information to the server, which is where sockets would be most useful. Events and Async are handled by Redux-Observable which writes in a functional style. Rooms are denoted by 4 letter codes similar to Jackbox games. 
