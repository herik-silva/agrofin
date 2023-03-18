import { Component, ReactNode } from "react";
import { WalletRecord } from "../../interfaces";
import RecordCard from "../RecordCard/RecordCard";
import { Box, Container } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { SpanM } from "../../styles";

export type RecordListViewProps = { recordList: WalletRecord[] };

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
                <Box sx={{minHeight: window.innerHeight - 430, maxHeight: window.innerHeight - 430, overflow: "hidden", overflowY: "scroll"}}>
                    {this.props.recordList.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()).map((record) => (
                        <RecordCard record={record}></RecordCard>
                    ))}
                </Box>
            </Container>
        );
    }
}

export default RecordListView;