"use client"
import React from 'react'
import { useState, useEffect } from "react"

import GetBreakLine from '@/components/others/breakLine'
import GetButtonTag from '@/components/buttons/tag'
import DeleteCatalog from '@/components/others/deleteCatalog'
import RecoverCatalog from '@/components/others/recoverCatalog'

export default function GetNewsDetail({ctx,slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/news/open/`+slug)
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
        const tags = JSON.parse(item['news_tag'])

        return (
            <>
                <DeleteCatalog slug={item['news_slug']} isDeleted={item['deleted_at'] == "" ? false : true} type="news"/>
                {
                    item['deleted_at'] != "" ? <RecoverCatalog slug={item['news_slug']} type="news"/> : <></>
                }
                <div className='pt-5 text-center'>
                    <img className='img img-fluid' style={{maxWidth: "720px", borderRadius:"var(--roundedJumbo)"}} src={item['news_img_url']}/>
                    <h1 className='mb-1 mt-4'>{item['news_name']}</h1>
                    <a className='btn btn-secondary rounded-pill' style={{fontSize:"var(--textXMD)"}}>{item['news_time_read']} min to read</a>
                    <GetBreakLine length={3}/>
                    <div className='text-center text-white'>
                        <div className='desc-holder' dangerouslySetInnerHTML={{ __html: item['news_body'] }}></div>
                    </div>
                    <GetBreakLine length={2}/>
                    <h5 className='text-white mb-4'>Related Tag</h5>
                    {
                        tags.map((val, i) => {
                            return (
                                <GetButtonTag slug={"/news/tags/"+val['slug_name']} name={val['tag_name']}/>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
  