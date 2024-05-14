package com.fca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fca.model.dto.Member;
import com.fca.model.service.ClubService;
import com.fca.model.service.ScheduleService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/fca")
@Tag(name = "ScheduleRestController", description = "Schedule CRUD")
public class ScheduleRestController {
	
	private ScheduleService scheduleService;
	
	@Autowired
	public ScheduleRestController(ScheduleService scheduleService) {
		this.scheduleService = scheduleService;
	}
	
	// 클럽 일정 이동 + 나의 일정 같이 표시하면 좋겠음 달력에
    @GetMapping("/club/{clubid}/schedule")
    public ResponseEntity<?> goClubSchedule(@PathVariable("clubId") int clubId, int userId){
    	List<Integer> memberIdList = scheduleService.getMemberIdList(clubId, userId);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 생성
    @PostMapping("/club/{clubid}/schedule")
    public ResponseEntity<?> createClubSchedule(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 상세
//    @GetMapping("/club/{clubId}/schedule/{scheduleId}")
//    public ResponseEntity<?> clubScheduleDetail(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽 일정 수정
    @PutMapping("/club/{clubId}/schedule/{scheduleId}")
    public ResponseEntity<?> clubScheduleUpdate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 삭제
    @DeleteMapping("/club/{clubId}/schedule/{scheduleId}")
    public ResponseEntity<?> clubScheduleDelete(){
            return new ResponseEntity<Void>(HttpStatus.OK);
        }
        
    // 클럽 일정 회비 이동
//    @GetMapping("/club/{clubId}/schedule/{scheduleId}/receipt")
//    public ResponseEntity<?> goClubScheduleReceipt(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽 일정 회비 등록
    @PostMapping("/club/{clubId}/schedule/{scheduleId}/receipt")
    public ResponseEntity<?> clubScheduleReceiptCreate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 회비 삭제
    @DeleteMapping("/club/{clubId}/schedule/{scheduleId}/receipt/{receiptId}")
    public ResponseEntity<?> clubScheduleReceiptDelete(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
