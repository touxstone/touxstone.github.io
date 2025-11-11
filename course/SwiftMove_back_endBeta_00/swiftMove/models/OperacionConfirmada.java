package com.example.swiftMove.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.math.BigDecimal; // Usar BigDecimal para dinero es una buena práctica

@Entity
@Table(name = "operacion_confirmada")
@Getter
@Setter
@NoArgsConstructor
public class OperacionConfirmada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Operacion")
    private Integer id;

    // Relación One-to-One con Solicitud
    // Mapea la FK: fk_id_Solicitud
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_Solicitud", unique = true, nullable = false)
    private Solicitud solicitud;

    // Relación Many-to-One con Transportista
    // Mapea la FK: fk_id_Transportista
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_Transportista", nullable = false)
    private Transportista transportista;

    // Relación Many-to-One con Empleado
    // Mapea la FK: fk_id_Empleado_Contacto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_Empleado_Contacto", nullable = false)
    private Empleado empleadoContacto;

    @Column(name = "importe_Cargos", nullable = false, precision = 8, scale = 2)
    private BigDecimal importeCargos;

    @Column(name = "fecha_Cierre_Ficha", nullable = false)
    private LocalDateTime fechaCierreFicha;

    @Column(name = "metodo_Pago", length = 50)
    private String metodoPago;

    @Column(name = "referencia_Pago", length = 50)
    private String referenciaPago;

    // Getters y Setters
    // ... (omitted for brevity)
}