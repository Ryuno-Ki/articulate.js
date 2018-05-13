import config from './src/config';
import Articulate from './src/articulate';

function voiceTag (prepend, append) {
    this.prepend = prepend;
    this.append = append;
}

function init () {
    const articulate = new Articulate();
    articulate.init();
}

export default init;
