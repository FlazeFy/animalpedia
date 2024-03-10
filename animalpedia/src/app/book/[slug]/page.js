"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"
import GetAnimalDetail from "./usecases/getAnimalDetail"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import PostEditMode from "@/components/others/postEditMode"

export default function DetailPage({ params }) {
  return <>
    <GetNavbar active="book"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <a className='btn btn-danger rounded-pill py-3 px-5' style={{position:"sticky", top:"var(--spaceXLG)"}} href='/book'>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className='me-3'/> Back</a>
          <PostEditMode type="animal"/>
          <GetAnimalDetail ctx="get_animal_detail" slug={params.slug}/>
        </div>
        <GetFooter/>
    </div>
  </>
}