import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";

function FavoriteMovies() {
    const {t} = useTranslation()

    return (
        <div>
            <CustomAppBar/>

            <Box className={"content"}>
                <Box>
                    <Typography variant={"h3"}>{t("favoriteMovies")}</Typography>
                </Box>
            </Box>
        </div>
    );
}

export default FavoriteMovies;