package com.fca.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fca.model.dto.Club;
import com.fca.model.dto.Member;
import com.fca.model.service.ClubService;
import com.fca.model.service.ClubServiceImpl;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/fca")
@Tag(name = "ClubRestController", description = "Club CRUD")
public class ClubRestController {
	
	private ClubService clubService;
	
	@Autowired
	public ClubRestController(ClubService clubService) {
		this.clubService = clubService;
	}
	
	// 홈페이지로 이동
    @GetMapping("")
    public ResponseEntity<?> goHome(){
    	List<Club> clubList = clubService.getclubList();
        return new ResponseEntity<>(clubList, HttpStatus.OK);
    }
    
    // 클럽 홈으로 이동
    @GetMapping("/club/{clubid}")
    public ResponseEntity<?> goClubDetail(@PathVariable("clubId") int clubId){
    	Club club = clubService.getClub(clubId);
    	List<Member> memberList = clubService.getMemberList(clubId);
    	Map<String, Object> responseData = new HashMap<>();
        responseData.put("club", club);
        responseData.put("memberList", memberList);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
    
    // 클럽 가입 폼으로 이동
//    @GetMapping("/club/{clubid}/join")
//    public ResponseEntity<?> goClubJoinForm(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽 가입 실행
    @PostMapping("/club/{clubid}/join")
    public ResponseEntity<?> doClubJoin(@PathVariable("clubId") int clubId, int userId){
    	clubService.joinClub(clubId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 내정보 수정 -> 내가 참여한 일정 -> 일정 홈에 같이 보여주는 식이 좋을듯?
//    @GetMapping("/club/{clubid}")
//    public ResponseEntity<?> goClubMyInfo(int userId){
//    	List<Integer> scheduleIdList = clubService.getUserSchedule(userId);
//        return new ResponseEntity<>(scheduleIdList, HttpStatus.OK);
//    }
    
    // 회비내역 -> 개어려움 생각 좀 정리하고 할 것
    @GetMapping("/club/{clubId}/receipt")
    public ResponseEntity<?> goClubRecepit(){
    	
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 생성폼 이동
//    @GetMapping("/club")
//    public ResponseEntity<?> goClubForm(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽 생성 
    @PostMapping("/club")
    public ResponseEntity<?> clubCreate(@RequestBody Club club){
    	clubService.createClub(club); // Club 컬럼 생성하면서 동시에 Member 컬럼(클럽장)도 생성해야함
    	Club newClub = clubService.getNewClub(); // 방금 생성한 클럽 정보 가져와야함
        return new ResponseEntity<>(newClub, HttpStatus.OK);
    }
    
    // 클럽 관리 이동
//    @GetMapping("/club/{id}/manage")
//    public ResponseEntity<?> goClubManage(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽원 관리 이동 -> pinia에서 꺼내서 사용?
//    @GetMapping("/club/{clubId}/manage/member")
//    public ResponseEntity<?> goClubManageMember(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽원 삭제
    @DeleteMapping("/club/{clubId}/manage/member")
    public ResponseEntity<?> ClubManageMemberDelete(int memberId){
    	clubService.deleteMember(memberId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽원 수정 -> front에서 넘길 때 객체 정보 전부 넘겨야함
    @PutMapping("/club/{clubId}/manage/member")
    public ResponseEntity<?> ClubManageMemberUpdate(@RequestBody Member member){
    	clubService.updateMember(member);    	
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 수정
    @PutMapping("/club/{clubId}/manage")
    public ResponseEntity<?> clubManageUpdate(@PathVariable("clubId") int clubId, @RequestBody Club club){
    	club.setClubId(clubId);
    	clubService.updateClub(club);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 삭제
    @DeleteMapping("/club/{clubId}/manage")
    public ResponseEntity<?> clubManageDelete(@PathVariable("clubId") int clubId){
    	clubService.deleteClub(clubId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 회비 관리 -> 어떤 데이터가 필요한지 좀 더 생각해보자..
    @GetMapping("/club/{clubId}/manage/receipt")
    public ResponseEntity<?> goClubManageReceipt(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
