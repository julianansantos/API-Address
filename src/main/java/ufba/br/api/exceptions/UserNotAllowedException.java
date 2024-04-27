package ufba.br.api.exceptions;

public class UserNotAllowedException extends RuntimeException {
    public UserNotAllowedException() {
        super("User not allowed");
    }
}
