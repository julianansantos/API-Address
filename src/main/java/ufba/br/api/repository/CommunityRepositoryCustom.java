package ufba.br.api.repository;

import java.util.List;

import ufba.br.api.model.Community;

public interface CommunityRepositoryCustom {
    public List<Community> findMostPopularCommunities();
}
