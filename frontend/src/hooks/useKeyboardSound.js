
const keyStrokeSounds = [new Audio("/sounds/keystroke1.mp3"),
                         new Audio("/sounds/keystroke2.mp3"),
                        new Audio("/sounds/keystroke3.mp3"),
                        new Audio("/sounds/keystroke4.pm3"), ];


function useKeyboardSound() {

    const playRandomKeystrokeSound = () => {

        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

        randomSound.currentTime = 0; // This is for better UX, def add this. 
        randomSound.play().catch(error => console.log("Audio play failed: ", error));

    };

    return {playRandomKeystrokeSound};
}

export default useKeyboardSound;