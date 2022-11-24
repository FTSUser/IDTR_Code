import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { ApiGet } from '../../../Helpers/Api/ApiData';
import { lan } from '../../Jotai/JotaiGlobal';
import './MotorcarCourses.scss';
export default function MotorcarCourses() {
  const [getAllCourseCatgory, setgetAllCategory] = useState([]);
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  const getAllData = (i) => {
    ApiGet(`courseName/getAll`,).then((res) => {
      setgetAllCategory(res.data.payload.Question);

    })
  }




  useEffect(() => {
    getAllData()
   
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <section className='mototcard-courses-alignment'>
        <div className='container'>
          <div className='courses-title'>
            <h1>{t("Course Name")}</h1>
          </div>
        </div>
      </section>
      <section className="road-map-alignment">
        <div className="container">
          <div className='title-text'>
            <h1>{t("Course Name")}</h1>
          </div>
          <div className="cus-timeline">
            <div class="container1">
              {
                getAllCourseCatgory?.map((data, key) => (
                  <div key={key}>
                    <div class="timeline-block timeline-block-right">
                      <div class="marker"></div>
                      <div class="timeline-content">
                        <NavLink
                          to={{
                            pathname: `/courseCategory/${data?._id}`,
                            state: { category: data },
                          }}
                        >
                          <h3 >{data?.displayName }</h3>
                        </NavLink>
                      </div>
                     
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
