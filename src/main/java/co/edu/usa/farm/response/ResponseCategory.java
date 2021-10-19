package co.edu.usa.farm.response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import co.edu.usa.farm.model.Category;
import co.edu.usa.farm.model.dao.ICategory;

import java.util.*;

@Repository
public class ResponseCategory {
	@Autowired
	private ICategory crudCategory;
	public List<Category> getAll(){
		return (List<Category>) crudCategory.findAll();
	}
	public Optional<Category> getCategory(int id){
		return crudCategory.findById(id);
	}
	public Category save(Category category) {
		return crudCategory.save(category);
	}
	public void delete (Category category) {
		crudCategory.delete(category);
	}
}
