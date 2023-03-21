import "./custom-scroll.css"

import { Component, ReactNode } from "react";
import { WalletRecord } from "../../interfaces";
import RecordCard from "../RecordCard/RecordCard";
import { Box, Container } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { SpanM } from "../../styles";

export type RecordListViewProps = { recordList: WalletRecord[], fnRemove: Function };

class RecordListView extends Component<RecordListViewProps> {

    constructor(props: RecordListViewProps){
        super(props);
    }


    render(): ReactNode {
        return (
            <Container sx={{ background: "#5DAD5E", color: "#FFF" }}>
                <Box sx={{ display: "flex", alignItems: "center", borderBottom: "2px solid #FFF" }}>
                    <FormatListBulletedIcon sx={{ marginRight: 2 }} />
                    <SpanM>Ultimos Registros</SpanM>
                </Box>
                <Box className="custom-scroll" sx={{minHeight: window.innerHeight - 450, maxHeight: window.innerHeight - 450, overflow: "hidden", overflowY: "scroll", padding: "0 5px "}}>
                    {this.props.recordList.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()).map((record) => (
                        <RecordCard key={record.id} record={record} fnRemove={this.props.fnRemove}></RecordCard>
                    ))}
                </Box>
            </Container>
        );
    }
}

export default RecordListView;