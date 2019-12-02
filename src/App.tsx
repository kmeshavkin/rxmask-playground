import React from 'react';
import { Typography } from '@material-ui/core';
import { Wrapper, StyledTextField, ExampleItemWrapper, ExampleWrapper, StyledTypography } from './App.styled';
import rxmask from 'rxmask';

export interface AppProps {
  
}
 
export interface AppState {
  refs: Record<string, React.RefObject<HTMLTextAreaElement>>,
  parsers: Record<string, rxmask>
}

const parserParams: Record<string, { description: string, options: Record<string, any>}> = {
  simple: {
    description: 'Phone mask - specify mask, mask symbol and allowed symbols',
    options: { mask: '***-**-**', allowedCharacters: '[0-9]' }
  },
  showMask: {
    description: 'Phone mask - showing whole mask including unfilled part',
    options: { mask: "+_ (___) ___-__-__", placeholderSymbol: "_", showMask: Infinity, allowedCharacters: "[0-9]" }
  },
  showMaskSymbols: {
    description: 'Phone mask, but only for special characters - allowedCharacters can include symbols from mask EXCEPT "symbol" property itself (note that special symbols should be escaped)',
    options: { mask: "+_ (___) ___-__-__", placeholderSymbol: "_", showMask: Infinity, allowedCharacters: "[ \\-\\+\\(\\)]" }
  },
  showMaskPart: {
    description: 'Random mask - only part of mask is shown',
    options: { mask: " _ [___] [___] [__]", placeholderSymbol: "_", showMask: 8 }
  },
  showMaskPartNoTrailing: {
    description: 'Random mask - only part of mask is shown and trailing part is disabled',
    options: { mask: " _ [___] [___] [__]", placeholderSymbol: "_", showMask: 8, trailing: false }
  },
  regex: {
    description: 'Regex mask - only certain symbols are allowed for each character (you don\'t need to specify "mask" property if "rxmask" is present (it will be ignored))',
    options: { rxmask: "[A-Z][A-Z] [0-4][\\d][\\d]-[a-z][\\d]", placeholderSymbol: "*", showMask: Infinity }
  }
};
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const refObj = {} as Record<string, React.RefObject<HTMLTextAreaElement>>;
    for (const key in parserParams) {
      refObj[key] = React.createRef() as React.RefObject<HTMLTextAreaElement>;
    }

    this.state = {
      refs: refObj,
      parsers: {}
    };
  }

  componentDidMount() {
    const { refs } = this.state;

    const parserObj = {} as Record<string, rxmask>;
    for (const key in parserParams) {
      parserObj[key] = new rxmask(parserParams[key].options, refs[key].current);
    }

    this.setState({ parsers: parserObj });
  }

  render() {
    const { refs, parsers } = this.state;

    return (
      <Wrapper>
        <Typography variant="h2">rxmask.js</Typography>
        <Typography variant="h6">Advanced mask parser for html input or raw string parsing</Typography>
        <ExampleWrapper>
          {Object.keys(refs).map((key) => 
            <ExampleItemWrapper key={key}>
              <StyledTypography variant="subtitle2">{parserParams[key].description}</StyledTypography>
              <StyledTextField inputRef={refs[key]} onChange={() => parsers[key].onInput()} />
            </ExampleItemWrapper>
          )}
        </ExampleWrapper>
      </Wrapper>
    );
  }
}
 
export default App;
