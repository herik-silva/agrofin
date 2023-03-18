import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from "@mui/material";
import { Component, ReactNode } from "react";
import { WalletRecord } from "../../interfaces";
import InfoIcon from '@mui/icons-material/Info';

type DialogCardProps = { record: WalletRecord };
type DialogCardStates = { open: boolean }

class DialogCard extends Component<DialogCardProps, DialogCardStates> {
    constructor(props: DialogCardProps){
        super(props);
        this.state = {open: false};

        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
    }

    handleClose(): void {
        this.setState({open: false});
    }

    handleClickOpen(): void {
        this.setState({open: true});
    }

    render(): ReactNode {

        return (
            <div>
                <Button onClick={this.handleClickOpen} sx={{width: 50, background: "#D6D6D6", height: 80, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <IconButton aria-label="Botão de Informação">
                        <InfoIcon />
                    </IconButton>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {""}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Let Google help apps determine location. This means sending anonymous
                            location data to Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose}>
                            Editar
                        </Button>
                        <Button onClick={this.handleClose} autoFocus>
                            Excluir
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default DialogCard;

function useTheme() {
    throw new Error("Function not implemented.");
}


function useMediaQuery(arg0: any) {
    throw new Error("Function not implemented.");
}
