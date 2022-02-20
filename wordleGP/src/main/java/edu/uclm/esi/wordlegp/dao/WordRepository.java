package edu.uclm.esi.wordlegp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.uclm.esi.wordlegp.model.Word;

@Repository
public interface WordRepository extends JpaRepository <Word, Integer> {

}
