package br.ufpb.dcx.project.si.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;
import br.ufpb.dcx.project.si.rest.util.Constants;
import br.ufpb.dcx.project.si.service.UserService;

@Controller
@RequestMapping(Constants.URL_USER)
public class UserController {

	@Autowired
	private UserService service;
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user) 
			throws EventException {
		User userResponse = service.createUser(user);
		
		return new ResponseEntity<User>(userResponse, HttpStatus.OK);
	}	
	
	
	@RequestMapping(method = RequestMethod.GET, value=Constants.USER_ID)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<User> getUser(@PathVariable Integer userId) 
			throws EventException {
		User userResponse = service.getUser(userId);
		
		return new ResponseEntity<User>(userResponse, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value=Constants.USER_ID)
	@PreAuthorize("isAuthenticated()")
	public ResponseEntity<User> updateUser(@PathVariable Integer userId, @RequestBody User user) 
			throws EventException {
		User userResponse = service.updateUser(userId, user);
		
		return new ResponseEntity<User>(userResponse, HttpStatus.OK);
	}
	
}
