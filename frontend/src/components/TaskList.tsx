import type Task from "../types/Task.ts";
import TaskItem from "./TaskItem.tsx";

type TaskListProps = {
    tasks: Task[];
    isSearching: boolean;
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => void;
}

export default function TaskList({tasks, isSearching, onToggle, onDelete}: TaskListProps) {
    return (
        tasks.length === 0 ?
            (isSearching ? (<p>No results</p>) : (<p>No tasks yet</p>))
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