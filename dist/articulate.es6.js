class VoiceObject {
    constructor(options) {
        const { name, language } = options;
        this.name = name;
        this.language = language;
    }
}

class Articulate {
    constructor() {
        this.voices = [];
    }

    init() {
        this.populateVoiceList();
        // The system voices are loaded asynchronously in deference to Chrome.
        // After checking for compatability, define the utterance object and then cancel the speech
        // immediately even though nothing is yet spoken. This is to fix a quirk in Windows Chrome.
        if (typeof window.speechSynthesis !== 'undefined'
            && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = populateVoiceList;
        }

        if ("speechSynthesis" in window) {
            const speech = new window.SpeechSynthesisUtterance();
            window.speechSynthesis.cancel();
        }
    }

    // This populates the "voices" member with objects that represent the
    // available voices in the current browser.
    // Each object has two properties: name and language.
    populateVoiceList () {
        const systemVoices = window.speechSynthesis.getVoices();
        systemVoices.forEach((voice) => {
            const { name, lang } = voice;
            const voiceObject = new VoiceObject({ name, lang });
            this.voices.push(voiceObject);
        });
    }
}

function init () {
    const articulate = new Articulate();
    articulate.init();
}

export default init;
