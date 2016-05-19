package br.ufpb.dcx.project.si.service;

import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;

public interface UserService {

	User createUser(User user) throws EventException;
	
	User getUser(Integer userId) throws EventException;
	
	User updateUser(Integer userId, User user) throws EventException;
	
}
