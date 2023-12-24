"use client"
import GetNavbar from "@/components/bars/navbar"
import GetTotalAnimalZone from "./usecases/get_total_animal_zone"

export default function StatsAnimals() {
    return <>
        <GetNavbar active="manage" subactive="manage_news"/>
        <div className="content-grid">
            <GetTotalAnimalZone ctx="get_total_animal_zone"/>
        </div>
    </>
}