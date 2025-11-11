package com.example.swiftMove.repositories;
import com.example.swiftMove.models.*;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@SuppressWarnings("SpellCheckingInspection")
@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Integer> {
    // JPQL/HQL básico para encontrar solicitudes por estado
    List<Solicitud> findByEstado(SolicitudStatus estado);
}



