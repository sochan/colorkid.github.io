/*
  This function used to create Audio to play sound;
*/
function createAudio(path){
  console.log("Start sound: " + path);
  var element = document.createElement("audio");
  //element.setAttribute("autoplay", true);
  element.autoplay = true;
  element.src = path;
  element.type = 'audio/mp3';
  element.controls = 'controls';
  element.classList.add("mute");
  element.volume = 0.1;
  return element;
}

/*
  Param: path string, directory source of video
  Description: This function is used to create Video element
  Return: video element
*/
function createVideo(path){
  var element = document.createElement("video");

  element.src = path;
  element.type = 'video/mp4';
  element.controls = 'controls';
  element.classList.add("video");
  return element;

}

/*
  Function to play a sound
*/
function playOneSound(path){
  console.log("Play sound: " + path);
  var audio = new Audio(path);
  audio.play();
}


//https://www.dl-sounds.com/royalty-free/category/children/page/3/

window.sounds = [
  "Carolans_Dream.mp3",
  "Happy_Loop.wav",
  "Hush_little_baby.mp3",
  "Little_Boy_Music_Box.wav",
  "Rock_a_bye_Baby.mp3",
  "Turkey_Purring.mp3",
  "distortion.mp3",
  "Brahms_lullaby.mp3",
  "ABC_song.mp3",
  "Digital_Kid_Loop.wav",
  "If_you_Happy.mp3",
  "Jambalaya_Loop.wav",
  "Twinkle_Little_Star.mp3"
]
