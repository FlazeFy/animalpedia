import GetFormTemplate from '@/components/containers/form'
import React from 'react'
import { useState, useEffect } from "react"
import Axios from 'axios'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import modal from '../../../components/modals/modals.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"

export default function PostDct({ctx}) {
    //Initial variable
    const [dctName, setDctName] = useState("")
    const [dctType, setDctType] = useState("")

    const [resMsgDctName, setResMsgDctName] = useState("")
    const [resMsgDctType, setResMsgDctType] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Dictionary Name',
            placeholder: 'Type dictionary name',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setDctName(event.target.value)
            },
            errorMsg: resMsgDctName
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Dictionary Type',
            placeholder: 'Type dictionary type',
            is_required: true,
            is_obsecure: false,
            maxLength: 144,
            handleChange: (event) => {
                setDctType(event.target.value)
            },
            errorMsg: resMsgDctType
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('dictionaries_name', dctName);
            data.append('dictionaries_type', dctType);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/dct", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            location.reload()

            if(response.data.status != 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className={modal.manage_btn} data-bs-toggle="modal" data-bs-target={"#addModal"+ctx}><FontAwesomeIcon icon={faAdd}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"addModal"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{getCleanTitleFromCtx(ctx)}</h5>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <GetFormTemplate type={"single-line"} props={builder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}