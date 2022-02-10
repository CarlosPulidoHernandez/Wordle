package edu.uclm.esi.wordlesc.http;

import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import edu.uclm.esi.wordlesc.ws.WrapperSession;

@Component
public class RemoteManager {
	
	private JSONObject configuration;
	private ConcurrentHashMap<String, WrapperSession> wrapperSessions = new ConcurrentHashMap<>();

	private RemoteManager() {
		try {
			loadParameters();
		} catch (Exception e) {
			System.err.println("Error al leer el fichero parametros.txt: " + e.getMessage());
			System.exit(-1);
		}
	}
	
	public void addWrapperSession(WrapperSession wrapperSession) {
		this.wrapperSessions.put(wrapperSession.getUaSessionId(), wrapperSession);
	}
	
	public WrapperSession findWrapperSession(String httpSessionId) {
		return this.wrapperSessions.get(httpSessionId);
	}
	
	private static class LocalManagerHolder {
		static RemoteManager singleton=new RemoteManager();
	}
	
	@Bean
	public static RemoteManager get() {
		return LocalManagerHolder.singleton;
	}

	public JSONObject getConfiguration() {
		return configuration;
	}
	
	private void loadParameters() throws IOException {
		this.configuration = read("./parametros.txt");
	}
	
	private JSONObject read(String fileName) throws IOException {
		 ClassLoader classLoader = getClass().getClassLoader();
		 try (InputStream fis = classLoader.getResourceAsStream(fileName)) {
			byte[] b = new byte[fis.available()];
			fis.read(b);
			String s = new String(b);
			return new JSONObject(s);
		 }
	}
	
	public JSONArray readFileAsJSONArray(String fileName) throws IOException {
		ClassLoader classLoader = getClass().getClassLoader();
		 try (InputStream fis = classLoader.getResourceAsStream(fileName)) {
			byte[] b = new byte[fis.available()];
			fis.read(b);
			String s = new String(b);
			return new JSONArray(s);
		 }
	}

	public WrapperSession findWrapperSessionByWSId(String id) {
		// TODO Auto-generated method stub
		return null;
	}
}
