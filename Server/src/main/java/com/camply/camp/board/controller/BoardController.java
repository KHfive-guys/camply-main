package com.camply.camp.board.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.camply.camp.board.service.BoardService;
import com.camply.camp.board.vo.BoardVO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/camp/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class BoardController {

	private final BoardService boardService;

	@PostMapping("/add")
	public ResponseEntity<String> insertPost(@RequestBody BoardVO boardVO) {
		boardService.insertPost(boardVO);
		return ResponseEntity.ok("Camp added successfully");
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllBoard() {
		try {
			System.out.println("code check");
			List<BoardVO> boards = boardService.getAllBoard();
			return ResponseEntity.ok(boards);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("asdf");
		}
		
	}

	@GetMapping("/get/{camp_id}")
	public ResponseEntity<?> getBoardById(@PathVariable Long camp_id) {
		try {
			BoardVO board = boardService.getBoardById(camp_id);
			return ResponseEntity.ok(board);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Failed to retrieve board with ID: " + camp_id);
		}
	}

	@DeleteMapping("/delete/{camp_id}")
	public String deleteBoardById(@PathVariable Long camp_id, RedirectAttributes redirectAttributes) {
		try {
			boardService.deleteBoardById(camp_id);
			redirectAttributes.addFlashAttribute("successMessage", "Camp posting deleted successfully");
		} catch (Exception e) {
			redirectAttributes.addFlashAttribute("errorMessage", "Failed to delete camp posting with ID: " + camp_id);
		}

		return "redirect:/camp/board/all";
	}

	@PutMapping("/edit/{camp_id}")
	public ResponseEntity<String> updateBoardById(@PathVariable Long camp_id, @RequestBody BoardVO board) {
		try {
			board.setCamp_id(camp_id);
			boardService.updateBoard(board);
			return ResponseEntity.ok("Camp posting updated successfully");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("수정 실패: " + camp_id);
		}
	}



}