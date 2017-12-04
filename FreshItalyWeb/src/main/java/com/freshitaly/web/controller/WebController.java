package com.freshitaly.web.controller;

import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
public class WebController {
	
	@RequestMapping(value="/", method = RequestMethod.GET)
	public String login() {
		return "login";
	}

	@RequestMapping(value="/registration", method = RequestMethod.GET)
	public String registrationG() {
		return "registration";
	}
	
	@RequestMapping(value="/registration", method = RequestMethod.POST)
	public String registration() {
		return "registration";
	}

	@RequestMapping(value="/index", method = RequestMethod.POST)
	public String index() {
		return "index";
	}

	@RequestMapping(value="/producer", method = RequestMethod.POST)
	public String producerHome() {
		return "/producer/home";
	}

	@RequestMapping(value="/buyer", method = RequestMethod.POST)
	public String buyerHome() {
		return "/buyer/home";
	}

}
