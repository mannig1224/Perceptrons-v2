// A Perceptron object
let ptron;

let pointsArray = new Array(500); // A list of points, currently empty array
let count = 0;

// Coordinate space
let xmin = -1;
let ymin = -1;
let xmax = 1;
let ymax = 1;

function f(x) {
	let y = 0.3 * x - 0.2;
	return y;
}

function setup() {
	createCanvas(600, 600);
	ptron = new Perceptron(3, 0.01);

	for (let i = 0; i < pointsArray.length; i++) {
		let x = random(xmin, xmax);
    	let y = random(ymin, ymax);
		let answer = 1;
		if (y < f(x)) answer = -1;
		pointsArray[i] = {
		input: [x, y, 1],
		output: answer
    	};
	}

}
function pixelX(i) {
	return map(pointsArray[i].input[0],xmin, xmax, 0, width);
}

function pixelY(i) {
	return map(pointsArray[i].input[1],ymin, ymax, height, 0);
}



function draw() {
	background(255);
	stroke(0);


	// Creates the line based on f(x) and cartesean plan
	let x1 = map(xmin, xmin, xmax, 0, width);
  	let y1 = map(f(xmin), ymin, ymax, height, 0);
  	let x2 = map(xmax, xmin, xmax, 0, width);
  	let y2 = map(f(xmax), ymin, ymax, height, 0);
	line(x1, y1, x2, y2);
	  
	// Draw the line based on the current weights
	// Formula is weights[0]*x + weights[1]*y + weights[2] = 0
	stroke(50);
	strokeWeight(2);
	let weights = ptron.getWeights();
	x1 = xmin;
	y1 = (-weights[2] - weights[0] * x1) / weights[1];
	x2 = xmax;
	y2 = (-weights[2] - weights[0] * x2) / weights[1];

	x1 = map(x1, xmin, xmax, 0, width);
	y1 = map(y1, ymin, ymax, height, 0);
	x2 = map(x2, xmin, xmax, 0, width);
	y2 = map(y2, ymin, ymax, height, 0);
	line(x1, y1, x2, y2);




	// Draws every point in pointsArray
	for (let i = 0; i < pointsArray.length; i++) {
		stroke(0);
		if (pointsArray[i].output == 1) {
			fill(0);
		} else {
			fill(255);
		}
		let px = pixelX(i);
		let py = pixelY(i);
		ellipse(px,py,16,16);
	}

	// Guesses each points position using the guess function
	for (let i = 0; i < pointsArray.length; i++) {
		let inputs = [pointsArray[i].input[0], pointsArray[i].input[1], pointsArray[i].input[2]];
		let target = pointsArray[i].output;
		let guess = ptron.guess(inputs);

		if ( guess == target) {
			fill(0,255,0);
		} else {
			fill(255,0,0);
		}
		noStroke();
		let px = pixelX(i);
		let py = pixelY(i);
		ellipse(px,py,8,8);
	}

		let index = pointsArray[count];
		let inputs = [index.input[0], index.input[1],index.input[2]];
		let target = index.output;
		ptron.train(inputs, target);
		count++;
		if(count == pointsArray.length) {
			count = 0;
		
	}
}

