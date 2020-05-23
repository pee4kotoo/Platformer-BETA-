//all needed functions for Beta



// PLAY LVL 1 - what happens when you press "play"
function activatePlayButton()
{
    //level 1 starts
    l1 = true;

    //creates a timer
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 30;
    begginingText.exists = false;
    playButton.exists = false;

    //killing first player and coin and resetting score
    coin.kill();
    player.kill();
    score = 0;
    text.setText("Score: " + score);

    //creating first coin and player
    createCoin();
    createPlayer();
    
}


// END LEVEL - decides when you lose and when you win
function endLevel()
{
    if (score == 60 && totalTime > 0 && l1)
    {
        winLevel1()
    }
    else if(totalTime == 0 && l1)
    {
        loseLevel1()
    }
    else if(score == 100 && totalTime > 0 && l2)
    {
        winLevel2()
    }
    else if(score < 100 && totalTime == 0 && l2)
    {
        loseLevel2()
    }
}


//WIN LVL 1 - what happens when you win lvl 1

function winLevel1()
{
    // displays end text
    endText.exists = true;
    endText.setText("Браво! Ти завърши първото ниво!")

    //stops time
    game.time.events.remove(myLoop);


    //removes other texts and kills player and coin
    begginingText.existas = false;
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //shows tryAgain button
    nextLevelButton.exists = true

    //lvl 1 ends
    l1 = false;
    
}



//LOSE LVL 1 - what happens when you lose lvl 1
function loseLevel1()
{
    // displays end text
    endText.exists = true;
    endText.setText("О, не! Не успя на време! Опитай отново!")

    //stops time
    game.time.events.remove(myLoop);


    //removes other texts and kills player and coin
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //показва бутон try again
    tryAgainButton.exists = true

    //lvl 1 свършва
    l1 = false;
}


//опитай отново ниво 1
function activateTryAgainButton()
{
    //създава таймер със 30 секунди
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 30;
    score = 0;

    endText.exists = false;
    tryAgainButton.exists = false;

    timerText.exists = true;
    text.exists = true;
    text.setText("Score: " + score)

    createPlayer();
    createCoin();

    l1 = true;
}



//Какво става когато натиснеш Next
function activateNextLevelButton()
{
    l1 = false;
    //ниво 2 започва
    l2 = true;

    //слага текст
    endText.exists = false;
    begginingText.setText("Ниво две. Събери 100 точки за 28 секунди!")
    begginingText.x = game.world.centerX - 220;
    begginingText.exists = true;  
    timerText.exists = false;
    text.exists = false;  

    
    playButton2.exists = true;

    nextLevelButton.exists = false;
}





//започване на второ ниво
function activatePlayButton2()
{
    //зьапочва второ ниво
    l2 = true;

    //започва таймер
    myLoop = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    totalTime = 28;
    score = 0;

    
    endText.exists = false;
    begginingText.exists = false;
    tryAgainButton.exists = false;
    playButton2.exists = false;
    timerText.exists = true;
    text.exists = true;
    text.setText("Score: " + score)

    
    createPlayer();
    createCoin();
}

//Победа на второ ниво
function winLevel2()
{
    
    endText.exists = true;
    endText.setText("Браво! Ти завърши второто ниво!")

   
    game.time.events.remove(myLoop);
    score = 0;
    totalTime = 0;

    
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

 
    

    
    l2 = false;
}


//Когато загубиш 2 ниво
function loseLevel2()
{
    // показва текста
    endText.exists = true;
    endText.setText("О, не! Не успя на време! Опитай отново!")

    //спира времето и нулира точките
    game.time.events.remove(myLoop);
    score = 0;
    totalTime = 0;

    //премахва текст и играча
    timerText.exists = false;
    text.exists = false
    player.kill()
    coin.kill()

    //shows tryAgain button


    //второ ниво свършва
    l2 = false;
}



//какво да правиш всяка секунда
function updateCounter() {

    totalTime--;

    timerText.setText("Time left: " + totalTime);

}
//анимации за движенията
function playerAnimations(player)
{
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.animations.play("Right");
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        player.animations.play("Left");
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        player.animations.play("Jump");
    }
    else{
        if(player.frame == 0 || player.frame == 1 ||player.frame == 2 ||player.frame == 3 ||player.frame == 4 ||player.frame == 5 ||player.frame == 6 ||player.frame == 7 || player.frame == 8 )
        {
            player.frame = 0;
        }
        else if(player.frame == 9 || player.frame == 10 ||player.frame == 11 ||player.frame == 12 ||player.frame == 13 ||player.frame == 14 ||player.frame == 15 ||player.frame == 16 || player.frame == 17 )
        {
            player.frame = 17;
        } 
    }
}

//създава монетата
function createCoin() {
    
    coin = allCoins.create(game.world.randomX,game.world.randomY-150, 'coin');
    game.physics.enable(coin, Phaser.Physics.ARCADE);
    coin.scale.setTo(0.5);
    coin.body.velocity.setTo(0, 200);
    coin.body.collideWorldBounds = true;
    coin.body.bounce.set(0.6);
    coin.body.gravity.set(0, 2400);
    coin.animations.add('walkLeft', [6, 7, 8, 9, 10, 11], 10, true).play();
}

//съзбава играча
function createPlayer()
{
    player = allPlayers.create(600, 0, 'guy');
        
    player.animations.add('Right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
    player.animations.add('Left', [9, 10, 11, 12, 13, 14, 15, 16, 17], 12, true);
    player.animations.add("Jump", [27]);
    
    player.scale.setTo(0.5);
}

//спира движенията на играча
function playerStopVelocity(player)
{
    player.x.velocity = 0;
    player.y.velocity = 0;
}

//движение на играча
function playerXMovement(speed)
{
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player.x -= speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.x += speed;
    }
}


function initPlatform(platformObject, lenght, hieght)
{
    platformObject.body.immovable = true;
    platformObject.scale.setTo(lenght, hieght);
    platformObject.body.allowGravity = false ;
}