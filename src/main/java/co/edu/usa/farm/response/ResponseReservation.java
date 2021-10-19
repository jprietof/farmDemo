package co.edu.usa.farm.response;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.farm.model.Reservation;
import co.edu.usa.farm.model.dao.IReservation;

@Repository
public class ResponseReservation {
	@Autowired
private IReservation crudReservation;
	
	public List<Reservation> getAll(){
		return (List<Reservation>) crudReservation.findAll();
	}
	
	public Optional<Reservation> getReservation(int id){
		return crudReservation.findById(id);
	}
	
	public Reservation save(Reservation reservation) {
		return crudReservation.save(reservation);
	}
	
	public void delete(Reservation reservation) {
		crudReservation.delete(reservation);
	}

}
