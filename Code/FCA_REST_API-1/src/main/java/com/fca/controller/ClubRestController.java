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
@Tag(name = "ClubRestController", description = "Club CRUD")
public class ClubRestController {
	// 홈페이지로 이동
    @GetMapping("")
    public ResponseEntity<?> goHome(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 홈으로 이동
    @GetMapping("/club/{clubid}")
    public ResponseEntity<?> goClubDetail(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 가입 폼으로 이동
    @GetMapping("/club/{clubid}/join")
    public ResponseEntity<?> goClubJoinForm(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 가입 실행
    @PostMapping("/club/{clubid}/join")
    public ResponseEntity<?> doClubJoin(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 내정보 
    @GetMapping("/club/{clubid}/my-info")
    public ResponseEntity<?> goClubMyInfo(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 회비내역
    @GetMapping("/club/{clubId}/receipt")
    public ResponseEntity<?> goClubRecepit(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 생성폼 이동
    @GetMapping("/club")
    public ResponseEntity<?> goClubForm(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 생성 
    @PostMapping("/club")
    public ResponseEntity<?> clubCreate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 관리 이동
    @GetMapping("/club/{id}/manage")
    public ResponseEntity<?> goClubManage(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽원 관리 이동
    @GetMapping("/club/{id}/manage/member")
    public ResponseEntity<?> goClubManageMember(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽원 삭제
    @DeleteMapping("/club/{id}/manage/member/{memberId}")
    public ResponseEntity<?> ClubManageMemberDelete(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽원 수정
    @PutMapping("/club/{id}/manage/member/{memberId}")
    public ResponseEntity<?> ClubManageMemberUpdate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 수정
    @PutMapping("/club/{id}/manage")
    public ResponseEntity<?> clubManageUpdate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 삭제
    @DeleteMapping("/club/{id}/manage")
    public ResponseEntity<?> clubManageDelete(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    //클럽 회비 관리
    @GetMapping("/club/{id}/manage/receipt")
    public ResponseEntity<?> goClubManageReceipt(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
