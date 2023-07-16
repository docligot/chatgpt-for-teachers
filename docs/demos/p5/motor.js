// scale motor test
// Goal: add a size to the motor drawing to not require only a fixed size hard coded in the draw.

let direction = 1;
let radiusSlider;
let angle = 0;
let circleRadius = 100; // default value
let myFrameRate = 24;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
    // this changes the entire layout
    
  
    let forwardButton = createButton('Fwd');
    forwardButton.position(10, height-20);
    forwardButton.mousePressed(forward);
    
    let stopButton = createButton('Stop');
    stopButton.position(55, height-20);
    stopButton.mousePressed(stop);
    
    let reverseButton = createButton('Rev');
    reverseButton.position(105, height-20);
    reverseButton.mousePressed(turnReverse);

    // radiusSlider = createSlider(0, 200, circleRadius);
    scaleSlider = createSlider(.1, 2, 1, .1);
    scaleSlider.position(215, height - 35);
    scaleSlider.style('width', '180px');

        // radiusSlider = createSlider(0, 200, circleRadius);
    speedSlider = createSlider(0, 20, 5, .1);
    speedSlider.position(215, height - 16);
    speedSlider.style('width', '180px');
    frameRate(myFrameRate);
}

function stop() {
    direction = 0;
  }
  
  function forward() {
    direction = 1;
  }
  
  function turnReverse() {
    direction = -1;
  }

function draw() {
     background(240);
     // center axis
     line(0, height / 2, width, height / 2)
     line(width / 2, 0, width/2, height)

    // Update the circle radius based on slider value
    scaleVal = scaleSlider.value();
    motorSpeed = speedSlider.value();

    // Center the motor on the canvas
    angle += direction * motorSpeed;
    // x,y, scale,  angle, dir, speed
    drawMotor(width / 2, height / 2, scaleVal, angle, direction)

    // Draw the label and the current radius value
    stroke(0);
    strokeWeight(0);
    fill(0); // black color for the text
    text("Scale: " + scaleVal, 140, height - 30);
    text("Speed: " + motorSpeed, 140, height - 10);
}

function drawMotor(x, y, scaleVal, angle, direction) {
  angleMode(DEGREES);  // Change the mode to 
  push();
      
      translate(x, y);
      scale(scaleVal);
      rotate(angle);
      
      noFill();
      strokeWeight(2);
      circle(0,0, 220)
      strokeWeight(10);
      stroke('black')
      noFill();
      // top circle x,y  w,h  start-ang, end-angle
      arc(0, 0, 180, 180, 180, 310, OPEN);
      // bottom circle
      arc(0, 0, 180, 180,   0, 130, OPEN);

      // forward
      if (direction == 1) {
        // up right
        drawArrowTip(50,-75, 140)
        // lower left
        drawArrowTip(-60, 70, -30)
      }
      // reverse
      if (direction == -1) {
        // up right x,y, ang
        drawArrowTip(90, 0, -20)
        // lower left
        drawArrowTip(-90, 0, 164)
      }
  pop();
}

// draw a triangle with a base at (x,y) in the direction of rotationAngle
function drawArrowTip(x, y, rotationAngle, size) {
  push();  // Save the current drawing style and transformations
    translate(x, y);  // Move the origin to the given location
    rotate(rotationAngle);  // Rotate by the given angle
    fill(0);  // Set the fill color to black
    noStroke();  // Disable drawing an outline
    // set the size
    let sz = 10 + int(size*.01);
    // lower right, top, lower left
    triangle(sz, 0,  0,-3*sz,   -sz,0);  // Draw the arrow tip
  pop();  // Restore the previous drawing style and transformations
}
