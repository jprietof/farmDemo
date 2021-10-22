package co.edu.usa.farm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

import co.edu.usa.farm.model.Reservation;
import co.edu.usa.farm.response.ResponseReservation;

@Service
public class ServiceReservation {
	@Autowired
	private ResponseReservation metodosCrud;
	
	public List<Reservation> getAll(){
		return metodosCrud.getAll();
	}
	
	public Optional<Reservation> getReservation(int reservationId){
		return metodosCrud.getReservation(reservationId);
	}
	
	public Reservation save(Reservation reservation) {
		if(reservation.getIdReservation()==null) {
			return metodosCrud.save(reservation);
		}else {
			Optional<Reservation> e = metodosCrud.getReservation(reservation.getIdReservation());
			if(e.isEmpty()) {
				return metodosCrud.save(reservation);
			}else {
				return reservation;
			}
		}
	}
	
	public Reservation update(Reservation reservation) {
		if(reservation.getIdReservation()!=null) {
			Optional<Reservation> e= metodosCrud.getReservation(reservation.getIdReservation());
			if(!e.isEmpty()) {
				if(reservation.getStartDate()!=null) {
					e.get().setStartDate(reservation.getStartDate());
				}
				if(reservation.getDevolutionDate()!=null) {
					e.get().setDevolutionDate(reservation.getDevolutionDate());
				}
				if(reservation.getStatus()!=null) {
					e.get().setStatus(reservation.getStatus());
				}
				metodosCrud.save(e.get());
				return e.get();
			}else {
				return reservation;
			}
		}else {
			return reservation;
		}
	}
	
	public boolean deleteReservation(int reservationId) {
		Boolean aBoolean = getReservation(reservationId).map(reservation ->{
			metodosCrud.delete(reservation);
			return true;
		}).orElse(false);
		return aBoolean;
	}

}
