// script-wide variables

// words to appear on screen
var _words = []  // words[i] is a lookup for word.id 
var _locked = false;
var _xOffset = 0.0;
var _yOffset = 0.0;
var _numwords = 0;

// score calculation
var _usergen = "";
var _ans = ""; // save and fill in when loading corpus
var _score = 0.05; 

// canvas setup
let _canvX = 1200;
let _canvX_start = 400;
let _canvY = 700;

// initialization 
function createWords() {

  let wrds = aliceWords();

  _numwords = wrds.length;

  for (let i = 0; i < _numwords; i++) {

    let x = random(0, _canvX_start);
    let y = random(10, _canvY-30);
    let name = wrds[i];

    _words.push(new Word(x, y, name, i));
  }

}

// feature functionality
function findWord(x, y) {
  for (let i = 0; i < _numwords; i++) {
    let currWord = _words[i];
    if (x > _words[i].x &&
      x < _words[i].x + _words[i].w &&
      y > _words[i].y &&
      y < _words[i].y + _words[i].h) {
      return currWord;
    }

  }

  return null;
}

function readPoem() {
  _usergen = ""
  let seen_words = []
  for (let y = 0; y < _canvY; y++) {
    for (let x = _canvX_start + 60; x < _canvX; x++) {
      let foundWord = findWord(x, y);
      if (foundWord !== null && seen_words.indexOf(foundWord) == -1) {
        _usergen = _usergen.concat(" ");
        _usergen = _usergen.concat(foundWord.name);
        seen_words.push(foundWord);
      }
    }
  }

}

function showSimilarity() {
  readPoem(); 
  // readSequence = readWords(); 
  console.log(_usergen);
  
  _score = compareTwoStrings(_usergen, _ans); // update similarity score
  // map color to similarity and change background
  let new_fill = 'hsl(' + Math.floor(_score*240) + ',50%,80%)';
  fill(new_fill);
  rect(_canvX_start + 60, 0, _canvX - _canvX_start, _canvY);
}

// main p5js display functions
function setup() {
  noLoop();
  createCanvas(_canvX, _canvY);
  createWords();
}

function draw() {

  // noLoop();
  clear();

  showSimilarity();

  for (let i = 0; i < _numwords; i++) {
    _words[i].display();
  }

  textAlign(LEFT);
  fill(0);
  text("reconstruct the sentence!", 20, 20);

}

// main word class
class Word {

  constructor(x, y, name, id) {
    this.x = x;
    this.y = y;
    this.w = 60.0;
    this.h = 20.0;

    this.name = name;
    this.id = id;

  }

  display() {

    strokeWeight(0.5);
    noFill();
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    text(this.name, this.x + 3, this.y + 12);

  }
}

// for moving around individual tiles
function mousePressed() {

  loop();
  let word = findWord(mouseX, mouseY);

  if (word != null) {
    _locked = true;
    _xOffset = mouseX - word.x;
    _yOffset = mouseY - word.y;
  } else {
    _locked = false;
  }

}

function mouseDragged() {

  if (_locked) {

    let word = findWord(mouseX, mouseY);

    if (word == null) {

      _locked = false;

    } else {
      word.x = mouseX - _xOffset;
      word.y = mouseY - _yOffset;
    }
  }
}

function mouseReleased() {
  noLoop();
  _locked = false;
}

// utils 
// use to access sorted locations of word in readWords

function sortOnValues(dict) {
  let size = Object.keys(dict).length;
  if (size == 0) {
    return []
  }

  // console.log(size);
  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });
  
  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  return items;

}

// corpus handling

function chooseWords(sentences) {
  n_words = 0;
  seen_sentences = [];
  to_return = []
  while (n_words < 15) {
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

  for (let i = 0; i < seen_sentences.length; i++) {
    if (i > 0) {
      _ans = _ans.concat(" ")
    }
    _ans = _ans.concat(sentences[seen_sentences[i]]); // full sentence string
  }

  // returns list of words
  return to_return
}

function aliceWords() { // todo: prune these so they make grammatical sense
  sentences = ['Alice thought she had plenty of time, as she could remember them, all ornamented with hearts.', 
  "She tucked her arm affectionately into Alice's and they sat down at her rather inquisitively.", 
  'She stretched herself up on tiptoe and peeped over the edge and her eyes fell upon a little pattering of feet in the court was in the air.', 
  'Her first idea was that this might belong to one of the shelves as she could for sneezing.', 
  'She got up this morning?', 
  'She had found her way into a graceful zigzag and was just in time to see it trot away quietly into the garden.', 
  'The Duchess took her choice, and was delighted to find her in such a curious croquet-ground in her life; it was too dark to see.',
  'At last she spread out her hand and a scroll of parchment in the distance and she felt certain it must be really offended.', 
  'There is such a curious appearance in the lock, and to her ear.', 
  'The next moment a shower of saucepans, plates and dishes.', 
  'For the Mouse in the distance and she set to work at once set to work at once to eat some of the trees had a consultation about this.', 
  'And after a few minutes she heard a little table, all made of solid glass.', 
  'The Mouse was bristling all over and she hastily dried her eyes, immediately met those of a tree in front of the water and seemed to be lost.', 
  'Then came a rumbling of little animals and birds waiting outside.', 
  'Alice had not gone much farther before she had been anything near the right size that it was indeed!', 
  'She did not get hold of anything, but she ran off as hard as it was just possible it had been.', 
  'At last came a little shriek and a fall and a bright idea came into her face and was beating her violently with its arms folded, frowning like a thunderstorm!', 
  'She soon found herself safe in a minute or two, and the blades of grass, but she did not seem to encourage the witness at all.',
  'He kept shifting from one end to the table, but it was all dark overhead; before her was another long passage and the people near the looking-glass.', 
  'As soon as she could not possibly reach it: she could not even get her head through the glass and she very good-naturedly began hunting about for some way of escape, when she turned away.', 
  'However, they got settled down again, the cook had disappeared.', 
  'When Alice next peeped out, the Fish-Footman was gone, and the people near the door and went to the heads of the house.',
  'Quite forgetting that she had put on your shoes and stockings for you now, dears?', 
  'Alice went back to the door, staring stupidly up into a tree.', 
  'Alice went back to the Knave was standing before them, in chains, with a great crowd assembled about them.',
  'All sorts of little pebbles came rattling in at the sides of the gloves and was gone in a moment.', 
  'The miserable Hatter dropped his teacup and bread and butter in the lock, and to her great delight, it fitted!', 
  'There was a little startled, however, when she turned away.', 
  'Alice drew her foot as far down the chimney as she said this, she came suddenly upon an open place, with a trumpet in one hand and a fan!', 
  'The next witness was the Rabbit and had no reason to be full of soup.', 
  'Alice drew her foot slipped, and in another moment, splash! she was now the right size for going through the doorway.', 
  'Just as she could do, lying down on one of the garden; the roses growing on it were white, but there were ten of them, with her arms folded, frowning like a thunderstorm!', 
  'On various pretexts they all moved off and Alice was not a moment that it might not escape again.', 
  'Alice had found her way into a cucumber-frame or something of that dark hall and close to her feet, for it flashed across her mind that she had been broken to pieces.']

  return chooseWords(sentences)

}

// string similarity -- from https://github.com/aceakash/string-similarity/blob/master/compare-strings.js
function compareTwoStrings(first, second) {

	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (!first.length && !second.length) return 1;                   // if both are empty strings
	if (!first.length || !second.length) return 0;                   // if only one is empty string
	if (first === second) return 1;       							 // identical
	if (first.length === 1 && second.length === 1) return 0;         // both are 1-letter strings
	if (first.length < 2 || second.length < 2) return 0;			 // if either is a 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = 0;

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = compareTwoStrings(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating > ratings[bestMatchIndex].rating) {
			bestMatchIndex = i
		}
	}
	
	
	const bestMatch = ratings[bestMatchIndex]
	
	return { ratings, bestMatch, bestMatchIndex };
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') return false;
	if (!Array.isArray(targetStrings)) return false;
	if (!targetStrings.length) return false;
	if (targetStrings.find(s => typeof s !== 'string')) return false;
	return true;
}

// old reading method
function readWords() {

  // create dictionary for y coordinates of each word to read
  let yDict = {};
  for (let i = 0; i < _numwords; i++) {
    let currWord = _words[i];
    if (currWord.x > _canvX_start + 60){  // only read in relevant region
      yDict[i] = currWord.y;

    }
  }

  // sort
  sortedY = sortOnValues(yDict);

  // if there are no words to analyze
  if (sortedY.length == 0) {
    return ""
  }

  // console.log(sortedY.length);

  // isolate rows
  let startY = sortedY[0][1]; // smallest y value seen
  // then go through row by row, moving 30 y at a time
  let rownum = 0;
  for (let y = startY; y < _canvY; y = y + 30) {

    // find all words in current row
    let currRowWords = {}
    currRowWrds = []

    for (let i = 0; i < sortedY.length; i++) {
      if (sortedY[i][1] < y + 30 && sortedY[i][1] >= y) {
        let ind = sortedY[i][0];
        // it's going through this loop for all words but not saving in array
        // currRowWords[parseInt(ind)] = _words[parseInt(ind)].x;
        // currRowWrds.push([ind, _words[ind].x]);
        
      } 
    }

    if (Object.keys(currRowWords).length == 0) {
      continue;
    }
    console.log(rownum);
    console.log(Object.keys(currRowWords));
    console.log(currRowWrds);

    // sort words in current row by X
    // sortedRow = sortOnValues(currRowWords);
    
    sortedRow = currRowWrds.sort(function(first, second) {
      return second[1] - first[1];
    });
    console.log(sortedRow);
    let rowText = "";
    for (let i = 0; i < sortedRow.length; i++) {
      currWordValue = _words[sortedRow[i][0]].name;
      rowText = rowText.concat(" ")
      rowText = rowText.concat(currWordValue);
    }

    usergen = usergen.concat(rowText);

    rownum = rownum + 1;
  }
  
  console.log(usergen);
  return usergen;
}