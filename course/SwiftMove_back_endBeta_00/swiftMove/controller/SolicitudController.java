package com.example.swiftMove.controller;

import com.example.swiftMove.models.OperacionConfirmada;
import com.example.swiftMove.models.Solicitud;
import com.example.swiftMove.services.SolicitudService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {

    private final SolicitudService solicitudService;

    public SolicitudController(SolicitudService solicitudService) {
        this.solicitudService = solicitudService;
    }

    // Endpoint 1: Recibe el formulario del cliente (Creación)
    @PostMapping
    public ResponseEntity<Solicitud> crearNuevaSolicitud(@RequestBody Solicitud solicitud) {
        Solicitud nueva = solicitudService.crearSolicitud(solicitud);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    // Endpoint 2: Muestra todas las solicitudes pendientes (Para el personal de oficina)
    @GetMapping("/pendientes")
    public ResponseEntity<List<Solicitud>> obtenerPendientes() {
        // Ejemplo de uso de un método de Repository:
        List<Solicitud> pendientes=solicitudService.obtenerSolicitudesPendientes();
        return ResponseEntity.ok(pendientes);
    }

    // Endpoint 3: El personal confirma y asigna la operación
    // Esto es un ejemplo simplificado de cómo se recibirían los IDs y el monto.
    @PostMapping("/{solicitudId}/confirmar")
    public ResponseEntity<OperacionConfirmada> confirmarYAsignar(
            @PathVariable Integer solicitudId,
            @RequestParam Integer empleadoId,
            @RequestParam Integer transportistaId,
            @RequestParam BigDecimal importeCargos,
            @RequestParam String metodoPago) {

        OperacionConfirmada operacion = solicitudService.confirmarYCerrarOperacion(
                solicitudId, empleadoId, transportistaId, importeCargos, metodoPago
        );
        return ResponseEntity.ok(operacion);
    }
}