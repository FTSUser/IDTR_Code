import React, { useEffect, useState, useRef } from 'react'
import './Header.scss';
import RegisterLogo from '../../../Assets/Images/register.png';
import HondaLogo from '../../../Assets/Images/honda.png';
import HondaNewLogo from '../../../Assets/Images/honda.png';
import SearchIcon from '../../../Assets/Images/search-icon.svg';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
// import Auth from '../../../Helpers/auth';
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ApiGet, ApiPost } from "../../../Helpers/Api/ApiData";
import Auth from '../../../Helpers/auth';
import ReactStars from "react-rating-stars-component";
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { lan } from '../../Jotai/JotaiGlobal';

export default function Header() {
    const history = useHistory()
    const menuRef = useRef()
    const courseRef = useRef()
    const [language, setLanguage] = useAtom(lan);
    const { t, i18n } = useTranslation();
    const [isLogin, setIsLogin] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    const [subMenu, setSubMenu] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [courseMenu, setCourseMenu] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [textHidden, setTextHidden] = useState(false)
    const [textHidden1, setTextHidden1] = useState(false)
    const location = useLocation();
    const [locationData, setlocation] = useState();
    const [knowMoreData, setKnowMoreData] = useState({});
    const [startData, setStarData] = useState();
    const [inputValueForAdd, setInputValueForAdd] = useState();
    const isAuth = Auth.isUserAuthenticated();
    const HandleLogOut = () => {
        const data = {
            uid: userInfo?.payload?.user?._id,
            lastPage: history.location.pathname,
            type: "logout"
        }
        ApiPost("admin/logout", data)
            .then((res) => {
                if (res?.data?.result === 0) {
                    toast.success("User Signout", {
                        theme: "colored",
                    });
                    Auth.deauthenticateUser();
                    setIsLogin(false);
                    history.push('/')
                }
            })
            .catch((err) => {
                toast.error(err, { theme: "colored" });
            });
    };

    useEffect(() => {
        if (performance.navigation.type === 1) {
            if (userInfo) {
                const data = {
                    uid: userInfo?.payload?.user?._id,
                    lastPage: window.location.pathname,

                }
                ApiPost("admin/add-pre-post-login", data)
                    .then((res) => {
                    })
                    .catch((err) => {
                        // toast.error(err, { theme: "colored" });
                    });
            } else {
                const data = {
                    lastPage: window.location.pathname,

                }
                ApiPost("admin/add-pre-post-login", data)
                    .then((res) => {
                    })
                    .catch((err) => {
                        // toast.error(err, { theme: "colored" });
                    });

            }
        } else {
            console.log("This page is not reloaded");
        }
    });
    const getKnowMore = async () => {
        await ApiGet(`information/getAllInformation?language=${language}`)
            .then((res) => {

                setKnowMoreData(res?.data?.payload?.Information);
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
    const setChageCategory = (e) => {
        const { name, value } = e.target;
        setInputValueForAdd({ ...inputValueForAdd, [name]: value });
        //   setErrorsForAdd({ ...errorsForAdd, [name]: "" });
    };

    // useEffect(() => {
    //     if (localStorage.getItem("userData") && localStorage.getItem("token")) {
    //         setIsLogin(true);
    //     } else {
    //         setIsLogin(false);
    //     }
    // }, [isLogin]);

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (subMenu) {
                if (
                    subMenu &&
                    menuRef.current &&
                    !menuRef.current.contains(e.target)
                ) {
                    setSubMenu(false);
                }
            } else if (courseMenu) {
                if (
                    courseMenu &&
                    courseRef.current &&
                    !courseRef.current.contains(e.target)
                ) {
                    setCourseMenu(false);
                }
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [subMenu, courseMenu]);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t("Name is required")).min(5, t("Name should be more than 5 character"))
            .max(35, t("Name should be less than 35 character")),

        mobile: Yup.string().required(t("Mobile Number is required")).min(10, t("Mobile Number should be more than 10 character"))
            .max(10, t("Mobile Number should be less than 10 character")),
        feedbackCategory: Yup.string().required(t("Feedback Category is required")),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [rat, setRat] = useState(false);
    function onSubmit({ name, email, feedbackCategory, description, mobile }) {
        const data = {
            name: name,
            email: email,
            phone: mobile,
            feedbackCategory: feedbackCategory,
            subCategory: inputValueForAdd?.subfeedbackCategory,
            rating: startData,
            description: description
        };
    

        if (startData === undefined) {
            setRat(true);
        }
        else {
            ApiPost("feedback/addFeedback", data)
                .then((res) => {

                    toast.success(res?.data?.message);
                    reset()
                    setInputValueForAdd({})
                    setModalOpen(false)
                    if (res?.data?.result === 0) {

                    }
                })
                .catch((err) => {
                    toast.error(err, { theme: "colored" });
                });
        }


    }
    const ratingChanged = (newRating) => {
        setRat(false);
        setStarData(newRating)

    };

  
  

    const handleLangChange = evt => {
        const lang = evt.target.value;
      

        setLanguage(lang);
        i18n.changeLanguage(lang);
    };
    
    return (
        <div>
            <ToastContainer />


            <div className='sub-header-show'>
                <div className="sub-header-grid">
                    <div className="sub-header-grid-items"></div>
                    <div className="sub-header-grid-items left-side-curve">
                        <div className='sub-header-left-right-alignment'>
                            <div className='all-skew-alignment'>
                                <div className='message-align-sub-header'>
                                    <i class="fas fa-envelope"></i>

                                    <span>helpdesk@idtrkarnal.com</span>
                                </div>
                                <div className='message-align-sub-header'>
                                    <i class="fas fa-phone-alt" style={{transform:"rotate(110deg)"}}></i>
                                    <span>+91 9878 878 878</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='new-header'>
                <div className='new-header-grid-items'>
                    <div className='sub-header'>
                        <div className='grid'>
                            <div className='grid-items'>
                                <NavLink to="/">
                                    <img src={RegisterLogo} alt='RegisterLogo' />
                                </NavLink>
                            </div>
                            <div className='grid-items'>
                                <div className='honda-logo-titla-img-alignment'>

                                    <p>{t("Institute of Driving Training & Research")}</p>
                                    {/* <p>Institute of Driving Training & Research</p> */}
                                    <span>{t("A joint venture of Transport Department, Government of Haryana & Honda")}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='new-header-grid-items'>
                    <img src={HondaNewLogo} alt="HondaNewLogo" />
                </div>
                {/* <div className='sub-header'>
                    <div className='grid'>
                        <div className='grid-items'>
                            <NavLink to="/">
                                <img src={RegisterLogo} alt='RegisterLogo' />
                            </NavLink>
                        </div>
                        <div className='grid-items'>
                            <div>
                                <p>Institute of Driving and Training Research (IDTR)</p>
                                <span>A joint venture of Transport Department, Government of Haryana & Honda IDTR</span>
                            </div>
                        </div>
                        <div className='grid-items'>
                        <div className='header-alignment'>
                            <div className='header-menu'>
                                <nav>
                                    <ul>
                                        <NavLink to="/">

                                            <li className={locationData === '/' ? 'active' : ''}>Home</li>
                                        </NavLink>
                                        <NavLink to="/aboutus">
                                            <li>About Us</li>
                                        </NavLink>
                                        <li >
                                            <span onClick={() => setCourseMenu(!courseMenu)} ref={courseRef}>Courses</span>
                                            <div className={courseMenu ? 'about-us-sub-menu about-us-show' : 'about-us-sub-menu about-us-hidden'}>
                                                <div className='sub-menu-design'>
                                                    <div>
                                                        <NavLink to="/motorcarcourses">
                                                            <span>Motorcar Courses</span>
                                                        </NavLink>
                                                    </div>
                                                    <div>
                                                        <NavLink to="/motorcyclecourses">
                                                            <span> Motorcycle Courses</span>
                                                        </NavLink>
                                                    </div>
                                                    <div>
                                                        <NavLink to="/othercourses">
                                                            <span>Other Courses</span>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>


                                        {
                                            isAuth === true ? (
                                                <li> <NavLink to="/accountinformation">My Account</NavLink></li>
                                            ) : (
                                                <li>      <NavLink to="/signin">E-enrol</NavLink></li>

                                            )

                                        }

                                        <NavLink to="/contact-us">
                                            <li>Contact Us</li>
                                        </NavLink>
                                    </ul>
                                </nav>
                              
                            </div>
                            <div className='mobile-view-menu' onClick={() => setMobileMenu(!mobileMenu)}>
                                <i class="fas fa-bars"></i>
                            </div>
                            <div className='login-button'>
                                {
                                    isAuth == false ?
                                        <>

                                        </>
                                        :
                                        <>
                                            <div onClick={() => setModalOpen(!modalOpen)}>
                                                <span>Feedback</span>
                                            </div>
                                        </>
                                }

                                {
                                    isAuth == false ? (
                                        <button><NavLink to="/login">
                                            LOGIN
                                        </NavLink></button>
                                    ) : (
                                        <button onClick={HandleLogOut}>
                                            SIGN OUT
                                        </button>

                                    )

                                }

                            </div>
                        </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className='header-light-menu'>
                <div className='container'>
                    <div className='new-h-alignment'>
                        <div>
                            <div className='header-alignment'>
                                <div className='header-menu'>
                                    <nav>
                                        <ul>
                                            <select onChange={handleLangChange} value={language} style={{position:"absolute",top:"12px",right:"15px"}} >
                                                <option value="Hindi">Hindi</option>
                                                <option value="English">English</option>

                                            </select>
                                          
                                            <NavLink to="/" exact>
                                                <li>{t("Home")}</li>
                                            </NavLink>
                                                {/* <li onClick={()=>history.push('/')}>{t("Home")}</li> */}
                                                {/* <li>{t("Home")}</li> */}
                                           
                                            <div className='new-phase-dropdown'>
                                                <NavLink to="/aboutus">
                                                    <li>{t("About Us")}</li>
                                                </NavLink>
                                                <div className='new-phase-dropdown-design'>
                                                    <div className='border-style'>

                                                        <div className='three-col-alignment'>
                                                            <div className='three-col-grid'>
                                                                <div className='three-col-grid-items'>
                                                                    <h6>{t("About")}</h6>
                                                                    <NavLink to="/aboutus">
                                                                        <span>{t("About Us")}</span>
                                                                    </NavLink>
                                                                    <NavLink to="/motorcarcourses">
                                                                        <span>{t("Courses")}</span>
                                                                    </NavLink>
                                                                    <NavLink to="/sitemap" >
                                                                        <span>{t("Sitemap")}</span>
                                                                    </NavLink>


                                                                    <NavLink to="/facility">
                                                                        <span>{t("Facility")}</span>
                                                                    </NavLink>
                                                                    {/* <NavLink to="/Helpful tips">
                                                                        <li>{t("Helpful tips")}</li>
                                                                    </NavLink>
                                                                    <NavLink to="/testimonials">
                                                                        <li>{t("Testimonials")}</li>
                                                                    </NavLink> */}
                                                                </div>
                                                                <div className='three-col-grid-items'>
                                                                    <h6>{t("Need Help")}</h6>
                                                                    <NavLink to="/contact-us">
                                                                        <span>{t("Contact Us")}</span>
                                                                    </NavLink>
                                                                    <NavLink to="/askedquestions">
                                                                        <span>{t("Frequently Asked Questions")}</span>
                                                                    </NavLink>

                                                                </div>
                                                                <div className='three-col-grid-items'>
                                                                    <h6>{t("Information")}</h6>
                                                                    {/* <NavLink to='/information/61e92c7b7df86331041da6e4'>
                                                                        <li>{t("Privacy Policy")}</li>
                                                                    </NavLink>
                                                                    <NavLink to='/information/61e92c7b7df86331041da6e4'>
                                                                        <li>{t("Terms of Services")}</li>
                                                                    </NavLink> */}
                                                                     {knowMoreData?.length > 0 &&
                                            knowMoreData?.map((men, key) => {
                                                if (men) {
                                                    return (

                                                        <NavLink
                                                            to={{
                                                                pathname: `/information/${men?._id}`,
                                                                state: { knowmore: men },
                                                            }}
                                                        >
                                                            {/* <NavLink to={`/${men?.name}`}> */}
                                                            <span>{men?.titleName}</span>
                                                        </NavLink>

                                                    );
                                                }
                                            })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <NavLink to="/motorcarcourses">
                                                <li>{t("Courses")}</li>
                                            </NavLink>
                                            {/* <div className='new-phase-dropdown'>
                                                <NavLink to="/motorcarcourses">
                                                    <li>{t("Information")}</li>
                                                </NavLink>

                                            </div> */}


                                            {
                                                isAuth === true ? (
                                                    <NavLink to="/accountinformation"> <li>{t("My Account")}</li></NavLink>
                                                ) : (
                                                     <NavLink to="/signin"> <li>{t("E-enrol")}</li></NavLink>

                                                )

                                            }

                                            <NavLink to="/contact-us">
                                                <li>{t("Contact Us")}</li>
                                            </NavLink>
                                            {
                                                isAuth == false ?
                                                    <>

                                                    </>
                                                    :
                                                    <>
                                                        <div onClick={() => setModalOpen(!modalOpen)}>
                                                            <li>{t("Feedback")}</li>
                                                        </div>
                                                    </>
                                            }

                                        </ul>
                                    </nav>
                                    {/* <div className='search-style'>
                                    <input type="text" placeholder='Search' />
                                    <div className='search-icon-alignment'>
                                        <img src={SearchIcon} alt='SearchIcon' />
                                    </div>
                                </div> */}
                                </div>

                            </div>
                        </div>
                        <div className='h-align'>
                            <div className='mobile-view-menu' onClick={() => setMobileMenu(!mobileMenu)}>
                                <i class="fas fa-bars"></i>
                            </div>
                            <div className='login-button'>
                                {
                                    isAuth == false ?
                                        <>

                                        </>
                                        :
                                        <>
                                            {/* <div onClick={() => setModalOpen(!modalOpen)}>
                                            <span>Feedback</span>
                                        </div> */}
                                        </>
                                }

                                {
                                    isAuth == false ? (
                                        <button><NavLink to="/login">
                                            {t("LOGIN")}
                                        </NavLink></button>
                                    ) : (
                                        <button onClick={HandleLogOut}>
                                            {t("SIGN OUT")}
                                        </button>

                                    )

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                modalOpen && (
                    <div className='feedback-background-blur'>
                        <div className='feedback-modal'>
                            <div className='modal-header'>
                                <h1>{t("Feedback Form")}</h1>
                                <i onClick={() => setModalOpen(false)} class="fas fa-times"></i>
                            </div>
                            <div className='modal-body'>
                                <form className="" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="contact-form-control">
                                        <label>{t("Name")}<span>*</span></label>
                                        <input type="text"
                                            defaultValue={userInfo.payload.user?.firstName}
                                            placeholder={t("Name")} min="5" max="10" name="name" {...register("name")} />
                                        <div className="invalid-feedback">
                                            {errors.name?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Email")}<span></span></label>
                                        <input type="text"
                                            defaultValue={userInfo.payload.user?.email}
                                            min="10" max="25" placeholder={t("Email")}  {...register("email")} name="email" />
                                        <div className="invalid-feedback">
                                            {errors.email?.message}
                                        </div>
                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Mobile Number")}<span>*</span></label>
                                        <input type="text"
                                            defaultValue={userInfo.payload.user?.phone}
                                            placeholder={t("Mobile Number")} onKeyPress={(event) => {
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
                                        <label>{t("Feedback Category")}<span>*</span></label>

                                        <select name="feedbackCategory"   {...register("feedbackCategory")} onChange={(e) => setChageCategory(e)}>
                                            <option value="">{t("Select FeedBack Category")}</option>
                                            <option value="Course">{t("Course")}</option>
                                            <option value="Personnel">{t("Personnel")}</option>
                                            <option value="Facility">{t("Facility")}</option>
                                            <option value="Overall Experience">{t("Overall Experience")}</option>
                                        </select>
                                        <div className="invalid-feedback">
                                            {errors.feedbackCategory?.message}
                                        </div>
                                    </div>
                                    {
                                        inputValueForAdd?.feedbackCategory === 'Course' &&
                                        <div className="contact-form-control">
                                            <label>Sub Category<span>*</span></label>
                                            <select name="subfeedbackCategory" onChange={(e) => setChageCategory(e)} >
                                                <option value="">Select Sub Category</option>
                                                <option value="Option for courses registred">Option for courses registred</option>

                                            </select>
                                            {/* <div className="invalid-feedback">
                                                {errors.subfeedbackCategory?.message}
                                            </div> */}
                                        </div>
                                    }
                                    {
                                        inputValueForAdd?.feedbackCategory === 'Personnel' &&
                                        <div className="contact-form-control">
                                            <label>Sub Category<span>*</span></label>
                                            <select name="subfeedbackCategory" onChange={(e) => setChageCategory(e)}>
                                                <option value="">Select Sub Category</option>
                                                <option value="Option for Examiner">Option for Examiner</option>
                                                <option value="Trainer">Trainer</option>
                                                <option value="Driving Instructor">Driving Instructor</option>
                                                <option value="Other Employees">Other Employees</option>

                                            </select>
                                            {/* <div className="invalid-feedback">
                                                {errors.subfeedbackCategory?.message}
                                            </div> */}
                                        </div>
                                    }
                                    {
                                        inputValueForAdd?.feedbackCategory === 'Facility' &&
                                        <div className="contact-form-control">
                                            <label>Sub Category<span>*</span></label>
                                            <select name="subfeedbackCategory" onChange={(e) => setChageCategory(e)} >
                                                <option value="">Select Sub Category</option>
                                                <option value="Classroom">Classroom</option>
                                                <option value="Driving">Driving</option>
                                                <option value="Track">Track</option>
                                                <option value="Canteen">Canteen</option>
                                                <option value="Simulators">Simulators</option>
                                            </select>
                                            {/* <div className="invalid-feedback">
                                                {errors.subfeedbackCategory?.message}
                                            </div> */}
                                        </div>
                                    }
                                    {/* {
                                        inputValueForAdd?.feedbackCategory === 'Overall Experience' &&
                                        <div className="contact-form-control">
                                            <label>Sub Category<span>*</span></label>
                                            <select name="subfeedbackCategory"  onChange={(e) => setChageCategory(e)} >
                                                <option value="">Select Sub Category</option>
                                                <option value="No Sub Category">No Sub Category</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                {errors.subfeedbackCategory?.message}
                                            </div>
                                        </div>
                                    } */}

                                    <div className='star-rating contact-form-control'>
                                        <div>
                                            <label>{t("Rating")}<span>*</span></label>
                                        </div>
                                        <ReactStars

                                            count={5}
                                            onChange={ratingChanged}
                                            size={24}
                                            activeColor="#ffd700"
                                        />
                                        <div className="invalid-feedback">{rat && `Please select rating`}</div>

                                    </div>
                                    <div className="contact-form-control">
                                        <label>{t("Description Field")}</label>
                                        <textarea placeholder={t("Description Field")} name="description" maxLength={200}  {...register("description")}></textarea>

                                    </div>
                                    <div className='button-center-align'>
                                        <button type='submit'>{t("Submit Now")}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className={mobileMenu ? 'mobile-sidebar-design mobile-sidebar-show' : 'mobile-sidebar-design mobile-sidebar-hidden'}>
                <div className='mobile-sidear-header'>
                    <div>
                        <img src={HondaLogo} alt='HondaLogo' />
                    </div>
                    <div onClick={() => setMobileMenu(false)}>
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <div className='mobile-sidebar-main-menu'>
                    <ul>
                        <NavLink to="/" onClick={() => setMobileMenu(false)}>
                            <li>{t("Home")}</li>
                        </NavLink>
                        <li>
                            <div className='align-mb'>
                                <NavLink to="/aboutus" onClick={() => setMobileMenu(false)}>
                                    <span>{t("About Us")}</span>
                                </NavLink>
                                <i class="fas fa-chevron-down" onClick={() => setTextHidden(!textHidden)}></i>
                            </div>
                            <div className={textHidden ? 'mobile-sub-show' : 'mobile-sub-hidden'}>
                                <div className='mobile-sub-menu-design'>
                                    <div className='first-show-mobile-app'>
                                        <h6>{t("Need Help")}</h6>
                                        <NavLink to="/contact-us" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Contact Us")}</span>
                                        </NavLink>
                                        <NavLink to="/askedquestions" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Frequently Asked Questions")}</span>
                                        </NavLink>
                                    </div>
                                    <div className='first-show-mobile-app'>
                                        <h6>{t("About Us")}</h6>
                                        <NavLink to="/aboutus" onClick={() => setMobileMenu(false)}>
                                            <span>{t("About Us")}</span>
                                        </NavLink>
                                        <NavLink to="/motorcarcourses" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Courses")}</span>
                                        </NavLink>
                                        <NavLink to="/sitemap" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Sitemap")}</span>
                                        </NavLink>


                                        <NavLink to="/facility" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Facility")}</span>
                                        </NavLink>
                                        {/* <NavLink to="/Helpful tips" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Helpful tips")}</span>
                                        </NavLink>
                                        <NavLink to="/testimonials" onClick={() => setMobileMenu(false)}>
                                            <span>{t("Testimonials")}</span>
                                        </NavLink> */}
                                    </div>
                                    <div className='first-show-mobile-app'>
                                        <h6>{t("Information")}</h6>
                                        <span>{t("Privacy Policy")}</span>
                                        <span>{t("Terms of Services")}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='align-mb'>
                                <span>{t("Courses")}</span>
                                <i class="fas fa-chevron-down" onClick={() => setTextHidden1(!textHidden1)}></i>
                            </div>
                            <div className={textHidden1 ? 'mobile-sub-show' : 'mobile-sub-hidden'}>
                                <div className='mobile-sub-menu-design'>
                                    <NavLink to="/motorcarcourses" onClick={() => setMobileMenu(false)}>
                                        <span>{t("Motorcar Courses")}</span>
                                    </NavLink>
                                    <NavLink to="/motorcyclecourses" onClick={() => setMobileMenu(false)}>
                                        <span> {t("Motorcycle Courses")}</span>
                                    </NavLink>
                                    <NavLink to="/othercourses" onClick={() => setMobileMenu(false)}>
                                        <span>{t("Other Courses")}</span>
                                    </NavLink>
                                </div>
                            </div>

                        </li>
                        <NavLink to="/accountinformation" onClick={() => setMobileMenu(false)}>
                            <li>{t("My Account")}</li>
                        </NavLink>
                        <NavLink to="/contact-us" onClick={() => setMobileMenu(false)}>
                            <li>{t("Contact Us")}</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div >
    )
}
