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
import ufba.br.api.exceptions.UserAlreadyInCommunityException;
import ufba.br.api.exceptions.UserNotAllowedException;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;
import ufba.br.api.repository.CommunityRepositiory;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepositiory CommunityRepositiory;

    public Community createCommunity(CommunityForm communityForm, User owner) {
        Community community = new Community();
        community.setName(communityForm.name());
        community.setDescription(communityForm.description());
        // set owner
        community.setOwner(owner);
        CommunityRepositiory.save(community);
        return community;
    }

    public void joinCommunity(Long communityId, User user) {
        Community community = CommunityRepositiory.findById(communityId).get();
        if (community.getParticipants().contains(user)) {
            throw new UserAlreadyInCommunityException();
        }
        community.getParticipants().add(user);
        CommunityRepositiory.save(community);
    }

    public void leaveCommunity(Long communityId, User user) {
        Community community = CommunityRepositiory.findById(communityId).get();
        if (!community.getParticipants().contains(user)) {
            throw new UserNotAllowedException();
        }
        community.getParticipants().remove(user);
        CommunityRepositiory.save(community);
    }

    public void deleteCommunity(Long communityId, User ownUser) {
        Community community = CommunityRepositiory.findById(communityId).get();
        if (community.getOwner().getId() != ownUser.getId()) {
            throw new UserNotAllowedException();
        }
        CommunityRepositiory.delete(community);
    }

    public List<Community> getUserCommunities(User user) { 
        return user.getMyCommunities();
    }

    public List<Community> getUserParticipatingCommunities(User user) {
        return user.getCommunities();
    }

    public List<Community> getCommunities() {
         List<Community> communities = CommunityRepositiory.findAll();
         return communities;
    }

}
