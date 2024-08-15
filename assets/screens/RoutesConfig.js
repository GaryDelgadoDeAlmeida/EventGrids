import React from "react";
import { Route, Routes } from "react-router-dom";

// User
import Home from "./user/Home";
import About from "./user/About";
import Events from "./user/Events";
import Speakers from "./user/Speakers";
import Articles from "./user/Articles";
import Article from "./user/Article";
import Contact from "./user/Contact";
import Faq from "./user/Faq";
import Login from "./user/Login";

// Admin
import AdminHome from "./admin/Home";
import AdminProfile from "./admin/Profile";
import AdminServices from "./admin/Services";
import AdminService from "./admin/Service";
import AdminServiceNew from "./admin/ServiceNew";
import AdminTeams from "./admin/Teams";
import AdminEvents from "./admin/Events";
import AdminSponsors from "./admin/Sponsors";
import AdminTestimonials from "./admin/Testimonials";
import AdminTestimonial from "./admin/Testimonial";
import AdminPrices from "./admin/Prices";
import AdminInboxs from "./admin/Inboxs";
import AdminArticles from "./admin/Articles";
import AdminArticle from "./admin/Article";

// Common
import NotFound404 from "./NotFound404";

export default function RoutesConfig() {

    return (
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about-us"} element={<About />} />
            <Route path={"/events"} element={<Events />} />
            <Route path={"/speakers"} element={<Speakers />} />
            <Route path={"/blog"} element={<Articles />} />
            <Route path={"/blog/:articleID"} element={<Article />} />
            <Route path={"/contact"} element={<Contact />} />
            <Route path={"/faq"} element={<Faq />} />
            <Route path={"/login"} element={<Login />} />

            <Route path={"/admin"} element={<AdminHome />} />
            <Route path={"/admin/profile"} element={<AdminProfile />} />
            <Route path={"/admin/services"} element={<AdminServices />} />
            <Route path={"/admin/services/add"} element={<AdminServiceNew />} />
            <Route path={"/admin/service/:serviceID"} element={<AdminService />} />
            <Route path={"/admin/teams"} element={<AdminTeams />} />
            <Route path={"/admin/events"} element={<AdminEvents />} />
            <Route path={"/admin/sponsors"} element={<AdminSponsors />} />
            <Route path={"/admin/testimonials"} element={<AdminTestimonials />} />
            <Route path={"/admin/testimonial/:testimonialID"} element={<AdminTestimonial />} />
            <Route path={"/admin/prices"} element={<AdminPrices />} />
            <Route path={"/admin/inboxs"} element={<AdminInboxs />} />
            <Route path={"/admin/blogs"} element={<AdminArticles />} />
            <Route path={"/admin/blog/:blogID"} element={<AdminArticle />} />

            <Route path={"*"} element={<NotFound404 />} />
        </Routes>
    )
}