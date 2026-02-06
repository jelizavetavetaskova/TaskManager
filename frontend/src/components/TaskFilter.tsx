type TaskFilterProps = {
    filter: "all"|"active"|"completed";
    onChange: (next: "all"|"active"|"completed") => void;
}

export default function TaskFilter({filter, onChange}: TaskFilterProps) {
    const base: string = "mx-3 mb-3 border p-3 rounded-xl w-25 cursor-pointer";
    const bg_base: string = " bg-zinc-950/40";
    const bg_active: string = " bg-zinc-800";

    return (
        <div>
            <button onClick={() => onChange("all")} className={filter === "all" ? base + bg_active : base + bg_base}>All</button>
            <button onClick={() => onChange("active")} className={filter === "active" ? base + bg_active : base + bg_base}>Active</button>
            <button onClick={() => onChange("completed")} className={filter === "completed" ? base + bg_active : base + bg_base}>Completed</button>
        </div>
    )
}