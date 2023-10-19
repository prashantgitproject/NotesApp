import React from 'react'

export const Note = (props) => {

  const deleteNote=()=>{
    props.deleteItem(props.id)
  }

  return (
    <>
    <div className="card mt-2" style={{width: "18rem"}}>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <i className="fa-solid fa-trash fa-xl mx-2 btn" onClick={deleteNote}></i>
            <i className="fa-solid fa-pen-to-square fa-xl mx-2 btn"></i>
        </div>
    </div>
    </>
  )
}
