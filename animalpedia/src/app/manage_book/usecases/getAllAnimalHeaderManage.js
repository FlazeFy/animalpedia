import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllAnimalHeaderManage({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
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
                setMaxPage(result.data.last_page)
                setCurrPage(result.data.current_page)
                setItems(result.data.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setMaxPage(result.data.last_page)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    const builder = [
        {
            column_name: "Animal Name",
            object_name: "animals_name",
            extra_desc: null
        },
        {
            column_name: "Animals Region",
            object_name: "animals_region",
            extra_desc: null
        },
        {
            column_name: "Animals Zone",
            object_name: "animals_zone",
            extra_desc: null
        },
        {
            column_name: "Animals Status",
            object_name: "animals_status",
            extra_desc: null
        },
        {
            column_name: "Animals Category",
            object_name: "animals_category",
            extra_desc: null
        },
        {
            column_name: "Manage",
            object_name: null,
            extra_desc: null
        }
    ]

    if (error) {
        return <div><h2>{getCleanTitleFromCtx(ctx)}</h2> Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                <h2>{getCleanTitleFromCtx(ctx)}</h2>
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Animal"} urlDel={"http://127.0.0.1:1323/api/v1/animal/by/"}/>  
            </>
        )
    }
}