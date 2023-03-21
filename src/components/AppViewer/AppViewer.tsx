import { Component, ReactNode } from "react";
import Navigation, { NavigationStates } from "../Navigation/Navigation";
import { Routes, Route, Link } from "react-router-dom";
import { Wallet, WalletRecord } from "../../interfaces";
import HomeView from "../HomeView/HomeView";
import { AlertColor, Box, Container } from "@mui/material";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
type SnackbarComponentStates = { open: boolean, message: string, severity: AlertColor };
type AppViewerStates = { navigation: NavigationStates, wallet: Wallet, snackbar: SnackbarComponentStates };

class AppViewer extends Component<{}, AppViewerStates> {

    constructor(props: any){
        super(props);
        this.addNewRecord = this.addNewRecord.bind(this);
        this.removeRecord = this.removeRecord.bind(this);

        const records: WalletRecord[] = []

        this.state = {
            navigation: {value: "geral"},
            wallet: new Wallet("Conta A", "#7F4F82", records),
            snackbar: {message: "", open: false, severity: "success"}
        };

        this.setNavigationValue = this.setNavigationValue.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    save(wallet: Wallet): void {
        localStorage.setItem("wallet", JSON.stringify(wallet));
    }

    load(): void {
        const wallet = localStorage.getItem("wallet");
        if(wallet !== null){
            const walletData = JSON.parse(wallet) as Wallet;
            const loadedWalletData = new Wallet(walletData.name, walletData.color, walletData.recordList);
            this.setState({wallet: loadedWalletData});
        }
    }

    componentDidMount(): void {
        this.load();
    }

    setNavigationValue(newValue: string) {
        this.setState({navigation: {value: newValue} });
    }

    onClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackbar: {open: false, message: "", severity: "success"}});
    }

    addNewRecord(newRecord: WalletRecord): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList);
        copyWallet.addRecord(newRecord);
        
        this.setState({wallet: copyWallet, snackbar: {open: true, message: `O Registro ${newRecord.description} foi adicionado!`, severity: "success"}});
        this.save(this.state.wallet);
    }

    removeRecord(id: string): boolean {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList);
        const result = copyWallet.removeRecord(id);

        if(result.removed){
            this.setState({wallet: copyWallet, snackbar: {open: true, message: `O Registro ${result.record?.description} foi removido!`, severity: "success"}});
            this.save(this.state.wallet);

            return true;
        }

        this.setState({snackbar: {open: true, message: `Não foi possível remover o registro ${result.record?.description}.`, severity: "error"}});

        return false;
    }

    render(): ReactNode {
        return (
            <Box sx={{ background: "#F2F2F2" }}>
                <Container sx={{ background: "#FFF", padding: "0px !important"}}>
                    <Navigation value={this.state.navigation.value} onChangeState={this.setNavigationValue}></Navigation>
                    <HomeView wallet={this.state.wallet} outputNewRecord={this.addNewRecord} fnRemoveRecord={this.removeRecord}></HomeView>
                    <SnackbarComponent onClose={this.onClose} open={this.state.snackbar.open} severity={this.state.snackbar.severity} message={this.state.snackbar.message}></SnackbarComponent>
                </Container>
            </Box>
        );
    }
}

export default AppViewer;