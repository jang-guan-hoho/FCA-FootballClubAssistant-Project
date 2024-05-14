package com.fca.model.dao;

import java.util.List;
import java.util.Map;

import com.fca.model.dto.Club;
import com.fca.model.dto.Member;

public interface ClubDao {

	List<Club> selectClubAll();

	Club selectClub(int clubId);

	List<Member> selectMembers(int clubId);

	int insertMember(Map<String, Object> map);

	int insertClub(Club club);

	Club selectNewClub();

	int deleteMember(int memberId);

	int updateMember(Member member);

	int updateClub(Club club);

	int deleteClub(int clubId);
}
