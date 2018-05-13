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

    describe('.pause()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('should pause speaking', function () {
            // Arrange
            const pauseSpy = sinon.spy();
            global.window = { speechSynthesis: { pause: pauseSpy } };

            // Act
            const articulate = this.articulate.pause();

            // Assert
            expect(pauseSpy).to.have.been.called;
            expect(articulate).to.equal(this.articulate);
        });
    });

    describe('.resume()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('should resume speaking', function () {
            // Arrange
            const resumeSpy = sinon.spy();
            global.window = { speechSynthesis: { resume: resumeSpy } };

            // Act
            const articulate = this.articulate.resume();

            // Assert
            expect(resumeSpy).to.have.been.called;
            expect(articulate).to.equal(this.articulate);
        });
    });

    describe('.stop()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('should stop speaking', function () {
            // Arrange
            const stopSpy = sinon.spy();
            global.window = { speechSynthesis: { stop: stopSpy } };

            // Act
            const articulate = this.articulate.stop();

            // Assert
            expect(stopSpy).to.have.been.called;
            expect(articulate).to.equal(this.articulate);
        });
    });

    describe('.enabled()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        describe('when unsupported', function () {
            it('should return false', function () {
                // Arrange
                global.window = {};

                // Act
                const enabled = this.articulate.enabled();

                // Assert
                expect(enabled).to.be.false;
            });
        });

        describe('when supported', function () {
            it('should return true', function () {
                // Arrange
                global.window = { speechSynthesis: {} };

                // Act
                const enabled = this.articulate.enabled();

                // Assert
                expect(enabled).to.be.true;
            });
        });
    });

    describe('.isSpeaking()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('checks whether it is running', function () {
            // Arrange
            global.window = { speechSynthesis: { speaking: true } };

            // Act
            const isSpeaking = this.articulate.isSpeaking();

            // Assert
            expect(isSpeaking).to.be.true;
        });
    });

    describe('.isPaused()', () => {
        beforeEach(function () {
            this.articulate = new Articulate();
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('checks whether it is halted', function () {
            // Arrange
            global.window = { speechSynthesis: { paused: false } };

            // Act
            const isPaused = this.articulate.isPaused();

            // Assert
            expect(isPaused).to.be.false;
        });
    });
});
