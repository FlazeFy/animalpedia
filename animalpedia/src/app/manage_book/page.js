"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetAllAnimalHeaderManage from "./usecases/getAllAnimalHeaderManage"
import PostAnimal from "./usecases/postAnimal"

export default function ManageBookPage() {
    return <>
        <GetNavbar active="manage" subactive="manage_book"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <PostAnimal ctx="post_animal"/>
                <hr></hr>
                <GetAllAnimalHeaderManage ctx="get_all_animal_header_manage"/>
            </div>
            <GetFooter/>
        </div>
    </>
}