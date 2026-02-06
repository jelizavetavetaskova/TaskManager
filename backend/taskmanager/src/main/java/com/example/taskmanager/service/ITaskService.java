package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskCreateDto;
import com.example.taskmanager.model.Task;

import java.util.List;

public interface ITaskService {
    List<Task> getAllTasks();

    Task addTask(TaskCreateDto task) throws Exception;

    Task updateTask(Long id, boolean completed) throws Exception;

    void deleteTask(Long id) throws Exception;

    List<Task> search(String query);
}
