import styled from 'styled-components';
import { TextField, Typography, Checkbox } from '@material-ui/core';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ExampleWrapper = styled.div`
  padding-top: 24px;
  max-width: 600px;
  div + div {
    padding-top: 12px;
  }
`;

export const ExampleItemWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const StyledCheckbox = styled(Checkbox)`
  padding-bottom: 0 !important;
`;

export const StyledTypography = styled(Typography)`
  align-self: flex-end;
  max-width: 400px;
  padding-right: 24px;
`;

export const StyledTextField = styled(TextField)`
  width: 140px;
  align-self: flex-end;
`;

export const WideStyledTextField = styled(TextField)`
  width: 300px;
  align-self: flex-end;
`;