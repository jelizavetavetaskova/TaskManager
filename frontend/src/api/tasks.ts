import type Task from "../types/Task.ts";

export const getTasks = async (query?: string): Promise<Task[]> => {
    const url: string = (query && query.trim().length >= 3) ? "/api/tasks?query=" + query.trim() : "/api/tasks";

    const response = await fetch(url, {method: "GET"});
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return (await response.json()) as Task[];
}

export const createTask = async (title: string): Promise<Task> => {
    if (!title.trim()) {
        throw new Error("Title cannot be blank");
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
        throw new Error(text);
    }

    return (await response.json()) as Task;
}

export const updateTask = async (task: Task): Promise<Task> => {
    const response = await fetch("/api/tasks/" + task.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task),
    })

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }

    return (await response.json()) as Task;
}

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch("/api/tasks/" + id, {
        method: "DELETE"
    })

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
    }
}