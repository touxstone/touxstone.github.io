package com.example.swiftMove.repositories;
import com.example.swiftMove.models.Empleado;
import org.springframework.stereotype.Repository;
import com.example.swiftMove.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// Repositorios básicos (sin métodos personalizados por ahora)
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {}

