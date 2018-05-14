/* @flow */

/**
 * Class representing interacting with a UI.
 * @class UI
 */
export default class UI {
    /**
     * Aborts the execution and informs the user.
     * @method UI#abort
     * @access public
     *
     * @param { string } text - Text to display
     */
    abort (text) {
        window.alert(text);
    }
}
