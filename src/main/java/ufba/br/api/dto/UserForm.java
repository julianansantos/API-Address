package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class UserForm {
    @NotEmpty(message = "Nome não pode ser vazio")
    private String name;
    @NotEmpty(message = "Senha não pode ser nula")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$", message = "Senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial")
    private String password;

    public UserForm(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String name() {
        return name;
    }

    public String password() {
        return password;
    }
}
