import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ApiGet } from '../../Helpers/Api/ApiData';
import { lan } from '../Jotai/JotaiGlobal';
import './sitemap.scss';
export default function Sitemap() {
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
       
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, []);
    useEffect(() => {
        getKnowMore();
    }, []);
    useEffect(() => {
        getKnowMore();
    }, [language]);
    return (
        <div>
            <section>
                <div className='about-us-banner1'>
                    <div className='container'>
                        <div className='courses-title'>
                            <h1>{t("Sitemap")}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className='about-child-text-alignment'>
                <div className='container'>
                    <div className=' mb-0'>
                        <div className="">
                            <h2 className="headingsitemap">{t("Sitemap")}</h2>

                        </div>
                    </div>
                    <ul>
                        <li>
                            <div className='flex'>
                                <NavLink to='/'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("Home")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <NavLink to='/aboutus'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("About Us")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <NavLink to='/motorcarcourses'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("Courses")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <NavLink to='/signin'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("E-enrol")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <NavLink to='/contact-us'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("Contact Us")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <NavLink to='/login'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("LOGIN")}</div>
                                </NavLink>
                            </div>
                        </li>
                        <li>
                            <div className='flex'>
                                <div className='flex' >
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("Information")}</div>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    {knowMoreData?.length > 0 &&
                                        knowMoreData?.map((men, key) => {
                                            if (men) {
                                                return (
                                                    <div className='flex'>
                                                        <NavLink
                                                            to={{
                                                                pathname: `/information/${men?._id}`,
                                                                state: { knowmore: men },
                                                            }}
                                                        >
                                                            <i className='fa fa-angle-right'></i>
                                                            <li>{men?.titleName}</li>
                                                        </NavLink>
                                                    </div>
                                                );
                                            }
                                        })}




                                </li>

                                {/* <li>
                                    <div className='flex'>
                                        <NavLink to='/ourclients'>
                                            <i className='fa fa-angle-right'></i>
                                            <div>Clients</div>
                                        </NavLink>
                                    </div>
                                </li> */}
                            </ul>
                        </li>

                        <li>
                            <div className='flex'>
                                <div className='flex'>
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("About")} </div>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <div className='flex'>
                                        <NavLink to='/facility'>
                                            <i className='fa fa-angle-right'></i>
                                            <div>{t("Facility")}</div>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex'>
                                        <NavLink to='/Helpful tips'>
                                            <i className='fa fa-angle-right'></i>
                                            <div>{t("Helpful tips")}</div>
                                        </NavLink>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex'>
                                        <NavLink to='/testimonials'>
                                            <i className='fa fa-angle-right'></i>
                                            <div>{t("Testimonials")}</div>
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <div className='flex'>
                                <div className='flex' >
                                    <i className='fa fa-angle-right'></i>
                                    <div>{t("Need Help")}</div>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <div className='flex'>
                                        <NavLink to="/askedquestions">
                                            <i className='fa fa-angle-right'></i>
                                            <div>{t("Frequently Asked Questions")}</div>
                                        </NavLink>
                                    </div>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </section>
        </div>
    )
}
