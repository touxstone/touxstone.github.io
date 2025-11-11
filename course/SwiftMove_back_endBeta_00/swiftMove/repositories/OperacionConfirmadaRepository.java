package com.example.swiftMove.repositories;

import com.example.swiftMove.models.OperacionConfirmada;
import org.springframework.stereotype.Repository;
import com.example.swiftMove.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.List;

// Repositorio para la entidad de Operaciones Finales
@Repository
public interface OperacionConfirmadaRepository extends JpaRepository<OperacionConfirmada, Integer> {
    // Encuentra operaciones por el empleado que las gestionó
    List<OperacionConfirmada> findByEmpleadoContacto_Id(Integer empleadoId);

    // Encuentra operaciones asignadas a un transportista
    List<OperacionConfirmada> findByTransportista_Id(Integer transportistaId);
}