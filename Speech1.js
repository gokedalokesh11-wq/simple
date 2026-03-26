let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");
let methodStarted = false;

function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    
    // Clear existing options to prevent duplicates
    voiceSelect.innerHTML = '';

    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });

    // Set a default voice if available
    if (voices.length > 0) {
        speech.voice = voices[0];
    }
} anchor

// 1. Fix for Chrome: Voices are loaded asynchronously
window.speechSynthesis.onvoiceschanged = () => {
    populateVoices();
};

// 2. Fix for Firefox/Safari: Call it immediately
populateVoices();

// 3. Update voice when selection changes
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// 4. Action button
document.querySelector(".l").addEventListener("click", () => {
    const textToSpeak = document.querySelector(".text").value;
    
    if (!textToSpeak) {
        alert("Please enter or check the text first!");
        return;
    }

    speech.text = textToSpeak;
    
    // Always cancel current speech before starting new one (Fixes "stuck" audio)
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});
