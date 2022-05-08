package edu.uclm.esi.wordlegp.http;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import edu.uclm.esi.wordlegp.services.LocalUserService;

@RestController
@RequestMapping("user")
public class LocalUserController {
	@Autowired
	private LocalUserService userService;
	
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
	
	@PutMapping("/login")
	public ResponseEntity<String> login(HttpSession session, @RequestBody Map<String, Object> credenciales) {
		try {
			JSONObject jso = new JSONObject(credenciales);
			ResponseEntity<String> response = this.userService.login(jso);
			if(response.getStatusCode() == HttpStatus.OK)
				session.setAttribute("userName", jso.getString("name"));
			return response;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
	@PutMapping("/changePassword")
	public ResponseEntity<String> changePassword(HttpSession session, @RequestBody Map<String, Object> info) {
		try {
			if (session.getAttribute("userName") == null)
				return new ResponseEntity<>("Usuario no logeado", HttpStatus.FORBIDDEN);
			JSONObject jso = new JSONObject(info);
			return this.userService.changePassword(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
		
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
	
	@PutMapping("/createToken")
	public ResponseEntity<String> createToken(@RequestBody Map<String, Object> info) {
		try {
			JSONObject jso = new JSONObject(info);
			return this.userService.createToken(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
	
	@GetMapping("/resetPassword/{tokenId}")
	public void resetPassword(HttpServletRequest request, HttpServletResponse response, @PathVariable String tokenId) {
		try {
			response.sendRedirect("http://localhost/?ojr=resetPassword&tokenId="+tokenId);
		} catch (JSONException | IOException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping("/newPassword")
	public ResponseEntity<String> resetPassword(String tokenId) {
		try {
			String info = null;
			JSONObject jso = new JSONObject(info);
			return this.userService.createToken(jso);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, e.getMessage());
		}
	}
}

