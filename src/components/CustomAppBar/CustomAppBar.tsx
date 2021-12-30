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
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import {useTranslation} from "react-i18next";

interface IPage {
    title: string,
    route: string
}

function useRouteMatch(patterns: readonly string[]) {
    const {pathname} = useLocation();

    for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null
}

function CustomAppBar() {
    const {t} = useTranslation()
    const pages: IPage[] = [
        {
            title: t("searchMovies"),
            route: AllRoutes.MovieSearch
        },
        {
            title: t("favoriteMovies"),
            route: AllRoutes.FavoriteMovies
        },
    ]
    const routeMatch = useRouteMatch(pages.map(i => i.route))
    const currentTab = routeMatch?.pattern?.path

    return (
        <AppBar position="sticky" className={"navbar"}>
            <Container maxWidth="xl">
                <Toolbar className={"navbarContent"} disableGutters>
                    <Box sx={{display: "flex",alignItems:"center"}}>
                        <Typography
                            variant="h5"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            {t("appTitle")}
                        </Typography>

                        <Box >
                            <Tabs value={currentTab}>
                                {pages.map((page, i) => (
                                    <Tab key={i} label={page.title} value={page.route} to={page.route} component={Link}
                                         className={"tabLink"}/>
                                ))}
                            </Tabs>
                        </Box>
                    </Box>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <LanguageMenu/>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default CustomAppBar;
