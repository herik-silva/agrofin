import { Component, ReactNode } from "react";
import { FlexDivRow, FlexDivColumn, StyledArrowUp, StyledArrowDown } from "../styles";
import { settings } from "../settings";
import { AppTextTranslator } from "../language";

type InfoCardProps = {type: "POSITIVE" | "NEGATIVE", value: string};

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
            this.text = language.ballance.income;
            return <StyledArrowUp></StyledArrowUp>
        }
        
        this.text = language.ballance.expanse;
        return <StyledArrowDown></StyledArrowDown>
    }

    render(): ReactNode {
        return (
            <FlexDivRow alignItems="center">
                {this.selectArrow()}
                <FlexDivColumn>
                    <span>{this.text}</span>
                    <span>R$ {this.props.value}</span>
                </FlexDivColumn>
            </FlexDivRow>
        );
    }
}

export default InfoCard;