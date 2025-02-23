import React, { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";



const AllUsers = ({user}) => {
    const [name, setName] = useState([]);
//        // Función para eliminar una tarea
  const handleDeleteName = (name) => {
    setName((prev) => prev.filter((u) => u.name !== name));
  };

  // Obtener las tareas (todos) de cada usuario
  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${name}`)
    .then(res=>res.json())
    .then(data => setName(data.users))
    .catch(err=> console.log(err))
    // if (user) {
    //   const fetchTodos = async () => {
    //     const todosData = await Promise.all(
    //       user.map(async (u) => {
    //         return response.json();
    //       })
    //     );
    //     setTodos(todosData.flat()); // Aplanar el array de arrays
    //   };

    //   fetchTodos();
    // }
  }, []);


   
 console.log( "USER",  name)
    return (
        <table className="table table-striped table-hover mx-auto" style={{ width: "600px", marginTop: "60px" }}>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Acciones</th> 
    </tr>
  </thead>
  <tbody>
    {user?.map(u => (
      <tr className="mx-2" key={u.id}>
        <td>{u.name}</td>
        <td style={{ display: "flex", gap: "30px" }} > 
           <EditUser  />
           <DeleteUser name={u.name} onDelete={handleDeleteName} />
        </td>
      </tr>
    ))}
  </tbody>
</table>
    );
  };
  
  export default AllUsers;
  //     <table className="table table-striped table-hover mx-auto " style={{width:"600px",marginTop:"60px"}}>
  //     <thead>
  //       <tr>
  //         <th>Nombre</th>
  
  //       </tr>
  //     </thead>
  //     <tbody>
  //     { user?.map( u=> 
    //       <tr key={u.id} >
    //         <td> {u.name}  </td>
    //         <DeleteUser/>
    //         <EditUser/>
    
    //       </tr>  )}
    //     </tbody>
    //   </table>
    
    // {/* Pasar el todoId y la función onDelete */}
    // {todos
    //    .filter((todo) => todo.user_id === u.id)
    //    .map((todo) => (
    //      <DeleteUser key={todo.id} todoId={todo.id} onDelete={handleDeleteTodo} />
    //    ))}