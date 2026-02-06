package com.example.taskmanager.controller;

import com.example.taskmanager.dto.TaskCreateDto;
import com.example.taskmanager.dto.TaskUpdateDto;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.ITaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final ITaskService taskService;

    public TaskController(ITaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> getTasks(@RequestParam(required = false) String query) {
        return ResponseEntity.ok(taskService.search(query));
    }

    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody @Valid TaskCreateDto dto, BindingResult br) {
        if (br.hasErrors()) {
            List<String> msg = br.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.badRequest().body(msg);
        }

        try {
            Task task = taskService.addTask(dto);
            return ResponseEntity.status(201).body(task);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody @Valid TaskUpdateDto dto, BindingResult br)
    {
        if (br.hasErrors()) {
            List<String> msg = br.getFieldErrors().stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();

            return ResponseEntity.badRequest().body(msg);
        }

        try {
            Task task = taskService.updateTask(id, dto.isCompleted());
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
