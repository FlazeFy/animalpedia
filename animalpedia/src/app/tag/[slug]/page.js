"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import GetSelectedTag from "./usecases/get_selected_tag"

export default function NewsDetailPage({ params }) {
  return <>
    <GetNavbar active="home"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <a className='btn btn-danger rounded-pill py-3 px-5' style={{position:"sticky", top:"var(--spaceXLG)"}} href='/'>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className='me-3'/> Back</a>
            <GetSelectedTag tag={params.slug} ctx="search_content_by_tag"/>
        </div>
        <GetFooter/>
    </div>
  </>
}