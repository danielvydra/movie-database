import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";

function MovieDetail() {
    const a = useParams();

    return (
        <div>
            <CustomAppBar/>
            <Typography>Movie detail</Typography>
            <div>{`Movie id: ${a.movieID}`}</div>
        </div>
    );
}

export default MovieDetail;