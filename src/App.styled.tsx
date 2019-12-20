import styled from "styled-components";
import { TextField, Typography, Paper, Radio, ButtonGroup, FormControlLabel, Fab } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExampleWrapper = styled.div`
  width: 100%;
  div + div {
    padding-top: 12px;
  }
`;

export const ExampleWrapperWide = styled.div`
  padding-top: 12px;
  max-width: 600px;
  & > div + div {
    padding-top: 24px;
  }
`;

export const ExampleItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const FlexWrapper = styled.div`
  display: flex;
`;

export const StyledPaper = styled(Paper)`
  max-width: 600px;
  width: 100%;
  margin: 24px 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  padding-top: 12px;
`;

export const StyledTypography = styled(Typography)`
  align-self: center;
  padding: 0 24px 0 12px;
`;

export const StyledFab = styled(Fab)`
  width: 16px !important;
  height: 16px !important;
  min-height: 16px !important;
  align-self: center;
  & > span {
    line-height: 0;
    text-transform: lowercase;
  }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  max-width: 400px;
  margin-left: 0 !important;
  margin-right: 0 !important;
`;

export const WideStyledTextField = styled(TextField)`
  flex: 1;
  max-width: 300px;
`;

export const StyledRadio = styled(Radio)`
  margin-left: -9px !important;
`;
