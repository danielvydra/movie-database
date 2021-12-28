import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, matchPath, useLocation} from "react-router-dom";
import {AllRoutes} from "../../consts/AllRoutes";
import "./styles.scss"
import {Tab, Tabs} from "@mui/material";

interface IPage {
    title: string,
    route: string
}

const pages: IPage[] = [
    {
        title: "Search",
        route: AllRoutes.MovieSearch
    },
    {
        title: "Favorite movies",
        route: AllRoutes.FavoriteMovies
    },
];

function useRouteMatch(patterns: readonly string[]) {
    const {pathname} = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function CustomAppBar() {
    const routeMatch = useRouteMatch(pages.map(i => i.route));
    const currentTab = routeMatch?.pattern?.path;
    console.log(currentTab)

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        Movie database app
                    </Typography>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Tabs value={currentTab}>
                                <Tab label={page.title} value={page.route} to={page.route} component={Link} className={"tabLink"}/>
                            </Tabs>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default CustomAppBar;
