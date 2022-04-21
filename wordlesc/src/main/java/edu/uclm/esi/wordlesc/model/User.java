package edu.uclm.esi.wordlesc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class User {

	@Id
	private String userName;
	private String email;
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String pwd;
	private Integer wrongAttempts;
	private Long confirmationDate;

	public User() {
		this.wrongAttempts = 0;
	}
	
	public void increaseWrongAttempts() {
		this.wrongAttempts++;
	}

	public void setUsername(String userName) {
		this.userName = userName;
	}

	public void setEmail(String email) {
		this.email = email;		
	}

	public void setPwd(String pwd) {
		this.pwd = org.apache.commons.codec.digest.DigestUtils.sha512Hex(pwd);		
	}

	public String getUserName() {
		return userName;
	}

	public String getEmail() {
		return email;
	}

	public String getPwd() {
		return pwd;
	}	
	
	public Integer getWrongAttempts() {
		return wrongAttempts;
	}

	public void setWrongAttempts(Integer wrongAttempts) {
		this.wrongAttempts = wrongAttempts;
	}
	
	public Long getConfirmationDate() {
		return confirmationDate;
	}

	public void setConfirmationDate(Long confirmationDate) {
		this.confirmationDate = confirmationDate;
	}
}
