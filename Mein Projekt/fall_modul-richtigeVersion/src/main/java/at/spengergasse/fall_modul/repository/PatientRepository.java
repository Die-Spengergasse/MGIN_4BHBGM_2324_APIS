package at.spengergasse.fall_modul.repository;

import at.spengergasse.fall_modul.entities.Patient;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<Patient, Integer> {
}
