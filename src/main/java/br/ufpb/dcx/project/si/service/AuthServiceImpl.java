package br.ufpb.dcx.project.si.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import br.ufpb.dcx.project.si.domain.Auth;
import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.repository.UserRepository;
import br.ufpb.dcx.project.si.rest.config.EventException;
import br.ufpb.dcx.project.si.rest.util.ErrorMessages;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository repository;

	public User authenticateUser(Auth auth) throws EventException {
		User user = repository.findByEmailAndPassword(auth.getLogin(), auth.getPassword());
		if (user == null) {
			throw new EventException(ErrorMessages.ACCESS_DENIED, HttpStatus.UNAUTHORIZED);
		} else {
			GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
			UserDetails userDetails = (UserDetails) new org.springframework.security.core.userdetails.User(
					user.getEmail(), 
					user.getPassword(), 
					Arrays.asList(authority));
			
			Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());

			SecurityContextHolder.getContext().setAuthentication(authentication);
			
			return getCurrentUserAuthenticated();
		}
	}
	
	private User getCurrentUserAuthenticated() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User userLogged = repository.findByEmail(userDetails.getUsername());
		userLogged.setPassword(null);
		return userLogged;
	}

}
