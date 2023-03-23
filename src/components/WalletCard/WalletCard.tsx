import { Component, ReactNode } from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MonetaryValue from "../MonetaryValue/MonetaryValue";
import { StyledCard, StyledButton } from "../../styles";
import AddIcon from '@mui/icons-material/Add';
import { settings } from "../../settings";
import { AppTextTranslator } from "../../language";
import DialogComponent from "../DialogComponent/DialogComponent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";
import { WalletRecord } from "../../interfaces";


type WalletCardProps = { walletName: string, walletColor: string, walletBalance: number, outputNewRecord: Function }

class WalletCard extends Component<WalletCardProps> {

    constructor(props: any){
        super(props);
        this.outputNewRecord = this.outputNewRecord.bind(this);
    }

    outputNewRecord(newRecord: WalletRecord): void {
        this.props.outputNewRecord(newRecord);
        
    }

    render(): ReactNode {
        const languageStringify = localStorage.getItem("language") as string;
        const language = JSON.parse(languageStringify)[settings.language] as AppTextTranslator;

        return (
            <StyledCard sx={{ width: 320, height: 150 }} bgfill={this.props.walletColor} fontfill="#FFF">
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: 24 }} gutterBottom>
                            {this.props.walletName}
                        </Typography>
                    </Box>
                    <Box sx={{ marginLeft: 2.5 }}>
                        <MonetaryValue value={this.props.walletBalance} spanSize="M"></MonetaryValue>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <DialogComponent
                        btnActionText="Novo Registro"
                        title="Novo Registro"
                        icon={<AddIcon />}
                        component={<NewRecordForm outputAddFn={this.outputNewRecord}/>}
                    ></DialogComponent>
                </CardActions>
            </StyledCard>
        );
    }
}

export default WalletCard;