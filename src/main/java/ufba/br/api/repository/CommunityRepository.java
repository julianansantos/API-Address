package ufba.br.api.repository;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import ufba.br.api.model.Community;

@Repository
public interface CommunityRepository extends ListCrudRepository<Community, Long>, CommunityRepositoryCustom {
    List<Community> findMostPopularCommunities();
}
