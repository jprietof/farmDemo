package co.edu.usa.farm.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class securityAdapter extends WebSecurityConfigurerAdapter{
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.cors()
        .and()
    //.sessionManagement()
    //    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    //    .and()
        
    .csrf()
        .disable()
    .formLogin()
        .disable()
    .httpBasic()
        .disable()
        	.authorizeRequests(a -> a
				.antMatchers("/", "/error", "/webjars/**","/api/**").permitAll()
				.anyRequest().authenticated()
			)
        	.exceptionHandling(e -> e
    				.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
    			)
			.csrf(c -> c
				.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
			)
			.logout(l -> l
				.logoutSuccessUrl("/").permitAll()
			)
			.oauth2Login().defaultSuccessUrl("/privado.html", true);
       

        http.cors().and().csrf().disable();
    }
}
