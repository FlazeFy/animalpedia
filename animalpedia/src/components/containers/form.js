import GetLabel from '@/components/labels/label'
import form from './form.module.css'

export default function GetFormTemplate({type, props}) {
    if (type == "single-line"){
        return (
            <div className={form.mainBox} style={{ width: '75%' }} key={type}>
                <div className='row'>
                    {props.map((elmt, idx) => {
                        if (elmt.type === 'input-text') {
                            return (
                                <div className='col-lg-4 col-md-6 col-sm-12 text-start' key={idx}>
                                    <GetLabel title={elmt.label} type="input"/>
                                    <input placeholder={elmt.placeholder}
                                        className={elmt.class + " w-100"} 
                                        onChange={elmt.handleChange}
                                    />
                                    <GetLabel title={elmt.errorMsg} type="error"/>
                                </div>
                            )
                        } else if (elmt.type === 'submit') {
                            return (
                                <div className='col-lg-4 col-md-6 col-sm-12' key={idx}>
                                    <button className={elmt.class + " w-100 h-75 mt-2"} 
                                        onClick={elmt.handleClick}>{elmt.label}</button>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        )
    } else {
        return null
    }
}