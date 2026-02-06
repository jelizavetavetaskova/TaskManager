import {useEffect, useState} from 'react'
import './App.css'
import type Task from "./types/Task.ts";
import {createTask, deleteTask, getTasks, updateTask} from "./api/tasks.ts";
import TaskList from "./components/TaskList.tsx";
import TaskForm from "./components/TaskForm.tsx";
import SearchBar from "./components/SearchBar.tsx";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [query, setQuery] = useState("");
    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    const handleError = (e: unknown) => {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("Unknown error");
        }
    }

    const q: string = query.trim();
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTasks(q);
                setTasks(data);
            } catch (e) {
                handleError(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [q]);

    const addTask = async () => {
        setError(null);

        try {
            const task: Task = await createTask(title);
            setTasks(prev => [...prev, task]);
            setTitle("");
        } catch (e) {
            handleError(e);
        }
    }

    const complete = async (task: Task) => {
        setError(null);

        const updated = {
            ...task,
            completed: !task.completed
        };

        try {
            const upd: Task = await updateTask(updated);
            setTasks(prev => prev.map(t => t.id === upd.id ? upd : t));
        } catch (e) {
            handleError(e);
        }
    }

    const removeTask = async (id: number) => {
        setError(null);

        const deleteConfirm: boolean = confirm("Delete task?");

        if (deleteConfirm) {
            try {
                await deleteTask(id);
                setTasks(prev => prev.filter(t => t.id !== id));
            } catch (e) {
                handleError(e);
            }
        }

    }

    return (
            <div className="w-full max-w-md rounded-2xl bg-zinc-900/60 p-6 shadow-lg ring-1 ring-zinc-800
                            backdrop-blur">

                {error ? (<p className="mb-4 rounded-xl bg-red-500/10 text-red-300 ring-1 ring-red-500/20 px-3 py-2 text-sm">There is an error: {error}</p>) : ""}
                <h1 className="text-2xl font-semibold tracking-tight mb-4">Tasks</h1>

                {loading && (<p className="text-zinc-400 text-sm mb-3">Loading...</p>)}

                <SearchBar
                query={query}
                onQueryChange={setQuery}
                />

                <TaskForm
                    title={title}
                    onTitleChange={setTitle}
                    onSubmit={addTask}
                />

                <TaskList
                    tasks={tasks}
                    query={q}
                    onToggle={complete}
                    onDelete={removeTask}
                />

            </div>
    )
}

export default App
