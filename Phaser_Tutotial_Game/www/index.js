
// phaser game settings
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 0 }
      }
  },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  };
  
  // New game instance based on config
  let game = new Phaser.Game(config);
  
  let ball;
  
  
  // ball settings
  const BALL_COLOUR = '0xffff00'; // yellow
  const BALL_RADIUS = 15;
  let ballX = game.config.width /2;
  let ballY = game.config.height - (BALL_RADIUS * 2);
  
  
  
  // Preload assets
  function preload ()
  {
    // The base address for assets - using phaser lab exampleshere
    this.load.setBaseURL('http://labs.phaser.io');
  
    this.load.image('sky', 'assets/skies/space3.png');
  }
  
  // Build the game - add assets, etc.
  function create ()
  {
    // Add background
    this.add.image(400, 300, 'sky');
  
    ball = this.add.circle(ballX, ballY, BALL_RADIUS, BALL_COLOUR);
  
    this.physics.add.existing(ball);
  
    ball.body.velocity.x = 300;
    ball.body.velocity.y = 300;
    ball.body.bounce.x = 1;
    ball.body.bounce.y = 1;
    ball.body.collideWorldBounds = true;
  
  
  }
  
  function update() {
  
  
  
  }