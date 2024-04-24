import { useEffect, useState } from "react"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from "@/modules/storages/local"
import { removeHTMLTags, ucFirstChar } from "@/modules/helpers/converter"

export default function GetSelectedTag({tag, ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/news/tag/${tag}?page=1`)
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

    return (
        <>
            <h4 className="mt-3">Search by tag : 
                {
                    tag.split(',').map((tg, j, ins) => {
                        return (
                            <a className="btn btn-selected-tag ms-2" title="Remove filter">{tg} <span className="text-danger"><FontAwesomeIcon icon={faCircleXmark} size="lg"/></span></a>
                        );
                    })
                }
            </h4>
            <h5 className="text-white mt-4">News</h5>
            {
                items ? items.map((val, i, index) => {
                    return (
                        <div className="box-content-search" onClick={(e) =>window.location.href ="/news/"+val['news_slug']}>
                            <h6>{val['news_name']}</h6>
                            <p className="mb-1">{ucFirstChar(removeHTMLTags(val['news_body']))}</p>
                        </div>
                    );
                })
                : 
                    <p className="text-white" style={{fontSize:"var(--textXMD)"}}>- No content found! -</p>
            }
            <h5 className="text-white mt-4">Animals</h5>
        </>
    )
}