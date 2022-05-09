package edu.uclm.esi.wordlegp.services;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import edu.uclm.esi.wordlegp.http.Client;
import edu.uclm.esi.wordlegp.http.LocalManager;

@Service
public class LocalUserService {

	public ResponseEntity<String> register(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/register";
		return client.sendPost(url, jso);
	}
	
	public ResponseEntity<String> login(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/login";
		return client.sendPost(url, jso);
	}
	
	public ResponseEntity<String> changePassword(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/changePassword";
		return client.sendPost(url, jso);
	}
	
	public JSONObject validate(@PathVariable String tokenId) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/validateAccount/" + tokenId;
		return client.sendGet(url);
	}
	
	public ResponseEntity<String> createToken(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/createToken";
		return client.sendPost(url, jso);
	}
	
	public ResponseEntity<String> resetPassword(JSONObject jso) {
		Client client = new Client();
		String url = LocalManager.get().getConfiguration().getString("SC");
		url = url + "user/resetPassword";
		return client.sendPost(url, jso);
	}

}
