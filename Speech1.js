let speech = new SpeechSynthesisUtterance();
let voiceselect = document.querySelector("select");
let voices = [];

// Load voices function
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceselect.innerHTML = "";

    voices.forEach((voice, i) => {
        voiceselect.options[i] = new Option(voice.name, i);
    });

    speech.voice = voices[0];
}

// Call once (IMPORTANT)
loadVoices();

// Call again when voices actually load
window.speechSynthesis.onvoiceschanged = loadVoices;

// Change voice
voiceselect.addEventListener("change", () => {
    speech.voice = voices[voiceselect.value];
});

// Speak
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
