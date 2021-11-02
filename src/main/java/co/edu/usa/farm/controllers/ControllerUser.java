package co.edu.usa.farm.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.Map;

@RestController
public class ControllerUser {
	@GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        //return principal.getAttributes(); //<=NO SE RECOMIENDA! EXPONE DATOS PRIVADOS
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("name", principal.getAttribute("name"));
		data.put("avatar", principal.getAttribute("avatar_url"));
        //return Collections.singletonMap("name", principal.getAttribute("name"));
		return data;
    }
}
