import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "../forms/NewsletterForm";

export default function Header(props) {

    return (
        <div className={"page"}>
            <div className={"page-header"}>
                <div className={"header-wrapper"}>

                    {/* Desktop menu */}
                    <div className={"version-desktop-menu"}>
                        <div className={"-left"}>
                            <Link className={"d-flex"} to={"/"}>
                                <img className={"logo"} src={`${window.location.origin}/content/img/logo.svg`} alt={"Logo"} />
                            </Link>
                        </div>
                        <div className={"-center"}>
                            <nav className={"menu"}>
                                <li><Link to={"/"}>Home</Link></li>
                                {/* <li><Link to={"/pages"}>Pages</Link></li> */}
                                <li><Link to={"/about-us"}>Pages</Link></li>
                                <li><Link to={"/events"}>Schedule</Link></li>
                                <li><Link to={"/speakers"}>Speakers</Link></li>
                                <li><Link to={"/blog"}>Blog</Link></li>
                                <li><Link to={"/contact"}>Contact</Link></li>
                            </nav>
                        </div>
                        <div className={"-right"}>
                            <Link className={"btn btn-primary btn-bold -inline-flex"}>
                                <span>Get Tickets</span>
                                <img src={`${window.location.origin}/content/svg/ticket-white.svg`} alt={""} />
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={"version-mobile-menu"}>
                        <div className={"-left"}>
                            <Link className={"d-flex"} to={"/"}>
                                <img className={"logo"} src={`${window.location.origin}/content/img/logo.svg`} alt={"Logo"} />
                            </Link>
                        </div>
                        <div className={"-center"}>
                            <input id={"menubars"} type={"checkbox"} hidden />
                            <label className={"labelBars"} htmlFor={"menubars"}>
                                <img src={`${window.location.origin}/content/svg/bars-white.svg`} />
                            </label>
                            <div className={"mobile-menu"}>
                                <label className={"labelBars"} htmlFor={"menubars"}>
                                    <img src={`${window.location.origin}/content/svg/bars-white.svg`} />
                                </label>
                                <nav className={"menu"}>
                                    <li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/pages"}>Pages</Link></li>
                                    <li><Link to={"/schedule"}>Schedule</Link></li>
                                    <li><Link to={"/speakers"}>Speakers</Link></li>
                                    <li><Link to={"/blog"}>Blog</Link></li>
                                    <li><Link to={"/contact"}>Contact</Link></li>
                                </nav>
                            </div>
                        </div>
                        <div className={"-right"}>
                            <Link className={"btn btn-primary btn-bold -inline-flex"}>
                                <span>Get Tickets</span>
                                <img src={`${window.location.origin}/content/svg/ticket-white.svg`} alt={""} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"page-content"}>
                {props.children}
            </div>

            <div className={"page-footer"}>
                <div className={"footer-wrapper"}>
                    <div className={"footer-top"}>
                        <div className={"-footer-menu"}>
                            <div className={"-footer-col"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/dark-logo.svg`} alt={""} />
                                </div>
                                <div className={"-content"}>
                                    <p>A business conference organize by EventGrids In. World’s most influential media, entertainment & technology.</p>
                                    <label>Follow Us On:</label>
                                    <div className={"social-links"}>
                                        <a className={"-social-link"} href={"#"} target={"_blank"}>
                                            <img src={`${window.location.origin}/content/svg/facebook-white.svg`} alt={""} />
                                        </a>
                                        <a className={"-social-link"} href={"#"} target={"_blank"}>
                                            <img src={`${window.location.origin}/content/svg/twitter-white.svg`} alt={""} />
                                        </a>
                                        <a className={"-social-link"} href={"#"} target={"_blank"}>
                                            <img src={`${window.location.origin}/content/svg/pinterest-white.svg`} alt={""} />
                                        </a>
                                        <a className={"-social-link"} href={"#"} target={"_blank"}>
                                            <img src={`${window.location.origin}/content/svg/linkedin-white.svg`} alt={""} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={"-footer-col"}>
                                <div className={"-header"}>
                                    <label>Quick Links</label>
                                </div>
                                <div className={"-content"}>
                                    <nav>
                                        <li><Link to={"#"}>Get Direction</Link></li>
                                        <li><Link to={"#"}>Sponsor</Link></li>
                                        <li><Link to={"#"}>What We Offer</Link></li>
                                        <li><Link to={"#"}>Recent Projects</Link></li>
                                        <li><Link to={"#"}>Insights</Link></li>
                                    </nav>
                                </div>
                            </div>
                            <div className={"-footer-col"}>
                                <div className={"-header"}>
                                    <label>Know More</label>
                                </div>
                                <div className={"-content"}>
                                    <nav>
                                        <li><Link to={"/about-us"}>About Us</Link></li>
                                        <li><Link to={"#"}>Our Pricing</Link></li>
                                        <li><Link to={"/faq"}>Faq</Link></li>
                                        <li><Link to={"#"}>Guides</Link></li>
                                        <li><Link to={"/contact"}>Contact Us</Link></li>
                                    </nav>
                                </div>
                            </div>
                            <div className={"-footer-col"}>
                                <div className={"-header"}>
                                    <label>Subscribe to our newsletter</label>
                                </div>
                                <div className={"-content"}>
                                    <NewsletterForm />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"footer-copyright"}>
                        <p>
                            Copyright &copy; {(new Date()).getFullYear()} &minus; All rights reserved<br/>
                            Developed by <a href={"https://garry-almeida.com"} target={"_blank"}>Garry ALMEIDA</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}