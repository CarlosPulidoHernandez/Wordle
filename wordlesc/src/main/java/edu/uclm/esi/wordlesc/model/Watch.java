package edu.uclm.esi.wordlesc.model;

import edu.uclm.esi.wordlesc.http.Client;
import edu.uclm.esi.wordlesc.http.RemoteManager;

public class Watch implements Runnable {

	private Match match;
	private long waitingTime;

	public Watch(Match match, long waitingTime) {
		this.match = match;
		this.waitingTime = waitingTime;
		new Thread(this).start();
	}

	@Override
	public void run() {
		try {
			Thread.sleep(this.waitingTime);
		} catch (InterruptedException e) {
		}
		
		if (match.getPlayerB()==null) {
			String url = RemoteManager.get().getConfiguration().getString("fakeUser");
			url = url + "fakePlayer/start";
			Client client = new Client();
			client.sendGet(url);
		}
	}
}