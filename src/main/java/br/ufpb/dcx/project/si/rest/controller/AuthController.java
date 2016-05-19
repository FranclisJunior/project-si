package br.ufpb.dcx.project.si.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.ufpb.dcx.project.si.domain.Auth;
import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;
import br.ufpb.dcx.project.si.rest.util.Constants;
import br.ufpb.dcx.project.si.service.AuthService;

@Controller
public class AuthController {

	@Autowired
	private AuthService service;

	@RequestMapping(method = RequestMethod.POST, value = Constants.URL_AUTH)
	public ResponseEntity<User> login(@RequestBody Auth auth) throws EventException {
		
		User authenticatedUser = service.authenticateUser(auth);
		return new ResponseEntity<User>(authenticatedUser, HttpStatus.OK);
	}
	
}

