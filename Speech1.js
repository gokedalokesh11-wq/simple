// Select the elements using the IDs we added
const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");

let speech = new SpeechSynthesisUtterance();
let voices = [];

function loadVoices() {
    // 1. Get voices from the browser
    voices = window.speechSynthesis.getVoices();
    
    // 2. If no voices are found yet (common in Chrome), stop and wait for the event
    if (voices.length === 0) return;

    // 3. Clear the dropdown and fill it with voices
    voiceSelect.innerHTML = ''; 
    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voiceSelect.add(option);
    });

    // 4. Set the default voice
    speech.voice = voices[0];
}

// Handle the "Async" loading of voices in Chrome/Edge
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Run once immediately for Firefox/Safari
loadVoices();

// Update the voice when the dropdown changes
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Make the button work
speakBtn.addEventListener("click", () => {
    // Take the text from the readonly textarea
    speech.text = textInput.value;

    // IMPORTANT: Cancel current speech before starting new one 
    // This prevents the button from "freezing" if clicked twice
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});
