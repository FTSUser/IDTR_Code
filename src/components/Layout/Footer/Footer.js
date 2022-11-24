import React, { useEffect, useState } from 'react'
import './Footer.scss';
import hondu from '../../../Assets/Images/hondu.png';
import HondaLogo from '../../../Assets/Images/honda.png';
import { NavLink } from 'react-router-dom';
import { ApiGet } from '../../../Helpers/Api/ApiData';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { lan } from '../../Jotai/JotaiGlobal';

export default function Footer() {
    const [knowMoreData, setKnowMoreData] = useState({});
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const getKnowMore = async () => {
        await ApiGet(`information/getAllInformation?language=${language}`)
            .then((res) => {

                setKnowMoreData(res?.data?.payload?.Information);
            })
            .catch((err) => {

            });
    };

    useEffect(() => {
        getKnowMore();
    }, []);
    useEffect(() => {
        getKnowMore();
    }, [language]);
    return (
        <div>
            <footer>
                <div className='container'>
                    <div className='footer-grid'>
                        {/* <div className='footer-grid-items'>
                            <NavLink to="/">
                                <img src={RegisterLogo} alt='RegisterLogo' />
                            </NavLink>
                        </div> */}
                        <div className='footer-grid-items'>
                            <div className='footer-sub-grid'>
                                <div className='footer-sub-grid-items'>
                                    <p>{t("Information")}</p>
                                    <ul>
                                        {knowMoreData?.length > 0 &&
                                            knowMoreData?.map((men, key) => {
                                                if (men) {
                                                    return (

                                                        <NavLink
                                                            to={{
                                                                pathname: `/information/${men?._id}`,
                                                                state: { knowmore: men },
                                                            }}
                                                        >
                                                            {/* <NavLink to={`/${men?.name}`}> */}
                                                            <li>{men?.titleName}</li>
                                                        </NavLink>

                                                    );
                                                }
                                            })}



                                        {/* <NavLink to="/ourclients">
                                            <li>Clients</li>
                                        </NavLink> */}

                                    </ul>
                                </div>
                                <div className='footer-sub-grid-items'>
                                    <p>{t("About")}</p>
                                    <ul>
                                        <NavLink to="/aboutus">
                                            <li>{t("About Us")}</li>
                                        </NavLink>
                                        <NavLink to="/motorcarcourses">
                                            <li>{t("Courses")}</li>
                                        </NavLink>
                                        <NavLink to="/sitemap" >
                                            <li>{t("Sitemap")}</li>
                                        </NavLink>


                                        <NavLink to="/facility">
                                            <li>{t("Facility")}</li>
                                        </NavLink>
                                        {/* <NavLink to="/Helpful tips">
                                            <li>{t("Helpful tips")}</li>
                                        </NavLink>
                                        <NavLink to="/testimonials">
                                            <li>{t("Testimonials")}</li>
                                        </NavLink> */}
                                    </ul>
                                </div>
                                <div className='footer-sub-grid-items'>
                                    <p>{t("Need Help")}</p>
                                    <ul>
                                        <NavLink to="/contact-us"> <li>{t("Contact Us")}</li>   </NavLink>
                                        <NavLink to="/askedquestions">
                                            <li>{t("Frequently Asked Questions")}</li>
                                        </NavLink>
                                    </ul>
                                </div>
                                <div className='footer-sub-grid-items'>
                                <img src={hondu} alt='aa'/>
                                </div>
                            </div>
                        </div>
                        {/* <div className='footer-grid-items'>
                            <NavLink to="/">
                                <img src={HondaLogo} alt='HondaLogo' />
                            </NavLink>
                        </div> */}
                    </div>
                </div>
            </footer>
            <div className='copy-right'>
                <div className='container'>
                   
                    <p>{t("Copyright 2022, Institute of Driving and Training Research (Karnal)")}</p>
                </div>
            </div>
        </div>
    )
}
