import React from "react";
import { Typography, Button } from "@material-ui/core";
import {
  Wrapper,
  ExampleWrapperWide,
  StyledRadio,
  StyledButtonGroup,
  StyledFormControlLabel,
  ExampleItemWrapper
} from "./App.styled";
import Playground from "./Components/Playground";
import { parserParams } from "./utils/const";

export interface AppState {
  checkedRadio: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      checkedRadio: "simple"
    };
  }

  onChangeRadio = (key: string) => {
    this.setState({
      checkedRadio: key
    });
  };

  render() {
    const { checkedRadio } = this.state;

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
        <Playground onChangeRadio={this.onChangeRadio} checkedRadio={checkedRadio} />
        {/* Some examples */}
        <Typography align="center" variant="subtitle2" color="textSecondary">You can select one of the presets below</Typography>
        <ExampleWrapperWide>
          {Object.keys(parserParams).map(key => (
            <ExampleItemWrapper key={key}>
              <StyledFormControlLabel
                control={<StyledRadio
                  checked={checkedRadio === key}
                  onChange={() => this.onChangeRadio(key)}
                />}
                label={parserParams[key].description} />
            </ExampleItemWrapper>
          ))}
        </ExampleWrapperWide>
      </Wrapper>
    );
  }
}

export default App;
