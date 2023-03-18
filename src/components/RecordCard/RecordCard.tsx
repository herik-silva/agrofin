import { Component, ReactNode } from "react";
import { StyledArrowUp, StyledArrowDown, StyledCard } from "../../styles";
import { WalletRecord } from "../../interfaces";
import Box from "@mui/material/Box";
import MonetaryValue from "../MonetaryValue/MonetaryValue";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';

type RecordCardProps = { record: WalletRecord }

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
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <span>{this.props.record.description}</span>
                        <MonetaryValue spanSize="P" value={this.props.record.value}></MonetaryValue>
                    </Box>
                    <Box sx={{width: 50, background: "#D6D6D6", height: 80, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <IconButton aria-label="Botão de Informação">
                            <InfoIcon />
                        </IconButton>
                    </Box>
                </Box>
            </StyledCard>
        );
    }
}

export default RecordCard;