import container from './containers.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull, faWarning } from "@fortawesome/free-solid-svg-icons"
import { ucFirstWord } from '@/modules/helpers/converter'

export default function GetAnimalHeaderContainer({builder}) {
    return (
        <a className={container.animal_gridbox} href={'book/'+builder['animals_slug']}>
            <div className={container.animal_hebox}>
                <div className={container.animal_hebox_props}>
                    {
                        builder['animals_zone'] == "Africa" ?
                            <img src="http://localhost:3000/assets/icons/zone_africa.png" className={container.animal_zone_icon} title="Africa"></img>
                        : builder['animals_zone'] == "Asia & Oceania" ?
                            <img src="http://localhost:3000/assets/icons/zone_asia.png" className={container.animal_zone_icon} title="Asia & Oceania"></img>
                        : builder['animals_zone'] == "Europe" ?
                            <img src="http://localhost:3000/assets/icons/zone_europe.png" className={container.animal_zone_icon} title="Europe"></img>
                        : builder['animals_zone'] == "America" ?
                            <img src="http://localhost:3000/assets/icons/zone_america.png" className={container.animal_zone_icon} title="America"></img>
                        :
                            <></>
                    }
                    {
                        builder['animals_status'] == "Near Threatened" || builder['animals_status'] == "Least Concern" ?
                            <></>
                        : builder['animals_status'] == "Vulnerable" || builder['animals_status'] == "Endangered" || builder['animals_status'] == "Critically Endangered" ?
                            <FontAwesomeIcon icon={faWarning} size="2x" title={builder['animals_status']} style={{marginLeft:"10px", marginBottom:"-7.5px"}}/>
                        : builder['animals_status'] == "Extinct" || builder['animals_status'] == "Extinct in the Wild" ?
                            <FontAwesomeIcon icon={faSkull} size="2x" title={builder['animals_status']} style={{marginLeft:"10px", marginBottom:"-7.5px"}}/>
                        :
                            <></>
                    }
                </div>
                <img className={container.animal_hebox_img} src={builder['animals_img_url']}></img>
            </div>
            <h4>{ucFirstWord(builder['animals_name'])}</h4>
            <h6>{ucFirstWord(builder['animals_latin_name'])}</h6>
        </a>
    )
}
  