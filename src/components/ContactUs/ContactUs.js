import React, { useEffect } from "react";
import "./ContactUs.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ApiPost } from "../../Helpers/Api/ApiData";
import { toast } from "react-toastify";
import CallIcon from '../../../src/Assets/Images/call.png';
import WhatsappIcon from '../../../src/Assets/Images/wp.png';
import TimeIcon from '../../../src/Assets/Images/time.png';
import EmailIcon from '../../../src/Assets/Images/email.png';
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../Jotai/JotaiGlobal";

export default function ContactUs() {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            // left: 0,
            // behavior: "smooth",
        });
    }, []);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Name is required")).min(5, t("Name should be more than 5 character"))
            .max(35, "Name should be less than 35 character"),
        email: Yup.string().required(t("Email is required")).email(t("Email is invalid")).min(10, t("Email should be more than 10 character"))
            .max(25, "Email should be less than 25 character"),
        subject: Yup.string().required(t("Subject is required")),
        mobile: Yup.string().required(t("Mobile Number is required")).min(10, t("Mobile Number should be more than 10 character"))
            .max(10, t("Mobile Number should be less than 10 character")),
        // description: Yup.string().required("Description is required"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ name, email, subject, description, mobile }) {
        const data = {
            name: name,
            email: email,
            subject: subject,
            description: description,
            phone: mobile
        };
        ApiPost("contactus/addContactus", data)
            .then((res) => {
                reset()
                toast.success(res?.data?.message);

                if (res?.data?.result === 0) {

                }
            })
            .catch((err) => {
                toast.error(err, { theme: "colored" });
            });
    }
    return (
        <div>
            <section className="container">
                <div className="register-page-alignment">
                    <div className="breadcrumbs-alignment">
                        <ul class="breadcrumb">
                            <li>
                                <a href="#">{t("Home")}</a>
                            </li>
                            <li>{t("Contact Us")}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="contact-details-alignment">
                <div className="container">
                    <div className="grid">
                        <div className="grid-items">
                            <div className="map-image">

                                <iframe
                                    width="100%"
                                    height="450px"
                                    title="Locatio of property"
                                    src={`https://maps.google.com/maps?q=${29.7322253},${76.98230769999999}&output=embed`}
                                ></iframe>
                            </div>
                            <div className="icon-text-alignment">
                                <div>
                                    <img src={TimeIcon} alt="TimeIcon" />
                                </div>
                                <div>
                                    <div style={{ display: "block" }}>
                                        <span><b>{t("Operational Hours")}</b></span>
                                        <span>{t("Mon to Sat")} </span>
                                        <span>8AM to 6PM</span>
                                    </div>
                                </div>
                            </div>
                            <div className="icon-text-alignment">
                                <div>
                                    <img src={EmailIcon} alt="EmailIcon" />
                                </div>
                                <div>
                                    <span>helpdesk@idtrkarnal.com</span>
                                </div>
                            </div>
                            <div className="icon-text-alignment">
                                <div>
                                    <img src={CallIcon} alt="CallIcon" />
                                </div>
                                <div>
                                    <span>
                                        +91 9878 878 878
                                    </span>
                                </div>
                            </div>
                            <div className="icon-text-alignment">
                                <div>
                                    <img src={WhatsappIcon} alt="WhatsappIcon" />
                                </div>
                                <div>
                                    <span>
                                        +91 9878 878 878
                                    </span>
                                </div>
                            </div>
                            <div className="icon-text-alignment">
                                <div>
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <span>
                                        {t("PXGJ+98, Baldhi Part, Haryana 132001")}
                                    </span>
                                </div>
                            </div>


                        </div>
                        <div className="grid-items">

                            <div className="contact-details">
                                <form className="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="box-title">
                                        <h1>{t("Enquiry Form")}</h1>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Name")}<span>*</span></label>
                                        <input min="5" max="10" type="text" defaultValue={userInfo?.payload?.user?.firstName} placeholder={t("Name")} name="name" {...register("name")} />
                                        <div className="invalid-feedback">
                                            {errors.name?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Email")}<span>*</span></label>
                                        <input min="10" max="25" type="text" placeholder={t("Email")}   {...register("email")} name="email" />
                                        <div className="invalid-feedback">
                                            {errors.email?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Mobile Number")}<span>*</span></label>
                                        <input type="text" placeholder={t("Mobile Number")}
                                            defaultValue={userInfo?.payload?.user?.phone}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            maxLength={10}
                                            min={10}
                                            name="mobile"
                                            {...register("mobile")} />
                                        <div className="invalid-feedback">
                                            {errors.mobile?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Subject")}<span>*</span></label>
                                        <input type="text" placeholder={t("Subject")} name="subject"   {...register("subject")} />
                                        <div className="invalid-feedback">
                                            {errors.subject?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Description Field")}</label>
                                        <textarea maxLength={200} placeholder={t("Description Field")} name="description"  {...register("description")}></textarea>
                                        {/* <div className="invalid-feedback">
                                            {errors.description?.message}
                                        </div> */}
                                    </div>
                                    <div className="submit-button">
                                        <button>{t("Submit Now")}</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
