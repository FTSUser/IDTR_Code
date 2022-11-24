import React, { useEffect, useState } from "react";
import "./Testimonials.scss";
import ProfileImage from "../../Assets/Images/profile.png";
import SqureImage from "../../Assets/Images/squre.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import moment from 'moment';
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";
export default function Testimonials() {
  const [allTestimonials, setAllTestimonials] = useState({});
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    getAllTips();
  }, []);
  useEffect(() => {
    getAllTips();
  }, [language]);

  const getAllTips = () => {
    ApiGet(`testomonial/getAllTestominial?language=${language}`).then((res) => {
      setAllTestimonials(res?.data?.payload?.Testomonial);
    });
  };
  return (
    <div>
      <section className="testimonials-title">
        <div className="container">
          <h1>{t("Testimonials")}</h1>
        </div>
      </section>
      <section className="testimonials-section-grid">
        <div className="container">
         {
           allTestimonials?.length > 0 && allTestimonials.map((data,index) => {
             return(
              <div className="grid">
              <div className="grid-items">
                <div className="profile-image">
                  <img src={data?.image} alt="ProfileImage" />
                </div>
              </div>
              <div className="grid-items">
                <div className="squre-grid">
                  <div className="squre-grid-items">
                    <img src={SqureImage} alt="SqureImage"/>
                  </div>
                  <div className="squre-grid-items">
                    <div className="border"></div>
                  </div>
                </div>
                <h1>{data?.titleName}</h1>
                <p
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
              className=""
            />
              </div>
            </div>
             )
           })
         }
         
        </div>
      </section>
    </div>
  );
}
