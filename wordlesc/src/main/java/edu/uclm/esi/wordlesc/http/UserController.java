package edu.uclm.esi.wordlesc.http;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordlesc.services.UserService;


@RestController
@RequestMapping("user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody Map<String, Object> credenciales){
		try {
			JSONObject jso = new JSONObject(credenciales);
			String userName = jso.getString("userName");
			String pwd1 = jso.getString("pwd1");
			String email = jso.getString("email");	
			if (userName.length()<6)
				throw new Exception("El nombre de usuario debe tener 6 caracteres o más");
			if (pwd1.length()<6)
				throw new Exception("La contraseña debe tener 6 caracteres o más");
			return this.userService.register(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Map<String, Object> credenciales){
		JSONObject jso = new JSONObject(credenciales);
		return this.userService.login(jso);	
	}
	
	@PostMapping("/changePassword")
	public ResponseEntity<String> changePassword(@RequestBody Map<String, Object> info){
		JSONObject jso = new JSONObject(info);
		return this.userService.changePassword(jso);	
	}
	
	@GetMapping("/validateAccount/{tokenId}")
	public ResponseEntity<String> validateAccount(HttpServletRequest request, HttpServletResponse response, @PathVariable String tokenId) {
		return userService.validateToken(tokenId);
	}
}
