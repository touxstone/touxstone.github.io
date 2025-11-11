package com.example.swiftMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "solicitud")
@Getter
@Setter
@NoArgsConstructor
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Solicitud")
    private Integer id;

    @Column(name = "nombre_Cliente", nullable = false, length = 50)
    private String nombreCliente;

    @Column(name = "telefono_Cliente", nullable = false, length = 15)
    private String telefonoCliente;

    @Column(name = "email_Cliente", nullable = false, length = 50)
    private String emailCliente;

    @Column(name = "fecha_Solicitud", nullable = false)
    private LocalDateTime fechaSolicitud;

    @Column(name = "cp_Origen", nullable = false, length = 10)
    private String cpOrigen;

    @Column(name = "cp_Destino", nullable = false, length = 10)
    private String cpDestino;

    @Column(name = "distancia_Kms", precision = 10, scale = 2)
    private BigDecimal distanciaKms;

    @Column(name = "FechaOperacion_Deseada")
    private LocalDate fechaOperacionDeseada;

    // Usamos un enum para el estado para mayor seguridad de tipos
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_Solicitud", nullable = false, length = 20)
    private SolicitudStatus estado = SolicitudStatus.PENDIENTE;

    // Relación One-to-Many con ItemBulto
    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemBulto> itemsBulto;

    // Relación One-to-One con OperacionConfirmada (Opcional: solo si es confirmada)
    // Usamos 'mappedBy' ya que OperacionConfirmada tiene la FK
    @OneToOne(mappedBy = "solicitud")
    private OperacionConfirmada operacionConfirmada;


}
