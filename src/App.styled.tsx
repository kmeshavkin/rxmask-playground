import styled from "styled-components";
import { Radio, ButtonGroup, FormControlLabel } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExampleWrapperWide = styled.div`
  max-width: 600px;
  & > div + div {
    padding-top: 6px;
  }
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  padding-top: 12px;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  max-width: 500px;
  margin-left: 0 !important;
  margin-right: 0 !important;
`;

export const StyledRadio = styled(Radio)`
  margin-left: -9px !important;
`;

export const ExampleItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;