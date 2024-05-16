package ufba.br.api.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import ufba.br.api.model.Community;

@Repository
public interface CommunityRepositiory extends ListCrudRepository<Community, Long> {
}
