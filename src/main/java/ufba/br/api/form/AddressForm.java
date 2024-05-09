package ufba.br.api.form;

public record AddressForm(String street, int number, String complement, String city, String state, String zipCode, String country) {
}
