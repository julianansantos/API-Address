package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record UserForm(
        @NotEmpty(message = "Nome não pode ser vazio") String name,
        @NotEmpty(message = "Senha não pode ser nula") @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial") String password) {
}
