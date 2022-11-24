import React, { useEffect, useState } from 'react'
import { ApiGet } from '../../Helpers/Api/ApiData';
import './Terms.scss';
import Loader from "react-js-loader";
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { lan } from '../Jotai/JotaiGlobal';

export default function TermsofService(props) {

   const [onSaveLoader, setOnSaveLoader] = useState(false);
   const [knowmore, setState] = useState('');
   const [language, setLanguage] = useAtom(lan);
   const { t, i18n } = useTranslation();
   useEffect(() => {
      getAllInformatin()
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth",
      });

   }, [props.location.state])
   useEffect(() => {
      getAllInformatin()
     

   }, [language])


   const getAllInformatin = () => {
      setOnSaveLoader(true)
      ApiGet(`information/getInformationById/${props?.match?.params?.id}?language=${language}`,).then((res) => {

         setOnSaveLoader(false)

         setState(res?.data?.payload?.Information)
      })
   }


   return (
      <div>
         {
            onSaveLoader === true && <div className="loader">
               <Loader type="bubble-scale" bgColor={"#FFFFFF"} title={"Honda"} color={'#FFFFFF'} size={100} />
            </div>
         }
         <section className="container">
            <div className="register-page-alignment">
               <div className="breadcrumbs-alignment">
                  <ul class="breadcrumb">
                     <li>
                        <a href="#">{t("Home")}</a>
                     </li>
                     <li>{knowmore?.titleName}</li>
                  </ul>
               </div>
            </div>
         </section>
         <section className="page-layout-alignment">
            <div className="container">
               <div className="grid">
                  <div className="grid-items"></div>
                  <div className="grid-items">
                     <div className="page-title">
                        <h1>{knowmore?.titleName}</h1>
                     </div>
                     <div className="child-text-alignment">

                        <p
                           dangerouslySetInnerHTML={{
                              __html: knowmore?.description,
                           }}
                           className=""
                        />

                     </div>
                  </div>
               </div>

            </div>
         </section>
      </div>
   )
}
