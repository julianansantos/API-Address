package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginForm(
        @NotEmpty(message = "O nome não pode ser vazio") String name,
        @NotEmpty(message = "A senha não pode ser nula") String password) {
}