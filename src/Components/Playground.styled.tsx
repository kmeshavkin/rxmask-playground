import styled from 'styled-components';
import { Paper, TextField } from '@material-ui/core';

export const StyledPaper = styled(Paper)`
  margin: 24px 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlaygroundParamWrapper = styled.div`
  width: 100%;
  & > div {
    padding-bottom: 12px;

    div:first-child {
      padding-right: 24px;
    }
  }
`;

export const WideStyledTextField = styled(TextField)`
  width: 250px;
`;
