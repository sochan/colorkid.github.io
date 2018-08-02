
/*
  Current game setting
*/
var currentGameSetting = {
  currentLevel: 0,
  baskets:[],
  basketIndexes: []
};

var gameScores = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];



var allGameLevels = [];
var gameScore=0;
var moveIntervalId;
var moveIntervalIdR; // Use this for move baskets and balls

var totalBalls = 0;
var correctNumber =0;
var myGameTimer = null;

var mainContainer = null;
var currentPage = null;
var homeContainer = null;
var currentDraggingObject = null;
var maxNbBaskets = 4;

/*
  Get total scores during play game
*/
var totalScores = function(){
  var total = 0;
  for (var i=0; i < gameScores.length; i++){
    total += gameScores[i];
  }
  return total;
}

/*
  This function is called whenever the level clicked
*/
function resetGameVariables(gameLevel){
  console.log("resetGameVariables(): currentLevel: " + gameLevel);
  // reset array to put new colours
  currentGameSetting.basketIndexes =[];
  totalBalls = 0;
  currentGameSetting.baskets = [];
  var nbBaskets = gameLevel;
  if (gameLevel > maxNbBaskets)
    nbBaskets = maxNbBaskets;
  for (var i=0; i< nbBaskets; i++){
      var numberOfBall = getRandomInt(2, 5);
      totalBalls += numberOfBall;
      var newIndexRand = getNewRandomInt(0, colourList.length, currentGameSetting.basketIndexes);
      currentGameSetting.basketIndexes.push(newIndexRand);
      currentGameSetting.baskets.push({
        colour : colourList[newIndexRand],
        balls: numberOfBall,
      });
  }
}

/*
  Drag and Drops functions
*/
function allowDrop(event) {
    event.preventDefault();
}

/*
  This function called from objects to be draged
  event.target : dragging object
*/
function dragBallStart(event) {
    // document.body.classList.remove("errorOccurred");
    currentDraggingObject = event.target;
    event.dataTransfer.setData("text", currentDraggingObject.id);
}

/*
  basket: the div container
  This function is called while drop a ball into a basket
*/
function createOnBoxDropFunction(basket){
  // This function gets called whenever a drop event occurs
  return function(event){

    // Error checking
    if (currentDraggingObject == null) return;

    console.log("Current ball colour: " + currentDraggingObject.myColour);
    console.log("Basket colour is: " + basket.myColour);
    // Check if the shape and the box shape are the same
    if (currentDraggingObject.myColour == basket.myColour)
    {
      // Remove X
      //basket.innerHTML = "";
      basket.bodyBasket.appendChild(currentDraggingObject);
      currentDraggingObject = null;
      correctNumber++;
      // Game won
      if (correctNumber == totalBalls)
      {
        gameScores[currentGameSetting.currentLevel-1] += 10;
        console.log(gameScores);
        unlockedHomeLevels();
        clearInterval(myGameTimer);
        youWon();
      }
    }
    else {
      currentDraggingObject = null;
      //box.appendChild(spanErr);
    }

    //Must have this for dragging
    event.preventDefault();
  }
}



/*
  Reset game body; recreate baskets and balls
*/
function resetGameUI()
{
  resetGameVariables(currentGameSetting.currentLevel);

  clearAllTimers();

  var gameFooter = document.getElementById("gameFooter");
  gameFooter.classList.remove("footerContainer");
  gameFooter.classList.add("hide");
  loadBackground();

  deleteGameHeadBody();

  currentPage = null;

  // Create Head UI game
  createGameHeadUi();
  // Create Body UI game
  createGameBodyUi();
}

/*
  This function is used to create head of game; it contains countdown,
  level and score and home or try other colour while user do not like the current colour
*/
function createGameHeadUi(){

  var headContainer = document.getElementById("gameHead");
  // Coundown timer here
  var myCountdown = createCountdown(window.myTime[currentGameSetting.currentLevel-1]);
  myGameTimer = myCountdown.myTimer;
  headContainer.appendChild(myCountdown.timerUi);

  // Show level number and its stars
  var divLevel = createDiv("levelContainer");
  var imgLevel = createImage("images/numbers/nb" + currentGameSetting.currentLevel + ".png");
  imgLevel.classList.add("levelGame");
  divLevel.appendChild(imgLevel);
  headContainer.appendChild(divLevel);

  // create starts
  var checkStarExisted = document.getElementById("playing" + currentGameSetting.currentLevel +"_star1");
  if (checkStarExisted == null){ // Check to not insert stars again
    for (var i=1; i<window.NumberStars + 1; i++){
      var playingStar = createImage("images/animations/star.png");
      playingStar.classList.add("star");
      playingStar.style.opacity = 0.2;
      playingStar.id = "playing" + currentGameSetting.currentLevel + "_star" + i;
      divLevel.appendChild(playingStar);
    }
  }

  updatePlayingWinStars(currentGameSetting.currentLevel);

  // container of scores
  var divScore = createDiv("gameScore");
  var textScore = createSpan(" Scores: " + totalScores() + " ");
  textScore.id = "spanGameScore";
  divScore.appendChild(textScore);

  headContainer.appendChild(divScore);

  var goHome = createButtonHome();
  goHome.id = "goHome";
  headContainer.appendChild(goHome);
}


/*
  This function is used to create coundown, baskets and
*/
function createGameBodyUi()
{
  var container = document.getElementById("gameBody");
  correctNumber =0;

  //*******  Create Baskets   *******
  var basketContainer = createDiv("basketContainer");
  //console.log(currentGameSetting.baskets);

  for (var i=0; i < currentGameSetting.baskets.length; i++){
    console.log("Basket colour in Game Setting: " + currentGameSetting.baskets[i].colour);
    var myBasket = createBasket(currentGameSetting.baskets[i].colour);
    myBasket.id = "basket" + i;
    myBasket.myColour = currentGameSetting.baskets[i].colour;
    myBasket.ondrop = createOnBoxDropFunction(myBasket);// dropWithinBox;
    myBasket.ondragover = allowDrop;
    basketContainer.appendChild(myBasket);

    container.appendChild(basketContainer);
  }

  //*******  Create balls *******
  var ballContainer = createDiv("containerBall");

  for (var i =0; i < currentGameSetting.baskets.length; i++)
  {
    // Create balls
    for (var j=0; j < currentGameSetting.baskets[i].balls; j++)
    {
      // get disturbing ball
      var wrongBallInd = getNewRandomInt(0, colourList.length, currentGameSetting.basketIndexes);
      var wrongBall = createColourBall(colourList[wrongBallInd]);
      wrongBall.myColour = colourList[wrongBallInd];
      wrongBall.ondragstart = dragBallStart;
      ballContainer.appendChild(wrongBall);
      //
      var thisColour = currentGameSetting.baskets[i].colour;
      var ball = createColourBall(thisColour);
      ball.myColour = thisColour;
      ball.ondragstart = dragBallStart;

      //ballContainer.appendChild(ball1);
      ballContainer.appendChild(ball);
    }
  }

  switch (currentGameSetting.currentLevel) {
    case 5:
      myMoveL(ballContainer, 100);
      break;

    case 6:
      myMoveL(ballContainer, 50);
      break;

    case 7:
      myMoveL(basketContainer, 100);
      myMoveR(ballContainer, 100);
      break;

    case 8:
      myMoveR(basketContainer, 50);
      myMoveL(ballContainer, 50);
      break;

    case 9:
      myMoveToRightAndStop(ballContainer, 60); // Move to left then disappear
      break;

    case 10:
      myMoveToRightAndStop(ballContainer, 50); // Move to left then disappear
      break;

    case 11:
      myMoveR(basketContainer, 50);
      myMoveToRightAndStop(ballContainer, 40); // Move to right then disappear
      break;

    case 12:
      myMoveR(basketContainer, 50);
      myMoveToRightAndStop(ballContainer, 30); // Move to right then disappear
      break;

    default:
      break;
  }
  container.appendChild(ballContainer);

}

/*
  This function is called to create Footer of Game; When game won, when game over this will create button retry or next
*/
function createGameFooterUi()
{
  // ******** Footer buttons, replay, next colour, next level
  var footerDiv = createDiv();
  footerDiv.id = "gameFooter";

  // Add button HOME
  var btnHome = createButtonHome();
  footerDiv.appendChild(btnHome);

  // Button Try again
  var btnTryAgain = createButton("Play again", "gameButton");
  // Set event to play with next colour
  btnTryAgain.onclick = function(){
    resetGameUI();
  };
  // image retry or refresh
  var imgRetry = createImage("images/animations/retry.png");
  imgRetry.classList.add("retryBackground");
  btnTryAgain.appendChild(imgRetry);

  footerDiv.appendChild(btnTryAgain);

  // Button go to next level
  var btnNextLevel = createButton("Next level", "gameButton");
  btnNextLevel.id = "goNextLevel";
  btnNextLevel.onclick = function(){
    if (currentGameSetting.currentLevel < allGameLevels.length){
        currentGameSetting.currentLevel++;
        resetGameUI();
    }
  }
  footerDiv.appendChild(btnNextLevel);

  var imgNext = createImage("images/animations/next1.png");
  imgNext.classList.add("retryBackground");
  btnNextLevel.appendChild(imgNext);

  return footerDiv;
}

/*
  This is the main function to load all scenses of the game
*/
function loadingGameLevel() {

    //console.log("Level: " + event.target.id);
    //var selectedLevel = parseInt(event.target.id);
    //currentGameSetting.currentLevel = selectedLevel;
    resetGameVariables(currentGameSetting.currentLevel);

    if (homeContainer != null)
      homeContainer.classList.add("hide");
    // hide any existing page
    if (currentPage != null)
      currentPage.classList.add("hide");
    //console.log(typeof window.game1Page);
    // check if we haven’t yet created this page
    if (typeof window.game1Page === "undefined") {

      // console.log("Start Game1 Page");

      window.game1Page = createDiv();
      window.game1Page.id = "pageColours";
      //game1Page.classList.add("page");
      mainContainer.appendChild(window.game1Page);

      //*******
      var gameHead = createDiv();
      gameHead.id = "gameHead";
      var gameBody = createDiv();
      gameBody.id = "gameBody";
      window.game1Page.appendChild(gameHead);
      window.game1Page.appendChild(gameBody);
    }

    // ******** create Head UI of game;
    createGameHeadUi();
    // ******** Create Body UI of Game
    createGameBodyUi();

    var footerGame = createGameFooterUi();

    game1Page.appendChild(footerGame);
    footerGame.classList.add("hide");

    // set the new currentPage to this game
    currentPage = game1Page;
    // show the page (now it is definitely created)
    currentPage.classList.remove("hide");
}



var muted = 0;
/*
  Loading image background randomely for day or night
*/
function loadBackground(){
  // random for change image
  var randomNum = getRandomInt(1, 13);
  var backgroundImage = "images/background/"+ whatTime()+ randomNum+ ".png";
  // Set background image
  document.body.style.backgroundImage = "url('" + backgroundImage + "')";//"url'"+(backgroundImage)+"'";

}

/*
  Onclick for muted and unmuted;
*/
function onMute(event){
  document.getElementById('player').muted=!document.getElementById('player').muted;
  muted++;
  var muteStatus = muted % 2;
  event.target.src = "images/animations/mute" + muteStatus + ".png"
}

/*
  Param: level int, ex. 1, 2, 3, ..., 12
  This is to reuse to insert locked image when game not yet reach the level;
  it starts from level 1, if user completed level 1 then level 2 will be unlocked
*/
function lockedLevel(level){
  // create image locked
  var lockedImg = createImage("images/animations/locked.png");
  lockedImg.classList.add("locked");
  level.appendChild(lockedImg);
  return lockedImg;
}

/*
  Create Game UI at start, this is one time used function
*/
function createGameHomeUi(){

  // create main container
  mainContainer = createDiv();
  document.body.appendChild(mainContainer);

  // This container contains Game title and menu to be hidden when playing
  homeContainer = createDiv();

  // Home, game title
  var headContainer = createDiv("title");
  var spanScore = createSpan("Score: 0");
  spanScore.id = "homeScore";
  headContainer.appendChild(spanScore);
  var h1 = createHeading1("Learning Colours for Kids");
  headContainer.appendChild(h1);



  // Create Menu of levels
  var menuContainer = createDiv("menu");

  var footerHomeContainer = createDiv();
  var kidImg = createImage("images/animations/kids.png");
  kidImg.classList.add("kids");
  footerHomeContainer.appendChild(kidImg);
  menuContainer.appendChild(footerHomeContainer);

  //menuContainer.appendChild(level1);

  var button1 = createButton("", "gameMenu");
  button1.id = "level1";
  button1.onclick = function(){
    currentGameSetting.currentLevel = 1;
    loadingGameLevel();
  };
  // image number
  var level1 = createImage("images/numbers/nb1.png");
  level1.classList.add("level");
  // Add image into menu buttons
  button1.appendChild(level1);
  allGameLevels.push(button1);
  menuContainer.appendChild(button1);

  // Create home button 2 to 12
  for (var i=2; i <= gameScores.length; i++){
    createHomeButton(i, menuContainer);
  }

  homeContainer.appendChild(headContainer);
  homeContainer.appendChild(menuContainer);
  mainContainer.appendChild(homeContainer);

  // ****** Footer of game
  var divFooter = createDiv("footer");
  mainContainer.appendChild(divFooter);

  // play sounds;
  var divSound = createDiv();
  divFooter.appendChild(divSound);
  playSound(divSound);

}

/*
  This is reusable component, it will create one menu button;
  Example: level 2, 3, 4, ...
*/
function createHomeButton(levelId, menuContainer){
  var button = createButton("", "gameMenu");
  button.id = "level"+levelId;
  var level = createImage("images/numbers/nb"+ levelId +".png");
  level.classList.add("level");
  button.appendChild(level);
  var imgLocked = lockedLevel(button);
  imgLocked.id = "imgLocked"+levelId;
  allGameLevels.push(button);
  menuContainer.appendChild(button);
}

/*
  This function will reset each level button for every game win; to remove locked and put the onclick event handler
*/
function unlockedHomeLevels(){
  // ex: current level is 1; it is going to unlocked level 2;
  if (currentGameSetting.currentLevel < gameScores.length) // do not take action for level 12
  {
    var nextLevel = currentGameSetting.currentLevel + 1;
    console.log("unlockedHomeLevels(): start unlocked levels: " + nextLevel);
    var btnNextLevel = allGameLevels[nextLevel - 1];
    console.log(btnNextLevel);
    // set onclick
    btnNextLevel.onclick = function(){
      currentGameSetting.currentLevel = nextLevel;
      loadingGameLevel();
    }

    // hide locked image
    var imgLocked = document.getElementById("imgLocked" + nextLevel);
    imgLocked.classList.remove("locked");
    imgLocked.classList.add("hide");
  }
}

/*
  Starting game; Load the user interfaces
*/
function startGame(){
  //playSound("../../sounds/distortion.mp3");
  //palySoundLoop();
  console.log("Game start!");
  //document.body.innerHTML = "";
  loadBackground();

  // Loading Home page of Game
  createGameHomeUi();

  createStars(1);// create 5 stars with opacity:0.2 at start with level1; will create stars for next level while won level 1;


}

window.onload = startGame;
