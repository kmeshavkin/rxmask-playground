import styled from "styled-components";
import { TextField, Typography, Paper, Radio } from "@material-ui/core";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExampleWrapper = styled.div`
  max-width: 600px;
  div + div {
    padding-top: 12px;
  }
`;

export const ExampleWrapperWide = styled.div`
  padding-top: 24px;
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

export const StyledPaper = styled(Paper)`
  margin-top: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextWrapper = styled.div`
  display: flex;
`;

export const StyledTypography = styled(Typography)`
  align-self: center;
  max-width: 400px;
  padding: 0 24px 0 12px;
`;

export const StyledTextField = styled(TextField)`
  width: 140px;
  align-self: center;
`;

export const WideStyledTextField = styled(TextField)`
  width: 300px;
`;

export const StyledRadio = styled(Radio)`
  margin-left: -9px !important;
`;
