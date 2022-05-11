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
	private ConcurrentHashMap<String, WrapperSession> wrapperSessionsByHttp = new ConcurrentHashMap<>();
	private ConcurrentHashMap<String, WrapperSession> wrapperSessionsByWS = new ConcurrentHashMap<>();

	private RemoteManager() {
		try {
			loadParameters();
		} catch (Exception e) {
			System.err.println("Error al leer el fichero parametros.txt: " + e.getMessage());
			System.exit(-1);
		}
	}
	
	public void addWrapperSession(WrapperSession wrapperSession) {
		this.wrapperSessionsByHttp.put(wrapperSession.getUaSessionId(), wrapperSession);
	}
	
	public WrapperSession findWrapperSession(String httpSessionId) {
		return this.wrapperSessionsByHttp.get(httpSessionId);
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
	
	public JSONObject read(String fileName) throws IOException {
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
		return this.wrapperSessionsByWS.get(id);
	}

	public void addWrapperSession(String id, WrapperSession wrapperSession) {
		this.wrapperSessionsByWS.put(id, wrapperSession);
	}

	public String readFileAsText(String fileName) throws IOException {
		ClassLoader classLoader = getClass().getClassLoader();
		 try (InputStream fis = classLoader.getResourceAsStream(fileName)) {
			byte[] b = new byte[fis.available()];
			fis.read(b);
			return  new String(b);
		 }
	}
}
