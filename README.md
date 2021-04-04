# Street Fighter 2 Themed Random Game Selector
- I stream on Twitch. I'm starting to play Kaizo Mario Monday through Thursday, and whatever games viewers use their channel points to vote on Friday through Sunday. Viewers can vote multiple times for the same game. Once I complete a variety game, I'm using this app to random select the next game to play. However, the random selection is voted based on the games which have more votes. They will have a better chance of winning. Sometimes, streamers will use a wheel. I made a select screen that resembles Street Fighter 2.

## Press Start
- Click on "Press Start" and then an intro with the SF2 music is revealed. 

![image](https://user-images.githubusercontent.com/22201101/113523985-e0778a00-9568-11eb-86ef-97adeb2134ba.png)
![image](https://user-images.githubusercontent.com/22201101/113523989-e5d4d480-9568-11eb-88a5-b833fd07bf8d.png)
![image](https://user-images.githubusercontent.com/22201101/113523993-ebcab580-9568-11eb-9b85-a86b27a36ba0.png)
- Click on "Continue" to proceed to the "player" or game selection screen

## Game Select
- Press left, right, up, or down to move the selector.
- When the selector is moved, the title, stats, and image will change accordingly on the right hand side.
- "Random Select" below the game select area will move the selector randomly. This is just a performance to simulate randomness. The game is still chosen randomly, but it is not necessary to move the cursor randomly to choose a random game based on the number of votes. It's just for the Street Fighter aesthetic feel (along with the music and select sound effects).
- Whichever game the selector lands on, that will be the next game that I will play on stream
- Play, pause, and stop buttons are above the game selection area.
![image](https://user-images.githubusercontent.com/22201101/113524517-68ab5e80-956c-11eb-8ef0-a0369c1eb891.png)


## Limitations
- Image files are loaded locally. Images are not being pulled from an API.
- When pressing up or down for the game select area, the select cursor will always move 10 spaces.I made this app mobile responsive, but if this app is being used on a screen size that wasn't accounted for just because there are so many possible screen sizes, its possible that there may be more or less than 10 game icons in a row. This means that the selector will not move straight up or down from where it is originating.
- When moving the selector to any given row, due to the border, it creates a gap between the row it is on and the row below it

## Future Updates Planned
- Use an API like IGDB to retrieve images instead of loading images locally
- Add authentication so users can create their own profiles
- Add feature for users to look up games and add the images accordingly or add their own images if the API fails to find them
- Add feature for users to input how many votes any inputted game has
- Add feature for users to change music, background, select sound, logo
