import React, { useEffect, useState } from "react";
import "./HelpfulTips.scss";

import DatePicker from "../../Assets/Images/date-picker.png";
import RightArrow from "../../Assets/Images/view-more.png";
import { NavLink } from "react-router-dom";
import { ApiGet } from "../../Helpers/Api/ApiData";
import moment from 'moment';
import Left from '../../../src/Assets/Images/left.png';
import Right from '../../../src/Assets/Images/right.png';
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";

export default function HelpfulTips() {
  const [gettips, setgetAllTips] = useState({});
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const [getCount, setgetCount] = useState();
  const [page, setpage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  useEffect(() => {
    getAllTips();
  }, [page]);
  useEffect(() => {
    getAllTips();
  }, [language]);

 

  const getAllTips = () => {
    ApiGet(`helpfultips/getAllTips?page=${page}&limit=10&language=${language}`)
      .then((res) => {
        setgetAllTips(res.data.payload.Tips);
        setgetCount(res.data.payload.count)
       
      });
  };

  const next = () => {
    setpage(page + 1)
  }

  const prev = () => {
    setpage(page - 1)
  }

  return (
    <div>


      <div className="help-full-tip-title-alignment">
        <div className="container">
          <h1>{t("Helpful tips")}</h1>
        </div>
      </div>
      <section className="container">
        <div className="help-qus-grid">
          {gettips?.length > 0 && gettips?.map((data, index) => {
            return (
              <>
                <div className="grid">

                  <div className="grid-items">
                    <div className="text-grid">
                      <div className="text-grid-items">
                        <p>{data?.titleName}</p>
                      </div>
                      <div className="text-grid-items">
                        <NavLink to={`/helpfultipsdetails/${data?._id}`}>
                          <img src={RightArrow} alt="RightArrow" />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            )
          })}
        </div>


        {/* {page} */}
        <div className="flexs">
          {

            <>
              {page > 1 && <div className="buttonnext" onClick={() => prev()}>
                <img src={Right} alt="" />
              </div>}
              {page <
                getCount / 10 && <div className="buttonnext" onClick={() => next()}>
                  <img src={Left} alt="" />
                </div>}

            </>

          }
        </div>
      </section>
    </div>
  );
}
