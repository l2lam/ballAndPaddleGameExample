// ## Entities (all the things in the game)

// ### Castle
// - lives
let lives = 3;
// - shape/colour
let castleBorderColour = 'black'
let castleFillColour = 'red'
// - size (radius)
let castleRadius = 100;
// - position (x, y)
let castlePositionX;
let castlePositionY;

// ### Paddle
// - size/shape/colour
let paddleBorderColour = 'black'
let paddleFillColour = 'blue'
let paddleRadius = 15; // degrees
// - position (angle)
let paddlePosition;
// - speed
let paddleSpeed = 5; // degrees

// ### Ball
// - size/shape/colour
// - speed
// - position
// - deflection sound

// ### Ring
// - size (radius)
// - background colour
// - deflection sound

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 1. Place the ball in a random location inside the ring, but not near the castle.
  // 2. Set a random direction/speed for the ball.
  // 3. Place the paddle in a random orbit around the castle.
  angleMode(DEGREES);
  paddlePosition = random(0, 360);
  // 4. Set the number of lives to 3.  
  lives = 3;
  // Set the position of the castle to the centre of the screen
  castlePositionX = windowWidth/2;
  castlePositionY = windowHeight/2;
}

function draw() {
//   1. Draw the ring
// 2. Draw ball
// 3. Draw castle
  drawCastle();
  // 4. Draw the paddle
  drawPaddle();
  
// 5. If the ball hits the wall of the ring then
//     6. the ball deflects off the wall perpendicular to the tangent of the wall's curvature
//     7. randomize the speed of the ball
//     8. slight random change in the angle of the deflection
// 9. If the ball hits the paddle on the outside
//     10. the ball deflects off the paddle perpendicular to the tangent of the paddle's curvature
//     11. make a sound
// 12. If the ball hits the inside of the paddle
//     13. the ball will continue through the paddle (not deflect)
// 14. If the ball hits the castle
//     15. the number of lives is reduced by one
//     16. the ball continue through
// 17. If the number lives is zero then
//     18. The game is over:
//     19. show the game screen
//     20. stop the game
}

function drawCastle() {
  stroke(castleBorderColour);
  fill(castleFillColour);
  circle(castlePositionX, castlePositionY, castleRadius * 2)
}

function drawPaddle() {
  stroke(paddleBorderColour);
  fill(paddleFillColour);
}