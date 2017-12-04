package com.freshitaly.web.rest.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WebRestServiceController {

	private final String BASE_URL = "http://localhost:8889";
	private final RestTemplate restTemplate = new RestTemplate();

	@GetMapping("/test")
	public String test(){
		
		Map<String, String> x = new HashMap<String, String>();
		x.put("1", "uno");
		String result = restTemplate.getForObject(BASE_URL + "/test", String.class, x);
		System.out.println(result);
		return result;
	}
}
