import GetNewsContainer from '@/components/containers/news'
import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal } from '../../../modules/storages/local'

// Components

export default function GetAllNewsHeader({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/news/desc?page=1`)
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
                            <div key={i}>
                                <GetNewsContainer builder={data}/>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
  