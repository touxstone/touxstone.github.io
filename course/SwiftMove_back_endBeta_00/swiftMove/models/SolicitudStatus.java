package com.example.swiftMove.models;

public enum SolicitudStatus {
    PENDIENTE, // Estado inicial
    CONTACTADO, // Confirmado por Empleado
    ASIGNADO_A_TRANSPORTISTA,
    EN_TRANSITO, // Despachado-en-tránsito
    ENTREGADO
}