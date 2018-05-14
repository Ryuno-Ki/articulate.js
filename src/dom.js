import ignoredTags from './ignored-tags';

function toArray(list) {
    return Array.prototype.slice.call(list);
}

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
        return toArray(elements);
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

    _ignoreElements (elements, ignoreList) {
        let el = elements.map((element) => {
            ignoreList.forEach((tag) => {
                toArray(element.querySelectorAll(tag))
                  .forEach(this._removeElement);
            });
            return element;
        });

        return el.map((element) => {
            toArray(element.querySelectorAll(this._ignore))
              .forEach(this._removeElement);
            return element;
        });
    }

    _prependElements (elements) {
        return elements.map((element) => {
            const descendors = toArray(element.querySelectorAll(this._prepend));
            descendors.forEach(this._prependElement);
            return element;
        });
    }

    _appendElements (elements) {
        return elements.map((element) => {
            const descendors = toArray(element.querySelectorAll(this._append));
            descendors.forEach(this._appendElement);
            return element;
        });
    }

    _removeElement (element) {
        const emptyNode = document.createTextNode("");
        element.parentNode.replaceChild(emptyNode, element);
    }

    _prependElement (element) {
        // TODO: Dynamically read dataset based on this._prepend
        const text = element.dataset.articulatePrepend;
        const node = document.createTextNode(text);
        element.parentNode.insertBefore(node, element);
    }

    _appendElement (element) {
        // TODO: Dynamically read dataset based on this._append
        const text = element.dataset.articulateAppend;
        const node = document.createTextNode(text);
        element.parentNode.insertBefore(node, element.nextSibling);
    }
}
