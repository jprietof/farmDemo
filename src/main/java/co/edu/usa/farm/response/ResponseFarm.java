package co.edu.usa.farm.response;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import co.edu.usa.farm.model.Farm;
import co.edu.usa.farm.model.dao.IFarm;

@Repository
public class ResponseFarm {
	@Autowired
    private IFarm crud;

    public List<Farm> getAll(){
        return (List<Farm>) crud.findAll();
    }

    public Optional<Farm> getFarm(int id){
        return crud.findById(id);
    }

    public Farm save(Farm farm){
        return crud.save(farm);
    }
    public void delete(Farm farm){
        crud.delete(farm);
    }
}