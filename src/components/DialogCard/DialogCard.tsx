import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Box } from "@mui/material";
import { Component, ReactNode } from "react";
import { WalletRecord } from "../../interfaces";
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MonetaryValue from "../MonetaryValue/MonetaryValue";
import FormatService from "../../services/FormatService";
import { StyledArrowDown, StyledArrowUp } from "../../styles";
import DialogComponent from "../DialogComponent/DialogComponent";
import NewRecordForm from "../NewRecordForm/NewRecordForm";

type DialogCardProps = { record: WalletRecord, fnRemove: Function, outputUpdate: Function };
type DialogCardStates = { open: boolean, confirmedDeleted: boolean, txtButtonDelete: string }

class DialogCard extends Component<DialogCardProps, DialogCardStates> {
    constructor(props: DialogCardProps){
        super(props);
        this.state = {open: false, confirmedDeleted: false, txtButtonDelete: "Excluir"};

        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClose(): void {
        this.setState({open: false, confirmedDeleted: false, txtButtonDelete: "Excluir"});
    }

    handleRemove(): void {
        if(!this.state.confirmedDeleted){
            this.setState({txtButtonDelete: "Confirmar", confirmedDeleted: true});
            return;
        }

        this.props.fnRemove(this.props.record.id)
        this.setState({open: false, confirmedDeleted: false, txtButtonDelete: "Excluir"});
    }

    handleClickOpen(): void {
        this.setState({open: true});
    }

    selectArrowType(): ReactNode {
        return this.props.record.type === "POSITIVE" ? <StyledArrowUp /> : <StyledArrowDown />;
    }

    render(): ReactNode {

        return (
            <div>
                <Box onClick={this.handleClickOpen} sx={{width: 50, background: "#D6D6D6", height: 80, display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <IconButton aria-label="Botão de Informação">
                        <InfoIcon />
                    </IconButton>
                </Box>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="xl"
                >
                    <Box 
                        sx={{minWidth: 320, display:"flex", flexDirection: "column", justifyContent: "space-between"}}
                    >
                        <DialogTitle id="responsive-dialog-title" sx={{overflowWrap: "break-word", textAlign: "center"}}>
                            {this.selectArrowType()}
                            <br></br>
                            {this.props.record.description}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Box sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
                                    <span>Valor</span>
                                    <MonetaryValue spanSize="P" value={this.props.record.value}></MonetaryValue>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <span>Data do Registro</span>
                                    <span>{FormatService.toLocaleDate(this.props.record.created_at, "pt-BR")}</span>
                                </Box>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <DialogComponent
                                title="Atualizar Registro"
                                btnActionText="Alterar"
                                icon={<ModeEditIcon />}
                                btnColor="primary"
                                component={<NewRecordForm outputUpdateFn={this.props.outputUpdate} record={this.props.record} />}
                            ></DialogComponent>
                            <Button color="error" onClick={this.handleRemove}>
                                {this.state.txtButtonDelete}
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </div>
        );
    }
}

export default DialogCard;