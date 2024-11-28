let rotations = [];
let rotationSpeed = 0.5;
let maxDepth = 8; // Riduce la profondità dell'albero per risparmiare risorse

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  generateRotations(maxDepth); // Genera solo i valori necessari per la profondità limitata
  frameRate(30); // Frame rate inferiore per migliorare la fluidità
}

function draw() {
  if (frameCount % 2 !== 0) return; // Salta ogni secondo frame per ridurre il carico

  background(200);
  translate(0, 200, 0);
  rotateY(frameCount * rotationSpeed); 

  branch(100, 0); 
  noLoop();

}

function branch(len, level) {
  if (level >= maxDepth) return; // Limita i livelli dell'albero per ottimizzare

  strokeWeight(map(len, 10, 100, 0.5, 5));
  stroke(70, 40, 20);
  line(0, 0, 0, 0, -len - 2, 0);
  translate(0, -len, 0);

  if (len > 15) {
    let numBranches = level % 2 === 0 ? 3 : 2;
    for (let i = 0; i < numBranches; i++) {
      rotateY(rotations[level][i].y);
      push();
      rotateZ(rotations[level][i].z);
      branch(len * 0.73, level + 1);
      pop();
    }
  } else {
    drawLeaf();
  }
}

function drawLeaf() {
  // Mantiene la forma originale della foglia
  let r = 230 + random(-20, 20);
  let g = 130 + random(-20, 20);
  let b = 150 + random(-20, 20);
  fill(r, g, b, 200);
  noStroke();

  translate(5, 0, 0);
  rotateZ(90);

  beginShape();
  for (let i = 45; i < 135; i++) {
    let rad = 7;
    let x = rad * cos(i);
    let y = rad * sin(i);
    vertex(x, y);
  }
  for (let i = 135; i > 45; i--) {
    let rad = 7;
    let x = rad * cos(i);
    let y = rad * sin(-i) + 10;
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Funzione per generare e salvare rotazioni casuali per ogni livello di ramificazione
function generateRotations(maxLevel) {
  for (let i = 0; i < maxLevel; i++) {
    let levelRotations = [];
    for (let j = 0; j < 3; j++) {
      levelRotations.push({
        y: random(100, 140),
        z: random(20, 50)
      });
    }
    rotations.push(levelRotations);
  }
}
