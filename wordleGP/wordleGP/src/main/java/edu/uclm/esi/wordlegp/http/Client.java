package edu.uclm.esi.wordlegp.http;

import java.io.IOException;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class Client {
	
	private BasicCookieStore cookieStore = new BasicCookieStore();

	public JSONObject sendGet(String url) {
		try(CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(this.cookieStore).build()) {
			HttpGet get = new HttpGet(url);
			try(CloseableHttpResponse response = client.execute(get)) {
				HttpEntity entity = response.getEntity();
				Header[] hh = response.getAllHeaders();
				for (int i=0; i<hh.length; i++)
					System.out.println(hh[i].getName() + " = " + hh[i].getValue());
				System.out.println("-----------------");
				String responseText = EntityUtils.toString(entity);
				if (responseText==null || responseText.length()==0)
					return null;
				return new JSONObject(responseText);
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
			}
		} catch (IOException e1) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e1.getMessage());
		}
	}

	public JSONObject sendPost(String url, JSONObject payload) {
		try(CloseableHttpClient client = HttpClientBuilder.create().setDefaultCookieStore(this.cookieStore).build()) {
			HttpPost post = new HttpPost(url);
			try {
				HttpEntity entity = new StringEntity(payload.toString());
				post.setEntity(entity);
				post.setHeader("Accept", "application/json");
				post.setHeader("Content-type", "application/json");
				
				CloseableHttpResponse response = client.execute(post);
				entity = response.getEntity();
				String responseText = EntityUtils.toString(entity);
				if (responseText==null)
					return null;
				client.close();
				return new JSONObject(responseText);
			} catch (Exception e) {
				throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
			}
		} catch (IOException e1) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e1.getMessage());
		}
	}
}
