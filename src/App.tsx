import React from "react";
import { Typography, Checkbox, Button } from "@material-ui/core";
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
  StyledButtonGroup
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
    description: "Specified mask, mask symbol and allowed symbols",
    options: { mask: "***-**-**", allowedCharacters: "[0-9]" }
  },
  showMask: {
    description: "Showing whole mask including unfilled part",
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      showMask: "true",
      allowedCharacters: "[0-9]"
    }
  },
  showMaskSymbols: {
    description:
      'Can also parse special characters, including symbol from mask (except "symbol" property itself)',
    options: {
      mask: "+_ (___) ___-__-__",
      placeholderSymbol: "_",
      showMask: "true",
      allowedCharacters: "[ \\-\\+\\(\\)]"
    }
  },
  showMaskPart: {
    description: "Only part of mask is shown",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: "8"
    }
  },
  showMaskPartNoTrailing: {
    description: "Only part of mask is shown and trailing part is disabled",
    options: {
      mask: " _ [___] [___] [__]",
      placeholderSymbol: "_",
      showMask: "8",
      trailing: "false"
    }
  },
  regex: {
    description:
      'Regex mask - only certain symbols are allowed for each character ("mask" will be ignored if "rxmask" is present)',
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
        <StyledButtonGroup>
          <Button target="_blank" href="https://www.npmjs.com/package/rxmask">npmjs package</Button>
          <Button target="_blank" href="https://github.com/kmeshavkin/rxmask">Package github</Button>
          <Button target="_blank" href="https://github.com/kmeshavkin/rxmask-playground">Playground github</Button>
        </StyledButtonGroup>
        {/* Playground */}
        <StyledPaper>
          <ExampleWrapper>
            {Object.entries(options).map(([key, val]) => (
              <ExampleItemWrapper key={key}>
                <StyledTypography>{key}</StyledTypography>
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
                    />
                  )}
              </ExampleItemWrapper>
            ))}
          </ExampleWrapper>
          <WideStyledTextField
            inputRef={playgroundInput.playgroundRef}
            onChange={() => playgroundInput.playgroundParser!.onInput()}
          />
        </StyledPaper>
        {/* Some examples */}
        <ExampleWrapperWide>
          {Object.keys(refs).map(key => (
            <ExampleItemWrapper key={key}>
              <TextWrapper>
                <StyledRadio
                  checked={checkedRadio === key}
                  onChange={() => this.onChangeRadio(key)}
                />
                <StyledTypography variant="subtitle2">
                  {parserParams[key].description}
                </StyledTypography>
              </TextWrapper>
              <StyledTextField
                inputRef={refs[key]}
                onChange={() => parsers[key].onInput()}
              />
            </ExampleItemWrapper>
          ))}
        </ExampleWrapperWide>
      </Wrapper>
    );
  }
}

export default App;
