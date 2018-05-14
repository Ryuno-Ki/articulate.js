import ignoredTags from './ignored-tags';

export default class DOM {
    constructor (selector) {
        this.selector = selector || '[data-articulate]';
        this._recognize = '[data-articulate-recognize]';
        this._ignore = '[data-articulate-ignore]';
        this._prepend = '[data-articulate-prepend]';
        this._append = '[data-articulate-append]';
    }

    getSelection () {
        const elements = window.document.querySelectorAll(this.selector);
        return Array.prototype.slice.call(elements);
    }

    processElements (elements) {
        const ignoreTagList = _whitelistTags([...ignoredTags]);
        let processed = this._ignoreElements(elements, ignoreTagList);
        processed = this._prependElements(elements);
        processed = this._appendElements(elements);
        return processed;
    }

    textify () {
    }

    _whitelistTags (elements, ignoreList) {
        // TODO: Remove some items from ignoredTags, so they are spoken
        return elements;
    }

    _ignoreElements(elements, ignoreList) {
        const emptyNode = document.createTextNode("");

        let el = elements.map((element) => {
            ignoreList.forEach((tag) => {
                const hits = Array.prototype.slice.call(element.querySelectorAll(tag));
                hits.forEach((hit) => {
                    hit.parentNode.replaceChild(emptyNode.cloneNode(), hit);
                });
            });
            return element;
        });

        return el.map((element) => {
            const hits = Array.prototype.slice.call(element.querySelectorAll(this._ignore));
            hits.forEach((hit) => {
                hit.parentNode.replaceChild(emptyNode.cloneNode(), hit);
            });
            return element;
        });
    }

    _prependElements (elements) {
        return elements.map((element) => {
            const hits = Array.prototype.slice.call(element.querySelectorAll(this._prepend));
            hits.forEach((hit) => {
                const text = hit.dataset.articulatePrepend;
                const node = document.createTextNode(text);
                hit.parentNode.insertBefore(text, node);
            });
        });
    }

    _appendElements (elements) {
        return elements;
    }
}
