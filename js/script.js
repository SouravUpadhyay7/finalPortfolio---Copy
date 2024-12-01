const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



const roles = ["Backend Developer", "Python Developer", "AI/ML Enthusiast", "Data Science Enthusiast"] ;
const roleElement = document.getElementById('dynamic-role');
let roleIndex = 0;

function changeRole() {
    roleElement.style.opacity = 0; // Start fade-out
    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleElement.textContent = roles[roleIndex];
        roleElement.style.opacity = 1; // Fade back in
    }, 300); // Wait for fade-out before changing text
}

// Change role every 1 second
setInterval(changeRole, 2000);


function openPopup(certId) {
    const popup = document.getElementById(certId + '-popup');
    popup.classList.add('active');
}

function closePopup(certId) {
    const popup = document.getElementById(certId + '-popup');
    popup.classList.remove('active');
}


//music section

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const canvas = document.getElementById("spectrum");
const ctx = canvas.getContext("2d");
let audioContext, analyser, source, frequencyData;

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    playIcon.textContent = "⏸";
    startVisualizer();
    triggerConfetti();
  } else {
    audio.pause();
    playIcon.textContent = "▶";
  }
}

function startVisualizer() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    frequencyData = new Uint8Array(analyser.frequencyBinCount);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);

    const barWidth = (canvas.width / frequencyData.length) * 2.5;
    let x = 0;

    for (let i = 0; i < frequencyData.length; i++) {
      const barHeight = frequencyData[i];
      const red = (barHeight + 50) % 255;
      const green = (barHeight * 1.5) % 255;
      const blue = (barHeight * 2) % 255;

      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    if (!audio.paused) {
      requestAnimationFrame(draw);
    }
  }

  draw();
}

function triggerConfetti() {
    const confettiCount = 150; // Number of confetti pieces
    const confettiContainer = document.createElement("div");
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.overflow = "hidden";
    confettiContainer.style.pointerEvents = "none";
    document.body.appendChild(confettiContainer);
  
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti-piece");
  
      // Random position, size, and color for each piece
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `${Math.random() * -20}px`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.animationDuration = `${Math.random() * 1.5 + 1}s`;
  
      confettiContainer.appendChild(confetti);
  
      // Remove the confetti piece after its animation ends
      confetti.addEventListener("animationend", () => {
        confetti.remove();
      });
    }
  
    // Remove the container after all confetti is gone
    setTimeout(() => {
      confettiContainer.remove();
    }, 2000);
  }
  



    
