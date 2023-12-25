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

export default function PostAnimal({ctx}) {
    //Initial variable
    const [animalName, setAnimalName] = useState("")
    const [animalLatinName, setAnimalLatinName] = useState("")
    const [animalRegion, setAnimalRegion] = useState("")
    const [animalZone, setAnimalZone] = useState("")
    const [animalStatus, setAnimalStatus] = useState("")
    const [animalCategory, setAnimalCategory] = useState("")

    const [resMsgAnimalName, setResMsgAnimalName] = useState("")
    const [resMsgAnimalLatinName, setResMsgAnimalLatinName] = useState("")
    const [resMsgAnimalRegion, setResMsgAnimalRegion] = useState("")
    const [resMsgAnimalZone, setResMsgAnimalZone] = useState("")
    const [resMsgAnimalStatus, setResMsgAnimalStatus] = useState("")
    const [resMsgAnimalCategory, setResMsgAnimalCategory] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Animal Name',
            placeholder: 'Type animal name',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setAnimalName(event.target.value)
            },
            errorMsg: resMsgAnimalName
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'Animal Latin Name',
            placeholder: 'Type animal latin name',
            is_required: true,
            is_obsecure: false,
            maxLength: 144,
            handleChange: (event) => {
                setAnimalLatinName(event.target.value)
            },
            errorMsg: resMsgAnimalLatinName
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Animal Region',
            placeholder: 'Type animal region',
            is_required: true,
            is_obsecure: false,
            maxLength: 36,
            handleChange: (event) => {
                setAnimalRegion(event.target.value)
            },
            errorMsg: resMsgAnimalRegion,
            url: 'http://127.0.0.1:1323/api/v1/dct/animal_region?page=1'
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Animal Zone',
            placeholder: 'Type animal zone',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setAnimalZone(event.target.value)
            },
            errorMsg: resMsgAnimalZone,
            url: 'http://127.0.0.1:1323/api/v1/dct/animal_zone?page=1'
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Animal Status',
            placeholder: 'Type animal status',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setAnimalStatus(event.target.value)
            },
            errorMsg: resMsgAnimalStatus,
            url: 'http://127.0.0.1:1323/api/v1/dct/animal_status?page=1'
        },
        {
            type: 'select',
            class: 'form-control',
            label: 'Animal Category',
            placeholder: 'Type animal category',
            is_required: true,
            is_obsecure: false,
            maxLength: 36,
            handleChange: (event) => {
                setAnimalCategory(event.target.value)
            },
            errorMsg: resMsgAnimalCategory,
            url: 'http://127.0.0.1:1323/api/v1/dct/animal_category?page=1'
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
            data.append('animals_name', animalName);
            data.append('animals_latin_name', animalLatinName);
            data.append('animals_region', animalRegion);
            data.append('animals_zone', animalZone);
            data.append('animals_status', animalStatus);
            data.append('animals_category', animalCategory);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/animal", data, {
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