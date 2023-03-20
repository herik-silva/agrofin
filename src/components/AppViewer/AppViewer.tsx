import { Component, ReactNode } from "react";
import Navigation, { NavigationStates } from "../Navigation/Navigation";
import { Routes, Route, Link } from "react-router-dom";
import { Wallet, WalletRecord } from "../../interfaces";
import HomeView from "../HomeView/HomeView";
import { Box, Container } from "@mui/material";

type AppViewerStates = { navigation: NavigationStates, wallet: Wallet  };

class AppViewer extends Component<{}, AppViewerStates> {

    constructor(props: any){
        super(props);
        this.addNewRecord = this.addNewRecord.bind(this);
        this.removeRecord = this.removeRecord.bind(this);

        const records: WalletRecord[] = []

        this.state = {navigation: {value: "geral"}, wallet: new Wallet("Conta A", "#7F4F82", records) };
        this.setNavigationValue = this.setNavigationValue.bind(this);
    }

    save(wallet: Wallet): void {
        localStorage.setItem("wallet", JSON.stringify(wallet));
    }

    load(): void {
        const wallet = localStorage.getItem("wallet");
        if(wallet !== null){
            const walletData = JSON.parse(wallet) as Wallet;
            const loadedWalletData = new Wallet(walletData.name, walletData.color, walletData.recordList);
            console.log(walletData);
            this.setState({wallet: loadedWalletData});
        }
    }

    componentDidMount(): void {
        this.load();
    }

    setNavigationValue(newValue: string) {
        this.setState({navigation: {value: newValue} });
    }

    getWalletCopy(): Wallet {
        return new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList);
    }

    addNewRecord(newRecord: WalletRecord): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList);
        copyWallet.addRecord(newRecord);
        this.setState({wallet: copyWallet});
        this.save(this.state.wallet);
    }

    removeRecord(id: string): boolean {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList);
        const result = copyWallet.removeRecord(id);

        this.setState({wallet: copyWallet});
        this.save(this.state.wallet);
        return result;
    }

    render(): ReactNode {
        if(window.innerWidth > 0){
            return (
                <Box sx={{ background: "#F2F2F2" }}>
                    <Container sx={{ background: "#FFF", padding: "0px !important"}}>
                        <Navigation value={this.state.navigation.value} onChangeState={this.setNavigationValue}></Navigation>
                        <HomeView wallet={this.state.wallet} outputNewRecord={this.addNewRecord} fnRemoveRecord={this.removeRecord}></HomeView>
                    </Container>
                </Box>
            );
        }
        else{
            return (
                <h1>Por favor, experimente o aplicativo pelo celular.</h1>
            );
        }
    }
}

export default AppViewer;