package com.camply.shop.productdetail.question.vo;

import java.time.LocalDateTime;
import java.util.List;

import com.camply.shop.productdetail.questioncomment.vo.CommentVO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionVO {

	private int questionNo;
	private String questionTitle;
	private String questionText;
	private String questionName;
	private LocalDateTime questionDate;
	private int questionHit;
}
