package edu.uclm.esi.wordlesc.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.cj.jdbc.Blob;

import edu.uclm.esi.wordlesc.dao.UserRepository;
import edu.uclm.esi.wordlesc.model.User;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userDAO;
	
	public void register(JSONObject jso) {
		User user = new User(); 
		//TDD test driven development, escribir código antes de tenerlo
		user.setUserName(jso.getString("userName"));
		user.setEmail(jso.getString("email"));
		user.setPassword(jso.getString("password"));
		this.userDAO.save(user);
	}

}
