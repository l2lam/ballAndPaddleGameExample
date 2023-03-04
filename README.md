# Example Ball and Paddle Game - Castle Defence

## Premise

Player controls a paddle to deflect a ball away from the castle.  The playing area is a ring.  The castle is in the centre of the ring.  The paddle moves in a circle around the castle.  The ball bounces around the interior of the ring.  If the ball hits the castle a certain number of times, the game is over.  There is no scoring.

## Entities (all the things in the game)

### Castle
- lives
- shape/colour
- size (radius)
- position (x, y)

### Paddle
- size/shape/colour
- position (angle)
- speed

### Ball
- size/shape/colour
- speed
- position
- deflection sound

### Ring
- size (radius)
- background colour
- deflection sound

## Pseudocode

### Setup

1. Place the ball in a random location inside the ring, but not near the castle.
2. Set a random direction/speed for the ball.
3. Place the paddle in a random orbit around the castle.
4. Set the number of lives to 3.

### Draw Loop

1. Draw the ring
2. Draw ball
3. Draw castle
4. Draw the paddle
5. If the ball hits the wall of the ring then
    6. the ball deflects off the wall perpendicular to the tangent of the wall's curvature
    7. randomize the speed of the ball
    8. slight random change in the angle of the deflection
9. If the ball hits the paddle on the outside
    10. the ball deflects off the paddle perpendicular to the tangent of the paddle's curvature
    11. make a sound
12. If the ball hits the inside of the paddle
    13. the ball will continue through the paddle (not deflect)
14. If the ball hits the castle
    15. the number of lives is reduced by one
    16. the ball continue through
17. If the number lives is zero then
    18. The game is over:
    19. show the game screen
    20. stop the game


