import styled from 'styled-components';
import { TextField, Typography } from '@material-ui/core';

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

export const StyledTypography = styled(Typography)`
  align-self: flex-end;
  max-width: 400px;
`;

export const StyledTextField = styled(TextField)`
  width: 140px;
  align-self: flex-end;
`;