package edu.uclm.esi.wordlegp.services;

import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlegp.model.LocalMatch;

@Service
public class LocalMatchService {
	
	private ConcurrentHashMap<String, LocalMatch> matches = new ConcurrentHashMap<>();

	public LocalMatch addMatch(JSONObject jsoMatch) {
		LocalMatch match = this.matches.get(jsoMatch.getString("id"));
		if (match==null) {
			match = new LocalMatch();
			match.setId(jsoMatch.getString("id"));
			match.setPlayerA(jsoMatch.optString("playerA"));
			this.matches.put(match.getId(), match);
		} else {
			match.setPlayerB(jsoMatch.optString("playerB"));
		}
		return match;
	}

	public LocalMatch find(String matchId) {
		return this.matches.get(matchId);
	}

}
