package at.spengergasse.med_px.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class ImagingType {
    @Id
    @GeneratedValue
    private Long id;
    private String description;     // description of the imaging type
}
