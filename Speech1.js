let voices = [];
let voiceselect = document.querySelector("select");

function loadVoices() {
    voices = speechSynthesis.getVoices();

    if (voices.length === 0) return;

    voiceselect.innerHTML = "";
    voices.forEach((voice, i) => {
        voiceselect.options[i] = new Option(voice.name, i);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;

document.querySelector("button").addEventListener("click", () => {
    let text = document.querySelector("textarea").value;

    if (!text) {
        alert("Enter text");
        return;
    }

    let speech = new SpeechSynthesisUtterance(text);
    speech.voice = voices[voiceselect.value];

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
});
