//creating game
const game = new Phaser.Game(1340,610, Phaser.AUTO, 'game-canvas', { preload, create, update });


//all needed variables
var player;
var coin;
var ground;
var ground1;
var ground2;
var ground3;
var timer;

var allCoins;
var allPlayers;
var allPlatforms;
var score = 0;
var l1 = false;
var l2 = false;
var e = 1;

var text;
var timerText;
var endText;
var begginingText;

var nextLevelButton;
var playButton;
var playButton2;
var tryAgainButton;

var total;
var totalTime = 30;
var speed;
var playerCollisionInCreatePlatform;
var coinCollisionInCreatePlatform;

var collectCoins;

var myLoop;

//game functions

function preload() {
    game.load.spritesheet('coin', 'Resources/coin.png', 500 / 6, 280 / 3);
    game.load.spritesheet('guy', 'Resources/walkingsprite.png', 1296/9, 721 / 4);
    game.load.image("background", "Resources/Background.png")
    game.load.image("platform", "Resources/Platform.png")
    game.load.image('playButton', 'Resources/button.png')
    game.load.image('tryAgainButton', 'Resources/tryAgainButton.png')
    game.load.image('nextLevelButton', 'Resources/nextLevelButton.png')
}

function create() 
{
    //setting background
    const background = game.add.sprite(0,0, "background")
    background.scale.setTo(1.07, 0.85)

    //setting gravity
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 600;
    
    //creating the group of coins
    allCoins = game.add.group();
    allCoins.enableBody = false;
    allCoins.physicsBodyType = Phaser.Physics.ARCADE;

    //creating text
    text = game.add.text(10, 10,"Score: " + score);
    timerText = game.add.text(10, 50,"Time left: " + totalTime);
    begginingText = game.add.text(game.world.centerX-525, 100, "Здравей! Сега си на първо ниво.Всяка монета е 10 точки.Събери 60 точки за 30 секунди!")
    endText = game.add.text(game.world.centerX-300, 100,"");


    //creating the group of players
    allPlayers = game.add.group();
    allPlayers.enableBody = true;
    allPlayers.physicsBodyType = Phaser.Physics.ARCADE;

    //creating group of allPlatforms
    allPlatforms = game.add.group();
    allPlatforms.enableBody = true;

    //creating platform
    ground = allPlatforms.create(0, 499, 'platform');
    initPlatform(ground, 3.7, 0.5);

    //creating platform1
    ground1 = allPlatforms.create(300, 300, 'platform');
    initPlatform(ground1, 0.5, 0.5);

    //creating platform2
    ground2 = allPlatforms.create(800, 150, 'platform');
    initPlatform(ground2,3, 0.5);

    //creating platform3
    ground3 = allPlatforms.create(800, 400, 'platform');
    initPlatform(ground3, 0.5, 0.5);

    //starting gravity
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 600;

    //creating a button
    playButton = game.add.button(game.world.centerX - 120, game.world.centerY - 43, 'playButton', activatePlayButton, this);
    tryAgainButton = game.add.button(game.world.centerX - 100, game.world.centerY - 43, 'tryAgainButton', activateTryAgainButton, this);
    tryAgainButton.exists =false;
    nextLevelButton = game.add.button(game.world.centerX - 120, game.world.centerY - 43, 'nextLevelButton', activateNextLevelButton, this);
    nextLevelButton.scale.setTo(0.1, 0.1)
    nextLevelButton.exists = false;
    playButton2 = game.add.button(game.world.centerX - 120, game.world.centerY - 43, 'playButton', activatePlayButton2, this)
    playButton2.exists = false;

    //before game starts
    createCoin();
    createPlayer();
}

function update(){

    //aligning the game in the center
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();

    playerAnimations(player);

    playerXMovement(6);


    //making objects collide
    var playerCollision = game.physics.arcade.collide(player, ground);
    var playerCollision1 = game.physics.arcade.collide(player, ground1);
    var playerCollision2 = game.physics.arcade.collide(player, ground2);
    var playerCollision3 = game.physics.arcade.collide(player, ground3);
    var coinCollision = game.physics.arcade.collide(coin, ground);
    var coinCollision1 = game.physics.arcade.collide(coin, ground1);
    var coinCollision2 = game.physics.arcade.collide(coin, ground2);
    var coinCollision3 = game.physics.arcade.collide(coin, ground3);
    

    //player jumping
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && playerCollision )
    {
        player.body.velocity.y = -350;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && playerCollision1 )
    {
        player.body.velocity.y = -450;
    }
    
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && playerCollision2 )
    {
        player.body.velocity.y = -400;
    }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && playerCollision3 )
    {
        player.body.velocity.y = -400;
    }

    game.physics.arcade.collide(
        player,
        allCoins,
        (sprite, star) => {

            coin.kill();
            score += 10;
            text.setText("Score: " + score);
            createCoin();

        },
        null,
        this
    );

    //respawning both coins and player if it gets out of the world
    
    if(coin.y > 500)
    {
        coin.kill();
        createCoin();
    }

    if(player.y > 500)
    {
        player.kill();
        createPlayer();
        
    }

    endLevel()
}


