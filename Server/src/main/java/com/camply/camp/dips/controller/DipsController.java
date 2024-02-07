package com.camply.camp.dips.controller;

import com.camply.camp.board.vo.BoardVO;
import com.camply.camp.dips.service.DipsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/camp/board")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*")
public class DipsController {

    @Autowired
    private DipsService dipsService;

    @PostMapping("/add/dips")
    public ResponseEntity<String> bookmarkCamp(@RequestBody BoardVO boardVO) {
        dipsService.addCampDips(boardVO);
        return ResponseEntity.status(HttpStatus.CREATED).body("찜하기 추가");
    }

    @DeleteMapping("/delete/dips")
    public ResponseEntity<String> unbookmarkCamp(@PathVariable Long camp_id) {
        dipsService.removeCampDips(camp_id);
        return ResponseEntity.status(HttpStatus.OK).body("찜하기 해제");
    }
}
