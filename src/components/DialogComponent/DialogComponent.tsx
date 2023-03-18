import { Component, ReactNode, forwardRef} from "react";
import Dialog from '@mui/material/Dialog';
import { StyledButton } from "../../styles";
import AddIcon from '@mui/icons-material/Add';
import { AppBar, Button, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export type DialogComponentProps = { component: ReactNode, closeComponent: Function };
type DialogState = { open: boolean };

class DialogComponent extends Component<DialogComponentProps, DialogState> {

    constructor(props: any){
        super(props);
        this.state = {open: false};
        this.handleClose = this.handleClose.bind(this);
    }

    handleOpen(): void {
        this.setState({open: true});
    }

    handleClose(): void {
        this.setState({open: false});
    };

    render(): ReactNode {
        this.props.closeComponent();
        return (
            <div>
                <Dialog fullScreen onClose={this.handleClose} open={this.state.open} TransitionComponent={Transition}>
                    <AppBar sx={{ position: 'relative', background: "#5DAD5E" }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="close"
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Novo Registro
                            </Typography>
                            <IconButton id="close"
                                edge="start"
                                color="inherit"
                                onClick={this.handleClose}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {this.props.component}
                    {/* <Button variant="contained" size="large" color="success" sx={{ borderRadius: 0, background: "#5DAD5E"}}>CONCLUIR</Button> */}
                </Dialog>
                <StyledButton startIcon={<AddIcon />} size="small" variant="contained" color="success" fontfill="#FFF" bgfill="#5DAD5E" onClick={()=>{this.handleOpen()}}>
                    Novo Registro
                </StyledButton>
            </div>
        );
    }
}

export default DialogComponent;