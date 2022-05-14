package edu.uclm.esi.wordleplayer.http;

import java.util.List;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import edu.uclm.esi.wordleplayer.dao.WordRepository;
import edu.uclm.esi.wordleplayer.model.FakePlayer;
import edu.uclm.esi.wordleplayer.model.Word;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("fakePlayer")
public class FakePlayerController {

	@Autowired
	private WordRepository wordDAO;
	
	@Autowired
	private EntityManager entityManager;
	
	//@Autowired
	public void indexar() {
		List<Word> words = this.wordDAO.findAll();
		for (int i=0; i<words.size(); i++) {
			Word word = words.get(i);
			for (int j=0; j<word.getPalabra().length(); j++) 
				word.setLetra(word.getPalabra().charAt(j));
			this.wordDAO.save(word);
		}
		System.out.println("Hecho");
	}
	
	@GetMapping("/start")
	public void start(HttpServletRequest request) {
		try {			
			FakePlayer player = (FakePlayer) request.getSession().getAttribute("player");
			if (player==null) {
				player = new FakePlayer(this.wordDAO, this.entityManager);
				request.getSession().setAttribute("player", player);
			}
			
			player.doOpen();
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
}
