import { Component, ReactNode, forwardRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { Box, Button, IconButton } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';

export type SnackbarComponentProps = { open: boolean, message: string, severity: AlertColor | undefined, onClose: any, undoAction: any };


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} ></MuiAlert>
    );
});


class SnackbarComponent extends Component<SnackbarComponentProps> {

    constructor(props: SnackbarComponentProps){
        super(props);
    }

    useUndo(): ReactNode {
        if(this.props.severity === "success"){
            return (
                <IconButton aria-label="undo" disabled={false} color="warning" onClick={this.props.undoAction}>
                    <UndoIcon color="action" />
                </IconButton>
            );
        }
    }

    render(): ReactNode {
        return (
            <div>
                <Snackbar
                    open={this.props.open}
                    autoHideDuration={5000}
                    onClose={this.props.onClose}
                >
                    <Box sx={{ display: "flex", background: "#A9A9A9", borderRadius: "10px" }}>
                        <Alert onClose={this.props.onClose} severity={this.props.severity} sx={{display: "flex"}}>
                            {this.props.message}
                        </Alert>
                        {this.useUndo()}
                    </Box>
                </Snackbar>
            </div>
        );
    }
}

export default SnackbarComponent;