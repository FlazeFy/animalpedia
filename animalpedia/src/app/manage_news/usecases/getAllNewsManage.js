import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetGeneralTable from '../../../components/table/general_table'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllNewsManage({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        //Default config
        const keyPage = sessionStorage.getItem("Table_News")
        const keyOrder = sessionStorage.getItem("Table_order_News")

        if(keyPage == null){
            sessionStorage.setItem("Table_News", "1");
        }
        if(keyOrder == null){
            sessionStorage.setItem("Table_order_News", "asc");
        }

        fetch(`http://127.0.0.1:1323/api/v1/news/${keyOrder}?page=${keyPage}`)
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
            column_name: "News Image",
            object_name: "news_img_url",
            extra_desc: null,
            type_content: "image"
        },
        {
            column_name: "News Name",
            object_name: "news_name",
            extra_desc: null
        },
        {
            column_name: "News Tag",
            object_name: "news_tag",
            extra_desc: null,
            type_content: "tag"
        },
        {
            column_name: "News Body",
            object_name: "news_body",
            extra_desc: null,
            type_content: "html"
        },
        {
            column_name: "News Time Read",
            object_name: "news_time_read",
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
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"News"} urlDel={"http://127.0.0.1:1323/api/v1/news/by/"}/>  
            </>
        )
    }
}