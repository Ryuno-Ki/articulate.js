/* @flow */

/**
 * @module Articulate/UI
 */

/**
 * Class representing interacting with a UI.
 */
export default class UI {
    /**
     * Aborts the execution and informs the user.
     * @access public
     *
     * @param { string } text - Text to display
     */
    abort (text) {
        window.alert(text);
    }
}
