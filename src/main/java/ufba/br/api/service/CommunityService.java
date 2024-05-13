package ufba.br.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ufba.br.api.dto.CommunityForm;
import ufba.br.api.model.Community;
import ufba.br.api.model.User;
import ufba.br.api.repository.CommunityRepositiory;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepositiory CommunityRepositiory;

    public void createCommunity(CommunityForm communityForm, User owner) {
        Community community = new Community();
        community.setName(communityForm.name());
        community.setDescription(communityForm.description());
        // set owner
        community.setOwner(owner);
        CommunityRepositiory.save(community);
    }

    public void joinCommunity(Long communityId, User user) {
        Community community = CommunityRepositiory.findById(communityId).get();
        community.getParticipants().add(user);
        CommunityRepositiory.save(community);
    }

    public void leaveCommunity(Long communityId, User user) {
        Community community = CommunityRepositiory.findById(communityId).get();
        community.getParticipants().remove(user);
        CommunityRepositiory.save(community);
    }

    public void deleteCommunity(Long communityId) {
        CommunityRepositiory.deleteById(communityId);
    }


}
