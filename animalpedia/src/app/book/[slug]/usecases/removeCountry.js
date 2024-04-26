"use client"
import Axios from 'axios'
import React, { useState } from 'react'
import $ from "jquery"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from '@/modules/storages/local'
import { toast } from 'react-toastify'
import CustomToast from '@/components/modals/toast'

export default function RemoveCountry({id}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const response = await Axios.delete(`http://127.0.0.1:1323/api/v1/animal/country/destroy/${id}`, {
                headers: {
                  Authorization: `Bearer ${keyToken}`
                }
            })
            $('#'+id).remove()
            toast.success(<CustomToast msg={"country remove"} />)
        } catch (error) {
            alert(error)
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className='btn btn-danger' title="Removed this country" 
                data-bs-toggle="modal" data-bs-target={"#removeModalAnimalCountry_"+id}><FontAwesomeIcon icon={faTrash} size="xl"/>
            </button>
            <div className="modal fade" id={"removeModalAnimalCountry_"+id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Remove Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <p className='text-white'>Are you sure want to permentaly remove this item?</p>
                        <button onClick={handleSubmit} data-bs-dismiss="modal" className='btn btn-danger rounded-pill py-2 px-3'>Yes, Remove</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  