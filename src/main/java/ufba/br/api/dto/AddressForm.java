package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints. Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public record AddressForm(
    @NotEmpty(message = "Rua não pode ser vazio")
    String street,
    @NotEmpty(message = "Cidade não pode ser vazio")
    String city,
    @NotEmpty(message = "Estado não pode ser vazio")
    String state,
    @Pattern(regexp = "^[0-9]{5}-[0-9]{3}$", message = "CEP deve estar no formato XXXXX-XXX")
    String zipCode,
    @PositiveOrZero(message = "Número não pode ser negativo")
    int number,
        String complement,
    @NotEmpty(message = "País não pode ser vazio")
    String country) {
        

}
