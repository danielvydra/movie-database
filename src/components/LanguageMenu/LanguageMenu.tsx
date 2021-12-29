import {Box, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {Tooltip, Typography} from '@mui/material';
import React, {useContext, useEffect, useRef, useState} from "react";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import {useTranslation} from "react-i18next";
import Flags from 'country-flag-icons/react/3x2';
import "./styles.scss"

export default function LanguageMenu() {
    const [openedMenu, setOpenedMenu] = useState(false);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("language"));
    const anchorRef = useRef(null);
    const {t} = useTranslation();
    const languages = [
        {
            name: t("english"),
            lang: "en",
        },
        {
            name: t("slovak"),
            lang: "sk",
        },
    ];

    function languageChange(lang: string) {
        setSelectedLang(lang)
        localStorage.setItem("language", lang)
        window.location.reload()

        setOpenedMenu(false)
    }

    function getCountryFlag(lang: string, listItem = false) {
        let style = {
            width: 30,
            marginRight: listItem ? 15 : 0,
        }

        switch (lang) {
            case "en":
                return <Flags.GB style={style}/>
            case "sk":
                return <Flags.SK style={style}/>
            default:
                return <Flags.GB style={style}/>
        }
    }

    return (
        <Box>
            <Tooltip title={
                <Typography>{t("selectLanguageTooltip")}</Typography>
            } arrow placement={"right"}>
                <Button
                    ref={anchorRef}
                    startIcon={<ExpandMoreRoundedIcon/>}
                    variant={"contained"}
                    className={"menuButton"}
                    size={"medium"}
                    onClick={() => setOpenedMenu(prev => !prev)}
                >
                    {selectedLang ? getCountryFlag(selectedLang) : getCountryFlag("en")}
                </Button>
            </Tooltip>

            <Popper open={openedMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={() => setOpenedMenu(false)}>
                                <MenuList>

                                    {languages.map((language, index) => (
                                        <MenuItem key={index}
                                                  className={selectedLang === language.lang ? "menuItem" : undefined}
                                                  onClick={() => languageChange(language.lang)}>
                                            {getCountryFlag(language.lang, true)}
                                            {language.name}
                                        </MenuItem>
                                    ))}

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}