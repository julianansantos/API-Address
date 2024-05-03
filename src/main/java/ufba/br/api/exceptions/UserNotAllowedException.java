package ufba.br.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UserNotAllowedException extends RuntimeException {
    public UserNotAllowedException() {
        super("User not allowed");
    }
}
