"use client"
import Axios from 'axios'
import React, { useState } from 'react'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faRotateBack } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from '@/modules/storages/local'

export default function RecoverCatalog({type, slug}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            let routeBack = `/${type}/${slug}`

            if (type == 'animal'){
                routeBack = `/book/${slug}`
            }

            const response = await Axios.post(`http://127.0.0.1:1323/api/v1/${type}/recover/${slug}`, null, {
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
            <button className='btn btn-success rounded-pill px-4 py-3 ms-3' title={"Recover this "+type} 
                data-bs-toggle="modal" data-bs-target="#recoverModal"><FontAwesomeIcon icon={faRotateBack} size="xl"/>
            </button>
            <div className="modal fade" id="recoverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Recover Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-white'>Are you sure want to recover this {type}?</p>
                        <button onClick={handleSubmit} className='btn btn-success rounded-pill py-2 px-3'>Yes, Recover</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  