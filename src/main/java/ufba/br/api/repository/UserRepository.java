package ufba.br.api.repository;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import ufba.br.api.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByName(String name);

}