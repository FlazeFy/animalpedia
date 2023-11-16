import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faWarning } from "@fortawesome/free-solid-svg-icons"

export default function GetAnimalHeader({builder}) {
    return (
        <div className={container.animal_gridbox}>
            <div className={container.animal_hebox}>
                <div className={container.animal_hebox_props}>
                    {
                        builder['animal_zone'] == "Africa" ?
                            <img src="/assets/icons/zone_africa.png" className={container.animal_zone_icon} title="Africa"></img>
                        : builder['animal_zone'] == "Asia & Oceania" ?
                            <img src="/assets/icons/zone_asia.png" className={container.animal_zone_icon} title="Asia & Oceania"></img>
                        : builder['animal_zone'] == "Europe" ?
                            <img src="/assets/icons/zone_europe.png" className={container.animal_zone_icon} title="Europe"></img>
                        : builder['animal_zone'] == "America" ?
                            <img src="/assets/icons/zone_america.png" className={container.animal_zone_icon} title="America"></img>
                        :
                            <></>
                    }
                    {
                        builder['animal_status'] == "Near Threatened" || builder['animal_status'] == "Least Concern" ?
                            <></>
                        : builder['animal_status'] == "Vulnerable" || builder['animal_status'] == "Endangered" || builder['animal_status'] == "Critically Endangered" ?
                            <FontAwesomeIcon icon={faWarning} size="2x" title={builder['animal_status']} style={{marginLeft:"10px", marginBottom:"-7.5px"}}/>
                        : builder['animal_status'] == "Extinct" || builder['animal_status'] == "Extinct in the Wild" ?
                            <FontAwesomeIcon icon={faSkull} size="2x" title={builder['animal_status']} style={{marginLeft:"10px", marginBottom:"-7.5px"}}/>
                        :
                            <></>
                    }
                </div>
                <img className={container.animal_hebox_img} src={builder['animal_img_url']}></img>
            </div>
            <h4>{builder['animal_name']}</h4>
            <h6>{builder['animal_latin_name']}</h6>
        </div>
    )
}
  