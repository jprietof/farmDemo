package co.edu.usa.farm.model.dao;

import org.springframework.data.repository.CrudRepository;

import co.edu.usa.farm.model.Message;

public interface IMessage extends CrudRepository<Message, Integer>{

}
