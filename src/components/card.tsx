import circle from "../assets/circle.svg"
import circleCheck from "../assets/circle-check.svg"
import trash from "../assets/trash.svg"
import { useState } from "react"

interface CardProps {
    id: number;
    content: string;
    isDone: boolean;
    onDeleteTask: (id: number) => void;
    onCompleteTask: (id:number, content:string) => void;
  }

export function Card ({ id, content, isDone, onDeleteTask, onCompleteTask }: CardProps) {
    const [completed, setCompleted] = useState(isDone)
    
    function handleDeleteTask () {
        onDeleteTask(id)
    }

    function handleCompleteTask () {
        setCompleted(!completed)
        onCompleteTask(id, content)
    }

    return (
        <div className="flex items-start gap-4 bg-gray-500 p-4 rounded-lg border border-gray-400">
            <img 
                src={completed ? circleCheck : circle} 
                className={`rounded-full hover:brightness-75 cursor-pointer ${completed ? "hover:brightness-125 pointer-events-none" : ""}`}
                onClick={handleCompleteTask}
            />
            <p className={`text-sm text-justify text-gray-100 flex-1 ${completed ? "text-gray-300 line-through" : ""}`}>{content}</p>
            <img src={trash} onClick={handleDeleteTask} className="p-1 rounded-md grayscale hover:grayscale-0 hover:bg-gray-400 cursor-pointer" />
        </div>
    )
}