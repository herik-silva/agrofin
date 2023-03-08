import { Component, ReactNode } from "react";
import { SpanM } from "../styles";

export type MonetaryValueProps = { value: number, spanSize: "P" | "M" };

class MonetaryValue extends Component<MonetaryValueProps> {
    
    constructor(props: MonetaryValueProps){
        super(props);
    }

    prepareValue(value: number): string {
        const precisionValue = value.toFixed(2);
        return precisionValue.replace(".", ",");
    }

    selectSpanSize(): ReactNode {
        if(this.props.spanSize === "P"){
            return <span>R$ {this.prepareValue(this.props.value)}</span>
        }

        return <SpanM>R$ {this.prepareValue(this.props.value)}</SpanM>
    }

    render(): ReactNode {
        return this.selectSpanSize();
    }
}

export default MonetaryValue;