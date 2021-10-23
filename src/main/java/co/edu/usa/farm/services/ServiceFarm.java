package co.edu.usa.farm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

import co.edu.usa.farm.model.Farm;
import co.edu.usa.farm.response.ResponseFarm;

@Service
public class ServiceFarm {
	@Autowired
	private ResponseFarm metodosCrud;
	
	public List<Farm> getAll(){
		return metodosCrud.getAll();
	}
	
	public Optional<Farm> getFarm(int farmId){
		return metodosCrud.getFarm(farmId);
	}
	
	public Farm save(Farm farm) {
		if(farm.getId()==null) {
			return metodosCrud.save(farm);
		}else {
			Optional<Farm> e=metodosCrud.getFarm(farm.getId());
			if(e.isEmpty()) {
				return metodosCrud.save(farm);
			}else {
				return farm;
			}
		}
	}
	
	public Farm update(Farm farm) {
		if(farm.getId()!=null) {
			Optional<Farm> e=metodosCrud.getFarm(farm.getId());
			if(!e.isEmpty()) {
				if(farm.getName()!=null) {
					e.get().setName(farm.getName());
				}
				if(farm.getAddress()!=null) {
					e.get().setAddress(farm.getAddress());
				}
				if(farm.getExtension()!=null){
					e.get().setExtension(farm.getExtension());
				}
				if(farm.getDescription()!=null) {
					e.get().setDescription(farm.getDescription());
				}
				if(farm.getCategory()!=null) {
					e.get().setCategory(farm.getCategory());
				}
				metodosCrud.save(e.get());
				return e.get();
			}else {
				return farm;
			}
		}else {
			return farm;
		}
	}
	
	
	public boolean deleteFarm(int farmId) {
		Boolean aBoolean = getFarm(farmId).map(farm->{
			metodosCrud.delete(farm);
			return true;
		}).orElse(false);
		return aBoolean;
	}
	
	
}
