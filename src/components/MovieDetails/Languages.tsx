import {Box, Chip, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";
import {RootState} from "../../redux/actions/actionTypes";
import "./styles.scss"

export default function Languages() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getLanguages = () => {
        return details?.languages === null ?
            <Typography>No languages to display</Typography>
            :
            details?.languages.map(language => {
                return <Chip className={"chip_language"} key={uuidv4()} label={language}/>
            })
    }

    return (
        <Box>
            <Typography sx={{fontWeight: "bold"}} variant={"h4"}>{t("languages")}</Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", mt: "1.5rem"}}>
                {getLanguages()}
            </Box>
        </Box>
    )
}