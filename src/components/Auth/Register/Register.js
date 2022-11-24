import React, { useEffect, useState } from "react";
import "./Register.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import S3 from "react-aws-s3";

import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
  ApiPutNoAuth,
} from "../../../Helpers/Api/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Payment from "../../Payment/payment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AwsConfig from "../../../config/BucketConfig/awsConfig";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { lan } from "../../Jotai/JotaiGlobal";

export default function Register(props) {
  const [language, setLanguage] = useAtom(lan);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // setFormData({
  //   _id: row?._id,
  //   vehicleCategory: row?.vcid,
  //   courseType: row?.ctid,
  //   courseName: row?.cnid,
  //   courseCategory: row?.ccid,
  //   firstname: row?.fname,
  //   middlename: row?.mname,
  //   lastname: row?.lname,
  //   dateofCourse: row?.dateofCourse,
  //   DateofBirth: row?.DoB,
  //   qualification: row?.qualification,
  //   gender: row?.gender,
  //   address: row?.address,
  //   state: row?.state,
  //   district: row?.district,
  //   city: row?.city,
  //   email: row?.email,
  //   phone: row?.phone,
  //   pin: row?.pincode,
  //   license: row?.lcid,
  //   authority: row?.Authority,
  //   passport: row?.passportPhoto,
  //   driviniglicencephoto: row?.drivingLicense,
  //   idProof: row?.IDproof,
  //   mediacalCertificate: row?.medicalCertificate,
  //   bloodgroup: row?.bloodGroup,
  //   preferdate: row?.dateofCourse,
  //   trainddateid: row?.trainddateid,
  //   sloatId: row?.tdid,
  //   authoritycity: row?.authoritycity,
  //   authoritydistrict: row?.authoritydistrict,
  //   type: row?.type,
  //   driverlicense:
  //     row?.license === "N/A"
  //       ? ""
  //       : row?.drivingLicenseNumber,
  //   issueDate:
  //     row?.license === "N/A" ? "" : row?.issueDate,
  //   validDate:
  //     row?.license === "N/A" ? "" : row?.validTill,
  // });





  const [modalOpen, setModalOpen] = useState(false);
  const [getAllVehicalData, setgetAllVehicalData] = useState({});
  const [getAllCourceType, setgetAllCourceType] = useState({});
  const [getAllCourceName, setgetAllCourceName] = useState({});
  const [getAllCourceCategory, setgetAllCourceCategory] = useState({});
  const [getCourseNameByID, setgetNameByID] = useState();
  const [getSeat, setSeat] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const [VehicalCategoryData, setVehicalCategoryData] = useState("");
  const [TrainningDate, setTrainningDate] = useState("");
  const [CourceTypeData, setCourceTypeData] = useState("");
  const [CourceCategoryData, setCourceCategoryData] = useState("");
  const [CourceNameData, setCourceNameData] = useState("");
  const [price, setPrice] = useState("");
  const [cnid, setCNID] = useState("");
  const [alertForSlot, setAlertForSlot] = useState();
  const [submitpayment, setSubmitPayment] = useState(false);
  const [paymentId, setPaymentId] = useState();
  const [CourceType, setCourceType] = useState("");
  const [updateCall, setUpdateCall] = useState(false);
  const [typeTrueFalseform, settypeTrueFalseform] = useState(false);
  const [dicloser, setdicloser] = useState(false);
  const [errorShow, seterrorShow] = useState("");
  const [tab, setTab] = useState("course");
  const [formdata, setFormData] = useState({
    vehicleCategory: "",
    courseType: "",
    courseName: "",
    courseCategory: '',
    firstname: "",
    middlename: "",
    lastname: "",
    dateofCourse: "",
    DateofBirth: "",
    qualification: "",
    gender: "",
    address: "",
    state: "",
    driverlicense: "",
    district: "",
    city: "",
    email: "",
    phone: "",
    pin: "",
    license: "",
    issueDate: "",
    validDate: "",
    authority: "",
    passport: null,
    driviniglicencephoto: null,
    idProof: null,
    mediacalCertificate: null,
    bloodgroup: "",
    preferdate: "",
    trainddateid: "",
    sloatId: "",
    authoritycity: "",
    authoritydistrict: "",
    type: "",
  });



  const districts = [
    {
      name: "Ambala",
    },
    {
      name: "Bhiwani",
    },
    { name: "Charkhi Dadri" },
    {
      name: "Faridabad",
    },
    {
      name: "Fatehabad",
    },
    {
      name: "Gurgaon",
    },
    {
      name: "Hisar",
    },
    {
      name: "Jhajjar",
    },
    {
      name: "Jind",
    },
    {
      name: "Kaithal",
    },
    {
      name: "Karnal",
    },
    {
      name: "Kurukshetra",
    },
    {
      name: "Mahendragarh",
    },
    {
      name: "Mewat",
    },
    {
      name: "Palwal",
    },
    {
      name: "Panchkula",
    },
    {
      name: "Panipat",
    },
    {
      name: "Rewari",
    },
    {
      name: "Rohtak",
    },
    {
      name: "Sirsa",
    },
    {
      name: "Sonipat",
    },
    {
      name: "Yamunanagar",
    },
  ];

  const city = [
    { name: "Ambala" },
    { name: "Asankhurd" },
    { name: "Assandh" },
    { name: "Ateli" },
    { name: "Babiyal" },
    { name: "Bahadurgarh" },
    { name: "Barwala" },
    { name: "Bhiwani" },
    { name: "Charkhi Dadri" },
    { name: "Cheeka" },
    { name: "Ellenabad 2" },
    { name: "Faridabad" },
    { name: "Fatehabad" },
    { name: "Ganaur" },
    { name: "Gharaunda" },
    { name: "Gohana" },
    { name: "Gurgaon" },
    { name: "Haibat(Yamuna Nagar)" },
    { name: "Hansi" },
    { name: "Hisar" },
    { name: "Hodal" },
    { name: "Jhajjar" },
    { name: "Jind" },
    { name: "Kaithal" },
    { name: "Kalan Wali" },
    { name: "Kalka" },
    { name: "Karnal" },
    { name: "Ladwa" },
    { name: "Mahendragarh" },
    { name: "Mandi Dabwali" },
    { name: "Narnaul" },
    { name: "Narwana" },
    { name: "Palwal" },
    { name: "Panchkula" },
    { name: "Panipat" },
    { name: "Pehowa" },
    { name: "Pinjore" },
    { name: "Rania" },
    { name: "Ratia" },
    { name: "Rewari" },
    { name: "Rohtak" },
    { name: "Safidon" },
    { name: "Samalkha" },
    { name: "Shahbad" },
    { name: "Sirsa" },
    { name: "Sohna" },
    { name: "Sonipat" },
    { name: "Taraori" },
    { name: "Thanesar" },
    { name: "Tohana" },
    { name: "Yamunanagar" },
  ];
  const state = [{ name: "Haryana" }];
  const qualification = [
    { name: "10 Standard Graduate" },
    { name: "12th Standard Graduate" },
    { name: "Undergraduate" },
    { name: "Postgraduate" },
  ];

  const bloodgroupData = [
    { name: "A+" },
    { name: "A-" },
    { name: "B+" },
    { name: "B-" },
    { name: "AB+" },
    { name: "AB-" },
    { name: "O+" },
    { name: "O-" },
    { name: "N/A" },
  ];
  const gender = [
    { name: "Male" },
    { name: "Female" },
    { name: "Transgender" },
  ];
  const licenseCategoryData = [
    { name: "Learner" },
    { name: "Permanent" },
    { name: "Renewal" },
    { name: "N/A" },
  ];
  const licenseAuthorityData = [{ name: "Haryana" }];
  const history = useHistory();

  const register = () => {
    const data = {
      vcid: formdata.vehicleCategory,
      ctid: formdata.courseType,
      cnid: formdata.courseName,
      ccid: formdata.courseCategory,
      lcid: formdata.license,
      dateofCourse: formdata.preferdate,
      drivingLicenseNumber: formdata.license === "N/A" ? null : formdata.driverlicense,
      fname: userInfo?.payload?.user?.firstName
        ? userInfo?.payload?.user?.firstName
        : formdata.firstname,
      mname: formdata.middlename,
      lname: formdata.lastname,
      DoB: formdata.DateofBirth,
      qualification: formdata.qualification,
      gender: formdata.gender,
      address: formdata.address,
      state: "Haryana",
      city: formdata.city,
      district: formdata.district,
      pincode: formdata.pin,
      email: userInfo?.payload?.user?.email
        ? userInfo?.payload?.user?.email
        : formdata.email,
      phone: userInfo?.payload?.user?.phone
        ? userInfo?.payload?.user?.phone
        : formdata.phone,
      // permanentDLnumber: formdata.driverlicense,
      issueDate: formdata.license === "N/A" ? "" : formdata.issueDate,
      validTill: formdata.license === "N/A" ? "" : formdata.validDate,
      Authority: "Haryana",
      passportPhoto: formdata.passport,
      drivingLicense: formdata.driviniglicencephoto ? formdata.driviniglicencephoto : null,
      IDproof: formdata.idProof,
      medicalCertificate: formdata.mediacalCertificate,
      bloodGroup: formdata.bloodgroup,
      paymentId: paymentId,
      uid: userInfo?.payload?.user?._id,
      tdid: formdata.sloatId,
      authoritycity: formdata.authoritycity,
      authoritydistrict: formdata.authoritydistrict,
      type: formdata.type,
      Registrationtype: "self",
    }


    if (formdata.type == 'offline') {
      const datas = {
        cnid: formdata?.courseName,
        ctid: formdata?.courseType,
        vcid: formdata?.vehicleCategory,
        phone: formdata?.phone,
        tdid: formdata?.sloatId,
    }
      ApiPost('payment/checkPayment', datas).then( (res) => {
        if (res.data.result === 0) {
          ApiPost("register/addRegister", data)
            .then((res) => {
              if (res?.status == 200) {
                toast.success(res?.data?.message);
                setTimeout(() => {
                  history.push("/accountinformation");
                }, 200);

               
              } else {
                toast.error(res?.data?.message);
              }
            })
            .catch((err) => {
              toast.error(err?.response?.data?.message);
            });
        }
        else {
          toast.error(res?.data?.message, { theme: "colored" });
        }
      })
    } else {
      ApiPost("register/addRegister", data)
        .then((res) => {
          if (res?.status == 200) {
            toast.success(res?.data?.message);
            setTimeout(() => {
                      history.push("/accountinformation");
                    }, 200);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }


    // ApiPost("register/addRegister", data)
    //   .then((res) => {
    //     toast.success("Submitted successfully");
    //     if (res?.data?.result === 0) {
    //       setTimeout(() => {
    //         history.push("/accountinformation");
    //       }, 200);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err, { theme: "colored" });
    //   });
  };

  const onChnageForm = (e) => {
    setdicloser(false);
    setFormData((formdataAll) => {
      return { ...formdataAll, [e.target.name]: e.target.value };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
    if (e.target.name === "issueDate") {
      setFormData((formdataAll) => {
        return { ...formdataAll, "validDate": moment(e?.target?.value).add(6, 'M').format('YYYY-MM-DD') };
      });

    }
  };

  const onChnagSelectField = (e, name) => {
    setFormData((formdataAll) => {
      return { ...formdataAll, [name]: e.value };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
  };
  const onChangImage = (e, name) => {
    setFormData((formdataAll) => {
      return { ...formdataAll, [name]: e };
    });
    settypeTrueFalseform(false);
    seterrorShow("");
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const checkSlot = async () => {

    await ApiGet(
      `trainingDate/checkSlot/${formdata.sloatId}`
    )
      .then((res) => {
        return true

      })
      .catch((err) => {
        return false
      });
  }
  const handleOnClick = (e, key) => {
    e.preventDefault();

    if (key === "personal") {
      if (!checkSlot()) return
      if (formdata.vehicleCategory == "") {
        seterrorShow("Vehicle Category");
        toast.error(`Sorry! Vehicle Category must be specified`);
        settypeTrueFalseform(true);
      } else if (formdata.courseType == "") {
        toast.error(`Sorry! Course Type must be specified`);
        seterrorShow("Course Type");
        settypeTrueFalseform(true);
      } else if (formdata.courseCategory == "") {
        toast.error(`Sorry! Course Category must be specified`);
        seterrorShow("Course Category");
        settypeTrueFalseform(true);
      } else if (formdata.courseName == "") {
        toast.error(`Sorry! Course Category must be specified`);
        seterrorShow("Course Category");
        settypeTrueFalseform(true);
      } else if (formdata.license === "") {
        toast.error(`Sorry! License Category must be specified`);
        seterrorShow("License Category ");
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.driverlicense === "") {
        toast.error(`Sorry! Driver's License Number must be specified`);
        seterrorShow(`Driver's License Number`);
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.issueDate === "") {
        toast.error(`Sorry! Issue Date must be specified`);
        seterrorShow("Issue Date");
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.validDate === "") {
        toast.error(`Sorry! Valid Date must be specified`);
        seterrorShow("Valid Date");
        settypeTrueFalseform(true);
      }
      // else if (formdata.authority === '') {
      //   toast.error(`Sorry! License Authority must be specified`)
      //   seterrorShow('License Authority')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata?.license != "N/A" && formdata.authoritycity === "") {
        toast.error(`Sorry! License Authority City must be specified`);
        seterrorShow("License Authority City");
        settypeTrueFalseform(true);
      } else if (formdata?.license != "N/A" && formdata.authoritydistrict === "") {
        toast.error(`Sorry! License Authority District must be specified`);
        seterrorShow("License Authority Disctrict");
        settypeTrueFalseform(true);
      } else if (formdata.preferdate === "") {
        toast.error(`Sorry! Preferred Training Date must be specified`);
        seterrorShow("Preferred Training Date");
        settypeTrueFalseform(true);
      } else if (formdata.sloatId === "") {
        toast.error(`Sorry! Slot must be specified`);
        seterrorShow("Slot");
        settypeTrueFalseform(true);
      } else if (alertForSlot === 0) {
        toast.error(`Sorry! Sloat Not Available`);
        seterrorShow("Sloat Not Available");
        settypeTrueFalseform(true);
      } else {
        setTab(key);
      }
    } else if (key === "document") {
      if (!checkSlot()) return
      if (
        formdata.firstname === "" &&
        userInfo?.payload?.user?.firstName === ""
      ) {
        toast.error(`Sorry! First name must be specified`);
        seterrorShow("First name");
        settypeTrueFalseform(true);
      }
      else if (formdata.lastname === "") {
        toast.error(`Sorry! Last name must be specified`);
        seterrorShow("Last name");
        settypeTrueFalseform(true);
      }
      else if (formdata.DateofBirth === "") {
        toast.error(`Sorry! Date of Birth must be specified`);
        seterrorShow("Date of Birth");
        settypeTrueFalseform(true);
      } else if (formdata.qualification === "") {
        toast.error(`Sorry! Qualification must be specified`);
        seterrorShow("Qualification");
        settypeTrueFalseform(true);
      } else if (formdata.gender === "") {
        toast.error(`Sorry! Gender must be specified`);
        seterrorShow("Gender");
        settypeTrueFalseform(true);
      } else if (formdata.address === "") {
        toast.error(`Sorry! Address must be specified`);
        seterrorShow("Address");
        settypeTrueFalseform(true);
      }
      // else if (formdata.state === '') {
      //   toast.error(`Sorry! State must be specified`)
      //   seterrorShow('State')
      //   settypeTrueFalseform(true)
      // }
      else if (formdata.district === "") {
        toast.error(`Sorry! District must be specified`);
        seterrorShow("District");
        settypeTrueFalseform(true);
      } else if (formdata.city === "") {
        toast.error(`Sorry! City must be specified`);
        seterrorShow("City");
        settypeTrueFalseform(true);
      } else if (formdata.pin === "" ) {
        toast.error(`Sorry! PIN Code must be specified`);
        seterrorShow("PIN");
        settypeTrueFalseform(true);
        } else if (formdata.pin.length !== 6) {
          toast.error(`Sorry! PIN Number Not Valid must be specified`);
          seterrorShow("PIN Not Valid");
          settypeTrueFalseform(true);
      } else {
        seterrorShow("");
        settypeTrueFalseform(false);
        setTab(key);
      }
    } else if (key === "payment") {
      if (!checkSlot()) return
      if (formdata.passport === null) {
        toast.error("Select passport photo");
        seterrorShow("Passport Photo");
        settypeTrueFalseform(true);
      } else if (formdata.license !== "N/A" && formdata.license !== "Learner" && formdata.driviniglicencephoto === null) {
        toast.error("Select driving license photo");
        seterrorShow("Driving license photo");
        settypeTrueFalseform(true);
      } else if (
        typeof formdata.passport === "object" &&
        typeof formdata.driviniglicencephoto === "object" &&
        typeof formdata.idProof === "object" &&
        typeof formdata.mediacalCertificate === "object"
      ) {
        toast.error("Please click on upload button");
      } else {
        seterrorShow("");
        settypeTrueFalseform(false);
        setTab(key);
      }
    } else {
      seterrorShow("");
      settypeTrueFalseform(false);
      setTab(key);
    }
  };
  const getAllCourseTypeDataEdit = async (dataID, cidmain) => {
    setgetAllCourceName();
    setgetAllCourceType();
    const data = {
      vehicleCategory: dataID,
    };
    ApiPost(
      "courseType/getCoursetypeByVehiclecategory?page=${page}&limit=1000",
      data
    ).then(async (res) => {
      setgetAllCourceType(res.data.payload);
      const dataselect = res?.data?.payload?.courseType?.filter(
        (data) => data._id === cidmain
      );
      if (dataselect.length >= 0) {
        setdefaultValue((valueDefult) => ({
          ...valueDefult,
          courseType: {
            label: dataselect[0]?.courseType,
            value: dataselect[0]?._id,
          },
        }));
      }
    });
  };
  const getAllCourseNameEdit = async (
    CourceTypeDataedit,
    VehicalCategoryDataedit,
    CourseCategoryDataedit,
    cId
  ) => {
    const data = {
      courseType: CourceTypeDataedit,
      vehicleCategory: VehicalCategoryDataedit,
      courseCategory: CourseCategoryDataedit,
    };
    ApiPost(
      "courseName/getCoursenameByCoursetype?page=1&limit=10000",
      data
    ).then((res) => {
      setgetAllCourceName(res.data.payload);
      const setDataMAin = res?.data?.payload?.courseName?.filter(
        (dataMain) => dataMain._id === cId
      );
      setdefaultValue((dataasd) => ({
        ...dataasd,
        courseName: {
          label: setDataMAin[0]?.courseName,
          value: setDataMAin[0]?._id
        },
      }));
    });
    setUpdateCall(false);
  };
  const getAllCourseCategoryEdit = async (
    CourceTypeDataedit,
    VehicalCategoryDataedit,
    cId
  ) => {
    setgetAllCourceName();
    setgetAllCourceType();
    setgetAllCourceCategory();
    const data = {
      courseType: CourceTypeDataedit,
      vehicleCategory: VehicalCategoryDataedit,
    };
    ApiPost(
      "courseCategory/getCourseCategoryByCourseType?page=1&limit=10000",
      data
    ).then((res) => {
      setgetAllCourceCategory(res.data.payload);
      const setDataMAin = res?.data?.payload?.courseCategory?.filter(
        (dataMain) => dataMain._id === cId
      );

      setdefaultValue((dataasd) => ({
        ...dataasd,
        courseCategory: {
          label: setDataMAin[0]?.courseCategory,
          value: setDataMAin[0]?._id,
        },
      }));
    });
    setUpdateCall(false);
  };
  const previousClick = (e, key) => {
    let index = getAllVehicalData?.Question?.findIndex(
      (e) => e._id === formdata?.vehicleCategory
    );
    let vehaicalId = formdata.vehicleCategory;
    let courseTypeId = formdata.courseType;
    let courseNameId = formdata.courseName;
    let courseCategoryId = formdata.courseCategory;

    let vehical;
    if (index !== -1) {
      vehical = {
        label: getAllVehicalData?.Question[index].vehicleCategory,
        value: getAllVehicalData?.Question[index]._id,
      };
      setdefaultValue((data) => ({ ...data, vehicleCategory: vehical }));
    }
    setVehicalCategoryData(formdata?.vehicleCategory);
    getAllCourseTypeDataEdit(vehaicalId, courseTypeId);
    getAllCourseNameEdit(courseTypeId, vehaicalId, courseCategoryId, courseNameId);
    getAllCourseCategoryEdit(courseTypeId, vehaicalId, courseCategoryId);
    if (key === "course") {
      setTimeout(() => {
        setTab(key);
      }, 1500);
    } else if (key === "personal") {
      setTab(key);
    } else if (key === "document") {
      setTab(key);
    } else if (key === "payment") {
      setTab(key);
    }
  };
  const getAllVehicleCategory = () => {
    ApiGet(
      "vehicleCategory/getAll"
    ).then((res) => {
      setgetAllVehicalData(res.data.payload);
    });
  };

  const getAllCourseType = () => {
    setFormData({
      ...formdata,
      // courseType: "",
      // courseName: "",
    });
    setgetAllCourceName();
    setgetAllCourceType();
    const data = {
      vehicleCategory: VehicalCategoryData,
    };
    ApiPost(
      "courseType/getCoursetypeByVehiclecategory?page=${page}&limit=1000",
      data
    ).then((res) => {
      setgetAllCourceType(res.data.payload);
    });
  };
  const getCourseNames = () => {
    ApiGet(`courseName/getCourseNameById/${cnid}`).then((res) => {
      setgetNameByID(res.data.payload.Property);
      setPrice(
        res.data.payload.Property.price
      );
    });
  };

  useEffect(() => {
    if (cnid) {
      getCourseNames();
    }
  }, [cnid]);


  const getAllCourseName = () => {
    const data = {
      courseType: CourceTypeData,
      vehicleCategory: VehicalCategoryData,
      courseCategory: CourceCategoryData
    };
    ApiPost(
      "courseName/getCoursenameByCoursetype?page=1&limit=1000",
      data
    ).then((res) => {
      setgetAllCourceName(res.data.payload);
    });
    setUpdateCall(false);
  };

  useEffect(() => {
    if (CourceCategoryData) {
      getAllCourseName();
    }
  }, [CourceCategoryData]);


  // test
  const getAllCourseCategory = () => {
    const data = {
      courseType: CourceTypeData,
      vehicleCategory: VehicalCategoryData,
    };
    ApiPost(
      "courseCategory/getCourseCategoryByCourseType?page=${page}&limit=1000",
      data
    ).then((res) => {
      setgetAllCourceCategory(res.data.payload);
    });
    setUpdateCall(false);
  };

  useEffect(() => {
    if (updateCall) {
      getAllCourseCategory();
    }
  }, [updateCall]);

  // test end

  useEffect(() => {
    if (formdata.vehicleCategory) {
      getAllCourseType();
    }
  }, [formdata?.vehicleCategory]);

  useEffect(() => {
    getAllVehicleCategory();
  }, []);
  const getTrainignDate = () => {
    const data = {
      date: formdata.preferdate,
      coursenameid: formdata.courseName,
    };
    ApiGet(
      `trainingDate/getDatePrevious?date=${data.date}&vcid=${formdata.vehicleCategory}&ctid=${formdata.courseType}&ccid=${formdata.courseCategory}&cnid=${formdata.courseName}`
    ).then((res) => {
      if (res.data.payload) {
        // setTimeout(() => {
        setSeat(res.data.payload?.subMenu);
        // }, 1000);
      }
    });
  };
  const checkTrainnigDate = () => {
    if (formdata.preferdate && formdata.courseName) {
      getTrainignDate();
    }
  };

  const uploadCertificate = async () => {
    let urls = {};
    let data = [];
    if (formdata?.license === 'N/A') {
      if (formdata.passport) {
        if (formdata.passport && typeof formdata.passport !== "string") {
          if (!formdata.passport.name.match(/\.(jpg|jpeg|png)$/)) {
            toast.error(`*${formdata.passport.name} file is not valid.`);
            return
          }
          if ((formdata.passport.size / 1048576).toFixed(2) > 1) {
            toast.error(`*Please Upload less than 1 MB Passport File.`);
            return
          }
          data.push(formdata.passport);
          let passport1 = await uploadS3bucket(formdata.passport);
          urls = { passport: passport1, ...urls };
        }
        else if (
          formdata.driviniglicencephoto &&
          typeof formdata.driviniglicencephoto !== "string"
        ) {
          if (!formdata.driviniglicencephoto.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error(`*${formdata.driviniglicencephoto.name} file is not valid.`);
            return
          }
          if ((formdata.driviniglicencephoto.size / 1048576).toFixed(2) > 5) {
            toast.error(`*Please Upload less than 5 MB Drivinig Licence Photo File.`)
            return
          }
          data.push(formdata.driviniglicencephoto);
          let driviniglicencephoto = await uploadS3bucket(
            formdata.driviniglicencephoto
          );
          urls = { driviniglicencephoto: driviniglicencephoto, ...urls };
        }
        if (
          formdata.mediacalCertificate &&
          typeof formdata.mediacalCertificate !== "string"
        ) {
          if (!formdata.mediacalCertificate.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error(`*${formdata.mediacalCertificate.name} file is not valid.`);
            return
          }
          if ((formdata.mediacalCertificate.size / 1048576).toFixed(2) > 5) {
            toast.error(`*Please Upload less than 5 MB Mediacal Certificate File.`)
            return
          }
          data.push(formdata.mediacalCertificate);
          let mediacalCertificate = await uploadS3bucket(
            formdata.mediacalCertificate
          );
          urls = { mediacalCertificate: mediacalCertificate, ...urls };
        }
        if (formdata.idProof && typeof formdata.idProof !== "string") {
          if (!formdata.idProof.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
            toast.error(`*${formdata.idProof.name} file is not valid.`);
            return
          }
          if ((formdata.idProof.size / 1048576).toFixed(2) > 5) {
            toast.error(`*Please Upload less than 5 MB Id Proof File.`)
            return
          }
          data.push(formdata.idProof);

          let idProof = await uploadS3bucket(formdata.idProof);
          urls = { idProof: idProof, ...urls };
        }
        if (Object.keys(urls).length === data.length) {
          toast.success("Document uploaded successfully ");
        }
        setFormData({ ...formdata, ...urls });
      } else {
        toast.error("Please Select file before Uploading");
      }
    }
    else if (formdata.passport && formdata.driviniglicencephoto) {
      if (formdata.passport && typeof formdata.passport !== "string") {
        if (!formdata.passport.name.match(/\.(jpg|jpeg|png)$/)) {
          toast.error(`*${formdata.passport.name} file is not valid.`);
          return
        }
        if ((formdata.passport.size / 1048576).toFixed(2) > 1) {
          toast.error(`*Please Upload less than 1 MB Passport File.`);
          return
        }
        data.push(formdata.passport);
        let passport1 = await uploadS3bucket(formdata.passport);
        urls = { passport: passport1, ...urls };
      }
      if (
        formdata.driviniglicencephoto &&
        typeof formdata.driviniglicencephoto !== "string"
      ) {
        if (!formdata.driviniglicencephoto.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          toast.error(`*${formdata.driviniglicencephoto.name} file is not valid.`);
          return
        }
        if ((formdata.driviniglicencephoto.size / 1048576).toFixed(2) > 5) {
          toast.error(`*Please Upload less than 5 MB Drivinig Licence Photo File.`)
          return
        }
        data.push(formdata.driviniglicencephoto);
        let driviniglicencephoto = await uploadS3bucket(
          formdata.driviniglicencephoto
        );
        urls = { driviniglicencephoto: driviniglicencephoto, ...urls };
      }
      if (
        formdata.mediacalCertificate &&
        typeof formdata.mediacalCertificate !== "string"
      ) {
        if (!formdata.mediacalCertificate.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          toast.error(`*${formdata.mediacalCertificate.name} file is not valid.`);
          return
        }
        if ((formdata.mediacalCertificate.size / 1048576).toFixed(2) > 5) {
          toast.error(`*Please Upload less than 5 MB Mediacal Certificate File.`)
          return
        }
        data.push(formdata.mediacalCertificate);
        let mediacalCertificate = await uploadS3bucket(
          formdata.mediacalCertificate
        );
        urls = { mediacalCertificate: mediacalCertificate, ...urls };
      }
      if (formdata.idProof && typeof formdata.idProof !== "string") {
        if (!formdata.idProof.name.match(/\.(jpg|jpeg|png|pdf)$/)) {
          toast.error(`*${formdata.idProof.name} file is not valid.`);
          return
        }
        if ((formdata.idProof.size / 1048576).toFixed(2) > 5) {
          toast.error(`*Please Upload less than 5 MB Id Proof File.`)
          return
        }
        data.push(formdata.idProof);

        let idProof = await uploadS3bucket(formdata.idProof);
        urls = { idProof: idProof, ...urls };
      }
      if (Object.keys(urls).length === data.length) {
        toast.success("Document uploaded successfully ");
      }
      setFormData({ ...formdata, ...urls });
    } else {
      toast.error("Please Select file before Uploading");
    }
  }
  const uploadS3bucket = async (file) => {
    let config = AwsConfig;
    config = {
      ...config,
      dirName: "Cerificate",
      ACL: "public-read",
    };
    const Reacts3Client = new S3(config);
    let urls;
    let f = file;

    let filename = "AboutImage(" + new Date().getTime() + ")";
    let data = await Reacts3Client.uploadFile(f, filename);
    try {
      if (data.status === 204) {
        urls = data.location;
        return urls;
      } else {
        toast.error("Failed to upload image:", f.name);
      }
    } catch (err) { }
  };

  const [defaultValue, setdefaultValue] = useState({
    vehicleCategory: null,
    courseType: null,
    courseCategory: null,
    courseName: null,
  });
  const onChangeDiscloser = (e) => {
    setdicloser(e);
  };
  useEffect(() => {
    if (props.location.state) {

      ApiGet(
        "vehicleCategory/getAll"
      ).then((res) => {

        let index = res.data.payload?.Question?.findIndex(
          (e) => e._id === props?.location?.state?.vcid?._id
        );
        let vehical;
        if (index !== -1) {
          vehical = {
            label:
              res.data.payload?.Question[index]
                .vehicleCategory,
            value: res.data.payload?.Question[index]._id,
          };
          setdefaultValue((data) => ({
            ...data,
            vehicleCategory: vehical,
          }));
        }
      });
      setVehicalCategoryData(props?.location?.state?.vcid?._id);

      getAllCourseTypeDataEdit(props?.location?.state?.vcid?._id, props?.location?.state?.ctid?._id);
      getAllCourseCategoryEdit(
        props?.location?.state?.ctid?._id,
        props?.location?.state?.vcid?._id,
        props?.location?.state?.ccid?._id
      );

      getAllCourseNameEdit(
        props?.location?.state?.ctid?._id,
        props?.location?.state?.vcid?._id,
        props?.location?.state?.ccid?._id,
        props?.location?.state?._id
      );
      setCNID(props?.location?.state?._id);

      setFormData(data => {
        return {
          ...data,
          vehicleCategory: props?.location?.state?.vcid?._id,
          courseType: props?.location?.state?.ctid?._id,
          courseName: props?.location?.state?._id,
          courseCategory: props?.location?.state?.ccid?._id,

        }
      });

    }

  }, [props.location.state])

  return (
    <div>

      {/* <ToastContainer /> */}
      <div className="register-page-alignment">
        <div className="container">
          <div className="breadcrumbs-alignment">
            <ul className="breadcrumb">
              <li>
                <NavLink to="/">{t("Home")}</NavLink>
              </li>
              <li>{t("Register")}</li>
            </ul>
          </div>
          <div className="page-title-alignment">
            <h1>{t('Driver Training Course Registration Portal')}</h1>
          </div>
          <div className="tab-design">
            <ul>
              <li className={tab === "course" && "tab-active"}>
                {t('Course Selection')}
              </li>
              <li className={tab === "personal" && "tab-active"}>
                {t("Personal Information")}
              </li>
              <li className={tab === "document" && "tab-active"}>
                {t("Document Upload")}
              </li>
              <li className={tab === "payment" && "tab-active"}>{t("Payment")}</li>
            </ul>
          </div>
          {tab === "course" && (
            <div className="tab-details-alignment">
              <div className="tab-details-title">
                <h2>{t("Course Selection")}</h2>
              </div>
              <div className="register-grid">
                <div className="register-grid-items12">
                  <label>
                    {t("Vehicle Category")}<span>*</span>
                  </label>
                  {props?.location?.Edit === 'edit' ? (defaultValue.vehicleCategory && <Select

                    options={getAllVehicalData?.Question?.map((e) => ({
                      label: e.vehicleCategory,
                      value: e._id,
                    }))}
                    placeholder={t("Vehicle Category")}
                    name="vehicleCategory"
                    onChange={(e) => {
                      setCourceTypeData("");
                      setCourceType("");
                      onChnagSelectField(e, "vehicleCategory");
                      setVehicalCategoryData(e.value);
                    }}
                    defaultValue={defaultValue.vehicleCategory}
                  />) :
                    <Select
                    placeholder={t("Vehicle Category")}
                      options={getAllVehicalData?.Question?.map((e) => ({
                        label: e.vehicleCategory,
                        value: e._id,
                      }))}
                      name="vehicleCategory"
                      onChange={(e) => {
                        setCourceTypeData("");
                        setCourceType("");
                        onChnagSelectField(e, "vehicleCategory");
                        setVehicalCategoryData(e.value);
                      }}
                      defaultValue={defaultValue.vehicleCategory}
                    />}
                </div>

                <div className="register-grid-items12">
                  <label>
                    {t("Course Type")}<span>*</span>
                  </label>
                  {props?.location?.Edit === 'edit' ? (defaultValue.courseType && <Select
                    // isClearable
                    options={getAllCourceType?.courseType?.map((e) => ({
                      label: e.courseType,
                      value: e._id,
                    }))}
                    placeholder={t("Course Type")}
                    name="courseType"
                    onChange={(e) => {
                      setCourceType("");
                      setCourceCategoryData("")
                      onChnagSelectField(e, "courseType");
                      setCourceTypeData(e.value);
                      setUpdateCall(true);
                    }}
                    defaultValue={
                      defaultValue.courseType !== null &&
                      defaultValue.courseType
                    }
                  />) :
                    <Select
                      // isClearable
                      options={getAllCourceType?.courseType?.map((e) => ({
                        label: e.courseType,
                        value: e._id,
                      }))}
                      placeholder={t("Course Type")}
                      name="courseType"
                      onChange={(e) => {
                        setCourceType("");
                        onChnagSelectField(e, "courseType");
                        setCourceTypeData(e.value);
                        setUpdateCall(true);
                      }}
                      defaultValue={
                        defaultValue.courseType !== null &&
                        defaultValue.courseType
                      }
                    />
                  }
                </div>

                {/* for course category test*/}

                <div className="register-grid-items12 ">
                  <label>
                    {t("Course Category")}<span>*</span>
                  </label>
                  {props?.location?.Edit === 'edit' ? (defaultValue.courseCategory &&
                    <Select
                      // isClearable
                      options={getAllCourceCategory?.courseCategory?.map((e) => ({
                        label: e.courseCategory,
                        value: e._id,
                      }))}
                      placeholder={t("Course Category")}
                      name="courseCategory"
                      onChange={(e) => {
                        setCourceType(e.value);
                        setCourceCategoryData(e.value)
                        if (e?.value) {
                          let index =
                            getAllCourceCategory?.courseCategory?.findIndex(
                              (o) => o?._id === e?.value
                            );

                        }
                        onChnagSelectField(e, "courseCategory");
                      }}
                      defaultValue={
                        defaultValue.courseCategory && defaultValue.courseCategory
                      }
                    />) :
                    <Select
                      // isClearable
                      options={getAllCourceCategory?.courseCategory?.map((e) => ({
                        label: e.courseCategory,
                        value: e._id,
                      }))}
                      placeholder={t("Course Category")}
                      name="courseCategory"
                      onChange={(e) => {
                        setCourceType(e.value);
                        setCourceCategoryData(e.value)
                        if (e?.value) {
                          let index =
                            getAllCourceCategory?.courseCategory?.findIndex(
                              (o) => o?._id === e?.value
                            );

                        }
                        onChnagSelectField(e, "courseCategory");
                      }}
                      defaultValue={
                        defaultValue.courseCategory && defaultValue.courseCategory
                      }
                    />
                  }
                </div>

                {/* end test */}

                <div className="register-grid-items12 ">
                  <label>
                    {t("Course Name")}<span>*</span>
                  </label>
                  {props?.location?.Edit === 'edit' ? (defaultValue.courseName && <Select
                    // isClearable
                    options={getAllCourceName?.courseName?.map((e) => ({
                      label: e.courseName,
                      value: e._id,
                    }))}
                    placeholder={t("Course Name")}
                    name="courseName"
                    onChange={(e) => {
                      // setCourceType(e.value);
                      // setCourceCategoryData(e.value)
                      setCourceNameData(e.value)
                      if (e?.value) {
                        let index = getAllCourceName?.courseName?.findIndex(
                          (o) => o?._id === e?.value
                        );
                        if (index !== -1) {
                          setPrice(
                            getAllCourceName?.courseName[index].price
                          );
                          setCNID(
                            getAllCourceName?.courseName[index]._id
                          );
                        }
                      }
                      onChnagSelectField(e, "courseName");
                    }}
                    defaultValue={
                      defaultValue.courseName && defaultValue.courseName
                    }
                  />) :
                    <Select
                      // isClearable
                      options={getAllCourceName?.courseName?.map((e) => ({
                        label: e.courseName,
                        value: e._id,
                      }))}
                      placeholder={t("Course Name")}
                      name="courseName"
                      onChange={(e) => {
                        // setCourceType(e.value);
                        // setCourceCategory(e.value)
                        setCourceNameData(e.value)
                        if (e?.value) {
                          let index = getAllCourceName?.courseName?.findIndex(
                            (o) => o?._id === e?.value
                          );
                          if (index !== -1) {
                            setPrice(
                              getAllCourceName?.courseName[index].price
                            );
                            setCNID(
                              getAllCourceName?.courseName[index]._id
                            );
                          }
                        }
                        onChnagSelectField(e, "courseName");
                      }}
                      defaultValue={
                        defaultValue.courseName && defaultValue.courseName
                      }
                    />
                  }
                </div>
                <div className="register-grid-items12 ">
                  <label>
                    {t("License Category")}<span>*</span>
                  </label>
                  <Select
                    options={licenseCategoryData.map((e) => ({
                      label: e.name,
                      value: e.name,
                    }))}
                    name="license"
                    placeholder={t("License Category")}
                    onChange={(e) => onChnagSelectField(e, "license")}
                    defaultValue={{
                      label: formdata.license,
                      value: formdata.license,
                    }}
                  />
                </div>
                {
                  formdata?.license === 'Learner' && <>
                    <div className="register-grid-items ">
                      <label>
                        {t("Learner's License No.")}<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="driverlicense"
                        value={formdata.driverlicense}
                        onChange={(e) => onChnageForm(e)}
                      />
                    </div>
                    <div className="register-grid-items">
                      <label>
                        {t("Issue Date")}<span>*</span>
                      </label>
                      <input
                        type="date"
                        placeholder=""
                        name="issueDate"
                        max={moment(new Date()).format("YYYY-MM-DD")}
                        value={formdata.issueDate ? formdata.issueDate.slice(0, 10) : formdata.issueDate}
                        onChange={(e) => onChnageForm(e)}
                      />
                    </div>
                 
                    <div className="register-grid-items">
                      <label>
                        {t("Valid Till")}<span>*</span>
                      </label>
                      <input
                        type="date"
                        placeholder=""
                        name="validDate"
                        min={moment(new Date()).format("YYYY-MM-DD")}
                        value={formdata?.issueDate ? moment(formdata?.issueDate).add(6, 'M').format('YYYY-MM-DD') : ''}
                        onChange={(e) => onChnageForm(e)}
                        disabled="true"
                      />
                    </div>
                  </>
                }
                {formdata?.license != "N/A" && formdata?.license != 'Learner' &&
                  <>
                    <div className="register-grid-items ">
                      <label>{t("Drivers License No")}<span>*</span></label>
                      <input type="text" name='driverlicense' value={formdata.driverlicense} onChange={e => onChnageForm(e)} />
                    </div>
                    <div className="register-grid-items">
                      <label>{t("Issue Date")}<span>*</span></label>
                      <input type="date" placeholder="" name='issueDate' max={moment(new Date()).format("YYYY-MM-DD")} value={formdata.issueDate} onChange={e => onChnageForm(e)} />
                    </div>
                    <div className="register-grid-items">
                      <label>{t("Valid Till")}<span>*</span></label>
                      <input type="date" placeholder="" name='validDate' min={moment(new Date()).format("YYYY-MM-DD")} value={formdata.validDate} onChange={e => onChnageForm(e)} />
                    </div>
                  </>
                }

                <div className="register-grid-items"></div>
                {formdata?.license != "N/A" &&
                  <>
                    <div className="register-grid-items12">
                      <label>
                        {t("License Authority")}<span>*</span>
                      </label>

                      <Select
                        options={state.map((e) => ({
                          label: e.name,
                          value: e.name,
                        }))}
                        name="authority"
                        onChange={(e) => onChnagSelectField(e, "authority")}
                        defaultValue={{ label: "Haryana", value: "Haryana" }}
                      />
                    </div>
                    <div className="register-grid-items12">
                      <label>{t("License Authority (Town / city)")}<span>*</span></label>
                      <Select
                        options={city.map((e) => ({
                          label: e.name,
                          value: e.name,
                        }))}
                        name="authoritycity"
                        onChange={(e) =>
                          onChnagSelectField(e, "authoritycity")
                        }
                        defaultValue={{
                          label: formdata.authoritycity,
                          value: formdata.authoritycity,
                        }}
                      />
                    </div>
                    <div className="register-grid-items12">
                      <label>{t("License Authority (District)")}<span>*</span></label>
                      <Select
                        options={districts.map((e) => ({
                          label: e.name,
                          value: e.name,
                        }))}
                        name="authoritydistrict"
                        onChange={(e) => onChnagSelectField(e, "authoritydistrict")}
                        defaultValue={{
                          label: formdata.authoritydistrict,
                          value: formdata.authoritydistrict,
                        }}
                      />
                    </div>

                  </>

                }



              </div>
              <div className="full-fill-information">
                {props?.location?.Edit === 'edit' ?
                  <>
                    {getCourseNameByID ? (
                      <div>
                        <div>
                          <div className="sub-title">

                          </div>
                          <div className="information">
                            <p>
                              <span>{t("Course Name")}:</span>{" "}
                              {getCourseNameByID?.courseName}
                            </p>
                            <p>
                              <span>{t("Duration")}:</span>{" "}
                              {getCourseNameByID?.duration} Days
                            </p>
                            {/* <p>
                              <span>{t("Timing")}:</span>{" "}
                              {getCourseNameByID?.timing} Hours
                            </p> */}
                            <p>
                              <span>{t("Fees")}:</span> {" "}

                              {getCourseNameByID?.price} INR
                            </p>
                            <p>
                              <span>{t("Mode of Payment")}:</span>{" "}
                              {getCourseNameByID?.mode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="sub-title-one">
                          <p>{t("Course Type Description")} :</p>
                        </div>
                        <div className="information">
                          <p>
                            <span>{t("1 Learner")}:</span>{t("Long duration program suitable for beginner/ new learner")}
                          </p>
                          <p>
                            <span>{t("2 Refresher")} </span>{t("Short duration program suitable for existing driver")}
                          </p>
                          <p>
                            <span>{t("3 Evaluation")}</span>{t("Test of driving skill and knowledge")}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                  :
                  <>
                    {CourceType ? (
                      <div>
                        <div>
                          <div className="sub-title">

                          </div>
                          <div className="information">
                            <p>
                              <span>{t("Course Name")}:</span>{" "}
                              {getCourseNameByID?.courseName}
                            </p>
                            <p>
                              <span>{t("Duration")}:</span>{" "}
                              {getCourseNameByID?.duration} Days
                            </p>
                            <p>
                              <span>{t("Timing")}:</span>{" "}
                              {getCourseNameByID?.timing} Hours
                            </p>
                            <p>
                              <span>{t("Fees")}:</span> {" "}
                              {getCourseNameByID?.price} INR
                            </p>
                            <p>
                              <span>{t("Mode of Payment")}:</span>{" "}
                              {getCourseNameByID?.mode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="sub-title-one">
                          <p>{t("Course Type Description")} :</p>
                        </div>
                        <div className="information">
                          <p>
                            <span>{t("1 Learner")}:</span>{t("Long duration program suitable for beginner/ new learner")}
                          </p>
                          <p>
                            <span>{t("2 Refresher")} </span>{t("Short duration program suitable for existing driver")}
                          </p>
                          <p>
                            <span>{t("3 Evaluation")}</span>{t("Test of driving skill and knowledge")}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                }


              </div>
              <div className="register-grid search-button-alignment">
                <div className="register-grid-items">
                  <label>
                    {t("Preferred Training Date")}<span>*</span>
                  </label>
                  <input
                    type="date"
                    min={moment(new Date()).format("YYYY-MM-DD")}
                    onChange={(e) => {
                      setTrainningDate(e.target.value);

                      onChnageForm(e);
                    }}
                    name="preferdate"
                    value={formdata.preferdate}
                  />
                </div>
                <div className="register-grid-items">
                  {cnid ? (
                    <button onClick={(e) => checkTrainnigDate()}>{t("Search")}</button>
                  ) : (
                    <button className="disabled">{t("Search")}</button>
                  )}
                </div>
              </div>
              <div>
                {getSeat && getSeat.length > 0 ? (
                  <Carousel
                    responsive={{
                      superLargeDesktop: {
                        // the naming can be any, depends on you.
                        breakpoint: { max: 4000, min: 3000 },
                        items: 4,
                      },
                      desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 5,
                      },
                      tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2,
                      },
                      mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                      },
                    }}
                  >
                    {getSeat?.map((data, key) => {
                      return (
                        <div
                          key={key}
                          className={`calender-box un-active-background ${formdata.sloatId === data._id ? "activeSlot" : ""
                            }`}
                          name="trainddateid"
                          value={formdata.trainddateid}
                          onClick={(e) => {
                            onChnagSelectField({ value: data?._id }, "sloatId");
                            setAlertForSlot(data?.seat);
                          }}
                        >
                          <div className="cus-box-alignment">
                            <h2> {moment(data.date).format("YYYY-MM-DD ")}</h2>
                            <p>
                              {" "}
                              {t("Time")}: {moment(data.startTime).format(
                                "h:mm "
                              )} - {moment(data.endTime).format("h:mm ")}{" "}
                            </p>

                            <p>{t("Seat")}: {data?.seat ? data?.seat : "N.A"}</p>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                ) : (
                  <div className="calender-box un-active-background">
                    <div className="cus-box-alignment">
                      <h2>{t("No Slot Available")}</h2>
                    </div>
                  </div>
                )}
              </div>

              {typeTrueFalseform && (
                <div className="alert mt-top">
                  <div className="alert-bottom">
                    <p>Sorry! {errorShow} must be specified</p>
                  </div>
                </div>
              )}
              {/* {
                nameTrueFalse ? (
                  <div className="alert">
                    <div className="alert-bottom">
                      <p>Sorry! Please select course name
                      </p>
                    </div>
                  </div>
                ) : ('')
              } */}

              <div className="next-step-alignment">
                <button
                  onClick={(e) => handleOnClick(e, "personal")}
                  className="fill-button"
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          )}
          {tab === "personal" && (
            <div className="tab-details-alignment">
              <div className="tab-details-title">
                <h2>{t("Personal Information")}</h2>
              </div>
              <div className="Personal-details-background">
                <p>
                  <b>{t("Please fill your personal information!")}</b>
                </p>
                <p>{t("All *(star) fields are mandatory")}</p>
              </div>
              <div className="form-boder-box">
                <div className="register-grid-two">
                  <div className="register-grid-items">
                    <label>
                      {t("First Name")}<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("First Name")}
                      name="firstname"
                      value={
                        userInfo?.payload.user?.firstName
                          ? userInfo?.payload.user?.firstName
                          : formdata.firstname
                      }
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                  <div className="register-grid-items">
                    <label>{t("Middle Name")}</label>
                    <input
                      type="text"
                      placeholder={t("Middle Name")}
                      name="middlename"
                      value={formdata.middlename}
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                  <div className="register-grid-items">
                    <label>{t("Last Name")} <span>*</span></label>
                    <input
                      type="text"
                      placeholder={t("Last Name")}
                      name="lastname"
                      value={formdata.lastname}
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                  <div className="register-grid-items">
                    <label>
                      {t("Date of Birth")}<span>*</span>
                    </label>
                    <input
                      type="date"
                      name="DateofBirth"
                      max={moment(new Date()).subtract(18, 'years').format("YYYY-MM-DD")}
                      value={formdata.DateofBirth}
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                </div>
                <div className="two-col-grid">
                  <div className="register-grid-items12">
                    <label>
                      {t("Qualification")}<span>*</span>
                    </label>
                    {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                    <Select
                      options={qualification.map((e) => ({
                        label: e.name,
                        value: e.name,
                      }))}
                      placeholder={t("Qualification")}
                      name="qualification"
                      onChange={(e) => onChnagSelectField(e, "qualification")}
                      defaultValue={{
                        label: formdata.qualification,
                        value: formdata.qualification,
                      }}

                    />
                  </div>
                  <div className="register-grid-items12">
                    <label>
                      {t("Gender")}<span>*</span>
                    </label>
                    {/* <input type="text" placeholder="Select" name='gender' value={formdata.gender} onChange={e => onChnageForm(e)} /> */}
                    <Select
                      options={gender.map((e) => ({
                        label: e.name,
                        value: e.name,
                      }))}
                      placeholder={t("Gender")}
                      name="gender"
                      onChange={(e) => onChnagSelectField(e, "gender")}
                      defaultValue={{
                        label: formdata.gender,
                        value: formdata.gender,
                      }}
                    />
                  </div>
                </div>
                <div className="two-col-grid">
                  <div className="register-grid-items register-full-width">
                    <label>
                      {t("Address as per License")}<span>*</span> {t("Flat/House No,Locality, Street Name, Locality")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("Street Address")}
                   
                      name="address"
                      value={formdata.address}
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                </div>
                <div className="register-grid-one">
                  <div className="register-grid-items12">
                    <label>
                      {t("State")}<span>*</span>
                    </label>
                    {/* <input type="text" placeholder="State" disabled name='state' value={formdata.state} onChange={e => onChnageForm(e)} /> */}
                    <Select
                    placeholder={t("State")}
                      options={state.map((e) => ({
                        label: e.name,
                        value: e.name,
                      }))}
                      name="state"
                      onChange={(e) => onChnagSelectField(e, "state")}
                      defaultValue={{ label: "Haryana", value: "Haryana" }}
                    />
                  </div>
                  <div className="register-grid-items12">
                    <label>
                      {t("District")}<span>*</span>
                    </label>
                    {/* <input type="text" placeholder="District" name='district' value={formdata.district} onChange={e => onChnageForm(e)} /> */}
                    <Select
                      options={districts.map((e) => ({
                        label: e.name,
                        value: e.name,
                      }))}
                      placeholder={t("District")}
                      name="district"
                      onChange={(e) => onChnagSelectField(e, "district")}
                      defaultValue={{
                        label: formdata.district,
                        value: formdata.district,
                      }}
                    />
                  </div>
                  <div className="register-grid-items12">
                    <label>
                      {t("Town / city")}<span>*</span>
                    </label>
                    {/* <input type="text" placeholder="city" name='city' value={formdata.city} onChange={e => onChnageForm(e)} /> */}
                    <Select
                      options={city.map((e) => ({
                        label: e.name,
                        value: e.name,
                      }))}
                      placeholder={t("Town / city")}

                      name="city"
                      onChange={(e) => onChnagSelectField(e, "city")}
                      defaultValue={{
                        label: formdata.city,
                        value: formdata.city,
                      }}
                    />
                  </div>
                  <div className="register-grid-items">
                    <label>
                      {t("PIN")}<span>*</span>
                    </label>
                    <input
                      type="text"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    
                      maxLength={6}
                      placeholder={t("PIN")}

                      name="pin"
                      value={formdata.pin}
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                </div>
                <div className="two-col-grid">
                  <div className="register-grid-items">
                    <label>
                      {t("Email address")}<span></span>
                    </label>
                    <input
                      type="text"
                      placeholder={t("Email address")}
                      name="email"
                      value={
                        userInfo?.payload.user?.email
                          ? userInfo?.payload.user?.email
                          : formdata.email
                      }
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                  <div className="register-grid-items">
                    <label>
                      {t("Phone")}<span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder= {t("Phone")}
                      maxLength={10}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      name="phone"
                      defaultValue={
                        userInfo?.payload.user?.phone
                          ? userInfo?.payload.user?.phone
                          : formdata.phone
                      }
                      onChange={(e) => onChnageForm(e)}
                    />
                  </div>
                </div>
              </div>
              {typeTrueFalseform && (
                <div className="alert mt-top">
                  <div className="alert-bottom">
                    <p>Sorry! {errorShow} must be specified</p>
                  </div>
                </div>
              )}

              <div className="next-step-alignment">
                <button
                  onClick={(e) => previousClick(e, "course")}
                  className="out-line-button"
                >
                  {t("Previous")}
                </button>
                <button
                  onClick={(e) => handleOnClick(e, "document")}
                  className="fill-button"
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          )}
          {tab === "document" && (
            <div className="tab-details-alignment">
              <div className="tab-details-title">
                <h2>{t("Document Upload")}</h2>
              </div>
              <div className="upload-decuments-background">
                <p>
                  <b>{t("Please upload documents!")}</b>
                </p>
                <ul>
                  <li>
                    {t("Passport size photo must be clear and less than 1 mb(jpg, jpeg, png)")}
                  </li>
                  <li>
                    {t("Rest all documents less than 5 mb(jpg, jpeg, png, pdf)")}
                  </li>
                  <li>
                    {t("Name of document should not contain any special characters or space(eg @,)")}
                  </li>
                </ul>
              </div>
              <div className="photo-upload-from">
                <p>
                  {" "}
                 1. {t("Passport Photo")}<span className="star-color">*</span>: {t("less than")}
                </p>
                <input
                  type="file"
                  name="passport"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => onChangImage(e.target.files[0], "passport")}
                />
              </div>
              {
                formdata?.license === 'N/A' ? <div className="photo-upload-from">
                  <p>
                    2.{t("Driving Licenses")}
                  </p>
                  <input
                    type="file"
                    name="driviniglicencephoto"
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    onChange={(e) =>
                      onChangImage(
                        e.target.files[0],
                        "driviniglicencephoto"
                      )
                    }
                  />
                </div> : <div className="photo-upload-from">
                  <p>
                    {t("Driving License")}
                    <span className="star-color">*</span> {t("Not valid incase of N/A and Learner")}
                  </p>
                  <input
                    type="file"
                    name="driviniglicencephoto"
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    onChange={(e) =>
                      onChangImage(
                        e.target.files[0],
                        "driviniglicencephoto"
                      )
                    }
                  />
                </div>
              }
              {/* <div className="photo-upload-from">
                <p>
                  2. Driving License<span className="star-color">*</span> (Not
                  valid incase of NA)
                </p>
                <input
                  type="file"
                  name="driviniglicencephoto"
                  onChange={(e) =>
                    onChangImage(e.target.files[0], "driviniglicencephoto")
                  }
                />
              </div> */}
              <div className="photo-upload-from">
                <p>
                  3.{t("ID Proof")}
                </p>
                <input
                  type="file"
                  name="idProof"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={(e) => onChangImage(e.target.files[0], "idProof")}
                />
              </div>
              <div className="photo-upload-from">
                <p>
                  4.{t("Upload Medical certificate")}{" "}
                </p>
                <input
                  type="file"
                  name="mediacalCertificate"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={(e) =>
                    onChangImage(e.target.files[0], "mediacalCertificate")
                  }
                />
              </div>
              <div className="photo-upload-from dropdown-style-change">
                <p>5.{t("Enter Blood Group")}</p>
                <div className="register-grid-items12">
                  {/* <input type="text" placeholder="Select" name='qualification' value={formdata.qualification} onChange={e => onChnageForm(e)} /> */}
                  <Select
                    options={bloodgroupData.map((e) => ({
                      label: e.name,
                      value: e.name,
                    }))}
                    name="bloodgroup"
                    onChange={(e) => onChnagSelectField(e, "bloodgroup")}
                    defaultValue={{
                      label: formdata.bloodgroup,
                      value: formdata.bloodgroup,
                    }}
                  />
                </div>
              </div>
              {typeTrueFalseform && (
                <div className="alert mt-top">
                  <div className="alert-bottom">
                    <p>Sorry! {errorShow} must be specified</p>
                  </div>
                </div>
              )}
              {formdata?.license === 'N/A' ?
                formdata?.passport ?
                  <div className="next-step-alignment">
                    <button
                      className="fill-button"
                      onClick={() => uploadCertificate()}
                    >
                      {t("Upload")}
                    </button>
                  </div>
                  :
                  <div className="next-step-alignment">
                    <button className="fill-button disabled">
                      {t("Upload")}
                    </button>
                  </div>

                :
                formdata.driviniglicencephoto && formdata.passport ?
                  <div className="next-step-alignment">
                    <button
                      className="fill-button"
                      onClick={() => uploadCertificate()}
                    >
                      {t("Upload")}
                    </button>
                  </div>
                  :
                  <div className="next-step-alignment">
                    <button className="fill-button disabled">
                      {t("Upload")}
                    </button>
                  </div>
              }
              <div className="next-step-alignment">
                <button
                  onClick={(e) => previousClick(e, "personal")}
                  className="out-line-button"
                >
                  {t("Previous")}
                </button>
                <button
                  onClick={(e) => handleOnClick(e, "payment")}
                  className="fill-button"
                >
                  {t("Next")}
                </button>
              </div>
            </div>
          )}
          {tab === "payment" && (
            <div className="tab-details-alignment">
              <div className="payment-title">{t("Payment")}</div>
              <div className="d-flex ">
                <div className="d-flex aligncenetr margin-right-20">
                  <input
                    type="radio"
                    placeholder="online"
                    name="type"
                    className="margin-right-10"
                    value="online"
                    onChange={(e) => onChnageForm(e)}
                  />
                  <label className="labes" htmlFor="online">
                    Online
                  </label>
                </div>
                <div className="d-flex aligncenetr">
                  <input
                    type="radio"
                    placeholder="offline"
                    name="type"
                    className="margin-right-10"
                    value="offline"
                    onChange={(e) => onChnageForm(e)}
                  />
                  <label className="labes" htmlFor="offline">
                    {t("Offline")}
                  </label>
                </div>
              </div>
              <div className="mt-3">
                {formdata?.type === "online" ? (
                  <div>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeDiscloser(e.target.checked)}
                        checked={dicloser}
                      />
                      <div
                        className="label curser"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        {" "}
                        <a className="s">{t("Disclaimer Notice")}</a>{" "}
                      </div>
                    </div>
                    {dicloser && (

                      <Payment
                        price={price}
                        uid={userInfo?.payload?.user?._id}
                        cnid={cnid}
                        vcid={formdata.vehicleCategory}
                        ctid={formdata.courseType}
                        tdid={formdata.sloatId}
                        phone={formdata.phone}
                        hhhhh={(data) => {
                          setSubmitPayment(data);
                        }}
                        paymentId={(data) => {
                          setPaymentId(data);
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        onChange={(e) => onChangeDiscloser(e.target.checked)}
                        checked={dicloser}
                      />
                      <div
                        className="label curser"
                        onClick={() => setModalOpen(!modalOpen)}
                      >
                        {" "}
                        <a className="s">{t("Disclaimer Notice")}</a>{" "}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p>
                {t("note")}
              </p>
              <div className="next-step-alignment">
                <button
                  className="out-line-button"
                  onClick={(e) => handleOnClick(e, "document")}
                >
                  {t("Previous")}
                </button>



                {dicloser &&
                  (formdata.type === "online" ? submitpayment : true) && (
                    <button className="fill-button" onClick={() => register()}>
                      {submitpayment ? t("Submit1") : t("Submit")} 
                    </button>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
      {modalOpen && (
        <div className="feedback-background-blur">
          <div className="feedback-modal">
            <div className="modal-header">
              <h1>{t("Disclaimer Notice")}</h1>
              <i onClick={() => setModalOpen(false)} class="fas fa-times"></i>
            </div>
            <div className="modal-body">
              <p>
                <b>
                  {t("Cautionary statement regarding forward-looking information")}
                </b>
              </p>
              <p>
                {t(`This Site contains statements that constitute forward-looking
                statements within the meaning of the Private Securities
                Litigation Reform Act of 1995. In addition, in the future we,
                and others on our behalf, may make statements that constitute
                forward-looking statements. Such forward-looking statements may
                include, without limitation, statements relating to the
                following:`)}
              </p>
              <ul>
                <li>
                  <p> {t("our plans, objectives or goals;")}</p>
                </li>
                <li>
                  <p> {t("our future economic performance or prospects;")}</p>
                </li>
                <li>
                  <p>
                    {" "}
                    {t("the potential effect on our future performance of certain contingencies; and")}
                  </p>
                </li>
                <li>
                  <p>{t("assumptions")}</p>
                </li>
              </ul>
              <p>
                {t("Words such as")}
              </p>
              <ul>
                <li>
                  <p>
                    {" "}
                    {t("the ability to")}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    {t("market and interest")}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    {t("the strength of the global")}
                  </p>
                </li>
                <li>
                  <p>
                    {" "}
                    {t("the direct and indirect")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("adverse rating actions")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the ability to achieve our")}
                  </p>
                </li>

                <li>
                  <p>
                    {t("the ability of counterparties")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the effects of, and changes in")}
                  </p>
                </li>

                <li>
                  <p>
                    {t("political and social developments")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the possibility of foreign exchange controls, expropriation, nationalization or confiscation of assets in countries in which we conduct our operations;")}
                  </p>
                </li>

                <li>
                  <p>
                    {t("operational factors such as systems failure, human error, or the failure to implement procedures properly;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("actions taken by regulators with respect to our business and practices in one or more of the countries in which we conduct our operations;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the effects of changes in laws, regulations or accounting policies or practices;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("competition in geographic and business areas in which we conduct our operations;")}
                  </p>
                </li>

                <li>
                  <p>{t("the ability to retain and recruit qualified personnel;")}</p>
                </li>
                <li>
                  <p>
                    {t("the ability to maintain our reputation and promote our brand;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the ability to increase market share and control expenses;")}
                  </p>
                </li>
                <li>
                  <p>{t("technological changes;")}</p>
                </li>
                <li>
                  <p>
                    {t("the timely development and acceptance of our new products and services and the perceived overall value of these products and services by users;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("acquisitions, including the ability to integrate acquired businesses successfully, and divestitures, including th  ability to sell non-core assets;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the adverse resolution of litigation and other contingencies;")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("the ability to achieve our cost efficiency goals and cost targets; and")}
                  </p>
                </li>
                <li>
                  <p>
                    {t("our success")}
                  </p>
                </li>
              </ul>
              <p>
                {t("We caution you that")}
              </p>

              <p>
                <b>
                  {" "}
                  {t("Cautionary Statement Regarding Non-GAAP Financial Information")}
                </b>
              </p>
              <p>
                {t("is Site may contain")}
              </p>
              <p>
                <b> {t("Other information about disclosure on this site")}</b>
              </p>
              <p>
                {t("On this Site, adjusted")}
              </p>

              <p>
                {t("asofjanuary")}
              </p>
              <p> {t("Unless otherwise noted")}
              </p>
              <p> {t("For further information")}
              </p>
              <p>
                {t("All opinions and estimates expressed in this Site constitute our judgment as of publication and do not constitute general or specific investment legal, tax or accounting advice of any kind")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
