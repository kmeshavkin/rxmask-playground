import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Wrapper } from './App.styled';
import rxmask from 'rxmask';

export interface AppProps {
  
}
 
export interface AppState {
  example: {
    ref: React.RefObject<HTMLTextAreaElement>,
    parser: rxmask | null
  }
}
 
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const exampleRef = React.createRef() as React.RefObject<HTMLTextAreaElement>;

    this.state = {
      example: {
        ref: exampleRef,
        parser: null
      }
    };
  }

  componentDidMount() {
    const { example } = this.state;
    this.setState({
      example: {
        ...example,
        parser: new rxmask({ mask: '***-**-**' }, example.ref.current)
      }
    });
  }

  render() {
    const { example } = this.state;

    return (
      <Wrapper>
        <Typography variant="h2">rxmask.js</Typography>
        <Typography variant="h6">Advanced mask parser for html input or raw string parsing</Typography>
        <TextField inputRef={example.ref} onChange={() => example.parser!.onInput()} />
      </Wrapper>
    );
  }
}
 
export default App;
