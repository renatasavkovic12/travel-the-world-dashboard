package config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    public WebConfig() {
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
 
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}