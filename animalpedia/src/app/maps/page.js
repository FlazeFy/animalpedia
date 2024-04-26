"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import GetSelectAnimal from "./usecases/getSelectAnimal"
import GetAnimalsMaps from "./usecases/getAnimalsMaps"

export default function MapsPage() {
  return <>
    <GetNavbar active="maps"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <div className="row">
            <div className="col-lg-9">
              <GetAnimalsMaps/>
            </div>
            <div className="col-lg-3">
              <GetSelectAnimal ctx={""}/>
            </div>
          </div>
        </div>
        <GetFooter/>
    </div>
  </>
}