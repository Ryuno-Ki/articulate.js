'use strict';
const expect = require('chai').expect;
const VoiceObject = require('./voice-object');

describe('VoiceObject', () => {
    it('should have a name', () => {
        // Arrange
        const mockName = 'Richard';

        // Act
        const voiceObject = new VoiceObject({
            name: mockName,
            language: null
        });

        // Assert
        expect(voiceObject.name).to.equal(mockName);
    });

    it('should have a language', () => {
        // Arrange
        const mockLanguage = 'Klingon';

        // Act
        const voiceObject = new VoiceObject({
            name: null,
            language: mockLanguage
        });

        // Assert
        expect(voiceObject.language).to.equal(mockLanguage);
    });
});
