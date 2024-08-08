import React, {useState} from 'react';
import { useTodo } from '../../../contexts';

const TodoForm = () => {

    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();

        if (!todo) return

        addTodo({todo, completed: false});
        setTodo("");
    }

  return (
    <form onSubmit={add} className='flex'>
        <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
         type="text" 
         placeholder='Write todo...'
        className='w-full border border-black/10  rounded-l-lg px-3 outline-none duration-150 bg-white/5 py-1.5' />

        <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 shrink-0 text-white">
            Add
        </button>

    </form>
  )
}

export default TodoForm