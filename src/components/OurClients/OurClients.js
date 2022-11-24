import React, { useEffect, useState } from 'react'
import './OurClients.scss';
import Client1 from '../../Assets/Images/1.jpg';
import Client3 from '../../Assets/Images/3.jfif';
import Client2 from '../../Assets/Images/2.png';
import Client4 from '../../Assets/Images/4.jpg';
import Client5 from '../../Assets/Images/5.jpg';
import Client6 from '../../Assets/Images/6.jpg';
import Client8 from '../../Assets/Images/8.jpg';
import Client9 from '../../Assets/Images/9.png';
import Client10 from '../../Assets/Images/10.png';
import Client7 from '../../Assets/Images/7.jfif';
import Loader from "react-js-loader";
import { ApiGet } from '../../Helpers/Api/ApiData';
import { useAtom } from 'jotai';
import { lan } from '../Jotai/JotaiGlobal';
import { useTranslation } from 'react-i18next';

export default function OurClients() {
    const [getcontent, setgetAllContent] = useState({});
    const [onSaveLoader, setOnSaveLoader] = useState(false);
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const getAllContent = () => {
        setOnSaveLoader(true)
        ApiGet('client/getAllClient',).then((res) => {
            setOnSaveLoader(false)
            setgetAllContent(res.data.payload.Question);
        })
    }

    useEffect(() => {

        getAllContent()

    }, []);
    return (
        <div>
            {
                onSaveLoader === true && <div className="loader">
                    <Loader type="bubble-scale" bgColor={"#FFFFFF"} title={"Honda"} color={'#FFFFFF'} size={100} />
                </div>
            }
            <section className='our-clients-section-alignment'>
                <div className='container'>
                    <div className='page-title'>
                        <h1>Our Clients</h1>
                    </div>
                </div>
            </section>
            <section>
                <div className='container'>
                    <div className='clients-grid'>
                        {
                            getcontent?.length > 0 && getcontent?.map((data, key) => {
                                return (<>
                                    <div className='clients-grid-items'>
                                        <img src={data?.image} alt='Client1' />
                                    </div>
                                </>
                                )
                            })}




                    </div>
                </div>
            </section>
        </div>
    )
}
