import logo from './assets/Logo.svg'
import plus from './assets/plus.svg'
import clipboard from './assets/clipboard.svg'
import { Card } from './components/card'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface Task {
  id: number
  content: string
  isDone: boolean
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(localStorage.getItem("tasks")!) || [])
  const [todoCount, setToDoCount] = useState<number>(0)
  const [doneCount, setDoneCount] = useState<number>(0)
  const [textTyped, setTextTyped] = useState("")

  function onType (event: ChangeEvent<HTMLInputElement>) {
    const text = event.target.value
    setTextTyped(text)
  }
  
  function handleAddNewTask (event: FormEvent) {
    event.preventDefault()

    const newTask: Task = {
      id: tasks.length + 1,
      content: textTyped,
      isDone: false
    }

    setTasks([...tasks, newTask])
    setTextTyped("")
    console.log(tasks)
  }

  function deleteTask (id:number) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id
    })

    setTasks(tasksWithoutDeletedOne)
  }

  function completeTask (id:number, content: string) {
    const tasksWithoutCompletedOne = tasks.filter(task => {
      return task.id !== id
    })

    const completedTask: Task = {
      id: id,
      content: content,
      isDone: true
    }

    setTasks([...tasksWithoutCompletedOne, completedTask])
  }

  useEffect(() => {
    const todo:number = tasks.reduce((acc, currentValue) => {
      if(!currentValue.isDone) {
        return acc + 1
      } else {
        return acc
      }
    }, 0)

    const done:number = tasks.reduce((acc, currentValue) => {
      if(currentValue.isDone) {
        return acc + 1
      } else {
        return acc
      }
    }, 0)

    setToDoCount(todo)
    setDoneCount(done)

    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  
  return (
    <div>
      <header className="bg-gray-700 md:h-[12.5rem] h-44 flex items-center justify-center">
        <img src={logo} alt="Logo" />
      </header>

      <main className="max-w-[46rem] m-auto flex flex-col items-center mt-[-1.7rem] mb-6 md:px-0 px-4">
        <form className="flex gap-2 w-full flex-col sm:flex-row" onSubmit={handleAddNewTask}>
          <input
            type="text"
            placeholder="Create a new task"
            onChange={onType}
            value={textTyped}
            required
            className="flex-1 h-[3.375rem] rounded-lg bg-gray-500 text-center sm:text-left placeholder:text-gray-300 text-gray-100 outline-none focus:outline-purple p-4"
          />
          <button
            type="submit"
            className="h-[3.375rem] bg-blue-dark text-gray-100 text-sm rounded-lg outline-none focus:outline-purple p-4 flex items-center justify-center gap-2 hover:bg-blue transition-all"
          >
            Add
            <img src={plus} />
          </button>
        </form>

        <section className="w-full md:mt-16 mt-8">
          <div className="flex justify-between md:mb-6 mb-4">
            <p className="text-blue text-sm">
              <strong>To-Do</strong>
              <span className="bg-gray-400 py-1 px-2 ml-2 rounded-full text-gray-200 text-xs font-bold">
                {todoCount}
              </span>
            </p>
            <p className="text-purple text-sm">
              <strong>Done</strong>
              <span className="bg-gray-400 py-1 px-2 ml-2 rounded-full text-gray-200 text-xs font-bold">
                {doneCount}
              </span>
            </p>
          </div>

          {tasks.length == 0 ? (
            <div className="border-t border-gray-400 rounded-t-lg text-gray-300 text-center flex flex-col items-center">
              <img src={clipboard} alt="clipboard" className="mb-4 md:mt-16 mt-8" />
              <strong>You don't have any tasks created yet</strong>
              <p>Create tasks and organize your to-do list</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 h-[50vh] overflow-y-scroll">
              {
                tasks.filter(task => task.isDone == false).sort((a, b) => b.id - a.id).map(task => {
                return <Card key={task.id} id={task.id} content={task.content} isDone={task.isDone} onDeleteTask={deleteTask} onCompleteTask={completeTask}/>
              })}
              {
                tasks.filter(task => task.isDone == true).map(task => {
                return <Card key={task.id} id={task.id} content={task.content} isDone={task.isDone} onDeleteTask={deleteTask} onCompleteTask={completeTask}/>
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
