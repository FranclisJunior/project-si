package br.ufpb.dcx.project.si.rest.config;

public class ErrorRest {

	private String message;

	public ErrorRest(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
}