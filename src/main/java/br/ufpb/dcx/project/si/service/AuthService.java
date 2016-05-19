package br.ufpb.dcx.project.si.service;

import br.ufpb.dcx.project.si.domain.Auth;
import br.ufpb.dcx.project.si.domain.User;
import br.ufpb.dcx.project.si.rest.config.EventException;

public interface AuthService {

	User authenticateUser(Auth auth) throws EventException;
	
}
