package co.edu.usa.farm.response;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.farm.model.Message;
import co.edu.usa.farm.model.dao.IMessage;

@Repository
public class ResponseMessage {
	@Autowired
	private IMessage crudMessage;
	
	public List<Message> getAll(){
		return (List<Message>) crudMessage.findAll();
	}
	
	public Optional<Message> getMessage(int id){
		return crudMessage.findById(id);
	}
	
	public Message save(Message message) {
		return crudMessage.save(message);
	}
	
	public void delete(Message message) {
		crudMessage.delete(message);
	}

}
