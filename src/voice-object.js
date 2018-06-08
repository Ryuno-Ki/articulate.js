/* @flow */

/**
 * @module Articulate/voice-object
 */

/**
 * Class representing an object to speak.
 */
export default class VoiceObject {
    /**
     * Create a VoiceObject
     * @param { object } options
     * @param { string } options.name - Name of the object
     * @param { string } options.language - Language to speak in
     */
    constructor(options) {
        const { name, language } = options;
        /**
         * Name of the object.
         * @type string
         * @public
         */
        this.name = name;

        /**
         * In which language shall it be spoken?
         * @type string
         * @public
         */
        this.language = language;
    }
}
