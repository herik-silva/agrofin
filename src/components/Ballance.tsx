import Container from "@mui/material/Container";
import { Component, ReactNode } from "react";
import { SpanM, FlexDivColumn, FlexDivRow } from "../styles"
import InfoCard from "./InfoCard";
import { settings } from "../settings";
import { AppTextTranslator } from "../language";

type BallanceProps = { currentBalance: number, income: number, expenses: number };

class Ballance extends Component<BallanceProps> {
    constructor(props: BallanceProps){
        super(props);

    }

    prepareValue(value: number): string {
        const precisionValue = value.toFixed(2);
        return precisionValue.replace(".", ",");
    }

    render(): ReactNode {
        const languageStringify = localStorage.getItem("language") as string;
        const language = JSON.parse(languageStringify)[settings.language] as AppTextTranslator;

        return (
            <div>
                <Container maxWidth="sm">
                    <FlexDivColumn alignItems="center">
                        <span>{ language.ballance.currentBallance }</span>
                        <SpanM>R$ {this.prepareValue(this.props.currentBalance)}</SpanM>
                    </FlexDivColumn>

                    <FlexDivRow justifyContent="space-between">
                        <FlexDivColumn>
                            <InfoCard type="POSITIVE" value={this.prepareValue(this.props.income)}></InfoCard>
                        </FlexDivColumn>
                        <FlexDivColumn>
                            <InfoCard type="NEGATIVE" value={this.prepareValue(this.props.expenses)}></InfoCard>
                        </FlexDivColumn>
                    </FlexDivRow>
                </Container>
            </div>
        );
    }
}

export default Ballance;