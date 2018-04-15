package net.rane.onlineshoping.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import net.rane.onlineshoping.exception.ProductNotFoundException;
import net.rane.shoppingbackend.dao.CategoryDAO;
import net.rane.shoppingbackend.dao.ProductDAO;
import net.rane.shoppingbackend.dto.Category;
import net.rane.shoppingbackend.dto.Product;

@Controller
public class PageController {
	
	private static final Logger logger=LoggerFactory.getLogger(PageController.class);
	@Autowired
	private CategoryDAO categoryDAO;
	
	@Autowired
	private ProductDAO productDAO;


	@RequestMapping(value={"/","/home","/index"})
	public ModelAndView index(){
		ModelAndView mv=new ModelAndView("page");
		mv.addObject("title", "Home");
		logger.info("Inside Page Controller");
		logger.debug("Inside Page Controller-DEBUG");
		mv.addObject("userClickHome", true);
		mv.addObject("categories", categoryDAO.list());
		return mv;
	}
	
	@RequestMapping(value="/about")
	public ModelAndView about(){
		ModelAndView mv=new ModelAndView("page");
		mv.addObject("title", "About Us");
		mv.addObject("userClickAbout", true);
		return mv;
	}
	
	@RequestMapping(value="/contact")
	public ModelAndView contact(){
		ModelAndView mv=new ModelAndView("page");
		mv.addObject("title", "Contact Us");
		mv.addObject("userClickContact", true);
		return mv;
	}
	
	/* Method to show all products */
	@RequestMapping(value="show/all/products")
	public ModelAndView showAllProducts(){
		ModelAndView mv=new ModelAndView("page");
		mv.addObject("title", "All Products");
		//passing list of categories
		mv.addObject("categories", categoryDAO.list());
		mv.addObject("userClickAllProducts", true);
		return mv;
	}
	
	
	@RequestMapping(value="show/category/{id}/products")
	public ModelAndView showCategoryProducts(@PathVariable("id")int id){
		ModelAndView mv=new ModelAndView("page");
		
		/* category DAO to fetch single category 
		 */
		Category category=null;
		
		category=categoryDAO.get(id);
		
		mv.addObject("title", category.getName());
		//passing list of categories
		mv.addObject("categories", categoryDAO.list());
		//passing single category object
		mv.addObject("category", category);
		
		mv.addObject("userClickCategoryProducts", true);
		
		return mv;
	}
	
	/*Viewing Single Product */
	@RequestMapping(value="/show/{id}/product")
	public ModelAndView showSingleProduct(@PathVariable int id) throws ProductNotFoundException{
		ModelAndView mv=new ModelAndView("page");
		
		Product product=productDAO.get(id);
		
		
		if(product==null) throw new ProductNotFoundException();
		
		//update view Count
		product.setViews(product.getViews()+1);
		productDAO.update(product);
		//----------------------
		
		mv.addObject("title", product.getName());
		mv.addObject("product", product);
		mv.addObject("userClickShowProduct", true);
		return mv;
		
	}
	
	@RequestMapping(value="/login")
	public ModelAndView login(){
		ModelAndView mv=new ModelAndView("login");
		mv.addObject("title", "Login");
		return mv;
	}
	
}

