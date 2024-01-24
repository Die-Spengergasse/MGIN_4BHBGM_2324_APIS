package at.spengergasse.med_px.MedicalCase;

import at.spengergasse.med_px.entities.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalCase_Patient_Repository extends CrudRepository<Patient, Integer> {
}
