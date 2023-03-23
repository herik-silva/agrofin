import { Component, ReactNode } from "react";
import Navigation, { NavigationStates } from "../Navigation/Navigation";
import { Wallet, WalletRecord } from "../../interfaces";
import HomeView from "../HomeView/HomeView";
import { AlertColor, Box, Container } from "@mui/material";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import SettingsComponent, { MIN_CHARS } from "../SettingsComponent/SettingsComponent";

type Pages = "home" | "settings";
type SnackbarComponentStates = { open: boolean, message: string, severity: AlertColor };
type AppViewerStates = { navigation: NavigationStates, wallet: Wallet, snackbar: SnackbarComponentStates, lastAction: LastAction, page: Pages, lastWallet?: Wallet };

type LastAction = "add" | "remove" | "update-account" | undefined;

class AppViewer extends Component<{}, AppViewerStates> {

    constructor(props: any){
        super(props);
        this.addNewRecord = this.addNewRecord.bind(this);
        this.removeRecord = this.removeRecord.bind(this);

        const records: WalletRecord[] = []

        this.state = {
            navigation: {value: "geral"},
            wallet: new Wallet("Conta A", "#7F4F82", records),
            snackbar: {message: "", open: false, severity: "success"},
            lastAction: undefined,
            page: "home"
        };

        this.setNavigationValue = this.setNavigationValue.bind(this);
        this.onClose = this.onClose.bind(this);
        this.undoAction = this.undoAction.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setWallet = this.setWallet.bind(this);
        this.clearAllRecords = this.clearAllRecords.bind(this);
    }

    save(wallet: Wallet): void {
        console.log(wallet)
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
        console.log(newValue);
        this.setState({navigation: {value: newValue} });
    }

    onClose(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackbar: {open: false, message: "", severity: "success"}});
    }

    addNewRecord(newRecord: WalletRecord): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList, this.state.wallet.removedRecordList);
        copyWallet.addRecord(newRecord);
        
        this.setState({wallet: copyWallet, snackbar: {open: true, message: `O Registro ${newRecord.description} foi adicionado!`, severity: "success"}, lastAction: "add"});
        this.save(this.state.wallet);
    }

    removeRecord(id: string): boolean {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList, this.state.wallet.removedRecordList);
        const result = copyWallet.removeRecord(id);

        if(result.removed){
            this.setState({wallet: copyWallet, snackbar: {open: true, message: `O Registro ${result.record?.description} foi removido!`, severity: "success"}, lastAction: "remove"});
            this.save(this.state.wallet);
            return true;
        }

        this.setState({snackbar: {open: true, message: `Não foi possível remover o registro ${result.record?.description}.`, severity: "error"}});

        return false;
    }

    undoAdd(): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList, this.state.wallet.removedRecordList);
        const lastInsertedRecord = copyWallet.recordList[copyWallet.recordList.length-1];
        copyWallet.removeRecord(lastInsertedRecord.id);
        this.setState({wallet: copyWallet});
        this.save(this.state.wallet);
    }

    undoRemove(): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color, this.state.wallet.recordList, this.state.wallet.removedRecordList);
        const undoRecord = copyWallet.removedRecordList.pop();

        if(undoRecord){
            copyWallet.addRecord(undoRecord);
            this.setState({wallet: copyWallet});
            this.save(this.state.wallet);
        }
        else{
            this.setState({snackbar: {message: "Não foi possível desfazer a ação", open: true, severity: "error"}});
        }
    }

    undoUpdateAccount(): void {
        if(this.state.lastWallet === undefined){
            this.setState({snackbar: {message: "Não foi possível desfazer a ação", open: true, severity: "error"}});
            return;
        }

        this.setState({wallet: this.state.lastWallet}, ()=>{
            this.setState({lastWallet: undefined});
            this.save(this.state.wallet);
        });
    }

    undoAction(): void {
        console.log(this.state.lastAction);
        if(this.state.lastAction){
            switch(this.state.lastAction){
                case "add":
                    this.undoAdd();
                    this.setState({snackbar: {open: false, message: "", severity: "success"}});
                    break;

                case "remove":
                    this.undoRemove();
                    this.setState({snackbar: {open: false, message: "", severity: "success"}});
                    break;

                case "update-account":
                    this.undoUpdateAccount();
                    this.setState({snackbar: {open: false, message: "", severity: "success"}});
                    break;
            }
        }
    }

    setPage(page: Pages): void {
        this.setState({page: page});
    }

    setWallet(name?: string, walletColor?: string): void {
        if(name === undefined || walletColor === undefined){
            this.setState({snackbar: {
                message: `Não foi possível atualizar o nome da conta. É necessário pelo menos ${MIN_CHARS} caractéres`,
                open: true,
                severity: "error"
            }});

            return;
        }

        const copyWallet = new Wallet(name, walletColor, this.state.wallet.recordList, this.state.wallet.removedRecordList);

        this.setState({lastWallet: this.state.wallet, wallet: copyWallet}, ()=>{
            this.save(this.state.wallet);
            this.setState({
                snackbar: {
                    message: `O nome da conta foi atualizado para ${name}`,
                    open: true,
                    severity: "success"
                },
                lastAction: "update-account"
            })
        });
    }

    clearAllRecords(): void {
        const copyWallet = new Wallet(this.state.wallet.name, this.state.wallet.color);
        this.setState({wallet: copyWallet}, ()=>{
            this.save(this.state.wallet);
            this.setState({snackbar: {
                message: `Todos os registros foram excluidos`,
                open: true,
                severity: "info"
            }})
        });
    }
    
    showHome(): ReactNode {
        return <HomeView wallet={this.state.wallet} outputNewRecord={this.addNewRecord} fnRemoveRecord={this.removeRecord}></HomeView>
    }

    showSettings(): ReactNode {
        return <SettingsComponent walletName={this.state.wallet.name} walletColor={this.state.wallet.color} changeWalletFn={this.setWallet} clearAllRecords={this.clearAllRecords}/>
    }

    contentView(): ReactNode {
        switch(this.state.navigation.value){
            case "home":
                return this.showHome();
            case "settings":
                return this.showSettings();

            default:
                return this.showHome();
        }
    }

    render(): ReactNode {
        return (
            <Box sx={{ background: "#F2F2F2" }}>
                <Container sx={{ background: "#FFF", padding: "0px !important"}}>
                    <Navigation value={this.state.navigation.value} onChangeState={this.setNavigationValue}></Navigation>
                    {this.contentView()}
                    <SnackbarComponent undoAction={this.undoAction} onClose={this.onClose} open={this.state.snackbar.open} severity={this.state.snackbar.severity} message={this.state.snackbar.message}></SnackbarComponent>
                </Container>
            </Box>
        );
    }
}

export default AppViewer;