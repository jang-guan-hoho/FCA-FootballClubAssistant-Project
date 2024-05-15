package com.fca.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fca.model.dao.ClubDao;
import com.fca.model.dto.Club;
import com.fca.model.dto.Member;

@Service
public class ClubServiceImpl implements ClubService {
	
	private ClubDao clubDao;
	
	@Autowired
	public ClubServiceImpl(ClubDao clubDao) {
		this.clubDao = clubDao;
	}

	@Override
	public List<Club> getclubList() {
		return clubDao.selectClubAll();
	}

	@Override
	public Club getClub(int clubId) {
		return clubDao.selectClub(clubId);
	}

	@Override
	public List<Member> getMemberList(int clubId) {
		return clubDao.selectMembers(clubId);
	}

	@Override
	public int joinClub(int clubId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("clubId", clubId);
		map.put("userId", userId);
		map.put("position", "클럽원");
		return clubDao.insertMember(map);
	}

	@Transactional
	@Override
	public int createClub(Club club, int userId) {
		int result = clubDao.insertClub(club);
		Map<String, Object> map = new HashMap<>();
		map.put("clubId", club.getClubId());
		map.put("userId", userId);
		map.put("position", "클럽장");
		clubDao.insertMember(map);
		return result;
	}

	@Override
	public Club getNewClub() {
		return clubDao.selectNewClub();
	}

	@Override
	public int deleteMember(int memberId) {
		return clubDao.deleteMember(memberId);
	}

	@Override
	public int updateMember(Member member) {
		return clubDao.updateMember(member);
	}

	@Override
	public int updateClub(Club club) {
		return clubDao.updateClub(club);
	}

	@Override
	public int deleteClub(int clubId) {
		return clubDao.deleteClub(clubId);
	}
}
