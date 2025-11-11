package com.example.swiftMove.services;

import com.example.swiftMove.models.*;
import com.example.swiftMove.repositories.EmpleadoRepository;
import com.example.swiftMove.repositories.OperacionConfirmadaRepository;
import com.example.swiftMove.repositories.SolicitudRepository;
import com.example.swiftMove.repositories.TransportistaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class SolicitudService {

    private final SolicitudRepository solicitudRepository;
    private final OperacionConfirmadaRepository operacionConfirmadaRepository;
    private final EmpleadoRepository empleadoRepository;
    private final TransportistaRepository transportistaRepository;

    // Inyección de dependencias
    public SolicitudService(SolicitudRepository solicitudRepository,
                            OperacionConfirmadaRepository operacionConfirmadaRepository,
                            EmpleadoRepository empleadoRepository,
                            TransportistaRepository transportistaRepository) {
        this.solicitudRepository = solicitudRepository;
        this.operacionConfirmadaRepository = operacionConfirmadaRepository;
        this.empleadoRepository = empleadoRepository;
        this.transportistaRepository = transportistaRepository;
    }

    /**
     * Lógica 1: Crear una solicitud inicial a través del formulario web.
     */
    @Transactional
    public Solicitud crearSolicitud(Solicitud nuevaSolicitud) {
        nuevaSolicitud.setFechaSolicitud(LocalDateTime.now());
        nuevaSolicitud.setEstado(SolicitudStatus.PENDIENTE);
        // Aquí iría la lógica para calcular distancia Kms si no viene del form

        // 2. CORRECCIÓN CRÍTICA: Iterar y establecer la referencia bidireccional
        if (nuevaSolicitud.getItemsBulto() != null) {
            for (ItemBulto item : nuevaSolicitud.getItemsBulto()) {
                // Cada ItemBulto debe saber a qué Solicitud pertenece
                item.setSolicitud(nuevaSolicitud);
            }
        }


        return solicitudRepository.save(nuevaSolicitud);
    }

    /**
     * Lógica 2: Empleado de oficina confirma y cierra la operación (Asignación inicial).
     * Esto requiere un Empleado, un Transportista y datos de pago/costo.
     */
    @Transactional
    public OperacionConfirmada confirmarYCerrarOperacion(
            Integer solicitudId,
            Integer empleadoId,
            Integer transportistaId,
            BigDecimal importeCargos,
            String metodoPago) {

        // 1. Obtener Entidades (Lanzará excepción si no existen)
        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        Transportista transportista = transportistaRepository.findById(transportistaId)
                .orElseThrow(() -> new RuntimeException("Transportista no encontrado"));

        // 2. Actualizar el estado de la Solicitud
        solicitud.setEstado(SolicitudStatus.CONTACTADO);
        solicitudRepository.save(solicitud);

        // 3. Crear la Operación Confirmada (Asociación)
        OperacionConfirmada operacion = new OperacionConfirmada();
        operacion.setSolicitud(solicitud);
        operacion.setEmpleadoContacto(empleado);
        operacion.setTransportista(transportista);
        operacion.setImporteCargos(importeCargos);
        operacion.setMetodoPago(metodoPago);
        operacion.setFechaCierreFicha(LocalDateTime.now());
        // Aquí se calcularía la comisión para el empleado si fuera necesario

        return operacionConfirmadaRepository.save(operacion);
    }
    @Transactional(readOnly = true) // Es solo lectura, mejora el rendimiento
    public List<Solicitud> obtenerSolicitudesPendientes() {
        return solicitudRepository.findByEstado(SolicitudStatus.PENDIENTE);
    }
}