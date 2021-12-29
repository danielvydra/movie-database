import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import {useTranslation} from "react-i18next";

function MovieDetail() {
    const params = useParams();
    const {t} = useTranslation()

    return (
        <div>
            <CustomAppBar/>
            <Typography>{t("movieDetail")}</Typography>
            <div>{`Movie id: ${params.movieID}`}</div>
        </div>
    );
}

export default MovieDetail;