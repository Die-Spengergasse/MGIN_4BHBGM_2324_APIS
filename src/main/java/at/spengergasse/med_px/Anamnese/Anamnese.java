package at.spengergasse.med_px.Anamnese;

import at.spengergasse.med_px.entities.Patient;
import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
public class Anamnese {

    public int getId() {
        return id;
    }

    @Id
@GeneratedValue(strategy= GenerationType.AUTO)
private int id;

    public Patient getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Patient patient_id) {
        this.patient_id = patient_id;
    }

    public LocalDate getBeginn() {
        return beginn;
    }

    public void setBeginn(LocalDate beginn) {
        this.beginn = beginn;
    }

    public String getTextDescr() {
        return textDescr;
    }

    public void setTextDescr(String txt_desc) {
        this.textDescr = txt_desc;
    }

    public float getBody_temp() {
        return body_temp;
    }

    public void setBody_temp(float body_temp) {
        this.body_temp = body_temp;
    }

    public boolean isPain() {
        return pain;
    }

    public void setPain(boolean pain) {
        this.pain = pain;
    }

        @ManyToOne
        @JoinColumn(name="a_p_id")
        private Patient patient_id;

        private LocalDate beginn;

        private String textDescr;

        private float body_temp;

        private boolean pain;


    @Override
    public String toString() {
        return "Anamnese{" +
                "patient_id=" + patient_id +
                ", beginn=" + beginn +
                ", txt_desc='" + textDescr + '\'' +
                ", body_temp=" + body_temp +
                ", pain=" + pain +
                '}';
    }
}
