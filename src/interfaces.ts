export type RecordType = "POSITIVE" | "NEGATIVE";

export class WalletRecord {
    id: string;
    description: string;
    value: number;
    type: RecordType;
    created_at: Date;

    constructor(id: string, description: string, value: number, type: RecordType, created_at: Date = new Date()){
        this.id = id;
        this.description = description;
        this.value = value;
        this.type = type;
        this.created_at = created_at;
    }
}

export class Wallet {
    name: string;
    balance: number;
    recordList: WalletRecord[];
    removedRecordList: WalletRecord[];
    color: string;

    constructor(name: string, color: string, recordList: WalletRecord[] = [], removedRecordList: WalletRecord[] = []){
        this.name = name;
        this.color = color;

        recordList.forEach(record => {
            record.created_at = new Date(record.created_at);
        });

        removedRecordList.forEach(record => {
            record.created_at = new Date(record.created_at);
        });

        this.recordList = recordList;

        this.removedRecordList = removedRecordList;

        // Calcula o total de acordo com os registros
        this.balance = this.getTotalBalance();
    }

    getOnlyType(type: RecordType): number {
        const filteredRecords = this.recordList.filter(record => record.type === type);
        var totalValue = 0;
        filteredRecords.forEach(record => { totalValue += record.value });

        return totalValue;
    }

    getTotalBalance(): number {
        const totalOnlyPositive = this.getOnlyType("POSITIVE");
        const totalOnlyNegative = this.getOnlyType("NEGATIVE");
        
        return totalOnlyPositive - totalOnlyNegative;
    }

    addRecord(newRecord: WalletRecord): void {
        this.recordList.push(newRecord);
        if(newRecord.type === "POSITIVE"){
            this.balance += newRecord.value;
        }
        else{
            this.balance -= newRecord.value;
        }
    }

    removeRecord(id: string): {removed: boolean, record: WalletRecord | undefined} {
        const index = this.recordList.findIndex(record => record.id === id);

        if(index === -1){
            return {removed: false, record: undefined};
        }

        if(this.recordList[index].type === "POSITIVE"){
            this.balance -= this.recordList[index].value;
        }
        else{
            this.balance += this.recordList[index].value;
        }

        const recordToRemove = this.recordList[index];
        
        this.removedRecordList.push(recordToRemove);
        this.recordList.splice(index, 1);
        return {removed: true, record: recordToRemove};
    }

    updateRecord(record: WalletRecord): void {
        console.log(record);
        const recordIndex = this.recordList.findIndex(selectedRecord => selectedRecord.id === record.id);

        if(recordIndex === -1){
            console.log("INVALIDO!")
            return;
        }

        if(this.recordList[recordIndex].type === "POSITIVE"){
            this.balance -= this.recordList[recordIndex].value;
        }
        else{
            this.balance += this.recordList[recordIndex].value;
        }

        if(record.type === "POSITIVE"){
            this.balance += record.value;
        }
        else{
            this.balance -= record.value;
        }

        this.recordList[recordIndex] = record;
        console.log(this.recordList);
    }
}