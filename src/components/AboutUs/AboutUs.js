import React, { useEffect, useState } from 'react'
import { ApiGet } from '../../Helpers/Api/ApiData';
import Loader from "react-js-loader";

import './AboutUs.scss';
import i18next from 'i18next';
import { useAtom } from 'jotai';
import { lan } from '../Jotai/JotaiGlobal';
import { useTranslation } from 'react-i18next';
export default function AboutUs() {
    const [getAllAbout, setGetAllAbout] = useState({});
    const [getAllVision, setGetAllVision] = useState({});
    const [getAllMission, setGetAllMission] = useState({});
    const [onSaveLoader, setOnSaveLoader] = useState(false);
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();

    const getAllCMS = () => {
        setOnSaveLoader(true)
        ApiGet(`cms/getAllCMS?language=${language}`,).then((res) => {
            res.data.payload.Question.map((data) => {
                setOnSaveLoader(false)
                if (data.titleName === "About Us" ||  data.titleName === 'हमारे बारे में') {
                    setGetAllAbout(data);

                }
                if (data.titleName === "Vision" ||  data.titleName === 'नज़र') {
                    setGetAllVision(data);

                }
                if (data.titleName === "Mission" ||  data.titleName === 'मिशन') {
                    setGetAllMission(data);

                }
            })
        })
    }



    useEffect(() => {
        getAllCMS()
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, []);
    useEffect(() => {
        getAllCMS()
      
    }, [language]);
    return (

        <div>
            {
                onSaveLoader === true && <div className="loader">
                    <Loader type="bubble-scale" bgColor={"#FFFFFF"} title={"Honda"} color={'#FFFFFF'} size={100} />
                </div>
            }
            <section>
                <div className='about-us-banner'>
                    <div className='container'>
                        <div className='courses-title'>
                            <h1>{getAllAbout?.titleName}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='about-child-text-alignment'>
                <div className='container'>
                    <div className='child-text-alignment'>
                        <div className="">
                            <h2>{getAllAbout?.titleName}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: getAllAbout?.description,
                                }}
                                className=""
                            />
                        </div>
                        <div>
                            <img src={getAllAbout?.image?.length > 0 ? getAllAbout?.image : ""} alt="Honda" />
                        </div>
                    </div>

                    <div className='child-text-alignment'>
                        <div>
                            <img src={getAllVision?.image?.length > 0 ? getAllVision?.image : ""} alt="Honda" />
                        </div>
                        <div>
                            <h2>{getAllVision?.titleName}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: getAllVision?.description,
                                }}
                                className=""
                            />
                        </div>

                    </div>

                    <div className='child-text-alignment'>
                        <div>
                            <h2>{getAllMission?.titleName}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: getAllMission?.description,
                                }}
                                className=""
                            />
                        </div>
                        <div>
                            <img src={getAllMission?.image?.length > 0 ? getAllMission?.image : ""} alt="Honda" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
