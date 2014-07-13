var promptString    = require('./promptString');
var textColor       = require('./textColor');
var backgroundColor = require('./backgroundColor');

exports.process = function(config, foreground_selected, background_selected) {

  "use strict";

  // setup initial states
  var promptTextColor = 'none',
      promptBgColor   = 'none',
      textColorCode,
      bgColorCode,
      colorPrefix     = '',
      colorPostfix    = '',
      promptPreview   = '',
      functionValue,
      functionHelper  = '',
      copyText        = '',
      i               = 0;

  // process input config
  for (i; i < config.length; i++) {
    promptPreview += promptString.example_copy( config[i] );
    copyText      += promptString.bash_string( config[i] );

    functionValue = promptString.helpers( config[i] );
    if (functionValue !== undefined) {
      functionHelper += functionValue;
    }
  }

  // process input colors
  if ((foreground_selected == 'none') && (background_selected == 'none')) {
    // noop
  } else {

    if (foreground_selected != 'none') {
      promptTextColor = foreground_selected;
    }

    if (background_selected != 'none') {
      promptBgColor = background_selected;
    }

    textColorCode = textColor.text_color(foreground_selected);
    bgColorCode   = backgroundColor.background_color(background_selected);
    colorPrefix   = "\\[\\e[" + textColorCode + ";" + bgColorCode + "m\\]";
    colorPostfix  = "\\[\\e[0m\\]";
    copyText      = colorPrefix + copyText + colorPostfix;
  }

  // setup completed states
  copyText = 'export PS1=\"' + copyText + '\"';

  return {
    promptTextColor: promptTextColor,
    promptBgColor: promptBgColor,
    promptCopyText: promptPreview,
    functionHelper: functionHelper,
    copyText: copyText
  };
};
