/*
  Description: Create Table element;
  Return: table element
*/
function createTable(){
  //create element P
  var element = document.createElement("table");
  return element;
}


/*
  Description: Create tr element, table row element
  Return: Tr element
*/
function createTr(){
  var element = document.createElement("tr");
  return element;
}
/*
  Param: text string, text inside the created th
  Description: Create th element
  Return: th element
*/
function createTh(text){
  var element = document.createElement("th");
  var textNote = document.createTextNode(text);
  element.appendChild(textNote);
  return element;
}
/*
  Param: text string, text of table cell
  Description: Create td element
  Return: td element
*/
function createTd(text){
  var element = document.createElement("td");
  var textNote = document.createTextNode(text);
  element.appendChild(textNote);
  return element;
}

/*
  Params: text string, text of P;
          className string, css stylesheet class name
  Description: Create dynamic paragraph with its title text
  Return: P element
*/
function createParagraph(text, className){
  //create element P
  var element = document.createElement("p");
  // create text node for p
  var t = document.createTextNode(text);

  // Append the text to <p>
  element.appendChild(t);

  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }

  return element;
}

/*
  Params: text string, text of h2
          className string, css stylesheet class name, optional
  Description: To create heading H1
  Return: H2 element
*/
function createHeading1(text, className){
  var element = document.createElement("h1");

  var t = document.createTextNode(text);
  element.appendChild(t);
  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }

  return element;
}

/*
  Params: text string, text of h2
          className string, css stylesheet class name, optional
  Description: To create heading H2
  Return: H2 element
*/
function createHeading2(text, className){
  var element = document.createElement("h2");

  var t = document.createTextNode(text);
  element.appendChild(t);
  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }

  return element;
}

/*
  Params: text string of h3 text;
          className string, css class name, optional
  Description: To create heading H3 html element
  Return: H3 element
*/
function createHeading3(text, className){
  var element = document.createElement("h3");

  var t = document.createTextNode(text);
  element.appendChild(t);
  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }
  return element;
}


/*
  Param: className strng of css class name
  Description: To create DIV
  Return: div element
*/
function createDiv(className){
  var element = document.createElement("div");

  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }

  return element;
}

/*
  Params: text string of span,
          className css style
  Description: To create SPAN
  Return: span element
*/
function createSpan(text, className){
  var element = document.createElement("span");
  var t = document.createTextNode(text);
  element.appendChild(t);

  if (typeof className !== 'undefined')
    element.classList.add(className);
  return element;
}

/*
  Params: title string of text,
          className string of stylesheet class name (optional)
  Description: To create BUTTON
  Return: Button element
*/
function createButton(title, className){
  var element = document.createElement("BUTTON");        // Create a <button> element

  var t = document.createTextNode(title);       // Create a text node
  element.appendChild(t);
  if (typeof className !== 'undefined')
    element.classList.add(className);
  return element;
}


/*
  param: className optional, set style for input
  Description: To create Textbox, input text
  Return:input element
*/
function createTextBox(className){
  var element = document.createElement("input");

  //textBox.type = "text";
  element.setAttribute("type", "text");
  element.id = id;
  if (typeof className !== 'undefined'){
    element.classList.add(className);
  }

  return element;
}

/*
  Params: imageSrc string, path of image
  Description: To create image: img
  Return: Image element
*/
function createImage(imageSrc){
  var element = document.createElement("img");
  element.src = imageSrc;

  return element;
}

  /*
    Description: Create Basket div
    Return: div container as a basket with body of basket and footer of basket
  */
  function createBasket(colourName){

    //colourName = "White";
    var basket = createDiv("myBasket");

    basket.style.borderColor = colourName;
    basket.style.backgroundColor = colourName;

    basket.bodyBasket = createDiv("bodyBasket");
    if (colourName === "White")
      basket.bodyBasket.style.backgroundColor = "Black";
    basket.footerBasket = createDiv("footerBasket");
  //  footerBasket.style.backgroundColor = colourName;
    basket.appendChild(basket.bodyBasket);
    basket.appendChild(basket.footerBasket);
    basket.onclick = function(){
      playOneSound("sounds/colours/" + colourName + ".mp3");
    }
    return basket;
  }

  /*
    Description: This function is called to create ball with colour
    Return: div element of ball
  */
  function createColourBall(colourName){
    var ball = createDiv("myBall");
    ball.style.backgroundColor = colourName;
    ball.setAttribute("draggable", "true");
    return ball;
  }
  /*
    Params: limitInterval int, duration in seconds; ex. 20: it will do countdown for 20s,
    Description: This function is used to create coundown component; it return a div component and id of interval to reset if needed
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown;
    Return: object of (timerUi:countDown component and myTimer:timer id to use next time for clearing each timer)
  */
  function createCountdown(limitInterval){
    // Set the date we're counting down to
    var countDownDate = new Date().getTime() + limitInterval * 1000;
    var countdown = createDiv("countDown");
    countdown.id = "countDown";

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in a div element
        countdown.innerHTML = seconds;

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            countdown.innerHTML = "0";
            gameOverTimeOut();
            // document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);

    return {timerUi:countdown, myTimer:x};
  }

  /*
    Param: elementId string, id of an HTML element
    Description: Delete content of container; just make it to be reusable
  */
  function deleteContentElement(elementId){
    var element = document.getElementById(elementId);
    element.innerHTML = "";
  }

  /*
    Description: hide one div; this will remove all classes then add className hide
  */
  function hideElement(elementId){
    var element = document.getElementById(elementId);
    element.className = element.className.replace(/\bmystyle\b/g, "");
    element.classList.add("hide");
  }

  /*
    Description: This will clear all timer to repaly, after win, or game over
  */
  function clearAllTimers(){
    clearInterval(myGameTimer);
    clearInterval(moveIntervalId);
    clearInterval(moveIntervalIdR);
  }

  /*
    Description: Clear Head and Body; and also interval id
  */
  function deleteGameHeadBody()
  {
    // clearHead
    deleteContentElement("gameHead");
    // clearBody
    deleteContentElement("gameBody");

  }

  /*
    Description: This function will be called when other event set beside timer;
  */
  function gameOver(){

    // Clear all timer ids to make sure everything clear after game is over
    clearAllTimers();
    //alert("EXPIRED");
    var gameFooter = document.getElementById("gameFooter");
    gameFooter.classList.remove("hide");
    gameFooter.classList.add("footerContainer");

    // hide nextLevel;
    hideElement("goNextLevel");

    // Clear game playing UI
    //deleteGameHeadBody();
    deleteContentElement("gameBody");

    // hide Coundown
    hideElement("countDown");

    // hide go home button
    hideElement("goHome");

    var gameOverImg = createImage("images/animations/gameover.gif");
    gameOverImg.id = "gameOver";
    gameBody.appendChild(gameOverImg);
    playOneSound("sounds/actions/gameover.wav");
  }
  /*
    Description: This function is called while game over by timeout
  */
  function gameOverTimeOut(){


    clearAllTimers();
    //alert("EXPIRED");
    var gameFooter = document.getElementById("gameFooter");
    gameFooter.classList.remove("hide");
    gameFooter.classList.add("footerContainer");

    // hide nextLevel;
    hideElement("goNextLevel");

    // delete game body content
    deleteContentElement("gameBody");

    // hide Coundown
    hideElement("countDown");

    // hide go home button
    hideElement("goHome");

    var gameOverImg = createImage("images/animations/gameover.gif");
    gameOverImg.id = "gameOver";
    gameBody.appendChild(gameOverImg);
    playOneSound("sounds/actions/timeout.mp3");
  }

  /*
    Description: This function is called when user won;
  */
  function youWon(){

    // clear all timer
    clearAllTimers();

    // update total scores at game home
    var spanHome = document.getElementById("homeScore");
    spanHome.textContent = "Score: " + totalScores();
    //homeContainer.classList.remove("hide");
    var gameFooter = document.getElementById("gameFooter");
    gameFooter.classList.remove("hide");
    gameFooter.classList.add("footerContainer");

    // show nextLevel;
    if (currentGameSetting.currentLevel < gameScores.length)
    {
      console.log("You won: " + currentGameSetting.currentLevel);
      var nextLevelBtn = document.getElementById("goNextLevel");
      nextLevelBtn.classList.remove("hide");
      nextLevelBtn.classList.add("gameButton");
    }
    //deleteGameHeadBody();
    deleteContentElement("gameBody");

    // hide Coundown
    hideElement("countDown");

    // hide go home button
    hideElement("goHome");

    // Update opacities of playing stars
    updatePlayingWinStars(currentGameSetting.currentLevel);

    // update game scores
    var spanScore = document.getElementById("spanGameScore");
    spanScore.textContent = " Scores: " + totalScores() + " ";

    var gameWon = createImage("images/animations/bingo.gif");
    gameWon.id = "gameWon";
    gameBody.appendChild(gameWon);
    playOneSound("sounds/actions/cheering.mp3");

    // update star opacity to current level
    updateWinStars(currentGameSetting.currentLevel);

    // create star for next level
    if (currentGameSetting.currentLevel < gameScores.length)
      createStars(currentGameSetting.currentLevel + 1);
  }

  /*
    Description: Create button HOME
    Return: Button element
  */
  function createButtonHome(){
    // Add button HOME
    var btnHome = createButton("Home", "gameButton");
    var imgHome = createImage("images/animations/home.png");
    imgHome.classList.add("retryBackground");
    btnHome.appendChild(imgHome);

    btnHome.onclick=function(){
      homeContainer.classList.remove("hide");
      var gameFooter = document.getElementById("gameFooter");

      clearAllTimers();

      deleteGameHeadBody();

      gameFooter.classList.remove("footerContainer");
      gameFooter.classList.add("hide");
    }
    return btnHome;
  }

  /*
    Params: levelId int; ex. 1, 2, 3, ..., 12
    Description:Create 3 stars for each level by default its opacity=0.1
  */
  function createStars(levelId){
    var buttonLevel = document.getElementById("level" + levelId);
    var checkStarExisted = document.getElementById("lvl" + levelId +"_star1");
    console.log(checkStarExisted);
    if (checkStarExisted == null){ // Create only 3 stars
      for (var i=1; i<window.NumberStars + 1; i++){
        var star = createImage("images/animations/star.png");
        star.classList.add("star");
        star.style.opacity = 0.2;
        star.id = "lvl" + levelId + "_star" + i;
        buttonLevel.appendChild(star);
      }
    }
  }

  /*
    Params: levelId int; ex. 1, 2, 3, ..., 12
    Description:this will be used in Home levels reset style opacity = 1 if win one game;
                10:1 star, 20: 2stars, >30: 3stars
  */
  function updateWinStars(levelId){
    var scoreLevel = gameScores[levelId-1];
    var nbStar = scoreLevel / 10;
    if (nbStar > window.NumberStars)
      nbStar = window.NumberStars;
    for (var i=1; i < nbStar + 1; i++){
      var star = document.getElementById("lvl" + levelId + "_star" + i);
      star.style.opacity = 1; // see clearly
    }
  }

  /*
    Param: levelId int, 1, 2,3, ..., 12
    This will use to update opacity of the 3 stars at playing level;
  */
  function updatePlayingWinStars(levelId){
    var scoreLevel = gameScores[levelId-1];
    var nbStar = scoreLevel / 10;
    if (nbStar > window.NumberStars)
      nbStar = window.NumberStars;
    for (var i=1; i < nbStar + 1; i++){
      var star = document.getElementById("playing" + levelId + "_star" + i);
      star.style.opacity = 1; // see clearly
    }
  }

  /*
    param: container div HTML element; it will create Audio element and append to this container
    Description: This function is used to start a sound randomely when user start game;
  */
  function playSound(container){
      // get random number to use as index of sounds array
      var soundIndRand = getRandomInt(0, sounds.length);

      // Create Audio with id: player to play sounds
      var mySound = createAudio("sounds/" + sounds[soundIndRand]);
      mySound.id = "player";

      // play next song while finish one song rather than repeat one song during the game plays
      mySound.onended = function(){
      var newIndRand = getRandomInt(0, sounds.length);
      mySound.src = "sounds/" + sounds[newIndRand];
      console.log("Next sound: " + mySound.src);
    }
    container.appendChild(mySound);
  }
