import {useParams} from "react-router-dom";
import {
    Box,
    Card,
    CardMedia,
    Chip,
    CircularProgress,
    IconButton,
    LinearProgress,
    Paper, Stack, Tooltip,
    Typography
} from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {IMovieDetails} from "../../models/MovieDetailsModel";
import {createMovieDetailsStructure} from "../../webServices/utils/MovieDetailsStructure";
import {v4 as uuidv4} from 'uuid';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import "./styles.scss"
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

let dateFormat = "DD MMM YYYY"

function MovieDetails() {
    const params = useParams();
    const [details, setDetails] = useState<IMovieDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [isFavorite, setFavorite] = useState<boolean>(false)
    const {t} = useTranslation()

    useEffect(() => {
        if (!params?.movieID) return
        createMovieDetailsStructure(params.movieID).then((r) => {
            console.log("details", r)
            setDetails(r)
        })
        setLoading(false)
    }, []);

    const getLanguages = () => {
        return details?.languages === null ?
            <Typography>No languages to display</Typography>
            :
            details?.languages.map(language => {
                return <Chip key={uuidv4()} label={language}/>
            })
    }

    const getGenres = () => {
        return details?.genres === null ?
            <Typography>No genres to display</Typography>
            :
            details?.genres.map(genre => {
                return <Chip key={uuidv4()} label={genre}/>
            })
    }

    const getWriters = () => {
        return details?.writers === null ?
            <Typography>No writers to display</Typography>
            :
            details?.writers.map(writer => {
                return <Chip key={uuidv4()} label={writer}/>
            })
    }

    const getActors = () => {
        return details?.actors === null ?
            <Typography>No actors to display</Typography>
            :
            details?.actors.map(actor => {
                return <Chip key={uuidv4()} label={actor}/>
            })
    }

    const getPlot = () => {
        return <Paper className={"paper_plot"}>
            {details?.plot === null ?
                <Typography>No plot to display</Typography>
                : <>
                    <Typography variant={"h4"}>{"Description"}</Typography>
                    <Typography fontSize={"larger"}>{details?.plot}</Typography>
                </>
            }
        </Paper>
    }

    const getStarIcon = () => {
        return (
            <Tooltip arrow title={
                <Typography fontSize={15}>
                    {isFavorite ? t("removeFavoriteMovie_tooltip") : t("addFavoriteMovie_tooltip")}
                </Typography>} placement={"right"}
            >
                <IconButton className={"iconButton"} onClick={() => setFavorite((prev) => !prev)}>
                    {isFavorite ? <StarIcon fontSize={"large"}/> : <StarOutlineIcon fontSize={"large"}/>}
                </IconButton>
            </Tooltip>
        )
    }

    const getMetascore = () => {
        return <Chip className={"metascoreChip"} size={"medium"}
                     label={`${t("metascore")}: ${details?.metascore ?? "---"}`}
                     color="success" icon={<StarRateRoundedIcon/>}/>
    }

    const getInfo = () => {
        return <>
            <Typography>{details?.director}</Typography>
            <Typography>{details?.production}</Typography>
            <Typography>{details?.imdbRating}</Typography>
            <Typography>{details?.imdbVotes}</Typography>
            <Typography>{details?.boxOffice}</Typography>
            <Typography>{details?.awards}</Typography>
            <Typography>{details?.production}</Typography>
            <Typography>{details?.released?.format(dateFormat)}</Typography>
            <Typography>{details?.DVD?.format(dateFormat)}</Typography>
            <Typography>{details?.website}</Typography>
        </>
    }

    const getRatings = () => {
        return <>
            <Typography variant={"h4"}>Ratings</Typography>
            {details?.ratings == null ?
                <Typography>No ratings to display</Typography>
                :
                <Box className={"row"}>
                    {details?.ratings.map((rating) => {
                        return <Paper className={"paper_rating"} key={uuidv4()}>
                            <Box className={"row_title"}>
                                <LinearProgress className={"ratingProgressbar"} variant={"determinate"} key={uuidv4()}
                                                value={getRatingValue(rating.value)}/>
                                <Typography fontSize={30} key={uuidv4()}>{`${rating.value}`}</Typography>
                            </Box>
                            <Typography key={uuidv4()}>{`Source: ${rating.source}`}</Typography>
                        </Paper>
                    })}
                </Box>
            }
        </>
    }

    const getRatingValue = (value: string | null): number => {
        if (!value) return -1
        if (value.includes("%")) return parseInt(value.split("%")[0])
        else if (value.includes("/")) {
            let values = value.split("/")
            return 100.0 * parseInt(values[0]) / parseInt(values[1])
        } else return -1
    }

    const getSubtitle = () => {
        let str = ""
        if (details?.year) str += `${details?.year}`
        if (details?.runtime) str += ` | ${details?.runtime}`
        if (details?.country) str += ` | ${details?.country}`
        if (details?.rated) str += ` | ${details?.rated}`
        return <Typography variant={"h5"}>{str}</Typography>
    }

    const getPoster = () => {
        return <Box sx={{width: 300, height: 420}}>
            <Card sx={{width: 300}}>
                <CardMedia
                    component="img"
                    height="420"
                    image={details?.imgLink ?? undefined}
                />
            </Card>
        </Box>
    }

    const getContent = () => {
        return (
            <>
                <Box className={"row_title"}>
                    <Typography variant={"h3"}>{`${details?.title}`}</Typography>
                    {getStarIcon()}
                </Box>

                <Box className={"row_title"}>
                    {getSubtitle()}
                    {getMetascore()}
                </Box>

                <Box className={"row"}>
                    {getPoster()}
                    {getPlot()}
                </Box>

                {getLanguages()}
                {getGenres()}
                {getWriters()}
                {getActors()}
                {getInfo()}
                {getRatings()}
            </>
        )
    }

    const noContentMessage = () => {
        return <>
            <Typography variant={"h2"}>{t("noContent_info")}</Typography>
            <Typography variant={"h5"}>{t("incorrectMovieID")}</Typography>
        </>
    }

    return (
        <>
            <CustomAppBar/>

            <div >
                <div className={"innerDiv"}>
                    {loading && (
                        <Box>
                            <Typography>Loading content...</Typography>
                            <CircularProgress/>
                        </Box>
                    )}
                    {!details ? noContentMessage() : getContent()}
                </div>
            </div>

        </>
    );
}

export default MovieDetails;