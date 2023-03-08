import Container from "@mui/material/Container";
import { Component, ReactNode } from "react";
import { FlexDivColumn, FlexDivRow, StyledDivisor } from "../styles"
import InfoCard from "./InfoCard";
import { settings } from "../settings";
import { AppTextTranslator } from "../language";
import MonetaryValue from "./MonetaryValue";

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
                        <FlexDivColumn>
                            <InfoCard type="POSITIVE" value={this.props.income}></InfoCard>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoCard type="NEGATIVE" value={this.props.expenses}></InfoCard>
                        </FlexDivColumn>
                    </FlexDivRow>
                </Container>
            </StyledDivisor>
        );
    }
}

export default Balance;