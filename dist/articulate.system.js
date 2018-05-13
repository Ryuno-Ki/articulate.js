System.register([], function (exports, module) {
    'use strict';
    return {
        execute: function () {

            var VoiceOptions = {
                rate: 1.10,
                pitch: 1,
                volume: 1
            }

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
                    this._voiceOptions = VoiceOptions;
                }

                init() {
                    this._populateVoiceList();
                    // The system voices are loaded asynchronously in deference to Chrome.
                    // After checking for compatability, define the utterance object and then cancel the speech
                    // immediately even though nothing is yet spoken. This is to fix a quirk in Windows Chrome.
                    if (typeof window.speechSynthesis !== 'undefined'
                        && window.speechSynthesis.onvoiceschanged !== undefined) {
                        window.speechSynthesis.onvoiceschanged = this._populateVoiceList;
                    }

                    if ("speechSynthesis" in window) {
                        const speech = new window.SpeechSynthesisUtterance();
                        window.speechSynthesis.cancel();
                    }
                }

                // This populates the "voices" member with objects that represent the
                // available voices in the current browser.
                // Each object has two properties: name and language.
                _populateVoiceList () {
                    const systemVoices = window.speechSynthesis.getVoices();
                    systemVoices.forEach((voice) => {
                        const { name, lang } = voice;
                        const voiceObject = new VoiceObject({ name, lang });
                        this.voices.push(voiceObject);
                    });
                }

                speak (text) {
                    const speech = new window.SpeechSynthesisUtterance();
                    speech.text = text;
                    speech.rate = this._voiceOptions.rate;
                    speech.pitch = this._voiceOptions.patch;
                    speech.volume = this._voiceOptions.volume;

                    window.speechSynthesis.speak(speech);
                }

                pause () {
                    window.speechSynthesis.pause();
                    return this;
                }

                resume () {
                    window.speechSynthesis.resume();
                    return this;
                }

                stop () {
                    window.speechSynthesis.stop();
                    return this;
                }

                enabled () {
                    return ('speechSynthesis' in window);
                }

                isSpeaking () {
                    // TODO: Turn into a getter
                    return window.speechSynthesis.speaking;
                }

                isPaused () {
                    // TODO: Turn into a getter
                    return window.speechSynthesis.paused;
                }
            }

            function init () {
                const articulate = new Articulate();
                articulate.init();
            }
            exports('default', init);

        }
    };
});
