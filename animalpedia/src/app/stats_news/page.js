"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetTotalNewsByTimeRead from "./usecases/get_total_time_read"

export default function StatsNews() {
    return <>
        <GetNavbar active="stats" subactive="stats_news"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <GetTotalNewsByTimeRead ctx="get_total_news_time_read"/>
                    </div>
                </div>
            </div>
            <GetFooter/>
        </div>
    </>
}