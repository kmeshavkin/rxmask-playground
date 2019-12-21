
import styled from "styled-components";
import { Paper, TextField } from "@material-ui/core";

export const StyledPaper = styled(Paper)`
  max-width: 600px;
  width: 100%;
  margin: 24px 0;
  padding: 24px;
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

export const WideStyledTextField = styled(TextField)`
  flex: 1;
  max-width: 300px;
`;
