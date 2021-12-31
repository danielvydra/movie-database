import {Avatar, Box, Card, CardMedia, Paper, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/actions/actionTypes";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";

export default function PosterAndPlot() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getPoster = () => {
        return <Box sx={{width: 300, height: 420}}>
            <Card sx={{width: 300}}>
                <CardMedia
                    component="img"
                    height="420"
                    image={details?.imgLink ?? require("../assets/image-not-found.jpg")}
                />
            </Card>
        </Box>
    }

    const getPlot = () => {
        return <Paper className={"paper_plot"}>
            {details?.plot === null ?
                <Typography>No plot to display</Typography>
                : <>
                    <Typography sx={{fontWeight: "bold", mb: "1rem"}} variant={"h4"}>{"Description"}</Typography>
                    <Typography fontSize={"larger"}>{details?.plot}</Typography>
                </>
            }
        </Paper>
    }

    return (
        <Box className={"row_plot_desc"}>
            {getPoster()}
            {getPlot()}
        </Box>
    )
}