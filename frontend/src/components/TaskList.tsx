import type Task from "../types/Task.ts";
import TaskItem from "./TaskItem.tsx";

type TaskListProps = {
    tasks: Task[];
    query: string;
    onToggle: (task: Task) => void;
    onDelete: (id: number) => void;
}

export default function TaskList({tasks, query, onToggle, onDelete}: TaskListProps) {
    return (
        tasks.length === 0 ?
            (query.trim().length >= 3 ? (<p>No results</p>) : (<p>No tasks yet</p>))
            :
            (<ul className="space-y-2">
                {tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    )
                )}
            </ul>)
    )
}