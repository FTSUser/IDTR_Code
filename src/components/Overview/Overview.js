import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiGet } from "../../Helpers/Api/ApiData";
import { lan } from "../Jotai/JotaiGlobal";
import "./Overview.scss";
export default function Overview() {
  const [getAllOverview, setGetAllOverview] = useState({});
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const getAllCMS = () => {
    ApiGet(`cms/getAllCMS`,).then((res) => {
      res.data.payload.Question.map((data) => {
        if (data?.titleName === "Overview") {
          setGetAllOverview(data);
        }
      })
    })
  }

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
  


  }, [language]);
  return (
    <div>
      <section className="container">
        <div className="register-page-alignment">
          <div className="breadcrumbs-alignment">
            <ul class="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li>Overview</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="overview-section-alignment">
        <div className="container">
          <div className="gallery-image-grid">
            <div className="gallery-image-grid-items">
              <img src="https://imgd.aeplcdn.com/1280x720/bw/ec/39481/Honda-launches-BigWing-premium-bike-showrooms-in-India-154637.jpg?wm=0" />
            </div>
            <div className="gallery-image-grid-items">
              <img src="https://images.financialexpress.com/2021/09/Exterior.jpg" />
            </div>
            <div className="gallery-image-grid-items">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzt9A_VBD-irs_ArBCbOGbQgFiKLCsxDodoPnLR96rPEQMTIrNuXgH2KzI-vUgr3CHoXA&usqp=CAU" />
            </div>
            <div className="gallery-image-grid-items">
              <img src="https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-vjvdelm2o4jtmhrruvatiljmn1-20190422135734.Medi.jpeg" />
            </div>
          </div>
        </div>
      </section>
      <section className="overview-child-text">
        <div className="container">
          <div className="grid">
            <div className="grid-items">
              <h1>Overview</h1>
              <p>
                Lorem Ipsum is simply dummy text of
                the printing and typesetting industry.
              </p>
            </div>
            <div className="grid-items">
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
              </p>
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
              </p>
              <ul>
                <li>There are many variations of passages of Lorem Ipsum</li>
                <li>There are many variations of passages of Lorem Ipsum</li>
                <li>There are many variations of passages of Lorem Ipsum</li>
                <li>There are many variations of passages of Lorem Ipsum</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
