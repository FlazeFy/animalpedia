"use client"

// Components
import GetNavbar from "@/components/bars/navbar"
import GetFooter from "@/components/bars/footer"

// Usecases
import GetTotalAnimalCategory from "./usecases/get_total_animal_category"
import GetTotalAnimalRegion from "./usecases/get_total_animal_region"
import GetTotalAnimalStatus from "./usecases/get_total_animal_status"
import GetTotalAnimalZone from "./usecases/get_total_animal_zone"
import GetTotalAnimalVarietyByCountry from "./usecases/get_total_animal_variety_by_country"
import GetTotalAnimalPopulationByCountry from "./usecases/get_total_animal_population_by_country"

export default function StatsAnimals() {
    return <>
        <GetNavbar active="stats" subactive="stats_animals"/>
        <div className="content-grid">
            <div style={{minHeight:"100vh"}}>
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
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <GetTotalAnimalRegion ctx="get_total_animal_region"/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <GetTotalAnimalVarietyByCountry ctx="get_total_animal_variety_by_country"/>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <GetTotalAnimalPopulationByCountry ctx="get_total_animal_population_by_country"/>
                    </div>
                </div>
            </div>
            <GetFooter/>
        </div>
    </>
}