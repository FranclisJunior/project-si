package br.ufpb.dcx.project.si.rest.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import br.ufpb.dcx.project.si.rest.util.ErrorMessages;

@ControllerAdvice
public class ExceptionHandlerAdvice {

	@ExceptionHandler(value = EventException.class)
	public ResponseEntity<ErrorRest> eventException(EventException exception) {
		return new ResponseEntity<ErrorRest>(new ErrorRest(exception.getMessage()), exception.getStatus());
	}

	@ExceptionHandler(value = NullPointerException.class)
	public ResponseEntity<ErrorRest> nullPointerException(NullPointerException exception) {
		return new ResponseEntity<ErrorRest>(new ErrorRest(ErrorMessages.ERROR_INVALID_DATA), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(value = IllegalArgumentException.class)
	public ResponseEntity<ErrorRest> illegalArgumentException(IllegalArgumentException exception) {
		return new ResponseEntity<ErrorRest>(new ErrorRest(ErrorMessages.ERROR_INVALID_DATA), HttpStatus.BAD_REQUEST);
	}
}
