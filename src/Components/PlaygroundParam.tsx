import React from "react";
import { ExampleItemWrapper } from "../App.styled";
import { WideStyledTextField } from "./Playground.styled";
import { FlexWrapper, StyledTypography, StyledFab } from './PlaygroundParam.styled';
import { ClickAwayListener, Tooltip, Checkbox } from "@material-ui/core";
import { paramsDescriptions } from "../utils/const";

export interface PlaygroundParamsProps {
  optionName: string;
  optionValue: any;
  onChangePlayground: (key: string, val: any) => void;
  onFocusHandler: (key: string, val: string) => void;
  onBlurHandler: (key: string, val: string) => void;
}

export interface PlaygroundParamsState {
  tooltipOpen: boolean;
}

class PlaygroundParams extends React.Component<PlaygroundParamsProps, PlaygroundParamsState> {
  state = {
    tooltipOpen: false
  }
  render() {
    const { tooltipOpen } = this.state;
    const { optionName, optionValue, onChangePlayground, onFocusHandler, onBlurHandler } = this.props;
    return (
      <ExampleItemWrapper>
        <FlexWrapper>
          <StyledTypography>{optionName}</StyledTypography>
          <ClickAwayListener onClickAway={() => { if (tooltipOpen) this.setState({ tooltipOpen: false }) }}>
            <Tooltip
              placement="top"
              arrow
              title={paramsDescriptions[optionName]}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              onClose={() => this.setState({ tooltipOpen: false })}
              open={tooltipOpen}
            >
              <StyledFab disableRipple onClick={() => this.setState({ tooltipOpen: true })}>i</StyledFab>
            </Tooltip>
          </ClickAwayListener>
        </FlexWrapper>
        {
          optionName === "trailing" ? (
            <Checkbox
              key={optionName}
              checked={optionValue === "true"}
              onChange={() => onChangePlayground(optionName, optionValue === "true" ? "false" : "true")}
            />
          ) : (
              <WideStyledTextField
                value={optionValue}
                onChange={e => onChangePlayground(optionName, e.target.value)}
                onBlur={e => onBlurHandler(optionName, e.target.value)}
                onFocus={e => onFocusHandler(optionName, e.target.value)}
              />
            )
        }
      </ExampleItemWrapper >
    )
  }
}

export default PlaygroundParams;