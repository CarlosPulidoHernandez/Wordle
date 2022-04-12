package edu.uclm.esi.wordlesc.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlesc.dao.UserRepository;
import edu.uclm.esi.wordlesc.model.User;

@Service
public class UserService {

	@Autowired
	private UserRepository userDAO;
	
	public void register(JSONObject jso) {
		User user = new User();
		user.setUserName(jso.getString("userName"));
		user.setEmail(jso.getString("email"));
		user.setPwd(jso.getString("pwd1"));
		this.userDAO.save(user);
	}

}
