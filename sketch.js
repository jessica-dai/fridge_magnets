class Word {

  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.w = 80.0;
    this.h = 20.0;

    this.name = name;

  }

  display() {

    strokeWeight(0.5);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text(this.name, this.x + 3, this.y + 12);

  }
}

words = [] // all words on screen
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
let numwords = 0;
let canvX = 1200;
let canvY = 700;

function createWords() {

  let quote = "I write, she wrote, that memory is fragile and the space of a single life is brief, passing so quickly that we never get a chance to see the relationship between events; we cannot gauge the consequences of our acts, and we believe in the fiction of past, present, and future, but it may also be true that everything happens simultaneously.";
  let wrds = split(quote, " ");

  numwords = wrds.length;

  for (let i = 0; i < numwords; i++) {

    let x = random(10, canvX-40);
    let y = random(10, canvY-30);
    let name = wrds[i];

    words.push(new Word(x, y, name));
  }

}

function findWord(x, y) {
  for (let i = 0; i < numwords; i++) {
    let currWord = words[i];
    if (x > words[i].x &&
      x < words[i].x + words[i].w &&
      y > words[i].y &&
      y < words[i].y + words[i].h) {
      return currWord;
    }

  }

  return null;
}

function setup() {
  createCanvas(canvX, canvY);
  createWords();
}

function draw() {

  clear();

  for (let i = 0; i < numwords; i++) {
    words[i].display();
  }

  textAlign(LEFT);
  fill(0);

  text("(what does the fridge say today?)", 20, height - 20);

}

function mousePressed() {

  let word = findWord(mouseX, mouseY);

  if (word != null) {
    locked = true;
    xOffset = mouseX - word.x;
    yOffset = mouseY - word.y;
  } else {
    locked = false;
  }

}

function mouseDragged() {

  if (locked) {

    let word = findWord(mouseX, mouseY);

    if (word == null) {

      locked = false;

    } else {
      word.x = mouseX - xOffset;
      word.y = mouseY - yOffset;
    }
  }
}

function mouseReleased() {
  locked = false;
}
