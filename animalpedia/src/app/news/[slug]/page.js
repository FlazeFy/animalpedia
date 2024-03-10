"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import GetNewsDetail from "./usecases/getNewsDetail"
import PostEditMode from "@/components/others/postEditMode"

export default function NewsDetailPage({ params }) {
  return <>
    <GetNavbar active="news"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <a className='btn btn-danger rounded-pill py-3 px-5' style={{position:"sticky", top:"var(--spaceXLG)"}} href='/news'>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className='me-3'/> Back</a>
          <PostEditMode type="news"/>
          <GetNewsDetail ctx="get_news_detail" slug={params.slug}/>
        </div>
        <GetFooter/>
    </div>
  </>
}