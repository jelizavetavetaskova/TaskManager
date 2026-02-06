import type Task from "../types/Task.ts";

type TaskItemProps = {
    task: Task;
    onToggle: (task: Task) => void;
    onDelete: (id: number) => void
}

export default function TaskItem({task, onToggle, onDelete}: TaskItemProps) {

    const base: string = "flex items-center justify-between gap-3 border rounded-xl bg-zinc-950/40 px-3 " +
        "py-2 ring-1 ring-zinc-800";
    const done: string = task.completed ? " line-through opacity-60" : "";

    return (
        <li className={base + done}>
            <div className="flex items-center gap-3 min-w-0">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task)}
                    className="h-4 w-4 accent-indigo-500"
                />

                <span className="truncate">{task.title}</span>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="text-sm text-zinc-400 hover:text-red-400 transition cursor-pointer"
            >
                Delete
            </button>
        </li>
    )
}

