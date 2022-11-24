import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ApiPost } from '../../../Helpers/Api/ApiData';
import { lan } from '../../Jotai/JotaiGlobal';
import './MotorcarCourses.scss';
export default function RepeatText(props) {
    const [onSaveLoader, setOnSaveLoader] = useState(false);
    const [courseName, setState] = useState(props.location.state.courseName);
    const [getAllCourceName, setgetAllCourceType] = useState({});
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();

    const getAllCourseType = () => {
        const data = {
            courseType: courseName?._id,
            vehicleCategory: courseName?.vcid
        }
        ApiPost('courseType/getCoursetypeByVehiclecategory', data).then((res) => {
            setgetAllCourceType(res?.data?.payload);
        })


    }
    useEffect(() => {
        if (courseName) {
            getAllCourseType()
        }
    }, [courseName])
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setState(props.location.state.courseName)
    }, [props.location.state])
    return (
        <div>
          
            <div className="tab-title">
                <h1>Classification of Class</h1>
                <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</li>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</li>
                </ul>
            </div>
            <div className="tab-title">
                <h1>Enrolment Pre-requisite</h1>
                <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply </li>
                    <li>Lorem Ipsum is simply  and typesetting</li>
                    <li>Lorem Ipsum is simply  of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</li>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been</li>
                </ul>
            </div>
            <div className="tab-title">
                <h1>Enrolment Documents (In Person)</h1>
                <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply </li>
                </ul>
            </div>
            <div className="tab-title">
                <h1>Online Enrolment</h1>
                <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply </li>
                </ul>
            </div>
            <div className="tab-title">
                <h1>Important Note</h1>
                <ul>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </li>
                    <li>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </li>
                    <li>Lorem Ipsum is simply </li>
                </ul>
            </div>
            <div className="tab-title">
                <h1>Disclosure of Personal Data</h1>
                <ul>
                    <li>Lorem Ipsum is simply dummy text of the printing and typesetting</li>
                    <li>Lorem Ipsum is simply </li>
                </ul>
            </div>
        </div>
    )
}
