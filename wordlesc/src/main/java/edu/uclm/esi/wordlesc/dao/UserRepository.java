package edu.uclm.esi.wordlesc.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uclm.esi.wordlesc.model.User;

public interface UserRepository extends JpaRepository <User, String> {

}
