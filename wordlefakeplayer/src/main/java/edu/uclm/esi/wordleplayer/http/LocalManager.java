package edu.uclm.esi.wordleplayer.http;

import java.io.IOException;
import java.io.InputStream;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class LocalManager {
	
	private JSONObject configuration;

	private LocalManager() {
		try {
			loadParameters();
		} catch (Exception e) {
			System.err.println("Error al leer el fichero parametros.txt: " + e.getMessage());
			System.exit(-1);
		}
	}
	
	private static class LocalManagerHolder {
		static LocalManager singleton=new LocalManager();
	}
	
	@Bean
	public static LocalManager get() {
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
}