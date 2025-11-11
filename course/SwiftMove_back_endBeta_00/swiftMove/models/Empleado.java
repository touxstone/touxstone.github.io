package com.example.swiftMove.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "empleado")
@Getter
@Setter
@NoArgsConstructor
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Empleado")
    private Integer id;

    private String nombre;

    @Column(name = "email_Empleado", unique = true, nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 20)
    private String rol; // Oficina, Gerente, etc.

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    // Getters y Setters
    // ... (omitted for brevity)
}