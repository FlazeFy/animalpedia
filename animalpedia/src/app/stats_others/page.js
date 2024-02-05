"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetTotalCommentContext from "./usecases/get_total_comment_context"

export default function StatsOthers() {
    return <>
        <GetNavbar active="stats" subactive="stats_others"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <GetTotalCommentContext ctx="get_total_comment_context"/>
                    </div>
                </div>
            </div>
            <GetFooter/>
        </div>
    </>
}