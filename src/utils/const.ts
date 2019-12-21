type ParserParams = Record<string, { description: string; options: Record<string, any> }>;

export const paramsDescriptions: Record<string, string> = {
  mask: 'Mask, should include `placeholderSymbol`, otherwise user will not be able to type any characters.',
  rxmask: 'Regex mask (if `rxmask` is present, `mask` will be ignored), characters in square brackets will be parsed as characters for user input, any other character will be parsed as mask symbol.',
  placeholderSymbol: 'Symbol, that specifies character that will be replaced in mask with user input.',
  allowedCharacters: 'Characters allowed to be used in this input. If this option is present, all other characters will be ignored when user types them.',
  maxMaskLength: 'Show whole mask, part of it or not show it at all (can be any `number` including `Infinity` to show whole mask).',
  trailing: 'If trailing is `true`, show trailing mask symbols. Example: if with mask `***--**-**` user types `123`, user will get `123--`, but if he removes symbol `4` from `123--4`, he will get just `123` without `-`. If trailing is disabled, regardless of user actions value `123` will always result in just `123`.',
};

export const parserParams: ParserParams = {
  simple: {
    description: "Specified mask, mask symbol and allowed symbols",
    options: { mask: "***-**-**", allowedCharacters: "[0-9]" }
  },
  maxMaskLength: {
    description: "Showing whole mask including unfilled part",
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      maxMaskLength: "Infinity",
      allowedCharacters: "[0-9]"
    }
  },
  maxMaskLengthSymbols: {
    description:
      'Can also parse special characters, including symbol from mask (except "symbol" property itself)',
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      maxMaskLength: "Infinity",
      allowedCharacters: "[ \\-\\+\\(\\)]"
    }
  },
  maxMaskLengthPart: {
    description: "Only part of mask is shown",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      maxMaskLength: "8"
    }
  },
  maxMaskLengthPartNoTrailing: {
    description: "Only part of mask is shown and trailing part is disabled",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      maxMaskLength: "8",
      trailing: "false"
    }
  },
  regex: {
    description:
      'Regex mask - only certain symbols are allowed for each character ("mask" will be ignored if "rxmask" is present)',
    options: {
      rxmask: "[A-Z][A-Z] [0-4][\\d][\\d]-[a-z][\\d]",
      placeholderSymbol: "*",
      maxMaskLength: "Infinity"
    }
  }
};