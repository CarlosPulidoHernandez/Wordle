package edu.uclm.esi.wordlesc.ws;

import org.springframework.web.socket.WebSocketSession;

public class WrapperSession {
	private WebSocketSession webSocketSession;
	private String uaSessionId;
	
	public void setWebSocketSession(WebSocketSession webSocketSession) {
		this.webSocketSession = webSocketSession;
	}
	
	public WebSocketSession getWebSocketSession() {
		return webSocketSession;
	}

	public void setUASession(String uaSession) {
		this.uaSessionId = uaSession;
	}

	public String getUaSessionId() {
		return uaSessionId;
	}
}
