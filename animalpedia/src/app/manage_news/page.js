"use client"
import GetNavbar from "@/components/bars/navbar"
import GetAllNewsManage from "./usecases/getAllNewsManage"

export default function ManageNewsPage() {
    return <>
        <GetNavbar active="manage" subactive="manage_news"/>
        <div className="content-grid">
            <GetAllNewsManage ctx="get_all_news_manage"/>
        </div>
    </>
}