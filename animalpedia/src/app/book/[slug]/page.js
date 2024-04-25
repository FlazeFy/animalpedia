"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"
import GetAnimalDetail from "./usecases/getAnimalDetail"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import PostEditMode from "@/components/others/postEditMode"
import GetContentComment from "@/components/others/getContentComment"
import GetContentSource from "@/components/others/getContentSource"

export default function DetailPage({ params }) {
  return <>
    <GetNavbar active="book"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <a className='btn btn-danger rounded-pill py-3 px-5' style={{position:"sticky", top:"var(--spaceXLG)"}} href='/book'>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className='me-3'/> Back</a>
          <PostEditMode type="animal"/>
          <GetAnimalDetail ctx="get_animal_detail" slug={params.slug}/>
          <div className='text-center text-white'>
            <div className="row mt-3">
              <div className="col">
                <h3 className='text-white mb-4'>Comments</h3>
                <GetContentComment slug={params.slug} type="animals"/>
              </div>
              <div className="col">
                <h3 className='text-white mb-4'>References</h3>
                <GetContentSource slug={params.slug} type="animals"/>
              </div>
            </div>
          </div>
        </div>
        <GetFooter/>
    </div>
  </>
}