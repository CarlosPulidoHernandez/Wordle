package edu.uclm.esi.wordlesc.services;

import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordlesc.dao.UserRepository;
import edu.uclm.esi.wordlesc.model.User;


@Service
public class UserService {

	@Autowired
	private UserRepository userDAO;

	public void register(JSONObject jso) {
		User user = new User();
		user.setUsername(jso.getString("userName"));
		user.setEmail(jso.getString("email"));
		user.setPwd(jso.getString("pwd1"));
		this.userDAO.save(user);
	}

	public void login(JSONObject jso) throws Exception {
		Optional<User> optUser = this.userDAO.findById(jso.getString("name"));
		if (!optUser.isPresent())
			throw new Exception("Usuario no registrado");	
		
		User user = optUser.get();
		String pwd = org.apache.commons.codec.digest.DigestUtils.sha512Hex(jso.getString("pwd"));			
		if (user.getPwd().equals(pwd)) {
				//
		}	
	}

}