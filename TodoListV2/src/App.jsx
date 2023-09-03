import './App.css'
import { useState, useEffect } from 'react';
import Task from './components/Task';
import saveTasks from "./functions/saveTasks";

function App() {
  const [tasks, setTasks] = useState([]);

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("regular")

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  
  const getTasks = () => {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  };
  

  const addNewTask = () => {
    const currentTasks = [...tasks];
    const newTask = {
      id: "id" + Date.now() + Math.random(),
      title,
      description,
      done: false,
      priority,
    };

    currentTasks.unshift(newTask);

    setTasks(currentTasks);
    saveTasks(currentTasks);

    setModalOpen(false);
    setTitle("");
    setDescription("");
  };



  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);
  


  return (
      <div 
      className='flex items-center justify-center h-screen bg-slate-950'>
        <div className=' flex flex-col h-2/3 w-1/2'>
          <div className='flex justify-between items-center mb-2.5'>
            <h1 className='text-slate-200 text-3xl '>Todo App</h1>
            <button onClick={openModal} className='py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500 text-sm'> 
            + Nova Tarefa
            </button>
          </div>
          <div className="flex flex-col  divide-y divide-slate-700 flex-grow h-full bg-slate-900 rounded-xl px-6 py-2.5">
            {tasks.map((task, index) => {
              return (
                <Task 
                task={task} index={index} tasks={tasks} setTasks={setTasks} key = {task.id}  />
                );
            })}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-slate-200 text-xl mb-4">Nova Tarefa</h2>
              <input 
                type="text" 
                className="border border-slate-700 text-slate-200 mb-4 p-2 w-full rounded-lg bg-transparent focus:outline-none focus:border-slate-600" 
                placeholder="Título da Tarefa" 
                value = {title}
                onChange= {(e) => {
                  setTitle(e.target.value);
                }}
                />
              <textarea 
                rows={3}
                className="border border-slate-700 text-slate-200 mb-4 p-2 w-full rounded-lg bg-transparent focus:outline-none focus:border-slate-600" 
                placeholder="Descrição da Tarefa"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}>
              </textarea>
              <div className='flex flex-col mb-4'>
                <label htmlFor="priority"
                className='text-slate-400 mb-1  text-sm '>
                  Prioridade:
                </label>
                <select id="priority"
                className='  border  border-slate-700 rounded-lg p-2 bg-transparent text-slate-400 focus:outline-none  focus:border-slate-600'
                onChange={(e) => setPriority(e.target.value)}
                value={priority}>
                <option value="regular">😎 Normal</option>
                <option value="important">❗ Importante</option>
                <option value="urgent">🚨 Urgente</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={closeModal} 
                  className="text-sm py-1.5 px-3 rounded-lg border border-red-500 text-red-500">
                  Cancelar
                </button>
          <button 
          className="text-sm py-1.5 px-3 rounded-lg border border-emerald-500 text-emerald-500 ml-2"
          onClick={addNewTask}>
            Adicionar
          </button>
          </div>
        </div>
      </div>
  )};
      </div>
    
  );
};

export default App;
