import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Loader from "react-js-loader";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { ApiGet } from '../Helpers/Api/ApiData';
import { lan } from './Jotai/JotaiGlobal';
function Description() {

    const [getcontent, setgetAllContent] = useState({});
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();

    const [onSaveLoader, setOnSaveLoader] = useState(false);

    const getAllContent = () => {
        setOnSaveLoader(true)
        ApiGet('content/getAllContent',).then((res) => {
            setOnSaveLoader(false)
            setgetAllContent(res.data.payload.Question);
        })
    }

    useEffect(() => {

        getAllContent()

    }, []);
    return (
        <>
            {
                onSaveLoader === true && <div className="loader">
                    <Loader type="bubble-scale" bgColor={"#FFFFFF"} title={"Honda"} color={'#FFFFFF'} size={100} />
                </div>
            }
            <div className="container ">
                {
                    getcontent?.length > 0 && getcontent?.map((data, key) => {
                        return (<>
                            <h2 className='headr1 align' key={key}>{data?.titleName}
                            </h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: data?.description,
                                }}
                                className=""
                            />
                        </>
                        )
                    })}
                <div className='flexs'><NavLink className="back" to='/'>{t("Back")}</NavLink></div>
            </div>
        </>
    )
}

export default Description
