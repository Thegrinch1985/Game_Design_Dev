
var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 950,
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
//let enemyMaxY = 280;
//let enemyMinY = 80;
let gameOver = false;
var map;
var path;

var enemies;

var ENEMY_SPEED = 1/10000;
// create the game, and pass it the configuration
let game = new Phaser.Game(config);



// load asset files for our game


  function preload() {

  this.load.image("tiles", 'assets/BigDonk.jpg')
  this.load.tilemapTiledJSON('map', 'assets/BigDonk.json');
 




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
      Phaser.GameObjects.Image.call(this, scene, 0, 0, 'B5');

      this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
     // this.hp = 0;
  },

  startOnPath: function ()
  {
      this.follower.t = 0;
      this.hp = 100;
      
      path.getPoint(this.follower.t, this.follower.vec);
      
      this.setPosition(this.follower.vec.x, this.follower.vec.y);            
  },
  receiveDamage: function(damage) {
      this.hp -= damage;           
      
      // if hp drops below 0 we deactivate this enemy
      if(this.hp <= 0) {
          this.setActive(false);
          this.setVisible(false);      
      }
  },
  update: function (time, delta)
  {
      this.follower.t += ENEMY_SPEED * delta;
      path.getPoint(this.follower.t, this.follower.vec);
      
      this.setPosition(this.follower.vec.x, this.follower.vec.y);

      if (this.follower.t >= 1)
      {
          this.setActive(false);
          this.setVisible(false);
      }
  }

});

function getEnemy(x, y, distance) {
  var enemyUnits = enemies.getChildren();
  for(var i = 0; i < enemyUnits.length; i++) {       
      if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
          return enemyUnits[i];
  }
  return false;
} 




// executed once, after assets were loaded
function create() {
  
  //map = this.add.tilemap('map');
    // When loading a CSV map, make sure to specify the tileWidth and tileHeight!
    const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32});
    const tileset = map.addTilesetImage("BigDonk","tiles");
    //const tileset = map.addTilesetImage("BigDonk","Platforms");
    const layer = map.createDynamicLayer(0, tileset); // layer index, tileset, x, y
    const Platforms = map.createDynamicLayer('Platforms', tileset, 0,0);
    const Ladders = map.createDynamicLayer('Ladders', tileset, 0,0);
  //map = this.make.tilemap({key: 'map'});
  Platforms.setCollisionByExclusion([-1]);
  this.data.set('lives', 3);
  this.data.set('level', 1);
  this.data.set('High Score', 2000);
  //layer.setCollisionBetween('mario');
  layer.setCollisionByProperty({ collides: true });
  //layer.setScale(1.25, 1.25);
  //layer.setCollisionBetween('mario');
  var text = this.add.text(200, 15, '', { font: '12px Courier', fill: '#00ff00' });

  text.setText([
      'Level: ' + this.data.get('level'),
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score')
  ]);
  platforms = this.physics.add.staticGroup();
  // background
  //let bg = this.add.sprite(200, 400, 'black');
 
 


  //bARRELS

  
  //Barrelling =this.physics.add.sprite(400,55,'B5');
  //Barrelling.setBounce(0.2);
  //Barrelling.setCollideWorldBounds(true);
  //this.physics.add.collider(  Barrelling, Platforms);
/*
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
*/
      // this graphics element is only for visualization, 
    // its not related to our path

    //Enemies
    var graphics = this.add.graphics();    
    //drawLines(graphics);
    path = this.add.path(855, 495);
    path.lineTo(255, 495);
    path.lineTo(255, 645);
    path.lineTo(585, 645);
    path.lineTo(585, 735);
    path.lineTo(405, 735);
    path.lineTo(405, 835);
    path.lineTo(605, 835);
    path.lineTo(605, 925);
    path.lineTo(105, 925);
    //path.lineTo(480, 544);
   
    
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    
   

    this.nextEnemy = 0;
    
    this.physics.add.overlap(enemies);
    
  


  //Mario
  mario = this.physics.add.sprite(225, 305, 'mario', 0);
  mario.setBounce(0.2);
  mario.setCollideWorldBounds(true);
  mario.setScale(2, 2);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 8,
      end: 12
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
  }); this.anims.create({
    key: 'hit',
    frames: this.anims.generateFrameNumbers('mario', {
      start: 7,
      end: 7
    }),
    frameRate: 10,
    repeat: -1
  });



//Donkey Kong Images 

  DK = this.physics.add.sprite(855, 55, 'DK1');
  DK.setBounce(.5);
  DK.setCollideWorldBounds(true);
  this.physics.add.collider(DK, Platforms);

  DK.setScale(2, 2);

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
    Princess = this.physics.add.sprite(750, 75, 'Princess',0);

    Princess.setCollideWorldBounds(true);
    this.physics.add.collider(Princess, Platforms);
    Princess.play('play');
    Princess.setScale(2, 2);
    
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
    fire1 = this.physics.add.sprite(205, 305, 'fire1');
    fire1.setBounce(0.1);
    fire1.setCollideWorldBounds(true);
    this.physics.add.collider(fire1, platforms);
    fire1.play('play2');
    fire1.setScale(2, 2);
    
  

  //  Player physics properties. Give the little guy a slight bounce.
/*
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  Platforms.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });

  const debugGraphics1 = this.add.graphics().setAlpha(0.75);
  Ladders.renderDebug(debugGraphics1, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(123, 194, 78, 255), // Color of colliding tiles
    //faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
  });
*/
  //bg.setOrigin(0, 0);

	
  //this.physics.add.collider(Ladders, mario);
  this.physics.add.collider(mario, Enemy,hitBomb,null,this);
  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(mario, Platforms);
  this.physics.add.collider(DK, Ladders);
  this.physics.add.collider(Princess, Platforms);
  this.physics.add.collider(DK, Platforms);
 // this.physics.add.collider(Barrelling, Platforms);
  this.physics.add.collider(fire1, Platforms);
}

function damageEnemy(enemy, bullet) {  
  // only if both enemy and bullet are alive
  if (enemy.active === true && bullet.active === true) {
      // we remove the bullet right away
      bullet.setActive(false);
      bullet.setVisible(false);    
      
      // decrease the enemy hp with BULLET_DAMAGE
      enemy.receiveDamage(BULLET_DAMAGE);
  }
}

function hitBomb (mario, Enemy)
{
    this.physics.pause();

    mario.setTint(0xff0000);

    player.anims.play('hit');

    gameOver = true;
}



// executed on every frame (60 times per second)
function update(time, delta) {



    if (time > this.nextEnemy)
    {
        var enemy = enemies.get();
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.startOnPath();
  
            this.nextEnemy = time + 2000;
             
    }
  }
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    mario.setVelocityX(-75);

    mario.anims.play('left', true);
  } else if (cursors.right.isDown) {
    mario.setVelocityX(75);

    mario.anims.play('right', true);
  
  }else {
    mario.setVelocityX(0);

    mario.anims.play('turn');
  }

   // Jumping
   if ((cursors.space.isDown || cursors.up.isDown) && mario.body.onFloor())
   {
       mario.body.setVelocityY(-200);
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