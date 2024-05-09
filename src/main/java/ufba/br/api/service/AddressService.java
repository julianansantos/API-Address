package ufba.br.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.PaginationResponse;
import ufba.br.api.model.Address;
import ufba.br.api.model.User;
import ufba.br.api.repository.AddressRepository;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public PaginationResponse<Address> getAddresses(User user, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Address> addresses = addressRepository.findAllByUser(user, pageable);
        List<Address> listContent = addresses.getContent();
        List<Address> content = listContent.stream().collect(Collectors.toList());
        PaginationResponse<Address> response = new PaginationResponse<>();

        response.setContent(content);
        response.setPage(addresses.getNumber());
        response.setPageSize(addresses.getSize());
        response.setTotalElements(addresses.getTotalElements());
        response.setTotalPages(addresses.getTotalPages());
        response.setLastPage(addresses.getTotalPages() - 1);
        
        return response;
    }

    public Address getAddress(User user, Long id) {
        return addressRepository.findByIdAndUser(id, user);
    }

    public Address store(Address entity) {
        return addressRepository.save(entity);
    }

    public boolean delete(Long id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
