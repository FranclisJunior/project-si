package br.ufpb.dcx.project.si.rest.config;

import org.springframework.http.HttpStatus;

public class EventException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6643883911170245730L;
	
	private HttpStatus status;

	public EventException(String message) {
		super(message);
	}
	
	public EventException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public EventException(HttpStatus status) {
		this.status = status;
	}

	public HttpStatus getStatus() {
		return status;
	}
}