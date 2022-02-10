package edu.uclm.esi.wordlegp.model;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

public class LocalMatch {
	private String id;
	private String word;
	private String playerA;
	private String playerB;
	private List<String> guessesA, guessesB;
	
	public LocalMatch() {
		this.guessesA = new ArrayList<>();
		this.guessesB = new ArrayList<>();
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public void setWord(String word) {
		this.word = word;
	}
	
	public String getWord() {
		return word;
	}

	public String getId() {
		return this.id;
	}

	public void guess(HttpSession player, String word) {
		System.out.println(this.toString() + "; guessed: " + word);
	}

	@Override
	public String toString() {
		return this.id + "; " + this.word;
	}
	
	public List<String> getGuessesA() {
		return guessesA;
	}
	
	public List<String> getGuessesB() {
		return guessesB;
	}

	public void setPlayerA(String playerA) {
		this.playerA = playerA;
	}
	
	public void setPlayerB(String playerB) {
		this.playerB = playerB;
	}
	
	public String getPlayerA() {
		return playerA;
	}
	
	public String getPlayerB() {
		return playerB;
	}
	
	public int getLength() {
		return this.word.length();
	}
}
