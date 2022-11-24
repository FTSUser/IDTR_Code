import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { ApiGet } from "../../Helpers/Api/ApiData";
import "../Overview/Overview.scss";
import "./Facility.scss";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  return (
    <div className="cus-slider-arrow-design" onClick={onClick}>
      <i class="fa-solid fa-right-long"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="cus-slider-arrow-design1" onClick={onClick}>
      <i class="fa-solid fa-left-long"></i>
    </div>
  );
}

export default function Facility() {
  const [getAllFacility, setGetAllFacility] = useState({});
  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const getAllCMS = () => {
    setOnSaveLoader(true);
    ApiGet(`facility/getAllFacility?language=${language}`).then((res) => {
      setOnSaveLoader(false);

      setGetAllFacility(res.data.payload?.Facility[0]);
    });
  };
  useEffect(() => {
    getAllCMS();
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    getAllCMS();
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, [language]);
  return (
    <div>
      {onSaveLoader === true && (
        <div className="loader">
          <Loader
            type="bubble-scale"
            bgColor={"#FFFFFF"}
            title={"Honda"}
            color={"#FFFFFF"}
            size={100}
          />
        </div>
      )}
        <section className="container">
        <div className="register-page-alignment">
          <div className="breadcrumbs-alignment">
            <ul class="breadcrumb">
              <li>
                <a href="#">{t("Home")}</a>
              </li>
              <li>{t("Facility")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="overview-child-text">
        <div className="container">
          <div className='all-center-honda'>
            <div className="grid-reverse">
              <div className="facility-title">
                <h1>{getAllFacility?.title}</h1>

              </div>
              <div className='facility-new-grid'>
                <div className="facility-new-grid-items">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: getAllFacility?.description,
                    }}
                    className="center"
                  />
                </div>
                <div className="facility-new-grid-items">
                  <Slider {...settings}>
                    {
                      getAllFacility?.image?.map((data, i) => {
                        return (
                          <>
                            <div>
                              <div className='slider-fac-image' key={i}>
                                <img src={data} alt="Honda" />
                                
                              
                              </div>
                              <h2>{data.split('/')[data.split('/').length -1].split('.')[0]}</h2>
                            </div>
                          </>
                        )
                      })
                    }
                  </Slider>
                </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
