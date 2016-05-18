package br.ufpb.dcx.project.si.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.ufpb.dcx.project.si.domain.Auth;
import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;
import br.ufpb.dcx.project.si.rest.util.Constants;
import br.ufpb.dcx.project.si.service.UserService;

@RestController
public class LoginController {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST, value = Constants.URL_AUTH)
	public ResponseEntity<User> login(@RequestBody Auth auth) throws EventException {
		
		User authenticatedUser = userService.authenticateUser(auth);
		return new ResponseEntity<User>(authenticatedUser, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = Constants.URL_AUTH)
	@PreAuthorize("hasAuthority('ADMIN')")
	public ResponseEntity<UserDetails> user() throws EventException {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return new ResponseEntity<UserDetails>(userDetails, HttpStatus.OK);
	}
	
	
	
}

