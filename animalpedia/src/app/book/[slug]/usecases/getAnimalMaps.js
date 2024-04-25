"use client"
import { getLocal } from '@/modules/storages/local'
import React, { useEffect, useState } from 'react'
import WorldMap from 'react-svg-worldmap'

export default function GetAnimalMaps({slug}) {
    //Initial variable
    const keyToken = getLocal("token_key")
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/animal/country/`+slug)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                let data = []

                if(result.data){
                    result.data.forEach(el => {
                        data.push(
                            { 
                                country: el['countries_code'], 
                                value: el['total']
                            }
                        )
                    })
                }
                setItems(data) 
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
            <div className="mt-4" >
                <h3 className='text-white mb-4'>Location</h3>
                <WorldMap
                    value-suffix="people"
                    size="xxl"
                    data={item}
                />
            </div>
        )
    }
}
  