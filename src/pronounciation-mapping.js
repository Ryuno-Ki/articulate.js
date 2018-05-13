import VoiceTag from './voice-tag';

// Map HTML tags to text to be spoken before or after
// TODO: Look at https://github.com/GNOME/orca/blob/master/src/orca/messages.py
// or https://github.com/nvaccess/nvda/blob/master/source/controlTypes.py#L198
export default {
    "q": new VoiceTag("quote,", ", unquote,"),
    "ol": new VoiceTag("Start of list.", "End of list."),
    "ul": new VoiceTag("Start of list.", "End of list."),
    "blockquote": new VoiceTag("Blockquote start.", "Blockquote end."),
}
