package com.camply.shop.productdetail.question.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.camply.shop.productdetail.question.vo.QuestionVO;

@Mapper
public interface QuestionDao {
	
	// 문의 전체 조회
	List<QuestionVO> selectAllQuestions();

	// 문의 조회
	QuestionVO getQuestion(int questionNo);

	// 문의 작성
	void insertQuestion(QuestionVO questionVO);

	// 문의 조회수 증가
	void incrementQuestionHit(int questionNo);
	
	// 문의 수정
	void updateQuestion(int questionNo);
	
	// 문의 삭제
	void deleteQuestion(int questionNo);
}
