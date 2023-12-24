"use client"

// Components
import GetNavbar from "@/components/bars/navbar"

// Usecases
import GetTotalAnimalCategory from "./usecases/get_total_animal_category"
import GetTotalAnimalStatus from "./usecases/get_total_animal_status"
import GetTotalAnimalZone from "./usecases/get_total_animal_zone"

export default function StatsAnimals() {
    return <>
        <GetNavbar active="manage" subactive="manage_news"/>
        <div className="content-grid">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalAnimalZone ctx="get_total_animal_zone"/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalAnimalStatus ctx="get_total_animal_status"/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GetTotalAnimalCategory ctx="get_total_animal_category"/>
                </div>
            </div>
        </div>
    </>
}