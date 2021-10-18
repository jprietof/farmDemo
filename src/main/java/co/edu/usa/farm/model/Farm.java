package co.edu.usa.farm.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

@Entity
@Table(name = "farm")
public class Farm implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	

}
