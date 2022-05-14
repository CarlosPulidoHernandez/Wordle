package edu.uclm.esi.wordleplayer.model;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.uclm.esi.wordleplayer.dao.WordRepository;
import edu.uclm.esi.wordleplayer.http.Client;
import edu.uclm.esi.wordleplayer.http.LocalManager;
import edu.uclm.esi.wordleplayer.ws.WSClient;

public class FakePlayer {
	
	private WSClient wsClient;
	private int numberOfWords;
	private SecureRandom dado;
	
	private WordRepository wordDAO;
	private Client httpClient;
	private String serverIp;
	private String idMatch;
	private String uaSession;
	
	private JSONArray testWords;
	private EntityManager entityManager;
	
	public FakePlayer(WordRepository wordDAO, EntityManager entityManager) {
		this.wordDAO = wordDAO;
		this.numberOfWords = (int) this.wordDAO.count();
		this.dado = new SecureRandom();
		this.httpClient = new Client();
		this.uaSession = UUID.randomUUID().toString();
		this.testWords = new JSONArray();
		this.entityManager = entityManager;
		this.serverIp = LocalManager.get().getConfiguration().getString("wordleSC");
	}
	
	public void doOpen() throws Exception {
		String url = "http://" + this.serverIp + ":8000/match/open?uaSession=" + this.uaSession;
		httpClient.sendGet(url);
		
		url = "ws://" + this.serverIp + ":8000/remoteWS?uaSession=" + this.uaSession;
		this.wsClient = new WSClient(url, this);
	}
	
	public void doPlay() {
		String url = "http://" + this.serverIp + ":8000/match/play?uaSession=" + this.uaSession;
		String response = httpClient.sendGet(url);
		JSONObject jso = new JSONObject(response);
		this.idMatch = jso.getString("id");
	}

	public void guessWord() {
		int posicion = this.dado.nextInt(this.numberOfWords)+1;
		Word word = this.wordDAO.findByPosicion(posicion);
		JSONObject jso = new JSONObject().
				put("idMatch", this.idMatch).
				put("type", "GUESS").
				put("game","WORDLE").
				put("testWord", word.getPalabra());
		this.wsClient.sendMessage(jso.toString());
	}

	public void guessWord(JSONObject jso) {
		System.out.println(jso);
		String testWord = jso.getString("testWord");
		
		JSONObject jsoTestWord = new JSONObject().
				put("testWord", testWord);
		
		JSONArray guessesA = jso.getJSONArray("guessesA");
		JSONArray guessesB = jso.getJSONArray("guessesB");
		if (guessesA.length()>0)
			jsoTestWord.put("a", guessesA.get(guessesA.length()-1));
		if (guessesB.length()>0)
			jsoTestWord.put("b", guessesB.get(guessesB.length()-1));
		this.testWords.put(jsoTestWord);
		
		String sql = buildSQL();
		String word = this.findWord(sql);
		System.out.println(word);
		try {
			long pausa = 2000 + this.dado.nextInt(5000);
			Thread.sleep(pausa);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		jso = new JSONObject().
				put("idMatch", this.idMatch).
				put("type", "GUESS").
				put("game","WORDLE").
				put("testWord", word);
		this.wsClient.sendMessage(jso.toString());
	}

	private String buildSQL() {
		StringBuilder sbWhere = new StringBuilder();
		JSONObject jsoTestWord;
		String testWord;
		JSONObject jsoA, jsoB;
		String state;
		for (int i=0; i<this.testWords.length(); i++) {
			jsoTestWord = this.testWords.getJSONObject(i);
			jsoA = jsoTestWord.optJSONObject("a");
			jsoB = jsoTestWord.optJSONObject("b");
			if (jsoA!=null) {
				testWord = jsoA.getString("testWord");
				state = jsoA.getString("state");
				for (int j=0; j<state.length(); j++) {
					if (state.charAt(j)=='M')
						sbWhere.append("" + testWord.charAt(j) + (j+1) + "=1 and ");
					else if (state.charAt(j)=='H')
						sbWhere.append("" + testWord.charAt(j) + "=1 and ");
					else if (state.charAt(j)=='V')
						sbWhere.append("" + testWord.charAt(j) + " is null and ");
				}
			}
			if (jsoB!=null) {
				testWord = jsoB.getString("testWord");
				state = jsoB.getString("state");
				for (int j=0; j<state.length(); j++) {
					if (state.charAt(j)=='M')
						sbWhere.append("" + testWord.charAt(j) + (j+1) + "=1 and ");
					else if (state.charAt(j)=='H')
						sbWhere.append("" + testWord.charAt(j) + "=1 and ");
					else if (state.charAt(j)=='V')
						sbWhere.append("" + testWord.charAt(j) + " is null and ");
				}
			}
		}
		String r = sbWhere.toString();
		if (r.endsWith(" and "))
			r = "where " + r.substring(0, r.length()-5);
		r = "select palabra from palabras " + r;
		return r;
	}
	
	@SuppressWarnings("unchecked")
	private String findWord(String sql) {
		Query query = this.entityManager.createNativeQuery(sql);
		List<String> words = query.getResultList();
		if (words.size()==0)
			return "CACAR";
		int pos = this.dado.nextInt(words.size());
		return words.get(pos);
	}
}
