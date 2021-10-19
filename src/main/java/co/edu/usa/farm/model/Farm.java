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

@Entity
@Table(name = "farm")
public class Farm implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String address;
	private Integer exension;
	private String name;
	private String description;
	
	@ManyToOne
	@JoinColumn(name="categoryId")
	@JsonIgnoreProperties("farm")
	private Category category;
	
	@OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "farm")
	@JsonIgnoreProperties({"farm", "client"})
	private List<Message> messages;
	
	@OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "farm")
	@JsonIgnoreProperties({"farm", "client"})
	private List<Reservation> reservations;

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

	public Integer getExension() {
		return exension;
	}

	public void setExension(Integer exension) {
		this.exension = exension;
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
