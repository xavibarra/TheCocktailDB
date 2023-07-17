// another_file.js
export function showResults(result) {
  // Aquí puedes realizar acciones basadas en el resultado (result)
  if (result) {
    console.log("El resultado es verdadero");
    const correctMessage = document.getElementById(
      "correct-ingredients-options"
    );
    correctMessage.classList.remove("hidden");
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
  } else {
    console.log("El resultado es falso");
    // Realizar acciones cuando result es falso
    const incorrectMessage = document.getElementById(
      "incorrect-ingredients-options"
    );
    incorrectMessage.classList.remove("hidden");
  }
}
