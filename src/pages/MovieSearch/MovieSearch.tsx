import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {Box, Button, InputAdornment, TextField, Typography} from "@mui/material";
import "./styles.scss"
import SearchIcon from '@mui/icons-material/Search';

function MovieSearch() {
    return (
        <>
            <CustomAppBar/>
            <Box className={"content"}>
                <Typography variant={"h3"}>Movie search</Typography>
                <Box>
                    <TextField
                        variant={"outlined"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button variant="contained">Search</Button>
                    <Typography variant={"h2"}>Nothing to display</Typography>
                    <Typography variant={"h4"}>Please, search for movie</Typography>
                </Box>
            </Box>
        </>
    );
}

export default MovieSearch;