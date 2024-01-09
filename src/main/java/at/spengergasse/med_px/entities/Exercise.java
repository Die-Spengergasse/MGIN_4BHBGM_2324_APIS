package at.spengergasse.med_px.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

/**
 * an exercise for a physical therapy
 */
@Entity
public class Exercise {
    @Id
    @GeneratedValue
    private Long id;
    private String description;     // description of the exercise
}
