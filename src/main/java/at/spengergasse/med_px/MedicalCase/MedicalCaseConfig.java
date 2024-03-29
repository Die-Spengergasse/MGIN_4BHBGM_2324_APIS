package at.spengergasse.med_px.MedicalCase;

import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

public class MedicalCaseConfig {

    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/doctor/medicalcase").setViewName("/medicalCase/FallAnlegen.html");
        registry.addViewController("/admin/medicalcase").setViewName("/medicalCase/FallAnlegen.html");
    }
}
