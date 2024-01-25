package at.spengergasse.med_px.WorkIncapacity;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WorkIncapacityMcvConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/doctor/WorkIncapacity").setViewName("/WorkIncapacity/WorkIncapacity");

    }
}
