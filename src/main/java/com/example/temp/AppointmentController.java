    package com.example.temp;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api")
    public class AppointmentController {

        @Autowired
        private AppointmentRepository repository;

        @GetMapping("/appointments")
        public List<Appointment> allAppointments(){
            return repository.findAll();
        }

        @PostMapping("/appointment")
        public Appointment save(@RequestBody Appointment a){
            System.out.println(a);
            return repository.save(a);
        }
    }
