package br.ufpb.dcx.project.si.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.repository.UserRepository;
import br.ufpb.dcx.project.si.rest.config.EventException;
import br.ufpb.dcx.project.si.rest.util.ErrorMessages;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository repository;

	public User createUser(User user) throws EventException {
		
		User userDB = repository.findByEmail(user.getEmail());
		if (userDB != null) {
			throw new EventException(ErrorMessages.HAS_USER_WITH_EMAIL, HttpStatus.BAD_REQUEST);
		}
				
		User userCreated = repository.saveAndFlush(user);
		return returnUserWithoutPassword(userCreated);
	}

	public User getUser(Integer id) throws EventException {
		User userDB = repository.findOne(id);
		if (userDB == null) {
			throw new EventException(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		return returnUserWithoutPassword(userDB);
	}

	public User updateUser(Integer userId, User user) throws EventException {
		
		User userDB = repository.findOne(user.getId());
		if (userDB == null) {
			throw new EventException(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
		
		user.setPassword(userDB.getPassword());
		User userUpdated = repository.saveAndFlush(user);
		return returnUserWithoutPassword(userUpdated);
	}
	
	private User returnUserWithoutPassword(User user) {
		user.setPassword(null);
		return user;
	}

}
