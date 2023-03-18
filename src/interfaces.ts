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
    color: string;

    constructor(name: string, color: string, recordList: WalletRecord[] = []){
        this.name = name;
        this.color = color;

        recordList.forEach(record => {
            record.created_at = new Date(record.created_at);
        })

        this.recordList = recordList;

        this.recordList = recordList;

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
}