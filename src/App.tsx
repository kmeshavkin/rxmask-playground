import React from "react";
import { Typography, TextField, Radio } from "@material-ui/core";
import {
  Wrapper,
  StyledTextField,
  ExampleItemWrapper,
  ExampleWrapper,
  StyledTypography,
  StyledCheckbox,
  WideStyledTextField
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
      showMask: "true",
      allowedCharacters: "[0-9]"
    }
  },
  showMaskSymbols: {
    description:
      'Phone mask, but only for special characters - allowedCharacters can include symbols from mask EXCEPT "symbol" property itself (note that special symbols should be escaped)',
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      showMask: "true",
      allowedCharacters: "[ \\-\\+\\(\\)]"
    }
  },
  showMaskPart: {
    description: "Random mask - only part of mask is shown",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: "8"
    }
  },
  showMaskPartNoTrailing: {
    description:
      "Random mask - only part of mask is shown and trailing part is disabled",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: "8",
      trailing: "false"
    }
  },
  regex: {
    description:
      'Regex mask - only certain symbols are allowed for each character (you don\'t need to specify "mask" property if "rxmask" is present (it will be ignored))',
    options: {
      rxmask: "[A-Z][A-Z] [0-4][\\d][\\d]-[a-z][\\d]",
      placeholderSymbol: "*",
      showMask: "true"
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
          showMask: "0",
          trailing: "true"
        }
      },
      refs: refObj,
      parsers: {},
      checkedRadio: "simple"
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
  onChangePlayground = (key: string, val: any) => {
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
          showMask: opts.showMask || "0",
          trailing: opts.trailing || "true"
        }
      },
      checkedRadio: key
    });
  };

  render() {
    const { playgroundInput, refs, parsers, checkedRadio } = this.state;
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
        {/* Playground */}
        <ExampleWrapper>
          {Object.entries(options).map(([key, val]) => (
            <ExampleItemWrapper key={key}>
              <StyledTypography>{key}</StyledTypography>
              {key === "trailing" ? (
                <StyledCheckbox
                  key={key}
                  checked={val === "true"}
                  onChange={() => this.onChangePlayground(key, !Boolean(val))}
                />
              ) : (
                <WideStyledTextField
                  key={key}
                  value={val}
                  onChange={e => this.onChangePlayground(key, e.target.value)}
                />
              )}
            </ExampleItemWrapper>
          ))}
        </ExampleWrapper>
        <TextField
          inputRef={playgroundInput.playgroundRef}
          onChange={() => playgroundInput.playgroundParser!.onInput()}
        />
        {/* Some examples */}
        <ExampleWrapper>
          {Object.keys(refs).map(key => (
            <ExampleItemWrapper key={key}>
              <Radio
                checked={checkedRadio === key}
                onChange={() => this.onChangeRadio(key)}
              />
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
