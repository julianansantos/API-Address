package ufba.br.api.repository;

import org.springframework.data.repository.CrudRepository;

import ufba.br.api.model.Address;

public interface AddressRepository extends CrudRepository<Address, String> {

}