"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetAllAnimalHeader from "./usecases/getAllAnimalHeaders"

export default function BookPage() {
    return <>
        <GetNavbar active="book"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
                <GetAllAnimalHeader ctx="get_all_animal_header"/>
            </div>
            <GetFooter/>
        </div>
    </>
}