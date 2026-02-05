package com.example.taskmanager.controller;

import com.example.taskmanager.dto.TaskCreateDto;
import com.example.taskmanager.dto.TaskUpdateDto;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repo.TaskRepo;
import jakarta.validation.Valid;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepo taskRepo;

    public TaskController(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskRepo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody @Valid TaskCreateDto dto) {
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        Task task = new Task(dto.getTitle(), false);
        return ResponseEntity.status(201).body(taskRepo.save(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskUpdateDto dto) {
        Task t = taskRepo.findById(id).orElseThrow(RuntimeException::new);

        t.setCompleted(dto.isCompleted());

        taskRepo.save(t);

        return ResponseEntity.ok(t);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
