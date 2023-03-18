import { Component, ReactNode } from "react";
import { Wallet, WalletRecord } from "../../interfaces";
import Balance from "../Balance/Balance";
import WalletManage from "../WalletManage/WalletManage";
import RecordListView from "../RecordsListView/RecordsListView";
import Box from "@mui/material/Box";

export type HomeViewProps = { wallet: Wallet, outputNewRecord: Function }

class HomeView extends Component<HomeViewProps> {

    constructor(props: HomeViewProps){
        super(props);
        this.outputNewRecord = this.outputNewRecord.bind(this);
    }

    outputNewRecord(newRecord: WalletRecord): void {
        this.props.outputNewRecord(newRecord);
    }

    render(): ReactNode {
        return (
            <Box>
                <Box sx={{ margin: "10px 0" }}>
                    <Balance currentBalance={this.props.wallet.balance} expenses={this.props.wallet.getOnlyType("NEGATIVE")} income={this.props.wallet.getOnlyType("POSITIVE")}></Balance>
                </Box>
                <Box sx={{ margin: "10px 0" }}>
                    <WalletManage walletBalance={this.props.wallet.balance} walletName={this.props.wallet.name} walletColor={this.props.wallet.color} outputNewRecord={this.outputNewRecord}></WalletManage>
                </Box>
                <Box sx={{ margin: "30px 0 0 0" }}>
                    <RecordListView recordList={this.props.wallet.recordList}></RecordListView>
                </Box>
            </Box>
        );
    }
}

export default HomeView;