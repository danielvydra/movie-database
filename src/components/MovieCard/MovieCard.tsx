import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Tooltip} from '@mui/material';
import {IMovieInfo} from "../../models/MovieInfoModel";
import {AllRoutes} from "../../consts/AllRoutes";
import {Link} from "react-router-dom";

interface IMovieProps {
    movie: IMovieInfo
}

const MovieCard: React.FC<IMovieProps> = ({movie}) => {

    return (
        <Tooltip followCursor arrow
                 title={
                     <Typography fontSize={15}>
                         {`Click to display movie details of ${movie.title}`}
                     </Typography>
                 }
        >

            <Link to={`${AllRoutes.MovieDetails}/${movie.id}`} target={"_blank"}>
                <Card sx={{maxWidth: 345}}>
                    <CardActionArea>
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
                    </CardActionArea>
                </Card>
            </Link>
        </Tooltip>
    );
}

export default MovieCard