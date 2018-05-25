const chai = require('chai');
const chaiDom = require('chai-dom');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { JSDOM } = require('jsdom');
const expect = chai.expect;
chai.use(sinonChai);
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

    describe('_prependElements', () => {
        it('should prepend for every element of the list', () => {
            // Arrange
            const dom = new DOM();
            dom._prependElement = sinon.spy();
            const mockContent = [1, 2, 3, 4, 5].map(() => {
                return '<div data-articulate-prepend=""></div>';
            });
            const number = mockContent.length;
            document.body.innerHTML = ['<div data-articulate>']
            .concat(mockContent)
            .concat('</div>')
            .join('');

            // Act
            const elements = dom.getSelection();
            dom._prependElements(elements);

            // Assert
            expect(dom._prependElement).to.have.callCount(number);
        });
    });

    describe('_appendElements', () => {
        it('should append for every element of the list', () => {
            // Arrange
            const dom = new DOM();
            dom._appendElement = sinon.spy();
            const mockContent = [1, 2, 3, 4, 5].map(() => {
                return '<div data-articulate-append=""></div>';
            });
            const number = mockContent.length;
            document.body.innerHTML = ['<div data-articulate>']
            .concat(mockContent)
            .concat('</div>')
            .join('');

            // Act
            const elements = dom.getSelection();
            dom._appendElements(elements);

            // Assert
            expect(dom._appendElement).to.have.callCount(number);
        });
    });

    describe('processElements', () => {
        it('should prepend elements', () => {
            // Arrange
            const dom = new DOM();
            dom._prependElements = sinon.spy();
            document.body.innerHTML = '<div data-articulate></div>'

            // Act
            const elements = dom.getSelection();
            dom.processElements(elements);

            // Assert
            expect(dom._prependElements).to.have.been.called;
        });

        it('should append elements', () => {
            // Arrange
            const dom = new DOM();
            dom._appendElements = sinon.spy();
            document.body.innerHTML = '<div data-articulate></div>'

            // Act
            const elements = dom.getSelection();
            dom.processElements(elements);

            // Assert
            expect(dom._appendElements).to.have.been.called;
        });
    });

    describe('textify', () => {
        it('should return the text to be spoken', () => {
            // Arrange

            // Act
            const dom = new DOM();
            const elements = dom.getSelection();
            const text = dom.textify(elements);

            // Assert
            expect(text).to.be.a('string');
        });
    });
});
