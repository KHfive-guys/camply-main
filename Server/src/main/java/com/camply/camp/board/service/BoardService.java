package com.camply.camp.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.camply.camp.board.dao.BoardDAO;
import com.camply.camp.board.vo.BoardVO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private final BoardDAO boardDAO;

    public void insertPost(BoardVO boardVO) {
        try {
            boardDAO.insertBoard(boardVO);
        } catch (Exception e) {
            throw new RuntimeException("Error inserting camp", e);
        }
    }

    public List<BoardVO> getAllBoard() {
        return boardDAO.getAllBoard();
    }

    public BoardVO getBoardById(Long campId) {
        return boardDAO.getBoardById(campId);
    }

    public void deleteBoardById(Long campId) {
        boardDAO.deleteBoardById(campId);
    }

    @Transactional
    public void updateBoard(BoardVO board) {
        try {
            boardDAO.updateBoardById(board);
        } catch (Exception e) {
            throw new RuntimeException("Error updating camp posting", e);
        }
    }
}