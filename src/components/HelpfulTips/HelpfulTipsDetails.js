import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HelpfulTips.scss";
import Loader from "react-js-loader";
import CardImage from "../../Assets/Images/car.png";
import CardVideoImage from "../../Assets/Images/card-video.png";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";
export default function HelpfulTipsDetails(props) {
  let history = useHistory();
  const [gettips, setgetAllTips] = useState({});
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const [onSaveLoader, setOnSaveLoader] = useState(false);

  const getAllTips = () => {
    ApiGet(`helpfultips/getTipsById/${props?.match?.params?.id}`)
      .then((res) => {
        setgetAllTips(res?.data?.payload?.Tips);
     
      });
  };




  const back = () => {

    history.push("/Helpful Tips");
  };

  useEffect(() => {
    getAllTips();
  }, []);

  return (
    <div>
      <div className="help-full-tip-title-alignment">
        <div className="container">
          <h1>{t("Helpful tips")}</h1>
        </div>
      </div>


      <div>
        <section className="help-full-box">
          <div className="container">
            <div className="grid">
              <div className="grid-items">
                <h2>{gettips?.titleName}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: gettips?.description,
                  }}
                />
              </div>
              <div className="grid-items">
                <img src={gettips?.image} alt="CardImage" />
              </div>
            </div>
          </div>
        </section>
        <section className="help-full-banner">
          <div className="container">
            <iframe
              width="100%"
              height="600px"
              src={gettips?.video}
            ></iframe>
          </div>
        </section>
      </div>

      <div className="container">
        <div className="back-button-blog back-button-blog-bottom-align">
          <button onClick={back}>{t("Back")}</button>
        </div>


      </div>
    </div>
  );
}
