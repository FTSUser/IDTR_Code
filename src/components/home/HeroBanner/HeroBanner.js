import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HeroBanner.scss";
import AwesomeSlider from "react-awesome-slider";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";
import HeroBannerImage from "../../../Assets/Images/hero-banner.png";
import PictureImage from "../../../Assets/Images/Picture3.png";
import PictureSecImage from "../../../Assets/Images/Picture5.png";
import Loader from "react-js-loader";
import { ApiGet } from "../../../Helpers/Api/ApiData";
import Auth from "../../../Helpers/auth";
import moment from "moment";
import { useHistory } from "react-router-dom";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { useAtom } from "jotai";
import { lan } from "../../Jotai/JotaiGlobal";
import { useTranslation } from "react-i18next";
export default function HeroBanner() {
  const [getAllWallpaper, setgetAllWallpaper] = useState({});
  const [getcontent, setgetAllContent] = useState({});
  const [getAllAnnouncement, setgetAllAnnouncement] = useState([]);
  const history = useHistory();
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  useEffect(() => {
   
  }, [language]);
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const isAuth = Auth.isUserAuthenticated();

  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const getAllCMS = () => {
    setOnSaveLoader(true);
    ApiGet("banner/getActiveBanner").then((res) => {
      setOnSaveLoader(false);
      setgetAllWallpaper(res.data.payload.Question);
    });
  };
  const getAllContent = () => {
    setOnSaveLoader(true);
    ApiGet(`content/getAllContent?language=${language}`).then((res) => {
      setOnSaveLoader(false);
      setgetAllContent(res.data.payload.Question);
    });
  };
  const getAllAnnouncements = (i) => {
    ApiGet(`announcement/getAll?language=${language}`).then((res) => {
      setgetAllAnnouncement(res.data.payload.Question);
      // setTotalPage(res.data.payload.totalPage);
    });
  };
  const redirectTo = (id) => {
    history.push(`/moreinfo/${id}`);
  };
  const moreInformation = () => {
    history.push("/Announcement");
  };

  useEffect(() => {
    getAllCMS();
    getAllAnnouncements();
    getAllContent();
  }, []);
  useEffect(() => {
    getAllCMS();
    getAllAnnouncements();
    getAllContent();
  }, [language]);
  return (
    <div>
      {/* <div className="hero-banner-light">
        <div className="container">
          <h1>Welcome to Institute of Driving and Traffic Research (IDTR)</h1>
        </div>
      </div> */}
      <section>
        <div className="slide-design">
          {/* <div className='hero-banner'>
                        <div className='register-button-end-side'>
                            <button>
                                <NavLink to="/signin">
                                    Register Now
                                </NavLink>
                            </button>
                        </div>
                    </div> */}
          <AutoplaySlider
            bullets={false}
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={2000}
            animation="foldOutAnimation"
          >
            {getAllWallpaper?.length > 0 &&
              getAllWallpaper?.map((data, key) => {
                return (
                  <div className="">
                    <div className="slider-image">
                      <img src={data?.image} alt="HeroBannerImage" />
                      <div className="register-button-end-side">
                        <button>
                          {isAuth ? (
                            <NavLink to="/accountinformation">
                              {t("Register Now")}
                            </NavLink>
                          ) : (
                            <NavLink to="/signin">{t("Register Now")}</NavLink>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </AutoplaySlider>
        </div>
        {/* <div>
          <div className="container">
            <p className="text-center" >
              <NavLink to="/description">
                {
                  getcontent?.length > 0 && getcontent?.map((data, key) => {
                    return (
                      <div className="headr1">{data?.titleName}</div>
                    )
                  })}
              </NavLink>
            </p>
          </div>
        </div> */}
      </section>
      <section>
        <div className="container">
          {/* <div className="dummy-text-grid">
            <div className="dummy-text-grid-items mb-10">
              <NavLink to="/description">
                {
                  getcontent?.length > 0 && getcontent?.map((data, key) => {
                    return (
                      <h1>{data?.titleName}</h1>
                    )
                  })}
              </NavLink>
            </div>
            <div className="dummy-text-grid-items">
              {
                getcontent?.length > 0 && getcontent?.map((data, key) => {
                  return (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                      className=""
                    />
                  )
                })}
            </div>
          </div> */}

          {getcontent?.length > 0 &&
            getcontent?.map((data, key) => {
              return (
                <>
                  <div className="dummy-text-grid">
                    <div className="dummy-text-grid-items mb-10">
                      <NavLink to="/description">
                        <h1>{data?.titleName}</h1>
                      </NavLink>
                    </div>
                    <div className="dummy-text-grid-items mb-10">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data?.description,
                        }}
                        className=""
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </section>
      <section className="marqq-section-alignment">
        <div className="">
          <div className="grid">
            <div className="grid-items grid-items-right-curve">
              <h3>{t("ANNOUNCEMENT")}</h3>
            </div>
            <div className="grid-items">
              <marquee attribute_name="attribute_value" loop="1450">
                <div className="marquee-flex">
                  {getAllAnnouncement?.map((data, key) => (
                    <>
                      <div
                        className="marquee-box"
                        onClick={() => redirectTo(data?._id)}
                      >
                        <p>{data?.name}</p>
                        <div className="date-alignment">
                          <i class="far fa-calendar-minus"></i>
                          <span>
                            {" "}
                            {moment(data.updatedAt).format("YYYY-MM-DD ")}
                          </span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </marquee>
            </div>
            <div className="grid-items grid-items-left-curve">
              <h3
                style={{ fontSize: "21px" }}
                onClick={() => moreInformation()}
              >
                {t("More Information")}
              </h3>
            </div>
          </div>
          <div className="mobile-view-show-button">
            <div className="mobile-view-more-information">
              <button>{t("More Information")}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
