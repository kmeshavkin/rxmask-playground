import React from "react";
import { Typography, Checkbox, Button, Tooltip, ClickAwayListener } from "@material-ui/core";
import {
  Wrapper,
  StyledTextField,
  ExampleItemWrapper,
  ExampleWrapper,
  StyledTypography,
  WideStyledTextField,
  ExampleWrapperWide,
  TextWrapper,
  StyledPaper,
  StyledRadio,
  StyledButtonGroup,
  StyledFormControlLabel,
  StyledFab,
  FlexWrapper
} from "./App.styled";
import rxmask, { InputOptions } from "rxmask";

export interface AppState {
  playgroundInput: {
    playgroundRef: React.RefObject<HTMLTextAreaElement>;
    playgroundParser?: rxmask;
    options: InputOptions;
  };
  refs: Record<string, React.RefObject<HTMLTextAreaElement>>;
  parsers: Record<string, rxmask>;
  checkedRadio: string;
  prevPlaceholderSymbol: string;
  tooltips: Record<string, boolean>;
}

const paramsDescriptions: Record<string, string> = {
  mask: 'Mask, should include `placeholderSymbol`, otherwise user will not be able to type any characters.',
  rxmask: 'Regex mask (if `rxmask` is present, `mask` will be ignored), characters in square brackets will be parsed as characters for user input, any other character will be parsed as mask symbol.',
  placeholderSymbol: 'Symbol, that specifies character that will be replaced in mask with user input.',
  allowedCharacters: 'Characters allowed to be used in this input. If this option is present, all other characters will be ignored when user types them.',
  maxMaskLength: 'Show whole mask, part of it or not show it at all (can be any `number` including `Infinity` to show whole mask).',
  trailing: 'If trailing is `true`, show trailing mask symbols. Example: if with mask `***--**-**` user types `123`, user will get `123--`, but if he removes symbol `4` from `123--4`, he will get just `123` without `-`. If trailing is disabled, regardless of user actions value `123` will always result in just `123`.',
};

const parserParams: Record<
  string,
  { description: string; options: Record<string, any> }
> = {
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

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    // Set playground ref
    const playgroundRef = React.createRef() as React.RefObject<
      HTMLTextAreaElement
    >;

    // Set all other example refs
    const refObj = {} as Record<string, React.RefObject<HTMLTextAreaElement>>;
    for (const key in parserParams) {
      refObj[key] = React.createRef() as React.RefObject<HTMLTextAreaElement>;
    }

    this.state = {
      playgroundInput: {
        playgroundRef,
        options: {
          mask: "",
          placeholderSymbol: "*",
          rxmask: "",
          allowedCharacters: ".",
          maxMaskLength: "0",
          trailing: "true"
        }
      },
      refs: refObj,
      parsers: {},
      checkedRadio: "simple",
      prevPlaceholderSymbol: '',
      tooltips: {}
    };
  }

  componentDidMount() {
    const { playgroundInput, refs } = this.state;
    const { options } = playgroundInput;

    // Set playground parser
    const playgroundParser = new rxmask(
      options,
      playgroundInput.playgroundRef.current
    );

    // Set all other example parsers
    const parserObj = {} as Record<string, rxmask>;
    for (const key in parserParams) {
      parserObj[key] = new rxmask(parserParams[key].options, refs[key].current);
    }

    this.setState(
      {
        playgroundInput: {
          ...playgroundInput,
          playgroundParser
        },
        parsers: parserObj
      },
      () => this.onChangeRadio("simple") // Set initial value to "simple" mask
    );
  }

  // Generic onChange for playground input
  onChangePlayground = (key: string, val: any) => {
    const { playgroundInput } = this.state;
    const { options } = playgroundInput;

    this.setState({
      playgroundInput: {
        ...playgroundInput,
        options: {
          ...options,
          [key]: val
        }
      }
    });
  };

  // Generic onFocus for playground input
  onFocus = (key: string, val: any) => {
    if (key === 'placeholderSymbol') {
      this.setState({ prevPlaceholderSymbol: val });
    }
  };

  // Generic onBlur for playground input
  onBlur = (key: string) => {
    const { playgroundInput, prevPlaceholderSymbol } = this.state;
    const { options } = playgroundInput;
    if (options && options.mask && key === 'placeholderSymbol' && prevPlaceholderSymbol && prevPlaceholderSymbol !== '') {
      const symbol = new RegExp(this.escapeRegExp(prevPlaceholderSymbol), 'g');
      const newMaskValue = options.mask.replace(symbol, options.placeholderSymbol || '');
      this.setState({
        playgroundInput: {
          ...playgroundInput,
          options: {
            ...options,
            mask: newMaskValue
          }
        }
      });
    }
  };

  onChangeRadio = (key: string) => {
    const { playgroundInput } = this.state;
    const opts = parserParams[key].options;
    this.setState({
      playgroundInput: {
        ...playgroundInput,
        options: {
          mask: opts.mask || "",
          placeholderSymbol: opts.placeholderSymbol || "*",
          rxmask: opts.rxmask || "",
          allowedCharacters: opts.allowedCharacters || ".",
          maxMaskLength: opts.maxMaskLength || "0",
          trailing: opts.trailing || "true"
        }
      },
      checkedRadio: key
    });
  };

  escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  handleError(type: string, position: number, value: string) {
    switch (type) {
      case 'length':
        return `input is too long`;
      case 'allowedCharacters':
        return `character "${value}" is not allowed by allowedCharacters`;
      case 'rxmask':
        return `character "${value}" on position ${position} is not allowed by rxmask`;
      default:
        break;
    }
  }

  render() {
    const { playgroundInput, refs, parsers, checkedRadio, tooltips } = this.state;
    const { options } = playgroundInput;
    if (playgroundInput.playgroundParser) {
      playgroundInput.playgroundParser!.setOptions(options);
      playgroundInput.playgroundParser!.onInput();
    }

    return (
      <Wrapper>
        {/* Description */}
        <Typography variant="h2">rxmask.js</Typography>
        <Typography variant="h6">
          Advanced mask parser for html input or raw string parsing
        </Typography>
        <StyledButtonGroup>
          <Button target="_blank" href="https://www.npmjs.com/package/rxmask">npmjs package</Button>
          <Button target="_blank" href="https://github.com/kmeshavkin/rxmask">Package github</Button>
          <Button target="_blank" href="https://github.com/kmeshavkin/rxmask-playground">Playground github</Button>
        </StyledButtonGroup>
        {/* Playground */}
        <StyledPaper>
          <Typography align="center" variant="subtitle2" color="textSecondary" paragraph>Tweak parameters for input in the bottom of this block yourself or select an example below</Typography>
          <ExampleWrapper>
            {Object.entries(options).map(([key, val]) => (
              <ExampleItemWrapper key={key}>
                <FlexWrapper>
                  <StyledTypography>{key}</StyledTypography>
                  <ClickAwayListener onClickAway={() => this.setState({ tooltips: { ...tooltips, [key]: false } })}>
                    <Tooltip
                      placement="top"
                      arrow
                      title={paramsDescriptions[key]}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      onClose={() => this.setState({ tooltips: { ...tooltips, [key]: false } })}
                      open={tooltips[key] || false}
                    >
                      <StyledFab disableRipple onClick={() => this.setState({ tooltips: { ...tooltips, [key]: true } })}>i</StyledFab>
                    </Tooltip>
                  </ClickAwayListener>
                </FlexWrapper>
                {key === "trailing" ? (
                  <Checkbox
                    key={key}
                    checked={val === "true"}
                    onChange={() => this.onChangePlayground(key, val === "true" ? "false" : "true")}
                  />
                ) : (
                    <WideStyledTextField
                      key={key}
                      value={val}
                      onChange={e => this.onChangePlayground(key, e.target.value)}
                      onBlur={() => this.onBlur(key)}
                      onFocus={e => this.onFocus(key, e.target.value)}
                    />
                  )}
              </ExampleItemWrapper>
            ))}
          </ExampleWrapper>
          <WideStyledTextField
            variant="outlined"
            inputRef={playgroundInput.playgroundRef}
            onChange={() => this.forceUpdate()}
            error={playgroundInput.playgroundParser ? playgroundInput.playgroundParser.errors.length !== 0 : false}
            helperText={playgroundInput.playgroundParser ? playgroundInput.playgroundParser.errors.map(err => this.handleError(err.type, err.position, err.symbol)).join(', ') : ''}
          />
        </StyledPaper>
        {/* Some examples */}
        <Typography align="center" variant="subtitle2" color="textSecondary">Type in any input or select radio button to display all parameters of this input in the top block</Typography>
        <ExampleWrapperWide>
          {Object.keys(refs).map(key => (
            <ExampleItemWrapper key={key}>
              <TextWrapper>
                <StyledFormControlLabel
                  control={<StyledRadio
                    checked={checkedRadio === key}
                    onChange={() => this.onChangeRadio(key)}
                  />}
                  label={parserParams[key].description} />
              </TextWrapper>
              <StyledTextField
                inputRef={refs[key]}
                onChange={() => {
                  parsers[key].onInput();
                  this.forceUpdate();
                }}
                error={parsers[key] ? parsers[key].errors.length !== 0 : false}
                helperText={parsers[key] ? parsers[key].errors.map(err => this.handleError(err.type, err.position, err.symbol)).join(', ') : ''}
              />
            </ExampleItemWrapper>
          ))}
        </ExampleWrapperWide>
      </Wrapper>
    );
  }
}

export default App;
