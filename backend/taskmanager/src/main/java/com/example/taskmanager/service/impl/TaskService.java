package com.example.taskmanager.service.impl;

import com.example.taskmanager.dto.TaskCreateDto;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repo.TaskRepo;
import com.example.taskmanager.service.ITaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService implements ITaskService {
    private final TaskRepo taskRepo;

    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepo.findAll();
    }

    @Override
    public Task addTask(TaskCreateDto task) throws Exception {
        if (task == null) throw new Exception("Task is null");

        Task newTask = new Task(task.getTitle(), false);
        return taskRepo.save(newTask);
    }

    @Override
    public Task updateTask(Long id, boolean completed) throws Exception {
        if (id == null) throw new Exception("Id must not be null");
        if (id <= 0) throw new Exception("Id must be at least 1");

        Optional<Task> opt = taskRepo.findById(id);
        if (opt.isEmpty()) throw new Exception("Task does not exist");
        Task t = opt.get();

        t.setCompleted(completed);
        return taskRepo.save(t);
    }

    @Override
    public void deleteTask(Long id) throws Exception {
        if (id == null) throw new Exception("Id must not be null");
        if (id <= 0) throw new Exception("Id must be at least 1");

        if (!taskRepo.existsById(id)) throw new Exception("Task does not exist");

        taskRepo.deleteById(id);
    }

    @Override
    public List<Task> search(String query) {
        if (query == null || query.trim().length() < 3) return taskRepo.findAll();
        else return taskRepo.findByTitleContainingIgnoreCase(query);
    }
}
