import { Component, ReactNode } from "react";
import Container from '@mui/material/Container';
import WalletCard from "../WalletCard/WalletCard";
import Typography from '@mui/material/Typography';
import { settings } from "../../settings";
import { AppTextTranslator } from "../../language";
import { WalletRecord } from "../../interfaces";

type WalletManageProps = { walletBalance: number, walletName: string, walletColor: string, outputNewRecord: Function };

class WalletManage extends Component<WalletManageProps> {

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
            <>
                <Container sx={{display: "flex", flexDirection: "column", maxWidth: 350}}>
                    <Typography sx={{ fontSize: 18, alignSelf: "start" }}>
                        {language.walletManage.TypographyText}
                    </Typography>

                    <WalletCard walletName={this.props.walletName} walletBalance={this.props.walletBalance} walletColor={this.props.walletColor} outputNewRecord={this.outputNewRecord}></WalletCard>
                </Container>
            </>
        );
    }
}

export default WalletManage;