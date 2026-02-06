import {useState} from 'react'
import './App.css'
import TaskList from "./components/TaskList.tsx";
import TaskForm from "./components/TaskForm.tsx";
import SearchBar from "./components/SearchBar.tsx";
import TaskFilter from "./components/TaskFilter.tsx";
import {useTasks} from "./hooks/useTasks.ts";

function App() {
    const [title, setTitle] = useState("");
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<"all"|"active"|"completed">("all")
    const {tasks, loading, error, addTask, toggleCompleted, removeTask} = useTasks(query);

    const isSearching: boolean = query.trim().length >= 3;

    const visible = (() => {
        switch (filter) {
            case "all": {
                return tasks;
            }
            case "active": {
                return tasks.filter(t => !t.completed);
            }
            case "completed": {
                return tasks.filter(t => t.completed);
            }
        }
    })();

    const addTaskUI = async (title: string) => {
        await addTask(title);
        setTitle("");
    }

    const removeTaskConfirm = async (id: number) => {
        const deleteConfirm: boolean = confirm("Delete task?");

        if (deleteConfirm) {
            await removeTask(id);
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

                <TaskFilter
                    filter={filter}
                    onChange={setFilter}
                />

                <TaskForm
                    title={title}
                    onTitleChange={setTitle}
                    onSubmit={addTaskUI}
                />

                <TaskList
                    tasks={visible}
                    isSearching={isSearching}
                    onToggle={toggleCompleted}
                    onDelete={removeTaskConfirm}
                />

            </div>
    )
}

export default App
