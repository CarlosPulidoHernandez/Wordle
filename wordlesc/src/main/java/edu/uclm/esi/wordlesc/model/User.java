package edu.uclm.esi.wordlesc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.Table;

import java.util.Base64;

@Entity
@Table(indexes = {
		@Index(unique = true, columnList = "email"),
})
public class User {

	@Id
	private String userName;
	private String email;
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String pwd;
	private Integer wrongAttempts;
	private Long confirmationDate;
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String picture;

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
	
	public String getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		byte[] b64 = Base64.getEncoder().encode(picture);
		this.picture = new String(b64);	
	}
}
