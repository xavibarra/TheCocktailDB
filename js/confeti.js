// Function to launch the confetti animation
export default function launchConfetti() {
  const count = 800,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    const numParticles = Math.floor(count * particleRatio);
    const numParticlesColor1 = Math.floor(numParticles / 2);
    const numParticlesColor2 = numParticles - numParticlesColor1;

    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: numParticles,
        colors: ["rgba(255, 234, 0)", "rgb(0, 0, 0)"],
        counts: [numParticlesColor1, numParticlesColor2],
        decay: 0.95,
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
