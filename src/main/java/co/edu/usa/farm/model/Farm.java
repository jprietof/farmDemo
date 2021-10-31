package co.edu.usa.farm.model;

import java.util.*;
import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * 
 * @author jprietof
 * @version 1.1
 */
@Entity
@Table(name = "farm")
public class Farm implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * Creación de la tabla con sus campos
	 * Atributo Id de la tabla
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	/**
	 * Atributo nombre de la finca
	 */
	private String name;
	/**
	 * Atributo dirección de la finca
	 */
	private String address;
	/**
	 * Atributo extensión de la finca
	 */
	private Integer extension;
	/**
	 * Atributo descripción de la finca
	 */
	private String description;
	/**
	 * Relación muchos a uno con la tabla category
	 * una categoría tiene varias fincas y una finca pertenece a una categoría
	 */
	
	@ManyToOne
	@JoinColumn(name="categoryId")
	@JsonIgnoreProperties("farms")
	private Category category;
	
	/**
	 * Relación uno a muchos con la tabla message
	 * una finca tiene varios mensajes y un mensaje se crea a una finca
	 */
	@OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "farm")
	@JsonIgnoreProperties({"farm", "client"})
	private List<Message> messages;
	/**
	 * Relación uno a muchos con la tabla reservations
	 * una finca tiene varias reservaciones pero una reservación le pertenece a una finca
	 */
	@OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "farm")
	@JsonIgnoreProperties({"farm", "client"})
	private List<Reservation> reservations;
	/**
	 * Getters and Setters de los campos de Farm
	 * @return
	 */
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getExtension() {
		return extension;
	}

	public void setExtension(Integer extension) {
		this.extension = extension;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public List<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(List<Reservation> reservations) {
		this.reservations = reservations;
	}
	
	
}
