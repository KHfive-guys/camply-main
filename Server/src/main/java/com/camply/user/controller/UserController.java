package com.camply.user.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.user.service.UserService;
import com.camply.user.vo.UserVO;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins= "http://localhost:3000", allowCredentials = "true")
public class UserController {

	/**
	 * 	회원가입
	 */
	@Autowired
	private UserService userservice;


	@PostMapping("/general/register")
	public ResponseEntity<String> emailRegister(@RequestBody UserVO userVO) {
		try {
			userservice.registerUser(userVO);
			return ResponseEntity.ok("General email register Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
		}
	}

	@PostMapping("/admin/register")
	public ResponseEntity<String> adminRegister(@RequestBody UserVO userVO) {
		try {
			userservice.registerAdmin(userVO);
			return ResponseEntity.ok("Admin email register Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during registration: " + e.getMessage());
		}
	}



	
	@GetMapping("/login")
	    public ResponseEntity<?> login(@RequestBody UserVO camplyuservo) {
		 
				 
		 HashMap<String, String> user_info = new HashMap<String, String>();

		 UserVO camplyuservo_info= userservice.getMemberByUsername(camplyuservo.getUSER_EMAIL());
		 
	        
	        if (camplyuservo_info != null && camplyuservo_info.getUSER_PASSWORD().equals(camplyuservo.getUSER_PASSWORD())) {

	        	if (camplyuservo_info.getUSER_TYPE().equals("Admin")) {
		        	user_info.put("USER_ID", camplyuservo_info.getUSER_ID());
		        	user_info.put("USER_EMAIL", camplyuservo_info.getUSER_EMAIL());
		        	user_info.put("USER_BUSINESSNAME", camplyuservo_info.getUSER_BUSINESSADDRESS());
		        	user_info.put("USER_BUSINESSNUMBER", camplyuservo_info.getUSER_BUSINESSNUMBER());
		        	user_info.put("USER_TYPE", camplyuservo_info.getUSER_TYPE());
	        	} else if (camplyuservo_info.getUSER_TYPE().equals("General")){
		        	user_info.put("USER_ID", camplyuservo_info.getUSER_ID());
		        	user_info.put("USER_EMAIL", camplyuservo_info.getUSER_EMAIL());
		        	user_info.put("USER_NAME", camplyuservo_info.getUSER_NAME());
		        	user_info.put("USER_NICKNAME", camplyuservo_info.getUSER_NICKNAME());
		        	user_info.put("USER_TYPE", camplyuservo_info.getUSER_TYPE());
	        	}

	       
	        	return new ResponseEntity<>(user_info, HttpStatus.OK);
	        } else {

	        	user_info.put("result", "FAIL");
	        	user_info.put("message", "이메일 혹은 비밀번호가 일치하지 않습니다.");
	            return new ResponseEntity<>(user_info, HttpStatus.UNAUTHORIZED);
	        }
	    }


}

