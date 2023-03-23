import { Component, ReactNode } from "react";
import { StyledArrowUp, StyledArrowDown, StyledCard } from "../../styles";
import { WalletRecord } from "../../interfaces";
import Box from "@mui/material/Box";
import MonetaryValue from "../MonetaryValue/MonetaryValue";
import DialogCard from "../DialogCard/DialogCard";

type RecordCardProps = { record: WalletRecord, fnRemove: Function, outputUpdate: Function }

class RecordCard extends Component<RecordCardProps> {

    constructor(props: RecordCardProps){
        super(props);
    }

    getCardIcon(): ReactNode {
        if(this.props.record.type === "POSITIVE"){
            return <StyledArrowUp></StyledArrowUp>
        }

        return <StyledArrowDown></StyledArrowDown>
    }

    render(): ReactNode {
        return (
            <StyledCard bgfill="#FFF" fontfill="#101010" sx={{ margin: "10px 0" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80}}>
                    <Box sx={{width: 50, textAlign: "center"}}>
                        {this.getCardIcon()}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                        <span>{this.props.record.description}</span>
                        <MonetaryValue spanSize="P" value={this.props.record.value}></MonetaryValue>
                    </Box>
                    <DialogCard record={this.props.record} fnRemove={this.props.fnRemove} outputUpdate={this.props.outputUpdate} />
                </Box>
            </StyledCard>
        );
    }
}

export default RecordCard;