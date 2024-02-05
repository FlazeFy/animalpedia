"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetAllNewsHeader from "./usecases/getAllNewsHeaders"

export default function NewsPage() {
    return <>
        <GetNavbar active="news"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetAllNewsHeader ctx="get_all_news_header"/>
            </div>
            <GetFooter/>
        </div>
    </>
}