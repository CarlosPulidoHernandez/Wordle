package edu.uclm.esi.wordlesc.model;

public class Guess {

	private String state;

	public Guess(String word, String test) {
		this.state = "";
		this.calculate(word, test);
	}
	
	private void calculate(String word, String test) {
		for (int i=0; i<word.length(); i++) {
			if (word.charAt(i)==test.charAt(i)) {
				this.state = this.state + 'M';
			} else if (word.indexOf(test.charAt(i))!=-1) {
				this.state = this.state + 'H';
			} else 
				this.state = this.state + 'V';
		}
	}

	public String getState() {
		return state;
	}
}
