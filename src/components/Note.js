import React from 'react'
// import { Noteupdate } from './Noteupdate'
// import noteContext from '../context/noteContext'

export const Note = (props) => {
  // const context = useContext(noteContext)
  // const {items} = context
  const { elem, updateNote, editItem, id } = props;
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
            <i type="button" className="btn fa-solid fa-pen-to-square fa-xl" onClick={()=>{updateNote(elem); editItem(id)}}></i>
        </div>
    </div>
    </>
  )
}
