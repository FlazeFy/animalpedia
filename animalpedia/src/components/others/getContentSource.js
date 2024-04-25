"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { getLocal } from '@/modules/storages/local'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

export default function GetContentSource({type,slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/sources/`+type+'/'+slug)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)    
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
            <>
                {
                    items != null ?
                        items.map((data, i, idx) => {
                            return (
                                <div className='mb-1' ><a style={{textDecoration:"none", color:"var(--primaryColor)"}} href={data['sources_url']}><FontAwesomeIcon icon={faLink}/> {data['sources_title'] != "" ? data['sources_title'] : data['sources_url']}</a></div>
                            );
                        })
                    :
                        <>
                            <img className='img-msg' style={{maxWidth: "300px"}} src={"http://localhost:3000/assets/icons/no_data.png"}/>
                            <p>- No source has found -</p>
                        </>
                }
            </>
        )
    }
}
  