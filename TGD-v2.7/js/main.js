
// FINAL Load ---------------------------------------------------------------------------------------------------------------------------------

function loadScene(sceneNumber) {
    setTimeout(function () {
        changeScene(sceneNumber);
    }, 2000);
}

function loadScene2(sceneNumber) {
    setTimeout(function () {
        changeScene(sceneNumber);
    }, 200);
}

function loadScene3(sceneNumber) {
    setTimeout(function () {
        changeScene(sceneNumber);
    }, 10000);
}


// END ---------------------------------------------------------------------------------------------------------------------------------


// ---------------------------------------------------
// (ALL TYPES OF VOICES) TYPE WRITER v2 WITH SOUND ---------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------



// Mapping of classes to their respective sound file paths
const soundFiles = {
    typewriterSoundD23: '/sfx/happySfx1.mp3',
    typewriterSoundD4: '/sfx/evilSfx1.mp3',
    typewriterSoundD0: '/sfx/d0Sfx.mp3',
    // Default sound path if no class matches
    default: '/sfx/neutralSfx.mp3'
};

function changeScene(nextScene, delay) {
    setTimeout(function () {
        // Hide the current active scene
        const currentScene = document.querySelector('.active');
        if (currentScene) currentScene.classList.remove('active');

        // Show the next scene
        const nextSceneElement = document.getElementById('scene' + nextScene);
        if (nextSceneElement) {
            nextSceneElement.classList.add('active');
            applyTypewriterEffectToNewScene(nextSceneElement.id);
        }
    }, delay);
}

function applyTypewriterEffectToNewScene(newSceneId) {
    const newSceneElement = document.getElementById(newSceneId);
    const typewriterElements = newSceneElement.querySelectorAll('.typewriter');

    typewriterElements.forEach(element => {
        typewriterEffect(element, 15); // Adjust typing speed as desired
    });
}

function typewriterEffect(element, typingSpeed) {
    const text = element.getAttribute('data-original-text') || element.textContent;
    element.setAttribute('data-original-text', text);
    element.textContent = ''; // Clear text content
    let index = 0;

    // Determine the appropriate sound path based on the element's class
    let soundPath = soundFiles.default; // Use default sound if no specific class matches
    Object.entries(soundFiles).forEach(([className, path]) => {
        if (element.classList.contains(className)) {
            soundPath = path;
        }
    });

    const audioObject = playSound(soundPath); // Play sound

    function typeCharacter() {
        if (index < text.length) {
            element.textContent += text.charAt(index++);
            setTimeout(typeCharacter, typingSpeed);
        } else if (audioObject) {
            audioObject.pause(); // Optional: Stop the sound after the last character
        }
    }

    typeCharacter();
}

function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(e => console.error("Failed to play sound:", e));
    return sound;
}

document.addEventListener('DOMContentLoaded', () => {
    const activeSceneElement = document.querySelector('.scene.active');
    if (activeSceneElement) {
        applyTypewriterEffectToNewScene(activeSceneElement.id);
    }
});


// ---------------------------------------------------
// (ALL TYPES OF VOICES) TYPE WRITER v2 WITH SOUND ---------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------



// END ---------------------------------------------------------------------------------------------------------------------------------


// GLITCH WITH SOUND WORKING ---------------------------------------------------------------------------------------------------------------------------------

function changeSceneWithGlitch(currentSceneId, nextSceneId) {
    // Play the glitch sound
    var sound = document.getElementById("glitchSound");
    sound.play();

    var currentScene = document.getElementById(currentSceneId);
    var nextScene = document.getElementById(nextSceneId);

    // Apply glitch effect to current scene
    currentScene.classList.add('glitch');

    // Wait for the glitch effect to play out
    setTimeout(function () {
        // Remove glitch effect
        currentScene.classList.remove('glitch');
        currentScene.classList.remove('active'); // Remove active class from current scene

        // Add 'active' class to next scene
        nextScene.classList.add('active');

        // Optionally, if you want the glitch effect on the next scene as it becomes active, you can:
        nextScene.classList.add('glitch');
        setTimeout(() => nextScene.classList.remove('glitch'), 800); // Adjust based on glitch effect duration
    }, 0); // Adjust this duration to match your glitch effect's duration
}

// END ---------------------------------------------------------------------------------------------------------------------------------


// MUSIC WORKING ---------------------------------------------------------------------------------------------------------------------------------


// Object mapping scene IDs to music file paths
var sceneMusicMap = {
    'happy': 'sfx/happyAmbient.mp3',
    'dark': 'sfx/darkAmbient.mp3',
    'restart': 'sfx/restartSfx.wav',
    'confront': 'sfx/confrontSfx.mp3',
    'holy': 'sfx/holySfx.wav'
    // Add more scenes and their music as needed
};

function playBackgroundMusic(sceneId) {
    var music = document.getElementById("backgroundMusic");

    music.volume = 0.5;

    // Check if the current scene has a specified music track
    if (sceneId in sceneMusicMap) {
        // Update the source if it's different from the current one
        if (music.src !== sceneMusicMap[sceneId]) {
            music.src = sceneMusicMap[sceneId]; // Set the new music source
            music.play(); // Play the new track
        } else if (music.paused) {
            music.play(); // Play the music if it's paused
        }
    } else {
        music.pause(); // Pause the music if the scene changes to one without specified background music
        music.currentTime = 0; // Reset the music to the start
    }

    // Log the current status of background music playing
    console.log("Background music for " + sceneId + " is " + (music.paused ? "paused" : "playing") + ".");
}

// END --------------------------------------------------------------------------------------------------------------------------------


// DUIF ONDERBREKING ---------------------------------------------------------------------------------------------------------------------------------

let clickCount = 0;

function handleButtonClick() {
    if (clickCount < 3) {
        showImageForThreeSeconds();
        clickCount++;
    } else {
        changeSceneWithGlitch('scene11', 'scene12');
    }
}

function showImageForThreeSeconds() {
    const image = document.createElement('img');
    image.src = '/assets/jumpScare.svg'; // Replace with the path to your image
    image.alt = 'Your Image';

    document.body.appendChild(image);

    setTimeout(function () {
        document.body.removeChild(image);
    }, 3000);
}


// END ---------------------------------------------------------------------------------------------------------------------------------

// BLINK VIRUS ---------------------------------------------------------------------------------------------------------------------------------

function toggleBlink(assetIdOn, assetIdOff) {
    const assetOn = document.getElementById(assetIdOn);
    const assetOff = document.getElementById(assetIdOff);

    if (assetOn.style.display === 'none') {
        assetOn.style.display = 'block';
        assetOff.style.display = 'none';
    } else {
        assetOn.style.display = 'none';
        assetOff.style.display = 'block';
    }
}

setInterval(() => {
    toggleBlink('virusOn', 'virusOff');
}, 300); // Blink every 300ms


function toggleBlink(assetIdOn, assetIdOff) {
    const assetOn = document.getElementById(assetIdOn);
    const assetOff = document.getElementById(assetIdOff);

    if (assetOn.style.display === 'none') {
        assetOn.style.display = 'block';
        assetOff.style.display = 'none';
    } else {
        assetOn.style.display = 'none';
        assetOff.style.display = 'block';
    }
}

setInterval(() => {
    toggleBlink('synergyOn', 'synergyOff');
}, 100); // Blink every 300ms

// END ---------------------------------------------------------------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    if (screenWidth !== 1920 || screenHeight !== 1080) {
        document.getElementById('resolutionWarning').style.display = 'block';
    }
});