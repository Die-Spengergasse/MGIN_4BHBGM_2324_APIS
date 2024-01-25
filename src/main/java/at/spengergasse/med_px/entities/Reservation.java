package at.spengergasse.med_px.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
public class Reservation {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
