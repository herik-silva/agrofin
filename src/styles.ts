import styled, {createGlobalStyle} from "styled-components";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { NEGATIVE_COLOR, POSITIVE_COLOR } from "./colors";

export const StyledBottomNavigation = styled(BottomNavigation)`
  background-color: #5DAD5E !important;
`;


export const StyledArrowUp = styled(ArrowUpwardIcon)`
  color: ${POSITIVE_COLOR};
  font-size: 30px !important;
`;

export const StyledArrowDown = styled(ArrowDownwardIcon)`
  color: ${NEGATIVE_COLOR};
  font-size: 30px !important;
`;

export const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  && {
    color: #fff;
    &.Mui-selected {
        background-color: #2B9B34;
        color: #FFF;
    }
  }
`;

export const StyledApp = styled.body`
    margin: 0 !important;
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export const FlexDivColumn = styled.div<{alignItems?: string, justifyContent?: string}>`
  margin: 5px 0;

  display: flex;
  flex-direction: column;
  align-items: ${props => props.alignItems ? props.alignItems : "none"};
  justify-content: ${props => props.justifyContent ? props.justifyContent : "none"};
`;

export const FlexDivRow = styled.div<{alignItems?: string, justifyContent?: string}>`
  margin: 5px 0;

  display: flex;
  align-items: ${props => props.alignItems ? props.alignItems : "none"};
  justify-content: ${props => props.justifyContent ? props.justifyContent : "none"};
`;

export const SpanM = styled.span`
  font-size: 26px;
  font-weight: bold;
`;