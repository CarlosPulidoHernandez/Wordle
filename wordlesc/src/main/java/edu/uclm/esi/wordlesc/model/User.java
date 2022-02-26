package edu.uclm.esi.wordlesc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;

import com.mysql.cj.jdbc.Blob;

@Entity
public class User {
	
	@Id
	String userName;
	String email;
	@Lob
	@Column(columnDefinition = "LONGTEXT")//para que spring sepa que es algo mu grande 
	String password;

	public void setUserName(String userName) {
		this.userName=userName;
	}

	public void setEmail(String email) {
		this.email=email;
	}

	public void setPassword(String pwd) {
		this.password=org.apache.commons.codec.digest.DigestUtils.sha512Hex(pwd);
	}

	public String getUserName() {
		return userName;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}
	

}
