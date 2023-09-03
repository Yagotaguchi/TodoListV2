import React from "react";
import { TrashIcon } from '@radix-ui/react-icons';
import saveTasks from "../functions/saveTasks";


export default function Task({ task, index, tasks, setTasks }){
    const deleteTask = (index) => {
        const currentTasks = [...tasks];
        currentTasks.splice(index, 1,)
        setTasks(currentTasks);
        saveTasks(currentTasks);
      };
    
      const changeTaskStatus = (index) => {
        const currentTasks = [...tasks];
        const taskToUpdate = currentTasks.at(index);
        taskToUpdate.done =! taskToUpdate.done;
        currentTasks.splice(index, 1, taskToUpdate);
        setTasks(currentTasks);
      };


    return (
    <div
    className={`${task.done ? "opacity-50" : ""} flex items-center justify-between text-slate-200 text-sm py-2.5`} 
      >
      <div className='flex flex-grow items-center gap-6'>
        <input 
        type="checkbox" 
        className='scale-150'
        onChange={() => {changeTaskStatus(index); 
        }}
        value = {task.done}
        checked = {task.done}
        />
        <div className="w-1/3">
          <p className='text-medium'>{task.title}</p>
          <p className='text-slate-400'>{task.description}</p> 
        </div>
        <div className= {`${task.priority === "urgent" ? "bg-red-900/50 text-slate-200" : task.priority === "important" ?  "bg-yellow-500/50 text-slate-200" : "bg-slate-700/50 text-slate-300"} py-1 px-2 rounded-full text-xs"`}>
        {task.priority === "urgent" ? "Urgente": task.priority === "important" ? "Importante" : "Normal"}
        </div>
      </div>
      <TrashIcon 
        role="button" 
        className='scale-150 text-red-400'
        onClick={() => {deleteTask(index)}}/>
    </div> 
    );
}
