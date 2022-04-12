package edu.uclm.esi.wordlegp.http;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordlegp.services.LocalUserService;

@RestController
@RequestMapping("user")
public class LocalUserController {
	@Autowired
	private LocalUserService userService;
	
	@PutMapping("/register")
	public void register(@RequestBody Map<String, Object> info) {
		try {
			JSONObject jso = new JSONObject(info);
			String userName = jso.getString("userName");
			String pwd1 = jso.getString("pwd1");
			String pwd2 = jso.getString("pwd2");
			String email = jso.getString("email");
			if (userName.length()<4)
				throw new Exception("El nombre de usuario ha de tener 5 caracteres o más");
			if (!pwd1.equals(pwd2))
				throw new Exception("Las contraseñas no coinciden");
			if (pwd1.length()<5)
				throw new Exception("La contraseña tiene que tener 5 caracteres o más");
			this.userService.register(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	@PostMapping("/login")
	public void login(@RequestBody Map<String, Object> info) {
		try {
			JSONObject jso = new JSONObject(info);
			this.userService.login(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
}
