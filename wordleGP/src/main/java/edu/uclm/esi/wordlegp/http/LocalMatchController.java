package edu.uclm.esi.wordlegp.http;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordlegp.model.LocalMatch;
import edu.uclm.esi.wordlegp.services.LocalMatchService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("match")
public class LocalMatchController {
	
	@Autowired
	private LocalMatchService matchService;
	
	@GetMapping(value = "/open")
	public String open(HttpSession session) {
		System.out.println("Local open, UA session: "+ session.getId());
		String url = LocalManager.get().getConfiguration().getString("SC");
		
		Client client = (Client) session.getAttribute("client");
		if (client==null) {
			client = new Client();
			session.setAttribute("client", client);
		}
		client.sendGet(url + "match/open?uaSession=" + session.getId());
		url = url.replace("http://", "ws://");
		return url + "remoteWS";
	}
	
	@GetMapping(value = "/play")
	public LocalMatch playMatch(HttpSession session) {
		if (session.getAttribute("userName") == null) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Usuario no logeado");
		}
		System.out.println("Local play, UA session: "+ session.getId());
		String url = LocalManager.get().getConfiguration().getString("SC");
		
		Client client = (Client) session.getAttribute("client");
		
		JSONObject response = client.sendGet(url + "match/play?uaSession=" + session.getId());
		String word = this.matchService.getRandomWord();
		if (response==null)
			response = client.sendGet(url + "match/newMatch/" + word + "?uaSession=" + session.getId());
		
		LocalMatch match = matchService.addMatch(response);
		if (match.getWord()==null)
			match.setWord(word);
		return match;
	}

	@PostMapping(value = "/guess")
	public void guess(HttpSession session, @RequestBody Map<String, String> info) {
		JSONObject jso = new JSONObject(info);
		
		Client client = (Client) session.getAttribute("client");
		String url = LocalManager.get().getConfiguration().getString("SC");
		
		client.sendPost(url + "match/guess?uaSession=" + session.getId(), jso);
	}
}
