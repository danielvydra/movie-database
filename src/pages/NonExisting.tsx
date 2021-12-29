import {Box, Typography} from "@mui/material";
import CustomAppBar from "../components/CustomAppBar/CustomAppBar";

function NonExisting() {
    return (
        <Box>
            <CustomAppBar/>

            <Typography variant={"h2"}>
                Error - page not found.
            </Typography>

            <Typography variant={"h4"}>
                Given path not exists.
            </Typography>
        </Box>
    );
}

export default NonExisting;