package com.example.backend.controller;

import com.example.backend.dto.PropertyDTO;
import com.example.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @GetMapping
    public List<PropertyDTO> getAll() {
        return propertyService.getAll();
    }

    @GetMapping("/{id}")
    public PropertyDTO getById(@PathVariable String id) {
        return propertyService.getById(id);
    }

    @PostMapping
    public PropertyDTO create(@RequestBody PropertyDTO dto) {
        return propertyService.create(dto);
    }

    @PutMapping("/{id}")
    public PropertyDTO update(@PathVariable String id, @RequestBody PropertyDTO dto) {
        return propertyService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        propertyService.delete(id);
    }
}
