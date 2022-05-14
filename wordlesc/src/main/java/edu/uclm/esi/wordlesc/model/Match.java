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
	private JSONArray guessesA, guessesB;
	private WebSocketSession webSocketSessionA;
	private WebSocketSession webSocketSessionB;
	private String winner;
	
	public Match(String playerA, String word) {
		this.id = UUID.randomUUID().toString();
		this.playerA = playerA;
		this.word = word.toUpperCase();
		this.guessesA = new JSONArray();
		this.guessesB = new JSONArray();
		
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
		JSONObject jsoGuess = new JSONObject().
				put("testWord", test).
				put("state", state);
		if (player.equals(this.playerA)) {
			this.guessesA.put(jsoGuess);
			if (state.equals("MMMMM"))
				this.winner = "A";
		} else {
			this.guessesB.put(jsoGuess);
			if (state.equals("MMMMM"))
				this.winner = "B";
		}
	}

	public String getPlayerA() {
		return playerA;
	}
	
	public String getPlayerB() {
		return playerB;
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

	public void actualizarClientes(String wsIdJugador, String testWord) {
		String quien = this.webSocketSessionA.getId().equals(wsIdJugador) ? "A" : "B";
		
		JSONObject jso = new JSONObject().
				put("type", "UNO HA PUESTO, OYE").
				put("quien", quien).
				put("testWord", testWord).
				put("guessesA", this.guessesA).
				put("guessesB", this.guessesB).
				put("winner", this.winner);
		try {
			TextMessage message = new TextMessage(jso.toString());
			this.webSocketSessionA.sendMessage(message);
			this.webSocketSessionB.sendMessage(message);
		} catch (Exception e) {
			System.err.println(e.toString());
		}
	}

	public String getWinner() {
		return winner;
	}
}
