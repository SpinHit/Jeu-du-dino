
document.addEventListener("DOMContentLoaded", () => {
  
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.getElementById("alert");
  document.getElementById("score").innerHTML = +score;

  var score = 0;

  var sautSound = new Audio("asset/saut.mp3");
  var hitSound = new Audio("asset/hit.mp3");
  
  let isJumping = false;
  let gravity = 0.9;
  let isGameOver = false;


// jump event+ restart partie
  function control(e) {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        sautSound.play();
        jump();
      }
    }
    if (e.keyCode === 82) {
      location.reload(true);
    }
  }
//jump dino 
  document.addEventListener("keyup", control);
  let position = 0;
  function jump() {
    let count = 0;
    let timerId = setInterval(function () {
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(function () {
          if (count === 0) {
            clearInterval(downTimerId);
            isJumping = false;
          }
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + "px";
        }, 20);
      }
      position += 30;
      count++;
      
      position = position * gravity;
      dino.style.bottom = position + "px";
    }, 20);
  }
//génération des cactus
  function generateObstacles() {
    //vitesse d'apparition des obstacles 

    let randomTime = Math.random() * 2500;
    // distance a la quel apparaissent les obstacles
    let obstaclePosition = 2000;
    // hitSoundbox de l'obstacle
    let largeurObstacle = 46;
    let hauteurObstacle = 92;
    // création de l'obstacle
    const obstacle = document.createElement("div");
    
    if (!isGameOver) obstacle.classList.add("obstacle"); 
    
    // compteur pour le score
    document.getElementById("score").innerHTML = +score;
    score+=10;

    grid.appendChild(obstacle);

    obstacle.style.left = obstaclePosition + "px";


    let timerId = setInterval(function () {
      //collision + game over
      if(!isGameOver){if (obstaclePosition > 0 && obstaclePosition < largeurObstacle && position < hauteurObstacle) {
        hitSound.play();
        clearInterval(timerId);
        alert.innerHTML = "Game Over <br /> Taper R pour Rejouer";
        isGameOver = true;
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
        
      }}
      // vitesse des obstacles

      obstaclePosition -= 15;
      obstacle.style.left = obstaclePosition + "px";


    }, 20);
    if (!isGameOver) setTimeout(generateObstacles, randomTime);
  }
  generateObstacles();
  
});
