export type InputLabelProps = {
    [key: string]: string
}


abstract class FormMessageService {
    public static showAlert(message: string) {
        alert(message);
    }

    public static showFormError(inputList: string[], inputName: InputLabelProps) {
        var message = "Os seguintes inputs são obrigatórios e estão vazios:\n";
        console.table(inputName);
        for(let input of inputList){
            console.warn(input);
            message += `- ${inputName[input]}\n`;
        }

        message += "Preencha os campos informados para prosseguir.";

        this.showAlert(message);
    }
}

export default FormMessageService;