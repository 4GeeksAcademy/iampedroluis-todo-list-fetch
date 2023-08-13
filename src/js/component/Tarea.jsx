import React, { useState, useEffect } from 'react'





const Tarea = () => {


    const [listItem, setListItem] = useState([])




    function enter(e) {
        let value = e.target.value.trim()

        if (e.key === 'Enter') {

            let str = e.target.value.trim()

            if (str === "") {
                alert("la tarea no puede estar vacia")
            } else {

                setListItem([...listItem, { "label": value, "done": false }])
                
                console.log(listItem)
                e.target.value = ""
            }



        }


    }

    useEffect(() => {
        cargartareas()
    },[])

    useEffect(() => {

        agregartarea()


    },[listItem])


    async function cargartareas() {

        try{
        let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/iampedroluis")
        if (!response.ok && response.status === 404) {
           await  crearUsuario()  
        }else{
        let data = await response.json()   
        setListItem(data)
        
        }


        }catch (error){
            console.error("Error Cargando tareas", error)
        }
        

      
    }

    async function agregartarea() {

        if (listItem.length !== 0) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(listItem)
            };  
            try {
                await fetch("https://playground.4geeks.com/apis/fake/todos/user/iampedroluis", requestOptions)
            } catch (error) {
                console.error("Error agregando tarea: ", error)
            }
            
        }
}

    async function crearUsuario(){
        const requestOptions =  {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify([])
        }
        try {
            await fetch("https://playground.4geeks.com/apis/fake/todos/user/iampedroluis", requestOptions)
        } catch (error) {
            console.error("Error Creando usuario: ", error)
        }
        
        
    }



    const deleteitem = (deleteitem) => {
        
        const newList = listItem.filter((el) => el.label !== deleteitem.label)

        setListItem(newList);
        


    }
    const deleteall = () => {
        setListItem([]);
        


    }

    let lista = listItem.map((el, index) => (
    <div id="item">
        <li 
        className='d-flex justify-content-between' 
        key={index}>
        <p 
        className='mt-4 ms-4'>
        {el.label}
        </p> 
        <a 
        className='mt-3 pt-2' 
        href='#' 
        role='button' 
        onClick={() => deleteitem(el)}>
        <i id='poke' className="fa-solid fa-delete-left"></i></a></li></div>))





    return (
    <div className='mt-5'>
        <div className='d-flex justify-content-end me-5'>
        <button type="button" onClick={deleteall} class="btn btn-outline-dark deleteall">Delete All</button>
            
        </div>
    
            <h1 className='pt-5'>TODO LIST</h1>
            <div className='container' id='container-lista'>
            <div className='' id='container-input'> 
            <input  className="mt-4" type="text" onKeyDown={enter} placeholder='Algo para anotar?' />
            </div>

            <div className='' id='container-items'>
            <ul>
                    {listItem.length === 0 ? "no hay tareas" : lista}
                    <hr />
                </ul>

            </div>
            <div className='d-flex justify-content-start text-light ps-4 pt-2' id='poke-list-foot'><p>List Items</p><p id='numberlist'>{listItem.length}</p></div>
            </div>

        </div>
    )
}

export default Tarea;
