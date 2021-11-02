package co.edu.usa.farm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import co.edu.usa.farm.model.Reservation;
import co.edu.usa.farm.reports.ReportsClient;
import co.edu.usa.farm.reports.ReportsStatus;
import co.edu.usa.farm.response.ResponseReservation;

/**
 * 
 * @author jprietof
 * @version 1.1
 *
 */
@Service
public class ServiceReservation {
	@Autowired
	private ResponseReservation metodosCrud;
	/**
	 * 
	 * @return
	 */
	public List<Reservation> getAll(){
		return metodosCrud.getAll();
	}
	/**
	 * 
	 * @param reservationId
	 * @return
	 */
	public Optional<Reservation> getReservation(int reservationId){
		return metodosCrud.getReservation(reservationId);
	}
	/**
	 * 
	 * @param reservation
	 * @return
	 */
	public Reservation save(Reservation reservation) {
		/**
		 * Method save 
		 */
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
	/**
	 * 
	 * @param reservation
	 * @return
	 */
	public Reservation update(Reservation reservation) {
		/**
		 * show one element of reservation and update
		 */
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
	/**
	 * 
	 * @param reservationId
	 * @return
	 */
	public boolean deleteReservation(int reservationId) {
		/**
		 * Method delete reservation
		 */
		Boolean aBoolean = getReservation(reservationId).map(reservation ->{
			metodosCrud.delete(reservation);
			return true;
		}).orElse(false);
		return aBoolean;
	}
	/**
	 * Reports Reservations
	 * Reports Status
	 * @return
	 */
	public ReportsStatus reporteStatusServicio (){
        List<Reservation>completed= metodosCrud.ReservacionStatusRepositorio("completed");
        List<Reservation>cancelled= metodosCrud.ReservacionStatusRepositorio("cancelled");
        //call constructor
        return new ReportsStatus(completed.size(), cancelled.size() );
    }
    /**
     * Time and service
     * @param datoA
     * @param datoB
     * @return
     */
    public List<Reservation> reporteTiempoServicio (String datoA, String datoB){
        SimpleDateFormat parser = new SimpleDateFormat ("yyyy-MM-dd");
        
        Date datoUno = new Date();
        Date datoDos = new Date();
        
        try{
             datoUno = parser.parse(datoA);
             datoDos = parser.parse(datoB);
        }catch(ParseException evt){
            evt.printStackTrace();
        }if(datoUno.before(datoDos)){
            return metodosCrud.ReservacionTiempoRepositorio(datoUno, datoDos);
        }else{
            return new ArrayList<>();
        
        } 
    }
    /**
     * Reports Client
     * @return
     */
     public List<ReportsClient> reporteClientesServicio(){
            return metodosCrud.getClientesRepositorio();
        } 

}
