import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Addnote } from './components/Addnote';
import { Note } from './components/Note';
import NoteContext from './context/noteContext';
import Alert from './components/Alert';

// to get the data from LS
const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  if (list) {
      return JSON.parse(localStorage.getItem('lists'));
  } else {
      return [];
  }
}

function App() {
  const [items, setItems] = useState(getLocalItmes())
  const [alert, setAlert] = useState(null)

  const showAlert =(message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null)
    }, 2500)
 }

  const addItem =(inputData)=>{
    if (!inputData.title) {
      // alert('Hey Dude! You gotta fill the data.');
      showAlert("Hey Dude! You gotta fill the data.", "danger")
  }
  else {
    const allInputData = { id: new Date().getTime().toString(), name:inputData }
    setItems([...items, allInputData]);
    showAlert("Your Note is Added", "success")
  }
}

 const onDelete=(index)=>{
  let verify = window.confirm("Do you want to delete this Note?")
  if(verify){
    const updateItems = items.filter((elem)=>{
      return index !== elem.id
    })
    setItems(updateItems);
    showAlert("Your Note is deleted", "success")
  }
  else{
    showAlert("Note not deleted", "danger")
  }
 }







//                       ----------Updating Modal-------------
 const ref = useRef(null)
 const refClose = useRef(null)
  const [note, setNote] = useState({etitle: "", edescription: ""})
  const [isEditItem, setIsEditItem] = useState(null)

  const updateNote=(elem)=>{
    ref.current.click();
    setNote({etitle: elem.name.title, edescription: elem.name.description})
  }

 const onChange=(e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }
    
    const handleClick=()=>{
      setItems(
        items.map((elem)=>{
          if(elem.id === isEditItem){
            elem.id = isEditItem;
            elem.name.title = note.etitle
            elem.name.description = note.edescription
          }
          return elem;
        })
      )
      refClose.current.click()
      showAlert("Your Note is Updated", "success")
    }

  const editItem = async (ide)=>{
    setIsEditItem(ide)
  }








   // add data to localStorage
 useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(items))
}, [items]);

  return (
    <NoteContext.Provider value={{items, addItem}}>
    <Alert alert={alert}/>



                                                  {/* -----------Modal--------- */}
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch</button>
     
 <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div className="modal-dialog">
     <div className="modal-content modalUpdate">
       <div className="modal-header">
         <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div className="modal-body">
         <form>
           <div className="mb-3">
             <label htmlFor="title" className="col-form-label" style={{fontSize: "20px"}}>Title:</label>
             <input type="text" className="form-control updateInput" name='etitle' id="etitle" value={note.etitle} onChange={onChange}/>
           </div>
           <div className="mb-3">
             <label htmlFor="description" className="col-form-label" style={{fontSize: "20px"}}>Description:</label>
             <textarea rows={15} className="form-control updateTextarea" id="edescription" name='edescription' value={note.edescription} onChange={onChange}></textarea>
           </div>
         </form>
       </div>
       <div className="modal-footer">
         <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
       </div>
     </div>
   </div>
 </div>



    <div className="container text-center my-5">
      <div className='my-5 heading'>
        <p>Just A Simple Notes Saving App</p>
      </div>

      <div className="row">
        <div className="col-12 col-md-8" style={{marginBottom: "100px"}}>
          <Addnote passNote={addItem}/>
        </div>
        <div className="col-12 col-md-4">
          {
            items.map((elem)=>{
              return(
                <div key={elem.id}>
                  <Note
                  title={elem.name.title}
                  description={elem.name.description.slice(0, 200)}
                  id={elem.id}
                  deleteItem={onDelete}
                  updateNote={updateNote}
                  editItem={editItem}
                  elem={elem}
                  />
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
    </NoteContext.Provider>
  );
}

export default App;
