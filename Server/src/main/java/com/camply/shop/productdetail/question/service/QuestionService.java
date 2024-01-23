package com.camply.shop.productdetail.question.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.camply.shop.productdetail.question.dao.QuestionDao;
import com.camply.shop.productdetail.question.vo.QuestionVO;


@Service
public class QuestionService {
	@Autowired
	private QuestionDao questionDao;
	
	//문의 전체 조회
	 public List<QuestionVO> getAllQuestions() {
	        return questionDao.selectAllQuestions();
	    }
	
	//문의 조회
	 public QuestionVO getQuestion(int questionNo) {
	        return questionDao.getQuestion(questionNo);
	    }
	
	
	//문의 작성
		public void postQuestion(QuestionVO questionVO){
			questionDao.insertQuestion(questionVO);
		}
		
	//문의 조회수 증가
		 @Transactional
		    public void incrementQuestionHit(int questionNo) {
	        questionDao.incrementQuestionHit(questionNo);
		    }
	
}
