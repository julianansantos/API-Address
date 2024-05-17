package ufba.br.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class UserAlreadyInCommunityException extends RuntimeException {
    public UserAlreadyInCommunityException() {
        super("Usuário já está na comunidade");
    }
}
