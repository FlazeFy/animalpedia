import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function PostAnimal({ctx}) {
    //Initial variable
    const [animalName, setAnimalName] = useState("")
    const [animalLatinName, setAnimalLatinName] = useState("")
    const [animalRegion, setAnimalRegion] = useState("")
    const [animalZone, setAnimalZone] = useState("")
    const [animalStatus, setAnimalStatus] = useState("")
    const [animalCategory, setAnimalCategory] = useState("")

    const builder = [
        {
            type: 'input-text',
            class: 'form-invisible',
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
            type: 'input-text',
            class: 'form-invisible',
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
            type: 'input-text',
            class: 'form-invisible',
            label: 'Animal Region',
            placeholder: 'Type animal region',
            is_required: true,
            is_obsecure: false,
            maxLength: 36,
            handleChange: (event) => {
                setAnimalRegion(event.target.value)
            },
            errorMsg: resMsgAnimalRegion
        },
        {
            type: 'input-text',
            class: 'form-invisible',
            label: 'Animal Zone',
            placeholder: 'Type animal zone',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setAnimalZone(event.target.value)
            },
            errorMsg: resMsgAnimalZone
        },
        {
            type: 'input-text',
            class: 'form-invisible',
            label: 'Animal Status',
            placeholder: 'Type animal status',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setAnimalStatus(event.target.value)
            },
            errorMsg: resMsgAnimalStatus
        },
        {
            type: 'input-text',
            class: 'form-invisible',
            label: 'Animal Category',
            placeholder: 'Type animal category',
            is_required: true,
            is_obsecure: false,
            maxLength: 36,
            handleChange: (event) => {
                setAnimalCategory(event.target.value)
            },
            errorMsg: resMsgAnimalCategory
        },
        {
            type: 'submit',
            class: 'btn btn-submit rounded-pill',
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
        
            if(response.trim() != ""){
                e.preventDefault()
                
            } else {
                location.reload()
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <h2>{getCleanTitleFromCtx(ctx)}</h2>
            <GetFormTemplate type={"single-line"} props={props} />
        </>
    )
}