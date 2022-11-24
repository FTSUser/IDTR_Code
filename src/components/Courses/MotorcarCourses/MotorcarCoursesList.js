import React, { useEffect, useState } from "react";
import { ApiPost } from "../../../Helpers/Api/ApiData";
import "./MotorcarCourses.scss";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import Auth from '../../../Helpers/auth';

import RepeatText from "./RepeatText";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../../Jotai/JotaiGlobal";
export default function MotorcarCoursesList(props) {
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const [category, setState] = useState(props.location.state.category);


  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setState(props.location.state.category)
  }, [props.location.state])

 

  const history = useHistory();
  const back = () => {
    history.push("/motorcarcourses");
  }
  const isAuth = Auth.isUserAuthenticated();


  const navigateToCourse = (data) => {
    history.push({
      pathname: '/register',
      state: data,
      Edit:'edit'
    });
  }

  return (
    // <div>
    //   <section className="breadcrumbs-section-alignment">
    //     <div className="container">
    //       <div className="breadcrumbs-align">
    //         <span className="active">Course Name</span>
    //       </div>
    //     </div>
    //   </section>


    //   <section className="part-view-alignment">

    //     <div className="container">
    //       <h3>Course Name:{category?.courseName}</h3>
    //       <p>duration:{category?.duration}</p>
    //       <p>price:{category?.price}</p>
    //       <p>timing:{category?.timing}</p>
    //       <p>validity:{category?.validity}</p>
    //       <p>description:{category?.description}</p>
    //       <button className="btn btn-success" onClick={() => back()}>Back</button>

    //     </div>
    //   </section>
    // </div>
    <div>
      <section className='mototcard-courses-alignment'>
        <div className='container'>
          <div className='courses-title'>
            <h1>Course Name</h1>
          </div>
        </div>
      </section>
      <section className="road-map-alignment">
        <div className="container">
          <div className='title-text'>
            <div className="listheading">{category?.courseName}</div>
            <div className="listheading1">{category?.displayName}</div>
          </div>
          <div className="h2">
            <div className="listP"><span>Course Category:</span> {category?.ccid?.courseCategory}</div>
            <div className="listP"><span>Vehicle Category:</span>{category?.vcid?.vehicleCategory}</div>
            <div className="listP"><span>Course Type:</span>{category?.ctid?.courseType}</div>
            <div className="listP"><span>Enrolment Prerequisites (Documents Required):</span>{category?.documentRequired}</div>
            <div className="listP"><span>Duration:</span>{category?.duration} Days</div>
            {/* <div className="listP"><span>Timing:</span>{category?.timing} Hours</div> */}
            <div className="listP"><span>Fees:</span>{category?.price} INR</div>
            <div className="listP"><span>Mode of Payment:</span>{category?.mode}</div>
            <div className="listP"><span>Important Note:</span>
            <span
                      dangerouslySetInnerHTML={{
                        __html: category?.description,
                      }}
                      className=""
                    />
            
            </div>
            <div>
              <button className="button-end-side mr-3" onClick={() => back()}>{t("Back")}</button>
              <button className="button-end-side" onClick=
              {
                () => {
                  if(isAuth === true){
                    
                    navigateToCourse(category)
                  }else{
                    history.push("/signin")
                  }
                
                }}
                >Continue with this course</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
