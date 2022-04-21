package edu.uclm.esi.wordlesc.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Token {
	@Id
	@Column(length = 36)
	private String id;
	private String userName;
	private long date;
	
	public Token() { }

	public Token(String userName) {
		this.id = UUID.randomUUID().toString();
		this.userName = userName;
		this.date = System.currentTimeMillis();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public long getDate() {
		return date;
	}

	public void setDate(long date) {
		this.date = date;
	}
	
}