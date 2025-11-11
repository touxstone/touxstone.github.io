package com.example.swiftMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "item_bulto")
@Getter
@Setter
@NoArgsConstructor
public class ItemBulto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_itemBulto")
    private Integer id;

    @Column(name = "tipo_Bulto", nullable = false, length = 20)
    private String tipoBulto; // 'Estándar' o 'Adicional'

    private String descripcion;

    @Column(name = "num_Unidades", nullable = false)
    private Integer numUnidades;

    @Column(name = "peso_Unitario", nullable = false, precision = 6, scale = 2)
    private BigDecimal pesoUnitario;

    @Column(name = "largo_Unitario", nullable = false, precision = 5, scale = 2)
    private BigDecimal largoUnitario;

    @Column(name = "ancho_Unitario", nullable = false, precision = 5, scale = 2)
    private BigDecimal anchoUnitario;

    @Column(name = "alto_Unitario", nullable = false, precision = 5, scale = 2)
    private BigDecimal altoUnitario;

    // Relación Many-to-One con Solicitud (fk_id_solicitud)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_id_solicitud", nullable = false)
    private Solicitud solicitud;

    // Getters y Setters
    // ... (omitted for brevity)
}