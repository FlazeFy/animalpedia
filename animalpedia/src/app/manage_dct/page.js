"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetAllDctManage from "./usecases/getAllDictionary"
import PostDct from "./usecases/postDct"

export default function ManageDct() {
    return <>
        <GetNavbar active="manage" subactive="manage_dct"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <PostDct ctx="post_dictionary"/>
                <hr></hr>
                <GetAllDctManage ctx="get_all_dictionary_manage"/>
            </div>
            <GetFooter/>
        </div>
    </>
}