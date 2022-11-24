import React, { useEffect, useRef, useState } from 'react'
import './Login.scss';
import { ToastContainer, toast } from "react-toastify";
import { ApiPostNoAuth, ApiPutNoAuth } from "../../../Helpers/Api/ApiData";
import Auth from "../../../Helpers/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { NavLink, useHistory } from "react-router-dom";
import Countdown from 'react-countdown';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { lan } from '../../Jotai/JotaiGlobal';
import imgs from '../../../Assets/Images/23.jpg'

export default function Login() {
    const history = useHistory();
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const [mobileValue, setmobileValue] = useState("");
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required("Phone Number is required"),
        otp: Yup.string().required("OTP is required"),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [otpResponse, setotpResponse] = useState(false);

    const [timer, setTimer] = useState('00:00');

    const Ref = useRef(null);

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(

                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {

        
        setTimer('00:59');

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

      
        deadline.setSeconds(deadline.getSeconds() + 59);
        return deadline;
    }

    
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }


    function sendOtp() {
        if (mobileValue === "") {
            return toast.error("Please Enter Phone Number");
        }
        else if (!mobileValue.match(/^\d{10}$/)) {
            return toast.error("Please Enter Valid Phone Number");
        }
        const data = {
            phone: mobileValue,
            isRegister: false,

        };
        if (data) {
            ApiPostNoAuth("admin/verify-phone", data)
                .then((res) => {

                    if (res?.data?.result === 0) {
                        toast.success(res.data.message, { theme: 'colored' })
                        setotpResponse(true);
                        onClickReset();
                    } else {
                        toast.error(res.data.message, { theme: "colored" });
                    }
                })
                .catch((err) => {
                    toast.error(err, { theme: "colored" });
                });
        }


    }

    function onSubmit({ phone, otp, firstName, fatherName }) {
        const data = {
            code: otp,
            phone: Number(mobileValue),
            role: "61aa0389803e260c3821ad14",
        };
        ApiPutNoAuth("admin/verify-code", data)
            .then((res) => {
                toast.success(res?.data?.message);
                if (res?.data?.result === 0) {
                    if (res?.data?.payload) {
                        Auth.setAuthToken(res.data.payload.token);
                        Auth.setUserData(res.data);
                        history.push("/accountinformation");
                    }
                }
            })
            .catch((err) => {
                toast.error(err, { theme: "colored" });
            });
    }
    return (
        <div>
            {/* <ToastContainer /> */}
            <section className='login-section-alignment'>
                <div className='container'>
                    <div className='login-grid'>
                        <div className='login-grid-items'>
                            <img src={imgs} />
                        </div>
                        <div className='login-grid-items'>
                            {
                                otpResponse ? <div>

                                    <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                                        <div className='login-title'>
                                            <h1> {t("User Login")}</h1>
                                        </div>
                                        <div className='login-form-control'>
                                            <label>{t("Mobile Number")}</label>
                                            <input type="text" placeholder={t("Enter Mobile Number")} 

                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                {...register("phone")}
                                                maxLength={10}


                                            />
                                            <div className="invalid-feedback">
                                                {errors.phone?.message}
                                            </div>
                                        </div>

                                        <div className='login-form-control'>
                                            <label>{t("OTP")}</label>
                                            <input type="text" placeholder={t("Enter OTP")}  {...register("otp")}
                                                onKeyPress={(event) => {
                                                    if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                    }
                                                }} />
                                            <div className="invalid-feedback">
                                                {errors.otp?.message}
                                            </div>
                                        </div>
                                        <div className='submit-otp'>
                                            <button type='submit'
                                            >{t("Verify OTP")}</button>
                                        </div>

                                        <div className='align'>
                                            <p>  {timer === "00:00" ? <span className='otpmsg' onClick={() => sendOtp()} >{t("Resend OTP")}</span> : <p>{t("Resend OTP in")} {timer} </p>}</p>
                                        </div>
                                    </form>
                                </div> :
                                    <div>
                                        <form className='w-100'>
                                            <div className='login-title'>
                                                <h1> {t("User Login")}</h1>
                                            </div>
                                            <div className='login-form-control'>
                                                <label>{t("Mobile Number")}</label>
                                                <input type="text" placeholder={t("Enter Mobile Number")}
                                                    onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        setmobileValue(e.target.value);
                                                    }}
                                                    maxLength={10}
                                                    value={mobileValue}
                                                />
                                            </div>
                                            {/* <div className='login-form-control'>
                                    <label>OTP</label>
                                    <input type="text" placeholder='Enter OTP'/>
                                </div> */}
                                            <div className='submit-otp'>
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    sendOtp(mobileValue);
                                                }}>{t("SEND OTP")}</button>
                                            </div>

                                        </form>
                                      
                                        <div  className="text-end ">{t("Don't have an account?")}

                                            <NavLink to='/signin'> {t("Sign up")}</NavLink> </div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
