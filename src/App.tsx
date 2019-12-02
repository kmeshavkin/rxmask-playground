import React from "react";
import {
  Typography,
  TextField
} from "@material-ui/core";
import {
  Wrapper,
  StyledTextField,
  ExampleItemWrapper,
  ExampleWrapper,
  StyledTypography,
  StyledCheckbox
} from "./App.styled";
import rxmask from "rxmask";

export interface AppState {
  playgroundInput: {
    playgroundRef: React.RefObject<HTMLTextAreaElement>;
    playgroundParser?: rxmask;
    options: {
      mask: string;
      placeholderSymbol: string;
      allowedCharacters: string;
      rxmask: string;
      showMask: number;
      trailing: boolean;
    };
  };
  refs: Record<string, React.RefObject<HTMLTextAreaElement>>;
  parsers: Record<string, rxmask>;
}

const parserParams: Record<
  string,
  { description: string; options: Record<string, any> }
> = {
  simple: {
    description: "Phone mask - specify mask, mask symbol and allowed symbols",
    options: { mask: "***-**-**", allowedCharacters: "[0-9]" }
  },
  showMask: {
    description: "Phone mask - showing whole mask including unfilled part",
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      showMask: Infinity,
      allowedCharacters: "[0-9]"
    }
  },
  showMaskSymbols: {
    description:
      'Phone mask, but only for special characters - allowedCharacters can include symbols from mask EXCEPT "symbol" property itself (note that special symbols should be escaped)',
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      showMask: Infinity,
      allowedCharacters: "[ \\-\\+\\(\\)]"
    }
  },
  showMaskPart: {
    description: "Random mask - only part of mask is shown",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: 8
    }
  },
  showMaskPartNoTrailing: {
    description:
      "Random mask - only part of mask is shown and trailing part is disabled",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: 8,
      trailing: false
    }
  },
  regex: {
    description:
      'Regex mask - only certain symbols are allowed for each character (you don\'t need to specify "mask" property if "rxmask" is present (it will be ignored))',
    options: {
      rxmask: "[A-Z][A-Z] [0-4][\\d][\\d]-[a-z][\\d]",
      placeholderSymbol: "*",
      showMask: Infinity
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
          mask: "***-**-**",
          placeholderSymbol: "*",
          allowedCharacters: "[0-9]",
          rxmask: "",
          showMask: 0,
          trailing: true
        }
      },
      refs: refObj,
      parsers: {}
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

    this.setState({
      playgroundInput: {
        ...playgroundInput,
        playgroundParser
      },
      parsers: parserObj
    });
  }

  // Generic onChange for playground input
  onChange = (key: string, val: any) => {
    const { playgroundInput } = this.state;
    this.setState({
      playgroundInput: {
        ...playgroundInput,
        options: {
          ...playgroundInput.options,
          [key]: val
        }
      }
    });
  };

  render() {
    const { playgroundInput, refs, parsers } = this.state;
    const { options } = playgroundInput;

    if (playgroundInput.playgroundParser) {
      playgroundInput.playgroundParser!.setOptions({
        ...options,
        cursorPos: -1 // It will set cursor to the last position which ensures correct parsing
      });
      playgroundInput.playgroundParser!.onInput();
    }

    return (
      <Wrapper>
        <Typography variant="h2">rxmask.js</Typography>
        <Typography variant="h6">
          Advanced mask parser for html input or raw string parsing
        </Typography>
        <ExampleWrapper>
          {Object.entries(options).map(([key, val]) => (
            <ExampleItemWrapper key={key}>
              <StyledTypography>{key}</StyledTypography>
              {key === "trailing" ? (
                <StyledCheckbox
                  key={key}
                  checked={Boolean(val)}
                  onChange={() => this.onChange(key, !Boolean(val))}
                />
              ) : (
                <TextField
                  key={key}
                  value={val}
                  onChange={e => this.onChange(key, e.target.value)}
                />
              )}
            </ExampleItemWrapper>
          ))}
        </ExampleWrapper>
        <TextField
          inputRef={playgroundInput.playgroundRef}
          onChange={() => playgroundInput.playgroundParser!.onInput()}
        />
        <ExampleWrapper>
          {Object.keys(refs).map(key => (
            <ExampleItemWrapper key={key}>
              <StyledTypography variant="subtitle2">
                {parserParams[key].description}
              </StyledTypography>
              <StyledTextField
                inputRef={refs[key]}
                onChange={() => parsers[key].onInput()}
              />
            </ExampleItemWrapper>
          ))}
        </ExampleWrapper>
      </Wrapper>
    );
  }
}

export default App;
