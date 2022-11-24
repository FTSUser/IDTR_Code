import React, { useEffect, useState } from 'react'
import { ApiGet } from '../Helpers/Api/ApiData';
import '../components/home/Announcement/Announcement.scss';
import DatePicker from '../Assets/Images/date-picker.png';
import EyesIcon from '../Assets/Images/eyes.png';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { lan } from './Jotai/JotaiGlobal';
function MoreInfo(props) {
    const [textShow, setTextShow] = useState();
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const [getAllAnnouncement, setgetAllAnnouncement] = useState([]);
    const getAllAnnouncements = (i) => {
        ApiGet(`announcement/getAnnouncement/${props.match.params.id}`,).then((res) => {
            setgetAllAnnouncement(res.data.payload.Property);
            // setTotalPage(res.data.payload.totalPage);
        })
    }
    useEffect(() => {
        getAllAnnouncements()
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, []);
    const handleShow = (key) => {
        textShow === key ? setTextShow("") : setTextShow(key)
    }
    const history = useHistory();
    const back = () => {
        history.push("/Announcement");

    }
    return (
        <>
            <section className='announcement-alignment about-data'>
                <div className='container  '>
                    <div className='page-title'>
                        <h1>{t("ANNOUNCEMENT")}</h1>
                    </div>
                    <div className='child-text-alignment' >
                        <h2>{getAllAnnouncement?.name}</h2>
                        <div className="name"></div>
                        <img src={getAllAnnouncement?.image} alt="" />

                        <p
                            dangerouslySetInnerHTML={{
                                __html: getAllAnnouncement?.description,
                            }}
                            className=""
                        />
                    </div>


                    <div className='more-information-alignment flexs'>
                        <button className='back ' onClick={() => back()} >{t("Back")}</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MoreInfo
