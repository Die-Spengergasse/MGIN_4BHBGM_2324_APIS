package at.spengergasse.med_px.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Patient {
    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(mappedBy = "patient")
    private List<Contact> contacts;

    @OneToOne(mappedBy = "patient")
    private HealthRecord healthRecord;

    @ManyToOne
    @JoinColumn(name = "insurance_id")
    private Insurance insurance;



    @Column(name = "p_name")
    private String name;

    @OneToMany(mappedBy = "patient")
    private List<MedicalCase> faelle;

    public void addFall(MedicalCase f){
        this.faelle.add(f);
    }

    @Override
    public String toString() {
        return name + ", Fälle:" + faelle;
    }


}
