const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const Articulate = require('./articulate');
const VoiceObject = require('./voice-object');

describe('Articulate', () => {
    it('should have a list of VoiceObjects', () => {
        // Arrange

        // Act
        const articulate = new Articulate();

        // Assert
        expect(articulate.voices).to.be.an('array');
        expect(articulate.voices).to.be.empty;
    });

    describe('.init()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('should trigger a population of its voices member', function () {
            // Arrange
            this.articulate.populateVoiceList = sinon.spy();
            global.window = {};

            // Act
            this.articulate.init();

            // Assert
            expect(this.articulate.populateVoiceList).to.have.been.called;
        });
    });

    describe('.populateVoiceList()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('should fill the voices member with VoiceObjects', function () {
            // Arrange
            const getVoicesSpy = sinon.fake.returns([
                { name: 'Richard', lang: 'Klingon' } 
            ]);
            global.window = { speechSynthesis: { getVoices: getVoicesSpy } };

            // Act
            this.articulate.populateVoiceList();

            // Assert
            expect(getVoicesSpy).to.have.been.called;
            expect(this.articulate.voices).not.to.be.empty;
            expect(this.articulate.voices[ 0 ]).to.be.an('object');
        });
    });
});
