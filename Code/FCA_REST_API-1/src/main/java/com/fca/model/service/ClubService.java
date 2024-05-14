package com.fca.model.service;

import java.util.List;

import com.fca.model.dto.Club;
import com.fca.model.dto.Member;

public interface ClubService {

	List<Club> getclubList();

	Club getClub(int clubId);

	List<Member> getMemberList(int clubId);

	int joinClub(int clubId, int userId);

	int createClub(Club club);

	Club getNewClub();

	int deleteMember(int memberId);

	int updateMember(Member member);

	int updateClub(Club club);

	int deleteClub(int clubId);
}
