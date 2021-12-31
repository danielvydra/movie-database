import {Avatar, Box, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/actions/actionTypes";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";

const avatarSize = 65

export default function People() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getCards = (role: string, names: string[] | null) => {
        if (!names) return null

        return (
            names.map(name => (
                <Box key={uuidv4()} sx={{display: "flex", flexWrap: "wrap", mr: "2rem", mb: "2rem"}}>
                    <Avatar sx={{width: avatarSize, height: avatarSize}}/>
                    <Box sx={{alignSelf: "center", ml: "0.5rem"}}>
                        <Typography sx={{fontWeight: "bold"}}>{name}</Typography>
                        <Typography>{role}</Typography>
                    </Box>
                </Box>
            ))
        )
    }

    return (
        details?.actors === null ?
            <Typography>No actors to display</Typography>
            :
            <Box sx={{mt: "2rem"}}>
                <Typography sx={{fontWeight: "bold"}} variant={"h4"}>{t("people")}</Typography>
                <Box sx={{display: "flex", flexWrap: "wrap", mt: "1.5rem"}}>
                    {getCards(t("director"), details?.director)}
                    {getCards(t("writer"), details?.writers)}
                    {getCards(t("actor"), details?.actors)}
                </Box>
            </Box>
    )
}