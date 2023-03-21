import {Component, SyntheticEvent, ReactNode} from "react";
import { AppTextTranslator } from "../../language";
import { settings } from "../../settings";

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import { StyledBottomNavigation, StyledBottomNavigationAction } from "../../styles";

export type NavigationStates = {value: string};
type NavigationProps = {value: string; onChangeState: Function};

class Navigation extends Component<NavigationProps> {
    
    constructor(props: any){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: SyntheticEvent, newValue: string) {
        this.props.onChangeState(newValue);
    }

    render(): ReactNode {
        const languageStringify = localStorage.getItem("language") as string;
        const language = JSON.parse(languageStringify)[settings.language] as AppTextTranslator;

        return (
            <StyledBottomNavigation sx={{ height: 45 }} value={this.props.value} onChange={this.handleChange}>
                <StyledBottomNavigationAction
                    label={language.navigation.homeText}
                    value="geral"
                    icon={<HomeIcon />}
                />
                <StyledBottomNavigationAction
                    label={language.navigation.recordsText}
                    value="details"
                    icon={<ViewListIcon />}
                    onClick={() => alert("Registros em Construção")}
                />
                <StyledBottomNavigationAction
                    label={language.navigation.settingsText}
                    value="options"
                    icon={<SettingsIcon />}
                    onClick={() => alert("Opções em Construção")}
                />
            </StyledBottomNavigation>
        );
    }
}

export default Navigation;