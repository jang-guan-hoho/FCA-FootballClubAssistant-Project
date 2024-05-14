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
@Tag(name = "BoardRestController", description = "Board CRUD")
public class BoardRestController {
    // 클럽 게시판 이동
    @GetMapping("/club/{clubId}/board")
    public ResponseEntity<?> clubBoard(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 게시판 생성
    @PostMapping("/club/{clubId}/board")
    public ResponseEntity<?> goClubBoard(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 게시판 상세
//    @GetMapping("/club/{clubId}/board/{boardId}")
//    public ResponseEntity<?> clubBoardDetail(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 클럽 게시판 수정
    @PutMapping("/club/{clubId}/board/{boardId}")
    public ResponseEntity<?> clubBoardUpdate(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 클럽 게시판 삭제
    @DeleteMapping("/club/{clubId}/board/{boardId}")
    public ResponseEntity<?> clubBoardDelete(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
