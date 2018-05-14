const chai = require('chai');
const chaiDom = require('chai-dom');
const { JSDOM } = require('jsdom');
const expect = chai.expect;
// chai.use(chaiDom);

const DOM = require('./dom');

const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

describe('DOM', () => {
    it('should have a default selector', () => {
        // Arrange

        // Act
        const dom = new DOM();

        // Assert
        expect(dom.selector).to.equal('[data-articulate]');
    });

    it('should accept an argument to overwrite the selector', () => {
        // Arrange
        const selector = '.articulate';

        // Act
        const dom = new DOM(selector);

        // Assert
        expect(dom.selector).to.equal(selector);
    });

    describe('.getSelection()', () => {
        it('should return an Array of matches', () => {
            // Arrange
            document.body.innerHTML = '<div data-articulate="recognize"></div>';

            // Act
            const dom = new DOM();
            const elements = dom.getSelection();

            // Assert
            expect(elements).to.have.length(1);
        });
    });

    describe('._removeElement()', () => {
        it('should remove the element from DOM', () => {
            // Arrange
            document.body.innerHTML = '<div data-articulate="recognize"></div>';

            // Act
            const dom = new DOM();
            const elements = dom.getSelection();
            dom._removeElement(elements[ 0 ]);

            const purged = dom.getSelection();

            // Assert
            expect(purged).to.have.length(0);
        });
    });

    describe('._prependElement()', () => {
        it('should prepend the value of its data attribute', () => {
            // Arrange
            const text = 'Yolo!';
            document.body.innerHTML = `
            <div data-articulate>
                <div data-articulate-prepend="${ text }"></div>
            </div>`;

            // Act
            const dom = new DOM();
            const elements = dom.getSelection();
            const element = elements[ 0 ].children[ 0 ];
            dom._prependElement(element);

            // Assert
            expect(element.parentNode.textContent.trim()).to.equal(text);

            // FIXME: Report to author of chai-dom, that this throws:
            //expect(element).to.have.trimmed.text(text);
        });
    });

    describe('._appendElement()', () => {
        it('should append the value of its data attribute', () => {
            // Arrange
            const text = 'Yolo!';
            document.body.innerHTML = `
            <div data-articulate>
                <div data-articulate-append="${ text }"></div>
            </div>`;

            // Act
            const dom = new DOM();
            const elements = dom.getSelection();
            const element = elements[ 0 ].children[ 0 ];
            dom._appendElement(element);

            // Assert
            expect(element.parentNode.textContent.trim()).to.equal(text);

            // FIXME: Report to author of chai-dom, that this throws:
            //expect(element).to.have.trimmed.text(text);
        });
    });
});
