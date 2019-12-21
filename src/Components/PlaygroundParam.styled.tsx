import styled from "styled-components";
import { Fab, Typography } from "@material-ui/core";

export const FlexWrapper = styled.div`
  display: flex;
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
