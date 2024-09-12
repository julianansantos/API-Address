package ufba.br.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.CommunityForm;
import ufba.br.api.dto.PaginationResponse;
import ufba.br.api.exceptions.UserNotAllowedException;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;
import ufba.br.api.repository.CommunityRepository;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepositiory;


     public PaginationResponse<Community> getCommunities(User user, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Community> communities = communityRepositiory.findAll(pageable);
        List<Community> listContent = communities.getContent();
        List<Community> content = listContent.stream().collect(Collectors.toList());
        PaginationResponse<Community> response = new PaginationResponse<>();

        response.setContent(content);
        response.setPage(communities.getNumber());
        response.setPageSize(communities.getSize());
        response.setTotalElements(communities.getTotalElements());
        response.setTotalPages(communities.getTotalPages());
        response.setLastPage(communities.getTotalPages() - 1);
        
        return response;
    }

    public Community createCommunity(CommunityForm communityForm, User owner) {
        Community community = new Community();
        community.setName(communityForm.name());
        community.setDescription(communityForm.description());
        // set owner
        community.setOwner(owner);
        communityRepositiory.save(community);
        return community;
    }

    public void deleteCommunity(Long communityId, User ownUser) {
        Community community = communityRepositiory.findById(communityId);
        if (community.getOwner().getId() != ownUser.getId()) {
            throw new UserNotAllowedException();
        }
        communityRepositiory.delete(community);
    }

    public List<Community> getUserCommunities(User user) { 
        return user.getMyCommunities();
    }

    public List<Community> getCommunities(List<Long> ids) {
         List<Community> communities = communityRepositiory.findByIdIn(ids);
         return communities;
    }

    public List<Community> getCommunities() {
        return communityRepositiory.findAll();
    }

    public List<Community> getTop3Communities() {
        return communityRepositiory.findMostPopularCommunities();
    }

    public List<Community> findCommunitiesWithMoreAddresses(){
        return communityRepositiory.findCommunitiesWithMoreAddresses();
    }

    public List<Community> findCommunitiesByOwner(Long ownerId){
        return communityRepositiory.findCommunitiesByOwner(ownerId);
    };



}
