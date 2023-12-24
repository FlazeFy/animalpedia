"use client"

// Components
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetAllNewsHeader from "./usecases/getAllNewsHeaders"

export default function NewsPage() {
    return <>
        <GetNavbar active="news"/>
        <div className="content-grid">
            <GetAllNewsHeader ctx="get_all_news_header"/>
        </div>
    </>
}