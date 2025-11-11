package com.example.swiftMove.repositories;


import com.example.swiftMove.models.Transportista;
import org.springframework.stereotype.Repository;
import com.example.swiftMove.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransportistaRepository extends JpaRepository<Transportista, Integer> {}