package com.example.temp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
public class Appointment {
    @Id
    @GeneratedValue
    private int id;

    private String name;
    private String firstname;

    private LocalDateTime appointmentstart;

    private LocalDateTime appointmentend;

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", firstname='" + firstname + '\'' +
                ", appointmentstart=" + appointmentstart +
                ", appointmentend=" + appointmentend +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getfirstname() {
        return firstname;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

    public LocalDateTime getAppointmentstart() {
        return appointmentstart;
    }

    public void setAppointmentstart(LocalDateTime appointmentstart) {
        this.appointmentstart = appointmentstart;
    }

    public LocalDateTime getAppointmentend() {
        return appointmentend;
    }

    public void setAppointmentend(LocalDateTime appointmentend) {
        this.appointmentend = appointmentend;
    }
}
