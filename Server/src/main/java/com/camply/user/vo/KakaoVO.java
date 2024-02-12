package com.camply.user.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class KakaoVO{

    private String account_email;
    private String profile_nickname;
    private String name	;


}
