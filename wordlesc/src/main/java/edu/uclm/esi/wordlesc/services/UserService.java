package edu.uclm.esi.wordlesc.services;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordlesc.dao.UserRepository;
import edu.uclm.esi.wordlesc.dao.TokenRepository;
import edu.uclm.esi.wordlesc.model.User;
import edu.uclm.esi.wordlesc.model.Email;
import edu.uclm.esi.wordlesc.model.Token;


@Service
public class UserService {

	@Autowired
	private UserRepository userDAO;
	
	@Autowired
	private TokenRepository tokenDAO;

	public ResponseEntity<String> register(JSONObject jso) {
		User user = new User();
		user.setUsername(jso.getString("userName"));
		user.setEmail(jso.getString("email"));
		user.setPwd(jso.getString("pwd1"));
		if(jso.has("picture")) {
			user.setPicture((jso.getString("picture")).getBytes());
		}
		Optional<User> optUser = this.userDAO.findById(user.getUserName());
		if (optUser.isPresent()) {
			return new ResponseEntity<>("Nombre de usuario ya registrado", HttpStatus.BAD_REQUEST);
		}
		this.userDAO.save(user);		
		Token token = new Token(user.getUserName());
		this.tokenDAO.save(token);
		Email smtp=new Email();
		smtp.send(user.getEmail(), 
			"¡Bienvenido a WORDLESI!", 
			"Hola " + user.getUserName() + ", para confirmar el registro pulse en el siguiente enlace: " +
			"http://localhost/user/validateAccount/" + token.getId());
		return new ResponseEntity<>("Usuario registrado correctamente", HttpStatus.OK);
	}

	public ResponseEntity<String> login(JSONObject jso) {
		String name = jso.getString("name");
		String pwd = org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("pwd"));
		
		Optional<User> optUser = this.userDAO.findById(name);
		if (optUser.isPresent()) {
			User user = optUser.get();
			if (!user.getPwd().equals(pwd)) {
				if(user.getWrongAttempts() < 3) {
					user.increaseWrongAttempts();
					this.userDAO.save(user);
				}
				return new ResponseEntity<>("Credenciales no válidas o cuenta no validada", HttpStatus.FORBIDDEN);
			}else {
				if (user.getWrongAttempts() == 3)
					return new ResponseEntity<>("Cuenta bloqueada", HttpStatus.FORBIDDEN);
				user.setWrongAttempts(0);
				this.userDAO.save(user);
			}
		} else {
			return new ResponseEntity<>("Credenciales no válidas o cuenta no validada", HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<>("Usuario logeado correctamente", HttpStatus.OK);
	}
	
	public ResponseEntity<String> changePassword(JSONObject jso) {
		String name = jso.getString("userName");
		String pwd = org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("pwd"));
		String newpwd1 = org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("newpwd1"));
		String newpwd2 = org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("newpwd2"));
				
		Optional<User> optUser = this.userDAO.findById(name);
		if (optUser.isPresent()) {
			User user = optUser.get();
			if (!user.getPwd().equals(pwd)) 
				return new ResponseEntity<>("Credenciales no válidas", HttpStatus.FORBIDDEN);
			if (!newpwd1.equals(newpwd2)) 
				return new ResponseEntity<>("Las contraseñas no coinciden", HttpStatus.FORBIDDEN);
			if(pwd.equals(newpwd1)) 
				return new ResponseEntity<>("La nueva contraseña no puede ser igual a la actual", HttpStatus.FORBIDDEN);
			if (newpwd1.length()<6)
				return new ResponseEntity<>("La nueva contraseña debe de tener una longitud de 6 o más caracteres", HttpStatus.FORBIDDEN);
			user.setPwd(jso.getString("newpwd1"));
			this.userDAO.save(user);
			return new ResponseEntity<>("Contraseña cambiada correctamente", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Credenciales no válidas o cuenta no validada", HttpStatus.FORBIDDEN);
		}
	}
	
	public ResponseEntity<String> validateToken(String tokenId) {
		Optional<Token> optToken = this.tokenDAO.findById(tokenId);
		if (optToken.isPresent()) {
			Token token = optToken.get();
			long date = token.getDate();
			long now = System.currentTimeMillis();
			if (now>date+1000*60*60*24)
				throw new ResponseStatusException(HttpStatus.GONE, "Token caducado");
			String userName = token.getUserName();
			Optional<User> optUser = this.userDAO.findById(userName);
			if(optUser.isPresent()) {
				User user = optUser.get();
				user.setConfirmationDate(now);
				this.userDAO.save(user);
				return new ResponseEntity<>("{'Validacion':correcta}", HttpStatus.OK);
			} else return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
		} else return new ResponseEntity<>( "Token " + tokenId + " no encontrado", HttpStatus.NOT_FOUND);
	}
	
	public ResponseEntity<String> createToken(JSONObject jso) {
		User user = new User();
		user.setEmail(jso.getString("email"));
		Optional<User> optUser = this.userDAO.findByEmail(user.getEmail());
		if (!optUser.isPresent()) {
			return new ResponseEntity<>("Email no encontrado", HttpStatus.BAD_REQUEST);
		}		
		user = optUser.get();
		Token token = new Token(user.getUserName());
		this.tokenDAO.save(token);
		Email smtp=new Email();
		smtp.send(user.getEmail(), 
			"Bienvenido al sistema" + user.getUserName(), 
			"Para crear una nueva contraseña, pulse aquí: " +
			"http://localhost/user/resetPassword/" + token.getId());
		return new ResponseEntity<>("Email enviado correctamente", HttpStatus.OK);
	}
	
	public ResponseEntity<String> resetPassword(JSONObject jso) {
		String tokenId = jso.getString("tokenId");
		String newPwd1 = jso.getString("newpwd1");
		String newPwd2 = jso.getString("newpwd2");
		Optional<Token> optToken = this.tokenDAO.findById(tokenId);
		
		if (optToken.isPresent()) {
			Token token = optToken.get();
			long date = token.getDate();
			long now = System.currentTimeMillis();
			if (now>date+1000*60*60*24)
				return new ResponseEntity<>("Token caducado", HttpStatus.GONE);
			String userName = token.getUserName();
			Optional<User> optUser = this.userDAO.findById(userName);
			if(optUser.isPresent()) {
				User user = optUser.get();
				if (!newPwd1.equals(newPwd2)) 
					return new ResponseEntity<>("Las contraseñas no coinciden", HttpStatus.FORBIDDEN);
				if (newPwd1.length()<6)
					return new ResponseEntity<>("La nueva contraseña debe de tener una longitud de 6 o más caracteres", HttpStatus.FORBIDDEN);
				user.setPwd(newPwd1);
				this.userDAO.save(user);
				this.tokenDAO.delete(token);
				return new ResponseEntity<>("Contraseña cambiada correctamente", HttpStatus.OK);
			}else return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
		} else return new ResponseEntity<>( "Token " + tokenId + " no encontrado", HttpStatus.NOT_FOUND);
	}
}