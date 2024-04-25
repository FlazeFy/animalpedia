"use client"
import Axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"

import GetBreakLine from '@/components/others/breakLine'
import { getLocal } from '@/modules/storages/local'
import DeleteCatalog from '@/components/others/deleteCatalog'
import RecoverCatalog from '@/components/others/recoverCatalog'
import GetDropDownDctDynamic from '@/components/others/dropdown'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import CustomToast from '@/components/modals/toast'

export default function GetAnimalDetail({ctx,slug}) {
    //Initial variable
    const keyToken = getLocal("token_key")
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    // Editable
    const [animalName, setAnimalName] = useState("")
    const [animalLatinName, setAnimalLatinName] = useState("")
    const [animalZone, setAnimalZone] = useState("")
    const [animalRegion, setAnimalRegion] = useState("")
    const [animalCategory, setAnimalCategory] = useState("")
    const [animalStatus, setAnimalStatus] = useState("")
    const [animalDesc, setAnimalDesc] = useState("")
    const [animalDescBackUp, setAnimalDescBackUp] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/animal/open/`+slug)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)        

                setAnimalName(result.data['animals_name'])
                setAnimalLatinName(result.data['animals_latin_name'])
                setAnimalZone(result.data['animals_zone'])
                setAnimalRegion(result.data['animals_region'])
                setAnimalCategory(result.data['animals_category'])
                setAnimalStatus(result.data['animals_status'])
                setAnimalDesc(result.data['animals_desc'])
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('animals_name', animalName)
            data.append('animals_latin_name', animalLatinName)
            data.append('animals_zone', animalZone)
            data.append('animals_region', animalRegion)
            data.append('animals_category', animalCategory)
            data.append('animals_status', animalStatus)
            data.append('animals_desc', animalDesc)
    
            const response = await Axios.put("http://127.0.0.1:1323/api/v1/animal/by/" + slug, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${keyToken}`
                }
            })
    
            if (response.status !== 200) {
                window.location.reload(false);
                return response.data.message;
            } else {
                toast.success(<CustomToast msg={animalName + " updated"} />)
            }
        } catch (error) {
            toast.error(<CustomToast msg={error} />)
        }
    }

    const optAnimalZone = {
        class:'form-select',
        placeholder:'select animal zone',
        handleChange: (e) => setAnimalZone(e.target.value)
    }
    const optAnimalRegion = {
        class:'form-select',
        placeholder:'select animal region',
        handleChange: (e) => setAnimalRegion(e.target.value)
    }
    const optAnimalCategory = {
        class:'form-select',
        placeholder:'select animal category',
        handleChange: (e) => setAnimalCategory(e.target.value)
    }
    const optAnimalStatus = {
        class:'form-select',
        placeholder:'select animal status',
        handleChange: (e) => setAnimalStatus(e.target.value)
    }

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <>
                <DeleteCatalog slug={item['animals_slug']} isDeleted={item['deleted_at'] == "" ? false : true} type="animal"/>
                {
                    item['deleted_at'] != "" ? <RecoverCatalog slug={item['animals_slug']} type="animal"/> : <></>
                }
                {
                    getLocal("edit_mode_animal") === 'true' ?
                        <button className='btn btn-success rounded-pill px-4 py-3 ms-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/> Save Changes</button>
                    :
                        <></>
                }
                <div className='pt-5'>
                    <div className='row my-4'>
                        <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
                            <img className='img img-fluid rounded-circle mb-2' style={{maxWidth: "300px"}} src={item['animals_img_url'] != '' ? item['animals_img_url'] : "http://localhost:3000/assets/icons/no_image_animal.png"}/><br></br>
                            {
                                getLocal("edit_mode_animal") === 'true' ?
                                    <>
                                        <lable className='text-white mb-1'>Animal Name</lable>
                                        <input type="text" defaultValue={animalName} onChange={(e)=>setAnimalName(e.target.value)} className="form-control"></input>
                                        <lable className='text-white mb-1'>Animal Latin Name</lable>
                                        <input type="text" defaultValue={animalLatinName} onChange={(e)=>setAnimalLatinName(e.target.value)} className="form-control"></input>
                                    </>
                                :
                                    <>
                                        <h1 className='mb-1 mt-4'>{animalName}</h1>
                                        <h5 className='fst-italic text-white'>{animalLatinName}</h5>
                                    </>
                            }
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 text-start'>
                            {
                                getLocal("edit_mode_animal") === 'true' ?
                                    <>
                                        <lable className='text-white mb-1'>Animal Zone</lable>
                                        <GetDropDownDctDynamic selected={animalZone} elmt={optAnimalZone} url={'http://127.0.0.1:1323/api/v1/dct/animal_zone?page=1'}/>
                                        <lable className='text-white mb-1'>Animal Region</lable>
                                        <GetDropDownDctDynamic selected={animalRegion} elmt={optAnimalRegion} url={'http://127.0.0.1:1323/api/v1/dct/animal_region?page=1'}/>
                                        <lable className='text-white mb-1'>Animal Category</lable>
                                        <GetDropDownDctDynamic selected={animalCategory} elmt={optAnimalCategory} url={'http://127.0.0.1:1323/api/v1/dct/animal_category?page=1'}/>
                                        <lable className='text-white mb-1'>Animal Status</lable>
                                        <GetDropDownDctDynamic selected={animalStatus} elmt={optAnimalStatus} url={'http://127.0.0.1:1323/api/v1/dct/animal_status?page=1'}/>
                                    </>
                                :
                                    <>
                                        <h5 className='text-white'>Zone</h5>
                                        <h3>{item['animals_zone']}</h3>
                                        <hr className='text-white'></hr>

                                        <h5 className='text-white'>Region</h5>
                                        <h3>{item['animals_region']}</h3>
                                        <hr className='text-white'></hr>

                                        <h5 className='text-white'>Category</h5>
                                        <h3>{item['animals_category']}</h3>
                                        <hr className='text-white'></hr>

                                        <h5 className='text-white'>Status</h5>
                                        <h3>{item['animals_status']}</h3>
                                    </>
                            }
                        </div>
                    </div>
                    <GetBreakLine length={2}/>
                    <div className='text-center text-white'>
                        <h3 className='text-white mb-4'>About Animal</h3>
                        {
                            getLocal("edit_mode_animal") === 'true' ?
                                <ReactQuill value={animalDesc} onChange={(content, delta, source, editor) => {
                                    setAnimalDesc(editor.getHTML()); 
                                    setAnimalDescBackUp(content);
                                }}
                                style={{ height: '600px' }} />
                            :
                                <div className='desc-holder' dangerouslySetInnerHTML={{ __html: animalDesc }}></div>
                        }
                    </div>
                    <GetBreakLine length={2}/>
                </div>
            </>
        )
    }
}
  