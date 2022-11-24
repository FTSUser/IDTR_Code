import React, { useEffect, useState } from "react";
import {
  ApiGet,
  ApiDelete,
  ApiPut,
  ApiPost,
} from "../../../Helpers/Api/ApiData";
import "./StartCourse.scss";
import Icon from "../../../Assets/Images/icon.png";
import BookingIcon from "../../../Assets/Images/booking.png";
import PaymentIcon from "../../../Assets/Images/payment.png";
import CompletedIcon from "../../../Assets/Images/completed.png";
import { NavLink } from "react-router-dom";
import { ApiGatewayManagementApi } from "aws-sdk";
import { useAtom } from "jotai";
import { lan } from "../../Jotai/JotaiGlobal";
import { useTranslation } from "react-i18next";


export default function StartCourse() {
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const [filteredHelpfulTips, setFilteredHelpfulTips] = useState({});
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("language", language);
  }, [language]);
  useEffect(() => {
    getAllHelpfulTips()
  }, [])
  useEffect(() => {
    getAllHelpfulTips()
  }, [language])


  const getAllHelpfulTips = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`startCourse/getAllstartCourse?language=${language}&isActive=true`)
      .then((res) => {
        
        setIsLoaderVisible(false);
        setFilteredHelpfulTips(res?.data?.payload?.startCourse);
        setCount(res?.data?.payload?.count);
      })
      .catch((err) => {
      });
  }

  return (
    <div>
      <section className="start-course-alignment">
        <div className="container">
          <div className="page-title">
            <h1>{t("How to Start A Course")}</h1>
          </div>
          <div className="card-grid">
            {filteredHelpfulTips?.length > 0 && filteredHelpfulTips?.map((item, index) => {
              return (
                <>
                  <div className="card-grid-items">
                    <div className="icon-center-align">
                      <div className="icon-design">
                        <img src={item?.image} alt="Icon" />
                      </div>
                    </div>
                    <h2>{item?.titleName}</h2>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                      className=""
                    />
                  </div>
                </>
              )
            })}

          </div>
          <div className="course-menu-alignment">
            <button><NavLink to="/motorcarcourses">{t("Course Menu")}</NavLink></button>
          </div>
        </div>
      </section>
    </div>
  );
}
