package edu.uclm.esi.wordlesc.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.uclm.esi.wordlesc.model.User;

@Repository
public interface UserRepository extends JpaRepository <User, String> {
	
	public User findByUserNameAndPwd(String userName, String pwd);

	public Optional<User> findByEmail(String email);
	
}
