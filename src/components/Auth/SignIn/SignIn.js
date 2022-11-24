import React, { useEffect, useRef, useState } from "react";
import "./SignIn.scss";
import mainImg from "../../../Assets/Images/E-enrolPage.JPG";
import Multiselect from "multiselect-react-dropdown";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiGet, ApiPostNoAuth, ApiPutNoAuth } from "../../../Helpers/Api/ApiData";
import Auth from "../../../Helpers/auth";
import Select from 'react-select'

import * as Yup from "yup";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../../Jotai/JotaiGlobal";
function SignIn() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const validationSchema = Yup.object().shape({
        otp: Yup.string().required("OTP is required"),
        firstName: Yup.string().required("First Name is required"),
        fatherName: Yup.string().required("Father Name is required"),
        IDTRcenter: Yup.string().required("IDTR Center is required"),
        state: Yup.string().required("State is required"),

        tandc: Yup.boolean()
            .oneOf([true], "You must accept the terms and conditions")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const [mobileValue, setmobileValue] = useState("");
    const [email, setEmail] = useState("");
    const [openModel, setModalOpen] = useState(false);
    const [openModelTerms, setModalOpenTerms] = useState(false);
    const [selectValue, setSelectValue] = useState({});
    const [Friest, setFriest] = useState()
    const [termsData, setTerms] = useState()
    const [privacyData, setPrivacy] = useState()

    const [otpResponse, setotpResponse] = useState("");

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFriest(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const originCountryList = [
        { value: "Haryana", },

    ];

    const state = [{ value: "Karnal" }];

    function onSubmit({ email, otp, firstName, fatherName, state, IDTRcenter }) {
        const data = {
            email: email,
            firstName: firstName,
            fatherName: fatherName,
            code: otp,
            state: state,
            IDTRcenter: IDTRcenter,
            Registrationtype: "self",
            phone: Number(mobileValue),
            isRegister: true,
            role: "61aa0389803e260c3821ad14",
        };

        ApiPostNoAuth("admin/signup", data)
            .then((res) => {

                toast.success(res?.data?.message);

                if (res?.data?.result === 0) {
                    if (res?.data?.payload) {
                        Auth.setAuthToken(res.data.payload.token);
                        Auth.setUserData(res.data);
                        setTimeout(() => {
                            history.push("/register");
                        }, 100);
                    }
                }
            })
            .catch((err) => {
                toast.error(err, { theme: "colored" });
            });
    }
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

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the begining of the variable
            setTimer(

                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const [knowMoreData, setKnowMoreData] = useState({});
    const getKnowMore = async () => {
        await ApiGet(`information/getAllInformation?language=${language}`)
            .then((res) => {
                res.data?.payload?.Information?.map((data) => {
                  
                    if (data?.titleName) {
                      
                        if (data?.titleName == 'Terms of Services') {
                         
                            setTerms(data)
                        }
                        if (data?.titleName == 'Privacy Policy') {
                          
                            setPrivacy(data)

                        }
                    }

                })

            })
            .catch((err) => {

            });
    };

    useEffect(() => {
        getKnowMore();
    }, []);
    useEffect(() => {
        getKnowMore();
    }, [language]);

 

    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('00:59');

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 59);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    function sendOtp() {
        if (mobileValue === "" ) {
            return toast.error("Please Enter Phone Number");
        } else if (!mobileValue.match(/^\d{10}$/)) {
            return toast.error("Please Enter Valid Phone Number");
        }


        const data = {
            phone: mobileValue,
            isRegister: true,
            firstName: Friest.firstName,
            fatherName: Friest.fatherName,
            state: "Haryana",
            IDTRcenter: "Karnal",
            email:email,
            Registrationtype: "partial",
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



    return (
        <>
            <ToastContainer />
            <div className="first-banner">
                <div className="container">
                    <div className="login-grid">
                        <div className="login-grid-item">
                            <div className="login-image-relative">
                                <img src={mainImg} />
                            </div>
                            <div className="login-banner-content">
                                <div className="login-banner-upper-text">
                                    <div>
                                        <h1>{t("IDTR Login")}</h1>
                                        {/* <p>Loremdkda dnioondaidnian nadnakdnadknd</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="login-grid-item">
                            <div>
                                <div className="heading">
                                    <h1>{t("User Registration")}</h1>
                                </div>
                                <div className="form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="name-grid">
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("First Name")}<span>*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder={t("First Name")}
                                                        {...register("firstName")}
                                                        className={`form-control ${errors.firstName ? "is-invalid" : ""
                                                            }`}
                                                        onChange={(e) => handleChange(e)}
                                                        name="firstName"
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.firstName?.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("Father Name")}<span>*</span></label>
                                                    <input
                                                        type="text"
                                                        placeholder={t("Father Name")}
                                                        {...register("fatherName")}
                                                        className={`form-control ${errors.fatherName ? "is-invalid" : ""
                                                            }`}
                                                        onChange={(e) => handleChange(e)}
                                                        name="fatherName"

                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.fatherName?.message}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("Select State")}<span>*</span></label>
                                                    <select  {...register("state")}
                                                        className={`form-control ${errors.state ? "is-invalid" : ""
                                                            }`}


                                                    >
                                                        <option value="">{t("Select")}</option>
                                                        {originCountryList.map(item => { return <><option selected value={item.value}>{item.value}</option></> })}
                                                    </select>
                                                    {/* <Select
                                                        {...register("state")}
                                                        options={originCountryList.map(e => ({ label: e.name, value: e.name }))}
                                                        onChange={(e) => {
                                                            setSelectValue({ ...selectValue, state: e.value })

                                                        }}
                                                    /> */}
                                                    <div className="invalid-feedback">
                                                        {errors.state?.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("Select IDTR Center")}<span>*</span></label>
                                                    <select  {...register("IDTRcenter")}
                                                        className={`form-control ${errors.IDTRcenter ? "is-invalid" : ""
                                                            }`}
                                                    >
                                                        <option value="">{t("Select")}</option>
                                                        {state.map(item => { return <><option selected value={item.value}>{item.value}</option></> })}
                                                    </select>
                                                    {/* <Select
                                                        {...register("IDTRcenter")}
                                                        options={state.map(e => ({ label: e.name, value: e.name }))}
                                                        onChange={(e) => {
                                                            setSelectValue({ ...selectValue, idtr: e.value })

                                                        }}
                                                    /> */}
                                                    <div className="invalid-feedback">
                                                        {errors.IDTRcenter?.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label> {t("Mobile Number")}<span>*</span></label>
                                                    <div className="">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}


                                                                maxLength={10}
                                                                value={mobileValue}
                                                                placeholder={t("Mobile Number")}
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    setmobileValue(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="name-grid-items">

                                                <div className="form-group  label-none">
                                                    <label>{t("Enter Mobile No")}<span style={{ color: "#cc0001" }}>*</span></label>
                                                    <div className="">
                                                        <div
                                                            className="main-button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                sendOtp(mobileValue);
                                                            }}
                                                        >
                                                            {t("Send OTP Code")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("OTP on Email (Optional)")}</label>
                                                    <input
                                                        type="text"
                                                        placeholder={t("OTP on Email (Optional)")}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value);
                                                        }}
                                                        className={`form-control
                                                            }`}
                                                    />

                                                </div>
                                            </div>
                                            <div className="name-grid-items">
                                                <div className="form-group">
                                                    <label>{t("Enter OTP Received")}<span>*</span></label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${errors.otp ? "is-invalid" : ""
                                                            }`}
                                                        {...register("otp")}
                                                        onKeyPress={(event) => {
                                                            if (!/[0-9]/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                        placeholder={t("Enter OTP Received")}
                                                    />
                                                    <div className="invalid-feedback">
                                                        {errors.otp?.message}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="checkbox-alignment">
                                            <div>
                                                <input type="checkbox" id="tandc"
                                                    className={`form-control ${errors.tandc ? "is-invalid" : ""
                                                        }`}
                                                    {...register("tandc")}
                                                />

                                            </div>

                                            <div>
                                                <div style={{ display: "flex", alignItems: "center" }} htmlFor="tandc" >&nbsp;&nbsp;{t("Accept")}<div onClick={() => setModalOpen(true)} style={{cursor:"pointer"}}>&nbsp;{t("Privacy Policy")}</div>&nbsp;{t("and")}<div style={{cursor:"pointer"}} onClick={() => setModalOpenTerms(true)}>&nbsp;{t("Terms of Services")}</div> <div style={{ color: "#cc0001" }}>*</div></div>
                                            </div>
                                        </div>
                                        <div className="invalid-feedback">
                                            {errors.tandc?.message}
                                        </div>
                                        <div style={{ padding: "2rem 0 0 0" }}></div>

                                        {otpResponse ? (
                                            <>
                                                <button className="main-button " type="submit">
                                                    {t("Verify OTP Received")}
                                                </button>
                                                <div className='align'>
                                                    <p>  {timer === "00:00" ? <span className='otpmsg' onClick={() => sendOtp()} >{t("Resend OTP")}</span> : <p>{t("Resend OTP in")} {timer} </p>}</p>
                                                </div>
                                            </>


                                        ) : (
                                            <div
                                                className="main-button disabled "
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                }}
                                            >
                                                {t("Verify OTP Received")}
                                            </div>
                                        )}

                                    </form>
                                    <div className="text-end ">{t("Already Registered?")} <NavLink to='/login'>{t("LOGIN")}</NavLink> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                openModel ? (
                    <div className='feedback-background-blur'>
                        <div className='feedback-modal'>
                            <div className='modal-header'>
                                <h1>{t("Privacy Policy")}</h1>
                                <i onClick={() => setModalOpen(false)} class="fas fa-times"></i>
                            </div>
                            <div className='modal-body'>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: privacyData?.description,
                                    }}
                                    className=""
                                />

                            </div>
                        </div>
                    </div>
                ) : null
            }
            {
                openModelTerms ? (
                    <div className='feedback-background-blur'>
                        <div className='feedback-modal'>
                            <div className='modal-header'>
                                <h1>{t("Terms of Services")}</h1>
                                <i onClick={() => setModalOpenTerms(false)} class="fas fa-times"></i>
                            </div>
                            <div className='modal-body'>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: termsData?.description,
                                    }}
                                    className=""
                                />

                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default SignIn;
