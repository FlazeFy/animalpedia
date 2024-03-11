"use client"
import Axios from 'axios'
import React, { useState } from 'react'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faFire, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from '@/modules/storages/local'

export default function DeleteCatalog({type, slug, isDeleted}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const typeDel = isDeleted == true ? 'destroy' : 'by'
            let routeBack = isDeleted == true ? `/${type}` : `/${type}/${slug}`
            
            if (type == 'animal' && isDeleted == true){
                routeBack = '/book'
            } else if (type == 'animal' && isDeleted == false){
                routeBack = `/book/${slug}`
            }

            const response = await Axios.delete(`http://127.0.0.1:1323/api/v1/${type}/${typeDel}/${slug}`, {
                headers: {
                  Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.data.status != 200){
                setResMsgAll(response.data.message)
            } else {
                window.location.href = routeBack
            }
        } catch (error) {
            alert(error)
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className='btn btn-danger rounded-pill px-4 py-3 ms-3' title={isDeleted == true ? "Permentaly deleted this "+type : "Deleted this" +type} 
                data-bs-toggle="modal" data-bs-target="#deleteModal">
                {
                    isDeleted == true ?
                        <FontAwesomeIcon icon={faFire} size="xl"/>
                    :
                        <FontAwesomeIcon icon={faTrash} size="xl"/>
                }
            </button>
            <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-white'>Are you sure want to {isDeleted == true ? "permentaly delete this " : "delete this" } {type}?</p>
                        <button onClick={handleSubmit} className='btn btn-danger rounded-pill py-2 px-3'>Yes, {isDeleted == true ? "Permentaly Delete" : "Delete" }</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  