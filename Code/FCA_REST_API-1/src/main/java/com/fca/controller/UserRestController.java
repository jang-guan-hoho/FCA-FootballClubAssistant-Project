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
@Tag(name = "UserRestController", description = "User CRUD")
public class UserRestController {
    // 마이페이지로 이동
//    @GetMapping("/my-page")
//    public ResponseEntity<?> goMyPage(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 마이페이지 수정
    @PutMapping("/my-page")
    public ResponseEntity<?> updateUser(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 회원탈퇴
    @DeleteMapping("/my-page")
    public ResponseEntity<?> deleteUser(){
    	return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 회원가입 폼으로 이동
//    @GetMapping("/sign-up")
//    public ResponseEntity<?> goSignUpForm(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 회원가입 실행
    @PostMapping("/sign-up")
    public ResponseEntity<?> doSignUp(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 로그인 폼으로이동
//    @GetMapping("/loginForm")
//    public ResponseEntity<?> goLoginForm(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
    
    // 로그인 실행
    @PostMapping("/login")
    public ResponseEntity<?> doLogin(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 로그아웃 실행
    @PostMapping("/logout")
    public ResponseEntity<?> dologOut(){
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    // 마이클럽 이동
//    @GetMapping("/my-club")
//    public ResponseEntity<?> goMyClub(){
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }
}
