import { Component, ReactNode, forwardRef} from "react";
import Dialog from '@mui/material/Dialog';
import { StyledButton } from "../../styles";
import { AppBar, Button, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { TransitionProps } from '@mui/material/transitions';
import { ColorTypes } from "../SettingsComponent/SettingsComponent";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export type DialogComponentProps = { component: ReactNode, title: string, btnActionText: string, icon?: ReactNode, btnColor?: ColorTypes };
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

    selectButton(): ReactNode {
        if(this.props.icon && this.props.btnColor === undefined){
            console.log("ICONE");
            return (
                <StyledButton startIcon={this.props.icon} size="small" variant="contained" color="success" fontfill="#FFF" bgfill="#5DAD5E" onClick={() => { this.handleOpen() }}>
                    {this.props.btnActionText}
                </StyledButton>
            );
        }

        if(this.props.btnColor && this.props.icon === undefined){
            console.log("COR");
            return (
                <Button size="small" variant="contained" color={this.props.btnColor} onClick={() => { this.handleOpen() }}>
                    {this.props.btnActionText}
                </Button>
            );
        }

        if(this.props.btnColor === undefined && this.props.icon === undefined){
            console.log("NENHUM");

            return (
                <Button size="small" variant="contained" color="primary" onClick={() => { this.handleOpen() }}>
                    {this.props.btnActionText}
                </Button>
            );
        }

        if(this.props.btnColor && this.props.icon){
            console.log("ICONE E COR");
            return (
                <Button size="small" variant="contained" color={this.props.btnColor} startIcon={this.props.icon} onClick={() => { this.handleOpen() }}>
                    {this.props.btnActionText}
                </Button>
            );
        }

    }

    render(): ReactNode {
        const fullScreen = window.innerWidth < 960;

        return (
            <div>
                <Dialog fullScreen={fullScreen} onClose={this.handleClose} open={this.state.open} TransitionComponent={Transition}>
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
                                {this.props.title}
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
                </Dialog>
                {this.selectButton()}
            </div>
        );
    }
}

export default DialogComponent;