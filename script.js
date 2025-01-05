$(document).ready(function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const playerSize = 70;
    const kerupukSize = 50;
  
    let player = { x: 185, y: 135 };
    let kerupuk = { x: randomPosition(400 - kerupukSize), y: randomPosition(300 - kerupukSize) };
    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let timerInterval;
  
    const playerImg = new Image();
    playerImg.src = "irwan.png";
    const kerupukImg = new Image();
    kerupukImg.src = "kerupuk.png";

    const pickupSound = new Audio("pickup.mp3");
    const gameoverSound = new Audio("gameover.mp3");

    // Tombol Mulai Game
    $("#startButton").click(function () {
        score = 0;
        timeLeft = 30;
        updateScore();
        updateTimer();
        player = { x: 185, y: 135 };
        kerupuk = { x: randomPosition(400 - kerupukSize), y: randomPosition(300 - kerupukSize) };
        if (gameInterval) clearInterval(gameInterval);
        if (timerInterval) clearInterval(timerInterval);
        gameInterval = setInterval(updateGame, 50);
        timerInterval = setInterval(updateTimer, 1000);

        // Menyembunyikan tombol Mulai dan menampilkan tombol Restart
        $("#startButton").hide();
        $("#restartButton").show();
    });

    // Tombol Restart Game
    $("#restartButton").click(function () {
        score = 0;
        timeLeft = 30;
        updateScore();
        updateTimer();
        player = { x: 185, y: 135 };
        kerupuk = { x: randomPosition(400 - kerupukSize), y: randomPosition(300 - kerupukSize) };

        // Menyembunyikan tombol Restart dan menampilkan tombol Mulai
        $("#restartButton").hide();
        $("#startButton").show();

        // Memulai ulang permainan
        if (gameInterval) clearInterval(gameInterval);
        if (timerInterval) clearInterval(timerInterval);
        gameInterval = setInterval(updateGame, 50);
        timerInterval = setInterval(updateTimer, 1000);
    });
  
    // Input keyboard
    $(document).keydown(function (e) {
        if (e.key === "ArrowUp" && player.y > 0) player.y -= 10;
        if (e.key === "ArrowDown" && player.y < canvas.height - playerSize) player.y += 10;
        if (e.key === "ArrowLeft" && player.x > 0) player.x -= 10;
        if (e.key === "ArrowRight" && player.x < canvas.width - playerSize) player.x += 10;
    });

    // Update game
    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayer();
        drawKerupuk();
        checkCollision();
    }

    // Gambar pemain
    function drawPlayer() {
        ctx.drawImage(playerImg, player.x, player.y, playerSize, playerSize);
    }

    // Gambar kerupuk
    function drawKerupuk() {
        ctx.drawImage(kerupukImg, kerupuk.x, kerupuk.y, kerupukSize, kerupukSize);
    }

    // Cek tabrakan
    function checkCollision() {
        if (
            player.x < kerupuk.x + kerupukSize &&
            player.x + playerSize > kerupuk.x &&
            player.y < kerupuk.y + kerupukSize &&
            player.y + playerSize > kerupuk.y
        ) {
            score++;
            updateScore();
            pickupSound.play();
            kerupuk = { x: randomPosition(400 - kerupukSize), y: randomPosition(300 - kerupukSize) };
        }
    }

    // Update skor
    function updateScore() {
        $("#score").text(score);
    }

    // Update timer
    function updateTimer() {
        $("#timer").text(timeLeft);
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            gameoverSound.play();
            alert("Game Over! Skor Anda: " + score);

            // Menampilkan tombol restart setelah game over
            $("#restartButton").show();
        }
        timeLeft--;
    }

    // Posisi acak
    function randomPosition(max) {
        return Math.floor(Math.random() * max);
    }
    // Fungsi untuk memulai game
function startGame() {
    // Tambahkan kelas untuk menghentikan scroll
    document.body.classList.add('no-scroll');
  
    // Logika game dimulai
    console.log('Game dimulai!');
    initGame();
  }
  
  // Fungsi untuk mengakhiri game
  function endGame() {
    // Hapus kelas untuk mengaktifkan scroll kembali
    document.body.classList.remove('no-scroll');
  
    // Logika game selesai
    alert('Game selesai!');
  }
  
  // Tambahkan event listener untuk tombol Mulai Game
  document.getElementById('startButton').addEventListener('click', startGame);
  let touchStartX = 0;
  let touchStartY = 0;
  
  // Menghandle touch start
  document.getElementById('gameCanvas').addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });
  
  // Menghandle touch move (gerakan di layar)
  document.getElementById('gameCanvas').addEventListener('touchmove', (e) => {
    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;
  
    // Menentukan arah gerakan
    if (touchEndX > touchStartX) {
      // Geser kanan
      moveRight();
    } else if (touchEndX < touchStartX) {
      // Geser kiri
      moveLeft();
    }
  
    if (touchEndY > touchStartY) {
      // Geser bawah
      moveDown();
    } else if (touchEndY < touchStartY) {
      // Geser atas
      moveUp();
    }
  
    touchStartX = touchEndX;
    touchStartY = touchEndY;
  });
    
});
