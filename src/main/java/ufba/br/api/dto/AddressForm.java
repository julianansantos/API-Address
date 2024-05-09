package ufba.br.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints. Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public class AddressForm {
    @NotEmpty(message = "Rua não pode ser vazio")
    private String street;
    @NotEmpty(message = "Cidade não pode ser vazio")
    private String city;
    @NotEmpty(message = "Estado não pode ser vazio")
    private String state;
    @Pattern(regexp = "^[0-9]{5}-[0-9]{3}$", message = "CEP deve estar no formato XXXXX-XXX")
    private String zipCode;
    @PositiveOrZero(message = "Número não pode ser negativo")
    private int number;
    private String complement;
    @NotEmpty(message = "País não pode ser vazio")
    private String country;

    public AddressForm() {
    }

    public AddressForm(String street, String city, String state, String zipCode, String country) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    public AddressForm(String street, String city, String state, String zipCode, int number, String complement, String country) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.number = number;
        this.complement = complement;
        this.country = country;
    }

    public String street() {
        return street;
    }

    public String city() {
        return city;
    }

    public String state() {
        return state;
    }

    public String zipCode() {
        return zipCode;
    }

    public int number() {
        return number;
    }

    public String complement() {
        return complement;
    }

    public String country() {
        return country;
    }

}
