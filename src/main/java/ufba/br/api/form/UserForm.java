package ufba.br.api.form;

public record UserForm(String name, String password) {
    // validate fields
    public UserForm {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name cannot be blank");
        }
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("password cannot be blank");
        }

        // validate strong password
        if (password.length() < 8) {
            throw new IllegalArgumentException("password must have at least 8 characters");
        }
    }
}
