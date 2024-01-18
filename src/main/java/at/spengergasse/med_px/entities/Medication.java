package at.spengergasse.med_px.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Medication {
    @Id
    @GeneratedValue
    private Long id;

    private String name;            // name of the medication

    private LocalDateTime startDate;

    private LocalDateTime endDate;


}
