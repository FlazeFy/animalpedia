import { getLocal, storeLocal } from '@/modules/storages/local'
import React from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faXmarkCircle} from '@fortawesome/free-solid-svg-icons'

export default function PostEditMode({type}) {
    const handleSubmit = async (toogle) => {
        try {
            storeLocal("edit_mode_"+type, toogle)
            window.location.reload(true)
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            {
                getLocal("edit_mode_"+type) === 'true' ?
                    <button className='btn btn-danger rounded-pill px-4 py-3 ms-3' title="Save edited data" onClick={(e) => handleSubmit('false')}>
                        <FontAwesomeIcon icon={faXmarkCircle} size="xl"/> Close Edit Mode</button>
                :
                    <button className='btn btn-primary rounded-pill px-4 py-3 ms-3' title="Edit mode" onClick={(e) => handleSubmit('true')}>
                        <FontAwesomeIcon icon={faEdit} size="xl"/> Open Edit Mode</button>
            } 
        </>
    )
}
  