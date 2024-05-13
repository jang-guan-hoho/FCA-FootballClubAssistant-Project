package com.fca.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/fca")
@Tag(name = "ScheduleRestController", description = "Schedule CRUD")
public class ScheduleRestController {
	// 클럽 일정 이동
    @GetMapping("/club/{clubid}/schedule")
    public ResponseEntity<?> goClubSchedule(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 생성
    @PostMapping("/club/{clubid}/schedule")
    public ResponseEntity<?> createClubSchedule(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 일정 상세
    @GetMapping("/club/{clubId}/schedule/{scheduleId}")
    public ResponseEntity<?> clubScheduleDetail(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
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
    @GetMapping("/club/{clubId}/schedule/{scheduleId}/receipt")
    public ResponseEntity<?> goClubScheduleReceipt(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
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
