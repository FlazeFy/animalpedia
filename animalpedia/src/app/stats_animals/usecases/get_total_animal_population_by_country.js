import GetBarChart from '@/components/charts/bar_chart'
import React from 'react'
import { useState, useEffect } from "react"

// Component
import GetPieChart from '../../../components/charts/pie_chart'
import { getCleanTitleFromCtx } from '../../../modules/helpers/converter'

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetTotalAnimalPopulationByCountry({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const filter_name = "Animal_Category"

    useEffect(() => {
        //Default config
        const keyLimit = sessionStorage.getItem(`Pie_limit_${filter_name}`)
        if(keyLimit == null){
            sessionStorage.setItem(`Pie_limit_${filter_name}`, 5);
        }

        fetch(`http://127.0.0.1:1323/api/v1/stats/animalpopcountry/DESC`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)
                const item = result.data
                storeLocal(ctx + "_sess",JSON.stringify(item))             
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
                <GetBarChart items={items} filter_name={null}/>
            </>
        )
    }
}
  