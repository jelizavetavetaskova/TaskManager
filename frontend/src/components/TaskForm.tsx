type TaskFormProps = {
    title: string;
    onTitleChange: (value: string) => void;
    onSubmit: (title: string) => Promise<void>;
}

export default function TaskForm({title, onTitleChange, onSubmit}: TaskFormProps) {
    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                placeholder="Enter task title..."
                value={title}
                onKeyDown={(k) => k.key === "Enter" ? onSubmit(title) : null}
                onChange={(e) => onTitleChange(e.target.value)}
                className="border rounded-xl bg-zinc-950/60 px-3 py-2 flex-1 text-zinc-100
                                 placeholder:text-zinc-500 ring-q ring-zinc-800 focus:outline-none focus:ring-2
                                 focus:ring-indigo-500 "
            />
            <button
                onClick={() => onSubmit(title)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-500
                                    active:bg-indigo-700 transition disabled:bg-indigo-400"
                disabled={title.trim().length === 0}
            >
                Add
            </button>
        </div>
    )
}