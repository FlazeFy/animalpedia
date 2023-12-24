"use client"

// Components
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetAllNewsManage from "./usecases/getAllNewsManage"
import PostNews from "./usecases/postNews"

export default function ManageNewsPage() {
    return <>
        <GetNavbar active="manage" subactive="manage_news"/>
        <div className="content-grid">
            <PostNews ctx="post_news"/>
            <hr></hr>
            <GetAllNewsManage ctx="get_all_news_manage"/>
        </div>
    </>
}