package edu.uclm.esi.wordlegp.http;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import edu.uclm.esi.wordlegp.services.LocalUserService;

@RestController
@RequestMapping("user")
public class LocalUserController {
	@Autowired
	private LocalUserService userService;
	
	@CrossOrigin(origins = "*")
	@PutMapping("/register")
	public ResponseEntity<String> register(@RequestBody Map<String, Object> credenciales) {
		try {
			JSONObject jso = new JSONObject(credenciales);
			String userName = jso.getString("userName");
			String pwd1 = jso.getString("pwd1");
			String pwd2 = jso.getString("pwd2");					
			if (userName.length() < 4)
				throw new Exception("El nombre de usuario debe tener 4 caracteres o más");
			if (pwd1.length() < 4)
				throw new Exception("La contraseña debe tener 4 caracteres o más");
			if (!pwd1.equals(pwd2))
				throw new Exception("Las contraseñas no coinciden");
			return this.userService.register(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, Object> credenciales) {
		try {
			JSONObject jso = new JSONObject(credenciales);
			return this.userService.login(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
		
	@CrossOrigin(origins = "*")
	@GetMapping("/validateAccount/{tokenId}")
	public ResponseEntity<String> validateAccount(HttpServletRequest request, HttpServletResponse response, @PathVariable String tokenId) {
		try {
			JSONObject jso_response = this.userService.validate(tokenId);
			try {
				response.sendRedirect(LocalManager.get().getConfiguration().getString("home"));
			} catch (IOException e) {
				
			}
			return new ResponseEntity<>(jso_response.toString(), HttpStatus.OK);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}	
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/changePwd")
	public String changePwd(HttpServletRequest request, HttpServletResponse response) {
		try {
			return "changePassword.html";
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
	
}

