package com.camply.shop.productdetail.question.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camply.shop.productdetail.question.service.QuestionService;
import com.camply.shop.productdetail.question.vo.QuestionVO;

@RestController
@RequestMapping("/shop/question")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class QuestionController {
	@Autowired
	private QuestionService questionService;

	// 문의글 전체조회
	@GetMapping("/all")
	public ResponseEntity<List<QuestionVO>> getAllQuestions() {
		List<QuestionVO> questions = questionService.getAllQuestions();
		return ResponseEntity.ok(questions);
	}

	// 문의글 조회수 증가
	@GetMapping("/view/{questionNo}")
	public ResponseEntity<QuestionVO> getQuestion(@PathVariable int questionNo) {
		questionService.incrementQuestionHit(questionNo);
		QuestionVO question = questionService.getQuestion(questionNo);

		if (question != null) {
			return ResponseEntity.ok(question);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 문의작성
	@PostMapping("/post")
	public ResponseEntity<String> postQuestion(@RequestBody QuestionVO questionVO) {
		questionService.postQuestion(questionVO);
		return ResponseEntity.ok("success");
	}

	// 문의수정
	@PatchMapping("/update")
	public void updateQuestion(@PathVariable int questionNo) {
		questionService.questionUpdate(questionNo);

	}
	
	//문의삭제
	@DeleteMapping("/delete/{questionNo}")
	public void deleteQuestion(@PathVariable int questionNo) {
		questionService.questionDelete(questionNo);
	}
	
}
