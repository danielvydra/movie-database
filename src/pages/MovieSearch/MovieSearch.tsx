import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import "./styles.scss"
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from "../../components/MovieCard/MovieCard";
import React, {useState} from "react";

function MovieSearch() {
    const movieTitle = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
    }

    return (
        <>
            <CustomAppBar/>

            <Box className={"content"}>
                <Typography variant={"h3"}>Movie search</Typography>
                <Box>
                    <TextField
                        name={"title"}
                        variant={"outlined"}
                        placeholder={"Enter movie title"}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained">Search</Button>

                    <Box>
                        <MovieCard/>
                    </Box>

                    <Typography variant={"h2"}>Nothing to display</Typography>
                    <Typography variant={"h4"}>Please, search for movie</Typography>
                </Box>
            </Box>
        </>
    );
}

export default MovieSearch;