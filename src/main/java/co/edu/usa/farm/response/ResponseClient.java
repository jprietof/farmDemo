package co.edu.usa.farm.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.*;

import co.edu.usa.farm.model.Client;
import co.edu.usa.farm.model.dao.IClient;

@Repository
public class ResponseClient {
	@Autowired
	private IClient crudClient;
	
	public List<Client> getAll(){
		return (List<Client>) crudClient.findAll();
	}
	
	public Optional<Client> getClient(int id){
		return crudClient.findById(id);
	}
	
	public Client save(Client client) {
		return crudClient.save(client);
	}
	
	public void delete(Client client) {
		crudClient.delete(client);
	}

}
