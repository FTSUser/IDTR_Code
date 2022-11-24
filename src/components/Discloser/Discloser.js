import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { lan } from "../Jotai/JotaiGlobal";

export default function Discloser() {
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    return (
        <div>
            <h2>Discloser</h2>
            <button><NavLink to='/register'>Closer</NavLink></button>
        </div>
    );
}
