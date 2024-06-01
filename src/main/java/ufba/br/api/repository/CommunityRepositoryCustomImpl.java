package ufba.br.api.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import ufba.br.api.model.Community;

public class CommunityRepositoryCustomImpl implements CommunityRepositoryCustom {
    @Autowired
    private EntityManager entityManager;

    public List<Community> findMostPopularCommunities() {
        // Return the top 3 most popular communities (count relation many with address).
        // Get count of addresses for each community and order by this count.
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Community> cq = cb.createQuery(Community.class);
        Root<Community> root = cq.from(Community.class);
        cq = cq.select(root).orderBy(cb.desc(cb.size(root.get("addresses"))));
        TypedQuery<Community> query = entityManager.createQuery(cq);
        query.setMaxResults(3);
        return query.getResultList();

    }
}
