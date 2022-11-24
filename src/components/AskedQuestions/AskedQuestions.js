import React, { useEffect, useState } from "react";
import { ApiGet } from "../../Helpers/Api/ApiData";
import "./AskedQuestions.scss";
import Loader from "react-js-loader";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";
export default function AskedQuestions() {
  const [onSaveLoader, setOnSaveLoader] = useState(false);
  const [textShow, setTextShow] = useState([]);
  const [textShowFaq, setTextShowFaq] = useState([]);
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  // const [faqs, setfaqs] = useState([]);
  // const [textShow, setTextShow] = useState();
  const [faqCategory, setFaqCategory] = useState();
  const [categoryIdForFaq, setCategoryIdForFaq] = useState();
  const [faqs, setFaqs] = useState([]);
  const [loadind, setLoading] = useState(false);
  useEffect(() => {
    getFaqCategory();
  }, []);
  useEffect(() => {
    getFaqCategory();
  }, [language]);
  useEffect(() => {
    if (categoryIdForFaq) {
      getFaqByCategory();
    }
  }, [categoryIdForFaq]);

  const getFaqByCategory = async () => {
    setLoading(true);
    await ApiGet(
      `faqCategory/getFaqByFaqCategory?id=${categoryIdForFaq}&language=${language}`
    )
      .then((res) => {
        setFaqs(res?.data?.payload?.faqCategory);
        setTextShowFaq('6336d46a384c3f043db90e86');
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const getFaqCategory = async () => {
    await ApiGet(
      `faqCategory/getAllFAQCategory?language=${language}&isActive=true`
    )
      .then((res) => {
        setFaqCategory(res?.data?.payload?.faqCategory);
        setCategoryIdForFaq(res?.data?.payload?.faqCategory[0]?._id);
        setTextShow(res?.data?.payload?.faqCategory[0]?._id);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const handleFaqCat = (category) => {
    setCategoryIdForFaq(category?._id);
    if (textShow === category?._id) {
      setTextShow();
    } else {
      setTextShow(category?._id);
    }
  };
  // const getAllFAQS = (i) => {
  //     setOnSaveLoader(true)
  //     ApiGet(`faq/getAllFAQ`,).then((res) => {
  //         setOnSaveLoader(false)
  //         setfaqs(res.data.payload.Question);

  //     })
  // }
  const handleShow = (key) => {
    textShow === key ? setTextShow("") : setTextShow(key);
  };
  useEffect(() => {
    // getAllFAQS();
    window.scrollTo({
      top: 0,
    });
  }, []);

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
      <section className="asked-question-banner">
        <div className="container">
          <div className="page-title">
            <h1>{t("Frequently Asked Questions")}</h1>
          </div>
        </div>
      </section>

      <section className="faq-section-bottom-alignment">
        <div className="container">
          {faqCategory?.length > 0 &&
            faqCategory.map((category, item) => {
              return (
                <div className="faq-border-bottom">
                  <div className="faq-list-grid">
                    <div
                      className="faq-list-grid-items"
                      onClick={() => {
                        handleFaqCat(category);
                      }}
                    >
                      <h2>{category?.name}</h2>
                    </div>
                    <div className="faq-list-grid-items">
                      <div
                        className="icon-design"
                        onClick={() => {
                          handleFaqCat(category);
                        }}
                      >
                        <span>{textShow === category?._id ? "-" : "+"}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      textShow === category?._id ? "text-show" : "text-hidden"
                    }
                  >
                    {!loadind &&
                      faqs &&
                      faqs?.map((faq) => {
                        return (
                          <>
                            <div className="faq-border-bottom faq-border-bottom-list">
                              <div
                                className="faq-list-grid"
                                onClick={() => {
                                  if (textShowFaq === faq?._id) {
                                    setTextShowFaq();
                                  } else {
                                    setTextShowFaq(faq?._id);
                                  }
                                }}
                              >
                                <div className="faq-list-grid-items">
                                  <h3 className="faqSectionAlignmentDesign">
                                    {faq?.question}
                                  </h3>
                                </div>
                                <div className="faq-list-grid-items">
                                  <div
                                    className="icon-design"
                                    onClick={() => {
                                      if (textShowFaq === faq?._id) {
                                        setTextShowFaq();
                                      } else {
                                        setTextShowFaq(faq?._id);
                                      }
                                    }}
                                  >
                                    <span>
                                      {textShowFaq === faq?._id ? "-" : "+"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  textShowFaq === faq?._id
                                    ? "text-show"
                                    : "text-hidden"
                                }
                              >
                                <div className="faq-text-style">
                                  <p
                                    className="answer-text-design"
                                    dangerouslySetInnerHTML={{
                                      __html: faq?.answer,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
