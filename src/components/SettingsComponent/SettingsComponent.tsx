import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Radio, TextField, Typography } from "@mui/material";
import { ChangeEvent, Component, ReactNode, SyntheticEvent } from "react";
import ExpandMoreIcon  from "@mui/icons-material/ExpandMore";

export type ColorTypes = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export type SettingsProps = { walletName: string, walletColor: string, changeWalletFn: Function, clearAllRecords: Function }
type SettingsState = { walletName: string, walletColor: string, expanded: string, error: boolean, color: ColorTypes, btnClearText: string };

const MAX_CHARS = 15;
export const MIN_CHARS = 5;

class SettingsComponent extends Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps){
        super(props);
        this.state = { walletName: this.props.walletName, expanded: "panel1", error: false, color: "success", btnClearText: "Excluir Registros", walletColor: this.props.walletColor };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearAllRecords = this.clearAllRecords.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
    }

    handleSubmit(event: SyntheticEvent): void {
        event.preventDefault();
        
        if(this.state.walletName.length < MIN_CHARS){
            this.setState({color: 'error'});
            this.props.changeWalletFn();
            return;
        }

        // if(this.props.walletName !== this.state.walletName)
        this.props.changeWalletFn(this.state.walletName, this.state.walletColor);
    }

    setWalletName(name: string): void {
        if(name.length < MIN_CHARS){
            this.setState({ walletName: name, color: 'warning' });
            return;
        }

        this.setState({ walletName: name, color: 'success' });
    }

    handleChange(option: string): void {
        this.setState({ expanded: option })
    }

    clearAllRecords(): void {
        if(this.state.btnClearText !== "CONFIRMAR EXCLUSÃO"){
            this.setState({btnClearText: "CONFIRMAR EXCLUSÃO"});
            return;
        }

        this.props.clearAllRecords();
        this.setState({btnClearText: "Excluir Registro"});
    }

    handleChangeColor(event: ChangeEvent<HTMLInputElement>): void {
        this.setState({walletColor: event.target.value});
    };

    controlProps(item: string) {
        return {
            checked: this.state.walletColor === item,
            onChange: this.handleChangeColor,
            value: item,
            name: 'color-radio-button-demo',
            inputProps: { 'aria-label': item },
        }
    }

    render(): ReactNode {
        return (
            <Container>
                <Accordion expanded={this.state.expanded === "panel1"} onChange={() => this.handleChange("panel1")}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Conta</Typography>
                        <Typography sx={{ marginLeft: 2, color: 'text.secondary' }}>Atualize Informações da conta</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <h4>Alterar Dados da Conta</h4>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    id="filled-basic"
                                    label="Nome da Conta"
                                    variant="filled"
                                    value={this.state.walletName}
                                    onChange={(event) => this.setWalletName(event.target.value)}
                                    inputProps={{ maxLength: MAX_CHARS }}
                                    required={true}
                                    error={this.state.error}
                                    color={this.state.color}
                                    placeholder={`Mínimo ${MIN_CHARS} caractéres`}
                                    autoComplete="off"
                                />
                                <br />
                                <span>Restam {MAX_CHARS - this.state.walletName.length} caractéres</span>
                                <br />
                                <br />
                                <span>Cor da Conta</span>
                                <div>
                                    <Radio
                                        {...this.controlProps('#4B6F97')}
                                        sx={{
                                            color: "#4B6F97",
                                            '&.Mui-checked': {
                                                color: "#5d8bbd",
                                            },
                                        }}
                                    />
                                    <Radio
                                        {...this.controlProps('#7F4F82')}
                                        sx={{
                                            color: "#7F4F82",
                                            '&.Mui-checked': {
                                                color: "#a466a8",
                                            },
                                        }}
                                    />
                                    <Radio
                                        {...this.controlProps('#e3b718')}
                                        sx={{
                                            color: "#e3b718",
                                            '&.Mui-checked': {
                                                color: "#ffdc1a",
                                            },
                                        }}
                                    />
                                    <Radio
                                        {...this.controlProps('#262626')}
                                        sx={{
                                            color: "#262626",
                                            '&.Mui-checked': {
                                                color: "#000000",
                                            },
                                        }}
                                    />
                                </div>
                                <Button sx={{ marginTop: 1 }} variant="contained" color="primary" type="submit">Concluir</Button>
                            </form>
                        </Box>
                        <Box>
                            <h4>Excluir todos os registros</h4>
                            <Button variant="contained" color="error" onClick={this.clearAllRecords}>{this.state.btnClearText}</Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Container>
        );
    }
}

export default SettingsComponent;