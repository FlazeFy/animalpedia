import { isNumInRange } from "../../modules/helpers/math";
import navbar from "../bars/navbar.module.css"

export default function PageBar({curr, max, ctx}) {
    function navigate(idx, ctx){
        sessionStorage.setItem(`Table_${ctx}`, idx);
        location.reload();
    }

    return (
        <div className="mb-2">       
            <h5 className="text-white mb-0">Page</h5>
            {
                Array.from({ length: max+1 }).map((_, index) => (
                    curr !== index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={navbar.page_bar} onClick={(e) => navigate(index, ctx)} key={index}>{ index }</button>
                    : curr === index && index != 0 && isNumInRange(curr, index, 20) ?
                        <button className={navbar.page_bar_active} onClick={(e) => navigate(index, ctx)} key={index}>{ index }</button>
                    :
                    <></>
                ))
            }
        </div>
    )
}