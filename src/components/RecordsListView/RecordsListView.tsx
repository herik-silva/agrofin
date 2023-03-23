import "./custom-scroll.css"

import { Component, ReactNode } from "react";
import { WalletRecord } from "../../interfaces";
import RecordCard from "../RecordCard/RecordCard";
import { Box, Container } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { SpanM } from "../../styles";

export type RecordListViewProps = { recordList: WalletRecord[], fnRemove: Function, outputUpdate: Function };
type RecordListViewStates = { resize: boolean };

class RecordListView extends Component<RecordListViewProps, RecordListViewStates> {

    constructor(props: RecordListViewProps){
        super(props);

        this.state = { resize: false };
    }

    componentDidMount(): void {
        window.addEventListener("resize", ()=>{
            this.setState({resize: !this.state.resize});
        })
    }


    render(): ReactNode {
        return (
            <Container sx={{ background: "#5DAD5E", color: "#FFF" }}>
                <Box sx={{ display: "flex", alignItems: "center", borderBottom: "2px solid #FFF" }}>
                    <FormatListBulletedIcon sx={{ marginRight: 2 }} />
                    <SpanM>Ultimos Registros</SpanM>
                </Box>
                <Box id="resize" className="custom-scroll" sx={{minHeight: window.innerHeight - 450, maxHeight: window.innerHeight - 450, overflow: "hidden", overflowY: "scroll", padding: "0 5px "}}>
                    {this.props.recordList.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()).map((record) => (
                        <RecordCard key={record.id} record={record} fnRemove={this.props.fnRemove} outputUpdate={this.props.outputUpdate}></RecordCard>
                    ))}
                </Box>
            </Container>
        );
    }
}

export default RecordListView;