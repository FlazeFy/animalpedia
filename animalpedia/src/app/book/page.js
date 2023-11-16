"use client"
import GetNavbar from "@/components/bars/navbar"
import GetAllAnimalHeader from "./usecases/getAllAnimalHeaders"

export default function BookPage() {
    return <>
        <GetNavbar active="book"/>
        <div className="content-grid">
            <GetAllAnimalHeader ctx="get_all_animal_header"/>
        </div>
    </>
}