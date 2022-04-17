package edu.uclm.esi.wordlesc.services;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlesc.dao.UserRepository;
import edu.uclm.esi.wordlesc.model.User;


@Service
public class UserService {

	@Autowired
	private UserRepository userDAO;

	public ResponseEntity<String> register(JSONObject jso) {
		User user = new User();
		user.setUsername(jso.getString("userName"));
		user.setEmail(jso.getString("email"));
		user.setPwd(jso.getString("pwd1"));
		Optional<User> optUser = this.userDAO.findById(user.getUserName());
		if (optUser.isPresent()) {
			return new ResponseEntity<>("Nombre de usuario ya registrado", HttpStatus.BAD_REQUEST);
		}
		this.userDAO.save(user);
		return new ResponseEntity<>("Usuario registrado correctamente", HttpStatus.OK);
	}

	public ResponseEntity<String> login(JSONObject jso) {
		User user = this.userDAO.findByUserNameAndPwd(jso.getString("name"), org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("pwd")));
		if (user == null) 
			return new ResponseEntity<>("Credenciales no válidas o cuenta no validada", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>(jso.toString(), HttpStatus.OK);
	}

}