import { Component, ReactNode, forwardRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

export type SnackbarComponentProps = { open: boolean, message: string, severity: AlertColor | undefined, onClose: any };


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


class SnackbarComponent extends Component<SnackbarComponentProps> {

    constructor(props: SnackbarComponentProps){
        super(props);
    }

    render(): ReactNode {
        return (
            <div>
                <Snackbar
                    open={this.props.open}
                    autoHideDuration={6000}
                    onClose={this.props.onClose}
                >
                    <Alert onClose={this.props.onClose} severity={this.props.severity}>
                        {this.props.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default SnackbarComponent;