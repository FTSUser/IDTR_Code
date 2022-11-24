import React, { useEffect, useState } from 'react'
import './Announcement.scss';
import DatePicker from '../../../Assets/Images/date-picker.png';
import EyesIcon from '../../../Assets/Images/eyes.png';
import { ApiGet } from '../../../Helpers/Api/ApiData';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { lan } from '../../Jotai/JotaiGlobal';
export default function Announcement() {
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const [textShow, setTextShow] = useState();
    const [getAllAnnouncement, setgetAllAnnouncement] = useState([]);
    const [page, setpage] = useState(1);
    const [totalPage, setTotalPage] = useState();


    const getAllAnnouncements = (i) => {
        ApiGet(`announcement/getAll?language=${language}`,).then((res) => {
            setgetAllAnnouncement(res.data.payload.Question);
            setTotalPage(res.data.payload.totalPage);
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
    useEffect(() => {
        getAllAnnouncements()
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, [language]);

    const handleShow = (key) => {
        textShow === key ? setTextShow("") : setTextShow(key)
    }
    const history = useHistory();
    const moreInformation = () => {
        history.push("/moreinfo");
        // setpage(page < totalPage ? page + 1 : totalPage);
        // if (page < totalPage) {
        //     getAllAnnouncements(page + 1)
        // }
    }
    const redirectTo = (id) => {

        history.push(`/moreinfo/${id}`);
      }
    return (
        <div>
            <section className='announcement-alignment'>
                <div className='container'>
                    <div className='page-title'>
                        <h1>{t("Announcement")}</h1>
                    </div>
                    {
                        getAllAnnouncement?.map((data, key) => (
                            <div className='grid'>
                                <div className='grid-items'>
                                    <img src={DatePicker} alt='DatePicker' />
                                    <span> {moment(data.updatedAt).format(
                                        "YYYY-MM-DD "
                                    )}</span>
                                </div>
                                <div className='grid-items'>
                                    <div className='text-grid'>
                                        <div className='text-grid-items'>
                                            <p>{data?.name}</p>
                                        </div>
                                        <div className='text-grid-items' onClick={() => redirectTo(data?._id)}>
                                            <img src={EyesIcon} alt='EyesIcon' />
                                        </div>
                                    </div>
                                    <div className={textShow === key ? "text-show-style" : "text-hidden-style"}>
                                        <div className='text-show-design'>
                                            <div className='profile-image-center-alignment'>
                                                <div className='avtar-icon-alignment'>
                                                    {/* <img src={data?.image[0]} alt='AvtarIcon' /> */}
                                                    <img src={data?.image?.length > 0 ? data?.image : ""} alt="Honda" />
                                                </div>
                                                <div>
                                                    {/* <h2>{data?.name}</h2> */}
                                                    <p
                                                        dangerouslySetInnerHTML={{
                                                            __html: data?.description,
                                                        }}
                                                        className=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                    {/* <div className='more-information-alignment'>
                        <button onClick={() => moreInformation()} >More Information</button>
                    </div> */}
                </div>
            </section>
        </div>
    )
}
