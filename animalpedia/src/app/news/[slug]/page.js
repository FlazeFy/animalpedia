"use client"

// Component
import GetFooter from "@/components/bars/footer"
import GetNavbar from "@/components/bars/navbar"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import GetNewsDetail from "./usecases/getNewsDetail"
import PostEditMode from "@/components/others/postEditMode"
import GetContentComment from "@/components/others/getContentComment"

export default function NewsDetailPage({ params }) {
  return <>
    <GetNavbar active="news"/>
    <div className="content-grid">
        <div style={{minHeight:"100vh"}}>
          <a className='btn btn-danger rounded-pill py-3 px-5' style={{position:"sticky", top:"var(--spaceXLG)"}} href='/news'>
            <FontAwesomeIcon icon={faArrowLeft} size="lg" className='me-3'/> Back</a>
          <PostEditMode type="news"/>
          <GetNewsDetail ctx="get_news_detail" slug={params.slug}/>
          <div className='text-center text-white'>
            <div className="row">
              <div className="col">
                <h3 className='text-white mb-4'>Comments</h3>
                <GetContentComment slug={params.slug} type="news"/>
              </div>
              <div className="col">
                <h3 className='text-white mb-4'>References</h3>
              </div>
            </div>
          </div>
        </div>
        <GetFooter/>
    </div>
  </>
}