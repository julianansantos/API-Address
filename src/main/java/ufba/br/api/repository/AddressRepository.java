package ufba.br.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import ufba.br.api.model.Address;
import ufba.br.api.model.User;


public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {
    Address save(Address entity);
    Page<Address> findAllByUser(User user, Pageable pageable);
    void deleteById(Long id);
    boolean existsById(Long id);

}