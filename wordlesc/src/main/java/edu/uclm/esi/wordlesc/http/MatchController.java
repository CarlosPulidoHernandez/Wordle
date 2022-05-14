package edu.uclm.esi.wordlesc.http;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.uclm.esi.wordlesc.model.Match;
import edu.uclm.esi.wordlesc.services.MatchService;
import edu.uclm.esi.wordlesc.ws.WrapperSession;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("match")
public class MatchController {
	
	@Autowired
	private MatchService matchService;
	
	@GetMapping(value = "/open")
	public void open(HttpSession session, @RequestParam String uaSession) {
		System.out.println("open :: UA session: " + uaSession);
		System.out.println("open :: GC session: " + session.getId());
		WrapperSession wrapperSession = new WrapperSession();
		wrapperSession.setUASession(uaSession);
		RemoteManager.get().addWrapperSession(wrapperSession);
	}
	
	@GetMapping(value = "/play")
	public Match play(HttpSession session, @RequestParam String uaSession) {
		System.out.println("play :: GC session: " + session.getId());
		System.out.println("newMatch :: UA session.id: " + uaSession);
		Match match = matchService.findPendingMatch(uaSession);
		return match;
	}
	
	@GetMapping(value = "/newMatch/{word}")
	public Match newMatch(HttpSession session, @PathVariable String word, @RequestParam String uaSession) {
		System.out.println("newMatch :: GC session.id: " + session.getId());
		System.out.println("newMatch :: UA session.id: " + uaSession);
		Match match = matchService.newMatch(uaSession, word);
		return match;
	}
	
	@PostMapping(value = "/guess")
	public void guess(HttpSession session, @RequestBody Map<String, String> info, @RequestParam String uaSession) {
		JSONObject jso = new JSONObject(info);
		String matchId = jso.getString("matchId");
		String testWord = jso.getString("testWord");
		matchService.guess(uaSession, matchId, testWord);
	}
}
