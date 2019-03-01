// create a new scene named "Game"
//let gameScene = new Phaser.Scene('Game');

// our game's configuration
var config = {
  type: Phaser.AUTO,
  width: 290,
  height: 350,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let mario;
let platforms;
let donk;

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
let marioSpeed = 1.5;
let enemyMaxY = 280;
let enemyMinY = 80;
let gameOver = false;
var map;

// create the game, and pass it the configuration
let game = new Phaser.Game(config);



// load asset files for our game


  function preload() {

  this.load.image("tiles", 'assets/Level1-1StageBroken.png')
  this.load.tilemapTiledJSON('map', 'assets/DK8BIT.json');
 




  this.load.image('fire1', 'assets/115.png');
  this.load.image('fire2', 'assets/116.png');
  this.load.image('fire3', 'assets/118.png');
  this.load.image('fire4', 'assets/119.png');


  this.load.image('Barrel', 'assets/113.png');

//Load The Map 
  //this.load.image('tiles','assets/Level1-1StageMASTER.png');
  //var platformTiles = 
  //Donkey Kong 
  this.load.image('DK1', 'assets/34.png');
  this.load.image('DK2', 'assets/35.png');
  this.load.image('DK3', 'assets/36.png');
  this.load.image('DK4', 'assets/37.png');
  this.load.image('DK5', 'assets/37.png');
  this.load.image('DK6', 'assets/38.png');
  this.load.image('DK7', 'assets/41.png');
  this.load.image('DK8', 'assets/42.png');

  //Ladders 
  // this.load.image('BigLadder', 'assets/Ladder.png');
  // this.load.image('SmallLadder', 'assets/Ladder.png');

  //Barrels

  this.load.image('B1', 'assets/145.png');
  this.load.image('B2', 'assets/146.png');
  this.load.image('B3', 'assets/147.png');
  this.load.image('B4', 'assets/148.png');
  this.load.image('B5', 'assets/149.png');


  //Characters
  this.load.spritesheet('mario', 'assets/mario.png', {
    frameWidth: 16,
    frameHeight: 16
  });
  this.load.spritesheet('DK', 'assets/DonkeyKongSprites.png', {
    frameWidth: 48,
    frameHeight: 48
  });
  this.load.spritesheet('Princess', 'assets/DonkeyKongSprites.png', {
    frameWidth: 32,
    frameHeight: 48
  });
  this.load.spritesheet('FireBin', 'assets/DonkeyKongSprites2.png', {
    frameWidth: 16,
    frameHeight: 31
  });
  this.load.spritesheet('Barrels', 'assets/DonkeyKongSprites.png', {
    frameWidth: 32,
    frameHeight: 48
  });
  //this.load.spritesheet('DK', 'assets/DKS.png', 32, 48, 13);
  //this.load.image('donk', 'assets/dk.png');

 //
  //this.load.image('treasure', 'assets/treasure.png');
};

var Enemy = new Phaser.Class({
 
  Extends: Phaser.GameObjects.Image,

  initialize:

  function Enemy (scene)
  {
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');

  },
  update: function (time, delta)
  {
                // move the t point along the path, 0 is the start and 0 is the end
                this.follower.t += ENEMY_SPEED * delta;
            
                // get the new x and y coordinates in vec
                path.getPoint(this.follower.t, this.follower.vec);
                
                // update enemy x and y to the newly obtained x and y
                this.setPosition(this.follower.vec.x, this.follower.vec.y);
     
                // if we have reached the end of the path, remove the enemy
                if (this.follower.t >= 1)
                {
                    this.setActive(false);
                    this.setVisible(false);
  }

});
// executed once, after assets were loaded
function create() {
  
  //map = this.add.tilemap('map');
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
    const map = this.make.tilemap({ key: "map", tileWidth: 8, tileHeight: 8 });
    const tileset = map.addTilesetImage("DK8BIT","tiles");
    const layer = map.createDynamicLayer(0, tileset); // layer index, tileset, x, y
  //map = this.make.tilemap({key: 'map'});

  this.data.set('lives', 3);
  this.data.set('level', 1);
  this.data.set('High Score', 2000);
  //layer.setCollisionBetween('mario');
  layer.setCollisionByProperty({ collides: true });
  layer.setScale(1.25, 1.25);
  //layer.setCollisionBetween('mario');
  var text = this.add.text(200, 15, '', { font: '12px Courier', fill: '#00ff00' });

  text.setText([
      'Level: ' + this.data.get('level'),
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score')
  ]);
  platforms = this.physics.add.staticGroup();
  // background
  let bg = this.add.sprite(200, 400, 'black');
  //Rails
  //Bottom to Top


  //Ladders 1 
  // let Ladder1 = this.add.sprite(115, 85, 'BigLadder')
  // let Ladder2 = this.add.sprite(115, 70, 'SmallLadder');
  // let Ladder22 = this.add.sprite(115, 50, 'SmallLadder');
  // //Ladders 2
  // let Ladder3 = this.add.sprite(95, 85, 'BigLadder')
  // let Ladder4 = this.add.sprite(95, 70, 'SmallLadder');
  // let Ladder23 = this.add.sprite(95, 50, 'SmallLadder');
  // //Ladder 3 
  // let Ladder5 = this.add.sprite(135, 85, 'SmallLadder');

  // //Bottom Level Ladders
  // let Ladder6 = this.add.sprite(115, 380, 'SmallLadder');

  // let Ladder11 = this.add.sprite(195, 340, 'BigLadder')
  // let Ladder12 = this.add.sprite(195, 360, 'SmallLadder');
  // let Ladder13 = this.add.sprite(195, 380, 'SmallLadder');
 

  // ladder1234 =this.physics.add.sprite(135,340,'BigLadder');
  // ladder1234.setBounce(0.2);
  // ladder1234.setCollideWorldBounds(true);
  // this.physics.add.collider(ladder1234, platforms);


  //bARRELS

  
  Barrelling =this.physics.add.sprite(100,55,'B5');
  Barrelling.setBounce(0.2);
  Barrelling.setCollideWorldBounds(true);
  this.physics.add.collider(  Barrelling, platforms);

  this.anims.create({
    key: 'play4',
    frames: [
        { key: 'B1' },
        { key: 'B2' },
        { key: 'B3' },
        { key: 'B4' , duration: 50 }
    ],
    frameRate: 8,
    repeat: -1
  });
  Barrelling.play('play4');

      // this graphics element is only for visualization, 
    // its not related to our path
    var graphics = this.add.graphics();    
    
    // the path for our enemies
    // parameters are the start x and y of our path
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    
    graphics.lineStyle(3, 0xffffff, 1);
    // visualize the path
    path.draw(graphics);
 


  //Mario
  mario = this.physics.add.sprite(45, 305, 'mario', 0);
  mario.setBounce(0.2);
  mario.setCollideWorldBounds(true);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 8,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 1,
      end: 6
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{
      key: 'mario',
      frame: 0
    }],
    frameRate: 20
  });



//Donkey Kong Images 

  DK = this.physics.add.sprite(50, 55, 'DK1');
  DK.setBounce(.5);
  DK.setCollideWorldBounds(true);
  this.physics.add.collider(DK, layer);
  //layer.setCollisionBetween(19, 44);
  this.anims.create({
    key: 'play1',
    frames: [
        { key: 'DK1' },
        { key: 'DK2' },
        { key: 'DK3' },
        { key: 'DK4'},
        { key: 'DK5' },
        { key: 'DK6' },
        { key: 'DK7' },
        { key: 'DK8' , duration: 50 }
    ],
    frameRate: 3,
    repeat: -1
});
DK.play('play1')

//Princess Actions 
    this.anims.create({
        key: 'play',
        frames: this.anims.generateFrameNumbers('Princess', {
          start: 0,
          end: 3
        }),
        frameRate: 1,
        repeat: -1
    });
    Princess = this.physics.add.sprite(150, 55, 'Princess',0);
    Princess.setBounce(0.01);
    Princess.setCollideWorldBounds(true);
    this.physics.add.collider(Princess, platforms);
    Princess.play('play');
    
 //Fire
 this.anims.create({
  key: 'play2',
  frames: [
      { key: 'fire1' },
      { key: 'fire2' },
      { key: 'fire3' },
      { key: 'fire4', duration: 50 }
  ],
  frameRate: 8,
  repeat: -1
});
    fire1 = this.physics.add.sprite(15, 305, 'fire1');
    fire1.setBounce(0.1);
    fire1.setCollideWorldBounds(true);
    this.physics.add.collider(fire1, platforms);
    fire1.play('play2');
    
    //Barrell
    Barrel = this.physics.add.sprite(0, 0, 'Barrel');
    Barrel.setBounce(.1);
    Barrel.setCollideWorldBounds(true);
    this.physics.add.collider(Barrel, layer);


  // Mario
  //player = this.physics.add.sprite(5, 345, 'player');
  //this.player = this.physics.add.sprite(5,210, 'player');
  //Physics
  //player.setBounce(0.2);
  //player.setCollideWorldBounds(true);
  // scale down
  //player.setScale(0.025);
  // player
  //donk = this.add.sprite(160, 40, 'donk');
  // scale down
  //donk.setScale(0.1);


  //  Player physics properties. Give the little guy a slight bounce.
/*
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  layer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
*/
  bg.setOrigin(0, 0);

  /*
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
});

this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
});
*/

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(mario, layer);
  this.physics.add.collider(Princess, layer);
  this.physics.add.collider(DK, layer);
  this.physics.add.collider(Barrelling, layer);
  this.physics.add.collider(fire1, layer);
}

// executed on every frame (60 times per second)
function update() {

  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    mario.setVelocityX(-75);

    mario.anims.play('left', true);
  } else if (cursors.right.isDown) {
    mario.setVelocityX(75);

    mario.anims.play('right', true);
  } else if (cursors.up.isDown) {
    mario.setVelocityY(75);

    mario.anims.play('right', true);
  }else {
    mario.setVelocityX(0);

    mario.anims.play('turn');
  }

  if (cursors.up.isDown && mario.body.touching.down) {
    mario.setVelocityY(150);
  }
  // //check for active input
  // if (this.input.activePointer.isDown) {

  //   // player walks
  //   this.player.x += this.playerSpeed;
  // }
  // // enemy movement and collision
  // let enemies = this.enemies.getChildren();
  // let numEnemies = enemies.length;

  // for (let i = 0; i < numEnemies; i++) {

  //   // move enemies
  //   enemies[i].y += enemies[i].speed;

  //   // reverse movement if reached the edges
  //   if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
  //     enemies[i].speed *= -1;
  //   } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
  //     enemies[i].speed *= -1;
  //   }

  // enemy collision
  // if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {
  //   this.gameOver();
  //   break;
  // }
}





// // set speeds
// Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
//   enemy.speed = Math.random() * 2 + 1;
// }, this);
// // end the game