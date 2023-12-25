"use client"

// Components
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetAllDctManage from "./usecases/getAllDictionary"

export default function ManageDct() {
    return <>
        <GetNavbar active="manage" subactive="manage_dct"/>
        <div className="content-grid">
            <hr></hr>
            <GetAllDctManage ctx="get_all_dictionary_manage"/>
        </div>
    </>
}