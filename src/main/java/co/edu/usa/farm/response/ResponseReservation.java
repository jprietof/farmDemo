package co.edu.usa.farm.response;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.farm.model.Client;
import co.edu.usa.farm.model.Reservation;
import co.edu.usa.farm.model.dao.IReservation;
import co.edu.usa.farm.reports.ReportsClient;

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
	/**
	 * Reto 5
	 */
	public List<Reservation> ReservacionStatusRepositorio (String status){
        return crudReservation.findAllByStatus(status);
    }
    
    public List<Reservation> ReservacionTiempoRepositorio (Date a, Date b){
        return crudReservation.findAllByStartDateAfterAndStartDateBefore(a, b);
    
    }
    /**
     * Create JSON
     * @return
     */
    public List<ReportsClient> getClientesRepositorio(){
        List<ReportsClient> res = new ArrayList<>();
        List<Object[]> report = crudReservation.countTotalReservationsByClient();
        for(int i=0; i<report.size(); i++){
            res.add(new ReportsClient((Long)report.get(i)[1],(Client) report.get(i)[0]));
        }
        return res;
    }

}
