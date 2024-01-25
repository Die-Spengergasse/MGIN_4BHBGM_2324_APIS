package at.spengergasse.med_px.Anamnese;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnamneseInterface extends JpaRepository<Anamnese,Integer> {

    List<Anamnese> findByTextDescr(String description);
}
