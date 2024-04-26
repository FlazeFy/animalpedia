"use client"
import { ucFirstChar } from '@/modules/helpers/converter'
import { getLocal } from '@/modules/storages/local'
import React, { useEffect, useState } from 'react'
import WorldMap from 'react-svg-worldmap'

import $ from "jquery"

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faFileExport, faTrash } from "@fortawesome/free-solid-svg-icons"
import RemoveCountry from './removeCountry'

export default function GetAnimalMaps({slug}) {
    //Initial variable
    const keyToken = getLocal("token_key")
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/animal/country/`+slug)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                let data = []

                if(result.data){
                    result.data.forEach(el => {
                        data.push(
                            { 
                                id: el['id'],
                                country: el['countries_code'], 
                                value: el['total'],
                                country_name: el['countries_name']
                            }
                        )
                    })
                }
                setItems(data) 
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

    function addNewCountry(){
        $('#country_list').append(
            `<tr>
                <th scope="row">-</th>
                <td><input class='form-control' type="text" required></input></td>
                <td><input class='form-control' type="number" min="0" required></input></td>
                <td><button class='btn btn-success fw-bold' onClick="">Submit</button></td>
            </tr>`
        )
        $('#btn-submit-holder').empty().append(
            `<button class='btn btn-danger fw-bold' onClick="resetCountry()">Cancel</button>`
        )
    }
    let totalPop = 0
    
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
            <div className="mt-4" >
                <h3 className='text-white mb-4'>Location</h3>
                <div className='row'>
                    <div className='col'>
                        <WorldMap
                            value-suffix="people"
                            size={getLocal("edit_mode_animal") === 'true' ? "xl" : "xxl"}
                            data={items}
                        />
                    </div>
                        {
                            getLocal("edit_mode_animal") === 'true' ?
                                <div className='col'>
                                    <table className="table table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Country Name</th>
                                                <th scope="col" style={{width:"140px"}}>Total</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="country_list">
                                            {
                                                items.map((dt, i, idx) => {
                                                    totalPop += dt['value'] 
                                                    return (
                                                        <tr id={dt['id']}>
                                                            <th scope="row">{dt['country'].toUpperCase()}</th>
                                                            <td><input className='form-control' defaultValue={dt['country_name']} type="text" required></input></td>
                                                            <td><input className='form-control' defaultValue={dt['value']} type="number" min="0" required></input></td>
                                                            <td><RemoveCountry id={dt['id']}/></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            <tr>
                                                <td><button className='btn btn-success' onClick=""><FontAwesomeIcon icon={faFileExport} size="xl"/></button></td>
                                                <td className='fw-bold text-start'>Total</td>
                                                <td className='text-start fw-bold'>{totalPop}</td>
                                                <td><span id="btn-submit-holder"><button className='btn btn-success' onClick={(e) => addNewCountry()}>Add</button></span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            :
                                <></>
                        }
                    </div>
                </div>
        )
    }
}
  