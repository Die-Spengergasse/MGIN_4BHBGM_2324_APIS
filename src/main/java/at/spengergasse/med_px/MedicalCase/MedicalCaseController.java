package at.spengergasse.med_px.MedicalCase;

import at.spengergasse.med_px.entities.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import at.spengergasse.med_px.entities.MedicalCase;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController             //spring web
@RequestMapping("/api/medicalcase")
public class MedicalCaseController {


    @Autowired
    MedicalCase_Patient_Repository patientRepository;

    private List<Patient> Patientenliste = List.of();

    @GetMapping("/allpatients")
    Iterable<Patient> ReturnAllPatients (){
        return patientRepository.findAll();
    }

    @GetMapping("/getpatientbyid/{id}")
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

    @PostMapping("/patientid/{id}/addfall")
    MedicalCase addFall(@PathVariable int id, @RequestBody MedicalCase neuerFall){



        Optional<Patient> foundPatient = patientRepository.findById(id);

        if (foundPatient.isPresent()){
            foundPatient.get().addFall(neuerFall);
            return neuerFall;
        }else {
            return null;
        }
    }

    @PutMapping("/updateFall/{fallId}")
    MedicalCase updateFall(@PathVariable int fallId, @RequestBody MedicalCase updatedFall){
        for (Patient patient : patientRepository.findAll()) {
            List<MedicalCase> faelle = patient.getFaelle();
            Optional<MedicalCase> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                int index = faelle.indexOf(foundFall.get());
                faelle.set(index, updatedFall);
                return updatedFall;
            }
        }
        return null;
    }

    @GetMapping("/alleFaelle")
    List<MedicalCase> alleFaelle(){
        List<MedicalCase> alleFaelle = new ArrayList<>();
        for (Patient patient : patientRepository.findAll()) {
            alleFaelle.addAll(patient.getFaelle());
        }

        return alleFaelle;
    }

    @GetMapping("/getfall/{id}")
    MedicalCase updateFall(@PathVariable int fallId){
        for (Patient patient : patientRepository.findAll()) {
            List<MedicalCase> faelle = patient.getFaelle();
            Optional<MedicalCase> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                return foundFall.get();
            }
        }
        return null;
    }

    @DeleteMapping("/deleteFall/{fallId}")
    void deleteFall(@PathVariable int fallId){
        for (Patient patient : patientRepository.findAll()) {
            List<MedicalCase> faelle = patient.getFaelle();
            Optional<MedicalCase> foundFall = faelle.stream().filter(fall -> fall.getId() == fallId).findFirst();

            if (foundFall.isPresent()){
                faelle.remove(foundFall.get());
                break;
            }
        }
    }
}

