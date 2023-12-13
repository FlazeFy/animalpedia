"use client"
import GetNavbar from "@/components/bars/navbar"
import GetAllAnimalHeaderManage from "./usecases/getAllAnimalHeaderManage"

export default function ManageBookPage() {
    return <>
        <GetNavbar active="manage" subactive="manage_book"/>
        <div className="content-grid">
            <GetAllAnimalHeaderManage ctx="get_all_animal_header_manage"/>
        </div>
    </>
}