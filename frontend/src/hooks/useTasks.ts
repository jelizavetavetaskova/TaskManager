import type Task from "../types/Task.ts";
import {useCallback, useEffect, useState} from "react";
import {createTask, deleteTask, getTasks, updateTask} from "../api/tasks.ts";

export function useTasks(query: string) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (e: unknown) => {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("Unknown error");
        }
    }

    const doLoad = useCallback(async (query: string) => {
            setLoading(true);
            setError(null);

            try {
                const data = await getTasks(query);
                setTasks(data);
            } catch (e) {
                handleError(e);
            } finally {
                setLoading(false);
            }
    }, []);


    useEffect(() => {
        void doLoad(query);
    }, [doLoad, query])

    const reload = async () => {
        await doLoad(query);
    }

    const addTask = async (title: string) => {
        setError(null);

        try {
            await createTask(title);
            await doLoad(query);
        } catch (e) {
            handleError(e);
        }
    }

    const toggleCompleted = async (id: number) => {
        setError(null);

        const task = tasks.find(t => t.id === id);
        if (task === undefined) return;

        const updated = {
            ...task,
            completed: !task.completed
        }

        try {
            const upd: Task = await updateTask(updated);
            setTasks(prev => prev.map(t => t.id === upd.id ? upd : t));
        } catch (e) {
            handleError(e);
        }
    }

    const removeTask = async (id: number) => {
        setError(null);
        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
        } catch (e) {
            handleError(e);
        }
    }

    return {
        tasks, loading, error,
        reload, addTask, toggleCompleted, removeTask
    }
}