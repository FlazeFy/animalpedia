"use client"
import React from 'react'
import { useState, useEffect } from "react"
import { getLocal } from '@/modules/storages/local'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { convertDatetime } from '@/modules/helpers/converter'
import GetBreakLine from './breakLine'

export default function GetContentComment({type,slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/comment/`+type+'/'+slug+'?page=1')
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
            <>
                {
                    items != null ?
                        items.map((data, i, idx) => {
                            return (
                                <div className='comment-box' key={i}>
                                    <h6 className='mb-0'><FontAwesomeIcon icon={faUser}/> {data['created_by']}</h6>
                                    <a style={{fontSize:"var(--textMD)"}}>at {convertDatetime(data['created_at'],'calendar')}</a>
                                    <GetBreakLine length={2}/>
                                    <p className='mb-0'>{data['comments_body']}</p>
                                </div>
                            );
                        })
                    :
                        <>
                            <img className='img-msg' style={{maxWidth: "300px"}} src={"http://localhost:3000/assets/icons/no_data.png"}/>
                            <p>- No comment has found -</p>
                        </>
                }
            </>
        )
    }
}
  