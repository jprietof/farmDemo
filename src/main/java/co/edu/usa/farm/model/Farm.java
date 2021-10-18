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
	
	
}
