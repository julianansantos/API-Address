package ufba.br.api.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ufba.br.api.model.Community;

@Repository
public interface CommunityRepository extends PagingAndSortingRepository<Community, Long>, CommunityRepositoryCustom {
    List<Community> findMostPopularCommunities();
    @Query("SELECT c FROM Community c JOIN c.owner o WHERE o.id = :ownerId")
    List<Community> findCommunitiesByOwner(@Param("ownerId") Long ownerId);
    @Query("SELECT c FROM Community c WHERE SIZE(c.addresses) > (SELECT AVG(SIZE(comm.addresses)) FROM Community comm)")
    List<Community> findCommunitiesWithMoreAddresses();
    @Override
    Page<Community> findAll(Pageable pageable);
    Community findById(Long id);
    void delete(Community community);
    List<Community> findByIdIn(List <Long> ids);
    List<Community> findAll();
    Community save(Community community);

}
