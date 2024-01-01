import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock, faUser } from "@fortawesome/free-solid-svg-icons"
import GetButtonTag from '../buttons/tag'
import GetButtonPrimary from '../buttons/primary'
import { convertDatetime, removeHTMLTags, ucFirstChar, ucFirstWord } from '@/modules/helpers/converter'

export default function GetNewsContainer({builder}) {
    return (
        <div className={container.news_gridbox}>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <img src={builder['news_img_url']} className={container.news_nebox_image} title={builder['news_img_url']}></img>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <h4>{ucFirstWord(builder['news_name'])}</h4>
                    <div className='mt-3 mb-4'>
                        <GetButtonTag slug="test" name="Tag"/>
                        <GetButtonTag slug="test_2" name="Tag 2"/>
                    </div>
                    <div className={container.news_content_box}>
                        <p className={container.news_header_desc}>{ucFirstChar(removeHTMLTags(builder['news_body']))}</p>
                    </div>
                    <div className={container.news_nebox_props}>
                        <span className='me-3'><FontAwesomeIcon icon={faCalendar}/> Posted at {convertDatetime(builder['created_at'], "calendar")}</span>
                        <span className='me-3' title='Author'><FontAwesomeIcon icon={faUser}/> {builder['created_by']}</span>
                        <span><FontAwesomeIcon icon={faClock}/> {builder['news_time_read']} min Read</span>
                    </div>
                    <GetButtonPrimary bg="var(--successBG)" refs="news/slug" name="See News"/>
                </div>
            </div>
        </div>
    )
}
  