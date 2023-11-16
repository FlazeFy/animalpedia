"use client"

// Components
import GetNewsContainer from "@/components/containers/news"
import GetNavbar from "@/components/bars/navbar"

export default function NewsPage() {
    return <>
        <GetNavbar active="news"/>
        <div className="content-grid">
            <GetNewsContainer/>
        </div>
    </>
}