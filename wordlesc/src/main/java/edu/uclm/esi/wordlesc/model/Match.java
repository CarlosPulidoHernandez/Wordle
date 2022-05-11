package edu.uclm.esi.wordlesc.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import edu.uclm.esi.wordlesc.http.RemoteManager;

public class Match {
	private String id;
	private String playerA, playerB;
	private String word;
	private List<String> guessesA, guessesB;
	private WebSocketSession webSocketSessionA;
	private WebSocketSession webSocketSessionB;
	
	public Match(String playerA, String word) {
		this.id = UUID.randomUUID().toString();
		this.playerA = playerA;
		this.word = word.toUpperCase();
		this.guessesA = new ArrayList<>();
		this.guessesB = new ArrayList<>();
		
		WebSocketSession webSocketSession = RemoteManager.get().findWrapperSession(playerA).getWebSocketSession();
		this.webSocketSessionA = webSocketSession;
		new Watch(this, 5000);
		System.out.println(this.toString());
	}

	public void setPlayerB(String playerB) {
		this.playerB = playerB;
		WebSocketSession webSocketSession = RemoteManager.get().findWrapperSession(playerB).getWebSocketSession();
		this.webSocketSessionB = webSocketSession;
		this.matchReady();
		System.out.println(this.toString());
	}

	public String getId() {
		return this.id;
	}

	public void guess(String player, String test) {
		test = test.toUpperCase();
		
		Guess guess = new Guess(this.word, test);
		String state = guess.getState();
		if (player.equals(this.playerA)) {
			this.guessesA.add(state);
		} else {
			this.guessesB.add(state);
		}
	}

	public String getPlayerA() {
		return playerA;
	}
	
	public String getPlayerB() {
		return playerB;
	}
	
	public List<String> getGuessesA() {
		return guessesA;
	}
	
	public List<String> getGuessesB() {
		return guessesB;
	}
	
	private String getWinner(String quien, String testword) {
		if (testword.equalsIgnoreCase(word)) {
			if (quien.equals("A"))
				return "A";
			else
				return "B";
		}
		return null;
	}
	
	private void matchReady() {
		JSONObject jso = new JSONObject().put("type", "READY").
				put("id", this.id).
				put("playerA", this.playerA).
				put("playerB", this.playerB).
				put("length", this.word.length()).
				put("guessesA", new JSONArray()).
				put("guessesB", new JSONArray());
		try {
			TextMessage message = new TextMessage(jso.toString());
			this.webSocketSessionA.sendMessage(message);
			this.webSocketSessionB.sendMessage(message);
		} catch (Exception e) {
			System.err.println(e.toString());
		}
	}

	public void actualizarClientes(String wsIdJugador, String testWord, Match match) {
		String quien = this.webSocketSessionA.getId().equals(wsIdJugador) ? "A" : "B";
		String winner = match.getWinner(quien, testWord);
		String state = this.webSocketSessionA.getId().equals(wsIdJugador) 
				? this.guessesA.get(this.guessesA.size()-1) : this.guessesB.get(this.guessesB.size()-1);
		JSONObject jso = new JSONObject().
				put("type", "UNO HA PUESTO, OYE").
				put("quien", quien).
				put("testWord", testWord).
				put("state", state).
				put("winner", winner);
		try {
			TextMessage message = new TextMessage(jso.toString());
			this.webSocketSessionA.sendMessage(message);
			this.webSocketSessionB.sendMessage(message);
		} catch (Exception e) {
			System.err.println(e.toString());
		}
	}
}
