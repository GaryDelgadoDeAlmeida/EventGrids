import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import SearchForm from "../../forms/SearchForm";
import PrivateResource from "../../hooks/PrivateResource";
import CommentForm from "../../forms/CommentForm";
import CommentCard from "../../components/CommentCard";
import PopularArticleCard from "../../components/PopularArticleCard";
import BadgeTag from "../../components/BadgeTag";
import Banner from "../../components/Banner";

export default function Article() {
    const { articleID } = useParams()

    if(isNaN(articleID)) {
        return <Navigate to={"/blog"} />
    }

    const { loading, items, load, error } = PrivateResource(`${window.location.origin}/api/article/${articleID}`, false)
    useEffect(() => {
        load()
    }, [])

    return (
        <Header>
            <section className={"page-hero-2nd"}>
                <div className={"hero-background"}>
                    <img src={`${window.location.origin}/content/img/background-hero.jpg`} alt={""} />
                </div>
                <div className={"hero-wrapper"}>
                    <h1 className={"-hero-title"}>Article</h1>
                    <div className={"-hero-breadcrumbs"}>
                        <Link className={"breadcrumb"} to={"/"}>Home</Link>
                        <Link className={"breadcrumb"} to={"/blog"}>Blog</Link>
                        <span>Article</span>
                    </div>
                </div>
            </section>

            <section className={"page-section py-100"}>
                <div className={"page-wrapper"}>
                    <div className={"page-article"}>
                        <div className={"-left"}>
                            <article className={"block-card"}>
                                <div className={"-header"}>
                                    <img src={`${window.location.origin}/content/img/blog/blog1.jpg`} alt={""} />
                                </div>
                                <div className={"-content"}>
                                    <h2 className={"-title"}>Article name</h2>
                                    <div className={""}>
                                        <span>By Martin King</span>
                                        <span>20 Jun 2023</span>
                                        <span>Events</span>
                                    </div>
                                    <p>With over 25,000 customers worldwide, Appex is the world leading analytics and marketing suite for Instagram and a partner of the world's most-loved brands such as National Geographic, Gucci, Marc Jacobs, Samsung, Emirates and more.</p>
                                    <p>As a Customer Support Specialist, we expect you to be up-to-date with the latest digital technologies and social media trends. You should have excellent communication skills and be able to assist our customers in a fast, efficient and professional manner. If you enjoy fixing issues and helping improve the overall customer experience, this job is for you!</p>
                                    <h3>Summary of Completed Research</h3>
                                    <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                                    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway</p>
                                    <p>Heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional</p>
                                    <h3>Security and Reliability</h3>
                                    <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>
                                    <quote>
                                        <p>"Don't demand that things happen as you wish, but wish that they happen as they do happen, and you will go on well."</p>
                                        <label>- Epictetus, The Enchiridion</label>
                                    </quote>
                                    <h3>Setting the mood with incense</h3>
                                    <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time</p>
                                    <p>Podcasting operational change management inside of workflows to establish a framework. Taking seamless key performance indicators offline to maximise the long tail. Keeping your eye on the ball while performing a deep dive on the start-up mentality to derive convergence on cross-platform integration.</p>
                                    <p>Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas.</p>
                                </div>
                            </article>

                            {/* Comments */}
                            <div className={"block-card mt-50"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>02 Comments On This Post</label>
                                </div>
                                <div className={"-content"}>
                                    <div className={"d-grid"}>
                                        <CommentCard 
                                            imgPath={`${window.location.origin}/content/img/teams/speaker1.jpg`}
                                            fullname={"Garry ALMEIDA"}
                                            date={"12th May 2023"}
                                            comment={"Donec aliquam ex ut odio dictum, ut consequat leo interdum. Aenean nunc ipsum, blandit eu enim sed, facilisis convallis orci. Etiam commodo lectus quis vulputate tincidunt. Mauris tristique velit eu magna maximus condimentum."}
                                        />
                                        <CommentCard 
                                            imgPath={`${window.location.origin}/content/img/teams/speaker1.jpg`}
                                            fullname={"Garry ALMEIDA"}
                                            date={"12th May 2023"}
                                            comment={"Donec aliquam ex ut odio dictum, ut consequat leo interdum. Aenean nunc ipsum, blandit eu enim sed, facilisis convallis orci. Etiam commodo lectus quis vulputate tincidunt. Mauris tristique velit eu magna maximus condimentum."}
                                        />
                                        <CommentCard 
                                            imgPath={`${window.location.origin}/content/img/teams/speaker1.jpg`}
                                            fullname={"Garry ALMEIDA"}
                                            date={"12th May 2023"}
                                            comment={"Donec aliquam ex ut odio dictum, ut consequat leo interdum. Aenean nunc ipsum, blandit eu enim sed, facilisis convallis orci. Etiam commodo lectus quis vulputate tincidunt. Mauris tristique velit eu magna maximus condimentum."}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Comment form */}
                            <div className={"block-card mt-50"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Leave A Comment</label>
                                </div>
                                <div className={"-content"}>
                                    <CommentForm />
                                </div>
                            </div>
                        </div>
                        <div className={"-right"}>
                            {/* Search form */}
                            <div className={"block-card -black"}>
                                <div className={"-content"}>
                                    <SearchForm />
                                </div>
                            </div>

                            {/* Popular Feeds */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Popular Feeds</label>
                                </div>
                                <div className={"-content"}>
                                    <PopularArticleCard />
                                    <PopularArticleCard />
                                    <PopularArticleCard />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Categories</label>
                                </div>
                                <div className={"-content"}>
                                    <div className={"d-col -g-10"}>
                                        <Link to={"/"}>Life style</Link>
                                        <Link to={"/"}>Blog</Link>
                                        <Link to={"/"}>Fasion</Link>
                                        <Link to={"/"}>Sports</Link>
                                        <Link to={"/"}>Finance</Link>
                                        <Link to={"/"}>Political</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className={"block-card -black mt-25"}>
                                <div className={"-header"}>
                                    <label className={"-title"}>Popular Tags</label>
                                </div>
                                <div className={"-content"}>
                                    <div className={"d-flex -g-5 -wrap"}>
                                        <BadgeTag slug={"art"} title={"Art"} />
                                        <BadgeTag slug={"camera"} title={"Camera"} />
                                        <BadgeTag slug={"coffee"} title={"Coffee"} />
                                        <BadgeTag slug={"consult"} title={"Consult"} />
                                        <BadgeTag slug={"design"} title={"Design"} />
                                        <BadgeTag slug={"gallery"} title={"Gallery"} />
                                        <BadgeTag slug={"life"} title={"Life"} />
                                        <BadgeTag slug={"record"} title={"Record"} />
                                        <BadgeTag slug={"photography"} title={"Photography"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Banner
                supTitle={"Hurry Up!"}
                title={"Europe’s Leading Conference Book your Seat Now"}
                description={"Entertainment & technology show inspirational speakers including game changing not just a large-scale conference but a hub."}
            />
        </Header>
    )
}