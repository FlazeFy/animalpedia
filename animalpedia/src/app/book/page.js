"use client"

// Components
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetAllAnimalHeader from "./usecases/getAllAnimalHeaders"

export default function BookPage() {
    return <>
        <GetNavbar active="book"/>
        <div className="content-grid">
            <GetAllAnimalHeader ctx="get_all_animal_header"/>
        </div>
    </>
}