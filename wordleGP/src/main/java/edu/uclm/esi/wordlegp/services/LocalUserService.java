package edu.uclm.esi.wordlegp.services;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlegp.http.Client;
import edu.uclm.esi.wordlegp.http.LocalManager;

@Service
public class LocalUserService {

	public ResponseEntity<String> register(JSONObject jso) throws Exception {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/register";
		return client.sendPost(url, jso);
	}
	
	public ResponseEntity<String> login(JSONObject jso) throws Exception {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/login";
		return client.sendPost(url, jso);
	}

}
