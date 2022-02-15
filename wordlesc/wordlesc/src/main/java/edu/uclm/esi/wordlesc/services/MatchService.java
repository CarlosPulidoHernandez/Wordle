package edu.uclm.esi.wordlesc.services;

import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import edu.uclm.esi.wordlesc.model.Match;

@Service
public class MatchService {
	
	private Vector<Match> pendingMatches;
	private ConcurrentHashMap<String, Match> inPlayMatches;
	
	public MatchService() {
		this.pendingMatches = new Vector<>();
		this.inPlayMatches =  new ConcurrentHashMap<>();
	}

	public Match findPendingMatch(String playerB) {
		if (this.pendingMatches.isEmpty())
			return null;
		
		Match match = this.pendingMatches.remove(0);
		match.setPlayerB(playerB);
		inPlayMatches.put(match.getId(), match);
		return match;
	}

	public Match newMatch(String playerA, String word) {
		Match match = new Match(playerA, word);
		this.pendingMatches.add(match);
		return match;
	}

	public Match guess(String player, String matchId, String word) {
		Match match = inPlayMatches.get(matchId);
		match.guess(player, word);
		return match;
	}

	public Match find(String matchId) {
		return this.inPlayMatches.get(matchId);
	}

}
