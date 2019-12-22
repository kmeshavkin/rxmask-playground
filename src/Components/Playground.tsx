import React from "react";
import { StyledPaper, PlaygroundParamWrapper, WideStyledTextField } from "./Playground.styled";
import { Typography } from "@material-ui/core";
import { parserParams } from "../utils/const";
import rxmask, { InputOptions } from "rxmask";
import PlaygroundParam from "./PlaygroundParam";

export interface PlaygroundProps {
  onChangeRadio: (str: string) => void;
  checkedRadio: string;
}

export interface PlaygroundState {
  playgroundInput: {
    playgroundRef: React.RefObject<HTMLTextAreaElement>;
    playgroundParser: rxmask;
    options: InputOptions;
  };
  prevPlaceholderSymbol: string;
}

export interface PlaygroundMethods {
  getSafeOptions: (arr: Record<string, any>) => Record<string, any>;
}

class Playground extends React.Component<PlaygroundProps, PlaygroundState> {
  constructor(props: PlaygroundProps) {
    super(props);

    // Set playground ref
    const playgroundRef = React.createRef() as React.RefObject<
      HTMLTextAreaElement
    >;

    const newOpts = getSafeOptions(parserParams[this.props.checkedRadio].options);

    this.state = {
      playgroundInput: {
        playgroundRef,
        playgroundParser: new rxmask({}),
        options: newOpts
      },
      prevPlaceholderSymbol: '',
    };
  }

  componentDidUpdate(prevProps: PlaygroundProps, prevState: PlaygroundState) {
    if (prevProps.checkedRadio !== this.props.checkedRadio) {
      const newOpts = getSafeOptions(parserParams[this.props.checkedRadio].options);

      prevState.playgroundInput.playgroundParser.setOptions(newOpts);
      prevState.playgroundInput.playgroundParser.onInput();
      prevState.playgroundInput.playgroundParser.errors = [];

      this.setState({
        ...prevState,
        playgroundInput: {
          ...prevState.playgroundInput,
          options: newOpts
        },
      });
    }
  }

  componentDidMount() {
    const { playgroundInput } = this.state;
    const { onChangeRadio } = this.props;
    const { options } = playgroundInput;

    // Set playground parser
    const playgroundParser = new rxmask(
      options,
      playgroundInput.playgroundRef.current
    );

    this.setState(
      {
        playgroundInput: {
          ...playgroundInput,
          playgroundParser
        },
      },
      () => onChangeRadio("simple") // Set initial value to "simple" mask
    );
  }

  // Generic onChange for playground input
  onChangePlayground = (key: string, val: any) => {
    const { playgroundInput } = this.state;
    const { options } = playgroundInput;
    const newOpts = {
      ...options,
      [key]: val
    };

    playgroundInput.playgroundParser.setOptions(newOpts);
    playgroundInput.playgroundParser.onInput();
    this.setState({
      playgroundInput: {
        ...playgroundInput,
        options: newOpts
      }
    });
  };

  // Generic onFocus for playground inputs
  onFocus = (key: string, val: string) => {
    const { prevPlaceholderSymbol } = this.state;
    if (key === 'placeholderSymbol' && val !== prevPlaceholderSymbol) {
      this.setState({ prevPlaceholderSymbol: val });
    }
  };

  // Generic onBlur for playground inputs
  onBlur = (key: string, val: string) => {
    const { playgroundInput, prevPlaceholderSymbol } = this.state;
    const { options } = playgroundInput;
    if (
      key === 'placeholderSymbol' &&
      val !== prevPlaceholderSymbol &&
      options && options.mask &&
      prevPlaceholderSymbol &&
      prevPlaceholderSymbol !== ''
    ) {
      const symbol = new RegExp(escapeRegExp(prevPlaceholderSymbol), 'g');
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

  render() {
    const { playgroundInput } = this.state;
    const { options } = playgroundInput;

    return (
      <StyledPaper>
        <Typography align="center" variant="subtitle2" color="textSecondary" paragraph>
          Tweak parameters for input in the bottom of this block yourself or select an example below
        </Typography>
        <PlaygroundParamWrapper>
          {
            Object.entries(options).map(([key, val]) => (
              <PlaygroundParam
                key={key}
                optionName={key}
                optionValue={val}
                onChangePlayground={this.onChangePlayground}
                onFocusHandler={this.onFocus} onBlurHandler={this.onBlur}
              />
            ))
          }
        </PlaygroundParamWrapper>
        <WideStyledTextField
          placeholder="Type anything here"
          variant="outlined"
          inputRef={playgroundInput.playgroundRef}
          error={playgroundInput.playgroundParser.errors.length !== 0}
          onChange={() => {
            const prevErrors = playgroundInput.playgroundParser.errors;
            playgroundInput.playgroundParser.setOptions(options);
            playgroundInput.playgroundParser.onInput();
            // forceUpdate to display errors on input or remove them (in case of prevErrors.length)
            if (playgroundInput.playgroundParser.errors.length !== 0 || prevErrors.length !== 0) this.forceUpdate();
          }}
          helperText={playgroundInput.playgroundParser.errors.map(err => handleError(err.type, err.position, err.symbol)).join(', ')}
        />
      </StyledPaper>
    );
  }
}

export default Playground;

function getSafeOptions(opts: Record<string, any>) {
  return {
    mask: opts.mask || "",
    placeholderSymbol: opts.placeholderSymbol || "*",
    rxmask: opts.rxmask || "",
    allowedCharacters: opts.allowedCharacters || ".",
    maxMaskLength: opts.maxMaskLength || "0",
    trailing: opts.trailing || "true"
  }
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

function handleError(type: string, position: number, value: string) {
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