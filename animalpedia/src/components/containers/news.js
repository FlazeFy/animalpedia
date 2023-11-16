import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock, faUser } from "@fortawesome/free-solid-svg-icons"
import GetButtonTag from '../buttons/tag'
import GetButtonPrimary from '../buttons/primary'

export default function GetNewsContainer({builder}) {
    return (
        <div className={container.news_gridbox}>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <img src="/assets/samples/news/news_1.jpg" className={container.news_nebox_image} title="Africa"></img>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <h4>New Extinct Animal !</h4>
                    <div className='mt-3 mb-4'>
                        <GetButtonTag slug="test" name="Tag"/>
                        <GetButtonTag slug="test_2" name="Tag 2"/>
                    </div>
                    <div className={container.news_content_box}>
                        <p className={container.news_header_desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className={container.news_nebox_props}>
                        <span className='me-3'><FontAwesomeIcon icon={faCalendar}/> Posted at Today</span>
                        <span className='me-3' title='Author'><FontAwesomeIcon icon={faUser}/> FlazeFy</span>
                        <span><FontAwesomeIcon icon={faClock}/> 15 min Read</span>
                    </div>
                    <GetButtonPrimary bg="var(--successBG)" refs="news/slug" name="See News"/>
                </div>
            </div>
        </div>
    )
}
  