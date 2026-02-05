import {useEffect, useState} from 'react'
import './App.css'
import type Task from "./Task.ts";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");

    const addTask = async () => {
        if (!title.trim()) {
            console.error("Title cannot be blank");
            return;
        }

        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: title.trim()}),
        })

        if (!response.ok) {
            const text = await response.text();
            console.error("POST failed: ", response.status, text);
            return;
        }

        const created = await response.json();
        setTasks(prev => [...prev, created]);
        setTitle("");
    }

    const complete = async (task: Task) => {
        const updated = {
            ...task,
            completed: !task.completed
        };

        const response = await fetch("/api/tasks/" + task.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated),
        })

        if (!response.ok) {
            const text = await response.text();
            console.error("POST failed: ", response.status, text);
            return;
        }

        const upd = await response.json();

        setTasks(prev => prev.map(t => t.id === upd.id ? upd : t))

    }

    const removeTask = async (id: number) => {
        const deleteConfirm: boolean = confirm("Delete task?");

        if (deleteConfirm) {
            const response = await fetch("/api/tasks/" + id, {
                method: "DELETE"
            })

            if (!response.ok) {
                const text = await response.text();
                console.error("POST failed: ", response.status, text);
                return;
            }

            setTasks(prev => prev.filter(t => t.id !== id));
        }
    }

    useEffect(() => {
        fetch("/api/tasks")
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            });
    }, []);

    return (
            <div className="w-full max-w-md rounded-2xl bg-zinc-900/60 p-6 shadow-lg ring-1 ring-zinc-800
                            backdrop-blur">
                <h1 className="text-2xl font-semibold tracking-tight mb-4">Tasks</h1>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Enter task title..."
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)}
                        className="border rounded-xl bg-zinc-950/60 px-3 py-2 flex-1 text-zinc-100
                                 placeholder:text-zinc-500 ring-q ring-zinc-800 focus:outline-none focus:ring-2
                                 focus:ring-indigo-500"
                    />
                    <button
                        onClick={addTask}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-500
                                    active:bg-indigo-700 transition"
                    >
                        Add
                    </button>
                </div>

                <ul className="space-y-2">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className={task.completed ?
                                "flex items-center justify-between gap-3 border rounded-xl bg-zinc-950/40 px-3 " +
                                "py-2 ring-1 ring-zinc-800 line-through opacity-60"
                                : "flex items-center justify-between gap-3 border rounded-xl bg-zinc-950/40 px-3 " +
                                "py-2 ring-1 ring-zinc-800"}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => complete(task)}
                                    className="h-4 w-4 accent-indigo-500"
                                />

                                <span className="truncate">{task.title}</span>
                            </div>

                            <button
                                onClick={() => removeTask(task.id)}
                                className="text-sm text-zinc-400 hover:text-red-400 transition cursor-pointer"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
    )
}

export default App
