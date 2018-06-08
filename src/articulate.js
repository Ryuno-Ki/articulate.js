/* @flow */

import UI from './ui';
import VoiceOptions from './voice-options';
import VoiceObject from './voice-object';

/**
 * @module Articulate
 */

/**
 * Class which represents the API
 * @requires module:Articulate/UI
 * @requires module:Articulate/voice-object
 * @requires module:Articulate/voice-option
 */
export default class Articulate {
    constructor() {
        /**
         * List of available {@link module:Articulate/voice-object|voices}
         * @type VoiceObject[]
         * @public
         */
        this.voices = [];

        /**
         * Holds references to the {@link module:Articulate/voice-option|voice options}
         * @type VoiceOption
         * @private
         */
        this._voiceOptions = VoiceOptions;
    }

    /**
     * Initialises the instance
     * @public
     */
    init() {
        this._populateVoiceList();
        // The system voices are loaded asynchronously in deference to Chrome.
        // After checking for compatability, define the utterance object and then cancel the speech
        // immediately even though nothing is yet spoken. This is to fix a quirk in Windows Chrome.
        if (typeof window.speechSynthesis !== 'undefined'
            && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = this._populateVoiceList;
        }

        if ('speechSynthesis' in window) {
            const speech = new window.SpeechSynthesisUtterance();
            window.speechSynthesis.cancel();
        }
    }

    // This populates the "voices" member with objects that represent the
    // available voices in the current browser.
    // Each object has two properties: name and language.
    /**
     * Populates the {@link module:Articulate#voices|voices} property
     * @private
     */
    _populateVoiceList () {
        const systemVoices = window.speechSynthesis.getVoices();
        systemVoices.forEach((voice) => {
            const { name, lang } = voice;
            const voiceObject = new VoiceObject({ name, lang });
            this.voices.push(voiceObject);
        });
    }

    /**
     * Tells the {@link module:Articulate/UI|UI} to display a notification to
     * the user that the process was aborted
     * @private
     */
    _abort () {
        return new UI().abort('Sorry, this browser does not support the Web Speech API');
    }

    /**
     * Speak the passed text
     * @public
     * @param { string } text - The text to speak
     */
    speak (text) {
        if (!this.enabled()) {
            return this._abort();
        }

        if (this.isSpeaking()) {
            // If something is currently being spoken, ignore new voice request. Otherwise it would be queued,
            // which is doable if someone wanted that, but not what I wanted.
            return null;
        }

        const speech = new window.SpeechSynthesisUtterance();
        speech.text = text;
        speech.rate = this._voiceOptions.rate;
        speech.pitch = this._voiceOptions.patch;
        speech.volume = this._voiceOptions.volume;

        window.speechSynthesis.speak(speech);
    }

    /**
     * Pause talking.
     * @public
     * @returns { module:Articulate } - This instance
     */
    pause () {
        window.speechSynthesis.pause();
        return this;
    }

    /**
     * Resume talking
     * @public
     * @returns { module:Articulate } - This instance
     */
    resume () {
        window.speechSynthesis.resume();
        return this;
    }

    /**
     * Stop talking
     * @public
     * @returns { module:Articulate } - This instance
     */
    stop () {
        window.speechSynthesis.stop();
        return this;
    }

    /**
     * Is text-to-speech supported?
     * @public
     * @returns { boolean }
     */
    enabled () {
        return ('speechSynthesis' in window);
    }

    /**
     * Checks, whether browser is currently reading out loud
     * @public
     * @returns { boolean }
     */
    isSpeaking () {
        // TODO: Turn into a getter
        return window.speechSynthesis.speaking;
    }

    isPaused () {
        // TODO: Turn into a getter
        return window.speechSynthesis.paused;
    }
}
