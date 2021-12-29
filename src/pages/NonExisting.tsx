import {Box, Typography} from "@mui/material";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import {useTranslation} from "react-i18next";

function NonExisting() {
    const {t} = useTranslation()

    return (
        <Box>
            <CustomAppBar/>

            <Typography variant={"h2"}>
                {t("pageNotFound_title")}
            </Typography>

            <Typography variant={"h4"}>
                {t("pageNotFound_subtitle")}
            </Typography>
        </Box>
    );
}

export default NonExisting;