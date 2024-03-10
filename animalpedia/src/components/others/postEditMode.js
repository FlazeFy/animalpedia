import { getLocal, storeLocal } from '@/modules/storages/local'
import React from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

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
                    <button className='btn btn-success rounded-pill px-4 py-3 ms-3' title="Save edited data" onClick={(e) => handleSubmit('false')}>
                        <FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
                :
                    <button className='btn btn-primary rounded-pill px-4 py-3 ms-3' title="Edit mode" onClick={(e) => handleSubmit('true')}>
                        <FontAwesomeIcon icon={faEdit} size="xl"/></button>
            } 
        </>
    )
}
  