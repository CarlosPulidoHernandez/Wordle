package edu.uclm.esi.wordlesc.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.uclm.esi.wordlesc.model.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

}
