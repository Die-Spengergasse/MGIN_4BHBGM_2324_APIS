package at.spengergasse.med_px.Anamnese;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/anamneses")
public class AnamneseController {


    @Autowired
    private AnamneseInterface anamneseInterface;


    @GetMapping("/all")
    public List<Anamnese> getAllAnamneses() {

        return anamneseInterface.findAll();
    }

    @GetMapping("/{id}")
    public Anamnese getAnamneseById(@PathVariable float id) {
        // Implementierung für das Abrufen einer Anamnese anhand der ID
        Anamnese ani = new Anamnese();

        for (Anamnese a : anamneseInterface.findAll()) {

            if(a.getId()== id) {

                ani = a;
                return ani;
            }
        }
        return null;

    }

    @GetMapping("/find")
    public List<Anamnese>  getAnamneseByName(@RequestParam String text_descr) {
        // Implementierung für das Abrufen einer Anamnese anhand der Bestichwortung
        return anamneseInterface.findByTextDescr(text_descr);

    }

    @GetMapping("/pid")
    public List<Anamnese> fromPatient(@RequestParam long pid)
    {
        // Implementierung für das Abrufen einer Anamnese anhand des Patienten
        Anamnese ani = new Anamnese();
        List<Anamnese> anis = new ArrayList<>();

        for (Anamnese a : anamneseInterface.findAll()) {

            if(a.getPatient_id().getId()==pid)
            {
                ani = a;
                anis.add(ani);

            }
        }
        return anis;
    }

    @PostMapping("/save")
    public Anamnese createAnamnese(@RequestBody Anamnese anamnese) {
        // Implementierung für das Speichern einer neuen Anamnese
        System.out.println(anamnese);
        anamneseInterface.save(anamnese);
        return anamnese;

    }

    @PutMapping("/{id}")
    public void updateAnamnese(@PathVariable Long id, @RequestBody Anamnese anamnese) {
        // Implementierung für das Aktualisieren einer Anamnese anhand der ID

        for (Anamnese a : anamneseInterface.findAll()) {

            if(a.getId() == id) {

                a = anamnese;
                System.out.println(a);

            }
        }

    }

    @DeleteMapping("/{id}")
    public void deleteAnamnese(@PathVariable Long id) {
        // Implementierung für das Löschen einer Anamnese anhand der ID
        for (Anamnese a : anamneseInterface.findAll()) {

            if(a.getId() == id) {

                anamneseInterface.delete(a);
                System.out.println(anamneseInterface.findAll());


            }
        }

    }


}
