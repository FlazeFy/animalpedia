"use client"
import React from 'react'
import { useState, useEffect } from "react"

import GetBreakLine from '@/components/others/breakLine'
import { getLocal } from '@/modules/storages/local'
import DeleteCatalog from '@/components/others/deleteCatalog'

export default function GetAnimalDetail({ctx,slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/animal/open/`+slug)
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
                <DeleteCatalog slug={item['animals_slug']} isDeleted={item['deleted_at'] == "" ? false : true} type="animal"/>
                <div className='pt-5'>
                    <div className='row my-4'>
                        <div className='col-lg-6 col-md-6 col-sm-12 text-center'>
                            <img className='img img-fluid rounded-circle' style={{maxWidth: "300px"}} src={item['animals_img_url']}/>
                            <h1 className='mb-1 mt-4'>{item['animals_name']}</h1>
                            <h5 className='fst-italic text-white'>{item['animals_latin_name']}</h5>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-12 text-start'>
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
                        </div>
                    </div>
                    <GetBreakLine length={2}/>
                    <div className='text-center text-white'>
                        <h3 className='text-white mb-4'>About Animal</h3>
                        <div className='desc-holder' dangerouslySetInnerHTML={{ __html: item['animals_desc'] }}></div>
                    </div>
                    <GetBreakLine length={4}/>
                </div>
            </>
        )
    }
}
  