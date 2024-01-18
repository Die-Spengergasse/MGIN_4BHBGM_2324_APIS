package at.spengergasse.fall_modul.fallController;

import at.spengergasse.fall_modul.entities.Fall;
import at.spengergasse.fall_modul.entities.Patient;
import at.spengergasse.fall_modul.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

@RestController             //spring web
@RequestMapping("/api/patients")
public class FallController {


    @Autowired
    PatientRepository patientRepository;
    private List<Patient> Patientenliste = List.of();

    @GetMapping("/all")
    Iterable<Patient> ReturnAllPatients (){
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    Optional<Patient> ReturnPatientById(@PathVariable Integer id){
        return patientRepository.findById(id);
    }

  /*  @GetMapping("/searchname/{name}")
    Patient getPatientByName(@PathVariable String name) {
        System.out.println(name);
        for(Patient p : Patientenliste){
            System.out.println(p.getName() +"|"+name);
            if(p.getName().equals(name)){
                System.out.println("true");
                return p;
            }
        }
        return null;
    }*/

   /* @PostMapping("/addpatient")
    Patient addPatient(@RequestBody Patient newPatient) {
        Patientenliste.add(newPatient);
        return newPatient;
    }*/

   /* @PutMapping("/updatepatient/{id}")
    public Patient updatePatient(@PathVariable int id, @RequestBody Patient updatedPatient) {
        for (Patient p : Patientenliste) {
            if (p.getId() == id) {
                Patientenliste.set(id, updatedPatient);
                return Patientenliste.get(id);
            }
        }
        return null;
    }*/

/*
    //Verwendung eines Iterators, damit bei mehreren Threads keine Fehlermeldung kommt
    @DeleteMapping("/deletepatient/{name}")
    public String deletePatient(@PathVariable String name) {
        Iterator<Patient> iterator = Patientenliste.iterator();
        while (iterator.hasNext()) {
            Patient p = iterator.next();
            if (p.getName().equals(name)) {
                iterator.remove();
                return "Patient " + name + " wurde erfolgreich entfernt.";
            }
        }
        return "Patient " + name + " wurde nicht gefunden.";
    }

    /*
    * POST /1/fall
    *
    * {...}
    *

    */


    //TODO: Einzelne Funktionen in DB-Sachen umformen

    @PostMapping("/{id}/addfall")
    Fall addFall(@PathVariable int id, @RequestBody Fall neuerFall){



        Optional<Patient> foundPatient = patientRepository.findById(id);

        if (foundPatient.isPresent()){
            foundPatient.get().addFall(neuerFall);
            return neuerFall;
        }else {
            return null;
        }
    }

    @PutMapping("/updateFall/{fallId}")
    Fall updateFall(@PathVariable int fallId, @RequestBody Fall updatedFall){
        for (Patient patient : patientRepository.findAll()) {
            List<Fall> faelle = patient.getFaelle();
            Optional<Fall> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                int index = faelle.indexOf(foundFall.get());
                faelle.set(index, updatedFall);
                return updatedFall;
            }
        }
        return null;
    }

    @GetMapping("/alleFaelle")
    List<Fall> alleFaelle(){
        List<Fall> alleFaelle = new ArrayList<>();
        for (Patient patient : patientRepository.findAll()) {
            alleFaelle.addAll(patient.getFaelle());
        }

        return alleFaelle;
    }

    @GetMapping("/getfall/{id}")
    Fall updateFall(@PathVariable int fallId){
        for (Patient patient : patientRepository.findAll()) {
            List<Fall> faelle = patient.getFaelle();
            Optional<Fall> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                return foundFall.get();
            }
        }
        return null;
    }

    @DeleteMapping("/deleteFall/{fallId}")
    void deleteFall(@PathVariable int fallId){
        for (Patient patient : patientRepository.findAll()) {
            List<Fall> faelle = patient.getFaelle();
            Optional<Fall> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                faelle.remove(foundFall.get());
                break;
            }
        }
    }
}
