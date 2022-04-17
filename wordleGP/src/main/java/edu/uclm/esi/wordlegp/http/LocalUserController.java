package edu.uclm.esi.wordlegp.http;

import java.util.Map;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.uclm.esi.wordlegp.services.LocalUserService;

@RestController
@RequestMapping("user")
public class LocalUserController {
	@Autowired
	private LocalUserService userService;
	
	@CrossOrigin(origins = "*")
	@PutMapping("/register")
	public ResponseEntity<String> register(@RequestBody Map<String, Object> info) {
		try {
			JSONObject jso = new JSONObject(info);
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
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, Object> info) {
		try {
			JSONObject jso = new JSONObject(info);
			return this.userService.login(jso);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}

