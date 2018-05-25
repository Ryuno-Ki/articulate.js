const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const UI = require('./ui');

describe('UI', () => {
    describe('.abort()', () => {
        beforeEach(function () {
            this.window = global.window;
        });

        afterEach(function () {
            global.window = this.window;
        });

        it('alerts the user', () => {
            // Arrange
            const alertSpy = sinon.spy();
            global.window = { alert: alertSpy };

            // Act
            const ui = new UI();
            ui.abort('Boo!');
            
            // Assert
            expect(alertSpy).to.have.been.called;
        });
    });
});
