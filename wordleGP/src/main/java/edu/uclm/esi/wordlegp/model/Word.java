package edu.uclm.esi.wordlegp.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "palabras")
public class Word {
	@Id
	private Integer palabraId;
	private String palabra;
	private Integer posicion;
	
	public Integer getPalabraId() {
		return palabraId;
	}
	
	public void setPalabraId(Integer palabraId) {
		this.palabraId = palabraId;
	}
	
	public String getPalabra() {
		return palabra;
	}
	
	public void setPalabra(String palabra) {
		this.palabra = palabra;
	}
	
	public Integer getPosicion() {
		return posicion;
	}
	
	public void setPosicion(Integer posicion) {
		this.posicion = posicion;
	}
}
