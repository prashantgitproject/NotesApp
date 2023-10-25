import React, { useRef, useState, useEffect } from 'react'

export const Addnote = (props) => {
    const textAreaRef = useRef(null)
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
    
    useEffect(() =>{
      textAreaRef.current.style.height = "auto"
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
    }, [inputData])

  return (
    <div className="container">
    <div className='backcolor textarea' style={{marginLeft: "-12px", marginRight: "-12px"}}>
        <div className="row ">
            <div className="col-10 ">
                <input type="text" className='backcolor rounded-3 addInput' style={{width: "100%", padding: "7px", borderStyle: "none"}} name='title' value={inputData.title} onChange={onChange} placeholder='Title'/>
            </div>
            <div className="col-2 d-flex justify-content-end pt-2">
                <div><i className="fa-solid fa-file-circle-plus fa-xl btn" style={{width: "100%"}} onClick={addEvent}></i> </div>
            
            </div>
        </div>
        <div className='mt-3 d-flex justify-content-start'>
            <textarea ref={textAreaRef} className='backcolor rounded-3 addTextArea' cols="30" rows="20" style={{padding: "10px", width: "85%", borderStyle: "none"}} name="description" value={inputData.description} onChange={onChange} placeholder='Enter your text here..'></textarea>
        </div>
    </div>
    </div>
  )
}
