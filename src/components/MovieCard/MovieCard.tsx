import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Tooltip} from '@mui/material';
import {IMovieInfo} from "../../models/MovieInfoModel";
import {AllRoutes} from "../../consts/AllRoutes";
import {Link} from "react-router-dom";
import "./styles.scss"
import {useTranslation} from "react-i18next";

interface IMovieProps {
    movie: IMovieInfo
}

const MovieCard: React.FC<IMovieProps> = ({movie}) => {
    const {t} = useTranslation()

    return (
        <Tooltip followCursor arrow
                 title={
                     <Typography fontSize={15}>
                         {t("movieCard_tooltip", {title: movie.title})}
                     </Typography>
                 }
        >
            <Link className={"cardLink"} to={`${AllRoutes.MovieDetails}/${movie.id}`} target={"_blank"}>
                <Card className={"card"} sx={{width: 340}}>
                    <CardMedia
                        component="img"
                        height="500"
                        image={movie.imgLink}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {`${movie.title} (${movie.year})`}
                        </Typography>
                        {/*<Typography variant="body2" color="text.secondary">*/}
                        {/*    {`Year: ${movie.year}`}*/}
                        {/*</Typography>*/}
                    </CardContent>
                </Card>
            </Link>
        </Tooltip>
    );
}

export default MovieCard