"use client"
import Axios from 'axios'

import React from 'react'
import { useState, useEffect } from "react"

import GetBreakLine from '@/components/others/breakLine'
import GetButtonTag from '@/components/buttons/tag'
import DeleteCatalog from '@/components/others/deleteCatalog'
import RecoverCatalog from '@/components/others/recoverCatalog'
import { getLocal } from '@/modules/storages/local'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import CustomToast from '@/components/modals/toast'

export default function GetNewsDetail({ctx,slug}) {
    //Initial variable
    const keyToken = getLocal("token_key")
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    // Editable
    const [body, setNewsBody] = useState("")
    const [backUp, setNewsBodyBackUp] = useState("")

    const [title, setNewsTitle] = useState("")
    const [timeRead, setNewsTimeRead] = useState("")

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/news/open/`+slug)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)       
                
                setNewsTimeRead(result.data['news_time_read'])
                setNewsTitle(result.data['news_name'])
                setNewsBody(result.data['news_body'])
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

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData()
            data.append('news_name', title)
            data.append('news_body', body)
            data.append('news_time_read', timeRead)
            
            const response = await Axios.put("http://127.0.0.1:1323/api/v1/news/by/"+slug, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${keyToken}`
                }
            })
            if(response.status != 200){
                window.location.reload(false)
                return response.data.message
            } else {
                toast.success(<CustomToast msg={title+" updated"} />)
            }
        } catch (error) {
            // setResMsgAll(error)
            toast.error(<CustomToast msg={error} />)
        }
    }

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
                {
                    getLocal("edit_mode_news") === 'true' ?
                        <button className='btn btn-success rounded-pill px-4 py-3 ms-3' onClick={handleSubmit}><FontAwesomeIcon icon={faFloppyDisk} size="xl"/> Save Changes</button>
                    :
                        <></>
                }
                <div className='pt-5 text-center'>
                    <img className='img img-fluid' style={{maxWidth: "720px", borderRadius:"var(--roundedJumbo)"}} src={item['news_img_url']}/>
                    {
                        getLocal("edit_mode_news") === 'true' ?
                            <div className='row mt-3 mb-1'>
                                <div className='col-lg-10 col-md-9 col-sm-9'>
                                    <lable className='text-white mb-1'>Title</lable>
                                    <input type="text" defaultValue={title} onChange={(e)=>setNewsTitle(e.target.value)} className="form-control"></input>
                                </div>
                                <div className='col-lg-2 col-md-3 col-sm-3'>
                                    <lable className='text-white mb-1'>Time Read</lable>
                                    <input type="number" min="1" max="360" defaultValue={timeRead} onChange={(e)=>setNewsTimeRead(e.target.value)}  className="form-control"></input>
                                </div>
                            </div>
                        :
                            <>
                                <h1 className='mb-1 mt-4'>{title}</h1>
                                <a className='btn btn-secondary rounded-pill' style={{fontSize:"var(--textXMD)"}}>{timeRead} min to read</a>
                            </>
                    }
                    <GetBreakLine length={ getLocal("edit_mode_news") === 'true' ? 1 : 3}/>
                    <div className='text-center text-white'>
                    {
                        getLocal("edit_mode_news") === 'true' ?
                            <ReactQuill value={body} onChange={(content, delta, source, editor) => {
                                setNewsBody(editor.getHTML()); 
                                setNewsBodyBackUp(content);
                            }}
                            style={{ height: '600px' }} />
                        :
                            <div className='desc-holder' dangerouslySetInnerHTML={{ __html: body }}></div>
                    }
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
  