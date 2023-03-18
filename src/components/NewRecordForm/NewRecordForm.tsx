import { Component, ReactNode, SyntheticEvent } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box, FormControl, InputAdornment, InputLabel, FilledInput } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import { RecordType, WalletRecord } from "../../interfaces";
import { StyledForm } from "../../styles";

export type NewRecordFormProps = { outputAddFn: Function };
type NewRecordFormState = { description: string, value: string, date: string, recordType: RecordType };

class NewRecordForm extends Component<NewRecordFormProps, NewRecordFormState> {
    
    constructor(props: any){
        super(props);

        this.state = { description: "", value: "", date: "", recordType: "POSITIVE" };

        this.selectRecordType = this.selectRecordType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    selectRecordType(newRecordType: RecordType) {
        this.setState({ recordType: newRecordType });
    }

    setDescription(newDescription: string): void {
        this.setState({ description: newDescription });
    }

    setValue(newValue: string): void {
        this.setState({ value: newValue });
    }

    setDate(newDate: string): void {
        this.setState({ date: newDate });
    }

    handleSubmit(event: SyntheticEvent): void {
        event.preventDefault();
        const newRecord = new WalletRecord(crypto.randomUUID(), this.state.description, parseFloat(this.state.value), this.state.recordType, new Date(this.state.date));
        
        this.props.outputAddFn(newRecord);
        document.getElementById("close")?.click();
    }

    render(): ReactNode {
        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "90%", justifyContent: "space-around", marginTop: 5, color: "#FFF"}}>
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Descrição</InputLabel>
                        <FilledInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"><DescriptionIcon/></InputAdornment>}
                            value={this.state.description}
                            onChange={(event) => this.setDescription(event.target.value)}
                            required={true}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Valor</InputLabel>
                        <FilledInput type="number"
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                            value={this.state.value}
                            onChange={(event) => this.setValue(event.target.value)}
                            required={true}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1 }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">Data</InputLabel>
                        <FilledInput type="date"
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            value={this.state.date}
                            onChange={(event) => this.setDate(event.target.value)}
                            required={true}
                        />
                    </FormControl>
                    <FormControl>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ m: 1 }}>
                            <Button color="success" sx={{ transition: ".2s ease-in all", width: this.state.recordType === "POSITIVE" ? "100%" : "50%" }} onClick={()=>{this.selectRecordType("POSITIVE")}}>Receita</Button>
                            <Button color="error" sx={{ transition: ".2s ease-in all", width: this.state.recordType === "NEGATIVE" ? "100%" : "50%" }} onClick={()=>{this.selectRecordType("NEGATIVE")}}>Despesa</Button>
                        </ButtonGroup>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" size="large" color="success" sx={{ borderRadius: 0, background: "#5DAD5E"}}>Concluir</Button>
            </StyledForm>
        );
    }
}

export default NewRecordForm;