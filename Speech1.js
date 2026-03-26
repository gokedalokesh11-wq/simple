// Initialize the Speech Synthesis API
let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// Load available voices into the dropdown
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0]; // Set default voice

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });
};

// Update voice when user changes the selection
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

// Trigger speech when button is clicked
document.querySelector(".l").addEventListener("click", () => {
    // Get text from the textarea
    speech.text = document.querySelector(".text").value;
    
    // Stop any current speech before starting new one
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});
