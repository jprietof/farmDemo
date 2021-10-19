package co.edu.usa.farm.model.dao;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.farm.model.Reservation;

public interface IReservation extends CrudRepository<Reservation, Integer>{

}
