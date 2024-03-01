"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetAllTagManage from "./usecases/getAllTag"

export default function ManageDct() {
    return <>
        <GetNavbar active="manage" subactive="manage_dct"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <hr></hr>
                <GetAllTagManage ctx="get_all_tag_manage"/>
            </div>
            <GetFooter/>
        </div>
    </>
}