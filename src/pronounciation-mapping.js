import * as htmlContentElements from './html.content.json';
import * as htmlEditElements from './html.edit.json';
import * as htmlEmbeddedElements from './html.embedded.json';
import * as htmlFormsElements from './html.forms.json';
import * as htmlInlineElements from './html.inline.json';
import * as htmlInteractiveElements from './html.interactive.json';
import * as htmlMultimediaElements from './html.multimedia.json';
import * as htmlScriptsElements from './html.scripts.json';
import * as htmlTableElements from './html.table.json';
import * as htmlTextElements from './html.text.json';

const allElements = [
  ...htmlContentElements.elements,
  ...htmlEditElements.elements,
  ...htmlEmbeddedElements.elements,
  ...htmlFormsElements.elements,
  ...htmlInlineElements.elements,
  ...htmlInteractiveElements.elements,
  ...htmlMultimediaElements.elements,
  ...htmlScriptsElements.elements,
  ...htmlTableElements.elements,
  ...htmlTextElements.elements,
]

console.log(allElements);

// Map HTML tags to text to be spoken before or after
// TODO: Look at https://github.com/GNOME/orca/blob/master/src/orca/messages.py
// or https://github.com/nvaccess/nvda/blob/master/source/controlTypes.py#L198
export default allElements;
/*
    "q": new VoiceTag("quote,", ", unquote,"),
    "ol": new VoiceTag("Start of list.", "End of list."),
    "ul": new VoiceTag("Start of list.", "End of list."),
    "blockquote": new VoiceTag("Blockquote start.", "Blockquote end."),
*/
