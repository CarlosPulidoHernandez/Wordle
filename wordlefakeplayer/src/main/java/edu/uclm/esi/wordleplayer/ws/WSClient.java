package edu.uclm.esi.wordleplayer.ws;

import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CountDownLatch;

import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.ContainerProvider;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;

import org.json.JSONObject;

import edu.uclm.esi.wordleplayer.model.FakePlayer;

@ClientEndpoint
public class WSClient {
	private CountDownLatch latch = new CountDownLatch(1);
    private Session session;
	private FakePlayer player;
 
    public WSClient(String url, FakePlayer player) throws Exception {
    	this.player = player;
    	WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        container.connectToServer(this, new URI(url));
        this.latch.await();
	}

	@OnOpen
    public void onOpen(Session session) {
        System.out.println("Connected to server");
        this.session = session;
        latch.countDown();
        this.player.doPlay();
    }
 
    @OnMessage
    public void onText(String message, Session session) {
        JSONObject jso = new JSONObject(message);
        String type = jso.getString("type");
        if (type.equals("READY"))
        	this.player.guessWord();
        else if (type.equals("UNO HA PUESTO, OYE")) {
        	if (jso.optString("winner").length()==0)
        		this.player.guessWord(jso);
			else
				try {
					this.session.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
        }
    }
 
    @OnClose
    public void onClose(CloseReason reason, Session session) {
        System.out.println("Closing a WebSocket due to " + reason.getReasonPhrase());
    }
 
    public CountDownLatch getLatch() {
        return latch;
    }
 
    public void sendMessage(String message) {
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
