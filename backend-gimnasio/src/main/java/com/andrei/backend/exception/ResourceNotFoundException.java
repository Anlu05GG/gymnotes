package com.andrei.backend.exception;

	public class ResourceNotFoundException extends RuntimeException {
		private static final long serialVersionUID = 1L;
	
		public ResourceNotFoundException(String recurso, Long id) {
	        super(recurso + " con id " + id + " no existe");
	    }
}
