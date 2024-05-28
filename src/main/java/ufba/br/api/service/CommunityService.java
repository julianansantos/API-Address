package ufba.br.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.CommunityForm;
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

    public List<Community> getCommunities(List<Long> ids) {
         List<Community> communities = CommunityRepositiory.findAllById(ids);
         return communities;
    }

    public List<Community> getCommunities() {
        return CommunityRepositiory.findAll();
    }

}
