import { useEffect, useState } from "react";
import "./App.css";
import { Todoprovider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  let [todos, settodos] = useState([]);

  const addtodo = todo => {
    settodos(prevtodo => [{ id: Date.now(), ...todo }, ...prevtodo]);
  };

  //change
  const updatetodo = (id, todo) => {
    settodos(prevtodo =>
      prevtodo.map(value => (value.id === id ? todo : value))
    );
  };

  const deletetodo = id => {
    settodos(prevtodo => prevtodo.filter(value => value.id !== id));
  };

  const togglecomplete = id => {
    console.log(id);
    settodos(prev =>
      prev.map(value =>
        value.id === id ? { ...value, completed: !value.completed } : value
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Todoprovider
      value={{ todos, addtodo, updatetodo, deletetodo, togglecomplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map(todo => {
              return (
                <div className="w-full" key={todo.id}>
                  {/* {console.log(todo)} */}
                  <TodoItem todo={todo} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
