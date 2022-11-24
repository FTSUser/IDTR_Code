import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { lan } from "../../Jotai/JotaiGlobal";
import "../MotorcarCourses/MotorcarCourses.scss";
export default function OtherCourses() {
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
      <section className="motorcycles-coirses-banner">
        <div className="container">
          <div className="courses-title">
            <h1>Other Courses</h1>
          </div>
        </div>
      </section>
      <section className="road-map-alignment">
        <div className="container">
          <div className="title-text">
            <h1>Other Courses</h1>
          </div>
          <div className="timeline-grid">
            <div className="timeline-grid-items">
              <div className="cus-timeline">
                <div class="container1">
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Basic Theory Course</h3>
                      </NavLink>
                      <p>For foreign motorist</p>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-left">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Bus Driver’s Vocational Licence Course</h3>
                      </NavLink>
                      <p>Bus Driver’s Vocational Licence Course</p>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Bus Attendant Course</h3>
                      </NavLink>
                      <p>Bus Attendant Course</p>
                    </div>
                  </div>
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Motorcar Refresher Course</h3>
                      </NavLink>
                      <p>Motorcar Refresher Course</p>
                    </div>
                  </div>
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Defensive Driving/Riding Course</h3>
                      </NavLink>
                      <p>Defensive Driving/Riding Course</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="timeline-grid-items">
              <div className="cus-timeline">
                <div class="container1">
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Motorcar Familiarization Course</h3>
                      </NavLink>
                      <p>Motorcar Familiarization Course</p>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-left">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Safe Driving Course (SDC)</h3>
                      </NavLink>
                      <p>Safe Driving Course (SDC)</p>
                    </div>
                  </div>

                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Driver Improvement Points System (DIPS)</h3>
                      </NavLink>
                      <p>Driver Improvement Points System (DIPS)</p>
                    </div>
                  </div>
                  <div class="timeline-block timeline-block-right">
                    <div class="marker"></div>
                    <div class="timeline-content">
                      <NavLink to="/motorcarcourseslist">
                        <h3>Elderly Vocational Licence Assessment</h3>
                      </NavLink>
                      <p>
                        For Vocational License (VL) holder aged 70 and above
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
