import React, { useEffect, useState } from "react";





const Home = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [input, setInput] = useState("");
	const [searchName, setSearchName] = useState("");
	const [tasksByUser, setTasksByUser] = useState({});
	
	const [inputName, setInputName] = useState("");
	const [taskLabel, setTaskLabel] = useState("");
	console.log( "hola", tasksByUser)
        
	useEffect(() => {
	  fetch("https://playground.4geeks.com/todo/users")
		.then((res) => res.json())
		.then((data) => {
		  setUsers(data.users);
		  setFilteredUsers(data.users);
		})
		.catch((err) => console.log(err));
	}, []);      
  
	const deleteUser = (name) => {
	  const deleteConfirm = confirm(`estas seguro de borrar el usuario  ${name}`);
	  deleteConfirm
		? fetch(`https://playground.4geeks.com/todo/users/${name}`, {
			method: "DELETE",
		  })
			.then(() => setUsers(users.filter((user) => user.name !== name)))
			.catch((err) => console.log(err))
		: "";
	};
	const createUser = (e) => {             
	  e.preventDefault(); 
	  fetch(`https://playground.4geeks.com/todo/users/${input}`, {
		method: "POST",
		body: JSON.stringify(users),     
	  })
		.then(() => { 
		  if (input.trim() !== "") {
			setInput([...users, input]);
			setInput("");
		  }
		})
		.catch((err) => console.log(err));
	};
	const search = (e) => {
	  e.preventDefault();
  
	  if (searchName.trim() === "") {
		setFilteredUsers(users);
	  } else {
		const filtered = users.filter((user) =>
		  user.name.toLowerCase().includes(searchName.toLowerCase())
		);
		setFilteredUsers(filtered);
	  }
	};
  
	const handleKeyDown = (e) => {
	  if (e.key === "Enter") {
		createUser(e);
	  }
	};
	const handleKeyDown1 = (e) => {
	  if (e.key === "Enter") {
		search(e);
	  }
	}; 
	const agregarTarea = (e) => {
	  e.preventDefault();
    
	  if (!inputName || !taskLabel.trim()) {
		alert("Selecciona un usuario y escribe una tarea.");
		return;      
	  }
  
	  fetch(`https://playground.4geeks.com/todo/todos/${inputName}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ label: taskLabel, is_done: false }),
	  })
		.then((res) => res.json())
		.then((data) => {
		  setTasksByUser((prev) => ({ 
			...prev,
			[inputName]: [...(prev[inputName] || []), data],
		  }));
		  setTaskLabel("");
		})
		.catch((err) => console.log(err));
	};



	const eliminarTarea =(id)=>{  
		
		const deleteConfirm = confirm(`estas seguro de borrar el usuario  ${id}`);
		deleteConfirm
		  ? fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			  method: "DELETE",
			})
			.then(() => {
				setTasksByUser((prevTasks) => {
				  const updatedTasks = { ...prevTasks };
		  
				  // Buscar a qué usuario pertenece la tarea y eliminarla
				  Object.keys(updatedTasks).forEach((user) => {
					updatedTasks[user] = updatedTasks[user].filter((task) => task.id !== id);
				  });
		  
				  return updatedTasks;
				});
			  }) 
			  .catch((err) => console.log(err))
		  : "";

	}
  
	return (
	  <>
		<div className="row g-3 align-items-center">
		  <div className="col-auto">
			<label htmlFor="inputPassword3" className="col-form-label">
			  add new user
			</label>
		  </div>
		  <div className="col-auto">
			<input
			  value={input}
			  onKeyDown={handleKeyDown}
			  onChange={(e) => setInput(e.target.value)}
			  type="text"
			  id="inputPassword4"
			  className="form-control"
			  aria-describedby="passwordHelpInline"
			/>
		  </div>
		</div>
  
		<div className="row g-3 align-items-center">
		  <div className="col-auto">
			<label htmlFor="inputPassword5" className="col-form-label">
			  buscador
			</label>
		  </div>
		  <div className="col-auto">
			<input
			  value={searchName}
			  onKeyDown={handleKeyDown1}
			  onChange={(e) => {
				setSearchName(e.target.value);
				if (e.target.value === "") {
				  setFilteredUsers(users);
				}
			  }}
			  type="text"
			  id="inputPassword7"
			  className="form-control"
			  aria-describedby="passwordHelpInline"
			/>
		  </div>
		</div>
  
		<table
		  className="table table-striped table-hover mx-auto"
		  style={{ width: "600px", marginTop: "60px" }}
		>
		  <thead>
			<tr>
			  <th>Nombre</th>
			  <th>Acciones</th>
			</tr>
		  </thead>
		  <tbody>
			{filteredUsers?.map((u) => (
			  <tr className="mx-2" key={u.id}>
				<td>{u.name}</td>
				<td style={{ display: "flex", gap: "30px" }}>
				  <button
					onClick={() => deleteUser(u.name)}
					className="ml-4 bg-red-500  px-2 py-1 rounded"
				  >
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  width="16"
					  height="16"
					  fill="currentColor"
					  className="bi bi-trash3"
					  viewBox="0 0 16 16"
					>
					  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
					</svg>
				  </button>
				</td>
			  </tr>
			))}
		  </tbody>
		</table>
  
		<div>
		  <select
			onChange={(e) => setInputName(e.target.value)}
			class="form-select"
			aria-label="Default select example"
		  >
			<option selected>--- Seleccionar un Usuario---- </option>
			{users?.map((user) => (
			  <option key={user.name} value={user.name}>
				{" "}
				{user.name}{" "}
			  </option>
			))}
		  </select>
  
		  <input
			value={taskLabel}
			onChange={(e) => setTaskLabel(e.target.value)}
			className="bg-primary"
			type="text"
		  />
  
		  <button onClick={agregarTarea}>Agregar</button>
		</div>
		{Object.keys(tasksByUser)?.map((user) => (
		  <div key={user} className="mt-4">
			<h2>Tareas de: {user}</h2>
			
			<ul className="list-group">
			  {tasksByUser[user].map((todo) => (
				<li key={todo.id} className="list-group-item">
				  {todo.label} <button onClick={()=>eliminarTarea(todo.id)} > elimi</button>
				</li>
				
			  ))}
			</ul>
		  </div>
		))}
	  </>
	);
  };


	

export default Home;
