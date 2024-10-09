import React from "react";
import HeaderAdmin from "../../components/HeaderAdmin";

export default function Home() {

    return (
        <HeaderAdmin>
            <section className={"page-section"}>
                <div className={"d-flex -g-25"}>
                    <div className={"block-card w-100"}>
                        <div className={"-content"}>
                            <label>Events</label>
                            <p>1</p>
                        </div>
                    </div>
                    <div className={"block-card w-100"}>
                        <div className={"-content"}>
                            <label>Articles</label>
                            <p>1</p>
                        </div>
                    </div>
                    <div className={"block-card w-100"}>
                        <div className={"-content"}>
                            <label>Comments</label>
                            <p>10</p>
                        </div>
                    </div>
                    <div className={"block-card w-100"}>
                        <div className={"-content"}>
                            <label>Unread inboxs</label>
                            <p>1</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"page-section mt-25"}>
                <div className={"block-card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Recent Articles</label>
                    </div>
                    <div className={"-content"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <td>Title</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>There is no articles</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section className={"page-section mt-25"}>
                <div className={"block-card"}>
                    <div className={"-header"}>
                        <label className={"-title"}>Recent Events</label>
                    </div>
                    <div className={"-content"}>
                        <table className={"table"}>
                            <thead>
                                <tr>
                                    <td>Title</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>There is no events</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </HeaderAdmin>
    )
}