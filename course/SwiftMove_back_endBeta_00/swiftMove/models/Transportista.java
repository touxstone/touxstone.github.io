package com.example.swiftMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "transportista")
@Getter
@Setter
@NoArgsConstructor
public class Transportista {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Transportista")
    private Integer id;

    private String nombre;

    @Column(unique = true, nullable = false, length = 50)
    private String email;

    @Column(name = "tipo_Vehiculo", nullable = false, length = 30)
    private String tipoVehiculo;

    @Column(unique = true, nullable = false, length = 20)
    private String licencia;

    @Column(name = "zona_Asignada", length = 50)
    private String zonaAsignada;

    // Getters y Setters
    // ... (omitted for brevity)
}