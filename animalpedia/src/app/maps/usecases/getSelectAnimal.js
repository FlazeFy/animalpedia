import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetSelectAnimal({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    //Default config
    const keyPage = sessionStorage.getItem("Table_Animal")

    if(keyPage == null){
        sessionStorage.setItem("Table_Animal", "1");
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/animal/asc?page=${keyPage}`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data.data)        
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
            <div className=''> 
                {
                    items.map((data, i, idx) => {
                        return (
                            <button onClick={(e)=> {storeLocal('search_animal',data['animals_slug']); window.location.reload()}} className='select-animal-box' key={i} style={{border: getLocal('search_animal') == data['animals_slug'] ? '2px solid var(--successBG)' : ''}}>
                                <div className="d-flex justify-content-start">
                                    <div className='me-2'>
                                        <img className="img img-fluid rounded-circle" style={{width:"60px"}} src={data['animals_img_url'] != "" ? data['animals_img_url'] : "http://localhost:3000/assets/icons/no_image_animal.png"}></img>
                                    </div>
                                    <div className='py-1'>
                                        <h6 className='mb-0'>{data['animals_name']}</h6>
                                        <p style={{fontSize:"var(--textMD)"}} className='mb-0 text-white fst-italic'>{data['animals_latin_name']}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })
                }
            </div>
        )
    }
}
  