// Demo of a ball bouncing inside a ring
// Dynamic frame rate to allow speeding up and slowing down the game
let fRate = 50;

// Ring dimensions
const ringRadius = 300;
let ringCenter;
let ringFillColor, ringStrokeColor;

// Ball position and velocity
const ballRadius = 10;
let ballPos, ballV;
let ballFillColor, ballStrokeColor;

// Paddle dimensions
const paddleRadius = 100;
let paddleWidthRadians, paddlePosRadians, paddleSpeedRadians;
let paddleFillColor, paddleStrokeColor;

// Target dimensions
const targetRadius = 50;
let targetColor, targetHitColor;
let targetIsHit = false;

// Scoring
let score = 2;

// Sound
let monoSynth;

let img;
function ok() {
	print("ok");
}
function nok() {
	pring("nok");
}

function preload() {
	img = loadImage("https://nigms.nih.gov/education/Inside-Life-Science/PublishingImages/lung-fish.jpg", ok, nok);  
}

function setup() {
  // Sound
  monoSynth = new p5.MonoSynth();

  // Canvas
	createCanvas(windowWidth, windowHeight);
	background(100);
	frameRate(fRate);
	
	// Setup the ring
	const x = windowWidth/2;
	const y = windowHeight/2
	ringCenter = createVector(x, y);
	ringFillColor = color(100, 90, 50);
	ringStrokeColor = color(0,0,0);
	
	// Setup the ball
	ballPos = createVector(ringCenter.x - ringRadius + 3 * ballRadius, ringCenter.y);
    //createVector(random(x - ringRadius / 2 + ballRadius, x + ringRadius / 2 - ballRadius), random(y - ringRadius / 2 + ballRadius, y + ringRadius / 2 - ballRadius));
	//ballV = createVector(5, 5);//p5.Vector.random2D().mult(5);
	ballV = p5.Vector.random2D().mult(5);
	ballFillColor = color(0, 100, 100);
	ballStrokeColor = color(0,0,0);
	
	// Setup the paddle
	paddleWidthRadians = PI / 3;
	paddlePosRadians = PI / 4;
	paddleSpeedRadians = PI / 24;
	paddleFillColor = color(10, 150, 30);
	paddleStrokeColor = color(0,0,0);
	
	// Setup the target
	targetColor = color(200, 0, 0);
	targetHitColor = color(0, 0, 200);
	
	background(img, windowWidth, windowHeight);
}

function keyPressed() {
	switch(keyCode) {
		case 187: // '+' key
			fRate = min(fRate + 5, 60);
			print("speeding up to " + fRate);
			frameRate(fRate);
			break;
		case 189: // '-' key
			fRate = max(fRate - 5, 0);
			print("slowing down to " + fRate);
			frameRate(fRate);
			break;
	}
	//print('keycode ' + keyCode);
}

function draw() {
	drawRing();
	updatePaddle();
	drawTarget();
	updateBall();
}

function normalizeAngle(rad) {
	return (rad < 0 ? TWO_PI + rad : rad) % TWO_PI;
}

function updatePaddle() {
	if (keyIsPressed) {
		switch(keyCode) {
			case LEFT_ARROW:
			case UP_ARROW:
				paddlePosRadians = normalizeAngle(paddlePosRadians + paddleSpeedRadians);
				break;
			case RIGHT_ARROW:
			case DOWN_ARROW:
				paddlePosRadians = normalizeAngle(paddlePosRadians - paddleSpeedRadians);
				break;
		}
		// print("paddle pos ", degrees(paddlePosRadians), degrees(paddleWidthRadians));
	}
	drawPaddle();	
}

function updateBall() {
	checkBallHitTarget();
	checkBallHitPaddle();
	checkBallAtRingEdge();
	ballPos.add(ballV);
	drawBall();
}

function checkBallHitTarget() {
	if (ballPos.dist(ringCenter) <= targetRadius + ballRadius + 1) {
		// Wait until the ball leaves the target to recount a hit
		if (!targetIsHit) {
			targetIsHit = true;
			score--;
      playTargetHitSound();
			print("score", score);
			if (score == 0) {
				gameOver();
			}
		}
	}
	else
		targetIsHit = false;
}

function showScore() {
	stroke(255, 255, 255);
	fill(255, 255, 255);
	textSize(32);
	textAlign(CENTER);
	text(score, ringCenter.x, ringCenter.y);
}

function gameOver() {
  strokeWeight(5);
	stroke(255, 255, 255);
	fill(255, 255, 255);
	textSize(64);
	textAlign(CENTER);
	text('Game Over', ringCenter.x, ringCenter.y);
	frameRate(0);
}

function checkBallHitPaddle() {
	// Check if the ball reached the paddle's path (circle)
	if (ballPos.dist(ringCenter) <= paddleRadius + ballRadius + 1) {
		// Check that the ball is within the width of the paddle
		let reflectV = ballPos.copy();
		reflectV.sub(ringCenter);
		let heading = normalizeAngle(reflectV.heading());
		if ((heading >= paddlePosRadians && heading - paddlePosRadians <= paddleWidthRadians) 
				|| (TWO_PI - paddlePosRadians + heading <= paddleWidthRadians)) {
			//print("heading ", degrees(heading));
			// Check that the ball is traveling towards the paddle from the outside (the product of the 2 vectors would be negative)
			// Calculate the reflection vector
			let productV = reflectV.copy().mult(ballV);
			//print("ballV, productV", ballV, productV);
			if (productV.x < 0 || productV.y < 0) {
				ballV.reflect(reflectV);
        drawArrow(ballPos, reflectV, 'yellow');
        ballV.mult(1.2);
				// print("hit paddle!");
        playBounceSound();
				//frameRate(5);
			}
		}
	}
}

function checkBallAtRingEdge() {
	// Check if the ball reached the edge of the ring
	if (ballPos.dist(ringCenter) >= ringRadius - ballRadius - 1) {
		// Get the reflection vector (perpendicular vector from center of the ring to the ball)
		let reflectV = ballPos.copy();
		reflectV.sub(ringCenter);

    // Add a degree of randomness to the reflection angle before relecting the ball
    reflectV.rotate(PI / random(8, 16)); // small, random clockwise skew
    reflectV.rotate(PI / random(-16, -8)); // small, random conter-clockwise skew
    drawArrow(ballPos, reflectV, 'yellow');
    ballV.reflect(reflectV);
	}
}

function drawRing() {
	stroke(ringStrokeColor);
	strokeWeight(10);
	fill(ringFillColor);
	circle(ringCenter.x, ringCenter.y, ringRadius * 2);
}

function drawBall() {
	stroke(ballStrokeColor);
	strokeWeight(3);
	fill(ballFillColor);
	circle(ballPos.x, ballPos.y, ballRadius * 2);
  drawArrow(ballPos, ballV, 'blue');
}

function drawPaddle() {
	//stroke(paddleStrokeColor);
	//strokeWeight(1);
	noStroke();
	fill(paddleFillColor);
	arc(ringCenter.x, ringCenter.y, paddleRadius * 2, paddleRadius * 2, paddlePosRadians, paddlePosRadians + paddleWidthRadians, PIE);
	fill(ringFillColor);
	//stroke(ringFillColor);
	arc(ringCenter.x, ringCenter.y, paddleRadius * 1.5, paddleRadius * 1.5, paddlePosRadians, paddlePosRadians + paddleWidthRadians, PIE);
}

function drawTarget() {
	//stroke();
	strokeWeight(0);
	if (targetIsHit) {
		fill(targetHitColor);
	}
	else {
		fill(targetColor);
	}
	circle(ringCenter.x, ringCenter.y, targetRadius * 2);
  
	if (score > 0) 
    showScore();
}

function playBounceSound() {
  let v = (ballV.mag() * 2) / ringRadius;
  monoSynth.play('F4', v, 0, 1/16);
}
function playTargetHitSound() {
  let v = (ballV.mag() * 3) / ringRadius;
  monoSynth.play('C4', v, 0, 1/8);
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}