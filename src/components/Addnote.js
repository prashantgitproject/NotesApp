import React, { useState } from 'react'

export const Addnote = (props) => {
    const [inputData, setInputData] = useState({
        title: '',
        description: ''
    });

    const onChange=(e)=>{
        setInputData({...inputData, [e.target.name]: e.target.value})
    }

    const addEvent=()=>{
      props.passNote(inputData);
      setInputData({
        title: '',
        description: ''      
      })  
    }

  return (

    <div>
        <div className="row">
            <div className="col-10">
                <input type="text" style={{width: "100%", padding: "7px"}} name='title' value={inputData.title} onChange={onChange}/>
            </div>
            <div className="col-2 d-flex justify-content-end">
                <div><i className="fa-solid fa-circle-plus fa-xl btn" style={{width: "100%"}} onClick={addEvent}></i> </div>
            
            </div>
        </div>
        <div>
            <textarea cols="30" rows="10" style={{padding: "10px", width: "100%"}} name="description" value={inputData.description} onChange={onChange}></textarea>
        </div>
    </div>
  )
}
