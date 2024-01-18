package at.spengergasse.fall_modul.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "p_name")
    private String name;

    @OneToMany(mappedBy = "patient")
    private List<Fall> faelle;

    public void addFall(Fall f){
        this.faelle.add(f);
    }

    @Override
    public String toString() {
        return name + ", Fälle:" + faelle;
    }
}