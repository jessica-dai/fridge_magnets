class Word {

  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.w = 60.0;
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
let canvX_start = 400;
let canvY = 700;

function createBackground() {
  fill('#FFE5CC');
  rect(canvX_start + 60, 0, canvX - canvX_start, canvY);
}

function createWords() {

  // let quote = "I write, she wrote, that memory is fragile and the space of a single life is brief, passing so quickly that we never get a chance to see the relationship between events; we cannot gauge the consequences of our acts, and we believe in the fiction of past, present, and future, but it may also be true that everything happens simultaneously.";
  // let wrds = split(quote, " ");

  let wrds = alice_words();

  numwords = wrds.length;

  for (let i = 0; i < numwords; i++) {

    let x = random(0, canvX_start);
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

function readWords() {
  poem = [];

  // TODO
  // step 1: isolate rows (loop through ys, set starty = first y seen, then go 30 at a time)
  // TODO -- put into ml5 js
  return poem;
}

function setup() {
  createCanvas(canvX, canvY);
  createWords();
}

function draw() {

  clear();
  createBackground();

  for (let i = 0; i < numwords; i++) {
    words[i].display();
  }

  textAlign(LEFT);
  fill(0);

  text("drag words from left to right!", 20, 20);

}

// for moving around individual tiles
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

// utils -- to access sorted x-locations of word
function sortOnKeys(dict) {

  var sorted = [];
  for(var key in dict) {
      sorted[sorted.length] = key;
  }
  sorted.sort();

  var tempDict = {};
  for(var i = 0; i < sorted.length; i++) {
      tempDict[sorted[i]] = dict[sorted[i]];
  }

  return tempDict;
}

// corpuses

function choose_words(sentences) {
  n_words = 0;
  seen_sentences = [];
  to_return = []
  while (n_words < 20) {
    ind = Math.floor(Math.random() * sentences.length);
    while (seen_sentences.indexOf(ind) != -1){
      ind = Math.floor(Math.random() * sentences.length);
    }
    seen_sentences.push(ind);

    sentence = sentences[ind]
    wrds = split(sentence, " ");
    for (let i = 0; i < wrds.length; i++) {
      to_return.push(wrds[i]);
    }
    n_words = n_words + wrds.length;
  }

  return to_return
}

function alice_words() {
  sentences = ['Alice thought she had plenty of time, as she could remember them, all ornamented with hearts.', 
  "She tucked her arm affectionately into Alice's and they sat down at her rather inquisitively and seemed to have changed since her swim in the lock, and to her chin in salt-water.", 
  'She stretched herself up on tiptoe and peeped over the edge and her eyes fell upon a little pattering of feet in the court was in the air.', 
  'Her first idea was that this might belong to one of the shelves as she could for sneezing.', 
  'She got up this morning?', 
  'There was a little animal scratching and scrambling about in the pool of tears which she had found her way into a graceful zigzag and was just in time to see it trot away quietly into the garden.', 
  'The Duchess took her choice, and was delighted to find her in such a curious croquet-ground in her life; it was too dark to see that she did it at last she spread out her hand and a scroll of parchment in the distance and she felt certain it must be really offended.', 
  'There is such a curious appearance in the lock, and to her ear.', 
  'The next moment a shower of saucepans, plates and dishes.', 'For the Mouse in the distance and she set to work at once set to work at once to eat some of the trees had a consultation about this and after a few minutes she heard a little table, all made of solid glass.', 'The Mouse was bristling all over and she hastily dried her eyes immediately met those of a tree in front of the water and seemed to be lost.', 'Then came a rumbling of little animals and birds waiting outside.', 'Alice had not gone much farther before she had been anything near the right size that it was indeed!', 'She did not get hold of anything, but she ran off as hard as it was just possible it had been.', 'At last came a little shriek and a fall and a bright idea came into her face and was beating her violently with its arms folded, frowning like a thunderstorm!', 'She soon found herself safe in a minute or two, and the blades of grass, but she did not seem to encourage the witness at all; he kept shifting from one end to the table, but it was all dark overhead; before her was another long passage and the people near the looking-glass.', 'As soon as she could not possibly reach it: she could not even get her head through the glass and she very good-naturedly began hunting about for some way of escape, when she turned away.', 'However, they got settled down again, the cook had disappeared.', 'When Alice next peeped out, the Fish-Footman was gone, and the people near the door and went to the heads of the house, quite forgetting that she had put on your shoes and stockings for you now, dears?', 'Alice went back to the door, staring stupidly up into a tree.', 'Alice went back to the Knave was standing before them, in chains, with a great crowd assembled about them--all sorts of little pebbles came rattling in at the sides of the gloves and was gone in a moment.', 'The miserable Hatter dropped his teacup and bread and butter in the lock, and to her great delight, it fitted!', 'There was a little startled, however, when she turned away.', 'Alice drew her foot as far down the chimney as she said this, she came suddenly upon an open place, with a trumpet in one hand and a fan!', 'The next witness was the Rabbit and had no reason to be full of soup.', 'She got up this morning?', 'Alice drew her foot slipped, and in another moment, splash! she was now the right size for going through the doorway.', 'Just as she could do, lying down on one of the garden; the roses growing on it were white, but there were ten of them, with her arms folded, frowning like a thunderstorm!', 'On various pretexts they all moved off and Alice was not a moment that it might not escape again.', 'Alice had found her way into a cucumber-frame or something of that dark hall and close to her feet, for it flashed across her mind that she had been broken to pieces.']

  return choose_words(sentences)

}