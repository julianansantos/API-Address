package ufba.br.api.repository;

import org.springframework.data.repository.CrudRepository;
import ufba.br.api.model.Community;

public interface CommunityRepositiory extends CrudRepository<Community, Long> {
    
}
