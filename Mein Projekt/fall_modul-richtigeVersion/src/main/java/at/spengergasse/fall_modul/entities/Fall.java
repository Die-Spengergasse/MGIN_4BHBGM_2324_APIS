package at.spengergasse.fall_modul.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Fall {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "f_name")
        private String name;

        @Column(name = "f_startdatum")
        private LocalDateTime startdatum;

        @ManyToOne
        @JoinColumn(name = "f_a_id")
        private Arzt arzt;

        @Column(name = "f_beschreibung")
        private String beschreibung;

        @Enumerated(EnumType.STRING)
        @Column(name = "f_status")
        private Status status;

        @Column(name = "f_abschlussdatum")
        private LocalDateTime abschlussdatum;

        @Column(name = "f_abgerechnet")
        private Boolean abgerechnet;

        @ManyToOne
        @JoinColumn(name = "f_p_pat_id")
        private Patient patient;
}
