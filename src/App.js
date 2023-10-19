import { useState, useEffect } from 'react';
import './App.css';
import { Addnote } from './components/Addnote';
import { Note } from './components/Note';

// to get the data from LS

const getLocalItmes = () => {
  let list = localStorage.getItem('lists');
  // console.log(list);

  if (list) {
      return JSON.parse(localStorage.getItem('lists'));
  } else {
      return [];
  }
}

function App() {
  const [items, setItems] = useState(getLocalItmes())

  const addItem =(inputData)=>{
    if (!inputData) {
      alert('plzz fill data');
  }
  else {
    const allInputData = { id: new Date().getTime().toString(), name:inputData }
    setItems([...items, allInputData]);
    // setInputData('')
  }
}

 const onDelete=(index)=>{
  const updateItems = items.filter((elem)=>{
    return index !== elem.id
  })
  setItems(updateItems);
 }


   // add data to localStorage
 useEffect(() => {
  localStorage.setItem('lists', JSON.stringify(items))
}, [items]);

  return (
    <>
    <div className="container text-center my-5">
      <div className="row">
        <div className="col-12 col-md-9 border">
          <Addnote passNote={addItem}/>
        </div>
        <div className="col-12 col-md-3 border">
          {
            items.map((elem)=>{
              return(
                <div key={elem.id}>
                  <Note
                  title={elem.name.title}
                  description={elem.name.description}
                  id={elem.id}
                  deleteItem={onDelete}
                  />
                </div>
              )
            })
          }
          
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
