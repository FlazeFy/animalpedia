import React, { useEffect, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import Axios from 'axios'

// Component
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'
import modal from '../../../components/modals/modals.module.css'
import GetFormTemplate from '@/components/containers/form'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faXmark } from "@fortawesome/free-solid-svg-icons"
import { storage } from '@/modules/configs/firebase'

export default function PostNews({ctx}) {
    //Initial variable
    const [newsName, setNewsName] = useState("")
    const [newsImgUrl, setNewsImgUrl] = useState(null)
    const [newsBody, setNewsBody] = useState("")
    const [newsTimeRead, setNewsTimeRead] = useState(0)

    const [resMsgNewsName, setResMsgNewsName] = useState("")
    const [resMsgNewsBody, setResMsgNewsBody] = useState("")
    const [resMsgNewsImgUrl, setResMsgNewsImgUrl] = useState("")
    const [resMsgNewsTimeRead, setResMsgNewsTimeRead] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'News Name',
            placeholder: 'Type news name',
            is_required: true,
            is_obsecure: false,
            maxLength: 75,
            handleChange: (event) => {
                setNewsName(event.target.value)
            },
            errorMsg: resMsgNewsName
        },
        {
            type: 'upload',
            class: 'form-control',
            label: 'News Image',
            is_required: true,
            maxLength: 500,
            handleChange: (event) => {
                event = event.target.files[0]

                if (event == null) return;
                    const imageRef = ref(storage, `news/${event.name + v4()}`)
                    uploadBytes(imageRef, event).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((url) => {
                            setNewsImgUrl(url)
                        }
                    );
                });
            },
            errorMsg: resMsgNewsImgUrl,
        },
        {
            type: 'text',
            class: 'form-control',
            label: 'News Body',
            placeholder: 'Type news body',
            is_required: true,
            is_obsecure: false,
            maxLength: 144,
            handleChange: (event) => {
                setNewsBody(event.target.value)
            },
            errorMsg: resMsgNewsBody
        },
        {
            type: 'number',
            class: 'form-control',
            label: 'News Time Read',
            placeholder: 'Type news time read',
            is_required: true,
            is_obsecure: false,
            maxLength: 36,
            handleChange: (event) => {
                setNewsTimeRead(event.target.value)
            },
            errorMsg: resMsgNewsTimeRead
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('news_name', newsName);
            data.append('news_img_url', newsImgUrl);
            data.append('news_tag', null);
            data.append('news_body', newsBody);
            data.append('news_time_read', newsTimeRead);
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/news", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            location.reload()

            if(response.data.status != 200){
                return response.data.message
            } else {
                return ""
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className={modal.manage_btn} data-bs-toggle="modal" data-bs-target={"#addModal"+ctx}><FontAwesomeIcon icon={faAdd}/> {getCleanTitleFromCtx(ctx)}</button>
            <div className="modal fade" id={"addModal"+ctx} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{getCleanTitleFromCtx(ctx)}</h5>
                            <button type="button" className={modal.btn_close_modal} data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faXmark}/></button>
                        </div>
                        <div className="modal-body">
                            <GetFormTemplate type={"single-line"} props={builder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}