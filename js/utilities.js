/*
  Move one div back and forward; starts from left to right
*/
function myMoveL(elem, speed) {
  var pos = window.minPosition; //0
  var lead = 1;
  moveIntervalId = setInterval(frame, speed);
  function frame() {
    pos += lead;
    // 120
    if (pos == window.maxPosition) {// 120
      //clearInterval(moveIntervalId);
      lead = -1;

    } else if (pos == window.minPosition){ // -20
      lead = 1;

    } else{
      //elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

/*
  Move one div back and forward; starts from right to left
*/
function myMoveR(elem, speed) {
  var pos = window.maxPosition;// 120
  var lead = -1;
  moveIntervalIdR = setInterval(frame, speed);
  function frame() {
    pos += lead;

    if (pos == window.maxPosition) {// 120
      //clearInterval(moveIntervalId);
      lead = -1;

    } else if (pos == window.minPosition){ // -20
      lead = 1;

    } else {
      //elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}
/*
  This function move object to right; not return back; then remove all balls
*/
function myMoveToRightAndStop(elem, speed) {
  var pos = window.minPosition; // 0
  moveIntervalId = setInterval(frame, speed);
  function frame() {
    // add blink for warning
    if (pos == (window.maxPositionOneWay-250))
      elem.classList.add("blink");

    if (pos == window.maxPositionOneWay) { // 450
      clearInterval(moveIntervalId);
      //pos=0;
      elem.innerHTML = "";
      gameOver();
    } else {
      pos++;
      //elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

/*
  Generate random integer between two numbers;
  For example: random between 0 and 2; results will be 1, 0, 2
  Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

/*
  Get new index random that not exist in the list
*/
function getNewRandomInt(min, max, myList){
  var result = getRandomInt(min, max);
  while (myList.indexOf(result) > -1) {
    result = getRandomInt(min, max);
  }
  return result;
}

/*
  Return hours: 0-23
*/
function getHours(){
  var d = new Date();
  return d.getHours();
}

/*
  function to get day or night
*/
function whatTime(){
  var day = [6,7,8,9,10,11,12,13,14,15,16,17];
  //var night =[18,19,20,21,22,23,0,1,2,3,4,5];
  var hourNow = getHours();
  if (day.indexOf(hourNow) > -1)
    return "day";
  return "night";
}

/*
  Function to get JSon file and return a JavaScript objects
*/
function processJSON(filename){
    var data;

    //usage:
    readTextFile(filename, function(text){
        data = JSON.parse(text);
    });


    return data;
}
// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
