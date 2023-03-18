import Container from "@mui/material/Container";
import { Component, ReactNode } from "react";
import { FlexDivColumn, FlexDivRow, StyledDivisor } from "../../styles"
import InfoCard from "../InfoCard/InfoCard";
import { settings } from "../../settings";
import { AppTextTranslator } from "../../language";
import MonetaryValue from "../MonetaryValue/MonetaryValue";
import { Box } from "@mui/material";

type BalanceProps = { currentBalance: number, income: number, expenses: number };

class Balance extends Component<BalanceProps> {
    constructor(props: BalanceProps){
        super(props);

    }

    render(): ReactNode {
        const languageStringify = localStorage.getItem("language") as string;
        const language = JSON.parse(languageStringify)[settings.language] as AppTextTranslator;

        return (
            <StyledDivisor>
                <Container maxWidth="sm">
                    <FlexDivColumn alignItems="center">
                        <span>{ language.balance.currentBalanceText }</span>
                        <MonetaryValue value={this.props.currentBalance} spanSize="M"></MonetaryValue>
                    </FlexDivColumn>

                    <FlexDivRow justifyContent="space-between">
                        <Box sx={{ display: "flex", background: "#f2f2f291", padding: "15px 25px", flexDirection: "column", borderRadius: "5px" }}>
                            <InfoCard type="POSITIVE" value={this.props.income}></InfoCard>
                        </Box>
                        <Box sx={{ display: "flex", background: "#f2f2f291", padding: "15px 25px", flexDirection: "column", borderRadius: "5px" }}>
                            <InfoCard type="NEGATIVE" value={this.props.expenses}></InfoCard>
                        </Box>
                    </FlexDivRow>
                </Container>
            </StyledDivisor>
        );
    }
}

export default Balance;