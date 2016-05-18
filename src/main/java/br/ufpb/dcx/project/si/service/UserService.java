package br.ufpb.dcx.project.si.service;

import br.ufpb.dcx.project.si.domain.Auth;
import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;

public interface UserService {

	User authenticateUser(Auth auth) throws EventException;
	
}
