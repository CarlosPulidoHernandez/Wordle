package edu.uclm.esi.wordlesc.ws;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import edu.uclm.esi.wordlesc.http.RemoteManager;
import edu.uclm.esi.wordlesc.model.Match;
import edu.uclm.esi.wordlesc.services.MatchService;

@Component
public class RemoteWS extends TextWebSocketHandler {
	
	private static MatchService matchService;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		session.setBinaryMessageSizeLimit(1000*1024*1024);
		String httpSessionId = this.getHttpSessionId(session);
		
		WrapperSession wrapperSession = RemoteManager.get().findWrapperSession(httpSessionId);
		wrapperSession.setWebSocketSession(session);
		RemoteManager.get().addWrapperSession(session.getId(), wrapperSession);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		String payload = message.getPayload();
		JSONObject jso = new JSONObject(payload);
		String idMatch = jso.getString("idMatch");
		String testWord = jso.getString("testWord");
		
		WrapperSession wrapperSession = RemoteManager.get().findWrapperSessionByWSId(session.getId());
		String httpSessionId = wrapperSession.getUaSessionId();
		Match match = matchService.find(idMatch);
		match.guess(httpSessionId, testWord);
		match.actualizarClientes(session.getId(), testWord, match);
	}
	
	protected String getHttpSessionId(WebSocketSession session) {
		HttpHeaders headers = session.getHandshakeHeaders();
		List<String> cookies = headers.get("cookie");
		for (String cookie : cookies) {
			int posJSessionId = cookie.indexOf("JSESSIONID=");
			String httpSessionId = cookie.substring(posJSessionId + 11);
			return httpSessionId;
		}
		return null;
	}
	
	@Autowired
	public void setMatchService(MatchService matchService) {
		RemoteWS.matchService = matchService;
	}
}
