/* @flow */

/**
 * Class representing an object to speak.
 * @class VoiceObject
 */
export default class VoiceObject {
    /**
     * @param { string } name - Name of the object.
     * @param { string } language - In which language shall it be spoken?
     */
    constructor(options) {
        const { name, language } = options;
        this.name = name;
        this.language = language;
    }
}
