let voices = [];
let voiceselect = document.querySelector("select");

// Load voices properly
function loadVoices() {
    voices = speechSynthesis.getVoices();

    if (voices.length === 0) return;

    voiceselect.innerHTML = "";
    voices.forEach((voice, i) => {
        voiceselect.options[i] = new Option(voice.name, i);
    });
}

// Force load voices (important for GitHub Pages)
speechSynthesis.onvoiceschanged = loadVoices;

// Extra fallback (VERY IMPORTANT)
setInterval(() => {
    if (voices.length === 0) {
        loadVoices();
    }
}, 500);

// Speak button
document.querySelector("button").addEventListener("click", () => {
    let text = document.querySelector("textarea").value;

    if (!text) {
        alert("Enter text first");
        return;
    }

    let speech = new SpeechSynthesisUtterance(text);

    // Use selected voice if available
    if (voices.length > 0) {
        speech.voice = voices[voiceselect.value];
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
});
