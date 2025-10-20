import { useState } from "react";
import {v4 as uuidv4} from 'uuid'
uuidv4();

export default function TodoList(){
    let [todos, setTodos] = useState([{ task:"Sample task", id:uuidv4() }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () =>{
    setTodos((prevTodos)=>{
        return [...prevTodos, {task: newTodo, id: uuidv4()}]
    });  

    setNewTodo("");
    };

    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id)=>{
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }



let toggleDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  let clearAll = () => {
    setTodos([]);
  };



   
    return (
        <div>
            <input placeholder="Add a task"  value={newTodo} onChange={updateTodoValue}/>
            <br></br>
            <br></br>
            <button onClick={addNewTask}>Add task</button>
            <br></br>
            <br></br>
            <br></br>

            <hr />
            <h4>Task Todo</h4>
            <ul>
                {
                    todos.map((todo)=>{
                        return <li key={todo.id}><span>{todo.task}</span> 
                        &nbsp; &nbsp; &nbsp;
                        <button onClick={()=>deleteTodo(todo.id)}> delete</button>
                        </li>
                    })
                }
            </ul>
                <br />
            <button onClick={clearAll}>Clear all</button>
        </div>
    );
}