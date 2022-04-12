package edu.uclm.esi.wordlegp.services;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlegp.http.Client;
import edu.uclm.esi.wordlegp.http.LocalManager;

@Service
public class LocalUserService {

	public JSONObject register(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "/user/register";
		return client.sendPost(url, jso);
	}
	
	public JSONObject login(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "/user/login";
		return client.sendPost(url, jso);
	}

}
