import { Router } from "react-router-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import AboutUs from "../components/AboutUs/AboutUs";
import AccountInformation from "../components/AccountInformation/AccountInformation";
import AskedQuestions from "../components/AskedQuestions/AskedQuestions";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import SignIn from "../components/Auth/SignIn/SignIn";
import ContactUs from "../components/ContactUs/ContactUs";
import MotorcarCourses from "../components/Courses/MotorcarCourses/MotorcarCourses";
import MotorcarCoursesList from "../components/Courses/MotorcarCourses/MotorcarCoursesList";
import RepeatText from "../components/Courses/MotorcarCourses/RepeatText";
import MotorcycleCourses from "../components/Courses/MotorcycleCourses/MotorcycleCourses";
import OtherCourses from "../components/Courses/OtherCourses/OtherCourses";
import Description from "../components/Description";
import Discloser from "../components/Discloser/Discloser";
import Facility from "../components/Facility/Facility";
import HelpfulTips from "../components/HelpfulTips/HelpfulTips";
import HelpfulTipsDetails from "../components/HelpfulTips/HelpfulTipsDetails";
import Announcement from "../components/home/Announcement/Announcement";
import Home from "../components/home/Home";
import Footer from "../components/Layout/Footer/Footer";
import Header from "../components/Layout/Header/Header";
import MoreInfo from "../components/Moreinfo";
import OurClients from "../components/OurClients/OurClients";
import Overview from "../components/Overview/Overview";
import Payment from "../components/Payment/payment";
import Sitemap from "../components/Sitemap/sitemap";

import TermsofService from "../components/TermsofService/TermsofService";
import Testimonials from "../components/Testimonials/Testimonials";
import Vision from "../components/Vision/Vision";
import ProtectedRoute from "./ProtectedRoute";
import RouteWrapper from "./RouteWrapper";
import SignedInRoute from "./SignedInRoute";

const DefaultLayout = ({ children, match }) => (
    <>
        <Header match={match} />
        {children}
        <Footer />
    </>
);

function Layout() {
    return (
        // <Router>

        <BrowserRouter>
            {/* <ToastContainer /> */}
            <Switch>
                <RouteWrapper
                    exact={true}
                    path="/"
                    component={Home}
                    layout={DefaultLayout}
                />
                <SignedInRoute
                    exact={true}
                    path="/signin"
                    component={SignIn}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/verification-form"
                    component={Home}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/payment"
                    component={Payment}
                    layout={Payment}
                />
                <RouteWrapper
                    exact={true}
                    path="/contact-us"
                    component={ContactUs}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/accountinformation"
                    component={AccountInformation}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/overview"
                    component={Overview}
                    layout={DefaultLayout}
                />

                <RouteWrapper
                    exact={true}
                    path="/information/:id"
                    component={TermsofService}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/aboutus"
                    component={AboutUs}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/sitemap"
                    component={Sitemap}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/ourclients"
                    component={OurClients}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/description"
                    component={Description}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/moreinfo/:id"
                    component={MoreInfo}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/courseCategory/:id"
                    component={MotorcarCoursesList}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/courseName/:id"
                    component={RepeatText}
                    layout={DefaultLayout}
                />

                <RouteWrapper
                    exact={true}
                    path="/discloser"
                    component={Discloser}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/login"
                    component={Login}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/motorcarcourses"
                    component={MotorcarCourses}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/askedquestions"
                    component={AskedQuestions}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/othercourses"
                    component={OtherCourses}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/motorcyclecourses"
                    component={MotorcycleCourses}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/motorcarcourseslist"
                    component={MotorcarCoursesList}
                    layout={DefaultLayout}
                />

                <RouteWrapper
                    exact={true}
                    path="/vision"
                    component={Vision}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/facility"
                    component={Facility}
                    layout={DefaultLayout}
                />
                <ProtectedRoute
                    exact={true}
                    path="/register"
                    component={Register}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/Announcement"
                    component={Announcement}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/Helpful tips"
                    component={HelpfulTips}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/testimonials"
                    component={Testimonials}
                    layout={DefaultLayout}
                />
                <RouteWrapper
                    exact={true}
                    path="/helpfultipsdetails/:id"
                    component={HelpfulTipsDetails}
                    layout={DefaultLayout}
                />


            </Switch>
        </BrowserRouter>
    );
}

export default Layout;
