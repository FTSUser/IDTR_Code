import { useAtom } from 'jotai';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { lan } from '../../Jotai/JotaiGlobal';
import '../MotorcarCourses/MotorcarCourses.scss';
export default function MotorcycleCourses() {
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // left: 0,
      // behavior: "smooth",
    });
  }, []);
    return (
        <div>
             <section className='motorcycles-coirses-banner'>
                <div className='container'>
                    <div className='courses-title'>
                        <h1>Motorcycle Courses</h1>
                    </div>
                </div>
            </section>
            <section className="road-map-alignment">
        <div className="container">
          <div className='title-text'>
            <h1>Motorcycle Courses</h1>
          </div>
          <div className="cus-timeline">
            <div class="container1">
              <div class="timeline-block timeline-block-right">
                <div class="marker"></div>
                <div class="timeline-content">
                  <NavLink to="/motorcarcourseslist">
                  <h3>Class 2B Course</h3>
                  </NavLink>
                  <p>
                    Motorcycles below 200cc
                  </p>
                </div>
              </div>

              <div class="timeline-block timeline-block-left">
                <div class="marker"></div>
                <div class="timeline-content">
                <NavLink to="/motorcarcourseslist">
                  <h3>Class 2A Course</h3>
                  </NavLink>
                  <p>
                    Motorcycles from 201cc – 400cc
                  </p>
                </div>
              </div>

              <div class="timeline-block timeline-block-right">
                <div class="marker"></div>
                <div class="timeline-content">
                <NavLink to="/motorcarcourseslist">
                  <h3>Class 2 Course</h3>
                  </NavLink>
                  <p>
                     Motorcycles exceeding 400cc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}
