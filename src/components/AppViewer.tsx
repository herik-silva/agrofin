import { Component, ReactNode } from "react";
import Navigation, { NavigationStates } from "./Navigation";
import Ballance from "./Balance";

type AppViewerStates = { navigation: NavigationStates };

class AppViewer extends Component<{}, AppViewerStates> {

    constructor(props: any){
        super(props);
        this.state = {navigation: {value: "geral"} };

        this.setNavigationValue = this.setNavigationValue.bind(this);
    }

    setNavigationValue(newValue: string) {
        this.setState({navigation: {value: newValue} });
    }

    render(): ReactNode {
        return (
            <div>
                <Navigation value={this.state.navigation.value} onChangeState={this.setNavigationValue}></Navigation>
                <Ballance currentBalance={1100.40} expenses={0} income={1100.40}></Ballance>
            </div>
        );
    }
}

export default AppViewer;