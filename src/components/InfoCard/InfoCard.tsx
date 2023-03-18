import { Component, ReactNode } from "react";
import { FlexDivRow, FlexDivColumn, StyledArrowUp, StyledArrowDown } from "../../styles";
import { settings } from "../../settings";
import { AppTextTranslator } from "../../language";
import MonetaryValue from "../MonetaryValue/MonetaryValue";

type InfoCardProps = {type: "POSITIVE" | "NEGATIVE", value: number};

class InfoCard extends Component<InfoCardProps> {
    text: string;

    constructor(props: any){
        super(props);
        this.text = "";
    }

    selectArrow(): ReactNode {
        const languageStringify = localStorage.getItem("language") as string;
        const language = JSON.parse(languageStringify)[settings.language] as AppTextTranslator;

        if(this.props.type === "POSITIVE"){
            this.text = language.balance.incomeText;
            return <StyledArrowUp></StyledArrowUp>
        }
        
        this.text = language.balance.expanseText;
        return <StyledArrowDown></StyledArrowDown>
    }

    render(): ReactNode {
        return (
            <FlexDivRow alignItems="center">
                {this.selectArrow()}
                <FlexDivColumn>
                    <span>{this.text}</span>
                    <MonetaryValue value={this.props.value} spanSize="P"></MonetaryValue>
                </FlexDivColumn>
            </FlexDivRow>
        );
    }
}

export default InfoCard;