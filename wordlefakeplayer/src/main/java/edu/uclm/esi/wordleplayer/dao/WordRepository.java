package edu.uclm.esi.wordleplayer.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.uclm.esi.wordleplayer.model.Word;

@Repository
public interface WordRepository extends JpaRepository <Word, Integer> {

	Word findByPosicion(int posicion);

}
