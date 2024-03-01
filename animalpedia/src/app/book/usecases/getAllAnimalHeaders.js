import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

// Components
import GetAnimalHeaderContainer from '@/components/containers/animal_header'

export default function GetAllAnimalHeader({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_Animal")
        const keyOrder = sessionStorage.getItem("Table_order_Animal")

        if(keyPage == null){
            sessionStorage.setItem("Table_Animal", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_Animal", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/animal/${keyOrder}?page=${keyPage}`)
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
            <div className='row'> 
                 {
                    items.map((data, i, idx) => {
                        return (
                            <div className='col-lg-3 col-md-4 col-sm-12 mx-auto' key={i}>
                                <GetAnimalHeaderContainer builder={data}/>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
  